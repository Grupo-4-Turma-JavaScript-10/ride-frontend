import type Usuario from "../models/Usuario";
import type { UsuarioLogin } from "../contexts/AuthContext";

export function mapUsuarioLoginParaUsuario(u: UsuarioLogin): Usuario {
  return {
    id: u.id,
    nome: u.nome,
    usuario: u.usuario,
    tipoUsuario: u.tipoUsuario === "" ? "PASSAGEIRO" : u.tipoUsuario,
    foto: u.foto,
    produto: u.produto ?? [],
    sexo: "M", // default ou substituir por valor real do backend
    data: new Date().toISOString(),
    senha: "", // manter vazio por segurança
  };
}
export default mapUsuarioLoginParaUsuario;