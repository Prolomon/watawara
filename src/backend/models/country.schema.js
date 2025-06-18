import mongoose from "mongoose";

const countrySchema = mongoose.Schema(
  {
    country: {
      name: { type: String },
      short: { type: String },
    },
    language: {
      lang: { type: String },
      short: { type: String },
    },
    currency: {
      type: { type: String },
      short: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
// export const Country = mongoose.models.Country || mongoose.model("Country", countrySchema);

let Country;
if (mongoose && mongoose.models && mongoose.models.Country) {
  Country = mongoose.models.Country;
} else if (mongoose) {
  Country = mongoose.model("Country", countrySchema);
} else {
  console.error("Mongoose is not available to define the Country model.");
  throw new Error("Mongoose instance is required to define the Country model.");
}

export { Country };
