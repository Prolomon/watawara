import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { Mail } from "@/utilities/mails/Mail";
import { Otp } from "@/utilities/mails/Otp";
import { Password } from "@/utilities/mails/Password";
import { render } from "@react-email/render";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

dotenv.config();

export async function POST(req) {
  // Make sure this line exports 'POST'
  try {
    const body = await req.json();
    const { email, otp, type } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Missing email or fullname" },
        { status: 400 }
      );
    }
    await dbConnect();
    const user = await User.findOne({ email });

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY,
    });
    const emailHtml = await render(
      type === "welcome" ? (
        <Mail email={email} />
      ) : type === reset ? (
        <Otp email={email} />
      ) : (
        <Password email={email} />
      )
    );

    const sentFrom = new Sender(process.env.MAILER_SEND_USERNAME, "Watawara");
    const recipients = [new Recipient(email, user.fullname)];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Welcome to Watawara!")
      .setHtml(emailHtml);

    const response = await mailerSend.email.send(emailParams);
    console.log("MailerSend API Response:", response);

    return NextResponse.json(
      { message: "Email sent successfully", apiResponse: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage =
      error.response?.body?.message || error.message || "Error sending email";
    const errorStatus = error.response?.status || 500;
    return NextResponse.json(
      { message: errorMessage },
      { status: errorStatus }
    );
  }
}

// Ensure there are no other exports like 'GET' or a default export if not needed.
