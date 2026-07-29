// auth.routes.ts
import { Router } from "express";
import UsuariosRepository from "@usuarios/usuarios.repository";
import { validateBody } from "modules/middlewares/validateBody";
import { crearUsuarioSchema, usuarioLoginSchema } from "@usuarios/usuarios.schemas";
import UsuariosController from "@usuarios/usuarios.controller";

const router: Router = Router();
const usuariosRepository = new UsuariosRepository();
const usuariosController = new UsuariosController(usuariosRepository);

router.post("/registro", validateBody(crearUsuarioSchema), usuariosController.registrar);
router.post("/login", validateBody(usuarioLoginSchema), usuariosController.login);
router.post("/logout", usuariosController.logout);

export default router;