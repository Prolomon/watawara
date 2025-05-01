import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import dotenv from "dotenv";
import { Mail } from "@/utilities/mails/Mail";
import { Otp } from "@/utilities/mails/Otp";
import { Password } from "@/utilities/mails/Password";
import { render } from "@react-email/render";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

dotenv.config();

export async function Mailer(email, type) {

    await dbConnect();
    const user = await User.findOne({ email });

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY,
    });
    const emailHtml = await render( type === "welcome" && <Mail email={email} /> || type === "reset" && <Password email={email} /> || <Otp email={email} /> );

    const sentFrom = new Sender(process.env.MAILER_SEND_USERNAME, "Watawara");
    const recipients = [new Recipient(email, user.fullname)];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Welcome to Watawara!")
      .setHtml(emailHtml);

    const response = await mailerSend.email.send(emailParams);

    console.log("Email sent successfully:", response);
}

// Ensure there are no other exports like 'GET' or a default export if not needed.
