import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorResponse } from "@/lib/errors/errorResponse";

await dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, pwd } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse("User does not exist", 400);
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(pwd, user.pwd);
        if (!validPassword) {
            return errorResponse("Invalid password", 400);
        }

        // Create token
        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // Send response
        const response = NextResponse.json(
            { message: "Login successful", success: true },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    } catch (error: unknown) {
        return errorResponse(error);
    }
}