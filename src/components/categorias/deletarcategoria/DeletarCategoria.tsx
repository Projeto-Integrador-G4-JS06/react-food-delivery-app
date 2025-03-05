import { Check, X } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { useContext, useEffect, useRef, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { deletar, listar } from "../../../services/Service";
import { PacmanLoader } from "react-spinners";

function DeletarCategoria() {

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  const buscaExecutada = useRef(false); // Rastreia se a busca já foi executada

  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria);
    } catch (error: unknown) {
      console.error("Erro ao deletar categoria:", error);
      ToastAlerta("Categoria não encontrada!", "info");
      retornar();
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", 'info')
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id && !buscaExecutada.current) { // Verifica se a busca já foi executada
      buscaExecutada.current = true; // Marca a busca como executada
      buscarCategoriaPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: token },
      })
      ToastAlerta("Categoria apagada com sucesso!", "sucesso");
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout()
      } else {
        console.error("Erro ao deletar categoria:", error);
        ToastAlerta("Erro ao deletar a categoria!", "erro");
      }
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <section className="w-full py-8 flex flex-col justify-center items-center">
      <div className='container mx-auto px-4 flex flex-col justify-center items-center'>
        <div className="mx-1">
          <h1 className='text-2xl md:text-3xl lg:text-4xl text-center my-4'>Deletar Categoria</h1>
          <p className='text-center text-sm md:text-lg font-semibold mb-4'>
            Você tem certeza de que deseja apagar a categoria a seguir?
          </p>
          <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 text-2xl font-bold bg-slate-700 text-white'>
              Categoria
            </header>
            <p className='h-full p-8 text-2xl lg:text-3xl bg-white'>{categoria.nome}</p>
            <div className="flex">
              <button
                className='flex items-center justify-center w-full py-2 bg-teal-600 text-slate-50 hover:bg-teal-800'
                disabled={isLoading}
                onClick={deletarCategoria}
                aria-label="Confirmar exclusão"
              >
                {isLoading && (
                  <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75 z-50">
                    <PacmanLoader
                      color="#0D9488"
                      margin={0}
                      size={50}
                      speedMultiplier={2}
                      aria-label="Pacman-loading"
                    />
                  </div>
                )}
                <Check size={24} className='text-white' />
              </button>

              <button
                className='flex items-center justify-center w-full bg-red-500 text-slate-50 hover:bg-red-700'
                onClick={retornar}
                aria-label="Cancelar exclusão"
              >
                <X size={24} className='text-white' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeletarCategoria;