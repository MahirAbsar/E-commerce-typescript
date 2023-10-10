"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = void 0;
const createTokenUser = (user) => {
    return { userId: user._id, name: user.name, role: user.role };
};
exports.createTokenUser = createTokenUser;
