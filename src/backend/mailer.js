import { Resend } from 'resend';
import dotenv from "dotenv";
import { dbConnect } from "@/backend/server/server";

dotenv.config();

const resend = new Resend(
  process.env.RESEND_API_KEY || re_77SyaYGT_5ma6DL4N3LDShgHwx6Cx5oPo
);

export async function Mailer(email, body, subject) {
  try {
    await dbConnect();
    console.log(email, body, subject)

    const { data, error } = await resend.emails.send({
      from: "taiwooyetade67@gmail.com", // Replace with your verified domain
      to: email,
      subject: subject,
      react: body,
    });

    if (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email");
    }

    return data;

  } catch (error) {
    console.error("Mailer error:", error);
    throw error;
  }
}
