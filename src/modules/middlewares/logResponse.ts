import { Request, Response, NextFunction } from "express";

export const logResponse = (req: Request, res: Response, next: NextFunction) => {
    const inicio = Date.now();

    res.on('finish', () => {
        const duracionMs = Date.now() - inicio;
        console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duracionMs}ms)`);
    });

    next();
};