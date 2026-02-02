import axios from "axios";

const api = axios.create({
  baseURL: "https://ride-backend-o0yt.onrender.com",
});

type Header = {
  headers: {
    Authorization: string;
  };
};

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Header
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Header
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: Function,
  header?: Header
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Header) => {
  await api.delete(url, header);
};

export const calcularTempo = async (
  produtoId: number,
  setTempo: Function,
  header: Header
) => {
  try {
    const resposta = await api.get(`/produtos/calculartempo/${produtoId}`, header);
    setTempo(resposta.data);
  } catch (erro) {
    console.error("Erro ao calcular tempo:", erro);
  }
};

export const mudarTipoViagem = async (
  produtoId: number,
  setDados: Function,
  header: Header
) => {
  try {
    const resposta = await api.get(`/produtos/mudarTipoViagem/${produtoId}`, header);
    setDados(resposta.data);
  } catch (erro) {
    console.error("Erro ao mudar tipo de viagem:", erro);
  }
};
