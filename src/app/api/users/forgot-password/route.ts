import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/errors/errorResponse";
import { sendEmailHandler } from "@/lib/sendEmailHandler";
import { EmailType } from "@/types/email-type.enum";
import bcryptjs from "bcryptjs";

await dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        if ("email" in reqBody) {
            const { email } = reqBody;

            // Check if user already exists
            const user = await User.findOne({ email });
            if (!user) {
                return errorResponse("User not exists", 400);
            }

            //send forgot password email
            try {
                await sendEmailHandler({
                    email,
                    emailType: EmailType.FORGOT_PASSWORD,
                    userId: user._id,
                });

                return NextResponse.json(
                    {
                        message: "Mail send to the user",
                        success: true,
                        status: 201,
                        user
                    }
                );

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Failed to send email:", error.message);
                return NextResponse.json({ error: "Failed to send email, try again later!" }, { status: 400 });
            }
        }

        const { confirmPassword, token } = reqBody;

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(confirmPassword, salt);

        user.pwd = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            status: 200
        });

    } catch (error: unknown) {
        return errorResponse(error);
    }
}