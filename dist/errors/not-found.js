"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_api_1 = require("./custom-api");
const http_status_codes_1 = require("http-status-codes");
class NotFoundError extends custom_api_1.CustomAPIError {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
