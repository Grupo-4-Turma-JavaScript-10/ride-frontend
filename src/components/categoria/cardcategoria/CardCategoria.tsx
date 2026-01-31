function CardCategoria() {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-1">
   <div
  className="
    w-full max-w-3xl
    rounded-2xl shadow-xl p-4
    bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300
    
    transition-all duration-300
    hover:scale-105 hover:shadow-2xl

    animate-fadeIn
  ">


        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Detalhes do Veículo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
          <div>
            <p className="text-sm text-gray-600">Carro:</p>
            <p className="font-semibold"></p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Fabricante:</p>
            <p className="font-semibold"></p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Modelo:</p>
            <p className="font-semibold"></p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Ano:</p>
            <p className="font-semibold"></p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Cor:</p>
            <p className="font-semibold"></p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Placa:</p>
            <p className="font-semibold"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCategoria;
