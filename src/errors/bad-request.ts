import { CustomAPIError } from "./custom-api";

export class BadRequestError extends CustomAPIError {
    constructor(message: string, public statusCode: number) {
        super(message)
    }
}