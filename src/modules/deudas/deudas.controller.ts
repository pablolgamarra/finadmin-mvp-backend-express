import type DeudasRepository from "@deudas/deudas.repository";
import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "@utils/sendSucess";
import { parseId } from "@utils/parseId";
import type { ActualizarDeudaDTO, CrearDeudaDTO } from "@deudas/deudas.schemas";

export default class DeudasController {
    private _repo: DeudasRepository;

    constructor(deudasRepository: DeudasRepository) {
        this._repo = deudasRepository;
    }

    registrarDeuda = async (req: Request<{}, {}, CrearDeudaDTO>, res: Response, next: NextFunction) => {
        try {
            const deuda = await this._repo.crear(req.body);
            return sendSuccess(res, deuda, 201);
        } catch (e) {
            next(e);
        }
    };

    leerDeudas = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deudas = await this._repo.obtenerTodos();
            return sendSuccess(res, deudas);
        } catch (e) {
            next(e);
        }
    };

    leerDeudaPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const id = parseId(req.params.id);
            const deuda = await this._repo.obtenerPorId(id);
            return sendSuccess(res, deuda);
        } catch (e) {
            next(e);
        }
    };

    actualizarDeuda = async (req: Request<{ id: string }, {}, ActualizarDeudaDTO>, res: Response, next: NextFunction) => {
        try {
            const id = parseId(req.params.id);
            const deuda = await this._repo.actualizar(id, req.body);
            return sendSuccess(res, deuda);
        } catch (e) {
            next(e);
        }
    };

    eliminarDeuda = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const id = parseId(req.params.id);
            const deuda = await this._repo.eliminar(id);
            return sendSuccess(res, deuda);
        } catch (e) {
            next(e);
        }
    };
}