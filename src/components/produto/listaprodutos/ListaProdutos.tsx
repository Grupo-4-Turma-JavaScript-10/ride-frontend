import { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { AuthContext } from "../../../contexts/AuthContext";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const header = useMemo(() => ({
    headers: {
      Authorization: token,
    },
  }), [token]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        await buscar("/produtos", setProdutos, header);
        setErro(null);
      } catch {
        setErro("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [header]);

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Produtos</h1>
        <Link
          to="/cadastrarproduto"
          className="
            px-6 py-2 rounded-full
            bg-linear-to-br from-yellow-200 via-pink-200 to-pink-400
            text-gray-800 font-semibold
            shadow-lg hover:scale-105 transition transform
          "
        >
          + Novo Produto
        </Link>
      </div>

      {loading && <p className="text-center text-gray-600">Carregando produtos...</p>}
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
