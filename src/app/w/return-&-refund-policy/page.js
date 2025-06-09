import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto p-6 w-11/12">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Watawara Return & Refund Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">30-Day Return Policy</h2>
        <div className="flex items-center gap-8 bg-blue-50 p-6 rounded-lg">
          <div className="flex-1">
            <p className="text-lg font-medium mb-4 text-primary">
              We offer a full refund within 30 days of purchase if:
            </p>
            <ul className="list-none space-y-3">
              {[
                "Item is unused and in original packaging with no signs of wear or damage",
                "All tags, labels, and accessories are intact and included",
                "Proof of purchase (receipt or order number) is provided",
                "Item is returned in a resalable condition",
                "Return request is initiated within 30 days of delivery",
                "Product is not from the non-returnable items category",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 mr-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <Image
              alt="return policy illustration"
              width={200}
              height={200}
              src="/images/return.png"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Non-Returnable Items</h2>
        <div className="flex items-center gap-8">
          <div className="flex-1 bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl shadow-sm border border-red-100">
            <p className="text-lg font-medium mb-4 text-red-600">
              The following items cannot be returned:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  item: "Personalized/Customized Products",
                  desc: "Including engraved items",
                  icon: "🎨"
                },
                {
                  item: "Intimate Apparel",
                  desc: "Underwear, swimwear (hygiene reasons)",
                  icon: "👕"
                },
                {
                  item: "Digital Products",
                  desc: "Opened software & electronics",
                  icon: "💻"
                },
                {
                  item: "Perishable Items",
                  desc: "Food, beverages, flowers",
                  icon: "🥗"
                },
                {
                  item: "Beauty Products",
                  desc: "If opened or used",
                  icon: "💄"
                },
                {
                  item: "Health Items",
                  desc: "If seal is broken",
                  icon: "💊"
                },
                {
                  item: "Gift Cards",
                  desc: "And downloadable software",
                  icon: "🎁"
                },
                {
                  item: "Final Sale Items",
                  desc: "Marked as non-returnable",
                  icon: "🏷️"
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-white/50 p-3 rounded-lg">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{item.item}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <Image
              alt="return policy illustration"
              width={200}
              height={200}
              src="/images/non-return.png"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Refund Process</h2>
        <div className="space-y-4">
          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <span className="text-primary font-bold mr-4 text-nowrap">
              Step 1:
            </span>
            <p>
              Contact our support team at support@watawar.com with your order
              number and reason for return. Include photos if there are any
              defects.
            </p>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <span className="text-primary font-bold mr-4 text-nowrap">
              Step 2:
            </span>
            <p>
              Receive return authorization and prepaid shipping label via email
              within 24 hours. Package your item securely with all original
              materials.
            </p>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <span className="text-primary font-bold mr-4 text-nowrap">
              Step 3:
            </span>
            <p>
              Drop off package at nearest shipping location using provided
              label. Keep tracking number for reference.
            </p>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <span className="text-primary font-bold mr-4 text-nowrap">
              Step 4:
            </span>
            <p>
              Our team will inspect the returned item within 48 hours of
              receipt.
            </p>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <span className="text-primary font-bold mr-4 text-nowrap">
              Step 5:
            </span>
            <p>
              Refund processed to original payment method within 5-7 business
              days after successful inspection. You&apos;ll receive email
              confirmation.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-8 space-y-2">
          <p className="">
            Free shipping on first orders below ₦5000 and with in 2km to the
            store
          </p>
          <p className="">Standard delivery: 3-5 business days</p>
          <p>Express delivery: 1-2 business days (additional fees apply)</p>
        </div>
      </section>

      <section className="mt-12 border-t pt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4 text-primary">
          We&apos;re Here to Help! 👋
        </h3>
        <p className="text-gray-600 mb-6">
          Got questions? Our friendly support team is available 24/7 to assist
          you.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Start Live Chat
          </button>
          <a href={`mailto:help@watawara.com`} className="inline-block">
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-transform flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Support
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
