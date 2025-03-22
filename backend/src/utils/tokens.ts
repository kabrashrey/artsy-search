import { Users } from "../models/users.models.js";
import { APIError } from "../utils/APIError.js";

export const generateAccessAndRefreshToken = async (email: any) => {
  try {
    const user = await Users.findOne(email);
    let accessToken;
    let refreshToken;
    if (user) {
      accessToken = user?.generateAccessToken();
      refreshToken = user?.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save();
    }
    return { accessToken, refreshToken };
  } catch (err) {
    throw new APIError(500, "Something went wrong while generating tokens");
  }
};
