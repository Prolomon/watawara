"use client";
import { useState, useEffect } from "react";

const PrivacyCookiePolicy = () => {
  const [show, setShow] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const isDismissed = localStorage.getItem("privacyPolicyDismissed");
    if (!isDismissed) {
      setShow(true);
    }
  }, []);

  const hide = () => {
    setShow(false);
    localStorage.setItem("privacyPolicyDismissed", "true"); // Save dismissal in localStorage
  };

  return (
    <>
      {show ? (
        <div
          className={`max-w-xl p-4 max-md:w-full bg-white rounded-lg sticky left-4 top-4 z-[9999] border border-gray-300 shadow-sm`}
        >
          <h1 className="text-xl font-bold mb-2">Privacy & Cookie Policy</h1>
          <p className="mb-2 text-sm">
            We use cookies to enhance your experience with us. By clicking &apos;Accept All&apos;, you agree to our use of cookies. For details, see our{" "}
            <a href="/privacy-policy" className="underline text-blue-600">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/cookie-policy" className="underline text-blue-600">
              Cookie Policy
            </a>.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={hide}
              className="bg-primary text-white px-6 text-sm py-2 hover:bg-secondary rounded-full"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={hide}
              className="bg-primary text-white px-6 text-sm py-2 hover:bg-secondary rounded-full"
            >
              Accept All
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PrivacyCookiePolicy;