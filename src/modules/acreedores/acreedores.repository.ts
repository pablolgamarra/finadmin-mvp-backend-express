import { prisma } from "@prismaClient";
import { AcreedorCreateInput, AcreedorUpdateInput } from "@prismaGenerated/models/Acreedor";
import { Prisma, type Acreedor } from "@prismaGeneratedClient";
import type { IRepository } from "interfaces/IRepository";
import type { ActualizarAcreedorDTO, CrearAcreedorDTO } from "@acreedores/acreedores.dtos";
import InvalidDtoError from "@errors/InvalidDtoError";
import RepositoryError from "@errors/RepositoryError";
import ItemNotFoundError from "@errors/ItemNotFoundError";

export default class AcreedoresRepository implements IRepository<Acreedor, CrearAcreedorDTO> {
    public async crear(dto: CrearAcreedorDTO): Promise<Acreedor> {
        if (!dto) {
            throw new InvalidDtoError;
        }

        try {
            const dataCrear: AcreedorCreateInput = {
                nombre: dto.nombre,
                comentarios: dto.comentarios,
                telefono: dto.telefono
            };

            const acreedorCreado = await prisma.acreedor.create({
                data: dataCrear,
            });

            return acreedorCreado;
        } catch (e) {
            throw new RepositoryError(`Error al guardar acreedor.`, e);
        }
    }

    public async obtenerPorId(id: number): Promise<Acreedor> {
        let acreedor;
        try {
            acreedor = await prisma.acreedor.findUnique({ where: { id } });
        } catch (e) {
            throw new RepositoryError(`Error al obtener acreedor por id ${id}.`, e);
        }

        if (!acreedor) {
            throw new ItemNotFoundError("Acreedor");
        }

        return acreedor;
    }

    public async obtenerTodos(): Promise<Acreedor[]> {
        let acreedores;
        try {
            acreedores = await prisma.acreedor.findMany();
        } catch (e) {
            throw new RepositoryError(`Error al obtener acreedores de la base de datos.`, e);
        }
        return acreedores;
    }

    public async actualizar(id: number, dto: ActualizarAcreedorDTO): Promise<Acreedor> {
        if (!dto) {
            throw new InvalidDtoError;
        }

        try {
            const dataUpdate: AcreedorUpdateInput = {
                ...(dto.nombre !== undefined && { nombre: dto.nombre }),
                ...(dto.telefono !== undefined && { telefono: dto.telefono }),
            };

            const acreedorUpdateado = await prisma.acreedor.update({
                where: { id: id },
                data: dataUpdate
            });

            return acreedorUpdateado;
        } catch (e) {
            throw new RepositoryError(`Error al actualizar acreedor.`, e);
        }
    }

    public async eliminar(id: number): Promise<Acreedor> {
        try {
            return await prisma.acreedor.update({ where: { id }, data: { eliminado: true } });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new ItemNotFoundError("Acreedor");
            }
            throw new RepositoryError(`Error al eliminar acreedor.`, e);
        }
    }
}