import { AlarmClock, Box, Hand, Lightbulb, Mail, Package, Phone } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto w-11/12">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Choose Your Shipping Speed
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-lg hover:shadow-xl border border-muted transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Standard Shipping
              </h3>
              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <p className="text-amber-400 font-medium">7-14 business days</p>
                <p className="text-primary font-bold mt-2">
                  FREE on orders over ₦1000
                </p>
              </div>
              <div className="mt-auto">
                <span className="inline-block bg-amber-100 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Most Economic
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg hover:shadow-xl border border-muted transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Express Shipping
              </h3>
              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <p className="text-purple-700 font-medium">3-5 business days</p>
                <p className="text-purple-900 font-bold mt-2">
                  +₦3500 shipping fee
                </p>
              </div>
              <div className="mt-auto">
                <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Popular Choice
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-rose-50 rounded-xl p-6 shadow-lg hover:shadow-xl border border-muted transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-3 text-rose-900">
                Premium Shipping
              </h3>
              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <p className="text-rose-700 font-medium">1-2 business days</p>
                <p className="text-rose-900 font-bold mt-2">
                  +₦5200 shipping fee
                </p>
              </div>
              <div className="mt-auto">
                <span className="inline-block bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium">
                  Fastest Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Our Shipping Promise
        </h2>
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-8 shadow-lg border border-amber-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium">
                    Lightning-fast processing within 1-2 business days
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium">
                    Flexible shipping options for your convenience
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium">
                    Global shipping to select countries worldwide
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium">
                    Real-time tracking updates via email
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium">
                    Note: Customer responsible for customs fees
                  </span>
                </li>
              </ul>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <Image
                alt="return policy illustration"
                width={250}
                height={250}
                src="/images/shipping-policy.png"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-primary inline-flex gap-2 items-center">
          Important Delivery Details
          <Package
            className="h-8 w-8"
            fill="#f59e0b"
            color="#ffffff"
            strokeWidth={1}
          />
        </h2>
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Address Accuracy
                  </h3>
                  <p className="text-gray-700">
                    Double-check your shipping address at checkout - accuracy
                    ensures your package arrives safely! We cannot redirect
                    packages sent to incorrect addresses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Apartment Deliveries
                  </h3>
                  <p className="text-gray-700">
                    Living in an apartment? Don&apos;t forget your unit number!
                    Include building access codes or special instructions if
                    needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Signature Required
                  </h3>
                  <p className="text-gray-700">
                    Premium items require a signature upon delivery. Not home
                    during the day? Consider shipping to your workplace or
                    arrange for a pickup.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-xl p-6 border border-amber-50">
              <h3 className="text-lg font-semibold text-primary mb-4 inline-flex items-center gap-2">
                Pro Delivery Tips{" "}
                <Lightbulb className="h-5 w-5" fill="#f59e0b" />
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-primary">•</span>
                  Add delivery instructions in the notes section
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-primary">•</span>
                  Enable SMS notifications for delivery updates
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-primary">•</span>
                  Consider weather protection for your deliveries
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-primary">•</span>
                  Have a safe spot for leaving packages
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-primary inline-flex items-center gap-2">
          Need Help? We&apos;re Here!{" "}
          <Hand className="h-6 w-6" fill="#f59e0b" />
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 bg-gradient-to-br from-white to-amber-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Have questions about your shipment? Our friendly customer service
              team is ready to assist you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg hover:bg-white/90 transition-all">
                <Mail className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <p className="text-primary font-semibold">
                    support@watawara.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg hover:bg-white/90 transition-all">
                <Phone className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="text-primary font-semibold">1-800-WATAWARA</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg hover:bg-white/90 transition-all">
                <AlarmClock className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-400">Business Hours</p>
                  <p className="text-primary font-semibold">
                    Monday - Friday, 9AM - 5PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Image
              alt="Contact support illustration"
              width={300}
              height={300}
              src="/images/contact.png"
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
