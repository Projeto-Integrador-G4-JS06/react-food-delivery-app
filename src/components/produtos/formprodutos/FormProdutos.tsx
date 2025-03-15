import { useState, useEffect, ChangeEvent, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { cadastrar, atualizar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { toTitleCase } from "../../../utils/stringUtils";

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

    if (name === "descricao" && typeof valor === "string") {
      valor = valor.slice(0, 80);
    }

    if (name === "nome_produto" && typeof valor === "string") {
      valor = valor.slice(0, 30);
    }

    if (name === "nome_produto" && typeof valor === "string") {
      // Aplica a função toTitleCase ao nome do produto
      valor = toTitleCase(valor.slice(0, 30));
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
  // Função para verificar se todos os campos obrigatórios estão preenchidos
  const camposPreenchidos = () => {
    return (
      produto.nome_produto &&
      produto.descricao &&
      produto.preco &&
      produto.categoria?.id &&
      produto.nutri_score
    );
  };

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

  return (
    <section className="flex flex-col justify-center items-center min-h-screen py-6">
      <div className="container w-[80%] md:w-[50%] xl:mt-4 xl:mb-4 mx-2 px-8 lg:px-0 lg:py-6 flex flex-col justify-center items-center bg-gray-50 p-4 rounded-4xl  border-1 border-gray-200 drop-shadow-2xl">
        <form
          className="flex flex-col w-full lg:w-[80%] gap-4 mt-4 text-gray-700 font-medium m-1.5"
          onSubmit={cadastrarNovoProduto}
        >
          <h2 className="text-[#33333] font-semibold text-2xl md:text-3xl text-center border-b-1 p-6 border-b-black w-full font-[family-name:var(--font-heading)]">
            {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
          </h2>

          <div className="flex flex-col gap-2 mt-4">
            <label className="flex justify-start">
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Nome do Produto"
              name="nome_produto"
              required
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] rounded-xl p-2"
              value={produto.nome_produto}
              onChange={atualizarEstado}
            />
            <span className="text-sm text-gray-500">
              {produto.nome_produto ? produto.nome_produto.length : 0}/30
              caracteres
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-start">
              Descrição do Produto
            </label>
            <input
              type="text"
              placeholder="Breve descrição do produto..."
              name="descricao"
              required
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2"
              value={produto.descricao}
              onChange={atualizarEstado}
            />
            <span className="text-sm text-gray-500">
              {produto.descricao ? produto.descricao.length : 0}/80 caracteres
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-start">
              Preço
            </label>
            <input
              type="number"
              step=".01"
              placeholder="Preço do produto"
              name="preco"
              required
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2 "
              value={produto.preco === 0 ? "" : produto.preco}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-start">
              Foto
            </label>
            <input
              type="text"
              placeholder="Link da foto do produto"
              name="foto"
              className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2 "
              value={produto.foto}
              onChange={atualizarEstado}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="flex justify-start">
                Categoria do Produto
              </p>
              <select
                name="categoria"
                id="categoria"
                className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2  text-gray-700"
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
              <p className="flex justify-start">
                Nutri Score
              </p>
              <select
                name="nutri_score"
                id="nutri_score"
                value={produto.nutri_score}
                className="focus:outline-0 text-sm md:text-base bg-[#F0F0F0] border-[#969696] rounded-xl p-2  text-gray-700 focus:border-0"
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
          <div className="flex justify-center gap-4 mt-4 lg:gap-12 flex-col lg:flex-row items-center">
            <button
              type="submit"
              className="focus:outline-0 flex items-center justify-center text-base font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] disabled:bg-[#E02D2D] disabled:opacity-60 text-white p-2 w-48 order-1"
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
            <Link to={`/produtos`} className="order-2">
              <button className="font-[family-name:var(--font-quicksand)] font-medium text-base rounded-lg bg-[#E02D2D] opacity-80 active:bg-[#A64B4B] hover:bg-[#D46A6A] text-white p-2 w-48">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default FormProdutos;
