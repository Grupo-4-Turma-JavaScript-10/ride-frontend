import type Categoria from "../../../models/Categoria";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import CardCategoria from "../cardcategoria/CardCategoria";
import { useNavigate } from "react-router-dom";

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-pink-200 rounded-full"></div>
          <div className="w-12 h-12 border-4 border-pink-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>
        <span className="text-gray-600 font-medium">Carregando veículos...</span>
      </div>
    </div>
  );
}

function ListaCategorias() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  
  const token = usuario?.token || localStorage.getItem('token') || "";

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      buscarCategorias();
    }
  }, [token]);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      
      const header = {
        headers: { 
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
        }
      };
      
      await buscar("/categorias", setCategorias, header);
      
    } catch (error: any) {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "error");
        handleLogout();
      } else {
        ToastAlerta("Erro ao carregar veículos. Tente novamente.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

 return (
  <>
    {isLoading && <LoadingSpinner />}

    {!isLoading && (
      <div className="min-h-screen bg-gray-100 py-16 px-6 flex justify-center">
        <div className="w-full max-w-5xl">

          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Perfis de Veículo
            </h1>
            <button
              onClick={() => navigate("/cadastrarcategoria")}
              className="
                px-6 py-3
                rounded-2xl
                bg-linear-to-br from-pink-300 to-pink-400
                hover:from-pink-400 hover:to-pink-500
                text-white font-semibold
                shadow-lg
                transition-all duration-300
                hover:scale-105 hover:shadow-xl
              "
            >
              + Novo Veículo
            </button>
          </div>

          <div className="space-y-5">
            {categorias.length === 0 && (
              <div className="text-center my-12">
                <span className="text-lg text-gray-600 block mb-3">
                  Nenhum veículo foi encontrado!
                </span>
                <button
                  onClick={buscarCategorias}
                  className="text-pink-500 hover:text-pink-600 underline font-medium transition-colors duration-200"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {categorias.map((categoria) => (
              <CardCategoria
                key={categoria.id}
                categoria={categoria}
                className="transition-transform duration-300 hover:scale-102 hover:shadow-lg"
              />
            ))}
          </div>

        </div>
      </div>
    )}
  </>
);

}

export default ListaCategorias;