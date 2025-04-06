import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { getToken } from "./auth.controller.js";
import { constants } from "../constants.js";

const getArtistDetails = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { q, size, type } = req.query;

      if (!q) {
        throw new APIError(400, "Params are required");
      }

      // Fetching token from Database
      const token = await getToken();

      const url = constants.SEARCH;
      if (!url) {
        throw new APIError(
          500,
          "Search URL is not defined in environment variables"
        );
      }
      const headers = { "X-XAPP-Token": token };

      const artsyResponse: AxiosResponse = await axios.get(url, {
        headers,
        params: { q, size, type },
      });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      const results = artsyResponse.data._embedded?.results || [];
      const relevantData = results.map((item: any) => {
        const title = item.title || "N/A";
        const selfHref = item._links?.self?.href || "";
        const thumbnail = item._links?.thumbnail?.href || "";
        const id = selfHref.split("/").pop() || "N/A";
        return {
          title,
          id,
          thumbnail:
            thumbnail !== "/assets/shared/missing_image.png" ? thumbnail : null,
        };
      });
      return res
        .status(artsyResponse.status)
        .json(
          new APIResponse(
            artsyResponse.status,
            relevantData.length !== 0 ? relevantData : "",
            "Artist data fetched successfully"
          )
        );
    } catch (err: unknown) {
      if (err instanceof APIError) {
        throw new APIError(
          err.statusCode || 500,
          `Error fetching artist data: ${err.message}`
        );
      }
      if (err instanceof AxiosError) {
        throw new APIError(
          err.status || 500,
          `Error fetching artist data: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new APIError(500, `Error fetching artist data: ${err.message}`);
      }
    }
  }
);

export { getArtistDetails };
