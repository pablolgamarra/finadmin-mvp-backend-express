import AppError from "@errors/AppError";

export default class ItemNotFoundError extends AppError {
    constructor(message: string = 'Item no encontrado', httpStatusCode: number = 204) {
        super(message, httpStatusCode, true); // Error esperado
    }
}