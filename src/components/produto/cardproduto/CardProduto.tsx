import { useContext } from "react";
import type Produto from "../../../models/Produto";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const token = usuario?.token || localStorage.getItem("token") || "";

  const handleEdit = (e: React.MouseEvent) => {
    if (!token) {
      e.preventDefault();
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
      return;
    }
    navigate(`/editarproduto/${produto.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    if (!token) {
      e.preventDefault();
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
      return;
    }
    navigate(`/deletarproduto/${produto.id}`);
  };

  return (
    <div
      className="w-full rounded-2xl shadow-md p-6
      bg-linear-to-r from-blue-200 via-cyan-200 to-teal-300
      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Detalhes da Carona
        </h2>

        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            aria-label="Editar produto"
            className="p-2 rounded-full bg-white/70 hover:bg-white transition hover:scale-110"
          >
            <Pencil size={18} />
            <span className="sr-only">Editar produto</span>
          </button>

          <button
            onClick={handleDelete}
            aria-label="Excluir produto"
            className="p-2 rounded-full bg-white/70 hover:bg-red-100 transition hover:scale-110"
          >
            <Trash2 size={18} />
            <span className="sr-only">Excluir produto</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
        <div>
          <p className="text-sm text-gray-600">Título</p>
          <p className="font-semibold">{produto.titulo}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Preço</p>
          <p className="font-semibold">R$ {Number(produto.preco).toFixed(2)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Veículo</p>
          <p className="font-semibold">
            {produto.categoria
              ? `${produto.categoria.fabricante} ${produto.categoria.modelo} - ${produto.categoria.ano} - ${produto.categoria.cor} - ${produto.categoria.placa}`
              : "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Origem</p>
          <p className="font-semibold">{produto.origem}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Destino</p>
          <p className="font-semibold">{produto.destino}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Distância</p>
          <p className="font-semibold">{produto.distanciaKm} km</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Tempo</p>
          <p className="font-semibold">{produto.tempoMinutos} min</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Velocidade Média</p>
          <p className="font-semibold">{produto.velocidadeMediaKmh} km/h</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p
            className={`font-semibold ${
              produto.ativo ? "text-green-600" : "text-red-600"
            }`}
          >
            {produto.ativo ? "Ativo" : "Inativo"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">Descrição</p>
        <p>{produto.descricao}</p>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>Data: {new Date(produto.data).toLocaleDateString("pt-BR")}</span>
        <span>
          Mesmo gênero: {produto.motoristaMesmoGenero ? "Sim" : "Não"}
        </span>
      </div>
    </div>
  );
}

export default CardProduto;