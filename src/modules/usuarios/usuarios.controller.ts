// auth/auth.controller.ts
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsuariosRepository from "@usuarios/usuarios.repository";
import type { UsuarioLoginDTO, CrearUsuarioDTO } from "@usuarios/usuarios.schemas";
import { sendSuccess } from "@utils/sendSucess";
import { AuthRequest } from "modules/middlewares/authHandler";

const COOKIE_NAME = "token";
const COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 1 día, alineado con JWT_EXPIRES_IN

export default class UsuariosController {
    private _repo: UsuariosRepository;

    constructor(authRepository: UsuariosRepository) {
        this._repo = authRepository;
    }

    leer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarios = await this._repo.listarUsuarios();
            return sendSuccess(res, usuarios, 200);
        } catch (e) {
            next(e);
        }
    };

    registrar = async (req: Request<{}, {}, CrearUsuarioDTO>, res: Response, next: NextFunction) => {
        try {
            const usuario = await this._repo.registrar(req.body);
            return sendSuccess(res, usuario, 201);
        } catch (e) {
            next(e);
        }
    };

    login = async (req: Request<{}, {}, UsuarioLoginDTO>, res: Response, next: NextFunction) => {
        try {
            const usuario = await this._repo.validarCredenciales(({ email: req.body.email, password: req.body.password }));

            const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                throw new Error("JWT_SECRET no está definido en las variables de entorno");
            }

            const token = jwt.sign(
                { userId: usuario.id },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
            );

            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,                                    // JS del navegador no puede leerla
                secure: process.env.NODE_ENV === "production",     // solo HTTPS en prod
                sameSite: "lax",                                 // protección CSRF básica
                maxAge: COOKIE_MAX_AGE_MS,
            });

            return sendSuccess(res, { id: usuario.id, email: usuario.email });
        } catch (e) {
            next(e);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie(COOKIE_NAME);
            return sendSuccess(res, { message: "Sesión cerrada" });
        } catch (e) {
            next(e);
        }
    };

    me = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const usuario = await this._repo.buscarPorId(req.userId!);
            return sendSuccess(res, { id: usuario.id, email: usuario.correo });
        } catch (e) {
            next(e);
        }
    };
}