import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userName, email, pwd } = reqBody;
        console.log('reqBody-', reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
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
        return NextResponse.json(
            { message: "User created successfully", success: true },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred!" }, { status: 500 });
    }
}