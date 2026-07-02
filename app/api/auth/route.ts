import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Always ignore credentials and return 401 Unauthorized
  return NextResponse.json(
    { error: "Invalid username or password." },
    {
      status: 401,
      headers: {
        "x-hint": "/api/backup",
      },
    }
  );
}
