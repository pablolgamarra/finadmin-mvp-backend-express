// cuotas.controller.ts
import type { NextFunction, Request, Response } from "express";
import type CuotasRepository from "@cuotas/cuotas.repository";
import type { ActualizarCuotaDTO, CrearCuotaDTO } from "@cuotas/cuotas.schemas";
import { sendSuccess } from "@utils/sendSucess";
import { parseId } from "@utils/parseId";

export default class CuotasController {
    private _repo: CuotasRepository;

    constructor(cuotasRepository: CuotasRepository) {
        this._repo = cuotasRepository;
    }

    registrarCuota = async (
        req: Request<{ deudaId: string }, {}, CrearCuotaDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const deudaId = parseId(req.params.deudaId);
            const cuota = await this._repo.crear(deudaId, req.body);
            return sendSuccess(res, cuota, 201);
        } catch (e) {
            next(e);
        }
    };

    leerCuotasDeDeuda = async (
        req: Request<{ deudaId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const deudaId = parseId(req.params.deudaId);
            const cuotas = await this._repo.obtenerTodasDeDeuda(deudaId);
            return sendSuccess(res, cuotas);
        } catch (e) {
            next(e);
        }
    };

    leerCuotaPorId = async (
        req: Request<{ deudaId: string; id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const deudaId = parseId(req.params.deudaId);
            const id = parseId(req.params.id);
            const cuota = await this._repo.obtenerPorId(deudaId, id);
            return sendSuccess(res, cuota);
        } catch (e) {
            next(e);
        }
    };

    actualizarCuota = async (
        req: Request<{ deudaId: string; id: string }, {}, ActualizarCuotaDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const deudaId = parseId(req.params.deudaId);
            const id = parseId(req.params.id);
            const cuota = await this._repo.actualizar(deudaId, id, req.body);
            return sendSuccess(res, cuota);
        } catch (e) {
            next(e);
        }
    };

    eliminarCuota = async (
        req: Request<{ deudaId: string; id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const deudaId = parseId(req.params.deudaId);
            const id = parseId(req.params.id);
            const cuota = await this._repo.eliminar(deudaId, id);
            return sendSuccess(res, cuota);
        } catch (e) {
            next(e);
        }
    };
}