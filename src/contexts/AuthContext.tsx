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
        produto: []
    });
    
    const [isLoading, setIsLoading] = useState(false);
    
    const isMotorista = usuario.tipoUsuario === "MOTORISTA";
    const isPassageiro = usuario.tipoUsuario === "PASSAGEIRO";
    const isAuthenticated = usuario.token !== "";

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioSalvo = localStorage.getItem('usuario');
        
        if (token && usuarioSalvo) {
            try {
                const usuarioData = JSON.parse(usuarioSalvo);
                setUsuario({
                    ...usuarioData,
                    token: token,
                    senha: ""
                });
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
            }
        }
    }, []);

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        if (!usuarioLogin.tipoUsuario) {
            ToastAlerta('Selecione se você é motorista ou passageiro!', 'error');
            return;
        }
        
        setIsLoading(true);
        
        try {
            await login(`/usuarios/logar`, usuarioLogin, (usuarioRetornado: UsuarioLogin) => {
                setUsuario(usuarioRetornado);
                
                localStorage.setItem('token', usuarioRetornado.token);
                localStorage.setItem('usuario', JSON.stringify({
                    id: usuarioRetornado.id,
                    nome: usuarioRetornado.nome,
                    usuario: usuarioRetornado.usuario,
                    tipoUsuario: usuarioLogin.tipoUsuario,
                    foto: usuarioRetornado.foto,
                    produto: usuarioRetornado.produto
                }));
            });
            
            ToastAlerta('Login realizado com sucesso!', 'success');
            
            setTimeout(() => {
                if (usuarioLogin.tipoUsuario === "MOTORISTA") {
                    navigate("/home");
                } else {
                    navigate("/home");
                }
            }, 100);
            
        } catch (error: any) {
            ToastAlerta('Os dados do usuário estão inconsistentes!', 'error');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            tipoUsuario: "",
            senha: "",
            foto: "",
            token: ""
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