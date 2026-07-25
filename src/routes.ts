import { Router } from "express";
import deudasRouter from "@deudas/deudas.routes";
import acreedoresRouter from "@acreedores/acreedores.routes";
import { errorHandler } from "modules/middlewares/errorHandler";

const router: Router = Router();

router.use("/deudas", deudasRouter);
router.use("/acreedores", acreedoresRouter);

router.use(errorHandler);

export default router;