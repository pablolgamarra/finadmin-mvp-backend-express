import { Router } from "express";

const router: Router = Router();

router.get('/', (_, res) => {
    res.send('Deudas route');
});

export default router;