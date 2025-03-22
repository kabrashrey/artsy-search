import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { getToken } from "./auth.controller.js";
import { constants } from "../constants.js";


const getArtworks = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log("Artworks query:", req.query);
    const { artist_id, size } = req.query;

    if (!artist_id || !size) {
      throw new APIError(400, "Artist ID is required to fetch artworks");
    }

    try {
      // Fetching token from Database
      const token = await getToken();

      let url = constants.ARTWORK;
      if (!url) {
        throw new APIError(
          500,
          "ARTWORKS URL is not defined in environment variables"
        );
      }

      // url += `/${artist_id}`;
      const headers = { "X-XAPP-Token": token };
      console.log("Headers:", headers);
      console.log("URL:", url);

      const artsyResponse: AxiosResponse = await axios.get(url, {
        headers,
        params: { artist_id, size },
      });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      const results = artsyResponse.data._embedded?.artworks || [];

      const finalResult = results.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        thumbnail_href: item._links.thumbnail.href,
      }));

      console.log("Artworks_Final Result:", finalResult);

      return res
        .status(artsyResponse.status)
        .json(
          new APIResponse(
            artsyResponse.status,
            finalResult,
            "Artworks data fetched successfully"
          )
        );
    } catch (err: unknown) {
      if (err instanceof APIError) {
        throw new APIError(
          err.statusCode || 500,
          `Error fetching artworks data: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new APIError(500, `Error fetching artworks data: ${err.message}`);
      }
      if (err instanceof AxiosError) {
        throw new APIError(
          err.status || 500,
          `Error fetching artworks data: ${err.message}`
        );
      }
    }
  }
);

export { getArtworks };
