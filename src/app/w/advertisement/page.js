import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-2xl shadow-2xl mx-4 md:mx-8 max-md:py-10 my-8">
        <div className=" text-white h-full text-center md:w-1/2 transform  transition-transform duration-300">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100 px-2 max-md:mx-2">
            Advertise with Us
          </h1>
          <p className="text-lg max-md:text-base mt-2 leading-relaxed text-amber-50">
            Reach thousands of potential customers through our innovative
            platform
          </p>
          <div className="mt-4">
            <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative h-[400px] hidden md:block">
          <Image
            alt="Advertisement illustration"
            width={800}
            height={600}
            src="/images/advert.jpg"
            className="object-cover w-full h-full transform transition-transform duration-500 rounded-r-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amber-600/10" />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-11/12 mx-auto p-8 mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary drop-shadow-sm">
          Why Advertise with Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
            <div className="text-4xl mb-6 text-amber-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2zm3.5-3.5l2.5-2.5 2.5 2.5-1.5 1.5-1-1-1 1-1.5-1.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-amber-800">
              Targeted Reach
            </h3>
            <p className="text-amber-700">
              Connect with your ideal audience through precise targeting options
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
            <div className="text-4xl mb-6 text-amber-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-amber-800">
              Analytics & Insights
            </h3>
            <p className="text-amber-700">
              Track your campaign performance with detailed analytics
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
            <div className="text-4xl mb-6 text-amber-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-amber-800">
              Competitive Pricing
            </h3>
            <p className="text-amber-700">
              Flexible advertising packages to suit your budget
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-11/12 mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Get Started Today
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input type="text" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input type="tel" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea className="w-full px-4 py-2 border rounded-md h-32"></textarea>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-md hover:bg-amber-300 transition-colors">
            Submit Inquiry
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-100 p-8 text-center mt-12">
        <h2 className="text-xl font-semibold mb-4">Need More Information?</h2>
        <p className="text-gray-600">
          Contact our advertising team directly at{" "}
          <a
            href="mailto:ads@watawara.com"
            className="text-amber-600 hover:underline"
          >
            ads@watawara.com
          </a>{" "}
          or call us at{" "}
          <a href="tel:00000000000" className="text-amber-600 hover:underline">
            00000000000
          </a>
        </p>
      </div>
    </main>
  );
}
