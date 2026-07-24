import type { Request, Response, NextFunction } from "express";
import type { Acreedor } from "../../../generated/prisma/client";
import type AcreedoresRepository from "@acreedores/acreedores.repository";

export default class AcreedoresController {
    private _repo: AcreedoresRepository;

    constructor(acreedoresRepository: AcreedoresRepository) {
        this._repo = acreedoresRepository;
    }

    registrarAcreedor = async (req: Request<{ acreedor: Partial<Acreedor> }>, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.crear(req.body));
    }

    obtenerAcreedorPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.obtenerPorId(req.params.id));
    }

    obtenerTodosLosAcreedores = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.obtenerTodos());
    }

    actualizarAcreedor = async (req: Request<{ id: string; acreedor: Partial<Acreedor> }>, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.actualizar(req.params.id, req.body));
    }

    eliminarAcreedor = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        return res.status(200).json(await this._repo.eliminar(req.params.id));
    }
}