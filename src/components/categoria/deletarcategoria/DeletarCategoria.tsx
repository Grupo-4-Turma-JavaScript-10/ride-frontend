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
  const token = usuario?.token || localStorage.getItem('token') || "";

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      const header = {
        headers: { 
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
        }
      };
      
      await buscar(`/categorias/${id}`, setCategoria, header);
    } catch (error: any) {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta('Sessão expirada. Faça login novamente.', 'error');
        handleLogout();
      } else {
        ToastAlerta('Erro ao carregar veículo.', 'error');
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "error")
      navigate("/login")
    }
  }, [token, navigate])

  useEffect(() => {
    if (id !== undefined && token !== "") {
      buscarPorId(id)
    }
  }, [id, token])

  async function deletarCategoria() {
    setIsLoading(true)

    const header = {
      headers: { 
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
      }
    };

    try {
      await deletar(`/categorias/${id}`, header);

      setConfirmado(true)
      ToastAlerta("Veículo apagado com sucesso!", "success")

      setTimeout(() => {
        navigate("/categorias")
      }, 1800)

    } catch (error: any) {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta('Sessão expirada. Faça login novamente.', 'error');
        handleLogout();
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
                className="px-8 py-3 rounded-full bg-pink-400 text-white font-semibold shadow-lg hover:bg-red-500 transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
    </div>
  )
}

export default DeletarCategoria