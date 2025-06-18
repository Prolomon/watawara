import mongoose from "mongoose";
import { nanoid } from "nanoid";

const sellerSchema = new mongoose.Schema({
  storeId: { type: String, default: nanoid()}, // Reference to user account
  businessInfo: {
    name: String,
    logo: String,
    description: String,
    email: { type: String, required: true, sparse: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    phone: String,
    type: { type: String, enum: ["Sole Proprietorship", "LLC", "Corporation", "Partnership", "Non-profit", "E-commerce Seller", "Dropshipper", "Retailer", "Wholesaler", "Manufacturer", "Freelancer", "Consultant", "Agency", "Content Creator", "Startup", "Government"], },
    yearsInBusiness: Number,
    website: String,
    registrationNumber: String,
    taxId: String
  },
  verification: {
    status: { type: String, enum: ["Unverified", "Pending", "Verified", "Rejected"], default: "Unverified" },
    documents: [{
      type: { type: String, enum: ["NIN", "Business License", "Tax Certificate", "Bank Statement"] },
      url: String,
      uploadedAt: Date
    }],
    verifiedAt: Date,
    rejectionReason: String
  },
  financial: {
    bankAccount: {
      number: String, // Encrypted in application
      routing: String, // Encrypted in application
      name: String,
      holder: String
    },
    currency: { type: String, default: "NGN" },
    payoutThreshold: { type: Number, default: 100 },
    payoutFrequency: { type: String, enum: ["Weekly", "Bi-weekly", "Monthly"], default: "Weekly" }
  },
  storefront: {
    name: String,
    slug: String, // URL-friendly store name
    logo: String,
    banner: String,
    description: String,
    policies: {
      returns: String,
      shipping: String
    },
    contact: String,
    rating: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, default: 0 }
    }
  },
  metrics: {
    products: {
      total: { type: Number, default: 0 },
      active: { type: Number, default: 0 }
    },
    visitors: { type: Number, default: 0 },
    conversion: { type: Number, default: 0 },
    aov: { type: Number, default: 0 }, // Average Order Value
    returnRate: { type: Number, default: 0 }
  },
  performance: {
    deliveryRate: Number,
    defectRate: Number,
    cancellationRate: Number,
    responseRate: Number,
    avgResponseTime: Number, // in hours
    violations: { type: Number, default: 0 },
    tier: { type: String, enum: ["Bronze", "Silver", "Gold", "Platinum"], default: "Bronze" }
  },
  subscription: {
    plan: { type: String, enum: ["Free", "Basic", "Pro", "Enterprise"], default: "Free" },
    fee: { type: Number, default: 0 },
    commission: Number,
    limits: {
      storage: Number, // in MB
      products: Number
    },
    features: [String], // Array of enabled features
    startedAt: Date,
    renewsAt: Date,
    status: { type: String, enum: ["Active", "Pending", "Cancelled", "Suspended"], default: "Active" }
  },
  addresses: [{
    type: { type: String, enum: ["Business", "Warehouse", "Return"] },
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  }],
  categories: [{
    name: String,
    description: String,
    isApproved: { type: Boolean, default: false }
  }],
  auth: {
    password: { type: String, select: false },
    lastPasswordChange: Date,
    failedLoginAttempts: { type: Number, default: 0 },
    accountLockedUntil: Date,
    resetPasswordToken: String,
    resetTokenExpires: Date,
    twoFactorEnabled: Boolean,
    twoFactorSecret: String
  },
  lastLogin: Date,
  notifications: [
    {
      id: { type: String, default: nanoid()},
      summary: { type: String },
      message: { type: String },
      time: { type: String },
      type: { 
        type: String, 
        enum: ["welcome", "order", "security", "reminder", "subscription", "profile", "billing", "product" ], 
        required: true 
      }
    }],
  preference: {
    notification: {
      email: {
        marketing: { type: Boolean, default: true },
        account: { type: Boolean, default: true },
        security: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: true }
      },
      push : {
        marketing: { type: Boolean, default: true },
        account: { type: Boolean, default: true },
        security: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: true }
      }
    }
  },
  status: { type: String, enum: ["Active", "Suspended", "Banned"], default: "Active" }
},{
  timestamps: true,
});
  
const Seller = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);

export { Seller };