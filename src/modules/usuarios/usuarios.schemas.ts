import z from "zod";

export const crearUsuarioSchema = z.object({
    nombre: z.string().min(2, "Nombre es obligatorio"),
    correo: z.email("Email inválido"),
    password: z.string().min(8, "La contraseña debe tener 8 caracteres como mínimo.")
})

export type CrearUsuarioDTO = z.infer<typeof crearUsuarioSchema>;

export const actualizarUsuarioSchema = z.object({
    nombre: z.string().min(2, "Nombre es obligatorio").optional(),
    correo: z.email("Email es necesario"),
    passwordActual: z.string().min(8, "La contraseña debe tener 8 caracteres como mínimo."),
    passwordNueva: z.string().min(8, "La contraseña debe tener 8 caracteres como mínimo.")
})

export type ActualizarUsuarioDTO = z.infer<typeof actualizarUsuarioSchema>;

export const usuarioLoginSchema = z.object({
    email: z.email("El correo de usuario es necesario"),
    password: z.string().min(1, "La contraseña es obligatoria")
})

export type UsuarioLoginDTO = z.infer<typeof usuarioLoginSchema>;