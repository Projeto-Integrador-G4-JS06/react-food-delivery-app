import axios from "axios";

const api = axios.create({
 // baseURL: import.meta.env.VITE_API_URL,
 baseURL: "https://nest-food-delivery-app.onrender.com",
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
  setDados(resposta.data);
};

export const listar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

// Função alternativa para ser usada na busca de produtos, por categoria
// export const listar = async (url: string) => {
//   try {
//     const resposta = await api.get(url);
//     console.log('Resposta da API:', resposta.data); // Verifique a resposta da API
//     return resposta.data; // Retorna os dados diretamente
//   } catch (error) {
//     console.error('Erro na requisição:', error);
//     throw error;
//   }
// };

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
