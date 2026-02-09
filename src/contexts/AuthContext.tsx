import { createContext, useState, type ReactNode, useEffect } from "react";
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
    sexo?: string;
    data?: string;
    produto?: Produto[];
}

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    atualizarUsuario(usuarioAtualizado: Partial<UsuarioLogin>): void;
    isLoading: boolean;
    isMotorista: boolean;
    isPassageiro: boolean;
    isAuthenticated: boolean;
}

interface AuthProvidersProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProvidersProps) {
    const navigate = useNavigate();
    
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        tipoUsuario: "",
        senha: "",
        foto: "",
        token: "",
        sexo: "",
        data: "",
        produto: []
    });
    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioSalvo = localStorage.getItem('usuario');
        if (token && usuarioSalvo) {
            try {
                const usuarioData = JSON.parse(usuarioSalvo);
                const usuarioComToken = { ...usuarioData, token, senha: "" };
                setUsuario(usuarioComToken);
            } catch {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
            }
        }
    }, []);

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login("/usuarios/logar", usuarioLogin, (usuarioRetornado: UsuarioLogin) => {
                const usuarioCompleto = {
                    ...usuarioRetornado,
                    tipoUsuario: usuarioRetornado.tipoUsuario || usuarioLogin.tipoUsuario || "",
                    senha: ""
                };
                
                setUsuario(usuarioCompleto);
                localStorage.setItem('token', usuarioRetornado.token);
                localStorage.setItem('usuario', JSON.stringify({
                    id: usuarioRetornado.id,
                    nome: usuarioRetornado.nome,
                    usuario: usuarioRetornado.usuario,
                    tipoUsuario: usuarioRetornado.tipoUsuario || usuarioLogin.tipoUsuario || "",
                    foto: usuarioRetornado.foto,
                    sexo: usuarioRetornado.sexo,
                    data: usuarioRetornado.data,
                    produto: usuarioRetornado.produto
                }));
                
                // Se tipoUsuario não veio, buscar perfil completo
                if (!usuarioRetornado.tipoUsuario) {
                    fetch(
                        `${import.meta.env.VITE_API_URL}/usuarios/${usuarioRetornado.id}`,
                        { headers: { Authorization: usuarioRetornado.token } }
                    )
                    .then(res => res.json())
                    .then(perfil => {
                        const usuarioAtualizado = {
                            ...usuarioCompleto,
                            tipoUsuario: perfil.tipoUsuario || usuarioLogin.tipoUsuario || ""
                        };
                        setUsuario(usuarioAtualizado);
                        localStorage.setItem('usuario', JSON.stringify({
                            id: perfil.id,
                            nome: perfil.nome,
                            usuario: perfil.usuario,
                            tipoUsuario: perfil.tipoUsuario || usuarioLogin.tipoUsuario || "",
                            foto: perfil.foto,
                            sexo: perfil.sexo,
                            data: perfil.data,
                            produto: perfil.produto
                        }));
                    })
                    .catch(erro => console.error('Erro ao buscar perfil:', erro));
                }
                
                ToastAlerta('Login realizado com sucesso!', 'success');
                navigate("/home");
            });
        } catch {
            ToastAlerta('Os dados do usuário estão inconsistentes!', 'error');
            throw new Error('Erro no login');
        } finally {
            setIsLoading(false);
        }
    }

    function atualizarUsuario(usuarioAtualizado: Partial<UsuarioLogin>) {
        const novoUsuario = { ...usuario, ...usuarioAtualizado };
        setUsuario(novoUsuario);
        
        localStorage.setItem('usuario', JSON.stringify({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            usuario: novoUsuario.usuario,
            tipoUsuario: novoUsuario.tipoUsuario,
            foto: novoUsuario.foto,
            sexo: novoUsuario.sexo,
            data: novoUsuario.data,
            produto: novoUsuario.produto
        }));
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            tipoUsuario: "",
            senha: "",
            foto: "",
            token: "",
            sexo: "",
            data: "",
            produto: []
        });
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate("/login");
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                handleLogin,
                handleLogout,
                atualizarUsuario,
                isLoading,
                isMotorista: usuario.tipoUsuario === "MOTORISTA",
                isPassageiro: usuario.tipoUsuario === "PASSAGEIRO",
                isAuthenticated: usuario.token !== ""
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}