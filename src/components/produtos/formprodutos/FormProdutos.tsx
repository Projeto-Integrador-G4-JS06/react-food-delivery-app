import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { cadastrar, listar } from "../../../services/Service";
import Usuario from "../../../models/Usuario";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProdutos() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome_categoria: "",
    status: true,
    descricao: "",
    criado_em: "",
    atualizado_em: "",
    produtos: null,
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome_produto: "",
    descricao: "",
    preco: 0,
    foto: "",
    nutri_score: "",
    status: true,
    criado_em: "",
    atualizado_em: "",
    categoria: categoria,
    usuario: {} as Usuario,
  });

  // captura id da url
  const { id } = useParams<{ id: string }>();

  // // Função para buscar um produto pelo ID
  // async function buscarProdutoPorId(id: string) {
  //     try {
  //         await listar(`/produtos/${id}`, setProduto);
  //     } catch (error: unknown) {
  //         console.error("Erro ao atualizar Produto:", error);
  //         ToastAlerta("Produto não encontrado!", "info");
  //         retornar();
  //     }
  // }

  // Função para buscar uma categoria pelo ID
  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      console.error("Erro ao atualizar categoria:", error);
      ToastAlerta("Categoria não encontrada!", "info");
      retornar();
    }
  }

  async function buscarCategorias() {
    try {
      await listar(`/categorias`, setCategorias); //busca as categorias da API
    } catch (error: any) {
      console.error("Erro ao atualizar categoria:", error);
      ToastAlerta("Categoria não encontrada!", "info");
      retornar();
    }
  }

  // Busca as categorias ao carregar o componente
  useEffect(() => {
    buscarCategorias();
  }, []);

  // Função para atualizar o estado do produto quando o usuário digita nos campos
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  // Função para atualizar a categoria selecionada
  function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const categoriaId = parseInt(e.target.value); // Converte o valor para número
    const categoriaSelecionada = categorias.find(
      (cat) => cat.id === categoriaId
    ); // Encontra a categoria pelo ID

    if (categoriaSelecionada) {
      setCategoria(categoriaSelecionada); // Atualiza a categoria selecionada
      setProduto({
        ...produto,
        categoria: categoriaSelecionada, // Associa a categoria ao produto
      });
    }
  }

  // Função para cadastrar um produto
  async function cadastrarProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await cadastrar(`/produtos`, produto, setProduto); // Envia os dados do produto para a API
      ToastAlerta("O Produto foi cadastrado com sucesso!", "sucesso");
      navigate("/produtos"); // Redireciona para a lista de produtos após o cadastro
    } catch (error: any) {
      console.error("Erro ao cadastrar Produto:", error);
      ToastAlerta("Erro ao cadastrar Produto!", "erro");
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className="container flex flex-col mx-auto mb-4 items-center">
      <h1 className="text-4xl text-center my-8">Cadastrar Produto</h1>

      <form className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título do Produto</label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            id="titulo"
            required
            value={produto.nome_produto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Preço</label>
          <input
            type="number"
            placeholder="Preço"
            name="preco"
            id="preco"
            min="0" //impede valores negativos
            step="0.01" //permite valores decimais
            required
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Descrição do Produto</label>
          <input
            type="text"
            placeholder="Texto"
            name="descricao"
            id="descricao"
            required
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Foto</label>
          <input
            type="text"
            placeholder="url"
            name="foto"
            id="foto"
            required
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria do Produto</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id}>{categoria.nome_categoria}</option>
              </>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p>Nutri Score</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded"
          >
            <option value="" selected disabled>
              Selecione o Nutri Score
            </option>
            <>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>
            </>
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-[#CD533B] hover:bg-[#EA5A3D]
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormProdutos;
