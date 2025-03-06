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

  //   useEffect(() => {
  //     if (token === "") {
  //       ToastAlerta(
  //         "Você precisa estar logado para acessar esta página.",
  //         "info"
  //       );
  //       navigate("/login");
  //     }
  //   }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Produto deletado com sucesso!", "sucesso");
      navigate("/postagens"); // Redireciona após a deleção
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/produtos");
  }

  if (!produto.nome_produto) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          strokeColor="#FF6F61"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FFF7F0] p-4">
      <div className="container w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-center my-6 text-[#FF6F61] font-bold">
          Deletar Produto
        </h1>

        <p className="text-center text-[#333333] mb-6">
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>

        <div className="border border-[#FFD166] rounded-lg overflow-hidden bg-white w-full">
          <header className="py-3 px-6 bg-[#FFD166] text-[#333333] font-bold text-2xl text-center">
            {produto.nome_produto} {/* Exibe o nome do produto */}
          </header>
          <div className="p-6 flex flex-col items-center">
            <img
              src={produto.foto}
              alt={produto.nome_produto} // Exibe a foto do produto
              className="w-48 h-48 object-cover mb-4 rounded-lg"
            />
            <p className="text-[#333333]">
              <span className="font-semibold">Preço:</span> R$ {produto.preco}{" "}
              {/* Exibe o preço */}
            </p>
            <p className="text-[#333333]">
              <span className="font-semibold">Status:</span>
              {produto.status} {/* Exibe o status */}
            </p>
            <p className="text-[#333333]">
              <span className="font-semibold">Categoria:</span>{" "}
              {produto.categoria?.nome_categoria} {/* Exibe a categoria */}
            </p>
          </div>
          <div className="flex">
            {/* Botão para cancelar a exclusão e voltar */}
            <button
              className="flex-1 bg-[#FFD166] hover:bg-[#FFA500] text-[#333333] font-bold py-3 transition-colors"
              onClick={retornar}
            >
              Não, voltar
            </button>
            {/* Botão para confirmar a exclusão */}
            <button
              className="flex-1 bg-[#FF6F61] hover:bg-[#E65A50] text-white font-bold py-3 flex items-center justify-center transition-colors"
              onClick={deletarProduto}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>Sim, deletar</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;
