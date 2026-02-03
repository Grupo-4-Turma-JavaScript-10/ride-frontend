import { useEffect, useState, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const header = useMemo(() => ({
    headers: { Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}` }
  }), [token]);

  // Carrega categorias e produtos
  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
      return;
    }

    const carregarDados = async () => {
      try {
        setLoading(true);

        // 1️⃣ Buscar categorias
        const categoriasTemp: Categoria[] = [];
        await buscar("/categorias", (res: Categoria[]) => categoriasTemp.push(...res), header);
        setCategorias(categoriasTemp);

        // 2️⃣ Buscar produtos
        const produtosTemp: Produto[] = [];
        await buscar("/produtos", (res: Produto[]) => produtosTemp.push(...res), header);

        // 3️⃣ Associar categoria completa a cada produto
        const produtosComCategoria = produtosTemp.map(prod => {
          const categoriaCompleta = categoriasTemp.find(cat => cat.id === prod.categoria?.id);
          return {
            ...prod,
            categoria: categoriaCompleta || prod.categoria || {},
          };
        });

        setProdutos(produtosComCategoria);
        setErro(null);
      } catch (error: any) {
        console.error(error);
        if (error.toString().includes("401") || error.response?.status === 401) {
          ToastAlerta("Sessão expirada. Faça login novamente.", "error");
          handleLogout();
        } else {
          setErro("Erro ao carregar produtos");
        }
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [token]);

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Caronas</h1>
        <Link
          to="/cadastrarproduto"
          className="
            px-6 py-2 rounded-full
            bg-linear-to-br from-yellow-200 via-pink-200 to-pink-400
            text-gray-800 font-semibold
            shadow-lg hover:scale-105 transition transform
          "
        >
          + Nova Carona
        </Link>
      </div>

      {loading && <p className="text-center text-gray-600">Carregando Caronas...</p>}
      {erro && <p className="text-center text-red-600">{erro}</p>}
      {!loading && produtos.length === 0 && !erro && (
        <p className="text-center text-gray-600">Nenhum produto cadastrado ainda.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {!loading &&
          produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
      </div>
    </div>
  );
}

export default ListaProdutos;