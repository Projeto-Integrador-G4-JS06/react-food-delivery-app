import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome_usuario: "",
    tipo: "",
    usuario: "",
    senha: "",
    num_celular: "",
    cpf: "",
    cnpj: "",
    foto: "",
    endereco: "",
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        ToastAlerta("Usuário Cadastrado com sucesso!", "sucesso");
      } catch (error: unknown) {
        if (error instanceof Error) {
          ToastAlerta(`Erro ao cadastrar o Usuário!: ${error.message}`, "erro");
        } else {
          ToastAlerta("Erro desconhecido ao cadastrar o usuário!", "erro");
        }
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes! Verifique as informações e tente novamente.",
        "info"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <section className="container w-full mx-auto flex flex-col p-4 justify-center drop-shadow-xl">
        <div className="flex items-center justify-center my-2 md:my-6 xl:mx-30">
          <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-full rounded-2xl">
            <div className="bg-[#FF5656] dark:bg-[#961F1F] fundoCadastro hidden xl:block rounded-l-2xl py-6"></div>
            <div className="place-items-center bg-[#F8F8F8] dark:bg-dark-gray-300 flex justify-center w-full rounded-2xl xl:transform xl:-translate-x-5 py-6">
              <form
                className="flex flex-col gap-4 w-70 xl:w-3/5"
                onSubmit={cadastrarNovoUsuario}
              >
                <h2 className="text-[#33333] font-semibold text-3xl text-center border-b-1 p-6 border-b-black w-full font-[family-name:var(--font-heading)] dark:text-white dark:border-b-white">
                  Cadastre-se
                </h2>
                <div className="flex flex-col mt-4 w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="nome_usuario">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome_usuario"
                    name="nome_usuario"
                    placeholder="Nome"
                    className="peer bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161] border-1 border-[#E0E0E0]"
                    value={usuario.nome_usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="usuario">
                    Usuário
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="user@email.com"
                    className="bg-[#eeeeee] border-1 border-[#E0E0E0] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161]"
                    value={usuario.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="num_celular">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="num_celular"
                    name="num_celular"
                    placeholder="(xx) xxxxx-xxxx"
                    className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161]  border-1 border-[#E0E0E0]"
                    value={usuario.num_celular}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="endereco">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    placeholder="R. Nome da Rua, 123 - Bairro - Cidade/UF - CEP"
                    className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161] border-1 border-[#E0E0E0]"
                    value={usuario.endereco}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="foto">
                    Foto
                  </label>
                  <input
                    type="text"
                    id="foto"
                    name="foto"
                    placeholder="Insira o link da sua foto de perfil..."
                    className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161] border-1 border-[#E0E0E0]"
                    value={usuario.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="senha">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Insira sua senha..."
                    className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161] border-1 border-[#E0E0E0]"
                    value={usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-gray-700 p-1 dark:text-white" htmlFor="confirmarSenha">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 dark:bg-[#3a3a3a] dark:text-[#E0E0E0] dark:border-1 dark:border-[#616161] border-1 border-[#E0E0E0]"
                    value={confirmarSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleConfirmarSenha(e)
                    }
                  />
                </div>
                <div className="flex justify-between w-full gap-8 pt-6">
                  <button
                    type="reset"
                    className="font-[family-name:var(--font-quicksand)] font-medium rounded-xl bg-[#b4b4b4] hover:bg-[#9e9e9e] text-white h-13 w-80 cursor-pointer dark:bg-[#828283] dark:hover:bg-[#6e6e6f] dark:active:bg-[#777778]"
                    onClick={retornar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="font-[family-name:var(--font-quicksand)] font-medium rounded-xl bg-[#E02D2D] hover:bg-[#B22222] text-white h-13 w-80 cursor-pointer dark:bg-dark-red-600 dark:hover:bg-dark-red-700"
                  >
                    {isLoading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                      />
                    ) : (
                      <span>Cadastrar</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cadastro;
