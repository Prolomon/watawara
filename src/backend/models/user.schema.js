import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    status: { type: String, default: "active", enum: ["active", "inactive", "ban", "special"]  },
    fullname: { type: String },
    avatar: { type: String, default: "/images/avatar.jpg" },
    email: { type: String, unique: true },
    phoneNo: { type: String, unique: true },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female"]  },
    isWallet: { type: Boolean, default: false,  enum: [true, false]  },
    password: { type: String },
    country: { type: String, default: "nigeria" },
    currency: { type: String, default: "NGN" },
    language: { type: String, default: "english" },
    reviews: [
      {
        date: { type: Date },
        review: { type: String },
      },
    ],
    coupons: [{ type: String }],
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      landmark: { type: String },
      postalCode: { type: String },
      address: { type: String },
    },
    followed: [{ type: String }],
    cart: [
      {
        productId: { type: String },
        quantity: { type: String, default: "1" },
        color: { type: String },
        size: { type: String },
      },
    ],
    checkout: {
      userId: { type: String },
      delivery: { type: String },
      payment: { type: Boolean, default: false },
      date: { type: Date, default: Date.now() },
      subTotal: { type: String },
      tax: { type: String },
      shipping: { type: String },
      total: { type: String },
      status: { type: String, default: "inactive" },
      products: [
        {
          productId: { type: String },
          quantity: { type: String, default: "1" },
          color: { type: String },
          size: { type: String },
        },
      ],
    },
    wishlist: [{ productId: { type: String } }],
    otp: {type: Number},
    role: { type: String, default: "user" },
    authProviderId: { type: String },
  },
  { timestamps: true }
);

// export const User = mongoose.models.User || mongoose.model("User", userSchema);
let User;
if (mongoose && mongoose.models && mongoose.models.User) {
  User = mongoose.models.User;
} else if (mongoose) {
  User = mongoose.model("User", userSchema);
} else {
  console.error("Mongoose is not available to define the User model.");
  throw new Error("Mongoose instance is required to define the User model.");
}

export { User };
