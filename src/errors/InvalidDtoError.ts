import AppError from "@errors/AppError";

export default class InvalidDtoError extends AppError {
    constructor(message: string = 'DTO Inválido') {
        super(message, 500, true); // Error esperado
    }
}