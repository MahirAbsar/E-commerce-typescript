"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getCurrentUserOrders = exports.getSingleOrder = exports.getAllOrders = exports.createOrder = void 0;
const errors_1 = require("../errors");
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const http_status_codes_1 = require("http-status-codes");
const fakeStripePayment = async ({ amount, currency, }) => {
    const client_secret = "someSecretKey";
    return { client_secret };
};
const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new errors_1.BadRequestError("No item in the cart");
    }
    if (!tax || !shippingFee) {
        throw new errors_1.BadRequestError("Please provide tax and shipping fee");
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of cartItems) {
        const product = await Product_1.Product.findOne({ _id: item.product });
        if (!product) {
            throw new errors_1.NotFoundError(`No product found with id ${item.product}`);
        }
        const { name, price, image } = product;
        const singleOrderItem = {
            name,
            amount: item.amount,
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
    const order = await Order_1.Order.create({
        tax,
        shippingFee,
        orderItems,
        subtotal,
        total,
        user: req.user.userId,
        clientSecret: paymentIntent.client_secret,
    });
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ order, clientSecret: order.clientSecret });
};
exports.createOrder = createOrder;
const getAllOrders = async (req, res) => {
    return res.status(200).send("get all orders");
};
exports.getAllOrders = getAllOrders;
const getSingleOrder = async (req, res) => {
    return res.status(200).send("get single order");
};
exports.getSingleOrder = getSingleOrder;
const getCurrentUserOrders = async (req, res) => {
    return res.status(200).send("get current user orders");
};
exports.getCurrentUserOrders = getCurrentUserOrders;
const updateOrder = async (req, res) => {
    return res.status(200).send("update order");
};
exports.updateOrder = updateOrder;
