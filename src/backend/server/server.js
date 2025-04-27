import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "watawara",
      bufferCommands: false,
    });
    console.log("successful connected to mongoDB");
  } catch (error) {
    console.log(error.message);
  }
};