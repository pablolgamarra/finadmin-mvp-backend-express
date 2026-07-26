import { Request, Response, NextFunction } from "express";

export const validateJSONReqs = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        if (req.get('Content-Type') !== 'application/json') {
            return res.status(400).json({ error: 'Content-Type must be application/json' });
        }
    }

    next();
};