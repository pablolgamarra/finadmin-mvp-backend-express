import { Request, Response, NextFunction } from "express";
import AppError from "@errors/AppError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('API ERROR', err);

    if (err instanceof AppError) {
        return res.status(err.httpStatusCode).json({
            message: err.message,
        });
    }

    // Error no controlado / no esperado)
    return res.status(500).json({ error: "Error interno del servidor" });
};