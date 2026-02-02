import type Produto from "../../../models/Produto";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <div
      className="
        w-full
        rounded-2xl shadow-md p-6
        bg-linear-to-r from-blue-200 via-cyan-200 to-teal-300
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        animate-fadeIn
      "
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Detalhes da Viagem
        </h2>

        <div className="flex gap-3">
          <Link
            to={`/editarproduto/${produto.id}`}
            className="
              p-2 rounded-full bg-white/70
              hover:bg-white
              transition
              hover:scale-110
              flex items-center justify-center
            "
          >
            <Pencil size={18} className="text-gray-700" />
          </Link>

          <Link
            to={`/deletarproduto/${produto.id}`}
            className="
              p-2 rounded-full bg-white/70
              transition-all duration-300
              hover:bg-red-100
              hover:scale-110
              flex items-center justify-center
              group hover:animate-shake
            "
          >
            <Trash2
              size={18}
              className="text-gray-700 transition-colors duration-300 group-hover:text-red-500"
            />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
        <div>
          <p className="text-sm text-gray-600">Título:</p>
          <p className="font-semibold">{produto.titulo}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Preço:</p>
          <p className="font-semibold">
            R$ {produto.preco.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Categoria:</p>
          <p className="font-semibold">{produto.categoria?.carro}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Origem:</p>
          <p className="font-semibold">{produto.origem}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Destino:</p>
          <p className="font-semibold">{produto.destino}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Distância:</p>
          <p className="font-semibold">{produto.distanciaKm} km</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Tempo:</p>
          <p className="font-semibold">{produto.tempoMinutos} min</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Velocidade Média:</p>
          <p className="font-semibold">
            {produto.velocidadeMediaKmh} km/h
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Status:</p>
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
        <p className="text-sm text-gray-600">Descrição:</p>
        <p className="text-gray-800">{produto.descricao}</p>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>
          Data: {new Date(produto.data).toLocaleDateString("pt-BR")}
        </span>

        <span>
          Mesmo gênero: {produto.motoristaMesmoGenero ? "Sim" : "Não"}
        </span>
      </div>
    </div>
  );
}

export default CardProduto;
