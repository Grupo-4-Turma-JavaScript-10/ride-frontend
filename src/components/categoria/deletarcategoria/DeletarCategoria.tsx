import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import { ToastAlerta } from "../../../util/ToastAlerta"
import { deletar, buscar } from "../../../services/Service"
import { AuthContext } from "../../../contexts/AuthContext"
import { ClipLoader } from "react-spinners"
import { Check } from "lucide-react"

function DeletarCategoria() {

  const navigate = useNavigate()

  const [confirmado, setConfirmado] = useState(false)
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
 const token = usuario?.token ?? ""


  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "error")
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarCategoria() {
    setIsLoading(true)

    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: token }
      })

      setConfirmado(true)
      ToastAlerta("Veículo apagado com sucesso!", "success")

      setTimeout(() => {
        navigate("/categorias")
      }, 1800)

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

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className="relative flex justify-center items-center py-10 bg-gray-100 min-h-screen overflow-hidden">

      {confirmado && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/20 transition-all duration-500 animate-fadeInOverlay"></div>
      )}

      <div className={`
        relative z-10
        w-full max-w-3xl
        rounded-3xl shadow-2xl p-10
        transition-all duration-500
        ${confirmado
          ? "bg-green-400 scale-105 animate-float animate-glow"
          : "bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300"}
        animate-fadeInUp
      `}>

        {!confirmado ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              Deletar Veículo
            </h2>

            <div className="bg-white/80 rounded-2xl p-8 shadow-md">
              <p className="text-lg text-gray-800 mb-6">
                Você tem certeza que deseja excluir o veículo:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                <div>
                  <p className="text-sm text-gray-600">Carro:</p>
                  <p className="font-semibold">{categoria.carro}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Modelo:</p>
                  <p className="font-semibold">{categoria.modelo}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Placa:</p>
                  <p className="font-semibold">{categoria.placa}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-5 mt-12">
              <button
                onClick={retornar}
                className="px-8 py-3 rounded-full bg-white text-gray-700 font-medium shadow-md hover:bg-gray-100 transition-all duration-300"
              >
                Cancelar
              </button>

              <button
                onClick={deletarCategoria}
                disabled={isLoading}
                className="px-8 py-3 rounded-full bg-pink-400 text-white font-semibold shadow-lg hover:bg-red-500 transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Confirmar Exclusão"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white animate-successFade">
            <div className="animate-bounceIn">
              <Check size={90} />
            </div>
            <h3 className="text-3xl font-bold mt-6">
              Veículo Excluído!
            </h3>
            <p className="mt-2 opacity-90">
              Redirecionando...
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }

        @keyframes successFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fadeInOverlay {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 40px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 0 80px rgba(0,0,0,0.35); }
          100% { box-shadow: 0 0 40px rgba(0,0,0,0.2); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }

        .animate-bounceIn {
          animation: bounceIn 0.6s ease forwards;
        }

        .animate-successFade {
          animation: successFade 0.5s ease forwards;
        }

        .animate-fadeInOverlay {
          animation: fadeInOverlay 0.4s ease forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glowPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default DeletarCategoria
