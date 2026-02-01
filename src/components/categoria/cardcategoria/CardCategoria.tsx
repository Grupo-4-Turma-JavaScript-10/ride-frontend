import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div
      className="
        w-full
        rounded-2xl shadow-md p-6
        bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300
        
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        animate-fadeIn
      "
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Detalhes do Veículo
      </h2>

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
