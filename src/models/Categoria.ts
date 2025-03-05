import Produto from "./Produto";

export default interface Categoria {
  id: number;
  nome_categoria: string;
  status: boolean;
  descricao: string;
  criado_em: string;
  atualizado_em: string;
  produtos?: Produto[] | null;
}