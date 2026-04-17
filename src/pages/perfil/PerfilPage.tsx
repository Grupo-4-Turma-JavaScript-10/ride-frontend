import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { ToastAlerta } from "../../util/ToastAlerta";
import { mapUsuarioLoginParaUsuario } from "../../util/mapUsuarioLoginParaUsuario";
import PerfilUsuario from "../../components/usuario/perfil/PerfilUsuario";

function PerfilPage() {
  const navigate = useNavigate();
  const { usuario, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated || usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token, isAuthenticated, navigate]);


  const usuarioCompleto: Usuario = useMemo(
    () => mapUsuarioLoginParaUsuario(usuario),
    [usuario.id]
  );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        <PerfilUsuario usuario={usuarioCompleto} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default PerfilPage;