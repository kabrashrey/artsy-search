import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectToDB = async (): Promise<void> => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not defined in environment variables");
    }

    const mongo_db_url = `${process.env.DB_URL}/${DB_NAME}`;
    const connectionInstance = await mongoose.connect(mongo_db_url);

    console.log(`Connected to MongoDB DB_HOST: 
        ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;
