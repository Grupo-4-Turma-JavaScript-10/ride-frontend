import {
  useEffect,
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, type UsuarioLogin } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../util/ToastAlerta";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    tipoUsuario: "PASSAGEIRO", 
    senha: "",
    foto: "",
    token: ""
  });

  useEffect(() => {
    if (usuarioLogin.token !== "") {
      navigate("/home");
    }
  }, [usuarioLogin.token, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await handleLogin(usuarioLogin);
    } catch (error) {
      ToastAlerta("Usuário ou senha incorretos!", "error");
    } finally {
      setIsLoading(false);
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
          
          <div className="flex gap-2 bg-stone-100/80 p-1 rounded-xl backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setUsuarioLogin({ ...usuarioLogin, tipoUsuario: 'PASSAGEIRO' })}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                usuarioLogin.tipoUsuario === "PASSAGEIRO"
                  ? "bg-white shadow text-gray-900"
                  : "text-stone-500 hover:text-gray-800"
              }`}
            >
              Passageiro
            </button>

            <button
              type="button"
              onClick={() => setUsuarioLogin({ ...usuarioLogin, tipoUsuario: 'MOTORISTA' })}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                usuarioLogin.tipoUsuario === "MOTORISTA"
                  ? "bg-white shadow text-gray-900"
                  : "text-stone-500 hover:text-gray-800"
              }`}
            >
              Motorista
            </button>
          </div>

          <input
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            required
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            required
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 py-3 rounded-lg font-medium text-gray-900
              bg-linear-to-br from-yellow-200 via-pink-200 to-rose-200
              shadow-md transition-all duration-300
              hover:from-amber-300 hover:via-orange-200 hover:to-rose-300
              hover:-translate-y-1 hover:shadow-lg active:scale-95
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? "Entrando..." : "Entrar"}
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