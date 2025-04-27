import Header from "@/components/header/Header"
import Announcement from "@/components/announcement/Announcement.js"
import Footer from "@/components/footer/Footer"
import PrivacyCookiePolicy from "@/components/privacy/PrivacyCookiePolicy";

export default async function RootLayout({ children }) {
  return (
    <div className="">
      <Announcement />
      <Header />
      {children}
      <Footer />
      <PrivacyCookiePolicy />
    </div>
  );
}
