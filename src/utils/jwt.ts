import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface IPayload {
  userId: Types.ObjectId;
  name: string;
  role: string;
}

export const createToken = (payload: IPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const attachCookiesToResponse = (res: Response, payload: IPayload) => {
  const token = createToken(payload);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export const isTokenValid = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
