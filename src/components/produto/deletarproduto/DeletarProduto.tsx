import { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const header = useMemo(() => ({
    headers: { Authorization: token || "" },
  }), [token]);

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

  useEffect(() => {
    if (id) {
      const carregarProduto = async () => {
        try {
          setLoading(true);
          await buscar(`/produtos/${id}`, setProduto, header);
        } catch {
          ToastAlerta("Erro ao carregar produto", "erro");
        } finally {
          setLoading(false);
        }
      };
      carregarProduto();
    }
  }, [id, header]);

  async function confirmarDelete() {
    if (!id) return;

    setDeletando(true);
    try {
      await deletar(`/produtos/${id}`, header);
      ToastAlerta("Produto deletado com sucesso!", "sucesso");
      navigate("/produtos");
    } catch {
      ToastAlerta("Erro ao deletar produto", "erro");
    } finally {
      setDeletando(false);
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-center my-8">Deletar Produto</h1>

      {loading ? (
        <p className="text-center text-gray-600">Carregando produto...</p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl">Deseja deletar:</p>
          <p className="font-bold text-2xl">{produto.titulo}</p>

          <div className="flex gap-4 mt-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={confirmarDelete}
              disabled={deletando}
            >
              {deletando ? "Deletando..." : "Sim"}
            </button>

            <button
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/produtos")}
              disabled={deletando}
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletarProduto;
