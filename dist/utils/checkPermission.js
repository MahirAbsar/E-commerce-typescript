"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const errors_1 = require("../errors");
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === "admin")
        return;
    if (requestUser.userId === resourceUserId.toString())
        return;
    throw new errors_1.UnauthorizedError("Not authoried to view this page");
};
exports.checkPermissions = checkPermissions;
