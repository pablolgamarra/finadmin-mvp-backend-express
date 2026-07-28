// deudas.routes.ts
import { Router } from "express";
import DeudasController from "@deudas/deudas.controller";
import DeudasRepository from "@deudas/deudas.repository";
import { validateBody } from "modules/middlewares/validateBody";
import { crearDeudaSchema, actualizarDeudaSchema } from "@deudas/deudas.schemas";
import cuotasRouter from "@cuotas/cuotas.routes";

const router: Router = Router();

const deudasRepository = new DeudasRepository();
const deudasController = new DeudasController(deudasRepository);

router.get("/", deudasController.leerDeudas);
router.get("/:id", deudasController.leerDeudaPorId);
router.post("/", validateBody(crearDeudaSchema), deudasController.registrarDeuda);
router.patch("/:id", validateBody(actualizarDeudaSchema), deudasController.actualizarDeuda);
router.delete("/:id", deudasController.eliminarDeuda);

// Nested: /deudas/:deudaId/cuotas
router.use("/:deudaId/cuotas", cuotasRouter);

export default router;