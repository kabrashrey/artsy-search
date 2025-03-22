import mongoose from "mongoose";
import { constants } from "../constants.js";

const connectToDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(constants.DB_URL);

    console.log(`Connected to MongoDB DB_HOST: 
        ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;
