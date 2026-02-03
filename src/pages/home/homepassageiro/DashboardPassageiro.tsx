import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserIcon, CarIcon, GearIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function DashboardPassageiro() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <div className="p-8">Carregando usuário...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        {usuario.foto ? (
          <img
            src={usuario.foto}
            alt={usuario.nome}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon size={32} className="text-gray-500" />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {usuario.nome}
          </h1>
          <p className="text-gray-500">Painel do Passageiro</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-2">Nome</p>
          <p className="text-xl font-semibold text-gray-800">{usuario.nome}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-2">Email</p>
          <p className="text-gray-800 break-all">{usuario.usuario}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center">
          {usuario.foto && (
            <img
              src={usuario.foto}
              alt={usuario.nome}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ações rápidas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/perfil"
            className="bg-black text-white rounded-xl p-6 flex items-center gap-4 hover:bg-gray-800 transition"
          >
            <UserIcon size={28} />
            <span>Acessar Perfil</span>
          </Link>

          <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow">
            <CarIcon size={28} className="text-gray-700" />
            <span className="text-gray-700">Minhas Viagens</span>
          </div>

          <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow">
            <GearIcon size={28} className="text-gray-700" />
            <span className="text-gray-700">Configurações</span>
          </div>
        </div>
      </div>
    </div>
  );
}
