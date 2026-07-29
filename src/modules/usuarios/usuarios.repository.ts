import bcrypt from "bcrypt";
import RepositoryError from "@errors/RepositoryError";
import { ActualizarUsuarioDTO, CrearUsuarioDTO, UsuarioLoginDTO } from "modules/usuarios/usuarios.schemas";
import { prisma } from "@prismaClient";
import { Prisma } from "@prismaGeneratedClient";
import AuthError from "@errors/AuthError";

const SALT_ROUNDS = 10;

export default class UsuariosRepository {
    public async registrar(data: CrearUsuarioDTO) {
        try {
            const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

            return await prisma.usuario.create({
                data: { nombre: data.nombre, correo: data.correo, password: passwordHash },
                select: { id: true, email: true, fechaCreacion: true }
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new AuthError("El email ya está registrado");
            }
            throw new RepositoryError("Error al registrar usuario");
        }
    }

    public async validarCredenciales(data: UsuarioLoginDTO) {
        let usuario;
        try {
            usuario = await prisma.usuario.findUnique({ where: { correo: data.email } });
        } catch (e) {
            throw new RepositoryError("Error al validar credenciales.", e);
        }

        if (!usuario) {
            throw new AuthError("Credenciales inválidas");
        }

        const esValido = await bcrypt.compare(data.password, usuario.password);
        if (!esValido) {
            throw new AuthError("Credenciales inválidas");
        }

        return { id: usuario.id, email: usuario.correo };
    }

    public async actualizarUsuario(data: ActualizarUsuarioDTO) {
        let usuario;

        try {
            usuario = await prisma.usuario.findUnique({ where: { correo: data.correo } });
        } catch (e) {
            throw new RepositoryError("Error al validar credenciales.", e);
        }

        if (!usuario) {
            throw new AuthError("Credenciales inválidas");
        }

        const passActualValida = await bcrypt.compare(data.passwordActual, usuario.password);

        if (!passActualValida) {
            throw new AuthError("Credenciales inválidas");
        }

        try {
            const passwordHash = await bcrypt.hash(data.passwordNueva, SALT_ROUNDS);

            const usuarioUpdate: Prisma.UsuarioUpdateInput = {
                ...(data.nombre !== undefined && { nombre: data.nombre }),
                ...{ password: passwordHash }
            };
            return await prisma.usuario.update({ where: { correo: data.correo }, data: usuarioUpdate });

        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new AuthError("El email ya está registrado");
            }
            throw new RepositoryError("Error al actualizar usuario");
        }
    }
}