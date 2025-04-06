import { Request, Response } from "express";
import moment from "moment-timezone";
import axios, { AxiosResponse } from "axios";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Favourites } from "../models/favorites.models.js";
import { constants } from "../constants.js";
import { getToken } from "./auth.controller.js";
import { Tokens } from "../models/token.models.js";

const getFavs = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.query;

    // VALIDATION
    if (!email) {
      throw new APIError(400, "Email is required");
    }

    const favs = await Favourites.find({ email }).sort({ added_at: -1 }).lean();
    if (!favs || favs.length === 0) {
      throw new APIError(404, `${email} does not have any favorites`);
    }
    const formattedFavs = favs.map((fav) => ({
      ...fav,
      added_at: moment(fav.added_at)
        .tz("America/Los_Angeles")
        .format("YYYY-MM-DD HH:mm:ss"),
    }));

    res
      .status(200)
      .json(new APIResponse(200, formattedFavs, "All favorites retrieved"));
  }
);

const addFav = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { fav_id, email } = req.body;

    // VALIDATION
    if (!email || !fav_id) {
      throw new APIError(400, "ID, and Email is required");
    }

    const existingFav = await Favourites.findOne({ fav_id, email });
    if (existingFav) {
      throw new APIError(409, `${fav_id} already in ${email} favourites.`);
    }

    const token = (await Tokens.findOne().sort({ expires_at: -1 }))?.token;
    if (!token) throw new APIError(500, "No valid token found");

    const artsyResponse: AxiosResponse = await axios.get(
      `${constants.ARTISTS}/${fav_id}`,
      {
        headers: { "X-XAPP-Token": token },
      }
    );

    const {
      name,
      birthday: birthyear,
      deathday: deathyear,
      nationality,
    } = artsyResponse.data;
    const bg_img = artsyResponse.data._links?.thumbnail?.href || null;

    const newFav = await new Favourites({
      fav_id,
      email,
      name,
      birthyear,
      deathyear,
      nationality,
      bg_img,
    }).save();

    res
      .status(201)
      .json(
        new APIResponse(201, newFav, `${fav_id} added to ${email} favourites`)
      );
  }
);

const delFav = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { fav_id, email } = req.body;

    // VALIDATION
    if (!fav_id || !email) {
      throw new APIError(400, "ID and Email is required");
    }

    const fav = await Favourites.findOne({ fav_id, email });
    if (!fav) {
      throw new APIError(404, "ID or Email does not exist in favourites");
    }

    // Delete user
    await Favourites.deleteOne({ fav_id, email });

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          fav_id,
          `${fav_id} removed from ${email} favourites`
        )
      );
  }
);

export { getFavs, addFav, delFav };
