import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await listar("/produtos/all", setProdutos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(`Erro ao listar produtos: ${error.message}`, "erro");
      } else {
        ToastAlerta("Erro desconhecido ao listar os produtos!", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

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
      <div className="w-full bg-[#D9D9D9] py-6">
        <div className="container mx-auto flex justify-between items-center py-2 px-8">
          <p className="hidden sm:block text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600">
            Produtos
          </p>
          <Link
            to={`/cadastrarproduto`}
            className="flex justify-end w-full sm:w-auto"
          >
            <button
              type="submit"
              className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer"
            >
              Cadastrar Produto
            </button>
          </Link>
        </div>
      </div>

      {/* Conteúdo principal dentro do container */}
      <div className="container w-full mx-auto flex flex-col justify-center items-center gap-10 my-8">
        <div className="w-full flex flex-col mx-4">
          {!isLoading && produtos.length === 0 && (
            <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
              Nenhum produto foi encontrado!
            </span>
          )}

          <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-10">
            <div className="grid grid-cols-1 mx-6 gap-10 md:grid-cols-2 2xl:mx-60">
              {produtos
                .sort((a, b) => a.id - b.id)
                .map((produto: Produto) => (
                  <CardProdutos key={produto.id} produto={produto} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
