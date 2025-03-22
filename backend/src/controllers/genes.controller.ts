import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { getToken } from "./auth.controller.js";
import { constants } from "../constants.js";

const getGenes = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log("Genes query:", req.query);
    const { artwork_id } = req.query;

    if (!artwork_id) {
      throw new APIError(400, "Artwork ID is required");
    }

    try {
      // Fetching token from Database
      const token = await getToken();

      let url = constants.GENES;
      if (!url) {
        throw new APIError(
          500,
          "GENES URL is not defined in environment variables"
        );
      }

      // url += `/${artwork_id}`;
      const headers = { "X-XAPP-Token": token };
      console.log("Headers:", headers);
      console.log("URL:", url);

      const artsyResponse: AxiosResponse = await axios.get(url, {
        headers,
        params: { artwork_id },
      });

      if (![200, 201].includes(artsyResponse.status)) {
        throw new APIError(
          400,
          `Failed to fetch token: ${artsyResponse.data} || "Unknown error`
        );
      }

      const results = artsyResponse.data._embedded?.genes || [];

      const finalResult = results.map((item: any) => ({
        name: item.name,
        thumbnail_href: item._links.thumbnail.href,
      }));

      console.log("genes_Final Result:", finalResult);

      return res
        .status(artsyResponse.status)
        .json(
          new APIResponse(
            artsyResponse.status,
            finalResult,
            "Genes data fetched successfully"
          )
        );
    } catch (err: unknown) {
      if (err instanceof APIError) {
        throw new APIError(
          err.statusCode || 500,
          `Error fetching genes data: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new APIError(500, `Error fetching genes data: ${err.message}`);
      }
      if (err instanceof AxiosError) {
        throw new APIError(
          err.status || 500,
          `Error fetching genes data: ${err.message}`
        );
      }
    }
  }
);

export { getGenes };
