import { CustomAPIError } from "./custom-api";

export class UnauthorizedError extends CustomAPIError {
    constructor(message: string, public statusCode: number) {
        super(message)
    }
}