import AcreedoresController from "@acreedores/acreedores.controller";
import AcreedoresRepository from "@acreedores/acreedores.repository";
import { actualizarAcreedorSchema, crearAcreedorSchema } from "@acreedores/acreedores.schemas";
import { Router } from "express";
import { errorHandler } from "modules/middlewares/errorHandler";
import { validateBody } from "modules/middlewares/validateBody";

const router: Router = Router();

const acreedoresRepository = new AcreedoresRepository();
const acreedoresController = new AcreedoresController(acreedoresRepository);

router.get("/", acreedoresController.obtenerTodosLosAcreedores);
router.get("/:id", acreedoresController.obtenerAcreedorPorId);
router.post("/", validateBody(crearAcreedorSchema), acreedoresController.crearAcreedor);
router.patch("/:id", validateBody(actualizarAcreedorSchema), acreedoresController.actualizarAcreedor);
router.delete("/:id", acreedoresController.eliminarAcreedor);

export default router;
