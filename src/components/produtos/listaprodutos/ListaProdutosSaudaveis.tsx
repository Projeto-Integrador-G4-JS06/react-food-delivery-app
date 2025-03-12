import { useContext, useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ClipLoader } from "react-spinners";

function ListaProdutosSaudaveis() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      await listar("/produtos/healthy", setProdutos);
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
    <div>
      {/* Exibe o loading enquanto os produtos estão sendo carregados */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#FF6F61" />
        </div>
      )}

      {/* Renderiza os componentes apenas quando o carregamento terminar */}
      {!isLoading && produtos.length > 0 && (
        <>


          <div className="flex justify-center">
          <div className="container w-full mx-auto px-4 flex flex-col 
          justify-center items-center gap-10">
              {/* Primeira linha com card e imagem */}
              <div className="grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-40">
                <div className="order-2 sm:order-2">
                  <CardProdutos produto={produtos[0]} />
                </div>
                <div className="flex items-center justify-center sm:order-2 order-1">
                  <img
                    src="https://ik.imagekit.io/p2qsb5ajs/food_delivery/Eating%20healthy%20food-amico.svg?updatedAt=1741286199584" // Substitua pela URL da imagem desejada
                    alt="Imagem"
                    className=" max-sm:object-fill  w-89 h-89 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Restante dos produtos */}
              <div className="grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-40">
                {produtos.slice(1).map((produto) => (
                  <CardProdutos key={produto.id} produto={produto} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListaProdutosSaudaveis;