"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const createTokenUser_1 = require("../utils/createTokenUser");
const register = async (req, res) => {
    const { email } = req.body;
    const emailAlreadyExists = await User_1.User.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError("Email already in use");
    }
    const isFirstUser = (await User_1.User.countDocuments({})) === 0;
    const role = isFirstUser ? "admin" : "user";
    const user = await User_1.User.create({ ...req.body, role });
    const tokenUser = (0, createTokenUser_1.createTokenUser)(user);
    (0, jwt_1.attachCookiesToResponse)(res, tokenUser);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    const user = await User_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid credentials");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new errors_1.UnauthenticatedError("Invalid credentials");
    }
    const tokenUser = (0, createTokenUser_1.createTokenUser)(user);
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
