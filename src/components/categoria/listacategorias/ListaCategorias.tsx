import CardCategoria from "../cardcategoria/CardCategoria";

function ListaCategorias() {
    return(
       <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center">
  <div className="w-full max-w-5xl">

    <div className="flex items-center justify-between mb-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Perfis de Veículo
      </h1>

      <button
        className="
          px-5 py-2.5
          rounded-xl
          bg-linear-to-r from-pink-300 to-pink-400
          hover:from-pink-400 hover:to-pink-500
          text-white font-medium
          shadow-md
          transition-all duration-300
          hover:scale-105 hover:shadow-lg
        "
      >
        + Novo Veículo
      </button>
    </div>

    <div className="space-y-4">
      <CardCategoria />
      <CardCategoria />
      <CardCategoria />
    </div>

  </div>
</div>

    )
}
export default ListaCategorias;