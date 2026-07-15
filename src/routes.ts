import { Router } from "express";

const router: Router = Router();

router.get('/', (_, res) => {
    res.status(200).json({ message: 'Deudas route' });
});

router.get('/deudas', (_, res) => {
    res.status(200).json({ message: 'Deudas route' });
});