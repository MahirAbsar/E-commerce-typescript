"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_api_1 = require("./custom-api");
class NotFoundError extends custom_api_1.CustomAPIError {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.NotFoundError = NotFoundError;
