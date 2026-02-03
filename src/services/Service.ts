import axios from "axios";

const api = axios.create({
  baseURL: "https://ride-backend-o0yt.onrender.com",
});

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  console.log("📤 [cadastrarUsuario] Enviando para:", url);
  console.log("📤 [cadastrarUsuario] Dados:", dados);
  
  try {
    const resposta = await api.post(url, dados);
    console.log("✅ [cadastrarUsuario] Resposta:", resposta.data);
    setDados(resposta.data);
  } catch (error: any) {
    console.error("❌ [cadastrarUsuario] Erro:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  console.log("📤 [login] Enviando para:", url);
  console.log("📤 [login] Dados:", dados);
  
  try {
    const resposta = await api.post(url, dados);
    console.log("✅ [login] Resposta:", resposta.data);
    
    if (resposta.data.token) {
      localStorage.setItem('token', resposta.data.token);
    }
    
    setDados(resposta.data);
  } catch (error: any) {
    console.error("❌ [login] Erro:", error.response?.data || error.message);
    throw error;
  }
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: object
) => {
  console.log("📤 [cadastrar] URL:", url);
  console.log("📤 [cadastrar] Dados:", dados);
  console.log("📤 [cadastrar] Header:", header);
  
  try {
    const resposta = await api.post(url, dados, header);
    console.log("✅ [cadastrar] Resposta:", resposta.data);
    setDados(resposta.data);
  } catch (error: any) {
    console.error("❌ [cadastrar] Erro:", error.response?.data || error.message);
    throw error;
  }
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: object
) => {
  console.log("📤 [atualizar] URL:", url);
  console.log("📤 [atualizar] Dados:", dados);
  console.log("📤 [atualizar] Header:", header);
  
  try {
    const resposta = await api.put(url, dados, header);
    console.log("✅ [atualizar] Resposta:", resposta.data);
    setDados(resposta.data);
  } catch (error: any) {
    console.error("❌ [atualizar] Erro:", error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      console.error("Token expirado ou inválido. Faça login novamente.");
    }
    
    throw error;
  }
};

export const buscar = async (
  url: string,
  setDados: Function,
  header: object
) => {
  console.log("📤 [buscar] URL:", url);
  console.log("📤 [buscar] Header:", header);
  
  try {
    const resposta = await api.get(url, header);
    console.log("✅ [buscar] Resposta:", resposta.data);
    setDados(resposta.data);
  } catch (error: any) {
    console.error("❌ [buscar] Erro:", error.response?.data || error.message);
    throw error;
  }
};

export const deletar = async (url: string, header: object) => {
  console.log("📤 [deletar] URL:", url);
  console.log("📤 [deletar] Header:", header);
  
  try {
    await api.delete(url, header);
    console.log("✅ [deletar] Sucesso");
  } catch (error: any) {
    console.error("❌ [deletar] Erro:", error.response?.data || error.message);
    throw error;
  }
};

// CORRIGIDO: sintaxe correta com parênteses
export const calcularTempo = async (
  produtoId: number,
  setTempo: Function,
  header: object
) => {
  console.log("📤 [calcularTempo] Produto ID:", produtoId);
  console.log("📤 [calcularTempo] Header:", header);
  
  try {
    const resposta = await api.get(`/produtos/calculartempo/${produtoId}`, header);
    console.log("✅ [calcularTempo] Resposta:", resposta.data);
    setTempo(resposta.data);
  } catch (erro: any) {
    console.error("❌ [calcularTempo] Erro:", erro.response?.data || erro.message);
    throw erro;
  }
};

export const mudarTipoViagem = async (
  produtoId: number,
  setDados: Function,
  header: object
) => {
  console.log("📤 [mudarTipoViagem] Produto ID:", produtoId);
  console.log("📤 [mudarTipoViagem] Header:", header);
  
  try {
    const resposta = await api.get(`/produtos/mudarTipoViagem/${produtoId}`, header);
    console.log("✅ [mudarTipoViagem] Resposta:", resposta.data);
    setDados(resposta.data);
  } catch (erro: any) {
    console.error("❌ [mudarTipoViagem] Erro:", erro.response?.data || erro.message);
    throw erro;
  }
};