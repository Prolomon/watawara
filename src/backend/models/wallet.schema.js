import mongoose from "mongoose";

const walletSchema = mongoose.Schema(
  {
    userId: { type: String, unique: true },
    flwAccountId: { type: String },
    txRef: { type: String },
    uniqueId: { type: String },
    isActive: { type: Boolean, default: false, enum: [true, false] },
    isVerified: { type: Boolean, default: false, enum: [true, false] },
    balance: { type: mongoose.Schema.Types.Decimal128, default: 0.0 },
    currency: { type: String, default: "NGN", enum: ["NGN", "USD", "EUR"] },
    dob: { type: Date },
    history: [
      {
        transactionId: { type: String },
        description: { type: String },
        amount: { type: mongoose.Schema.Types.Decimal128 },
        type: { type: String, enum: ["credit", "debit"] },
        status: { type: String, enum: ["pending", "success", "failed"] },
        date: { type: Date, default: Date.now },
        relatedParty: { type: Array },
      },
    ],
    points: { type: mongoose.Schema.Types.Decimal128, default: 500 },
    idType: { type: String, enum: ["NIN", "BVN"], unique: true },
    idNumber: { type: String },
    accountNo: { type: String },
    bankName: { type: String },
    loan: { type: mongoose.Schema.Types.Decimal128, default: 0.0 },
    savings: { type: mongoose.Schema.Types.Decimal128, default: 0.0 },
    beneficiaries: [
      {
        accountName: { type: String },
        accountNo: { type: String },
        bank: { type: String },
      },
    ],
    role: { type: String, default: "tier1", enum: ["tier1", "tier2", "tier3"] },
  },
  { timestamps: true }
);

let Wallet;
if (mongoose && mongoose.models && mongoose.models.Wallet) {
  Wallet = mongoose.models.Wallet;
} else if (mongoose) {
  Wallet = mongoose.model("Wallet", walletSchema);
} else {
  console.error("Mongoose is not available to define the Wallet model.");
  throw new Error("Mongoose instance is required to define the Wallet model.");
}

export { Wallet };