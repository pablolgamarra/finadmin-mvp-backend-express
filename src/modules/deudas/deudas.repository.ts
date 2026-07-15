import { prisma } from "@prisma";
import type { Deuda } from "../../../generated/prisma/client";

export default class DeudasRepository {
    async leerDeudas() {
        return prisma.deuda.findMany();
    }

    async registrarDeuda(deuda: Deuda) {
        return prisma.deuda.create({
            data: deuda
        });
    }
}