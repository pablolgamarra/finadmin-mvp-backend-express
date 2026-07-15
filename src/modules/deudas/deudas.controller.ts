import type DeudasRepository from "@deudas/deudas.repository";
import type { NextFunction, Request, Response } from "express";

export class DeudasController {
    private _repo: DeudasRepository;

    constructor(deudasRepository: DeudasRepository) {
        this._repo = deudasRepository;
    }

    async registrarDeuda(res: Response, req: Request, next: NextFunction) {
        return res.status(200).json(await this._repo.registrarDeuda(req.body));
    }

    async leerDeudas() {
        return this._repo.leerDeudas();
    }
}