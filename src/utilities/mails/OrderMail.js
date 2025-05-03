import React from 'react';

import { User } from '@/backend/models/user.schema';
import { dbConnect } from '@/backend/server/server';
import { Orders } from '@/backend/models/order.schema';
import { Products } from '@/backend/models/products.schema';
const brandColor = '#f59e0b'; // Watawara brand color

const containerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  backgroundColor: '#f4f4f4',
};

const cardStyle = {
  backgroundColor: '#ffffff',
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
};

const logoStyle = {
  maxWidth: '150px',
  height: 'auto',
};

const headingStyle = {
  fontSize: '28px', // Slightly larger heading
  fontWeight: 'bold',
  color: brandColor, // Use brand color for main heading
  marginBottom: '10px',
};

const subHeadingStyle = {
  fontSize: '18px',
  color: '#333333',
  marginBottom: '25px',
};

const textStyle = {
  fontSize: '16px',
  color: '#555555',
  lineHeight: '1.6',
  marginBottom: '15px',
  textAlign: 'left',
};

const orderInfoStyle = {
  backgroundColor: '#f9f9f9',
  padding: '15px',
  borderRadius: '6px',
  marginBottom: '25px',
  textAlign: 'left',
  borderLeft: `4px solid ${brandColor}`,
};

const orderInfoLabelStyle = {
  fontWeight: 'bold',
  color: '#333333',
};

const itemTableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '25px',
  textAlign: 'left',
};

const thStyle = {
  borderBottom: '2px solid #e0e0e0',
  padding: '10px 8px',
  color: '#333333',
  fontWeight: 'bold',
};

const tdStyle = {
  borderBottom: '1px solid #e0e0e0',
  padding: '12px 8px',
  color: '#555555',
  verticalAlign: 'middle', // Align items vertically
};

const itemImageStyle = {
  maxWidth: '60px',
  height: 'auto',
  marginRight: '10px',
  borderRadius: '4px',
  verticalAlign: 'middle',
};

const totalRowStyle = {
  fontWeight: 'bold',
  color: '#333333',
};

const addressBoxStyle = {
  border: '1px solid #e0e0e0',
  padding: '15px',
  borderRadius: '6px',
  marginBottom: '20px',
  textAlign: 'left',
};

const addressTitleStyle = {
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: '8px',
  borderBottom: '1px solid #eee',
  paddingBottom: '5px',
};

// Footer Styles (Reused)
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

export async function OrderMail({
  email,
  orderId,
  shippingAddress = {}, // Default to empty object
  logoUrl = "https://gonf7za2h5pl262h.public.blob.vercel-storage.com/archive/long-o33wF29ES14EXO9L1weotcHCURRykJ.png",
  websiteUrl = "https://watawara.vercel.app",
  privacyUrl = "#",
  helpUrl = "#",
  unsubscribeUrl = "#",
}) {
  await dbConnect();

  const user = await User.findOne({ email });
  const order = await Orders.findOne({ userId: user._id, orderId });
  const products = await Products.find({ });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Helper to format address
  const formatAddress = (address) => {
    if (!address || !address.line1) return "N/A"; // Handle missing address
    return `
      ${user.email}<br/>
      ${user.phoneNo}<br/>
      ${address.address ? `${address.address}<br/>` : ""}
      ${address.landmark ? `${address.landmark}<br/>` : ""}
      ${address.city}, ${address.state} ${address.postalCode}<br/>
      ${address.country || ""}
    `
      .trim()
      .replace(/\n/g, "");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          <img src={logoUrl} alt="Watawara Logo" style={logoStyle} />
        </div>

        <h1 style={headingStyle}>Your Order is Confirmed!</h1>
        <h2 style={subHeadingStyle}>
          Thanks for shopping with Watawara, {user.fullname}!
        </h2>

        <p style={textStyle}>
          Get ready! Your recent order is confirmed and will be processed soon.
          You can find the details below. We&apos;ll notify you again once your
          order ships.
        </p>

        {/* Order Information */}
        <div style={orderInfoStyle}>
          <p style={{ margin: "5px 0" }}>
            <span style={orderInfoLabelStyle}>Order Number:</span> {orderId}
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={orderInfoLabelStyle}>Order Date:</span>{" "}
            {new Date(order.date).toLocaleDateString()}
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={orderInfoLabelStyle}>Order Status:</span>{" "}
            {order.status}
          </p>
        </div>

        {/* Items Table */}
        <h3
          style={{
            ...textStyle,
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "10px",
          }}
        >
          Order Summary
        </h3>
        <table style={itemTableStyle}>
          <thead>
            <tr>
              <th style={thStyle} colSpan="2">
                Product
              </th>
              <th style={thStyle} align="right">
                Quantity
              </th>
              <th style={thStyle} align="right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item, index) => {
              const p = products.find((p) => p.id === item.productId);
              return (
                <tr key={index}>
                  <td style={tdStyle}>
                    {item.imageUrl && (
                      <img src={p.image} alt={p.name} style={itemImageStyle} />
                    )}
                  </td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle} align="right">
                    {p.quantity}
                  </td>
                  <td style={tdStyle} align="right">
                    {formatCurrency(Number(p.price) * Number(p.quantity))}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {/* Subtotal, Shipping, Total */}
            <tr>
              <td
                colSpan="3"
                style={{
                  ...tdStyle,
                  textAlign: "right",
                  borderTop: "2px solid #e0e0e0",
                }}
              >
                Subtotal:
              </td>
              <td
                style={{
                  ...tdStyle,
                  textAlign: "right",
                  borderTop: "2px solid #e0e0e0",
                }}
              >
                {formatCurrency(order.subTotal)}
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ ...tdStyle, textAlign: "right" }}>
                Tax:
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                {formatCurrency(order.tax)}
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ ...tdStyle, textAlign: "right" }}>
                Shipping:
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                {formatCurrency(order.shipping)}
              </td>
            </tr>
            <tr style={totalRowStyle}>
              <td
                colSpan="3"
                style={{ ...tdStyle, textAlign: "right", fontSize: "18px" }}
              >
                Total:
              </td>
              <td style={{ ...tdStyle, textAlign: "right", fontSize: "18px" }}>
                {formatCurrency(order.total)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Shipping Address */}
        <div style={addressBoxStyle}>
          <div style={addressTitleStyle}>Shipping Address</div>
          <p
            style={{ margin: 0, lineHeight: "1.6" }}
            dangerouslySetInnerHTML={{ __html: formatAddress(shippingAddress) }}
          />
        </div>

        <p style={textStyle}>
          If you have any questions about your order, please visit our Help
          Center or reply to this email.
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
            &quot;What you order is what you get&quot;
          </div>
          <div style={copyrightStyle}>
            &copy; {new Date().getFullYear()} Watawara. All rights reserved.{" "}
            <br />
            {/* Optional: Add address */}
          </div>
        </div>
      </div>
    </div>
  );
}