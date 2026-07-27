import { DeudasController } from "@deudas/deudas.controller";
import DeudasRepository from "@deudas/deudas.repository";
import { crearDeudaSchema } from "@deudas/deudas.schemas";
import { Router } from "express";
import { validateBody } from "modules/middlewares/validateBody";

const deudasRepo = new DeudasRepository();
const deudasController = new DeudasController(deudasRepo);

const router: Router = Router();

router.get("/", deudasController.leerDeudas);
router.get("/:id", deudasController.leerDeudaPorId);
router.post("/", validateBody(crearDeudaSchema), deudasController.registrarDeuda);
router.patch("/:id", deudasController.actualizarDeuda);
router.delete("/:id", deudasController.actualizarDeuda);

export default router;