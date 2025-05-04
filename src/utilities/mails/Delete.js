"use server"
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

const brandColor = "#f59e0b"; 
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

const detailLabelStyle = {
  fontWeight: "bold",
  color: "#333333",
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

export async function Deleted({
  email,
  logoUrl = "https://gonf7za2h5pl262h.public.blob.vercel-storage.com/archive/long-o33wF29ES14EXO9L1weotcHCURRykJ.png",
  websiteUrl = process.env.WATAWARA_BASE_URL || "https://watawara.vercel.app",
  privacyUrl = "#",
  helpUrl = "#",
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

        {/* Updated Headings */}
        <h1 style={headingStyle}>Your Watawara Account Has Been Deleted</h1>
        <h2 style={subHeadingStyle}>
          We&apos;re sorry to see you go{userName ? `, ${userName}` : ""}!
        </h2>

        <p style={textStyle}>
          This email confirms that your Watawara account associated with this email address has been successfully deleted as requested.
        </p>

        {/* Section on what they'll miss */}
        <h3 style={{ ...headingStyle, fontSize: '20px', textAlign: 'left', marginTop: '30px' }}>What You&apos;ll Be Missing:</h3>
        <ul style={{ ...textStyle, paddingLeft: "20px", marginBottom: '30px' }}>
          <li>Quick access to your past order history.</li>
          <li>Saved addresses for faster checkout.</li>
          <li>Your personalized wishlist.</li>
          <li>Exclusive member-only offers and updates.</li>
        </ul>

        {/* Removed login details section */}

        <p style={textStyle}>
          If you deleted your account by mistake or change your mind, you&apos;re always welcome back! You can create a new account anytime by visiting our website.
        </p>
        <p style={textStyle}>
          If you did not request this deletion or have any concerns, please contact our support team immediately through the Help Center.
        </p>
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
            </a>
            {/* Removed Unsubscribe link */}
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
