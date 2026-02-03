import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { buscar } from "../../../services/Service";

interface Usuario {
  id: number;
  nome: string;
  tipoUsuario: "PASSAGEIRO" | "MOTORISTA";
}

interface Destino {
  id: string;
  nome: string;
}

interface Viagem {
  motorista: string;
  origem: string;
  destino: string;
  horario: string;
  status: "AGUARDANDO" | "EM_ANDAMENTO" | "FINALIZADA";
}

export default function DashboardPassageiro() {
  const { usuario, isAuthenticated, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [destino, setDestino] = useState("");
  const [destinosRecentes, setDestinosRecentes] = useState<Destino[]>([]);
  const [proximaViagem, setProximaViagem] = useState<Viagem | null>(null);
  const [motoristaSelecionado, setMotoristaSelecionado] =
    useState<Usuario | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (usuario?.tipoUsuario === "MOTORISTA") {
      navigate("/dashboard-motorista");
    }
  }, [isAuthenticated, usuario, navigate]);

  useEffect(() => {
    async function buscarMotoristaAleatorio() {
      try {
        const motoristas: Usuario[] = await buscar(
          "/usuarios?tipoUsuario=MOTORISTA",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!motoristas || motoristas.length === 0) {
          setMotoristaSelecionado(null);
          return;
        }

        const motoristaAleatorio =
          motoristas[Math.floor(Math.random() * motoristas.length)];

        setMotoristaSelecionado(motoristaAleatorio);
      } catch (error) {
        console.error("Erro ao buscar motorista:", error);
        setMotoristaSelecionado(null);
      }
    }

    if (isAuthenticated && token) {
      buscarMotoristaAleatorio();
    }
  }, [isAuthenticated, token]);

  function solicitarCarona() {
    if (!destino.trim()) {
      alert("Digite um destino!");
      return;
    }

    if (!motoristaSelecionado) {
      alert("Nenhum motorista disponível no momento.");
      return;
    }

    const novaViagem: Viagem = {
      motorista: motoristaSelecionado.nome,
      origem: "Sua localização atual",
      destino,
      horario: "Agora",
      status: "AGUARDANDO",
    };

    setProximaViagem(novaViagem);

    setDestinosRecentes((prev) => {
      const filtrados = prev.filter((d) => d.nome !== destino);
      return [{ id: crypto.randomUUID(), nome: destino }, ...filtrados];
    });

    setDestino("");
  }

  function cancelarCorrida() {
    setProximaViagem(null);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-pink-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/40">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Para onde vamos hoje?
          </h1>

          {motoristaSelecionado && (
            <p className="mt-2 text-sm text-gray-600">
              🚘 Motorista disponível:{" "}
              <strong>{motoristaSelecionado.nome}</strong>
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            placeholder="Digite seu destino..."
            className="flex-1 p-4 rounded-2xl border focus:ring-2 focus:ring-pink-300"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={solicitarCarona}
            className="px-8 py-4 rounded-2xl bg-linear-to-r from-yellow-300 to-pink-300 font-semibold shadow-md"
          >
            Solicitar Corrida
          </motion.button>
        </div>

        <AnimatePresence>
          {proximaViagem && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-linear-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 shadow-inner"
            >
              <h2 className="text-xl font-semibold mb-4">
                🚗 Próxima Corrida
              </h2>

              <p>
                <strong>Motorista:</strong> {proximaViagem.motorista}
              </p>
              <p>
                <strong>Origem:</strong> {proximaViagem.origem}
              </p>
              <p>
                <strong>Destino:</strong> {proximaViagem.destino}
              </p>
              <p>
                <strong>Status:</strong> {proximaViagem.status}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={cancelarCorrida}
                className="mt-6 w-full py-3 bg-gray-800 text-white rounded-xl"
              >
                Cancelar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}