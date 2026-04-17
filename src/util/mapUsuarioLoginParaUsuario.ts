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
    sexo: u.sexo || "M",
    data: u.data || new Date().toISOString().split('T')[0],
    senha: "",
  };
}
export default mapUsuarioLoginParaUsuario;