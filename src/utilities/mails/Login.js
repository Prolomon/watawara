import React from 'react'; // Import React
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

const brandColor = "#f59e0b"; // Watawara brand color


const containerStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  backgroundColor: "#f4f4f4",
};

const cardStyle = {
  backgroundColor: "#ffffff",
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
};

const logoStyle = {
  maxWidth: "150px",
  height: "auto",
};

const headingStyle = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "15px",
};

const subHeadingStyle = {
  fontSize: "18px",
  color: brandColor, // Use brand color for sub-heading
  marginBottom: "25px",
};

const textStyle = {
  fontSize: "16px",
  color: "#555555",
  lineHeight: "1.6",
  marginBottom: "15px",
  textAlign: "left",
};

const detailBoxStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '25px',
    textAlign: 'left',
    borderLeft: `4px solid ${brandColor}`,
};

const detailLabelStyle = {
    fontWeight: 'bold',
    color: '#333333',
};

const footerStyle = {
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid #eeeeee",
  fontSize: "12px",
  color: "#888888",
  textAlign: "center",
  lineHeight: "1.5",
};

const footerLinkStyle = {
  color: "#555555",
  textDecoration: "underline",
  margin: "0 5px",
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

export async function Login({ // Named export for the new component
  email,
  loginTime, // Example: new Date().toLocaleString()
  deviceInfo, // Example: "Chrome on Windows"
  ipAddress, // Example: "192.168.1.1"
  latitude,  // Example: 40.7128
  longitude, // Example: -74.0060
  logoUrl = "https://gonf7za2h5pl262h.public.blob.vercel-storage.com/archive/long-o33wF29ES14EXO9L1weotcHCURRykJ.png",
  websiteUrl = process.env.WATAWARA_BASE_URL || 'https://watawara.vercel.app',
  privacyUrl = "#",
  helpUrl = "#",
  unsubscribeUrl = "#",
}) {
  await dbConnect();
  const user = await User.findOne({ email });

  // Basic check if user exists
  if (!user) {
    console.error(`User not found for email: ${email} in Login template`);
    return null;
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo Placeholder */}
        <div style={logoContainerStyle}>
          <img src={logoUrl} alt="Watawara Logo" style={logoStyle} />
        </div>

        <h1 style={headingStyle}>Account Login Notification</h1>
        <h2 style={subHeadingStyle}>
          Hi {user.fullname || 'User'}, we noticed a login to your account.
        </h2>

        <p style={textStyle}>
          This is to inform you that your Watawara account was recently accessed. Here are the details we have:
        </p>

        {/* Login Details Section (Updated) */}
        <div style={detailBoxStyle}>
          {loginTime && <p style={{ margin: '5px 0' }}><span style={detailLabelStyle}>Time:</span> {loginTime}</p>}
          {deviceInfo && <p style={{ margin: '5px 0' }}><span style={detailLabelStyle}>Device/Browser:</span> {deviceInfo}</p>}
          {ipAddress && <p style={{ margin: '5px 0' }}><span style={detailLabelStyle}>IP Address:</span> {ipAddress}</p>}
          {latitude && longitude && (
            <p style={{ margin: '5px 0' }}>
              <span style={detailLabelStyle}>Approx. Location (Lat/Lon):</span> {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </p>
          )}
          {!loginTime && !deviceInfo && !ipAddress && !latitude && !longitude && (
             <p style={{ margin: '5px 0' }}>A login occurred recently.</p>
          )}
        </div>


        <p style={textStyle}>
          If this was you, you can safely ignore this email. Your account is secure.
        </p>
        <p style={textStyle}>
          If you do <strong>not</strong> recognize this login activity, please take immediate steps to secure your account:
        </p>
        <ul style={{...textStyle, paddingLeft: '20px'}}>
            <li>Change your password immediately via our website.</li>
            <li>Review your account settings and recent activity.</li>
            <li>Contact our support team via the Help Center if you need assistance.</li>
        </ul>


        {/* Footer (Reused) */}
        <div style={footerStyle}>
          {/* ... existing footer code ... */}
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

// Consider renaming the file to EmailTemplates.js or similar if it holds multiple templates.