import type Categoria from "../../../models/Categoria";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import CardCategoria from "../cardcategoria/CardCategoria";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

function ListaCategorias() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/");
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

      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <SyncLoader color="#ec4899" size={12} />
        </div>
      )}

      {!isLoading && (
        <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center">
          <div className="w-full max-w-5xl">

            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-bold text-gray-800">
                Perfis de Veículo
              </h1>

              <button
                className="
                  px-5 py-2.5
                  rounded-xl
                  bg-linear-to-r from-pink-300 to-pink-400
                  hover:from-pink-400 hover:to-pink-500
                  text-white font-medium
                  shadow-md
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg
                "
              >
                + Novo Veículo
              </button>
            </div>

            <div className="space-y-4">
              {categorias.length === 0 && (
                <span className="text-lg text-gray-600 block text-center my-8">
                  Nenhum veículo foi encontrado!
                </span>
              )}

              {categorias.map((categoria) => (
                <CardCategoria
                  key={categoria.id}
                  categoria={categoria}
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
