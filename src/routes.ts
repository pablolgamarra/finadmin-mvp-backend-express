import { Router } from "express";
import deudasRouter from "@deudas/deudas.routes";
import acreedoresRouter from "@acreedores/acreedores.routes";

const router: Router = Router();

router.use("/deudas", deudasRouter);
router.use("/acreedores", acreedoresRouter);

export default router;