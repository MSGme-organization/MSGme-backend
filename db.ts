import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
