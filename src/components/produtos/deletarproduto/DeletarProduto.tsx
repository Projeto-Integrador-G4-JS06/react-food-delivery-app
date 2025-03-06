import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Produto from "../../../models/Produto";

function DeletarProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      console.error("Erro ao buscar produto:", error);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);
    try {
      await deletar(`/produtos/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Produto deletado com sucesso!", "sucesso");
      navigate("/postagens");
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);
    }
    setIsLoading(false);
  }

  function retornar() {
    navigate("/produtos");
  }

  // if (!produto.nome_produto) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <RotatingLines strokeColor="#FF6F61" strokeWidth="5" width="50" visible={true} />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F0] p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl md:text-4xl text-center my-4 text-[#FF6F61] font-bold">
          Deletar Produto
        </h1>

        <p className="text-center text-[#333333] mb-4 md:mb-6">
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>

        <div className="border border-[#FFD166] rounded-lg overflow-hidden bg-white w-full">
          <header className="py-3 px-4 bg-[#FFD166] text-[#333333] font-bold text-xl md:text-2xl text-center">
            {produto.nome_produto}
          </header>

          <div className="p-4 flex flex-col items-center">
            <img
              src={produto.foto}
              alt={produto.nome_produto}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-cover rounded-lg"
            />
            <p className="text-[#333333] mt-3">
              <span className="font-semibold">Preço:</span> R$ {produto.preco}
            </p>
            <p className="text-[#333333]">
              <span className="font-semibold">Status:</span> {produto.status}
            </p>
            <p className="text-[#333333]">
              <span className="font-semibold">Categoria:</span> {produto.categoria?.nome_categoria}
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
              className="flex-1 bg-[#FF6F61] hover:bg-[#E65A50] text-white font-bold py-3 rounded-br-lg transition"
              onClick={deletarProduto}
            >
              {isLoading ? (
                <RotatingLines strokeColor="white" strokeWidth="5" width="24" visible={true} />
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

export default DeletarProduto;

