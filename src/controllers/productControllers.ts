import { Request, Response } from "express";
import path from "path";
import { Product } from "../models/Product";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

export const createProduct = async (req: Request, res: Response) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  return res.status(StatusCodes.CREATED).json({ product });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  return res
    .status(StatusCodes.OK)
    .json({ products: products, count: products.length });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product found with id ${productId}`);
  }

  return res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    runValidators: true,
    new: true,
  });

  if (!product) {
    throw new NotFoundError(`No product found with id ${productId}`);
  }

  return res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product found with id ${productId}`);
  }

  await product.deleteOne();

  return res.status(StatusCodes.OK).json({ msg: "Success! Product Removed" });
};

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new BadRequestError("No file uploaded!");
  }
  const productImage = req.files.image as any;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload image smaller than 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../../public/uploads",
    productImage.name
  );

  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${productImage.name}` });
};
