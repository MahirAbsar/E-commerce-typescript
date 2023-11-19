"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProductReviews = exports.deleteReview = exports.updateReview = exports.createReview = exports.getSingleReview = exports.getAllReviews = void 0;
const http_status_codes_1 = require("http-status-codes");
const Review_1 = require("../models/Review");
const Product_1 = require("../models/Product");
const errors_1 = require("../errors");
const checkPermission_1 = require("../utils/checkPermission");
const getAllReviews = async (req, res) => {
    const reviews = await Review_1.Review.find({}).populate({
        path: "product",
        select: "name price company",
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ reviews, count: reviews.length });
};
exports.getAllReviews = getAllReviews;
const getSingleReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const review = await Review_1.Review.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.NotFoundError(`No review found with id ${reviewId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ review });
};
exports.getSingleReview = getSingleReview;
const createReview = async (req, res) => {
    const { product: productId } = req.body;
    req.body.user = req.user.userId;
    const isValidProduct = await Product_1.Product.findOne({ _id: productId });
    if (!isValidProduct) {
        throw new errors_1.NotFoundError(`No product found with id ${productId}`);
    }
    const alreadySubmitted = await Review_1.Review.findOne({
        product: productId,
        user: req.user.userId,
    });
    if (alreadySubmitted) {
        throw new errors_1.BadRequestError("Review already submitted!");
    }
    const review = await Review_1.Review.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ review });
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const { title, comment, rating } = req.body;
    const review = await Review_1.Review.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.NotFoundError(`No review found with id ${reviewId}`);
    }
    (0, checkPermission_1.checkPermissions)(req.user, review.user);
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ review });
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const review = await Review_1.Review.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.NotFoundError(`No review found with id ${reviewId}`);
    }
    (0, checkPermission_1.checkPermissions)(req.user, review.user);
    await review.deleteOne();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Review Deleted" });
};
exports.deleteReview = deleteReview;
const getSingleProductReviews = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product_1.Product.findOne({ _id: productId });
    if (!product) {
        throw new errors_1.NotFoundError(`No product found with id ${productId}`);
    }
    const reviews = await Review_1.Review.find({ product: productId });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ reviews, count: reviews.length });
};
exports.getSingleProductReviews = getSingleProductReviews;
