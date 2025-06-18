"use client"
import { orderAction } from "@/backend/action/order";
import { useState } from "react";

export default function CheckButton () {
    const [message, setMessage] = useState("Order Now");
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const result = await userOtp(formData);

      setMessage(result);
    };
    return (
        <form action={orderAction}>
            <button type="submit" className="w-full mt-3 text-sm bg-primary hover:bg-secondary rounded-ms py-1 rounded-md text-black">{message}</button>
        </form>
    )
}