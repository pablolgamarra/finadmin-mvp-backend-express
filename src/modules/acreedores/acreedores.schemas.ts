import { z } from "zod";

export const crearAcreedorSchema = z.object({
    nombre: z.string().min(1, "nombre es requerido"),
    telefono: z.string().min(1, "telefono es requerido"),
    comentarios: z.string().min(1, "comentarios es requerido"),
});

export type CrearAcreedorDTO = z.infer<typeof crearAcreedorSchema>;

export const actualizarAcreedorSchema = crearAcreedorSchema.partial();

export type ActualizarAcreedorDTO = z.infer<typeof actualizarAcreedorSchema>;