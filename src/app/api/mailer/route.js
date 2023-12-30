import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  const { email } = req.body;
  const { method } = req;

  if (method === "POST") {
    if (!email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    try {
      await resend.sendEmail({
        from: "Mailer <mailer@berlaku.id>",  
        to: email,
        subject: "Test Mail",
        html: "Test mail <strong>content</strong>",
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};