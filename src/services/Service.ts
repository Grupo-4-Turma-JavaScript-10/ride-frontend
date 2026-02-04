import axios from "axios";

const api = axios.create({
  baseURL: "https://ride-backend-o0yt.onrender.com",
});

export const authHeader = (token: string) => ({
  headers: { Authorization: token }
});

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
  
  if (resposta.data.token) {
    localStorage.setItem('token', resposta.data.token);
  }
  
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados?: Function,
  header?: object
) => {
  const resposta = await api.get(url, header);
  
  if (setDados) {
    setDados(resposta.data);
  }
  
  return resposta.data;
};

export const deletar = async (url: string, header: object) => {
  await api.delete(url, header);
};

export const calcularTempo = async (
  produtoId: number,
  setTempo: Function,
  header: object
) => {
  const resposta = await api.get(`/produtos/calculartempo/${produtoId}`, header);
  setTempo(resposta.data);
};

export const mudarTipoViagem = async (
  produtoId: number,
  setDados: Function,
  header: object
) => {
  const resposta = await api.get(`/produtos/mudarTipoViagem/${produtoId}`, header);
  setDados(resposta.data);
};