import express, { Router } from "express";
import { authenticationMiddleware, authorizePermissions } from "../middlewares";

import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers";

const router = express.Router();

router
  .route("/")
  .get(
    authenticationMiddleware,
    authorizePermissions("admin", "owner"),
    getAllUsers
  );
router.route("/showMe").get(authenticationMiddleware, showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(authenticationMiddleware, updateUserPassword);
router
  .route("/:id")
  .get(
    authenticationMiddleware,
    authorizePermissions("admin", "user"),
    getSingleUser
  );

export default router;
