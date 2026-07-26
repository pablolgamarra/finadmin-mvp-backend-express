// errors/ValidationError.ts
import AppError from "./AppError";

interface CampoConError {
    campo: string;
    mensaje: string;
}

export default class ValidationError extends AppError {
    public readonly errores: CampoConError[];

    constructor(message: string, errores: CampoConError[]) {
        super(message, 400, true);
        this.errores = errores;
    }
}