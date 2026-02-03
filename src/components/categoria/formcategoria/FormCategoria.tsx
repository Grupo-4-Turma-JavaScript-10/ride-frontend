import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";

function FormCategoria() {

    const navigate = useNavigate();
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token || localStorage.getItem('token') || "";

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            const header = {
                headers: { 
                    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
                }
            };
            
            await buscar(`/categorias/${id}`, setCategoria, header);
        } catch (error: any) {
            if (error.toString().includes('401') || error.response?.status === 401) {
                ToastAlerta('Sessão expirada. Faça login novamente.', 'error');
                handleLogout();
            } else {
                ToastAlerta('Erro ao carregar veículo.', 'error');
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'error');
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (id !== undefined && token !== '') {
            buscarPorId(id);
        }
    }, [id, token]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate('/categorias');
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const header = {
            headers: { 
                Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
            }
        };

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, header);
                ToastAlerta('O veículo foi atualizado com sucesso!', 'success');
                retornar();
            } catch (error: any) {
                if (error.toString().includes('401') || error.response?.status === 401) {
                    ToastAlerta('Sessão expirada. Faça login novamente.', 'error');
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o veículo.', 'error');
                }
            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, header);
                ToastAlerta('O veículo foi cadastrado com sucesso!', 'success');
                retornar();
            } catch (error: any) {
                if (error.toString().includes('401') || error.response?.status === 401) {
                    ToastAlerta('Sessão expirada. Faça login novamente.', 'error');
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o veículo!', 'error');
                }
            }
        }

        setIsLoading(false);
    }

return (
  <div className="flex justify-center py-16 bg-linear-to-b from-gray-100 via-gray-200 to-gray-300 min-h-screen">
    <div
      className="
        w-full max-w-4xl
        rounded-3xl
        shadow-2xl
        p-12
        bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300
        animate-fadeInUp
        border border-gray-100
        backdrop-blur-sm
      "
    >
      <form onSubmit={gerarNovaCategoria}>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center animate-fadeInUp delay-100">
          {id ? "Editar Veículo" : "Adicionar Novo Veículo"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: "Carro", name: "carro", delay: 100 },
            { label: "Fabricante", name: "fabricante", delay: 200 },
            { label: "Modelo", name: "modelo", delay: 300 },
            { label: "Ano", name: "ano", delay: 400 },
            { label: "Cor", name: "cor", delay: 500 },
            { label: "Placa", name: "placa", delay: 600 },
          ].map((field) => (
            <div
              key={field.name}
              className={`animate-fadeInUp delay-${field.delay}`}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={categoria[field.name] || ""}
                onChange={atualizarEstado}
                placeholder={`Digite o ${field.label.toLowerCase()}`}
                className="
                  w-full
                  rounded-3xl
                  border border-gray-300
                  bg-white/60 backdrop-blur-sm
                  p-4
                  focus:ring-2 focus:ring-pink-300 focus:border-pink-300
                  outline-none
                  shadow-md
                  transition-all duration-300
                  placeholder-gray-400
                  hover:shadow-lg
                "
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-6 mt-12">
          <button
            type="button"
            onClick={retornar}
            className="
              px-10 py-3
              rounded-full
              bg-white
              text-gray-700
              font-medium
              shadow-md
              hover:bg-gray-100
              hover:shadow-lg
              transition-all duration-300
              transform hover:scale-105
            "
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="
              px-10 py-3
              rounded-full
              bg-pink-500
              text-white
              font-semibold
              shadow-lg
              hover:bg-pink-600
              hover:shadow-xl
              transition-all duration-300
              transform hover:scale-105
              disabled:bg-gray-400 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              id ? "Atualizar" : "Cadastrar"
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
);


}

export default FormCategoria;