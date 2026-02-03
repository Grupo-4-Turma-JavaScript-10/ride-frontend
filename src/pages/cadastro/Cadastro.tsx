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

const GENEROS = [
  "Feminino",
  "Masculino",
  "Não binário",
  "Outro",
  "Gênero fluido",
  "Agênero",
  "Bigênero",
  "Transgênero",
  "Intergênero"
];

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
    tipoUsuario: 'PASSAGEIRO'
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      navigate('/login');
    }
  }, [usuario.id, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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

    // Validações
    if (!usuario.nome.trim()) {
      ToastAlerta('Nome é obrigatório!', 'error');
      return;
    }

    if (!usuario.usuario.trim()) {
      ToastAlerta('Email é obrigatório!', 'error');
      return;
    }

    if (!usuario.senha || usuario.senha.length < 8) {
      ToastAlerta('A senha deve ter no mínimo 8 caracteres!', 'error');
      return;
    }

    if (confirmarSenha !== usuario.senha) {
      ToastAlerta('As senhas não coincidem!', 'error');
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
      return;
    }

    if (!usuario.sexo) {
      ToastAlerta('Selecione o gênero!', 'error');
      return;
    }

    if (!usuario.tipoUsuario) {
      ToastAlerta('Selecione o tipo de usuário!', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Preparar dados para envio
      const dadosCadastro = {
        nome: usuario.nome.trim(),
        usuario: usuario.usuario.trim(),
        senha: usuario.senha,
        foto: usuario.foto || '',
        sexo: usuario.sexo,
        data: usuario.data || new Date().toISOString().split('T')[0],
        tipoUsuario: usuario.tipoUsuario
      };

      await cadastrarUsuario(`/usuarios/cadastrar`, dadosCadastro, setUsuario);
      ToastAlerta('Usuário cadastrado com sucesso!', 'success');
      
      // Limpar formulário
      setUsuario({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        sexo: '',
        data: '',
        tipoUsuario: 'PASSAGEIRO'
      });
      setConfirmaSenha('');

    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar o usuário!';
      
      if (Array.isArray(mensagemErro)) {
        mensagemErro.forEach(msg => ToastAlerta(msg, 'error'));
      } else {
        ToastAlerta(mensagemErro, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-rose-50" />
      <div className="absolute w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-3xl -bottom-40 -right-40" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-lg p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 tracking-tight">
          Criar conta
        </h2>

        <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4">

          {/* Toggle entre Cliente e Motorista */}
          <div className="flex gap-2 bg-stone-100/80 p-1 rounded-xl backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setUsuario({ ...usuario, tipoUsuario: 'PASSAGEIRO' })}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                usuario.tipoUsuario === "PASSAGEIRO"
                  ? "bg-white shadow text-gray-900"
                  : "text-stone-500 hover:text-gray-800"
              }`}
            >
              Passageiro
            </button>

            <button
              type="button"
              onClick={() => setUsuario({ ...usuario, tipoUsuario: 'MOTORISTA' })}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                usuario.tipoUsuario === "MOTORISTA"
                  ? "bg-white shadow text-gray-900"
                  : "text-stone-500 hover:text-gray-800"
              }`}
            >
              Motorista
            </button>
          </div>

          <input
            name="nome"
            value={usuario.nome}
            onChange={atualizarEstado}
            placeholder="Nome completo"
            required
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          />

          <input
            type="email"
            name="usuario"
            value={usuario.usuario}
            onChange={atualizarEstado}
            placeholder="Email"
            required
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          />

          <input
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={atualizarEstado}
            placeholder="Senha (mínimo 8 caracteres)"
            required
            minLength={8}
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          />

          <input
            type="password"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            placeholder="Confirmar senha"
            required
            minLength={8}
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          />

          <select
            name="sexo"
            value={usuario.sexo}
            onChange={atualizarEstado}
            required
            className="px-4 py-3 rounded-lg bg-white/90 border border-stone-200 outline-none transition-all duration-300 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:shadow-md focus:-translate-y-0.5"
          >
            <option value="">Selecione o gênero</option>
            {GENEROS.map((genero) => (
              <option key={genero} value={genero}>{genero}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 py-3 rounded-lg font-medium text-gray-900 bg-gradient-to-r from-yellow-200 via-pink-200 to-rose-200 shadow-md transition-all duration-300 hover:from-amber-300 hover:via-orange-200 hover:to-rose-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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