import AcreedoresController from "@acreedores/acreedores.controller";
import AcreedoresRepository from "@acreedores/acreedores.repository";
import { Router } from "express";
import { errorHandler } from "modules/middlewares/errorHandler";

const router: Router = Router();

const acreedoresRepository = new AcreedoresRepository();
const acreedoresController = new AcreedoresController(acreedoresRepository);

router.get("/", acreedoresController.obtenerTodosLosAcreedores);
router.get("/:id", acreedoresController.obtenerAcreedorPorId);
router.post("/", acreedoresController.crearAcreedor);
router.patch("/:id", acreedoresController.actualizarAcreedor);
router.delete("/:id", acreedoresController.eliminarAcreedor);

export default router;
