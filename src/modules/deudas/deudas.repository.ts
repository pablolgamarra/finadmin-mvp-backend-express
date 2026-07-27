// deudas.repository.ts
import { prisma } from "@prismaClient";
import { Deuda, Prisma } from "@prismaGeneratedClient";
import type { ActualizarDeudaDTO, CrearDeudaDTO } from "@deudas/deudas.schemas";
import { generarCuotasAutomaticas } from "@deudas/deudas.services";
import RepositoryError from "@errors/RepositoryError";
import { IRepository } from "interfaces/IRepository";
import ItemNotFoundError from "@errors/ItemNotFoundError";

export default class DeudasRepository implements IRepository<Deuda, CrearDeudaDTO> {
    public async crear(dto: CrearDeudaDTO): Promise<Deuda> {
        try {
            const cuotasAGenerar = dto.generarCuotas
                ? generarCuotasAutomaticas({
                    montoTotal: dto.montoTotal,
                    cantidad: dto.generarCuotas.cantidad,
                    frecuencia: dto.generarCuotas.frecuencia,
                    fechaInicio: new Date(dto.fechaInicio),
                })
                : (dto.cuotas ?? []).map((c) => ({
                    orden: c.orden,
                    monto: c.monto,
                    fechaVencimiento: c.fechaVencimiento ? new Date(c.fechaVencimiento) : null,
                }));

            const data: Prisma.DeudaCreateInput = {
                nombre: dto.nombre,
                montoTotal: dto.montoTotal,
                fechaInicio: new Date(dto.fechaInicio),
                acreedor: { connect: { id: dto.acreedorId } },
                cuotas: { create: cuotasAGenerar },
            };

            return await prisma.deuda.create({
                data,
                include: { cuotas: true },
            });
        } catch (e) {
            throw new RepositoryError("Error al crear deuda.", e);
        }
    }

    public async obtenerPorId(id: number): Promise<Deuda> {
        let deuda;
        try {
            deuda = await prisma.deuda.findUnique({
                where: { id, eliminado: false },
                include: { cuotas: true },
            });
        } catch (e) {
            throw new RepositoryError(`Error al obtener deuda por id ${id}.`, e);
        }

        if (!deuda) {
            throw new ItemNotFoundError("Deuda");
        }

        return deuda;
    }

    public async obtenerTodos(): Promise<Deuda[]> {
        try {
            return await prisma.deuda.findMany({
                where: { eliminado: false },
            });
        } catch (e) {
            throw new RepositoryError("Error al obtener deudas de la base de datos.", e);
        }
    }

    public async actualizar(id: number, dto: ActualizarDeudaDTO): Promise<Deuda> {
        try {
            const data: Prisma.DeudaUpdateInput = {
                ...(dto.nombre !== undefined && { nombre: dto.nombre }),
                ...(dto.montoTotal !== undefined && { montoTotal: dto.montoTotal }),
                ...(dto.fechaInicio !== undefined && { fechaInicio: new Date(dto.fechaInicio) }),
                ...(dto.finalizado !== undefined && { finalizado: dto.finalizado }),
                ...(dto.acreedorId !== undefined && { acreedor: { connect: { id: dto.acreedorId } } }),
            };

            return await prisma.deuda.update({ where: { id }, data });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new ItemNotFoundError("Deuda");
            }
            throw new RepositoryError("Error al actualizar deuda.", e);
        }
    }

    public async eliminar(id: number): Promise<Deuda> {
        try {
            return await prisma.deuda.update({
                where: { id },
                data: { eliminado: true },
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new ItemNotFoundError("Deuda");
            }
            throw new RepositoryError("Error al eliminar deuda.", e);
        }
    }
}