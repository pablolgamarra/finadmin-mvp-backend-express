export function validateEnvironment() {
    const requiredEnvVars = [
        "DATABASE_URL",
        "JWT_SECRET",
        "SERVER_PORT",
        "NODE_ENV",
    ];

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[ envVar ]);

    if (missingEnvVars.length > 0) {
        throw new Error(`Se tiene que configurar las variables de entorno: ${missingEnvVars.join(", ")}`);
    }
}