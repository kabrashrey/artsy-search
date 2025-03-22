import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Tokens } from "../models/token.models.js";
import { constants } from "../constants.js";


const getToken = async (): Promise<any> => {
  try {
    console.log("Fetching token from database.");
    const existingToken = await Tokens.findOne().sort({ expires_at: -1 });

    if (existingToken && new Date(existingToken.expires_at) > new Date()) {
      console.log("Returning existing valid token.");
      return existingToken.token;
    }
    const url = constants.AUTH;
    const data = {
      client_id: constants.CLIENT_ID,
      client_secret: constants.CLIENT_SECRET,
    };

    if (!url || !data.client_id || !data.client_secret) {
      throw new APIError(500, "AUTH URL or credentials are missing");
    }

    const artsyResponse: AxiosResponse = await axios.post(url, data);

    if (![200, 201].includes(artsyResponse.status)) {
      throw new APIError(
        400,
        `Failed to fetch token: ${artsyResponse.data.message} || "Unknown error`
      );
    }

    const token = artsyResponse.data["token"];
    const expires_at = new Date(artsyResponse.data["expires_at"]);

    if (existingToken) {
      // Update the existing token and expiry date
      existingToken.token = token;
      existingToken.expires_at = expires_at;
      await existingToken.save(); // Save the updated token
      console.log("Updated existing token in database.");
    } else {
      // No existing token, create a new one
      const tokenResponse = await new Tokens({ token, expires_at }).save();
      console.log("Created a new token in database.");
    }

    return token;
  } catch (err: unknown) {
    if (err instanceof APIError) {
      throw new APIError(
        err.statusCode || 500,
        `Error fetching artist data: ${err.message}`
      );
    }
    if (err instanceof Error) {
      throw new APIError(500, `Error fetching artist data: ${err.message}`);
    }
    if (err instanceof AxiosError) {
      throw new APIError(
        err.status || 500,
        `Error fetching artist data: ${err.message}`
      );
    }
  }
};

// Express route handler
const fetchToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const token = await getToken();
    res
      .status(200)
      .json(new APIResponse(200, token, "Successfully fetched token"));
  } catch (error) {
    if (error instanceof APIError) {
      res
        .status(500)
        .json(new APIResponse(500, null, "Unknown error while fetching token"));
    }
  }
});

export { getToken, fetchToken };
