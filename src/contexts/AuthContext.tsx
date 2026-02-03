import {
  createContext,
  useState,
  type ReactNode,
  useEffect
} from "react";
import { ToastAlerta } from "../util/ToastAlerta";
import { login } from "../services/Service";
import { useNavigate } from "react-router-dom";
import type Produto from "../models/Produto";

export interface UsuarioLogin {
  id: number;
  nome: string;
  usuario: string;
  tipoUsuario: "MOTORISTA" | "PASSAGEIRO" | "";
  senha: string;
  foto: string;
  token: string;
  produto?: Produto[];
}

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  isMotorista: boolean;
  isPassageiro: boolean;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    tipoUsuario: "",
    senha: "",
    foto: "",
    token: "",
    produto: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const isMotorista = usuario.tipoUsuario === "MOTORISTA";
  const isPassageiro = usuario.tipoUsuario === "PASSAGEIRO";
  const isAuthenticated = usuario.token !== "";

  // 🔹 Recuperar sessão ao recarregar página
  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (token && usuarioSalvo) {
      try {
        const usuarioData = JSON.parse(usuarioSalvo);

        setUsuario({
          ...usuarioData,
          token,
          senha: ""
        });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  // 🔹 LOGIN
  async function handleLogin(dadosLogin: UsuarioLogin): Promise<void> {
    setIsLoading(true);

    try {
      await login(
        "/usuarios/logar",
        dadosLogin,
        (usuarioRetornado: UsuarioLogin) => {
          setUsuario(usuarioRetornado);

          localStorage.setItem("token", usuarioRetornado.token);

          localStorage.setItem(
            "usuario",
            JSON.stringify({
              id: usuarioRetornado.id,
              nome: usuarioRetornado.nome,
              usuario: usuarioRetornado.usuario,
              tipoUsuario: usuarioRetornado.tipoUsuario,
              foto: usuarioRetornado.foto,
              produto: usuarioRetornado.produto
            })
          );

          // 🔥 Redirecionamento automático
          if (usuarioRetornado.tipoUsuario === "MOTORISTA") {
            navigate("/dashboard-motorista");
          } else {
            navigate("/dashboard-passageiro");
          }
        }
      );

      ToastAlerta("Login realizado com sucesso!", "success");

    } catch (error) {
      ToastAlerta("Usuário ou senha incorretos!", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // 🔹 LOGOUT
  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      tipoUsuario: "",
      senha: "",
      foto: "",
      token: "",
      produto: []
    });

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogin,
        handleLogout,
        isLoading,
        isMotorista,
        isPassageiro,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
