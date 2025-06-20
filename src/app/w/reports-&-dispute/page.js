"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full pb-4 bg-gray-50">
      <div className="w-11/12 mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
          <h2 className="text-2xl font-semibold mb-4">
            Report & Dispute Center
          </h2>

          <div className="flex gap-6 mb-8">
            <div className="flex-1 p-6 border-2 rounded-xl hover:border-primary cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="font-semibold text-lg">Report an Issue</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Spot something suspicious? Help us maintain a safe marketplace
                by reporting concerning activities.
              </p>
            </div>
            <div className="flex-1 p-6 border-2 rounded-xl hover:border-primary cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
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
                <h3 className="font-semibold text-lg">Open a Dispute</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Not satisfied with your order? Let&apos;s resolve it together
                through our dispute resolution center.
              </p>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Quick Access
            </h3>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
              <Link
                href="/w/reports-&dispute"
                className="flex items-center p-3 bg-white rounded-lg hover:bg-primary/5 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-primary mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Track My Dispute
                </span>
              </Link>
              <Link
                href="/w/purchase-protection"
                className="flex items-center p-3 bg-white rounded-lg hover:bg-primary/5 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-primary mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Purchase Protection
                </span>
              </Link>
              <Link
                href="/w/contact-us"
                className="flex items-center p-3 bg-white rounded-lg hover:bg-primary/5 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-primary mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Contact Support
                </span>
              </Link>
              <Link
                href="/w/frequently-asked-question"
                className="flex items-center p-3 bg-white rounded-lg hover:bg-primary/5 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-primary mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium text-gray-600">FAQs</span>
              </Link>
            </div>
          </div>

          <form className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
            <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                What seems to be the issue?
              </label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 hover:bg-white transition-colors duration-300">
                <option value="">Choose your concern</option>
                <option value="order">Order Issues</option>
                <option value="product">Product Quality</option>
                <option value="seller">Seller Behavior</option>
                <option value="shipping">Shipping Problems</option>
                <option value="payment">Payment Issues</option>
                <option value="account">Account Security</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Order Number
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 hover:bg-white transition-colors duration-300"
                placeholder="Optional - Enter your order number"
              />
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Tell us what happened
              </label>
              <textarea
                rows="4"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 hover:bg-white transition-colors duration-300"
                placeholder="Help us understand your situation better..."
              ></textarea>
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Add Supporting Documents
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors duration-300 relative"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("border-primary");
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove("border-primary");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-primary");
                  const files = Array.from(e.dataTransfer.files);
                  // Handle dropped files here
                }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    // Handle selected files here
                  }}
                />
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Drag and drop your files here, or{" "}
                    <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    <svg
                      className="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    Supports images, videos, PDFs, or DOC files (Max 5 files,
                    10MB each)
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2" id="preview"></div>
              </div>
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                How should we reach you?
              </label>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="contact"
                    id="email"
                    className="w-5 h-5 text-primary accent-primary"
                  />
                  <label
                    htmlFor="email"
                    className="ml-3 text-gray-700 font-medium"
                  >
                    <svg
                      className="w-4 h-4 inline mr-1"
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
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="contact"
                    id="phone"
                    className="w-5 h-5 text-primary accent-primary"
                  />
                  <label
                    htmlFor="phone"
                    className="ml-3 text-gray-700 font-medium"
                  >
                    <svg
                      className="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Phone
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-6 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                <svg
                  className="w-5 h-5 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Submit Your Report
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p className="mb-2">
              Our support team typically responds within 24 hours. For immediate
              assistance, please contact our{" "}
              <Link href="#" className="text-primary hover:underline">
                customer service team
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
