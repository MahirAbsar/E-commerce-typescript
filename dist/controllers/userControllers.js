"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = exports.getSingleUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const createTokenUser_1 = require("../utils/createTokenUser");
const jwt_1 = require("../utils/jwt");
const checkPermission_1 = require("../utils/checkPermission");
const getAllUsers = async (req, res) => {
    const users = await User_1.User.find({ role: "user" }).select("-password");
    return res.status(http_status_codes_1.StatusCodes.OK).json({ users });
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (req, res) => {
    const user = await User_1.User.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
        throw new errors_1.NotFoundError(`No user found with id: ${req.params.id}`);
    }
    (0, checkPermission_1.checkPermissions)(req.user, user._id);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
};
exports.getSingleUser = getSingleUser;
const showCurrentUser = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.showCurrentUser = showCurrentUser;
const updateUser = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new errors_1.BadRequestError("Please provide name and emaul");
    }
    const user = await User_1.User.findOneAndUpdate({ _id: req.user.userId }, { name, email }, { new: true, runValidators: true });
    const tokenUser = (0, createTokenUser_1.createTokenUser)(user);
    (0, jwt_1.attachCookiesToResponse)(res, tokenUser);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
};
exports.updateUser = updateUser;
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new errors_1.BadRequestError("Please provide both values");
    }
    const user = await User_1.User.findOne({ _id: req.user.userId });
    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
        throw new errors_1.UnauthenticatedError("Invalid credentials");
    }
    user.password = newPassword;
    await user.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Password updated." });
};
exports.updateUserPassword = updateUserPassword;
