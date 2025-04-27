import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    status: { type: String, default: "active" },
    fullname: { type: String },
    avatar: { type: String, default: "/images/avatar.jpg" },
    email: { type: String, unique: true },
    phoneNo: { type: String, unique: true },
    dob: { type: Date },
    gender: { type: String },
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
    orders: [
      {
        productId: { type: String },
        storeId: { type: String },
        orderId: { type: String },
        quantity: { type: String },
        color: { type: String },
        size: { type: String },
        delivery: { type: String },
        date: { type: Date },
        status: { type: String, default: "processing" },
        timeline: {
          orderPlaced: { type: Boolean },
          paymentConfirmed: { type: Boolean },
          orderProcessing: { type: Boolean },
          orderShipped: { type: Boolean },
          ready: { type: Boolean },
        },
      },
    ],
    role: { type: String, default: "user" },
    authProviderId: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
