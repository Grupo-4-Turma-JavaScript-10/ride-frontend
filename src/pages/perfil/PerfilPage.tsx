import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PerfilUsuario from '../../components/usuario/perfil/PerfilUsuario';
import CorridasUsuario from '../../components/usuario/corrida/CorridaUsuario';

import type Usuario from '../../models/Usuario';
import { buscar, atualizar } from '../../services/Service';

function PerfilPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const header = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    async function carregarUsuario() {
      try {
        await buscar('/usuarios/me', setUsuario, header);
      } catch (error) {
        console.error('Erro ao buscar usuário', error);
      } finally {
        setLoading(false);
      }
    }

    carregarUsuario();
  }, []);

  const handleUpdateUsuario = async (usuarioAtualizado: Usuario) => {
    try {
      await atualizar('/usuarios', usuarioAtualizado, setUsuario, header);
    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-600 text-lg">Carregando perfil...</span>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-600 text-lg">
          Não foi possível carregar o perfil
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        <PerfilUsuario
          usuario={usuario}
          onUpdate={handleUpdateUsuario}
        />
        
        <CorridasUsuario
          produtos={usuario.produto ?? []}
          tipoUsuario={usuario.tipoUsuario}
        />

      </div>

      <ToastContainer />
    </div>
  );
}

export default PerfilPage;
