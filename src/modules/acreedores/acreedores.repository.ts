import type { IRepository } from "interfaces/IRepository";
import { prisma } from "@prismaClient";

export default class AcreedoresRepository implements IRepository {
    public async crear(entidad: any): Promise<any> {
        if (!entidad) {
            throw new Error("Entidad no proporcionada");
        }

        const acreedorCreado = await prisma.acreedor.create({
            data: entidad,
        });

        return acreedorCreado;
    }

    public async obtenerPorId(id: string): Promise<any> {
        const idNumerico = Number(id);

        if (Number.isNaN(idNumerico)) {
            throw new Error("Id inválido");
        }

        const acreedor = await prisma.acreedor.findUnique({
            where: { id: idNumerico },
        });

        if (!acreedor) {
            throw new Error(`Acreedor con id ${id} no encontrado`);
        }

        return acreedor;
    }

    public async obtenerTodos(): Promise<any[]> {
        return prisma.acreedor.findMany();
    }

    public async actualizar(id: string, entidad: any): Promise<any> {
        const idNumerico = Number(id);

        if (Number.isNaN(idNumerico)) {
            throw new Error("Id inválido");
        }

        if (!entidad) {
            throw new Error("Entidad no proporcionada");
        }

        const acreedorActualizado = await prisma.acreedor.update({
            where: { id: idNumerico },
            data: entidad,
        });

        return acreedorActualizado;
    }

    public async eliminar(id: string): Promise<any> {
        const idNumerico = Number(id);

        if (Number.isNaN(idNumerico)) {
            throw new Error("Id inválido");
        }

        const acreedorEliminado = await prisma.acreedor.delete({
            where: { id: idNumerico },
        });

        return acreedorEliminado;
    }
}