// cuotas.repository.ts
import { prisma } from "@prismaClient";
import { Prisma, type Cuota } from "@prismaGeneratedClient";
import type { ActualizarCuotaDTO, CrearCuotaDTO } from "@cuotas/cuotas.schemas";
import RepositoryError from "@errors/RepositoryError";
import ItemNotFoundError from "@errors/ItemNotFoundError";

export default class CuotasRepository {
    public async crear(deudaId: number, dto: CrearCuotaDTO): Promise<Cuota> {
        try {
            const data: Prisma.CuotaCreateInput = {
                orden: dto.orden,
                monto: dto.monto,
                fechaVencimiento: dto.fechaVencimiento ? new Date(dto.fechaVencimiento) : null,
                deuda: { connect: { id: deudaId } },
            };
            return await prisma.cuota.create({ data });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new ItemNotFoundError("Deuda");
            }
            throw new RepositoryError("Error al crear cuota.", e);
        }
    }

    public async obtenerTodasDeDeuda(deudaId: number): Promise<Cuota[]> {
        try {
            return await prisma.cuota.findMany({ where: { deudaId } });
        } catch (e) {
            throw new RepositoryError(`Error al obtener cuotas de la deuda ${deudaId}.`, e);
        }
    }

    public async obtenerPorId(deudaId: number, id: number): Promise<Cuota> {
        let cuota;
        try {
            cuota = await prisma.cuota.findUnique({ where: { id } });
        } catch (e) {
            throw new RepositoryError(`Error al obtener cuota por id ${id}.`, e);
        }

        if (!cuota || cuota.deudaId !== deudaId) {
            throw new ItemNotFoundError("Cuota");
        }

        return cuota;
    }

    public async actualizar(deudaId: number, id: number, dto: ActualizarCuotaDTO): Promise<Cuota> {
        // primero verificamos que la cuota pertenezca a esa deuda
        await this.obtenerPorId(deudaId, id);

        try {
            const data: Prisma.CuotaUpdateInput = {
                ...(dto.orden !== undefined && { orden: dto.orden }),
                ...(dto.monto !== undefined && { monto: dto.monto }),
                ...(dto.fechaVencimiento !== undefined && {
                    fechaVencimiento: dto.fechaVencimiento ? new Date(dto.fechaVencimiento) : null,
                }),
            };
            return await prisma.cuota.update({ where: { id }, data });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new ItemNotFoundError("Cuota");
            }
            throw new RepositoryError("Error al actualizar cuota.", e);
        }
    }

    public async eliminar(deudaId: number, id: number): Promise<Cuota> {
        // primero verificamos que la cuota pertenezca a esa deuda
        await this.obtenerPorId(deudaId, id);

        try {
            return await prisma.cuota.delete({ where: { id } });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new ItemNotFoundError("Cuota");
            }
            throw new RepositoryError("Error al eliminar cuota.", e);
        }
    }
}