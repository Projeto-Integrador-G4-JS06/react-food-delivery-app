import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import CardCategorias from "../cardcategorias/CardCategorias";
import { listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Link } from "react-router-dom";

function ListaCategorias() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarCategorias() {
    const tempoMinimoLoading = 1900; // 1 segundo (ajuste conforme necessário)
    const inicioLoading = Date.now();

    try {
      setIsLoading(true);
      await listar("/categorias/all", setCategorias);
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(`Erro ao listar as Categorias: ${error.message}`, "erro");
      } else {
        ToastAlerta("Erro desconhecido ao listar as Categorias!", "erro");
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

  // Função para remover uma categoria
  const removerCategoria = (id: string) => {
    setCategorias((prevCategorias) =>
      prevCategorias.filter((categoria) => categoria.id.toString() !== id)
    );
  };

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    <>
      {/* Centralized Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] dark:bg-dark-gray-200 bg-opacity-75 z-56">
          <span className="loader"></span>
        </div>
      )}
      {/* Faixa com bg-[#ECE9E3] ocupando a largura total */}
      <div className="w-full bg-[#ECE9E3] py-6 dark:bg-dark-gray-200">
        <div className="container mx-auto flex justify-between items-center py-2 px-8">
          <p className="hidden sm:block text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600 dark:text-white">
            Categorias
          </p>
          <Link
            to={`/cadastrarcategoria`}
            className="flex justify-end w-full sm:w-auto"
          >
            <button
              type="submit"
              className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer dark:bg-dark-red-700 dark:hover:bg-dark-red-800"
            >
              Cadastrar Categoria
            </button>
          </Link>
        </div>
      </div>

      <div className="container w-full mx-auto flex flex-col justify-center items-center gap-10 my-8">
        <div className="w-full flex flex-col mx-4">
          {!isLoading && categorias.length === 0 && (
            <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
              Nenhuma categoria foi encontrada!
            </span>
          )}

          <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-10">

            <div className="grid grid-cols-1 mx-6 gap-10 md:grid-cols-3 lg:grid-cols-4">
              {categorias
                .sort((a, b) => a.id - b.id)
                .map((categoria: Categoria) => (
                  <CardCategorias
                    key={categoria.id}
                    categoria={categoria}
                    onDelete={removerCategoria}
                  />
                ))}
            </div>
            {/* </div> */}
          </section>
        </div>
      </div>
    </>
  );
}
export default ListaCategorias;
