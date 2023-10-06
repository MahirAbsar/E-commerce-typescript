"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = exports.getSingleUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
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
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
};
exports.getSingleUser = getSingleUser;
const showCurrentUser = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.showCurrentUser = showCurrentUser;
const updateUser = async (req, res) => {
    return res.send("Update user");
};
exports.updateUser = updateUser;
const updateUserPassword = async (req, res) => {
    return res.send("Update user password");
};
exports.updateUserPassword = updateUserPassword;
