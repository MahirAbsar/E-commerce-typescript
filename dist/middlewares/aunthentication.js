"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticationMiddleware = void 0;
const errors_1 = require("../errors");
const jwt_1 = require("../utils/jwt");
const authenticationMiddleware = (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new errors_1.UnauthorizedError("Authentication invalid");
    }
    try {
        const { userId, name, role } = (0, jwt_1.isTokenValid)(token);
        req.user = { userId, name, role };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthorizedError("Authentication invalid");
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new errors_1.UnauthorizedError("Cannot access this route");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
