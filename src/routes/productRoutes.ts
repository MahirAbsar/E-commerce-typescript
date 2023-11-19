import express, { Router } from "express";
import { authenticationMiddleware, authorizePermissions } from "../middlewares";

const router = express.Router();

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../controllers/productControllers";
import { getSingleProductReviews } from "../controllers/reviewControllers";

router
  .route("/")
  .post(
    [authenticationMiddleware, authorizePermissions("admin")],
    createProduct
  )
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticationMiddleware, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(
    [authenticationMiddleware, authorizePermissions("admin")],
    updateProduct
  )
  .delete(
    [authenticationMiddleware, authorizePermissions("admin")],
    deleteProduct
  );

router.get("/:id/reviews", getSingleProductReviews);

export default router;
