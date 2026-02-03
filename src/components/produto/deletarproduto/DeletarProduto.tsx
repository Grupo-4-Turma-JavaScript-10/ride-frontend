import { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { Check } from "lucide-react";

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || localStorage.getItem("token") || "";

  const header = useMemo(
    () => ({
      headers: { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` },
    }),
    [token]
  );

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    titulo: "",
    descricao: "",
    preco: 0,
    origem: "",
    destino: "",
    distanciaKm: 0,
    tempoMinutos: 0,
    velocidadeMediaKmh: 0,
    ativo: true,
    data: "",
    motoristaMesmoGenero: false,
    categoria: {} as any,
    usuario: {} as any,
  });

  const [loading, setLoading] = useState(true);
  const [deletando, setDeletando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  // Verifica login ao montar
  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id && token) {
      const carregarProduto = async () => {
        try {
          setLoading(true);
          await buscar(`/produtos/${id}`, setProduto, header);
        } catch (error: any) {
          if (error.toString().includes("401") || error.response?.status === 401) {
            ToastAlerta("Sessão expirada. Faça login novamente.", "error");
            handleLogout();
          } else {
            ToastAlerta("Erro ao carregar produto", "error");
          }
        } finally {
          setLoading(false);
        }
      };
      carregarProduto();
    }
  }, [id, header, token, handleLogout]);

  async function confirmarDelete() {
    if (!id) return;

    setDeletando(true);
    try {
      await deletar(`/produtos/${id}`, header);
      setConfirmado(true);
      ToastAlerta("Produto deletado com sucesso!", "success");

      setTimeout(() => {
        navigate("/produtos");
      }, 1800);
    } catch (error: any) {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "error");
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar produto", "error");
      }
    } finally {
      setDeletando(false);
    }
  }

  return (
    <div className="relative flex justify-center items-center py-10 bg-gray-100 min-h-screen overflow-hidden">

      {confirmado && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/20 transition-all duration-500 animate-fadeInOverlay"></div>
      )}

      <div className={`
        relative z-10
        w-full max-w-3xl
        rounded-3xl shadow-2xl p-10
        transition-all duration-500
        ${confirmado
          ? "bg-green-400 scale-105 animate-float animate-glow"
          : "bg-linear-to-r from-blue-200 via-cyan-200 to-teal-300"}
        animate-fadeInUp
      `}>

        {!confirmado ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              Deletar Produto
            </h2>

            <div className="bg-white/80 rounded-2xl p-8 shadow-md">
              <p className="text-lg text-gray-800 mb-6">
                Você tem certeza que deseja excluir o produto:
              </p>

              <p className="font-bold text-2xl text-gray-800">{produto.titulo}</p>
            </div>

            <div className="flex justify-end gap-5 mt-12">
              <button
                className="px-8 py-3 rounded-full bg-white text-gray-700 font-medium shadow-md hover:bg-gray-100 transition-all duration-300"
                onClick={() => navigate("/produtos")}
                disabled={deletando}
              >
                Cancelar
              </button>

              <button
                className="px-8 py-3 rounded-full bg-pink-400 text-white font-semibold shadow-lg hover:bg-red-500 transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={confirmarDelete}
                disabled={deletando}
              >
                {deletando ? <ClipLoader size={20} color="#fff" /> : "Confirmar Exclusão"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white animate-successFade">
            <div className="animate-bounceIn">
              <Check size={90} />
            </div>
            <h3 className="text-3xl font-bold mt-6">Produto Excluído!</h3>
            <p className="mt-2 opacity-90">Redirecionando...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletarProduto;