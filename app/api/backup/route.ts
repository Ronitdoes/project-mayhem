import { NextResponse } from "next/server";

export async function GET() {
  // Return backup credentials and hint in clean JSON format
  return NextResponse.json({
    username: "admin",
    password: "hidden",
    hint: "Check Local Storage",
  });
}
