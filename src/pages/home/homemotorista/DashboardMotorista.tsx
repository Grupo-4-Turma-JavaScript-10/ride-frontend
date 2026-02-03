import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, authHeader } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { useNavigate } from "react-router-dom";

interface DashboardData {
  ganhosHoje: number;
  viagensHoje: number;
  avaliacao: number;
  veiculo: string;
  online: boolean;
}

interface Viagem {
  id: number;
  passageiro: string;
  rota: string;
  horario: string;
}

export default function DashboardMotorista() {
  const { usuario, isMotorista, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [proximaViagem, setProximaViagem] = useState<Viagem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isMotorista) {
      ToastAlerta("Acesso permitido apenas para motoristas", "error");
      navigate("/");
    }
  }, [isMotorista]);

  async function carregarDados() {
    try {
      await buscar(
        `/motoristas/${usuario.id}/dashboard`,
        setDashboard,
        authHeader(usuario.token)
      );

      await buscar(
        `/motoristas/${usuario.id}/proxima-viagem`,
        setProximaViagem,
        authHeader(usuario.token)
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        handleLogout();
      }
      ToastAlerta("Erro ao carregar dados", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (usuario.id !== 0) {
      carregarDados();
    }
  }, [usuario]);

  async function toggleOnline() {
    if (!dashboard) return;

    try {
      await atualizar(
        `/motoristas/${usuario.id}/status`,
        { online: !dashboard.online },
        () => {},
        authHeader(usuario.token)
      );

      setDashboard({ ...dashboard, online: !dashboard.online });

      ToastAlerta("Status atualizado!", "success");
    } catch (error: any) {
      ToastAlerta("Erro ao atualizar status", "error");
    }
  }

  async function iniciarViagem() {
    if (!proximaViagem) return;

    try {
      await atualizar(
        `/viagens/${proximaViagem.id}/iniciar`,
        {},
        () => {},
        authHeader(usuario.token)
      );

      ToastAlerta("Viagem iniciada!", "success");
      setProximaViagem(null);
      carregarDados();
    } catch {
      ToastAlerta("Erro ao iniciar viagem", "error");
    }
  }

  async function cancelarViagem() {
    if (!proximaViagem) return;

    try {
      await atualizar(
        `/viagens/${proximaViagem.id}/cancelar`,
        {},
        () => {},
        authHeader(usuario.token)
      );

      ToastAlerta("Viagem cancelada!", "success");
      setProximaViagem(null);
    } catch {
      ToastAlerta("Erro ao cancelar", "error");
    }
  }

  if (loading) return <div className="p-10">Carregando...</div>;
  if (!dashboard) return <div className="p-10">Erro ao carregar dados.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-8">📍 Velo Driver</h1>
      </aside>

      <main className="flex-1 p-8 space-y-6">
        <h2 className="text-3xl font-bold">
          Bem-vindo, {usuario.nome}
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <button
            onClick={toggleOnline}
            className={`w-full py-3 rounded-xl font-semibold ${
              dashboard.online
                ? "bg-green-500 text-white"
                : "bg-linear-to-r from-yellow-200 to-pink-300"
            }`}
          >
            {dashboard.online ? "Online ✅" : "Ficar Online"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">Ganhos Hoje</p>
            <p className="text-2xl font-bold">
              R$ {dashboard.ganhosHoje.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">Viagens</p>
            <p className="text-2xl font-bold">
              {dashboard.viagensHoje}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">Avaliação</p>
            <p className="text-2xl font-bold">
              {dashboard.avaliacao} ★
            </p>
          </div>
        </div>

        {dashboard.online && proximaViagem && (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Próxima Viagem
            </h3>

            <p><strong>Passageiro:</strong> {proximaViagem.passageiro}</p>
            <p><strong>Rota:</strong> {proximaViagem.rota}</p>
            <p><strong>Horário:</strong> {proximaViagem.horario}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={iniciarViagem}
                className="px-4 py-2 rounded-lg bg-linear-to-r from-yellow-200 to-pink-300 font-semibold"
              >
                Iniciar
              </button>
              <button
                onClick={cancelarViagem}
                className="px-4 py-2 rounded-lg border border-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-gray-500">Veículo Atual</p>
          <p className="font-semibold">{dashboard.veiculo}</p>
        </div>
      </main>
    </div>
  );
}
