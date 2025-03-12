import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { PacmanLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaProdutosSaudaveis() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await listar("/produtos/healthy", setProdutos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(`Erro ao listar os produtos saudáveis: ${error.message}`, 'erro');
      } else {
        ToastAlerta("Erro desconhecido ao listar os produtos saudáveis!", 'erro');
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
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
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
      <div className="container w-full mx-auto flex flex-col justify-center items-center gap-10 my-8">
        <div className="w-full flex flex-col mx-4">
          {(!isLoading && produtos.length === 0) && (
            <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
              Nenhum produto foi encontrado!
            </span>
          )}
        </div>
        <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-10">
          <div className="grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-60">
            {/* Primeira linha com card e imagem */}
            <div className="order-2">
              <CardProdutos produto={produtos[0]} />
            </div>
            <div className="order-2 flex justify-center">
              <img
                src="https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Eating%20healthy%20food-pana%201.png?updatedAt=1741745336678"
                alt="Imagem"
                className="w-72.5 h-72.5 object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-60">
            {produtos
              .sort((a, b) => a.id - b.id)
              .slice(1).map((produto) => (
                <CardProdutos
                  key={produto.id}
                  produto={produto}
                />
              ))
            }
          </div>
        </section>
      </div>
    </>
  );
}

export default ListaProdutosSaudaveis;