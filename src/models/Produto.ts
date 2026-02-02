import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    origem: string;
    destino: string;
    distanciaKm: number;
    tempoMinutos: number;
    velocidadeMediaKmh: number;
    ativo: boolean;
    data: string;
    motoristaMesmoGenero: boolean;
    categoria: Categoria;
    usuario: Usuario;
}