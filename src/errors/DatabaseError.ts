import AppError from "@errors/AppError";

export default class DatabaseError extends AppError {
    constructor(message: string) {
        super(message, 500, false); // Error no esperado
    }
}