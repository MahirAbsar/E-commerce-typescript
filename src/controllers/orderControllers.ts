import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  return res.status(200).send("create order");
};

export const getAllOrders = async (req: Request, res: Response) => {
  return res.status(200).send("get all orders");
};

export const getSingleOrder = async (req: Request, res: Response) => {
  return res.status(200).send("get single order");
};

export const getCurrentUserOrders = async (req: Request, res: Response) => {
  return res.status(200).send("get current user orders");
};

export const updateOrder = async (req: Request, res: Response) => {
  return res.status(200).send("update order");
};
