import AppError from "@errors/AppError";

export default class AuthError extends AppError {
    constructor(message: string = "Error de autenticación") {
        super(message, 401, true);
    }
}