interface GenerarCuotasParams {
    montoTotal: number;
    cantidad: number;
    frecuencia: "semanal" | "quincenal" | "mensual";
    fechaInicio: Date;
}

export const generarCuotasAutomaticas = (params: GenerarCuotasParams) => {
    const { montoTotal, cantidad, frecuencia, fechaInicio } = params;

    const montoBase = Math.floor((montoTotal / cantidad) * 100) / 100;
    const diferenciaRedondeo = Math.round((montoTotal - montoBase * cantidad) * 100) / 100;

    const diasPorFrecuencia = { semanal: 7, quincenal: 15, mensual: 30 };

    return Array.from({ length: cantidad }, (_, i) => {
        const orden = i + 1;
        const esUltimaCuota = orden === cantidad;
        const fechaVencimiento = new Date(fechaInicio);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + diasPorFrecuencia[ frecuencia ] * orden);

        return {
            orden,
            monto: esUltimaCuota ? montoBase + diferenciaRedondeo : montoBase, // ajustá el redondeo en la última
            fechaVencimiento,
        };
    });
}