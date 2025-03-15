import mongoose, { Schema, Document, Model, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

type IUserMethods = {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
};

interface IUser extends Document, IUserMethods {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  refreshToken?: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: [true, "password is required"] },
  avatar: { type: String }, // gravatar URL
  refreshToken: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];

  if (!secret || !expiry) {
    throw new Error(
      "Environment variables ACCESS_TOKEN_SECRET and ACCESS_TOKEN_EXPIRY must be defined"
    );
  }
  // short lived access token
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    secret,
    { expiresIn: expiry }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

  if (!secret || !expiry) {
    throw new Error(
      "Environment variables REFRESH_TOKEN_SECRET and REFRESH_TOKEN_EXPIRY must be defined"
    );
  }
  // long lived refresh token
  return jwt.sign(
    {
      _id: this._id,
    },
    secret,
    { expiresIn: expiry }
  );
};

const Users: Model<IUser> = mongoose.model<IUser>("Users", userSchema);
export type { IUser };
export { Users };
