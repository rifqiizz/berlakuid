import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();

  try {
    await resend.emails.send({
      from: "Mailer <mailer@berlaku.id>",
      to: [email],
      subject: "Test Mail Berlaku",
      html: "Test mail <strong>content</strong>",
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
