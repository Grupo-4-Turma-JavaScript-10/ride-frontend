import { Navigate } from "react-router-dom"
import { useContext, type JSX } from "react"
import { AuthContext } from "../contexts/AuthContext"


interface ProtectedRouteProps {
    children: JSX.Element
    tipoPermitido: "MOTORISTA" | "PASSAGEIRO"
}

export function ProtectedRoute({ children, tipoPermitido }: ProtectedRouteProps) {

    const { isAuthenticated, usuario } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (usuario.tipoUsuario !== tipoPermitido) {
        return <Navigate to="/login" />
    }

    return children
}