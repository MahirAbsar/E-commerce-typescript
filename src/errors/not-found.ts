import { CustomAPIError } from "./custom-api";

export class NotFoundError extends CustomAPIError {
    constructor(message: string, public statusCode: number) {
        super(message)
    }
}