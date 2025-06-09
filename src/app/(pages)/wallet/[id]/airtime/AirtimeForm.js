"use client"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";
import { useState } from "react";
import { airtime } from "@/backend/wallet/airtime";

export default function AirtimeForm() {

  const [message, setMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const result = await airtime(formData); // Call the server action

    if (result.error) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  }

  return (
    <form className="block" onSubmit={handleSubmit}>
      {message && (
        <div className="w-full text-red-700 rounded-md p-2 text-sm bg-red-200">
          {message}
        </div>
      )}
      <Select
        title={`network provider`}
        name="provider"
        options={["MTN", "AIRTEL", "9MOBILE", "GLO"]}
      />
      <Input title={`phone number`} type={`tel`} name={`phoneNo`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-base text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
