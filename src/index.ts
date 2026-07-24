import express from 'express';
import { logRequest } from 'modules/middlewares/logMiddle';
import appRouter from "routes";

const app = express();
app.use(express.json());
app.use(logRequest);
app.use(appRouter);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})