import type DeudasRepository from "@deudas/deudas.repository";

export class DeudasControlle1r {
    private _repo: DeudasRepository;

    constructor(deudasRepository: DeudasRepository) {
        this._repo = deudasRepository;
    }

    async leerDeudas() {
        return this._repo.leerDeudas();
    }
}