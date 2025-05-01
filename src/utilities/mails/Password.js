// import Image from "next/image"
import { images } from "@/constants";
import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";
import { v4 as uuidv4 } from "uuid";

export async function Password({ email }) {
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
            Password Reset Successful
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
              Your password has been successfully reset for your Watawara account. You can now log in with your new password.
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
              <p style={{ fontSize: "16px", color: "#10B981", fontWeight: "600" }}>
                ✓ Password Reset Complete
              </p>
            </div>

            <p style={{ marginTop: "24px" }}>
              If you didn&apos;t make this change, please contact our support team immediately as your account security may be compromised.
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
              For security purposes, we recommend regularly updating your password and enabling two-factor authentication if available.
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
