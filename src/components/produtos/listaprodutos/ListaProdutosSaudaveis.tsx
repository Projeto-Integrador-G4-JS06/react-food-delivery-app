import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaProdutosSaudaveis() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar os produtos saudáveis
  async function buscarProdutos() {
    const tempoMinimoLoading = 1900; // 1 segundo (ajuste conforme necessário)
    const inicioLoading = Date.now();

    try {
      setIsLoading(true);
      await listar("/produtos/healthy", setProdutos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(
          `Erro ao listar os produtos saudáveis: ${error.message}`,
          "erro"
        );
      } else {
        ToastAlerta(
          "Erro desconhecido ao listar os produtos saudáveis!",
          "erro"
        );
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

  // Função para remover um produto da lista de produtos saudáveis
  const removerProduto = (id: string) => {
    setProdutos((prevProdutos) =>
      prevProdutos.filter((produto) => produto.id.toString() !== id)
    );
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <>
      {/* Centralized Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] dark:bg-dark-gray-200 bg-opacity-75 z-56">
          <span className="loader"></span>
        </div>
      )}

      <div className="container w-full mx-auto flex flex-col justify-center items-center gap-10 my-8">
        {!isLoading && produtos.length === 0 && (
          <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
            Nenhum produto foi encontrado!
          </span>
        )}

        {!isLoading && produtos.length > 0 && (
          <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-8">
            <div className="grid grid-cols-1 mx-4 md:gap-8 md:grid-cols-2 2xl:mx-30">
              <div className="order-2">
                <CardProdutos produto={produtos[0]} onDelete={removerProduto} />
              </div>
              <div className="order-2 flex justify-center items-center">
                <img
                  src="https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/Eating%20healthy%20food-pana%201.png?updatedAt=1742050540097"
                  alt="Imagem"
                  className="w-72.5 h-72.5 object-cover rounded-lg hidden sm:block"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mx-4 gap-8 md:grid-cols-2 2xl:mx-30">
              {produtos
                .sort((a, b) => a.id - b.id)
                .slice(1)
                .map((produto) => (
                  <CardProdutos
                    key={produto.id}
                    produto={produto}
                    onDelete={removerProduto}
                  />
                ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ListaProdutosSaudaveis;
