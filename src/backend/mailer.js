import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import dotenv from "dotenv";
import { Mail } from "@/utilities/mails/Mail";
import { Otp } from "@/utilities/mails/Otp";
import { Password } from "@/utilities/mails/Password";
import { OrderMail } from "@/utilities/mails/OrderMail";
import { render } from "@react-email/render";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { Login } from "@/utilities/mails/Login";
// import { getDeviceInfo } from "@/utilities/currency/deviceInfo";
import { getIpAddress } from "@/utilities/currency/IpAddress";

dotenv.config();

export async function Mailer(email, type, order) {
  await dbConnect();
  const user = await User.findOne({ email });

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SEND_API_KEY,
  });
  let emailComponent;
  if (type === "welcome") {
    emailComponent = <Mail email={email} />;
  } else if (type === "reset") {
    emailComponent = <Password email={email} />;
  } else if (type === "order" && order) {
    emailComponent = <OrderMail orderId={order} email={email} />;
  } else if (type === "login") {
    emailComponent = (
      <Login
        email={email}
        loginTime={new Date().toDateString()}
        deviceInfo={"Unknown Device"}
        ipAddress={"Unknown IP"}
      />
    );
  } else if (type === "otp") {
    emailComponent = <Otp email={email} />;
  } else {
    console.error(
      `Mailer Error: Unknown email type "${type}" or missing data.`
    );
    return; // Don't send email for unknown types
  }

  const emailHtml = await render(emailComponent)

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
