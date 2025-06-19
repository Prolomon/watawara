import React from 'react'; // Import React
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import getClientInfo from '../currency/getClientInfo';

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
  color: brandColor,
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

const buttonStyle = {
  backgroundColor: brandColor,
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '20px',
  marginBottom: '20px',
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

export async function Login({
  email,
  logoUrl = "https://gonf7za2h5pl262h.public.blob.vercel-storage.com/archive/long-o33wF29ES14EXO9L1weotcHCURRykJ.png",
  websiteUrl = process.env.WATAWARA_BASE_URL,
  privacyUrl = process.env.WATAWARA_BASE_URL + "/w/privacy-policy",
  helpUrl = "",
  unsubscribeUrl = "#",
}) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    console.error(`User not found for email: ${email} in Login template`);
    return null;
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
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

        <div style={detailBoxStyle}>
          <p style={{ margin: '5px 0' }}><span style={detailLabelStyle}>Time:</span> {new Date().toString()}</p>
          <p style={{ margin: '5px 0' }}><span style={detailLabelStyle}>IP Address:</span> {(await getClientInfo()).ipAddress}</p>
          <p style={{ margin: '5px 0' }}>
            <span style={detailLabelStyle}>Approx. Location (Lat/Lon):</span> {(await getClientInfo()).location}
          </p>
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

        <a 
          href={websiteUrl}
          style={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Watawara Website
        </a>

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
