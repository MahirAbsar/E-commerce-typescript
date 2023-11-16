import { Request, Response } from "express";

export const getAllReviews = async (req: Request, res: Response) => {
  res.send("Get all reviews");
};

export const getSingleReview = async (req: Request, res: Response) => {
  res.send("Get single review");
};

export const createReview = async (req: Request, res: Response) => {
  res.send("Create review");
};

export const updateReview = async (req: Request, res: Response) => {
  res.send("Update review");
};

export const deleteReview = async (req: Request, res: Response) => {
  res.send("Delete review");
};
