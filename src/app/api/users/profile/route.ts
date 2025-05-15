import { dbConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { ApiResponse, ApiResponseWithData } from "@/types/api-response.types";
import { UserInfo } from "@/types/user.type";
import { NextRequest, NextResponse } from "next/server";

await dbConnect();

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<ApiResponseWithData<UserInfo> | null>>> {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-pwd");

        // Directly sending the ApiResponse
        const responseData: ApiResponse<ApiResponseWithData<UserInfo>> = {
            message: "User found",
            success: true,
            data: user, // Directly assigning the user object to the `data` field
        };

        return NextResponse.json(responseData, { status: 200 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
        const errorResponse: ApiResponse<null> = {
            message: "An error occurred",
            success: false,
            data: null, // Directly assigning null to the `data` field
        };

        return NextResponse.json(errorResponse, { status: 500 });
    }
}