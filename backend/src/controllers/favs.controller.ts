import { Request, Response } from "express";
import moment from "moment-timezone";

import { asyncHandler } from "../utils/asyncHandler";
import { APIError } from "../utils/APIError";
import { APIResponse } from "../utils/APIResponse";
import { Favourites } from "../models/favorites.models";

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
    const { fav_id, email, name, birthyear, deathyear, nationality } = req.body;

    // VALIDATION
    if (!email || !name || !fav_id) {
      throw new APIError(400, "ID, Name and Email is required");
    }

    const existingFav = await Favourites.findOne({ fav_id, email, name });
    if (existingFav) {
      throw new APIError(409, `${name} already in ${email} favourites.`);
    }

    let bg_img = req.body.bg_img || null;

    const newFav = await new Favourites({
      fav_id,
      email,
      name,
      birthyear,
      deathyear,
      nationality,
      bg_img,
    }).save();

    const added_fav = await Favourites.findById(newFav._id);

    if (!added_fav) {
      throw new APIError(
        500,
        "Something went wrong while adding to favourites"
      );
    }

    res
      .status(201)
      .json(
        new APIResponse(201, newFav, `${name} added from ${email} favourites`)
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
