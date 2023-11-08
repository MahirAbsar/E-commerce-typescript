"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const productSchema = new Schema({
    name: {
        type: String,
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
});
