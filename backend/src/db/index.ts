import mongoose from "mongoose";
import { getCachedSecret } from "../utils/utils.js";

const connectToDB = async (): Promise<void> => {
  try {
    const DB_URL = getCachedSecret("DB_URL");
    const connectionInstance = await mongoose.connect(DB_URL);

    console.log(`Connected to MongoDB DB_HOST: 
        ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;
