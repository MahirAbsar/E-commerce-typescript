import { Request, Response } from "express";
import { User } from "../models/User";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import { StatusCodes } from "http-status-codes";
import { createTokenUser } from "../utils/createTokenUser";
import { attachCookiesToResponse } from "../utils/jwt";
import { checkPermissions } from "../utils/checkPermission";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password");
  return res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user found with id: ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  return res.status(StatusCodes.OK).json({ user });
};

export const showCurrentUser = async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({ user: req.user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new BadRequestError("Please provide name and emaul");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user!);
  attachCookiesToResponse(res, tokenUser);
  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordMatch = await (user as any).comparePassword(oldPassword);

  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  (user as any).password = newPassword;
  await (user as any).save();
  return res.status(StatusCodes.OK).json({ msg: "Success! Password updated." });
};
