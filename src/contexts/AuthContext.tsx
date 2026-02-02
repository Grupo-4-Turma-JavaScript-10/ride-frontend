import { createContext, useState, type ReactNode } from "react"
import { ToastAlerta } from "../util/ToastAlerta"
import { login } from "../services/Service"
import { useNavigate } from "react-router-dom"

export interface UsuarioLogin {
    id: number
    nome: string
    usuario: string
    tipoUsuario: "motorista" | "passageiro" | ""
    senha: string
    foto: string
    token: string
}

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
    isMotorista: boolean
    isPassageiro: boolean
    isAuthenticated: boolean
}

interface AuthProvidersProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProvidersProps) {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        tipoUsuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    const isMotorista = usuario.tipoUsuario === "motorista"
    const isPassageiro = usuario.tipoUsuario === "passageiro"
    const isAuthenticated = usuario.token !== ""

    async function handleLogin(usuarioLogin: UsuarioLogin) {

        if (!usuarioLogin.tipoUsuario) {
            ToastAlerta('Selecione se você é motorista ou passageiro!', 'error')
            return
        }

        setIsLoading(true)

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)

            ToastAlerta('Login realizado com sucesso!', 'success')

            if (usuarioLogin.tipoUsuario === "motorista") {
                navigate("/dashboard-motorista")
            } else {
                navigate("/dashboard-passageiro")
            }

        } catch (error) {
            ToastAlerta('Os dados do usuário estão inconsistentes!', 'error')
        }

        setIsLoading(false)
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
        })

        navigate("/login")
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
    )
}
