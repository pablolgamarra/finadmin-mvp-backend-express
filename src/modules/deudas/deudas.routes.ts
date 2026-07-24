import { DeudasController } from "@deudas/deudas.controller";
import DeudasRepository from "@deudas/deudas.repository";
import { Router } from "express";

const deudasRepo = new DeudasRepository();
const deudasController = new DeudasController(deudasRepo);

const router: Router = Router();

router.get("/", deudasController.leerDeudas);
router.get("/:id", deudasController.leerDeudaPorId);
router.post("/", deudasController.registrarDeuda);
router.put("/:id", deudasController.actualizarDeuda);

export default router;