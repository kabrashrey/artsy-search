import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { getToken } from "./auth.controller.js";
import { constants } from "../constants.js";

const getArtists = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.query;

    if (!id) {
      throw new APIError(400, "Artist ID is required");
    }

    try {
      // Fetching token from Database
      const token = await getToken();

      let url = constants.ARTISTS;
      if (!url) {
        throw new APIError(
          500,
          "ARTISTS URL is not defined in environment variables"
        );
      }

      url += `/${id}`;
      const headers = { "X-XAPP-Token": token };

      const artsyResponse: AxiosResponse = await axios.get(url, { headers });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      const result = artsyResponse.data;
      const finalResult = {
        id: id,
        title: result.name,
        birthyear: result.birthday,
        nationality: result.nationality,
        biography: result.biography,
        deathyear: result.deathday,
      };

      return res
        .status(artsyResponse.status)
        .json(
          new APIResponse(
            artsyResponse.status,
            finalResult,
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
  }
);

const similarArtists = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.query;

    if (!id) {
      throw new APIError(400, "Artist ID is required");
    }

    try {
      // Fetching token from Database
      const token = await getToken();

      let url = constants.ARTISTS;
      if (!url) {
        throw new APIError(
          500,
          "ARTISTS URL is not defined in environment variables"
        );
      }
      url += `?similar_to_artist_id=${id}`;
      const headers = { "X-XAPP-Token": token };

      const artsyResponse: AxiosResponse = await axios.get(url, { headers });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      const results = artsyResponse.data._embedded?.artists || [];
      const relevantData = results.map((item: any) => {
        const name = item.name || "N/A";
        const id = item.id || "N/A";
        // const selfHref = item._links?.self?.href || "";
        const thumbnail = item._links?.thumbnail?.href || "";
        return {
          id,
          name,
          thumbnail:
            thumbnail !== "/assets/shared/missing_image.png" ? thumbnail : null,
        };
      });

      return res
        .status(artsyResponse.status)
        .json(
          new APIResponse(
            artsyResponse.status,
            relevantData,
            "Similar Artist data fetched successfully"
          )
        );
    } catch (err: unknown) {
      if (err instanceof APIError) {
        throw new APIError(
          err.statusCode || 500,
          `Error fetching similar artist data: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new APIError(500, `Error fetching similar artist data: ${err.message}`);
      }
      if (err instanceof AxiosError) {
        throw new APIError(
          err.status || 500,
          `Error fetching similar artist data: ${err.message}`
        );
      }
    }
  }
);

export { getArtists, similarArtists };
