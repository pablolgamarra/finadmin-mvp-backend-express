// middlewares/authenticate.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthError from "@errors/AuthError";

export interface AuthRequest extends Request {
    userId?: number;
}

export const authHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return next(new AuthError("No autenticado"));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        req.userId = payload.userId;
        next();
    } catch {
        next(new AuthError("Sesión inválida o expirada"));
    }
};