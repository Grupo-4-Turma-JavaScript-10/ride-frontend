export default function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-rose-50" />


      <div className="absolute w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-3xl -bottom-40 -right-40" />


      <div
        className="
          relative z-10
          w-full max-w-sm
          rounded-2xl
          bg-white/85 backdrop-blur-md
          border border-white/60
          shadow-lg
          p-8
          transition-all duration-500
          animate-[fadeIn_.6s_ease]
          hover:-translate-y-1 hover:shadow-xl
        "
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 tracking-tight">
          Entrar
        </h2>

        <form className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="
              px-4 py-3 rounded-lg
              bg-white/90
              border border-stone-200
              outline-none
              transition-all duration-300
              focus:ring-2 focus:ring-stone-300
              focus:border-stone-400
              focus:shadow-md
              focus:-translate-y-0.5
            "
          />

          <input
            type="password"
            placeholder="Senha"
            className="
              px-4 py-3 rounded-lg
              bg-white/90
              border border-stone-200
              outline-none
              transition-all duration-300
              focus:ring-2 focus:ring-stone-300
              focus:border-stone-400
              focus:shadow-md
              focus:-translate-y-0.5
            "
          />


          <button
            type="button"
            className="
              mt-2 py-3 rounded-lg
              font-medium text-gray-900
              bg-gradient-to-r from-yellow-200 via-pink-200 to-rose-200
              shadow-md
              transition-all duration-300
              hover:from-amber-300 hover:via-orange-200 hover:to-rose-300
              hover:-translate-y-1 hover:shadow-lg
              active:scale-95
            "
          >
            Entrar
          </button>
        </form>


        <p className="text-sm text-center text-gray-600 mt-5">
          Não tem conta?{" "}
          <span className="font-medium text-gray-800 hover:underline cursor-pointer">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}
