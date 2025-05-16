import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { errorResponse } from "@/lib/errors/errorResponse";
import { EmailType } from "@/types/email-type.enum";
import { sendEmailHandler } from "@/lib/sendEmailHandler";

await dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userName, email, pwd } = reqBody;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return errorResponse("User already exists", 400);
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(pwd, salt);

        // Create new user
        const newUser = new User({
            userName,
            email,
            pwd: hashedPassword,
        });

        const savedUser = await newUser.save();

        let successMsg = "";

        try {
            const emailResponse = await sendEmailHandler({
                email,
                emailType: EmailType.VERIFY_USER,
                userId: savedUser._id,
            });

            successMsg = "User created successfully & Mail send to the user";

            console.log("Email sent successfully:", emailResponse);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Failed to send email:", error.message);
            successMsg = "User created successfully & Failed to send email";
        }

        return NextResponse.json(
            {
                message: successMsg,
                success: true,
                status: 201,
                savedUser
            }
        );
    } catch (error: unknown) {
        return errorResponse(error);
    }
}