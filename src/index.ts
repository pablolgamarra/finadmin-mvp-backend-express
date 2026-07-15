import express from 'express';
import DeudasRouter from "@deudas/deudas.routes.ts";

const app = express();
const deudasRouter = DeudasRouter;

app.use('/deudas', deudasRouter);

app.get('/', (_, res) => {
    res.send('Hello World!');
})

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})