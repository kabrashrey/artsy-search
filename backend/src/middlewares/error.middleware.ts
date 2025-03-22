import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { APIError } from "../utils/APIError.js";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;

  if (!(error instanceof APIError)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
    const message = error.message || "Something went wrong";
    error = new APIError(statusCode, message, error?.errors || [], error.stack);
  }
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };
  res.status(error.statusCode).json(response);
};

export { errorHandler };
