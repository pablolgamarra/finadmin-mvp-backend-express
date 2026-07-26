import AppError from "@errors/AppError";

export default class InvalidQueryError extends AppError {
    constructor(message: string) {
        super(message, 400, true);
    }
}