import { 
  useEffect, 
  useState, 
  type ChangeEvent, 
  type FormEvent 
} from "react";

import { Link, useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../util/ToastAlerta";

export default function Cadastro() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmaSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    sexo: '',
    data: '',
    tipoUsuario: 'CLIENTE' 
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      navigate('/login');
    }
  }, [usuario.id, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', 'success');
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', 'error');
      } finally {
        setIsLoading(false);
      }

    } else {
      ToastAlerta(
        'Dados inconsistentes! Verifique as informações.',
        'error'
      );
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">

      <div className="absolute inset-0 bg-linear-to-br from-yellow-50 via-white to-rose-50" />
      <div className="absolute w-150 h-150 bg-yellow-200/20 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-150 h-150 bg-pink-200/20 rounded-full blur-3xl -bottom-40 -right-40" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-lg p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 tracking-tight">
          Criar conta
        </h2>

        <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4">

          <input
            name="nome"
            value={usuario.nome}
            onChange={atualizarEstado}
            placeholder="Nome completo"
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md"
          />

          <input
            type="email"
            name="usuario"
            value={usuario.usuario}
            onChange={atualizarEstado}
            placeholder="Email"
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md"
          />

          <input
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={atualizarEstado}
            placeholder="Senha"
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md"
          />

          <input
            type="password"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            placeholder="Confirmar senha"
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md"
          />

          <select
            name="sexo"
            value={usuario.sexo}
            onChange={(e) =>
              setUsuario({ ...usuario, sexo: e.target.value })
            }
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md"
          >
            <option value="">Sexo</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 py-3 rounded-lg font-medium text-gray-900 bg-linear-to-r from-yellow-200 via-pink-200 to-rose-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-800 hover:underline"
          >
            Entrar
          </Link>
        </p>

      </div>
    </div>
  );
}
