import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Watawara | What you order is what you get!!!!",
  description: "Stay updated with the latest products and offers from your favorite categories on Watawara. Follow your preferred categories and never miss out on exclusive deals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="rjsMuDjdJQfvKJiY4YERD-kqz3OMzO80KgHZ-9sqZr4" />
        <script
          async
          src="https://embed.tawk.to/67e98a93df850e190ee124bb/1ink4akeq"
          crossOrigin="*"
        ></script>
        <script>
          {`
            var Tawk_API = Tawk_API || {};
            Tawk_API.onLoad = function() {
              // Disable automatic pop-ups
              Tawk_API.setAttributes({ attentionGrabber: false });
            };
          `}
        </script>
      </head>
      <body className={`w-full h-full ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
