import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { atualizar } from "../../services/Service";
import { ToastAlerta } from "../../util/ToastAlerta";
import { mapUsuarioLoginParaUsuario } from "../../util/mapUsuarioLoginParaUsuario";

import PerfilUsuario from "../../components/usuario/perfil/PerfilUsuario";
import CorridasUsuario from "../../components/usuario/corrida/CorridaUsuario";

function PerfilPage() {
  const navigate = useNavigate();
  const { usuario, handleLogout, isAuthenticated } = useContext(AuthContext);
  const token = usuario.token;

  // 🔐 Verifica autenticação
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  // Mapeia UsuarioLogin → Usuario
  const usuarioCompleto: Usuario = mapUsuarioLoginParaUsuario(usuario);


  async function handleUpdateUsuario(usuarioAtualizado: Usuario) {
    const payload = {
      ...usuarioAtualizado,
      tipoUsuario: usuarioAtualizado.tipoUsuario || "PASSAGEIRO",  // Default para "PASSAGEIRO"
      sexo: usuarioAtualizado.sexo || "M",  // Default para "M"
      data: usuarioAtualizado.data || new Date().toISOString(),  // Default para data atual
      produto: usuarioAtualizado.produto ?? [],  // Garantir que "produto" seja um array
    };

    try {
      // Enviar os dados para a API
      await atualizar(
        "/usuarios/atualizar",
        payload,
        () => { },
        {
          headers: { Authorization: usuario.token },
        }
      );

      ToastAlerta("Perfil atualizado com sucesso", "sucesso");
    } catch (error: any) {
      // Se o erro for de autenticação, fazer logout
      if (error.toString().includes("401") || error.toString().includes("403")) {
        handleLogout();
      } else {
        // Caso contrário, exibir erro genérico
        ToastAlerta("Erro ao atualizar usuário", "erro");
        console.error(error);
      }
    }
  }

  // Evita renderizar sem autenticação
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Perfil do usuário */}
        <PerfilUsuario
          usuario={usuarioCompleto}
          onUpdate={handleUpdateUsuario}
        />

        {/* Corridas do usuário */}
        <CorridasUsuario
          produtos={usuarioCompleto.produto}
          tipoUsuario={usuarioCompleto.tipoUsuario}
        />
      </div>

      <ToastContainer />
    </div>
  );
}

export default PerfilPage;
