import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PerfilUsuario from '../../components/usuario/perfil/PerfilUsuario';
import CorridasUsuario from '../../components/usuario/corrida/CorridaUsuario';
import { AuthContext } from '../../contexts/AuthContext';
import type Usuario from '../../models/Usuario';
import { atualizar } from '../../services/Service';

function PerfilPage() {
  const navigate = useNavigate();
  const { usuario: usuarioAuth, isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const usuario: Usuario = {
    id: usuarioAuth.id,
    nome: usuarioAuth.nome,
    usuario: usuarioAuth.usuario,
    senha: usuarioAuth.senha,
    foto: usuarioAuth.foto,
    sexo: '',
    data: '',
    tipoUsuario: usuarioAuth.tipoUsuario as "MOTORISTA" | "PASSAGEIRO",
    produto: []
  };

  const token = localStorage.getItem('token');
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const handleUpdateUsuario = async (usuarioAtualizado: Usuario) => {
    try {
      await atualizar('/usuarios/atualizar', usuarioAtualizado, () => {});
    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
    }
  };

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