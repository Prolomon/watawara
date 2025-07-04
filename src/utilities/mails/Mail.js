import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

// Brand color
const brandColor = '#f59e0b'; 
const buttonStyle = {
  backgroundColor: brandColor,
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "20px",
  marginBottom: "20px",
};
const containerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  backgroundColor: '#f4f4f4', // Light grey background
};

const cardStyle = {
  backgroundColor: '#ffffff', // White card background
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '15px',
  maxWidth: '100%',
  margin: '10px auto',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoContainerStyle = {
  marginBottom: '25px',
  // Add height/width constraints if your logo needs them
};

const logoStyle = {
  maxWidth: '150px', // Adjust max-width as needed
  height: 'auto',
};

const headingStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#333333', // Dark grey heading
  marginBottom: '15px',
};

const subHeadingStyle = {
  fontSize: '18px',
  color: brandColor, // Use brand color for sub-heading
  marginBottom: '25px',
};

const textStyle = {
  fontSize: '16px',
  color: '#555555', // Medium grey text
  lineHeight: '1.6',
  marginBottom: '15px',
  textAlign: 'left', // Align text left for readability
};

const otpContainerStyle = {
  margin: '30px 0',
};

const otpLabelStyle = {
  fontSize: '14px',
  color: '#777777',
  marginBottom: '5px',
};

const otpStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: brandColor, // Use brand color for OTP
  letterSpacing: '5px',
  margin: '5px 0 20px 0',
  padding: '12px 20px',
  border: `2px solid ${brandColor}`, // Use brand color for border
  borderRadius: '6px',
  display: 'inline-block',
  backgroundColor: '#fef9c3', // Light yellow background for OTP
};

const footerStyle = {
  marginTop: '40px',
  paddingTop: '20px',
  borderTop: '1px solid #eeeeee',
  fontSize: '12px',
  color: '#888888',
  textAlign: 'center',
  lineHeight: '1.5', // Added line height for better spacing
};

const footerLinkStyle = {
  color: '#555555', // Slightly darker link color
  textDecoration: 'underline',
  margin: '0 5px', // Add some horizontal spacing between links
};

const mottoStyle = {
  fontSize: '13px',
  fontStyle: 'italic',
  color: '#777777',
  marginTop: '10px',
};

const copyrightStyle = {
  marginTop: '15px',
};

export async function Mail({
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
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo Placeholder */}
        <div style={logoContainerStyle}>
          <img src={logoUrl} alt="Watawara Logo" style={logoStyle} />
        </div>

        <h1 style={headingStyle}>Welcome to Watawara!</h1>
        <h2 style={subHeadingStyle}>
          Hi {user.fullname}, let&apos;s get you started.
        </h2>

        <p style={textStyle}>
          Thank you for creating your Watawara account! We&apos;re excited to
          have you join our community.
        </p>
        <p style={textStyle}>
          To complete your registration and ensure your account is secure,
          please verify your email address using the One-Time Password (OTP)
          below:
        </p>

        {/* OTP Section */}
        <div style={otpContainerStyle}>
          <div style={otpLabelStyle}>Your Verification Code:</div>
          <div style={otpStyle}>{otp}</div>
        </div>

        <p style={textStyle}>
          Please enter this code on the verification page. Note that this code
          is valid for a limited time.
        </p>

        <a
          href={websiteUrl + "auth/otp?email=" + email + "&otp=" + otp}
          style={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          continue to Watawara
        </a>
        <p style={textStyle}>
          If you didn&apos;t attempt to create an account with Watawara, you can
          safely ignore this email.
        </p>

        {/* Updated Footer */}
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
            {/* You might want to add a physical address here if required */}
          </div>
        </div>
      </div>
    </div>
  );
}