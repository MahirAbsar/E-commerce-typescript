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

export const isTokenValid = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
