import { Link, useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
// import { PacmanLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  const buscaExecutada = useRef(false); // Rastreia se a busca já foi executada

  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/id/${id}`, setCategoria);
    } catch (error: unknown) {
      console.error("Erro ao encontrar categoria:", error);
      ToastAlerta("Categoria não encontrada!", "erro");
      retornar();
    }
  }

  useEffect(() => {
    if (token === "" && !buscaExecutada.current) {
      ToastAlerta("Você precisa estar logado", "info");
      buscaExecutada.current = true;
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id && !buscaExecutada.current) {
      // Verifica se a busca já foi executada
      console.log(`ID: ${id}`);
      buscaExecutada.current = true; // Marca a busca como executada
      buscarCategoriaPorId(id);
    } else {
      setCategoria({
        id: 0,
        nome_categoria: "",
        descricao: "",
        icone: "",
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
        status: false,
      });
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    let valor = value;

    if (name === "descricao" && typeof valor === "string") {
      valor = valor.slice(0, 80);
    }

    setCategoria({
      ...categoria,
      [name]: valor,
    });

    // Verifica se o campo é a descrição e limita a 80 caracteres
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias/atualizar`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso");
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("401")) {
          ToastAlerta("Você precisa estar logado", "info");
          handleLogout();
        } else {
          console.error("Erro ao atualizar categoria:", error);
          ToastAlerta("Erro ao atualizar a categoria!", "erro");
        }
      }
    } else {
      try {
        console.log("Dados da categoria sendo enviados:", categoria); // Log dos dados
        const response = await cadastrar(
          `/categorias/cadastrar`,
          categoria,
          setCategoria,
          {
            headers: { Authorization: token },
          }
        );
        console.log("Resposta da API:", response); // Log da resposta
        ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso");
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("401")) {
          ToastAlerta("Você precisa estar logado", "info");
          handleLogout();
        } else {
          console.error("Erro ao cadastrar a categoria:", error);
          ToastAlerta("Erro ao cadastrar a categoria 123!", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  const carregandoCategoria =
    categoria.nome_categoria === "" || categoria.descricao === "";

  console.log(JSON.stringify(categoria));

  return (
    <section className="flex flex-col justify-center items-center min-h-screen ">
      <div className="container w-[75%] md:w-[50%] lg:w-[33%] mx-8 px-8 lg:px-0 lg:py-6 flex flex-col justify-center items-center bg-gray-50 p-4 rounded-4xl  border-1 border-gray-200 drop-shadow-2xl">
        <div className="mx-1 lg:w-[80%] ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center my-4 font-[family-name:var(--font-heading)] text-[#text-[#333333]]">
            {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
          </h1>

          {/* {isLoading && (
                        <div className="fixed inset-0 flex justify-center items-center bg-[var(--color-beige-500)] bg-opacity-75 z-50">
                            <PacmanLoader
                                color="#0D9488"
                                margin={0}
                                size={50}
                                speedMultiplier={2}
                                aria-label="Pacman-loading"
                            />
                        </div>
                    )} */}
          <div className="w-full  bg-[#333333] h-[2px] mt- mb-2 "></div>

          <form
            className="flex flex-col w-full gap-4 text-gray-700 font-medium"
            onSubmit={gerarNovaCategoria}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="categoria"
                className="flex justify-center lg:justify-start"
              >
                Nome da Categoria
              </label>
              <input
                type="text"
                placeholder="Informe aqui o nome da categoria"
                name="nome_categoria"
                className="text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2"
                required
                value={categoria.nome_categoria}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
              <label
                htmlFor="descricao"
                className="flex justify-center lg:justify-start"
              >
                Descrição
              </label>
              <input
                type="text"
                placeholder="Informe aqui a descrição da categoria"
                name="descricao"
                className="text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2 "
                required
                value={categoria.descricao}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
              <span className="text-sm text-gray-500">
                {categoria.descricao ? categoria.descricao.length : 0}/80
                caracteres
              </span>
              <label
                htmlFor="icone"
                className="flex justify-center lg:justify-start"
              >
                ícone (imagem)
              </label>
              <input
                type="text"
                placeholder="Insira o link da imagem da categoria"
                name="icone"
                className="text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2"
                // required
                value={categoria.icone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex justify-between gap-2 md:gap-12">
              <Link to={`/categorias`} className="h-13 w-full">
                <button className="font-[family-name:var(--font-quicksand)] font-semibold text-lg  rounded-lg bg-[#E02D2D] opacity-80 active:bg-[#A64B4B] hover:bg-[#D46A6A] text-white h-13 w-full">
                  Cancelar
                </button>
              </Link>
              <button
                className="flex items-center justify-center font-[family-name:var(--font-quicksand)] font-semibold text-lg rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] disabled:bg-[#E02D2D] disabled:opacity-60 text-white h-13 w-full"
                type="submit"
                // disabled={isLoading} // Desabilita o botão durante o carregamento
                disabled={carregandoCategoria}
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
                  <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FormCategoria;
