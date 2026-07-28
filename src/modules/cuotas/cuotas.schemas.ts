import { z } from "zod";

const camposComunesCuota = z.object({
    orden: z.number().int().positive(),
    monto: z.number().positive(),
    fechaVencimiento: z.iso.datetime().optional(),
});

export const crearCuotaSchema = camposComunesCuota;
export type CrearCuotaDTO = z.infer<typeof crearCuotaSchema>;

export const actualizarCuotaSchema = camposComunesCuota.partial();
export type ActualizarCuotaDTO = z.infer<typeof actualizarCuotaSchema>;