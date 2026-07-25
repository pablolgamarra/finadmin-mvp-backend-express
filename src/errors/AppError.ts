export default class AppError extends Error {
    public readonly httpStatusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, httpStatusCode: number, isOperational: boolean) {
        super(message);

        this.name = this.constructor.name;
        this.httpStatusCode = httpStatusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}