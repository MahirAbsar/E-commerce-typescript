"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const reviewControllers_1 = require("../controllers/reviewControllers");
const router = express_1.default.Router();
router
    .route("/")
    .post(middlewares_1.authenticationMiddleware, reviewControllers_1.createReview)
    .get(reviewControllers_1.getAllReviews);
router
    .route("/:id")
    .get(reviewControllers_1.getSingleReview)
    .patch(middlewares_1.authenticationMiddleware, reviewControllers_1.updateReview)
    .delete(middlewares_1.authenticationMiddleware, reviewControllers_1.deleteReview);
exports.default = router;
