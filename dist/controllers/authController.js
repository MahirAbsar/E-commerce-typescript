"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const register = async (req, res) => {
    const { email } = req.body;
    const emailAlreadyExists = await User_1.User.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError('Email already in use');
    }
    const isFirstUser = await User_1.User.countDocuments({}) === 0;
    const role = isFirstUser ? 'admin' : 'user';
    const user = await User_1.User.create({ ...req.body, role });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ user });
};
exports.register = register;
const login = async (req, res) => {
    res.send("login user");
};
exports.login = login;
const logout = async (req, res) => {
    res.send("logout user");
};
exports.logout = logout;
