import { Request, Response } from "express";
import { User } from "../models/User";
import { NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password");
  return res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user found with id: ${req.params.id}`);
  }
  return res.status(StatusCodes.OK).json({ user });
};

export const showCurrentUser = async (req: Request, res: Response) => {
  return res.send("Show current user");
};

export const updateUser = async (req: Request, res: Response) => {
  return res.send("Update user");
};

export const updateUserPassword = async (req: Request, res: Response) => {
  return res.send("Update user password");
};
