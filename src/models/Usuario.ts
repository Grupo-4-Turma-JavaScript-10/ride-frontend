import type Produto from "./Produto";

export default interface Usuario{
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    sexo: string;
    data: string;
    tipoUsuario: string;
    produto?: Produto[];
}