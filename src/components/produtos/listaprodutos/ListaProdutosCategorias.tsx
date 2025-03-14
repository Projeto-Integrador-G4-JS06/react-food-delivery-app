import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { listar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { PacmanLoader } from "react-spinners";

function ListaProdutosCategorias() {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { nome_categoria } = useParams<{ nome_categoria: string }>();

  // Função para converter o nome da categoria em title case
  const toTitleCase = (str: string | undefined): string => {
    if (!str) return ''; // Retorna uma string vazia se str for undefined ou null
    return str
      .toLowerCase() // Converte toda a string para minúsculas
      .split(' ') // Divide a string em um array de palavras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
      .join(' '); // Junta as palavras de volta em uma única string
  };

  async function buscarProdutosCategorias() {
    try {
      setIsLoading(true);
      await listar(`/categorias/nome/${nome_categoria}`, (dados: Categoria[]) => {
        if (Array.isArray(dados) && dados.length > 0) {
          setCategoria(dados[0]); // Acessa o primeiro elemento do array
        } else {
          setCategoria(null); // Define como null se não houver dados
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(`Erro ao buscar a categoria: ${error.message}`, 'erro');
      } else {
        ToastAlerta("Erro desconhecido ao buscar a categoria!", 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // async function buscarProdutosCategorias() {
  //   try {
  //     setIsLoading(true);
  //     const dados = await listar(`/categorias/nome/${nome_categoria}`);
  //     if (Array.isArray(dados) && dados.length > 0) {
  //       setCategoria(dados[0]); // Acessa o primeiro elemento do array
  //     } else {
  //       setCategoria(null); // Define como null se não houver dados
  //     }
  //     console.log('Categoria carregada:', dados); // Verifique os dados retornados
  //     console.log('Produtos:', dados[0]?.produto); // Verifique os produtos retornados
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       ToastAlerta(`Erro ao buscar a categoria: ${error.message}`, 'erro');
  //     } else {
  //       ToastAlerta("Erro desconhecido ao buscar a categoria!", 'erro');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    buscarProdutosCategorias();
  }, [nome_categoria]);

  const removerProduto = (id: string) => {
    if (categoria && categoria.produto) {
      const produtosAtualizados = categoria.produto.filter((produto) => produto.id.toString() !== id);
      setCategoria({
        ...categoria,
        produto: produtosAtualizados,
      });
    }
  };

  return (
    <>
      {/* Centralized PacmanLoader */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] bg-opacity-75 z-50">
          <PacmanLoader
            color="#E02D2D"
            margin={0}
            size={50}
            speedMultiplier={2}
            aria-label="Pacman-loading"
          />
        </div>
      )}

      {/* Faixa com bg-[#D9D9D9] ocupando a largura total */}
      <div className="w-full bg-[#ECE9E3] py-6">
        <div className="container mx-auto flex justify-between items-center py-2 px-8">
          <p className="hidden sm:block text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600">
            Produtos da Categoria: {categoria ? toTitleCase(categoria.nome_categoria) : '---'}
          </p>
          <Link to={`/home`} className="flex justify-end w-full sm:w-auto">
            <button
              type="submit"
              className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>

      {/* Conteúdo principal dentro do container */}
      <div className="container w-full mx-auto flex flex-col justify-center items-center gap-10 my-8">
        <div className="w-full flex flex-col mx-4">
          {(!isLoading && categoria?.produto?.length === 0) && (
            <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
              Nenhum produto foi encontrado!
            </span>
          )}

          <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-10">
            <div className="grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-60">
              {categoria?.produto
                ?.sort((a, b) => a.id - b.id) // Ordena os produtos por ID
                ?.map((produto) => (
                  <CardProdutos
                    key={produto.id}
                    produto={produto}
                    onDelete={removerProduto}
                  />
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ListaProdutosCategorias;