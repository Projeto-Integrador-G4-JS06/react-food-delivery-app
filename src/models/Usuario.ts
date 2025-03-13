import Produto from "./Produto";

export default interface Usuario {
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
