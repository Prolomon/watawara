import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";

const brandColor = '#f59e0b'; // Watawara brand color

const containerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  padding: '20px',
  backgroundColor: '#f4f4f4',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '30px',
  maxWidth: '600px',
  margin: '20px auto',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoContainerStyle = {
  marginBottom: '25px',
};

const logoStyle = {
  maxWidth: '150px',
  height: 'auto',
};

const headingStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: '15px',
};

const subHeadingStyle = {
  fontSize: '18px',
  color: '#10B981', // Green color for success confirmation
  marginBottom: '25px',
  fontWeight: '600',
};

const textStyle = {
  fontSize: '16px',
  color: '#555555',
  lineHeight: '1.6',
  marginBottom: '15px',
  textAlign: 'left',
};

const footerStyle = {
  marginTop: '40px',
  paddingTop: '20px',
  borderTop: '1px solid #eeeeee',
  fontSize: '12px',
  color: '#888888',
  textAlign: 'center',
  lineHeight: '1.5',
};

const footerLinkStyle = {
  color: '#555555',
  textDecoration: 'underline',
  margin: '0 5px',
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

export async function Password({
  // Renamed export for clarity
  email,
  logoUrl = "https://gonf7za2h5pl262h.public.blob.vercel-storage.com/archive/long-o33wF29ES14EXO9L1weotcHCURRykJ.png", // Default logo
  websiteUrl = process.env.WATAWARA_BASE_URL,
  privacyUrl = "#",
  helpUrl = "#",
  supportEmail = "taiwooyetade67@gmail.com", // Default support email
}) {
  await dbConnect();
  const user = await User.findOne({ email });
  const fullname = user.fullname || "Watawara User";

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          <img src={logoUrl} alt="Watawara Logo" style={logoStyle} />
        </div>

        <h1 style={headingStyle}>Password Successfully Reset</h1>
        <h2 style={subHeadingStyle}>Your Watawara account is updated.</h2>

        {/* Main Content */}
        <p style={textStyle}>Hello {fullname},</p>
        <p style={textStyle}>
          This email confirms that the password for your Watawara account
          associated with {email} has been successfully changed.
        </p>
        <p style={textStyle}>
          You can now log in using your new password. For security reasons, we
          don&apos;t include passwords in emails.
        </p>
        <p style={textStyle}>
          If you did <strong>not</strong> make this change, please contact our
          support team immediately at{" "}
          <a href={`mailto:${supportEmail}`} style={footerLinkStyle}>
            {supportEmail}
          </a>{" "}
          or visit our Help Center, as your account security may be compromised.
        </p>

        {/* Footer */}
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
          </div>
          <div style={mottoStyle}>
            &apos;What you order is what you get!!!&apos;
          </div>
          <div style={copyrightStyle}>
            &copy; {new Date().getFullYear()} Watawara. All rights reserved.{" "}
            <br />
            Need help? Contact{" "}
            <a href={`mailto:${supportEmail}`} style={footerLinkStyle}>
              {supportEmail}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

