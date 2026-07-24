import AcreedoresController from "@acreedores/acreedores.controller";
import AcreedoresRepository from "@acreedores/acreedores.repository";
import { Router } from "express";

const router: Router = Router();

const acreedoresRepository = new AcreedoresRepository();
const acreedoresController = new AcreedoresController(acreedoresRepository);

router.get("/", acreedoresController.obtenerTodosLosAcreedores);
router.get("/:id", acreedoresController.obtenerAcreedorPorId);
router.post("/", acreedoresController.registrarAcreedor);
router.put("/:id", acreedoresController.actualizarAcreedor);
router.delete("/:id", acreedoresController.eliminarAcreedor);

export default router;
