import type DeudasRepository from "@deudas/deudas.repository";
import type { NextFunction, Request, Response } from "express";
import type { Deuda } from "../../../generated/prisma/client";

export class DeudasController {
    private _repo: DeudasRepository;

    constructor(deudasRepository: DeudasRepository) {
        this._repo = deudasRepository;
    }

    registrarDeuda = async (req: Request<{ deuda: Partial<Deuda> }>, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.registrarDeuda(req.body));
    };

    leerDeudas = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.leerDeudas());
    };

    leerDeudaPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.leerDeudaPorId(req.params.id));
    };

    actualizarDeuda = async (req: Request<{ id: string; deuda: Partial<Deuda> }>, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        return res.status(200).json(await this._repo.actualizarDeuda(id, req.body));
    }

    eliminarDeuda = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        return res.status(200).json(await this._repo.eliminarDeuda(id));
    }
}