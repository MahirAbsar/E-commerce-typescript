import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import { BadRequestError, NotFoundError } from "../errors";
import { checkPermissions } from "../utils/checkPermission";

export const getAllReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find({});
  return res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review found with id ${reviewId}`);
  }

  return res.status(StatusCodes.OK).json({ review });
};

export const createReview = async (req: Request, res: Response) => {
  const { product: productId } = req.body;
  req.body.user = req.user.userId;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new NotFoundError(`No product found with id ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError("Review already submitted!");
  }

  const review = await Review.create(req.body);

  return res.status(StatusCodes.CREATED).json({ review });
};

export const updateReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;
  const { title, comment, rating } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review found with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  return res.status(StatusCodes.OK).json({ review });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review found with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  await review.deleteOne();

  return res.status(StatusCodes.OK).json({ msg: "Success! Review Deleted" });
};
