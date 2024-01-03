import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("Mulai API cron send email");

  try {
    return NextResponse.json({ message: "Run sending email successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error sending email" });
  }
}
