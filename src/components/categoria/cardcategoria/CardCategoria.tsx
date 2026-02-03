import { useState, useContext, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import { ToastAlerta } from "../../../util/ToastAlerta"
import { deletar, buscar } from "../../../services/Service"
import { AuthContext } from "../../../contexts/AuthContext"
import { ClipLoader } from "react-spinners"
import { Check } from "lucide-react"

function DeletarCategoria() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario?.token ?? ""

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [confirmado, setConfirmado] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const buscarPorId = useCallback(async () => {
    if (!id) return

    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    }
  }, [id, token, handleLogout])

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "error")
      navigate("/")
      return
    }

    buscarPorId()
  }, [token, buscarPorId, navigate])

 async function deletarCategoria() {
  if (!id) return

  setIsLoading(true)

  try {
    await deletar(`/categorias/${id}`, {
      headers: { Authorization: token }
    })

      setConfirmado(true)
      ToastAlerta("Veículo apagado com sucesso!", "success")

      setTimeout(() => navigate("/categorias"), 1800)
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao deletar o veículo!", "error")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex justify-center items-center py-10 bg-gray-100 min-h-screen overflow-hidden">

      {confirmado && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/20 animate-fadeInOverlay" />
      )}

      <div
        className={`
          relative z-10 w-full max-w-3xl p-10 rounded-3xl shadow-2xl
          transition-all duration-500 animate-fadeInUp
          ${confirmado
            ? "bg-green-400 scale-105 animate-float animate-glow"
            : "bg-gradient-custom"}
        `}
      >
        {!confirmado ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              Deletar Veículo
            </h2>

            <div className="bg-white/80 rounded-2xl p-8 shadow-md">
              <p className="text-lg text-gray-800 mb-6">
                Você tem certeza que deseja excluir o veículo:
              </p>

              <div className="grid md:grid-cols-2 gap-6 text-gray-800">
                <div>
                  <span className="text-sm text-gray-600">Carro</span>
                  <p className="font-semibold">{categoria.carro}</p>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Modelo</span>
                  <p className="font-semibold">{categoria.modelo}</p>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Placa</span>
                  <p className="font-semibold">{categoria.placa}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-5 mt-12">
              <button
                onClick={() => navigate("/categorias")}
                className="px-8 py-3 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition"
              >
                Cancelar
              </button>

       <button
  onClick={deletarCategoria}
  disabled={isLoading}
  className={`
    px-8 py-3 rounded-full text-white font-semibold shadow-lg transition
    ${isLoading 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-pink-400 hover:bg-red-500 hover:scale-105"}
  `}
>
  {isLoading 
    ? <ClipLoader size={20} color="#fff" /> 
    : "Confirmar Exclusão"}
</button>

            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-20 text-white animate-successFade">
            <Check size={90} />
            <h3 className="text-3xl font-bold mt-6">Veículo Excluído!</h3>
            <p className="opacity-90 mt-2">Redirecionando...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeletarCategoria
