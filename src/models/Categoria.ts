import type Produto from "./Produto";

export default interface Categoria {
    id: number;
    carro: string;
    fabricante: string;
    modelo: string;
    ano: number;
    cor: string;
    placa: string;
    produto?: Produto[];
}