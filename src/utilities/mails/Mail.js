// import Image from "next/image"
import { images } from "@/constants"
import { User } from "@/backend/models/user.schema"
import { dbConnect } from "@/backend/server/server"

export async function Mail({email}) {
    await dbConnect()
    const user = await User.findOne({ email })
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
            Welcome to Watawara, {user.fullname}!
          </h1>

          <div
            style={{
              color: "#4B5563",
              fontSize: "16px",
              lineHeight: "24px",
              marginBottom: "24px",
            }}
          >
            <p>
              Thank you for creating an account with us. Your account has been
              successfully created and you can now enjoy shopping with us!
            </p>

            <div
              style={{
                backgroundColor: "#F3F4F6",
                padding: "16px",
                borderRadius: "6px",
                marginTop: "24px",
              }}
            >
              <p style={{ fontWeight: "600", marginBottom: "12px" }}>
                Your Account Information:
              </p>
              <p style={{ margin: "4px 0" }}>Fullname: {user.fullname}</p>
              <p style={{ margin: "4px 0" }}>Email: {user.email}</p>
              <p style={{ margin: "4px 0" }}>
                Phone Number: {user.phoneNumber}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#F3F4F6",
                padding: "16px",
                borderRadius: "6px",
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: "600", marginBottom: "12px" }}>
                Your Verification Code:
              </p>
              <p
                style={{
                  margin: "4px 0",
                  fontSize: "32px",
                  letterSpacing: "8px",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {user.otp}
              </p>
              <p style={{ marginTop: "12px", fontSize: "14px", color: "#6B7280" }}>
                This code will expire in 10 minutes
              </p>
            </div>
          </div>
          
          <p style={{ margin: "4px 0" }}>Login to continue with watawara <a href="https:watawara.vercel.app">Login</a></p>
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
              If you have any questions, please don&apos;t hesitate to contact
              our support team.
            </p>
            <p style={{ marginTop: "12px" }}>Happy Shopping!</p>
            <a href="mailto:taiwooyetade67@gmail.com">taiwooyetade@gmail.com</a>
          </div>
        </div>
      </body>
    </html>
  );
}