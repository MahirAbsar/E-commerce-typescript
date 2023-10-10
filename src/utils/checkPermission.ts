import { Types } from "mongoose";
import { UnauthorizedError } from "../errors";

interface IPayload {
    userId: string;
    name: string;
    role: string;
  }

export const checkPermissions = (
  requestUser: IPayload,
  resourceUserId: Types.ObjectId
) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authoried to view this page");
};
