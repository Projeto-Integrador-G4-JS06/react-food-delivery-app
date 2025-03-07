import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { useContext, useEffect, useRef, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { deletar, listar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function DeletarCategoria() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  const buscaExecutada = useRef(false); // Rastreia se a busca já foi executada

  const alertaExibido = useRef(false);

  async function buscarCategoriaPorId(id: string) {
    console.log("Buscando produto com ID:", id);
    try {
      await listar(`/categorias/id/${id}`, setCategoria);
      console.log("Categoria carregada:", categoria);
    } catch (error: unknown) {
      console.error("Erro ao buscar categoria:", error);
      ToastAlerta("Erro ao buscar categoria!", "erro");
      retornar();
    }
  }

  useEffect(() => {
    if (token === "" && !alertaExibido.current) {
      ToastAlerta("Você precisa estar logado", "info");
      alertaExibido.current = true;
      navigate("/login");
    }
  }, [token]);

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
        handleLogout();
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

  if (!categoria.nome_categoria) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          strokeColor="#FF6F61"
          strokeWidth="5"
          width="50"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F0] p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className='text-3xl md:text-4xl text-center my-4 text-[#FF6F61] font-bold'>Deletar Categoria</h1>

        <p className='text-center text-[#333333] mb-4 md:mb-6'>
          Você tem certeza de que deseja apagar a categoria a seguir?
        </p>

        <div className='border border-[#FFD166] rounded-lg overflow-hidden bg-white w-full'>
          <header className='py-3 px-4 bg-[#FFD166] text-[#333333] font-bold text-xl md:text-2xl text-center'>
            {categoria.nome_categoria}
          </header>

          <div className="p-4 flex flex-col items-center">
            <img
              src={categoria.icone}
              alt={categoria.nome_categoria}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-cover rounded-lg"
            />
            <p className="text-[#333333] mt-3">
              <span className="font-semibold">Nome:</span>{" "}{categoria.nome_categoria}
            </p>
            <p className="text-[#333333] text-center">
              <span className="font-semibold">Descrição:</span>{" "}
              {categoria.descricao}
            </p>
          </div>

          {/* Botões lado a lado na parte inferior */}
          <div className="flex mt-4">
            <button
              className="flex-1 bg-[#FFD166] hover:bg-[#FFA500] text-[#333] font-bold py-3 rounded-bl-lg transition"
              onClick={retornar}
            >
              Não, voltar
            </button>
            <button
              className="flex-1 bg-[#FF6F61] hover:bg-[#E65A50] text-white font-bold py-3 rounded-br-lg transition flex items-center justify-center"
              onClick={deletarCategoria}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  width="24"
                  visible={true}
                />
              ) : (
                "Sim, deletar"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;