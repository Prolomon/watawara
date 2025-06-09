"use client";
import { useState } from "react";

export default function ReferalForm() {
  const [textCopy, setTextCopy] = useState("0987654321");
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textCopy);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  return (
    <div className="block">
      <h1 className="text-[2.5rem] font-bold text-center text-primary">
        <span className="font-bold text-xl text-gray-600">Invite a friend</span>{" "}
        Get 500 JumPoints
      </h1>
      <p className="text-sm text-center">
        Invite a friend to enjoy ecommerce purchase and money transfer
      </p>
      <div className="rounded-xl shadow-sm border border-gray-100 w-[28rem] max-sm:w-full mx-auto p-3 my-3">
        <h5 className="text-base font-semibold capitalize text-center ">
          Share Invitation Code
        </h5>
        <div className="flex mx-auto items-center gap-3 mt-2 justify-center">
          <input
            type="number"
            name="userId"
            className="py-2 px-3 rounded-xl text-center text-lg bg-gray-300 text-gray-800 font-semibold"
            value="0987654321"
            readOnly
          />
          <button
            onClick={handleCopy}
            className="text-base px-3 py-2.5 rounded-xl bg-primary text-gray-800 font-semibold"
          >
            {isCopy ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div>
        <h5 className="font-semibold text-center text-base">
          How to use the invitation code?
        </h5>
        <p className="text-lg text-center">
          If your friend register on Watawara with your invitation code and
          perform the necessary task, you will get the referal bonus.
        </p>
        <div className="gap-3 flex my-2">
          <div className="rounded-xl shadow-sm border border-gray-200 p-3 w-full">
            <div className="bg-amber-100 text-gray-800 font-semibold grid place-content-center rounded-full w-16 h-16 text-xl mx-auto">
              <span>1</span>
            </div>
            <p className="text-lg text-center mt-2">
              Share your invitation code with a friend or Share invitation code
              with a friend and inform them to download the app or visit{" "}
              <a href="ww.Watawara.com">www.Watawara.com</a>{" "}
            </p>
          </div>
          <div className="rounded-xl shadow-sm border border-gray-200 p-3 w-full">
            <div className="bg-amber-100 text-gray-800 font-semibold grid place-content-center rounded-full w-16 h-16 text-xl mx-auto">
              <span>2</span>
            </div>
            <p className="text-lg text-center mt-2">
              One your friend register on the website or app with your referal
              code, then they will receive 200 JumPoints instantly.
            </p>
          </div>
          <div className="rounded-xl shadow-sm border border-gray-200 p-3 w-full">
            <div className="bg-amber-100 text-gray-800 font-semibold grid place-content-center rounded-full w-16 h-16 text-xl mx-auto">
              <span>3</span>
            </div>
            <p className="text-lg text-center mt-2">
              Once your friend make a transaction above ₦2500 during the first 2
              days of registering, you get a 800 JumPoint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
