import cookieParser from 'cookie-parser';
import express from 'express';
import { logRequest } from 'modules/middlewares/logMiddle';
import { logResponse } from 'modules/middlewares/logResponse';
import appRouter from "routes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logRequest);
app.use(appRouter);
app.use(logResponse);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})