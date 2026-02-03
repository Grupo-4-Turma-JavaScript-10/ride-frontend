import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardMotorista from "../home/homemotorista/DashboardMotorista";
import DashboardPassageiro from "../home/homepassageiro/DashboardPassageiro";

export default function Dashboard() {
  const { usuario, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <div className="p-10">Carregando dashboard...</div>;
  }

  const usuarioSalvo = localStorage.getItem("usuario");
  const tipoUsuario =
    usuario.tipoUsuario ||
    (usuarioSalvo ? JSON.parse(usuarioSalvo).tipoUsuario : "");

  if (tipoUsuario === "MOTORISTA") {
    return <DashboardMotorista />;
  }

  if (tipoUsuario === "PASSAGEIRO") {
    return <DashboardPassageiro />;
  }

  return <div className="p-10">Carregando perfil...</div>;
}
