import { prisma } from "@prismaClient";
import type { Deuda } from "../../../generated/prisma/client";

export default class DeudasRepository {
    async leerDeudas() {
        return prisma.deuda.findMany();
    }

    async leerDeudaPorId(id: string) {
        if (id === undefined || id === null || id.trim() === "") {
            throw new Error("El id de la deuda es requerido");
        }

        if (id !== undefined && isNaN(parseInt(id, 10))) {
            throw new Error("El id de la deuda debe ser un número");
        }

        const deudaId = parseInt(id, 10);
        return prisma.deuda.findUnique({
            where: { id: deudaId }
        });
    }

    async registrarDeuda(deuda: Deuda) {
        return prisma.deuda.create({
            data: deuda
        });
    }

    async actualizarDeuda(id: number, deuda: Partial<Deuda>) {
        return prisma.deuda.update({
            where: { id },
            data: deuda
        });
    }

    async eliminarDeuda(id: number) {
        return prisma.deuda.update({
            where: { id },
            data: { eliminado: true }
        });
    }
}