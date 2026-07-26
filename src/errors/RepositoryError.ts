import AppError from "@errors/AppError";

export default class RepositoryError extends AppError {
    constructor(message: string, public readonly cause?: unknown) {
        super(message, 500, false);
    }
}