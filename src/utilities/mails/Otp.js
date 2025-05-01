// import Image from "next/image"
import { images } from "@/constants";
import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";
import { v4 as uuidv4 } from "uuid";

export async function Otp ({ email }) {
  await dbConnect();
  const user = await User.findOne({ email });
  return (
    <html>
      <body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <img
              src={images.logo}
              alt="logo"
              width={120}
              height={40}
              style={{ margin: "0 auto" }}
            />
          </div>

          <h1
            style={{
              color: "#111827",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Password Reset Request
          </h1>

          <div
            style={{
              color: "#4B5563",
              fontSize: "16px",
              lineHeight: "24px",
              marginBottom: "24px",
            }}
          >
            <p>Hello {user.fullname},</p>
            <p>
              We received a request to reset your password for your Watawara
              account. Here is your one-time password (OTP) to complete the
              password reset process:
            </p>

            <div
              style={{
                backgroundColor: "#F3F4F6",
                padding: "16px",
                borderRadius: "6px",
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "32px",
                  letterSpacing: "8px",
                  margin: "12px 0",
                }}
              >
                {user.otp}
              </p>
              <p style={{ fontSize: "14px", color: "#6B7280" }}>
                This OTP will expire in 10 minutes
              </p>
            </div>
            <p>
              To continue this, visit{" "}
              <a href="${process.env.WATAWARA_BASE_URL}/auth/forgotten-password/reset?authCode=${uuidv4}&email=${email}">
                Watawara password reset
              </a>
            </p>
            <p style={{ marginTop: "24px" }}>
              If you didn&apos;t request this password reset, please ignore this
              email or contact our support team if you believe this is a
              mistake.
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "24px",
              marginTop: "32px",
              textAlign: "center",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            <p>
              For security reasons, this OTP will expire in 10 minutes. If you
              need a new OTP, please request another password reset.
            </p>
            <p style={{ marginTop: "12px" }}>
              Need help? Contact our support team
            </p>
            <a href="mailto:taiwooyetade67@gmail.com">taiwooyetade@gmail.com</a>
          </div>
        </div>
      </body>
    </html>
  );
}
