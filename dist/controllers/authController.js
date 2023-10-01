"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const register = async (req, res) => {
    res.send("register user");
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
