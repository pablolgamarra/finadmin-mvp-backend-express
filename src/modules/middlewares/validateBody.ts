import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import ValidationError from "@errors/ValidationError";

export const validateBody = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const detalles = result.error.issues.map(i => ({
            campo: i.path.join('.'),
            mensaje: i.message
        }));

        return next(new ValidationError("Datos Inválidos", detalles));
    }

    req.body = result.data;
    next();
}