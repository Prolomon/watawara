

export default async function Home () {
    return (
      <main className="w-full bg-gradient-to-br from-blue-50 to-amber-100 min-h-screen">
        <div className="w-11/12 py-10 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-700 mb-4 drop-shadow-lg animate-bounce">
            Welcome to Watawara!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium max-w-2xl mx-auto">
            Where innovation meets passion. We are more than just a brand—we are a movement, a community, and your trusted partner in making life extraordinary.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center mb-10">
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 border-t-4 border-amber-400">
              <h2 className="text-2xl font-bold text-amber-600 mb-2">Our Mission</h2>
              <p className="text-gray-600">To empower individuals and businesses with innovative solutions that inspire growth, creativity, and positive change.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 border-t-4 border-blue-400">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">Our Vision</h2>
              <p className="text-gray-600">To be the leading force in transforming ideas into reality, fostering a world where everyone thrives together.</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-200 to-blue-200 rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Why Choose Watawara?</h3>
            <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
              <li>Innovative products and services tailored to your needs</li>
              <li>Customer-centric approach with 24/7 support</li>
              <li>Community-driven values and social impact</li>
              <li>Trusted by thousands worldwide</li>
            </ul>
          </div>
          
        </div>
      </main>
    );
}