import { z } from "zod";

const cuotaManualSchema = z.object({
    orden: z.number().int().positive(),
    monto: z.number().positive(),
    fechaVencimiento: z.iso.datetime().optional(),
});

const generarCuotasSchema = z.object({
    cantidad: z.number().int().positive().min(1),
    frecuencia: z.enum([ "semanal", "quincenal", "mensual" ]),
});

const camposComunesDeuda = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    acreedorId: z.number().int().positive(),
    montoTotal: z.number().positive(),
    fechaInicio: z.iso.datetime(),
});

export const crearDeudaSchema = camposComunesDeuda.extend({
    cuotas: z.array(cuotaManualSchema).optional(),
    generarCuotas: generarCuotasSchema.optional(),
}).refine(
    (data) => {
        const generadoManual = data.cuotas !== undefined && data.cuotas.length > 0;
        const generadoAutomatico = data.generarCuotas !== undefined;
        return generadoManual !== generadoAutomatico; // XOR
    },
    { error: "Se debe especificar cuotas (manualmente) o usar generador de cuotas automático, pero no ambos" }
);

export type CrearDeudaDTO = z.infer<typeof crearDeudaSchema>;

export const actualizarDeudaSchema = camposComunesDeuda.partial().extend({
    finalizado: z.boolean().optional(),
});

export type ActualizarDeudaDTO = z.infer<typeof actualizarDeudaSchema>;