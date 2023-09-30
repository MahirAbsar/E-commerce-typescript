import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface Error {
  statusCode: number;
  message: string;
  code?: number;
  keyValue?: string;
  errors?: object;
  name?: string;
  value?: string;
}

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later.",
  };
  if (err.code === 11000) {
    customError.msg = `Duplicate value provide for ${Object.keys(
      err.keyValue!
    )} field. Please provide another value.`;
    customError.statusCode = 400;
  }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors!)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No job found with id ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
