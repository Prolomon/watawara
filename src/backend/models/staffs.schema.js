import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { number } from "zod";

const staffSchema = mongoose.Schema(
  {
    fullname: { type: String },
    id: { type: String, unique: true },
    email: { type: String },
    officialMail: { type: String },
    phoneNo: { type: String },
    role: { type: String },
    portfolio: { type: String },
    username: { type: String },
    education: {
      type: String,
      enum: [
        "WAEC/NECO",
        "OND",
        "HND",
        "Bachelor's Degree",
        "Post Graduate Diploma",
        "Master's Degree",
        "Doctorate Degree (PhD)",
      ],
    },
    avatar: { type: String },
    signature: { type: String },
    password: { type: String },
    marital: { type: String, enum: ["single", "married", "divorced"] },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female"] },
    status: { type: String, enum: ["active", "inactive", "restrict"] },
    documents: [
      {
        type: { type: String },
        file: { type: String },
      },
    ],
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      landmark: { type: String },
      postalCode: { type: String },
      address: { type: String },
    },
    guarantor: {
      fullname: { type: String },
      email: { type: String },
      phoneNo: { type: String },
      address: { type: String },
    },
    salary: {
      bank: {
        bankName: { type: String },
        accountName: { type: String },
        accountNumber: { type: String },
        salary: { type: Number, default: 0.0 },
        date: { type: Date },
      },
      pension: {
        pensionName: { type: String },
        accountName: { type: String },
        accountNumber: { type: String },
      },
    },
    attendance: [{ type: Date }],
  },
  {
    timestamps: true,
  }
);

// export const Staffs =
//   mongoose.models.Staffs || mongoose.model("Staffs", staffSchema);

  let Staffs;
  if (mongoose && mongoose.models && mongoose.models.Staffs) {
    Staffs = mongoose.models.Staffs;
  } else if (mongoose) {
    Staffs = mongoose.model("Staffs", staffSchema);
  } else {
    console.error("Mongoose is not available to define the staffs model.");
    throw new Error(
      "Mongoose instance is required to define the staffs model."
    );
  }

  export { Staffs };