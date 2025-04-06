import { Request, Response } from "express";
import { AxiosError } from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Users } from "../models/users.models.js";
import getGravatarUrl from "../utils/generate_gravatar.js";
import { generateAccessAndRefreshToken } from "../utils/tokens.js";

const registerUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, name, password } = req.body;

      // VALIDATION
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        throw new APIError(400, "Name, email, and password are required");
      }

      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        throw new APIError(409, "User with this email already exists.");
      }

      const avatar = await getGravatarUrl(email);

      const user = new Users({ name, email, password, avatar });
      await user.save();

      const created_user = await Users.findById(user._id).select("-password -refreshToken");

      if (!created_user) {
        throw new APIError(
          500,
          "Something went wrong while registring a User. Please try again."
        );
      }

      res
        .status(201)
        .json(new APIResponse(201, user, "User registered successfully"));
    } catch (err: unknown) {
      if (err instanceof APIError) {
        throw new APIError(err.statusCode || 500, err.message);
      }
      if (err instanceof AxiosError) {
        throw new APIError(
          err.status || 500,
          `Error with external service: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new APIError(500, `Unknown error: ${err.message}`);
      }
    }
  }
);

const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    // VALIDATION
    if (!email?.trim()) {
      throw new APIError(400, "Email is required");
    }

    const user = await Users.findOne({ email });
    if (!user) {
      throw new APIError(404, `User with this email does not exist`);
    }

    // Delete user
    await Users.deleteOne({ email });

    res
      .status(200)
      .json(new APIResponse(200, null, "User deleted successfully"));
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // VALIDATION
      if (!email?.trim() || !password?.trim()) {
        throw new APIError(400, "Password or email is incorrect.");
      }

      const user = await Users.findOne({ email });
      if (!user) {
        throw new APIError(401, "Password or email is incorrect.");
      }

      // Validate Password
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid) {
        throw new APIError(401, "Password or email is incorrect.");
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
      );

      const loggedInUser = await Users.findById(user._id).select(
        "-password -refreshToken"
      );

      if (!loggedInUser) {
        throw new APIError(404, "Password or email is incorrect.");
      }

      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new APIResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User log-in successfull."
          )
        );
    } catch (err: unknown) {
      if (err instanceof APIError) {
        throw new APIError(err.statusCode || 500, err.message);
      }
      if (err instanceof AxiosError) {
        throw new APIError(
          err.status || 500,
          `Error with external service: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new APIError(500, `Unknown error: ${err.message}`);
      }
    }
  }
);

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw new APIError(404, "User not found.");
    }
    await Users.findByIdAndUpdate(
      user._id,
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new APIResponse(200, {}, "User logged Out"));
  }
);

export { registerUsers, deleteUser, loginUser, logoutUser };
