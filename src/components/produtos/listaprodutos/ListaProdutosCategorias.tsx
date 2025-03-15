import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { listar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { toTitleCase } from "../../../utils/stringUtils";

function ListaProdutosCategorias() {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { nome_categoria } = useParams<{ nome_categoria: string }>();

  async function buscarProdutosCategorias() {
    const tempoMinimoLoading = 1900; // 1 segundo (ajuste conforme necessário)
    const inicioLoading = Date.now();

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
      const tempoDecorrido = Date.now() - inicioLoading;
      const tempoRestante = tempoMinimoLoading - tempoDecorrido;

      if (tempoRestante > 0) {
        // Aguarda o tempo restante antes de desativar o loading
        setTimeout(() => setIsLoading(false), tempoRestante);
      } else {
        // Se o tempo mínimo já foi atingido, desativa o loading imediatamente
        setIsLoading(false);
      }
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
      {/* Centralized Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] dark:bg-dark-gray-200 bg-opacity-75 z-56">
          <span className="loader"></span>
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