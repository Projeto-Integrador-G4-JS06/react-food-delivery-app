import Categoria from "./Categoria";
import Usuario from "./Usuario";

export default interface Produto {
  id: number;
  nome_produto: string;
  descricao: string;
  preco: number;
  foto: string;
  nutri_score: string;
  status: boolean | null;
  criado_em: string;
  atualizado_em: string;
  categoria: Categoria;
  usuario: Usuario;
}
