"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { email } = req.body;
    const emailAlreadyExists = await User_1.User.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError("Email already in use");
    }
    const isFirstUser = (await User_1.User.countDocuments({})) === 0;
    const role = isFirstUser ? "admin" : "user";
    const user = await User_1.User.create({ ...req.body, role });
    const tokenUser = { userId: user._id, name: user.name, role: user.role };
    (0, jwt_1.attachCookiesToResponse)(res, tokenUser);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
};
exports.register = register;
const login = async (req, res) => {
    console.log(req.signedCookies);
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    const user = await User_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthorizedError("Invalid credentials");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new errors_1.UnauthorizedError("Invalid credentials");
    }
    const tokenUser = { userId: user._id, name: user.name, role: user.role };
    (0, jwt_1.attachCookiesToResponse)(res, tokenUser);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
};
exports.login = login;
const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Successfully logged out!" });
};
exports.logout = logout;
