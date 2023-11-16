"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide product name"],
        maxlength: [100, "Name cannot be more than 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
        maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    image: {
        type: String,
        default: "/uploads/example.jpg",
    },
    category: {
        type: String,
        required: [true, "Please provide product category"],
        enum: ["office", "kitchen", "bedroom"],
    },
    company: {
        type: String,
        required: [true, "Please provide product company"],
        enum: {
            values: ["ikea", "liddy", "marcos"],
            message: "{VALUE} is not supported",
        },
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: true,
    },
    featured: {
        type: Boolean,
        required: false,
    },
    freeShipping: {
        type: Boolean,
        required: false,
    },
    inventory: {
        type: Number,
        required: true,
        default: 15,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.Product = mongoose_1.default.model("Product", productSchema);
