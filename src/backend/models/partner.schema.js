import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productsSchema = mongoose.Schema(
  {
    id: { type: String, default: uuidv4 },
    status: { type: String, default: "active", enum: ["active", "inactive", "pending"] },
    companyName: { type: String, required: true },
    businessType: { type: String, required: true },
    contactPerson: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        position: { type: String }
    },
    contactInfo: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            postalCode: { type: String, required: true }
        }
    },
    bankDetails: {
        accountName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        bankName: { type: String, required: true },
        swiftCode: { type: String }
    },
    taxInfo: {
        taxId: { type: String },
        vatNumber: { type: String }
    },
    commissionRate: { type: Number, required: true, min: 0, max: 100 },
    paymentTerms: { type: String, required: true },
    contractStartDate: { type: Date, required: true },
    contractEndDate: { type: Date }
    
},
  {
    timestamps: true,
  }
);
export const Products =
  mongoose.models.Products || mongoose.model("Products", productsSchema);
