import { useContext, useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const { usuario, handleLogout } = useContext(AuthContext);
  
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      await listar("/produtos/all", setProdutos);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("Erro ao carregar produtos.");
      }
    } finally {
      setIsLoading(false); // Finaliza o carregamento, independentemente do resultado
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
  <>
    <div className="sm:p-16 flex flex-col w-screen justify-center items-end sm:flex-row sm:justify-between bg-[#646F4B] h-[8.18rem] sm:items-center ">
            <div className="hidden sm:block mr-6 text-white text-3xl ">
              Produtos
            </div>
            <div className="mr-12 mb-2">
              <button
                type="submit"
                className="font-heading mt-4 rounded-lg bg-[#CD533B] text-white h-13 w-55"
              >
                <Link to={'/cadastrarproduto'}> Cadastrar Produto</Link>
              </button>
            </div>
          </div>
    <div className="">
      {/* Exibe o loading enquanto os produtos estão sendo carregados */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#FF6F61"/>
        </div>
      )}

      {/* Renderiza os componentes apenas quando o carregamento terminar */}
      {!isLoading && produtos.length > 0 && (
        <>
          

          <div className="flex justify-center bg-[#F6EED9] ">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 gap-y-0 gap-x-8">
                {produtos.map((produto) => (
                  <CardProdutos key={produto.id} produto={produto} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </> );
}

export default ListaProdutos;
