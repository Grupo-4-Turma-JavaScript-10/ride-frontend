function FormCategoria() {
  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div
        className="
          w-full max-w-4xl
          rounded-3xl
          shadow-2xl
          p-10
          bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300
          animate-fadeInUp
        "
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-10 animate-fadeInUp delay-100">
          Adicionar Novo Veículo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fadeInUp delay-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carro
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition"
            />
          </div>

          <div className="animate-fadeInUp delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fabricante
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
          </div>

          <div className="animate-fadeInUp delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
          </div>

          <div className="animate-fadeInUp delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ano
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
          </div>

          <div className="animate-fadeInUp delay-500">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cor
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
          </div>

          <div className="animate-fadeInUp delay-600">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Placa
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
          </div>
        </div>

        <div className="flex justify-end gap-5 mt-12">
          <button
            className="
              px-8 py-3
              rounded-full
              bg-white
              text-gray-700
              font-medium
              shadow-md
              hover:bg-gray-100
              transition-all duration-300
              transform hover:scale-105
            "
          >
            Cancelar
          </button>

          <button
            className="
              px-8 py-3
              rounded-full
              bg-pink-400
              text-white
              font-semibold
              shadow-lg
              hover:bg-pink-500
              transition-all duration-300
              transform hover:scale-105
            "
          >
            Salvar
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
}

export default FormCategoria;
