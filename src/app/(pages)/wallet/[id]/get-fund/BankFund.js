"use client"
import Input from "@/utilities/input/Input";
import { ChevronDown, Landmark } from "lucide-react";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function BankFund({ accountNo, bankName, fullname }) {
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = async () => {
        if (!accountNo) return;
        
        await navigator.clipboard.writeText(accountNo);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
    };
  return (
    <details className="w-full list-none mt-3 rounded-md border border-gray-300 shadow-sm p-4">
      <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
        <div className="inline-flex gap-2 items-center">
          <Landmark size={20} />
          <span>Fund By Bank Transfer</span>
        </div>
        <div className="inline-flex gap-2 items-center">
          <span className="text-gray-400"></span>
          <ChevronDown size={20} />
        </div>
      </summary>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Share your user ID with the person you want to fund you.
        </p>
        <div>
          {/* bank name */}
          <div className="mt-3 flex items-end gap-2">
            <Input
              type="text"
              id={bankName}
              title="Bank"
              value={bankName}
              readOnly={true}
            />
          </div>
          {/* account number */}
          <div className="flex items-end gap-2">
            <Input
              type="text"
              id={accountNo}
              title="Account Number"
              value={accountNo}
              readOnly={true}
            />
            <button
              onClick={handleCopyToClipboard}
              type="button"
              className="w-auto aspect-square p-2 rounded-md mb-2 bg-amber-500 text-slate-900"
            >
              <Copy size={15} />
            </button>
          </div>
          {/* fullname */}
          <div className="flex items-end gap-2">
            <Input
              type="text"
              id={fullname}
              title="Account Name"
              value={fullname}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </details>
  );
}
