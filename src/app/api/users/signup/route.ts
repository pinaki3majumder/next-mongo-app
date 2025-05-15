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
        console.log('reqBody-', reqBody);

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
        console.log('savedUser-', savedUser);

        //send verification email
        await sendEmailHandler({
            email,
            emailType: EmailType.VERIFY_USER,
            userId: savedUser._id,
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                status: 201,
                savedUser
            }
        );
    } catch (error: unknown) {
        return errorResponse(error);
    }
}