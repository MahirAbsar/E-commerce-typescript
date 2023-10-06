import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import { isTokenValid } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        name: string;
        role: string;
      };
    }
  }
}

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthorizedError("Authentication invalid");
  }
  try {
    const { userId, name, role } = isTokenValid(token) as JwtPayload;
    req.user = { userId, name, role };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Cannot access this route");
    }
    next();
  };
};
