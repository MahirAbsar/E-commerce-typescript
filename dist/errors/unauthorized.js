"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const custom_api_1 = require("./custom-api");
class UnauthorizedError extends custom_api_1.CustomAPIError {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.UnauthorizedError = UnauthorizedError;
