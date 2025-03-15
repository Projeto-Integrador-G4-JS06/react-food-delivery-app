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

  const camposPreenchidos = () => {
    return categoria.descricao && categoria.nome_categoria;
  };

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

    if (name === "nome_categoria" && typeof valor === "string") {
      valor = valor.slice(0, 20);
    }

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

  console.log(JSON.stringify(categoria));

  return (
    <section className="flex flex-col justify-center items-center min-h-screen py-6">
      <div className="container w-[80%] md:w-[50%] xl:mt-4 xl:mb-4 mx-2 px-8 lg:px-0 lg:py-6 flex flex-col justify-center items-center bg-gray-50 p-4 rounded-4xl  border-1 border-gray-200 drop-shadow-2xl">
        <form
          className="flex flex-col w-full lg:w-[80%] gap-4 mt-4 text-gray-700 font-medium m-1.5"
          onSubmit={gerarNovaCategoria}
        >
          <h2 className="text-[#33333] font-semibold text-2xl md:text-3xl text-center border-b-1 p-6 border-b-black w-full font-[family-name:var(--font-heading)]">
            {id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
          </h2>

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="categoria" className="flex justify-start">
              Nome da Categoria
            </label>
            <input
              type="text"
              placeholder="Nome da Categoria"
              name="nome_categoria"
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] rounded-xl p-2"
              required
              value={categoria.nome_categoria}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
            <span className="text-sm text-gray-500">
              {categoria.nome_categoria ? categoria.nome_categoria.length : 0}
              /20 caracteres
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="flex justify-start">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Breve descrição da categoria..."
              name="descricao"
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2"
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
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="icone" className="flex justify-start">
              Ícone (imagem)
            </label>
            <input
              type="text"
              placeholder="Insira o link da imagem da categoria"
              name="icone"
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2"
              // required
              value={categoria.icone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex justify-center gap-4 mt-4 lg:gap-12 flex-col lg:flex-row items-center">
            <Link to={`/categorias`}>
              <button className="font-[family-name:var(--font-quicksand)] font-medium text-base rounded-lg bg-[#E02D2D] opacity-80 active:bg-[#A64B4B] hover:bg-[#D46A6A] text-white p-2 w-48">
                Cancelar
              </button>
            </Link>
            <button
              className="focus:outline-0 flex order-1 lg:order-2 items-center justify-center text-base font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] disabled:bg-[#E02D2D] disabled:opacity-60 text-white p-2 w-48"
              type="submit"
              disabled={!camposPreenchidos()}
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
      </div >
    </section >
  );
}

export default FormCategoria;
