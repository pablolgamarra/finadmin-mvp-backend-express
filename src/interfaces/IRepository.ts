export interface IRepository<TEntity, TCrearDTO, TActualizarDTO = Partial<TCrearDTO>> {
    crear(data: TCrearDTO): Promise<TEntity>;
    obtenerPorId(id: number): Promise<TEntity>;
    obtenerTodos(): Promise<TEntity[]>;
    actualizar(id: number, data: TActualizarDTO): Promise<TEntity>;
    eliminar(id: number): Promise<TEntity>;
}