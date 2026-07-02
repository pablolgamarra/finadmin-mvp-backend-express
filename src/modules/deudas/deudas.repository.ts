import { prisma } from "@prisma";

export default class DeudasRepository {
    async leerDeudas() {
        return prisma.deuda.findMany();
    }
}