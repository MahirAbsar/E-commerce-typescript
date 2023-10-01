import { Request, Response } from "express";
import { User } from "../models/User";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({email})
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  const isFirstUser = await User.countDocuments({}) === 0;
  const role = isFirstUser ? 'admin' : 'user';
  const user = await User.create({ ...req.body, role })
  return res.status(StatusCodes.CREATED).json({ user })
};

export const login = async (req: Request, res: Response) => {
  res.send("login user");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout user");
};
