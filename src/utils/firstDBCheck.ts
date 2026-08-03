import bcrypt from "bcrypt";
import { prisma } from "@prismaClient";
import { PrismaClient } from "@prismaGeneratedClient";

export const firstCheck = async (prismaClient: PrismaClient) => {
    try {
        const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
        const admin = await prisma.usuario.findFirst({ where: { correo: "admin@admin.com" } });

        if (!admin) {
            const passwordHash = await bcrypt.hash("admin", SALT_ROUNDS);
            await prisma.usuario.create({
                data: {
                    nombre: "Admin",
                    correo: "admin@admin.com",
                    password: passwordHash,
                }
            });
        }
    } catch (e) {
        console.error("Error en la verificación inicial:", e);
    }
}