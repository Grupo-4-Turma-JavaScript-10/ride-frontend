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
  <div className="flex justify-center items-start py-16 bg-linear-to-b from-pink-50 via-purple-50 to-blue-50 min-h-screen">
    <div
      className="
        w-full max-w-4xl
        rounded-3xl
        shadow-2xl
        p-12
        bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300/80
        backdrop-blur-sm
        border border-pink-100
        animate-fadeInUp
      "
    >
      <form onSubmit={gerarNovaCategoria}>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center animate-fadeInUp delay-100">
          {id ? "Editar Veículo" : "Adicionar Novo Veículo"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fadeInUp delay-100">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Carro
            </label>
            <input
              type="text"
              name="carro"
              value={categoria.carro || ""}
              onChange={atualizarEstado}
              placeholder="Digite o carro"
              className="
                w-full
                rounded-3xl
                border border-pink-300
                bg-white/60
                backdrop-blur-sm
                p-4
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                outline-none
                shadow-md
                transition-all duration-300
                placeholder-gray-500
                hover:shadow-lg
              "
            />
          </div>

          <div className="animate-fadeInUp delay-200">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Fabricante
            </label>
            <input
              type="text"
              name="fabricante"
              value={categoria.fabricante || ""}
              onChange={atualizarEstado}
              placeholder="Digite o fabricante"
              className="
                w-full
                rounded-3xl
                border border-pink-300
                bg-white/60
                backdrop-blur-sm
                p-4
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                outline-none
                shadow-md
                transition-all duration-300
                placeholder-gray-500
                hover:shadow-lg
              "
            />
          </div>

          <div className="animate-fadeInUp delay-300">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Modelo
            </label>
            <input
              type="text"
              name="modelo"
              value={categoria.modelo || ""}
              onChange={atualizarEstado}
              placeholder="Digite o modelo"
              className="
                w-full
                rounded-3xl
                border border-pink-300
                bg-white/60
                backdrop-blur-sm
                p-4
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                outline-none
                shadow-md
                transition-all duration-300
                placeholder-gray-500
                hover:shadow-lg
              "
            />
          </div>

          <div className="animate-fadeInUp delay-400">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Ano
            </label>
            <input
              type="text"
              name="ano"
              value={categoria.ano || ""}
              onChange={atualizarEstado}
              placeholder="Digite o ano"
              className="
                w-full
                rounded-3xl
                border border-pink-300
                bg-white/60
                backdrop-blur-sm
                p-4
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                outline-none
                shadow-md
                transition-all duration-300
                placeholder-gray-500
                hover:shadow-lg
              "
            />
          </div>

          <div className="animate-fadeInUp delay-500">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Cor
            </label>
            <input
              type="text"
              name="cor"
              value={categoria.cor || ""}
              onChange={atualizarEstado}
              placeholder="Digite a cor"
              className="
                w-full
                rounded-3xl
                border border-pink-300
                bg-white/60
                backdrop-blur-sm
                p-4
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                outline-none
                shadow-md
                transition-all duration-300
                placeholder-gray-500
                hover:shadow-lg
              "
            />
          </div>

          <div className="animate-fadeInUp delay-600">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Placa
            </label>
            <input
              type="text"
              name="placa"
              value={categoria.placa || ""}
              onChange={atualizarEstado}
              placeholder="Digite a placa"
              className="
                w-full
                rounded-3xl
                border border-pink-300
                bg-white/60
                backdrop-blur-sm
                p-4
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                outline-none
                shadow-md
                transition-all duration-300
                placeholder-gray-500
                hover:shadow-lg
              "
            />
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-12">
          <button
            type="button"
            onClick={retornar}
            className="
              px-10 py-3
              rounded-full
              bg-white
              text-gray-800
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
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : id ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  </div>
);



}

export default FormCategoria;