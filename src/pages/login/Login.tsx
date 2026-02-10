import {
  useEffect,
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, type UsuarioLogin } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading: contextLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    tipoUsuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario.token, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await handleLogin(usuarioLogin);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">

      <div className="absolute inset-0 bg-linear-to-br from-yellow-50 via-white to-rose-50" />
      <div className="absolute w-150 h-150 bg-yellow-200/20 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-150 h-150 bg-pink-200/20 rounded-full blur-3xl -bottom-40 -right-40" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-lg p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 tracking-tight">
          Entrar
        </h2>

        <form onSubmit={login} className="flex flex-col gap-4">
          <input
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            required
            disabled={contextLoading}
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            required
            disabled={contextLoading}
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={contextLoading}
            className={`mt-2 py-3 rounded-lg font-medium text-gray-900
              bg-linear-to-br from-yellow-200 via-pink-200 to-rose-200
              shadow-md transition-all duration-300
              hover:from-amber-300 hover:via-orange-200 hover:to-rose-300
              hover:-translate-y-1 hover:shadow-lg active:scale-95
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
          >
            {contextLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Não tem conta?{" "}
          <Link
            to="/cadastro"
            className="font-medium text-gray-800 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}