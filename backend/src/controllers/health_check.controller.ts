import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(new APIResponse(200, "OK", "Successful Health Check"));
  }
);

export { healthCheck };
