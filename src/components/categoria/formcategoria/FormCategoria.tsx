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

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'error')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate('/categorias')
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                ToastAlerta('O veículo foi atualizado com sucesso!', 'success')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o veículo.', 'error')
                }
            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                ToastAlerta('O veículo foi cadastrado com sucesso!', 'success')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o veículo!', 'error')
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
            <div
                className="
          w-full max-w-4xl
          rounded-3xl
          shadow-2xl
          p-10
          bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300
          animate-fadeInUp
        "
            >
                <form onSubmit={gerarNovaCategoria}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-10 animate-fadeInUp delay-100">
                        {id ? "Editar Veículo" : "Adicionar Novo Veículo"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="animate-fadeInUp delay-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Carro
                            </label>
                            <input
                                type="text"
                                name="carro"
                                value={categoria.carro || ''}
                                onChange={atualizarEstado}
                                className="w-full rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition"
                            />
                        </div>

                        <div className="animate-fadeInUp delay-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fabricante
                            </label>
                            <input
                                type="text"
                                name="fabricante"
                                value={categoria.fabricante || ''}
                                onChange={atualizarEstado}
                                className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
                            />
                        </div>

                        <div className="animate-fadeInUp delay-300">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Modelo
                            </label>
                            <input
                                type="text"
                                name="modelo"
                                value={categoria.modelo || ''}
                                onChange={atualizarEstado}
                                className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
                            />
                        </div>

                        <div className="animate-fadeInUp delay-400">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ano
                            </label>
                            <input
                                type="text"
                                name="ano"
                                value={categoria.ano || ''}
                                onChange={atualizarEstado}
                                className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
                            />
                        </div>

                        <div className="animate-fadeInUp delay-500">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cor
                            </label>
                            <input
                                type="text"
                                name="cor"
                                value={categoria.cor || ''}
                                onChange={atualizarEstado}
                                className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
                            />
                        </div>

                        <div className="animate-fadeInUp delay-600">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Placa
                            </label>
                            <input
                                type="text"
                                name="placa"
                                value={categoria.placa || ''}
                                onChange={atualizarEstado}
                                className="w-full rounded-xl border border-gray-300 bg-white/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-5 mt-12">
                        <button
                            type="button"
                            onClick={retornar}
                            className="
              px-8 py-3
              rounded-full
              bg-white
              text-gray-700
              font-medium
              shadow-md
              hover:bg-gray-100
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
    px-8 py-3
    rounded-full
    bg-pink-400
    text-white
    font-semibold
    shadow-lg
    hover:bg-pink-500
    transition-all duration-300
    transform hover:scale-105
    disabled:bg-gray-400 disabled:cursor-not-allowed
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
