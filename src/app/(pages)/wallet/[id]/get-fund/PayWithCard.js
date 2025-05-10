"use client";
import { ChevronDown, CreditCard } from "lucide-react";
import { useState } from "react";

export default function PayWithCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(""); // Added amount field

  const [errors, setErrors] = useState({});

  const validateCardNumber = (number) => {
    if (!number) return "Card number is required.";
    if (!/^\d{13,19}$/.test(number.replace(/\s/g, "")))
      return "Card number must be 13-19 digits.";
    return "";
  };

  const validateExpiryDate = (date) => {
    if (!date) return "Expiry date is required.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(date))
      return "Expiry date must be in MM/YY format.";
    const [month, year] = date.split("/");
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1;
    if (parseInt(year, 10) < currentYear) return "Card has expired (year).";
    if (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
      return "Card has expired (month).";
    return "";
  };

  const validateCvv = (cvv) => {
    if (!cvv) return "CVV is required.";
    if (!/^\d{3,4}$/.test(cvv)) return "CVV must be 3 or 4 digits.";
    return "";
  };

  const validateAmount = (value) => {
    if (!value) return "Amount is required.";
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return "Please enter a valid amount.";
    return "";
  }

  const handleInputChange = (setter, validator, fieldName) => (e) => {
    const value = e.target.value;
    setter(value);
    if (validator) {
      const error = validator(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    }
  };
  
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiryDate(value);
    const error = validateExpiryDate(value);
    setErrors((prevErrors) => ({ ...prevErrors, expiryDate: error }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const cardNumberError = validateCardNumber(cardNumber);
    const expiryDateError = validateExpiryDate(expiryDate);
    const cvvError = validateCvv(cvv);
    const amountError = validateAmount(amount);

    const newErrors = {
      cardNumber: cardNumberError,
      expiryDate: expiryDateError,
      cvv: cvvError,
      amount: amountError,
    };
    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some((error) => error);

    if (isValid) {
      console.log("Form is valid. Submitting card details:", {
        cardNumber,
        expiryDate,
        cvv,
        amount,
      });
      alert("Payment details submitted (simulated). Check console.");
    } else {
      console.log("Form has errors:", newErrors);
    }
  };
 
  return (
    <details className="w-full list-none mt-3 rounded-md border border-gray-300 shadow-sm p-4">
      <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
        <div className="inline-flex gap-2 items-center">
          <CreditCard size={20} />
          <span>Fund with Card</span>
        </div>
        <div className="inline-flex gap-2 items-center">
          <span className="text-gray-400"></span>
          <ChevronDown size={20} />
        </div>
      </summary>
      <form onSubmit={handleSubmit} className="mt-4">
        <p className="text-sm text-gray-600 mb-3">
          Enter your card details to fund your wallet.
        </p>
        <div>
            <div className="mb-1.5">
                <label htmlFor="amount" className="text-sm font-semibold text-gray-700 capitalize">Amount</label>
                <input
                inputMode="numeric"
            type="number"
            id="amount"
            name="amount"
            title="Amount to Fund"
            value={amount}
            onChange={handleInputChange(setAmount, validateAmount, "amount")}
            error={errors.amount}
            placeholder="e.g., 1000"
            className={`w-full rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent focus:border-amber-400 focus:border-2`}
            />
          </div>
           <div className="mb-1.5">
                <label htmlFor="cardNumber" className="text-sm font-semibold text-gray-700 capitalize">Card Number</label>
                <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            title="Card Number"
            value={cardNumber}
            onChange={handleInputChange(
              setCardNumber,
              validateCardNumber,
              "cardNumber"
            )}
            error={errors.cardNumber}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className={`w-full rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent focus:border-amber-400 focus:border-2`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="mb-1.5">
                <label htmlFor="expireDate" className="text-sm font-semibold text-gray-700 capitalize">Expire Date</label>
            <input
              type="text" // Use text to allow "/"
              id="expiryDate"
              name="expiryDate"
              title="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={handleExpiryDateChange} // Use special handler
              error={errors.expiryDate}
              placeholder="MM/YY"
              maxLength={5}
              className={`w-full rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent focus:border-amber-400 focus:border-2`}
                />
            </div>
             <div className="mb-1.5">
                <label htmlFor="cvv" className="text-sm font-semibold text-gray-700 capitalize">CVV</label>
            <input
              type="password" 
              id="cvv"
              name="cvv"
              title="CVV"
              value={cvv}
              onChange={handleInputChange(setCvv, validateCvv, "cvv")}
              error={errors.cvv}
              placeholder="123"
              maxLength={4}
              className={`w-full rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent focus:border-amber-400 focus:border-2`}
            />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark rounded-md p-2 mt-4 cursor-pointer font-semibold text-base text-gray-800"
            disabled
            aria-disabled
          >
            Coming soon
          </button>
        </div>
      </form>
    </details>
  );
}
