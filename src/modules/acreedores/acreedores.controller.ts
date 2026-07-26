import type { Request, Response, NextFunction } from "express";
import type AcreedoresRepository from "@acreedores/acreedores.repository";
import type { ActualizarAcreedorDTO, CrearAcreedorDTO } from "@acreedores/acreedores.schemas";
import InvalidQueryError from "@errors/InvalidQueryError";
import InvalidDtoError from "@errors/InvalidDtoError";
import { sendSuccess } from "@utils/sendSucess";

export default class AcreedoresController {
    private _repo: AcreedoresRepository;

    constructor(acreedoresRepository: AcreedoresRepository) {
        this._repo = acreedoresRepository;
    }

    crearAcreedor = async (req: Request<{}, {}, CrearAcreedorDTO>, res: Response, next: NextFunction) => {
        try {
            return res.status(201).json(await this._repo.crear(req.body));
        } catch (e) {
            next(e);
        }
    }

    obtenerAcreedorPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            if (!req.params.id) {
                throw new InvalidQueryError('Parametro ID no encontrado');
            }

            const idNumerico = Number(req.params.id);

            if (Number.isNaN(idNumerico)) {
                throw new InvalidDtoError('Id no válido');
            }

            const acreedor = await this._repo.obtenerPorId(idNumerico)

            return sendSuccess(res, acreedor);
        } catch (e) {
            next(e);
        }
    }

    obtenerTodosLosAcreedores = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const acreedores = await this._repo.obtenerTodos();

            return sendSuccess(res, acreedores);
        } catch (e) {
            next(e);
        }
    }

    actualizarAcreedor = async (req: Request<{ id: string }, {}, ActualizarAcreedorDTO>, res: Response, next: NextFunction) => {
        try {
            if (!req.params.id) {
                throw new InvalidQueryError('Parametro ID no encontrado');
            }

            const idNumerico = Number(req.params.id);

            if (Number.isNaN(idNumerico)) {
                throw new InvalidDtoError('Id no válido');
            }

            return res.status(200).json(await this._repo.actualizar(idNumerico, req.body));
        } catch (e) {
            next(e);
        }
    }

    eliminarAcreedor = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            if (!req.params.id) {
                throw new InvalidQueryError('Parametro ID no encontrado');
            }

            const idNumerico = Number(req.params.id);

            if (Number.isNaN(idNumerico)) {
                throw new InvalidDtoError('Id no válido');
            }

            return res.status(200).json(await this._repo.eliminar(idNumerico));
        } catch (e) {
            next(e);
        }
    }
}