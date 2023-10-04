"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator_1.default.isEmail,
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});
userSchema.pre("save", async function () {
    const genSalt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, genSalt);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs_1.default.compare(candidatePassword, this.password);
    return isMatch;
};
exports.User = mongoose_1.default.model("User", userSchema);
