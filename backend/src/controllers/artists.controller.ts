import dotenv from "dotenv";
import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler";
import { APIError } from "../utils/APIError";
import { APIResponse } from "../utils/APIResponse";
import { getToken } from "./auth.controller";

dotenv.config({
  path: "./.env",
});

const getArtists = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log("Artists query:", req.query);
    const { id } = req.query;

    if (!id) {
      throw new APIError(400, "Artist ID is required");
    }

    try {
      // Fetching token from Database
      const token = await getToken();
      console.log("Token Response:", token);

      let url = process.env.ARTISTS;
      if (!url) {
        throw new APIError(
          500,
          "ARTISTS URL is not defined in environment variables"
        );
      }

      url += `/${id}`;
      const headers = { "X-XAPP-Token": token };
      console.log("Headers:", headers);
      console.log("URL:", url);

      const artsyResponse: AxiosResponse = await axios.get(url, { headers });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      const result = artsyResponse.data;
      const finalResult = {
        name: result.name,
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
    console.log("Similar Artists query:", req.query);
    const { id } = req.query;

    if (!id) {
      throw new APIError(400, "Artist ID is required");
    }

    try {
      // Fetching token from Database
      const token = await getToken();
      console.log("Token Response:", token);

      let url = process.env.ARTISTS;
      if (!url) {
        throw new APIError(
          500,
          "ARTISTS URL is not defined in environment variables"
        );
      }
      // https://api.artsy.net/api/artists?similar_to_artist_id=4d8b928b4eb68a1b2c0001f2
      url += `?similar_to_artist_id=${id}`;
      const headers = { "X-XAPP-Token": token };
      console.log("Headers:", headers);
      console.log("URL:", url);

      const artsyResponse: AxiosResponse = await axios.get(url, { headers });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      // console.log("Results:", artsyResponse.data._embedded.artists);
      const results = artsyResponse.data._embedded?.artists || [];
      console.log("Results:", results);
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
