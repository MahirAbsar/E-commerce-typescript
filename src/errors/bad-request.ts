import { CustomAPIError } from "./custom-api";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends CustomAPIError {
    public statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}