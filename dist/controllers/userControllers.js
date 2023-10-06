"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = exports.getSingleUser = exports.getAllUsers = void 0;
const getAllUsers = async (req, res) => {
    return res.send("Get all users");
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (req, res) => {
    return res.send("Get single user");
};
exports.getSingleUser = getSingleUser;
const showCurrentUser = async (req, res) => {
    return res.send("Show current user");
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
