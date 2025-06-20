import Image from "next/image";
import Address from "./Address";
import Contact from "./Contact";
import { SocialMedia } from "./SocialMedia";
import { MessageCircleMore, PhoneCall, Mail, Clock } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full pb-4">
      {/* Hero Section */}
      <div className="w-full aspect-[6/1] relative object-contain">
        <Image
          width={1920}
          height={640}
          alt="contact us hero image"
          src="/images/contact-us.jpeg"
          className="w-screen h-full object-cover aspect-[6/1] brightness-75"
          priority
        />
        <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-b from-black/40 to-black/70 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fadeIn">Get in Touch</h1>
          <p className="text-white text-center max-w-2xl px-4">
            We are here to help you with any questions or concerns you may have. Our team is ready to provide the support you need.
          </p>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-12 relative">
        <div className="bg-white p-6 rounded-lg border border-muted-foreground shadow-sm flex flex-col items-center text-center">
          <PhoneCall className="w-12 h-12 text-primary mb-4" />
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600">+1 (234) 567-8900</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-muted-foreground shadow-sm flex flex-col items-center text-center">
          <Mail className="w-12 h-12 text-primary mb-4" />
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600">help@watawara.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-muted-foreground shadow-sm flex flex-col items-center text-center">
          <Clock className="w-12 h-12 text-primary mb-4" />
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <p className="text-gray-600">Mon-Fri: 9AM - 6PM</p>
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="w-11/12 mx-auto flex gap-8 max-md:flex-col my-12">
        <Address />
        <Contact />
      </section>

      {/* Social Media Section */}
      <div className="bg-gray-50 py-12">
        <div className="w-11/12 mx-auto">
          <SocialMedia />
        </div>
      </div>

      {/* CTA Button */}
      <div className="grid place-content-center">
        <button className="bg-primary hover:bg-secondary transition-colors text-white w-80 text-sm justify-center items-center rounded-full px-8 py-3.5 font-semibold mx-auto mb-4 my-7 inline-flex gap-2">
          <MessageCircleMore size={20} />
          Contact Us Now
        </button>
      </div>
    </main>
  );
}
