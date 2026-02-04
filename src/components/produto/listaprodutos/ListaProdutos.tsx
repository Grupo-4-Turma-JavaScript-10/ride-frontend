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

  const header = useMemo(
    () => ({
      headers: {
        Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
      },
    }),
    [token]
  );

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "error");
      navigate("/login");
      return;
    }

    const carregarDados = async () => {
      try {
        setLoading(true);

        const categoriasTemp: Categoria[] = [];
        await buscar("/categorias", (res: Categoria[]) => categoriasTemp.push(...res), header);
        setCategorias(categoriasTemp);

        const produtosTemp: Produto[] = [];
        await buscar("/produtos", (res: Produto[]) => produtosTemp.push(...res), header);

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
          setErro("Erro ao carregar caronas");
        }
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [token]);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Caronas
            </h1>
            <p className="text-gray-500 mt-1">
              Encontre ou cadastre uma nova carona
            </p>
          </div>

          <Link
            to="/cadastrarproduto"
            className="
              inline-flex items-center justify-center gap-2
              px-7 py-3 rounded-full
              bg-linear-to-br from-yellow-200 via-pink-200 to-pink-400
              text-gray-800 font-semibold
              shadow-md hover:shadow-xl
              hover:scale-105 transition-all
            "
          >
            + Nova Carona
          </Link>
        </header>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 rounded-full border-4 border-pink-300 border-t-transparent" />
          </div>
        )}

        {erro && (
          <p className="text-center text-red-600 font-medium py-10">
            {erro}
          </p>
        )}

        {!loading && produtos.length === 0 && !erro && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Nenhuma carona cadastrada ainda 🚗
            </p>
            <p className="text-gray-400 mt-2">
              Que tal criar a primeira?
            </p>
          </div>
        )}

        {!loading && produtos.length > 0 && (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListaProdutos;
