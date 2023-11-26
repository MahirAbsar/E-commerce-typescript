"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProduct = void 0;
const path_1 = __importDefault(require("path"));
const Product_1 = require("../models/Product");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product_1.Product.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ product });
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res) => {
    const products = await Product_1.Product.find({});
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ products: products, count: products.length });
};
exports.getAllProducts = getAllProducts;
const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product_1.Product.findOne({ _id: productId }).populate('reviews');
    if (!product) {
        throw new errors_1.NotFoundError(`No product found with id ${productId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ product });
};
exports.getSingleProduct = getSingleProduct;
const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product_1.Product.findOneAndUpdate({ _id: productId }, req.body, {
        runValidators: true,
        new: true,
    });
    if (!product) {
        throw new errors_1.NotFoundError(`No product found with id ${productId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ product });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product_1.Product.findOne({ _id: productId });
    if (!product) {
        throw new errors_1.NotFoundError(`No product found with id ${productId}`);
    }
    await product.deleteOne();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Product Removed" });
};
exports.deleteProduct = deleteProduct;
const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new errors_1.BadRequestError("No file uploaded!");
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith("image")) {
        throw new errors_1.BadRequestError("Please upload image");
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new errors_1.BadRequestError("Please upload image smaller than 1MB");
    }
    const imagePath = path_1.default.join(__dirname, "../../public/uploads", productImage.name);
    await productImage.mv(imagePath);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ image: `/uploads/${productImage.name}` });
};
exports.uploadImage = uploadImage;
