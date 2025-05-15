import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export function errorResponse(error: unknown, statusCode?: number, errorSource?: string) {
    if (error instanceof ApiError && "statusCode" in error && typeof error.statusCode === "number") {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    if (typeof error === "string" && typeof statusCode === "number") {
        return NextResponse.json({ error }, { status: statusCode });
    }

    return NextResponse.json({ error: `An unexpected error occurred ${errorSource ? `(from ${errorSource})` : ""}!` }, { status: 500 });
}
