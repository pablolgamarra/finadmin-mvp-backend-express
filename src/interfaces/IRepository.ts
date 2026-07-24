export interface IRepository {
    crear(entidad: any): Promise<any>;
    obtenerPorId(id: string): Promise<any>;
    obtenerTodos(): Promise<any[]>;
    actualizar(id: string, entidad: any): Promise<any>;
    eliminar(id: string): Promise<any>;
}