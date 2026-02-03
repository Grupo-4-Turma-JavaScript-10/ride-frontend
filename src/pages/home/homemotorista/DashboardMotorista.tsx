import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar } from "../../../services/Service";
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
  rota: string;
  horario: string;
  status: string;
  passageiro: {
    id: number;
    nome: string;
  };
}

export default function DashboardMotorista() {
  const { usuario, isMotorista, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [viagemAtual, setViagemAtual] = useState<Viagem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario.token !== "" && !isMotorista) {
      ToastAlerta("Acesso permitido apenas para motoristas", "error");
      navigate("/home");
    }
  }, [usuario.token, isMotorista, navigate]);

  async function carregarDashboard() {
    try {
      await buscar(
        `/motoristas/${usuario.id}/dashboard`,
        setDashboard,
        usuario.token
      );
    } catch (error: any) {
      if (error.response?.status === 401) handleLogout();
    }
  }

  async function buscarViagemDisponivel() {
    try {
      const resposta = await buscar(
        `/viagens/disponiveis`,
        () => {},
        usuario.token
      );

      if (resposta?.length > 0) {
        setViagemAtual(resposta[0]);
      } else {
        setViagemAtual(null);
      }
    } catch {
      ToastAlerta("Erro ao buscar viagens", "error");
    }
  }

  async function aceitarViagem() {
    if (!viagemAtual) return;

    try {
      await atualizar(
        `/viagens/${viagemAtual.id}/aceitar`,
        {},
        () => {},
        usuario.token
      );

      ToastAlerta("Viagem aceita!", "success");
      buscarViagemDisponivel();
      carregarDashboard();
    } catch {
      ToastAlerta("Erro ao aceitar", "error");
    }
  }

  async function iniciarViagem() {
    if (!viagemAtual) return;

    await atualizar(
      `/viagens/${viagemAtual.id}/iniciar`,
      {},
      () => {},
      usuario.token
    );

    ToastAlerta("Viagem iniciada!", "success");
  }

  async function finalizarViagem() {
    if (!viagemAtual) return;

    await atualizar(
      `/viagens/${viagemAtual.id}/finalizar`,
      {},
      () => {},
      usuario.token
    );

    ToastAlerta("Viagem finalizada!", "success");
    setViagemAtual(null);
    carregarDashboard();
  }

  useEffect(() => {
    if (usuario.id !== 0 && usuario.token !== "") {
      setLoading(false);
      carregarDashboard();
      buscarViagemDisponivel();

      const interval = setInterval(() => {
        carregarDashboard();
        buscarViagemDisponivel();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [usuario.id, usuario.token]);

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

        <div className="grid grid-cols-3 gap-6">
          <Card titulo="Ganhos Hoje" valor={`R$ ${dashboard.ganhosHoje}`} />
          <Card titulo="Viagens" valor={dashboard.viagensHoje} />
          <Card titulo="Avaliação" valor={`${dashboard.avaliacao} ★`} />
        </div>

        {viagemAtual && (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Nova Solicitação
            </h3>

            <p><strong>Passageiro:</strong> {viagemAtual.passageiro.nome}</p>
            <p><strong>Rota:</strong> {viagemAtual.rota}</p>
            <p><strong>Horário:</strong> {viagemAtual.horario}</p>

            <div className="flex gap-4 mt-4">
              {viagemAtual.status === "SOLICITADA" && (
                <button
                  onClick={aceitarViagem}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white"
                >
                  Aceitar
                </button>
              )}

              {viagemAtual.status === "ACEITA" && (
                <button
                  onClick={iniciarViagem}
                  className="px-4 py-2 rounded-lg bg-yellow-400"
                >
                  Iniciar
                </button>
              )}

              {viagemAtual.status === "EM_ANDAMENTO" && (
                <button
                  onClick={finalizarViagem}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                >
                  Finalizar
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Card({ titulo, valor }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <p className="text-gray-500">{titulo}</p>
      <p className="text-2xl font-bold">{valor}</p>
    </div>
  );
}
