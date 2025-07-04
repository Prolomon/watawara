import mongoose from "mongoose";

// const MONGODB_URI =
//   "mongodb+srv://watawara_test:87NVQz5J0IYjcphw@watawara-test.rykprrq.mongodb.net/?retryWrites=true&w=majority&appName=watawara-test";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/watawara";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "watawara",
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
