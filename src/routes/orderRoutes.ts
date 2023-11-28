import express, { Router } from "express";
import { authenticationMiddleware, authorizePermissions } from "../middlewares";
import {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderControllers";

const router: Router = express.Router();

router
  .route("/")
  .post(authenticationMiddleware, createOrder)
  .get(authenticationMiddleware, authorizePermissions("admin"), getAllOrders);

router
  .route("/showAllMyOrders")
  .get(authenticationMiddleware, getCurrentUserOrders);

router
  .route("/:id")
  .get(authenticationMiddleware, getSingleOrder)
  .patch(authenticationMiddleware, updateOrder);

export default router;
