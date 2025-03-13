import Produto from "./Produto";

export default interface Usuario {
<<<<<<< HEAD
  id: number;
  nome_usuario: string;
  tipo: string | null;
  usuario: string;
  senha: string;
  num_celular: string;
  cpf: string | null;
  cnpj: string | null;
  foto: string;
  endereco: string;
  criado_em: string;
  atualizado_em: string;
  produtos?: Produto[] | null;
}
=======
    id: number;
    nome_usuario: string;
    tipo: string | null;
    usuario: string;
    senha: string;
    num_celular: string;
    cpf: string | null;
    cnpj: string | null;
    foto: string;
    endereco: string;
    criado_em: string;
    atualizado_em: string;
    produto?: Produto[] | null;
}
>>>>>>> 8db7f8b205674e2d66335876289ef41bcd64f0f9
