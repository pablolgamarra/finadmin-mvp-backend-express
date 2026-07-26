export interface CrearAcreedorDTO {
    nombre: string;
    telefono: string;
    comentarios: string;
}

export type ActualizarAcreedorDTO = Partial<CrearAcreedorDTO>