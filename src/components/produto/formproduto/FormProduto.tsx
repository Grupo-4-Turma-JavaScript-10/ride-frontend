import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";

function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || localStorage.getItem("token") || "";

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    titulo: "",
    descricao: "",
    preco: 0,
    origem: "",
    destino: "",
    distanciaKm: 0,
    tempoMinutos: 0,
    velocidadeMediaKmh: 0,
    ativo: true,
    data: "",
    motoristaMesmoGenero: false,
    categoria: {} as Categoria,
    usuario: {} as any,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const header = {
    headers: {
      Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    buscar("/categorias", setCategorias, header).catch((error: any) => {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "error");
        handleLogout();
      } else {
        ToastAlerta("Erro ao carregar categorias.", "error");
      }
    });

    if (id) {
      buscar(`/produtos/${id}`, setProduto, header).catch((error: any) => {
        if (error.toString().includes("401") || error.response?.status === 401) {
          ToastAlerta("Sessão expirada. Faça login novamente.", "error");
          handleLogout();
        } else {
          ToastAlerta("Erro ao carregar produto.", "error");
        }
      });
    }
  }, [token, id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const novoValor = type === "number" ? Number(value) : value;

    setProduto((prev) => {
      const updated = { ...prev, [name]: novoValor };
      if (updated.distanciaKm > 0 && updated.velocidadeMediaKmh > 0) {
        updated.tempoMinutos = Math.round((updated.distanciaKm / updated.velocidadeMediaKmh) * 60);
      } else {
        updated.tempoMinutos = 0;
      }
      return updated;
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const produtoEnvio = {
      ...produto,
      data: new Date(produto.data).toISOString(),
      categoria: { id: produto.categoria.id },
      usuario: { id: usuario.id },
    };

    try {
      if (id) {
        await atualizar("/produtos", produtoEnvio, setProduto, header);
        ToastAlerta("Carona atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar("/produtos", produtoEnvio, setProduto, header);
        ToastAlerta("Carona cadastrada com sucesso!", "sucesso");
      }
      navigate("/produtos");
    } catch (error: any) {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "error");
        handleLogout();
      } else {
        ToastAlerta("Erro ao salvar carona.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <button
            onClick={retornar}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-4 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Voltar</span>
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {id ? "Editar Carona" : "Nova Carona"}
          </h1>
          <p className="text-gray-600 mt-2">
            {id ? "Atualize as informações da sua carona" : "Preencha os dados para cadastrar uma nova carona"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={salvar} className="p-8">
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                Informações Básicas
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título da Carona
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={produto.titulo}
                    onChange={atualizarEstado}
                    placeholder="Ex: Centro para Universidade"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    value={produto.descricao}
                    onChange={atualizarEstado}
                    placeholder="Descreva detalhes sobre a carona..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valor (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R$</span>
                    <input
                      type="number"
                      name="preco"
                      value={produto.preco}
                      onChange={atualizarEstado}
                      placeholder="0,00"
                      step="0.01"
                      min="0"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data e Horário
                  </label>
                  <input
                    type="datetime-local"
                    name="data"
                    value={produto.data}
                    onChange={atualizarEstado}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                Informações da Rota
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Origem
                  </label>
                  <input
                    type="text"
                    name="origem"
                    value={produto.origem}
                    onChange={atualizarEstado}
                    placeholder="Endereço de partida"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destino
                  </label>
                  <input
                    type="text"
                    name="destino"
                    value={produto.destino}
                    onChange={atualizarEstado}
                    placeholder="Endereço de chegada"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Distância (km)
                  </label>
                  <input
                    type="number"
                    name="distanciaKm"
                    value={produto.distanciaKm}
                    onChange={atualizarEstado}
                    placeholder="0"
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Velocidade Média (km/h)
                  </label>
                  <input
                    type="number"
                    name="velocidadeMediaKmh"
                    value={produto.velocidadeMediaKmh}
                    onChange={atualizarEstado}
                    placeholder="0"
                    step="1"
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 shadow-lg">
                    <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tempo Estimado de Viagem
                    </label>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white border-opacity-30">
                      <div className="text-5xl font-bold text-black text-center">
                        {produto.tempoMinutos > 0 ? (
                          <>
                            {produto.tempoMinutos} <span className="text-2xl font-medium">min</span>
                          </>
                        ) : (
                          <span className="text-2xl text-black text-opacity-70">-- min</span>
                        )}
                      </div>
                      <p className="text-center text-white text-opacity-90 text-sm mt-2">
                        Calculado automaticamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                Veículo e Preferências
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Veículo
                  </label>
                  <select
                    value={produto.categoria?.id || ""}
                    onChange={(e) =>
                      setProduto({
                        ...produto,
                        categoria: { id: Number(e.target.value) } as Categoria,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecione o veículo</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.fabricante} - {cat.modelo} - {cat.ano} - {cat.cor} - {cat.placa}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={produto.motoristaMesmoGenero}
                      onChange={(e) =>
                        setProduto({
                          ...produto,
                          motoristaMesmoGenero: e.target.checked,
                        })
                      }
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-400 focus:ring-offset-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-gray-800 font-semibold block group-hover:text-pink-600 transition-colors">
                        Prefiro motorista do mesmo gênero
                      </span>
                      <span className="text-sm text-gray-600 mt-1 block">
                        Marque esta opção se preferir viajar com motorista do mesmo gênero
                      </span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Observações Adicionais
                  </label>
                  <textarea
                    name="observacoes"
                    placeholder="Informações extras sobre a carona (opcional)..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={retornar}
                className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-10 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <ClipLoader color="#fff" size={20} />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <span>{id ? "Atualizar Carona" : "Cadastrar Carona"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormProduto;