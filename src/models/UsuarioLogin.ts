export default interface UsuarioLogin {
  id: number;
  nome_usuario: string;
  tipo: string | null;
  usuario: string;
  senha: string;
  foto: string;
  token: string;
  num_celular: string;
  cpf: string | null;
  cnpj: string | null;
  endereco: string;
  criado_em: string;
  atualizado_em: string;
}
