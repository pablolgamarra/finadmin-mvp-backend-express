import { z } from "zod";

export const crearCuotaSchema = z.object({
    orden: z.number().int().positive({ error: "Debe ser un número positivo" }),
    monto: z.number().positive({ error: "Debe ser un número positivo" }),
    fechaVencimiento: z.iso.datetime().optional()
});

export type CrearCuotaDTO = z.infer<typeof crearCuotaSchema>;

export const actualizarCuotaSchema = crearCuotaSchema.partial();

export type ActualizarCuotaDTO = z.infer<typeof actualizarCuotaSchema>;