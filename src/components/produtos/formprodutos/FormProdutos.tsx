import { useState, useEffect, ChangeEvent, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { cadastrar, buscar, atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function FormProdutos() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome_categoria: '',
    descricao: '',
    icone: '',
    criado_em: '',
    atualizado_em: '',
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
      await buscar(`/produtos/id/${id}`, setProduto, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  // Função para buscar uma categoria pelo ID
  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/id/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias/all", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
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

    setProduto({
      ...produto,
      [name]: valor,
      categoria: categoria,
      usuario: usuario,
    });
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
      } catch (error: any) {
        if (error.toString().includes("403")) {
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
      } catch (error: any) {
        if (error.toString().includes("403")) {
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
    <section className="bg-[#f6eed9] py-8 flex flex-col justify-center items-center min-h-screen">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center my-4 font-heading text-[#CD533B]">
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <form
          className="flex flex-col w-full lg:w-1/2 gap-4 text-gray-700 font-medium m-1.5"
          onSubmit={cadastrarNovoProduto}
        >
          <div className="flex flex-col gap-2">
            <label className="flex justify-center lg:justify-start">
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Nome do Produto"
              name="nome_produto"
              required
              className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
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
              placeholder="Breve descrição do produto. . "
              name="descricao"
              required
              className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
              value={produto.descricao}
              onChange={atualizarEstado}
            />
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
              className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
              value={produto.preco}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-center lg:justify-start">Foto</label>
            <input
              type="text"
              placeholder="Link da foto do produto"
              name="foto"
              required
              className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
              value={produto.foto}
              onChange={atualizarEstado}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="flex justify-center lg:justify-start">
                Categoria do Produto
              </p>
              <select
                name="categoria"
                id="categoria"
                className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600 text-gray-400"
                onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
              >
                <option value="" selected disabled>
                  Selecione uma Categoria
                </option>

                {categorias.map((categoria) => (
                  <option className="text-gray-700" value={categoria.id} key={categoria.id}>
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
                className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600 text-gray-400"
                onChange={atualizarEstadoSelect}
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

          <button
            type="submit"
            className="rounded-xl disabled:bg-slate-200 bg-[#CD533B] hover:bg-[#EA5A3D]
                        cursor-pointer text-sm lg:text-base text-white font-heading w-1/2 mx-auto py-2 px-2 flex justify-center"
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
        </form>
      </div>
    </section>
  );
}

export default FormProdutos;