import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

const brandColor = "#f59e0b"; // Watawara brand color

const containerStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  backgroundColor: "#f4f4f4", // Light grey background
};

const cardStyle = {
  backgroundColor: "#ffffff", // White card background
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "15px",
  maxWidth: "100%",
  margin: "10px auto",
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const logoContainerStyle = {
  marginBottom: "25px",
  // Add height/width constraints if your logo needs them
};

const logoStyle = {
  maxWidth: "150px", // Adjust max-width as needed
  height: "auto",
};

const headingStyle = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#333333", // Dark grey heading
  marginBottom: "15px",
};

const subHeadingStyle = {
  fontSize: "18px",
  color: brandColor, // Use brand color for sub-heading
  marginBottom: "25px",
};

const textStyle = {
  fontSize: "16px",
  color: "#555555", // Medium grey text
  lineHeight: "1.6",
  marginBottom: "15px",
  textAlign: "left", // Align text left for readability
};

const otpContainerStyle = {
  margin: "30px 0",
};

const otpLabelStyle = {
  fontSize: "14px",
  color: "#777777",
  marginBottom: "5px",
};

const otpStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: brandColor, // Use brand color for OTP
  letterSpacing: "5px",
  margin: "5px 0 20px 0",
  padding: "12px 20px",
  border: `2px solid ${brandColor}`, // Use brand color for border
  borderRadius: "6px",
  display: "inline-block",
  backgroundColor: "#fef9c3", // Light yellow background for OTP
};

// Updated Footer Styles
const footerStyle = {
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid #eeeeee",
  fontSize: "12px",
  color: "#888888",
  textAlign: "center",
  lineHeight: "1.5", // Added line height for better spacing
};

const footerLinkStyle = {
  color: "#555555", // Slightly darker link color
  textDecoration: "underline",
  margin: "0 5px", // Add some horizontal spacing between links
};

const mottoStyle = {
  fontSize: "13px",
  fontStyle: "italic",
  color: "#777777",
  marginTop: "10px",
};

const copyrightStyle = {
  marginTop: "15px",
};

export async function DeleteOtp({
  // Note: Changed to named export
  otp,
  email,
  logoUrl = "https://gonf7za2h5pl262h.public.blob.vercel-storage.com/archive/long-o33wF29ES14EXO9L1weotcHCURRykJ.png",
  websiteUrl = process.env.WATAWARA_BASE_URL,
  privacyUrl = "#",
  helpUrl = "#",
  unsubscribeUrl = "#",
}) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo Placeholder */}
        <div style={logoContainerStyle}>
          <img src={logoUrl} alt="Watawara Logo" style={logoStyle} />
        </div>

        {/* Updated Heading for Account Deletion */}
        <h1 style={headingStyle}>Confirm Your Watawara Account Deletion</h1>
        <h2 style={subHeadingStyle}>
          Hi {user.fullname}, please confirm your request.
        </h2>

        {/* Updated Body Text for Account Deletion */}
        <p style={textStyle}>
          We received a request to delete your Watawara account associated with
          this email address.
        </p>
        <p style={textStyle}>
          To confirm this action and permanently delete your account, please use
          the One-Time Password (OTP) below.
        </p>

        {/* OTP Section */}
        <div style={otpContainerStyle}>
          {/* Updated OTP Label */}
          <div style={otpLabelStyle}>Your Account Deletion Code:</div>
          <div style={otpStyle}>{otp}</div>
        </div>

        {/* Updated Instructions */}
        <p style={textStyle}>
          Enter this code on the account deletion confirmation page. This code
          is valid for a limited time.
        </p>
        <p style={textStyle}>
          <strong>Warning:</strong> Proceeding with this code will permanently
          delete your account and all associated data. This action cannot be
          undone.
        </p>
        <p style={textStyle}>
          If you did not request this account deletion, please ignore this email
          or contact our support immediately. Your account remains safe.
        </p>

        {/* Footer (Reused) */}
        <div style={footerStyle}>
          <div>
            <a
              href={websiteUrl}
              style={footerLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Watawara
            </a>{" "}
            |
            <a
              href={privacyUrl}
              style={footerLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            |
            <a
              href={helpUrl}
              style={footerLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Help Center
            </a>{" "}
            |
            <a
              href={unsubscribeUrl}
              style={footerLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsubscribe
            </a>
          </div>
          <div style={mottoStyle}>
            &apos;What you order is what you get!!!&apos;
          </div>
          <div style={copyrightStyle}>
            &copy; {new Date().getFullYear()} Watawara. All rights reserved.{" "}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
