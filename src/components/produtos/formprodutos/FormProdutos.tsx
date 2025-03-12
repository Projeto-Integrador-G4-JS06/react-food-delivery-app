import { useState, useEffect, ChangeEvent, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { cadastrar, atualizar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function FormProdutos() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome_categoria: "",
    descricao: "",
    icone: "",
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
    status: false,
  });

  const [produto, setProduto] = useState<Produto>({} as Produto);

  const alertaExibido = useRef(false);

  // Captura id da URL
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  async function buscarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/id/${id}`, setProduto);
    } catch (error: unknown) {
      console.error("Erro ao cadastrar/atualizar categoria:", error);
      ToastAlerta("Categoria não encontrada!", "info");
      retornar();
    }
  }

  // Função para buscar uma categoria pelo ID
  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/id/${id}`, setCategoria);
    } catch (error: unknown) {
      console.error("Erro ao encontrar categoria:", error);
      ToastAlerta("Categoria não encontrada!", "erro");
      retornar();
    }
  }

  async function buscarCategorias() {
    try {
      await listar("/categorias/all", setCategorias);
    } catch (error: unknown) {
      console.error("Erro ao procurar categorias:", error);
      ToastAlerta("Categorias não encontradas!", "erro");
      retornar();
    }
  }

  useEffect(() => {
    if (token === "" && !alertaExibido.current) {
      ToastAlerta("Você precisa estar logado", "info");
      alertaExibido.current = true;
      navigate("/login");
    }
  }, [token]);

  // Busca as categorias ao carregar o componente
  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  // Função para atualizar o estado do produto quando o usuário digita nos campos de input
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { type, value, name } = e.target;

    let valor: string | number = value;

    if (
      ["number", "range"].includes(type) ||
      (!isNaN(Number(value)) && value !== "")
    ) {
      valor = parseFloat(Number(value).toFixed(2));
    }

    // Verifica se o campo é a descrição e limita a 80 caracteres
    if (name === "descricao" && typeof valor === "string") {
      valor = valor.slice(0, 80);
    }

    setProduto({
      ...produto,
      [name]: valor,
      categoria: categoria,
      usuario: usuario,
    });

    console.log(produto);
  }

  // Função para atualizar o estado do produto quando o usuário seleciona uma opção no select
  function atualizarEstadoSelect(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;

    setProduto({
      ...produto,
      [name]: value,
      categoria: categoria,
      usuario: usuario,
    });
  }

  // Função para cadastrar um produto
  async function cadastrarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/produtos/atualizar", produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Produto", "erro");
        }
      }
    } else {
      try {
        await cadastrar("/produtos/cadastrar", produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Produto", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/produtos");
  }

  const carregandoProdutos =
    produto.nome_produto === "" ||
    produto.descricao === "" || // Verifica se o preço é uma string vazia// Verifica se o preço é NaN
    produto.categoria === undefined ||
    produto.preco <= 0 ||
    produto.nutri_score === undefined;

  return (
    <section className=" flex flex-col justify-center items-center min-h-screen py-4 md:py-0">
      <div className="container w-[80%] md:w-[50%] lg:w-[50%]  mx-2 px-8 lg:px-0 lg:py-6 flex flex-col justify-center items-center bg-gray-50 p-4 rounded-4xl  border-1 border-gray-200 drop-shadow-2xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center my-4 font-heading text-[#333333]">
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h1>
        <div className="w-full lg:w-[80%] bg-[#333333] h-[1px] mt-2 mb-2"></div>
        <form
          className="flex flex-col w-full lg:w-[80%] gap-4 text-gray-700 font-medium m-1.5"
          onSubmit={cadastrarNovoProduto}
        >
          <div className="flex flex-col gap-2">
            <label className="flex justify-center lg:justify-start ">
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Nome do Produto"
              name="nome_produto"
              required
              className="border-2 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2"
              value={produto.nome_produto}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-center lg:justify-start">
              Descrição do Produto
            </label>
            <input
              type="text"
              placeholder="Breve descrição do produto..."
              name="descricao"
              required
              className="border-2 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2 "
              value={produto.descricao}
              onChange={atualizarEstado}
            />
            <span className="text-sm text-gray-500">
              {produto.descricao ? produto.descricao.length : 0}/80 caracteres
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-center lg:justify-start">
              Preço
            </label>
            <input
              type="number"
              step=".01"
              placeholder="Preço do produto"
              name="preco"
              required
              className="border-2 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2 "
              value={produto.preco === 0 ? "" : produto.preco}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-center lg:justify-start">Foto</label>
            <input
              type="text"
              placeholder="Link da foto do produto"
              name="foto"
              className="border-2 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2 "
              value={produto.foto}
              onChange={atualizarEstado}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="flex justify-center text-center lg:justify-start">
                Categoria do Produto
              </p>
              <select
                name="categoria"
                id="categoria"
                className="border-2 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2  text-gray-700"
                value={produto.categoria?.id || ""} // Controla o valor selecionado
                onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                required // Campo obrigatório
              >
                <option value="" disabled>
                  Selecione uma Categoria
                </option>
                {categorias.map((categoria) => (
                  <option
                    className="text-gray-700"
                    value={categoria.id}
                    key={categoria.id}
                  >
                    {categoria.nome_categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex justify-center lg:justify-start">
                Nutri Score
              </p>
              <select
                name="nutri_score"
                id="nutri_score"
                value={produto.nutri_score}
                className="border-2 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2  text-gray-700"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  atualizarEstadoSelect(e)
                }
                required // Campo obrigatório
              >
                <option value="" selected disabled>
                  Selecione o Nutri Score
                </option>
                <option className="text-gray-700" value="A">
                  A
                </option>
                <option className="text-gray-700" value="B">
                  B
                </option>
                <option className="text-gray-700" value="C">
                  C
                </option>
                <option className="text-gray-700" value="D">
                  D
                </option>
                <option className="text-gray-700" value="E">
                  E
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-4 lg:gap-12 flex-col lg:flex-row">
            <Link to={`/produtos`} className="h-13 w-full order-2 lg:order-1">
              <button className="font-[family-name:var(--font-quicksand)] font-semibold text-lg  rounded-lg bg-[#E02D2D] opacity-80 active:bg-[#A64B4B] hover:bg-[#D46A6A] text-white h-13 w-full">
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="flex order-1 lg:order-2 items-center justify-center font-[family-name:var(--font-quicksand)] font-semibold text-lg rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] disabled:bg-[#E02D2D] disabled:opacity-60 text-white h-13 w-full"
              disabled={carregandoProdutos}
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
    </section>
  );
}

export default FormProdutos;
