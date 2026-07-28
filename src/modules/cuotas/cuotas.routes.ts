// cuotas.routes.ts
import { Router } from "express";
import CuotasController from "@cuotas/cuotas.controller";
import CuotasRepository from "@cuotas/cuotas.repository";
import { validateBody } from "modules/middlewares/validateBody";
import { crearCuotaSchema, actualizarCuotaSchema } from "@cuotas/cuotas.schemas";

const router: Router = Router({ mergeParams: true });

const cuotasRepository = new CuotasRepository();
const cuotasController = new CuotasController(cuotasRepository);

router.get("/", cuotasController.leerCuotasDeDeuda);       // GET /deudas/:deudaId/cuotas
router.post("/", validateBody(crearCuotaSchema), cuotasController.registrarCuota); // POST /deudas/:deudaId/cuotas

router.get("/:id", cuotasController.leerCuotaPorId);        // GET /deudas/:deudaId/cuotas/:id
router.patch("/:id", validateBody(actualizarCuotaSchema), cuotasController.actualizarCuota);
router.delete("/:id", cuotasController.eliminarCuota);

export default router;