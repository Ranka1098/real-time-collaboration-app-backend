import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const URL = process.env.Mongo_Url;
  mongoose.connect(URL);
  console.log("database connection established successfully");
};

export default connectDB;
