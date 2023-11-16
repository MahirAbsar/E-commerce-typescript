import express, { Router } from "express";
import { authenticationMiddleware } from "../middlewares";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "../controllers/reviewControllers";

const router: Router = express.Router();

router
  .route("/")
  .post(authenticationMiddleware, createReview)
  .get(getAllReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticationMiddleware, updateReview)
  .delete(authenticationMiddleware, deleteReview);

export default router;
