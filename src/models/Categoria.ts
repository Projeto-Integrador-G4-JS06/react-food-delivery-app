import Produto from "./Produto";

export default interface Categoria {
  id: number;
  nome_categoria: string;
  descricao: string;
  icone: string;
  criado_em: string;
  atualizado_em: string;
  status: boolean;
  produtos?: Produto[] | null;
}