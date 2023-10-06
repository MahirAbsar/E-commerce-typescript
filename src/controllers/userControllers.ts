import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  return res.send("Get all users");
};

export const getSingleUser = async (req: Request, res: Response) => {
  return res.send("Get single user");
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
