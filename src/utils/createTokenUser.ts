import { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  role: string;
  password: string;
}

export const createTokenUser = (user: IUser) => {
  return { userId: user._id, name: user.name, role: user.role };
};
