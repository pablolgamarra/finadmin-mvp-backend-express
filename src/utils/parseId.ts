import InvalidDtoError from "@errors/InvalidDtoError";
import InvalidQueryError from "@errors/InvalidQueryError";

export function parseId(idString: string | undefined): number {
    if (!idString) {
        throw new InvalidQueryError('Parametro ID no encontrado');
    }
    const id = Number(idString);
    if (Number.isNaN(id)) {
        throw new InvalidDtoError('Id no válido');
    }
    return id;
}