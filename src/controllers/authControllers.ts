import { Request, Response } from "express";
import { User } from "../models/User";
import { BadRequestError, UnauthorizedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { attachCookiesToResponse } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";
  const user = await User.create({ ...req.body, role });
  const tokenUser = { userId: user._id, name: user.name, role: user.role };
  attachCookiesToResponse(res, tokenUser);
  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const login = async (req: Request, res: Response) => {
  console.log(req.signedCookies);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const isPasswordMatch = await (user as any).comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const tokenUser = { userId: user._id, name: user.name, role: user.role };
  attachCookiesToResponse(res, tokenUser);
  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  return res.status(StatusCodes.OK).json({ msg: "Successfully logged out!" });
};
