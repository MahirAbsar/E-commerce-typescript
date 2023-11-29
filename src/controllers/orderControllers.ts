import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Product } from "../models/Product";
import mongoose from "mongoose";
import { Order } from "../models/Order";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../utils/checkPermission";

interface IOrderItem {
  name: string;
  amount: number;
  price: number;
  image: string;
  product: mongoose.Types.ObjectId;
}

interface FakeStripePaymentParams {
  amount: number;
  currency: string;
}

const fakeStripePayment = async ({
  amount,
  currency,
}: FakeStripePaymentParams) => {
  const client_secret = "someSecretKey";
  return { client_secret };
};

export const createOrder = async (req: Request, res: Response) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No item in the cart");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }
  let orderItems: IOrderItem[] = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const product = await Product.findOne({ _id: item.product });
    if (!product) {
      throw new NotFoundError(`No product found with id ${item.product}`);
    }
    const { name, price, image } = product;
    const singleOrderItem = {
      name,
      amount: item.amount as number,
      price,
      image,
      product: product._id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripePayment({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    tax,
    shippingFee,
    orderItems,
    subtotal,
    total,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
  });
  return res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});
  return res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export const getSingleOrder = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order found with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  return res.status(StatusCodes.OK).json({ order });
};

export const getCurrentUserOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user.userId });
  return res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order found with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  return res.status(StatusCodes.OK).json({ order });
};
