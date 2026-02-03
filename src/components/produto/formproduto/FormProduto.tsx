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

  // Header com Bearer
  const header = {
    headers: {
      Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
    },
  };

  // Verifica login ao montar
  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  // Carrega categorias e produto (se editar)
  useEffect(() => {
    if (!token) return;

    // Buscar categorias
    buscar("/categorias", setCategorias, header).catch((error: any) => {
      if (error.toString().includes("401") || error.response?.status === 401) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "error");
        handleLogout();
      } else {
        ToastAlerta("Erro ao carregar categorias.", "error");
      }
    });

    // Buscar produto se for edição
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

      // Calcula tempo automaticamente
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl rounded-[28px] p-8 shadow-xl bg-linear-to-r from-yellow-200 via-pink-200 to-pink-400">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? "Editar Carona" : "Cadastrar Nova Carona"}
        </h1>

        <form onSubmit={salvar} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Título */}
          <div className="md:col-span-2">
            <label className="text-gray-700 font-medium">Descrição da carona</label>
            <input
              type="text"
              name="titulo"
              value={produto.titulo || ""}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Preço */}
          <div>
            <label className="text-gray-700 font-medium">Valor</label>
            <input
              type="number"
              name="preco"
              value={produto.preco || 0}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Data */}
          <div>
            <label className="text-gray-700 font-medium">Data e horário</label>
            <input
              type="datetime-local"
              name="data"
              value={produto.data || ""}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Origem */}
          <div>
            <label className="text-gray-700 font-medium">Origem</label>
            <input
              type="text"
              name="origem"
              value={produto.origem || ""}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Destino */}
          <div>
            <label className="text-gray-700 font-medium">Destino</label>
            <input
              type="text"
              name="destino"
              value={produto.destino || ""}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Distância */}
          <div>
            <label className="text-gray-700 font-medium">Distância (km)</label>
            <input
              type="number"
              name="distanciaKm"
              value={produto.distanciaKm || 0}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Tempo */}
          <div>
            <label className="text-gray-700 font-medium">Tempo (min)</label>
            <input
              type="number"
              name="tempoMinutos"
              value={produto.tempoMinutos || 0}
              readOnly
              className="input-pastel bg-gray-100"
            />
          </div>

          {/* Velocidade */}
          <div>
            <label className="text-gray-700 font-medium">Velocidade média (km/h)</label>
            <input
              type="number"
              name="velocidadeMediaKmh"
              value={produto.velocidadeMediaKmh || 0}
              onChange={atualizarEstado}
              className="input-pastel"
              required
            />
          </div>

          {/* Observações */}
          <div className="md:col-span-2">
            <label className="text-gray-700 font-medium">Observações</label>
            <textarea
              name="descricao"
              value={produto.descricao || ""}
              onChange={atualizarEstado}
              className="input-pastel h-28 resize-none"
              required
            />
          </div>

          {/* Seleção de categoria */}
          <div className="md:col-span-2">
            <label className="text-gray-700 font-medium">Tipo de veículo</label>
            <select
              className="input-pastel"
              value={produto.categoria?.id || ""}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  categoria: { id: Number(e.target.value) } as Categoria,
                })
              }
              required
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.fabricante} - {cat.modelo} - {cat.ano} - {cat.cor} - {cat.placa}
                </option>
              ))}
            </select>
          </div>

          {/* Motorista do mesmo gênero */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={produto.motoristaMesmoGenero}
              onChange={(e) =>
                setProduto({ ...produto, motoristaMesmoGenero: e.target.checked })
              }
            />
            <label className="text-gray-700 font-medium">
              Prefiro motorista do mesmo gênero
            </label>
          </div>

          {/* Botões */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={retornar}
              className="px-8 py-3 rounded-full bg-white shadow hover:bg-gray-100 transition transform hover:scale-105"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-3 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? <ClipLoader color="#fff" size={20} /> : id ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default FormProduto;