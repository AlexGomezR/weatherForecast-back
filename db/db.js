import mongoose from "mongoose";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

export async function connectToDatabase() {
  try {
    console.log(process.env.DB_CONNECTION);
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}
