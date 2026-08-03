import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { logRequest } from 'modules/middlewares/logMiddle';
import { logResponse } from 'modules/middlewares/logResponse';
import appRouter from "routes";
import { errorHandler } from 'modules/middlewares/errorHandler';
import { validateEnvironment } from '@utils/validateEnvironment';

try {
    validateEnvironment();

    const app = express();

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));

    app.use(express.json());
    app.use(cookieParser());
    app.use(logRequest);
    app.use(logResponse);
    app.use(appRouter);

    app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));
    app.use(errorHandler);

    const port = process.env.SERVER_PORT || 5000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
} catch (e) {
    console.error("Error al iniciar la aplicación:", e);
}
