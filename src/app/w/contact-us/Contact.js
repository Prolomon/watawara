import { MessageCircleMore, ChevronRight } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full px-8 py-6 flex gap-6 rounded-xl shadow-lg bg-gradient-to-r from-white to-gray-50 items-center border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="aspect-square bg-primary text-white grid place-content-center rounded-full w-14 h-14 shadow-md hover:scale-110 transition-transform duration-300">
        <MessageCircleMore size={24} fill="#ffffff" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold capitalize text-lg text-black/90 tracking-tight">
          Have Questions? We&apos;re Here to Help!
        </h3>
        <p className="text-sm my-2 text-black/70 leading-relaxed">
          Connect with our friendly support team for quick, personalized assistance.
        </p>
        <button className="text-primary font-semibold rounded-lg flex items-center gap-2 hover:gap-3 transition-all duration-300 text-sm py-1">
          Reach Out Now
          <ChevronRight size={18} className="animate-pulse" />
        </button>
      </div>
    </div>
  );
}
