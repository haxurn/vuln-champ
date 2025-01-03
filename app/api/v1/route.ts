// app/api/v1/route.ts
import { NextResponse } from "next/server";

export const GET = () => {
    return NextResponse.json({
        message: "Backend running",
    });
};