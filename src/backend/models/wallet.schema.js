import mongoose from "mongoose"

const walletSchema = mongoose.Schema({
    userId: { type: String, unique: true },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    balance: { type: String, default: "0" },
    history: { type: String },
    points: { type: String, default: "500" },
    idType: { type: String },
    idNumber: { type: String },
    accountNo: { type: String },
    bankName: { type: String },
    loan: { type: String },
    savings: { type: String },
    phoneNo: { type: String },
    beneficiaries: [
        {
            accountName: { type: String },
            accountNo: { type: String },
            bank: { type: String },
        }
    ],
    role: {type: String, default: "user"},
}, { timestamps: true })

export const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);