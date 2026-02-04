import { useContext } from "react";
import type Produto from "../../../models/Produto";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, MapPin, Clock, Gauge, Calendar, Users } from "lucide-react";
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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header do Card */}
      <div className="bg-gradient-custom p-6 text-black">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold flex-1">{produto.titulo}</h3>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="p-2 bg-black/10 hover:bg-black/20 rounded-lg transition-colors backdrop-blur-sm"
              title="Editar produto"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-black/10 hover:bg-red-500/80 hover:text-white rounded-lg transition-colors backdrop-blur-sm"
              title="Excluir produto"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            produto.ativo 
              ? 'bg-emerald-500/20 text-black border border-emerald-600/30' 
              : 'bg-gray-500/20 text-black border border-gray-600/30'
          }`}>
            {produto.ativo ? "Ativo" : "Inativo"}
          </span>
          <span className="text-3xl font-bold ml-auto">
            R$ {Number(produto.preco).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 border-b-2 border-custom-yellow/30">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white rounded-full p-4 shadow-md">
            <Clock size={32} className="text-yellow-600" />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-700 font-medium mb-1">Tempo Estimado</p>
            <p className="text-5xl font-bold text-yellow-600">
              {produto.tempoMinutos}
              <span className="text-2xl ml-1 text-gray-500">min</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-2 mt-1">
            <MapPin size={20} className="text-yellow-600" fill="currentColor" />
            <div className="h-12 w-0.5 bg-gradient-to-b from-yellow-600 to-red-600"></div>
            <MapPin size={20} className="text-red-600" fill="currentColor" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Origem</p>
              <p className="text-gray-800 font-semibold">{produto.origem}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Destino</p>
              <p className="text-gray-800 font-semibold">{produto.destino}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-yellow-600" />
            <p className="text-xs text-gray-600 font-medium">Distância</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">{produto.distanciaKm} <span className="text-sm text-gray-500">km</span></p>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <Gauge size={18} className="text-amber-600" />
            <p className="text-xs text-gray-600 font-medium">Velocidade Média</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">{produto.velocidadeMediaKmh} <span className="text-sm text-gray-500">km/h</span></p>
        </div>
      </div>

      {produto.categoria && (
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <p className="text-xs text-gray-600 font-medium mb-2">Veículo</p>
            <p className="text-gray-800 font-semibold">
              {`${produto.categoria.fabricante} ${produto.categoria.modelo}`}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {`${produto.categoria.ano} • ${produto.categoria.cor} • ${produto.categoria.placa}`}
            </p>
          </div>
        </div>
      )}

      {produto.descricao && (
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-600 font-medium mb-2">Descrição</p>
          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
            {produto.descricao}
          </p>
        </div>
      )}

      <div className="px-6 pb-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>{new Date(produto.data).toLocaleDateString("pt-BR")}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={16} />
          <span>Mesmo gênero: {produto.motoristaMesmoGenero ? "Sim" : "Não"}</span>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;