import type Produto from "./Produto";

export type TipoUsuario = 'PASSAGEIRO' | 'MOTORISTA';

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    sexo: string;
    data: string;
    tipoUsuario: TipoUsuario;
    produto?: Produto[];
}