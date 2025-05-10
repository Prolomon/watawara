"use client";
import Input from "@/utilities/input/Input";
import Textarea from "@/utilities/textarea/Textarea";
import { bankList } from "@/backend/bankList";
import { bank } from "@/backend/wallet/bank";
import { useState } from "react";

export default function TransferForm() {
  const [message, setMessage] = useState("");
  async function handleTransferSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const result = await bank(formData); // Call the server action

    if (result.error) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  }
  return (
    <form className="block" onSubmit={handleTransferSubmit}>
      {message && (
        <div className="w-full text-red-700 rounded-md p-2 text-sm bg-red-200">
          {message}
        </div>
      )}
      <Input title={`account number`} type={`number`} name={`accountNo`} />
      <div className="mb-1.5">
        <label
          htmlFor={`bank`}
          className="text-sm font-semibold text-gray-700 capitalize"
        >
          Bank Name
        </label>
        <div className="w-full rounded-md border border-gray-400 text-gray-800 text-sm mt-1 px-2 py-1.5">
          <select
            name={`bank`}
            id={`bank`}
            className="capitalize w-full border-none outline-none bg-transparent"
          >
            <option>Select a bank</option>
            {bankList?.map((_o, index) => (
              <option key={index} value={_o.code} className="capitalize">
                {_o.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Input title={`recipient name`} type={`text`} name={`name`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <Textarea title={`remark`} type={`text`} name={`remark`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
