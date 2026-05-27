import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");

    console.error(error);

    process.exit(1);
  }
}