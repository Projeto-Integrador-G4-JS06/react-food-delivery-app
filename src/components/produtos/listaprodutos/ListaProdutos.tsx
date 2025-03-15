import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { Link } from "react-router-dom";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarProdutos() {
    const tempoMinimoLoading = 1900; // 1 segundo (ajuste conforme necessário)
    const inicioLoading = Date.now();

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

  // Função para remover um produto da lista
  const removerProduto = (id: string) => {
    setProdutos((prevProdutos) =>
      prevProdutos.filter((produto) => produto.id.toString() !== id)
    );
  };

  useEffect(() => {
    buscarProdutos();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <>
     
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] bg-opacity-75 z-56">
          <span className="loader"></span>
        </div>
      )}

      {/* Faixa com bg-[#D9D9D9] ocupando a largura total */}
      <div className="w-full bg-[#ECE9E3] py-6">
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
            <div className="grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-60">
              {produtos
                .sort((a, b) => a.id - b.id) // Ordena os produtos por ID
                .map((produto: Produto) => (
                  <CardProdutos
                    key={produto.id}
                    produto={produto}
                    onDelete={removerProduto} // Passa a função para remover o produto
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
