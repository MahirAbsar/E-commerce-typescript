"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const singleOrderItemSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: Schema.ObjectId,
        ref: "Product",
        required: true,
    },
});
const orderSchema = new Schema({
    tax: {
        type: Number,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    orderItems: [singleOrderItemSchema],
    status: {
        type: String,
        enum: ["pending", "failed", "paid", "delivered", "canceled"],
        default: "pending",
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
    },
    paymentIntentId: {
        type: String,
    },
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", orderSchema);
