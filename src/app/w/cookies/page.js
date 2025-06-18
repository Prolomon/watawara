import { Shield, Cookie, ShoppingBag, Target, Lock } from "lucide-react";
export default function Home() {
  return (
    <main className="w-11/12 pb-4 mx-auto">
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-primary">
          <Cookie className="h-8 w-8" />
          Cookie Policy
        </h1>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Essential Cookies</h2>
                <p className="text-gray-600">These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-4">
              <ShoppingBag className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Shopping Experience</h2>
                <p className="text-gray-600">We use cookies to remember your shopping cart items, wishlist, and preferences to provide you with a seamless shopping experience.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Personalization</h2>
                <p className="text-gray-600">These cookies help us show you relevant products and recommendations based on your browsing history and preferences.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-4">
              <Lock className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Security & Performance</h2>
                <p className="text-gray-600">We use security cookies to authenticate users, prevent fraudulent use, and protect user data while you browse our store.</p>
              </div>
            </div>
          </section>

          <p className="text-sm text-gray-500 mt-6">
            By continuing to use our website, you agree to our use of cookies. You can manage your cookie preferences through your browser settings at any time.
          </p>
        </div>
      </div>
    </main>
  );
}
