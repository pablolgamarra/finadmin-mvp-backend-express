import type { Request, Response, NextFunction } from "express";
import AppError from "@errors/AppError";
import ValidationError from "@errors/ValidationError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof ValidationError) {
        return res.status(err.httpStatusCode).json({
            message: err.message,
            errores: err.errores,
        });
    }

    if (err instanceof AppError) {
        return res.status(err.httpStatusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({ error: "Error interno del servidor" });
};