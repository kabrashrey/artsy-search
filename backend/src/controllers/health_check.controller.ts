import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse";
import { asyncHandler } from "../utils/asyncHandler";

const healthCheck = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(new APIResponse(200, "OK", "Successful Health Check"));
  }
);

export { healthCheck };
