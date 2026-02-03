import { useContext } from "react";
import type Categoria from "../../../models/Categoria";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const token = usuario?.token || localStorage.getItem('token') || "";
  
  const headingId = `categoria-${categoria.id}-titulo`;
  
  const handleEdit = (e: React.MouseEvent) => {
    if (!token) {
      e.preventDefault();
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
      return;
    }
    navigate(`/editarcategoria/${categoria.id}`);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    if (!token) {
      e.preventDefault();
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
      return;
    }
    navigate(`/deletarcategoria/${categoria.id}`);
  };
  
  return (
    <div
      aria-labelledby={headingId}
      className="
        w-full
        rounded-2xl shadow-md p-6
        bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-300
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        animate-fadeIn
      "
    >
      <div className="flex justify-between items-center mb-4">
        <h2 id={headingId} className="text-xl font-bold text-gray-800">
          Detalhes do Veículo
        </h2>
        
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            aria-label="Editar categoria"
            className="
              p-2 rounded-full bg-white/70
              hover:bg-white
              transition
              hover:scale-110
              flex items-center justify-center
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800/40
            "
          >
            <Pencil size={18} className="text-gray-700" />
            <span className="sr-only">Editar categoria</span>
          </button>
          
          <button
            onClick={handleDelete}
            aria-label="Excluir categoria"
            className="
              p-2 rounded-full bg-white/70
              transition-all duration-300
              hover:bg-red-100
              hover:scale-110
              flex items-center justify-center
              group hover:animate-shake
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
            "
          >
            <Trash2
              size={18}
              className="text-gray-700 transition-colors duration-300 group-hover:text-red-500"
            />
            <span className="sr-only">Excluir categoria</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
        <div>
          <p className="text-sm text-gray-600">Carro:</p>
          <p className="font-semibold">{categoria.carro}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Fabricante:</p>
          <p className="font-semibold">{categoria.fabricante}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Modelo:</p>
          <p className="font-semibold">{categoria.modelo}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Ano:</p>
          <p className="font-semibold">{categoria.ano}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Cor:</p>
          <p className="font-semibold">{categoria.cor}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Placa:</p>
          <p className="font-semibold">{categoria.placa}</p>
        </div>
      </div>
    </div>
  );
}

export default CardCategoria;