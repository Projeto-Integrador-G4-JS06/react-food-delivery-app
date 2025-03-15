import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CardCart from "./CardCart";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";

function Cart() {
  const { items, quantidadeItems, valorTotal, limparCart } =
    useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleFinalizar = () => {
    setIsLoading(true); // Ativa o loader

    // Exibe o modal do SweetAlert2
    Swal.fire({
      title: "Obrigado por Comprar no PedeAí!",
      text: "Sua compra já está sendo preparada, e logo sairá para a entrega. Bom apetite! 😋",
      icon: "success",
      confirmButtonText: "Voltar",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    }).then((result) => {
      // Quando o usuário clicar em "Voltar"
      if (result.isConfirmed) {
        navigate("/produtos"); // Redireciona para a rota /produtos
      }
    });

    // Desativa o loader após 1.9 segundos e limpa o carrinho
    setTimeout(() => {
      setIsLoading(false);
      limparCart();
    }, 1200);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] bg-opacity-75 z-[1070]">
          <span className="loader"></span>
        </div>
      )}

      <div className="w-full bg-[#ECE9E3] py-6">
        <div className="container mx-auto flex justify-between items-center py-2 px-8">
          <p className="hidden sm:block text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600">
            Carrinho
          </p>
          <Link to={`/produtos`} className="flex justify-end w-full sm:w-auto">
            <button
              type="submit"
              className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>

      {quantidadeItems > 0 ? (
        <div className="container mx-auto px-4 sm:px-8 my-4 mb-10 flex justify-between gap-4 font-heading">
          <div
            className={`order-2 lg:order-1 w-full lg:w-[60%] mt-10 border-1 border-zinc-400 ${items.length > 0 ? "h-fit" : "h-min"
              } rounded-2xl drop-shadow-lg bg-white`}
          >
            <div className="overflow-hidden py-4 flex xl:grid xl:grid-cols-4 text-center justify-center items-center font-bold border-b-1 border-zinc-400 text-[#6D6D6D]">
              <div></div>
              <div className="hidden xl:block">
                <p>Nome</p>
              </div>
              <div className="">
                <p className="hidden xl:block">Quantidade</p>
                <p className="block xl:hidden text-xl">Produtos</p>
              </div>
              <div className="hidden xl:block">
                <p>Preço</p>
              </div>
            </div>
            {items.map((produto, index) => (
              <>
                <CardCart key={produto.id} item={produto} />
                {/* Linha separadora */}
                {index < items.length - 1 && (
                  <div className="bg-zinc-400 w-48/50 h-[1px] mx-auto"></div>
                )}
              </>
            ))}
          </div>
          <div className="order-1 lg:order-2 w-full lg:w-[35%] h-auto flex flex-col mt-10 justify-start items-center gap-10">
            <div className="h-auto sticky top-8 flex flex-col w-full rounded-2xl font-heading drop-shadow-lg">
              <div className="flex flex-col w-full rounded-2xl bg-white font-heading drop-shadow-lg">
                <div className="bg-[#E02D2D] w-full flex items-center justify-center h-auto rounded-t-2xl py-4">
                  <p className="font-heading text-xl text-white">
                    Resumo do Pedido
                  </p>
                </div>
                <div className="flex flex-col mx-4 sm:mx-16 lg:mx-4 mt-5 gap-4 text-lg sm:text-base">
                  <div className="flex justify-between">
                    <p>Produtos</p>
                    <p>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(valorTotal)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Frete</p>
                    <p>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(0.0)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Total de Itens</p>
                    <p>{quantidadeItems}</p>
                  </div>

                  <div className="w-full h-[0.1px] bg-zinc-300"></div>
                  <div className="flex justify-between mt-2 mb-5 font-bold text-xl">
                    <p className="font-heading">Total</p>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(valorTotal)}
                  </div>
                  <div className="flex justify-center mt-2 mb-5">
                    <button
                      className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white p-2 w-45 hover:cursor-pointer"
                      onClick={handleFinalizar}
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-8 my-4 mb-10 text-center flex-col flex items-center jus gap-4 text-gray-600">
          <p className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
            O carrinho está vazio!
          </p>
        </div>
      )}
    </>
  );
}

export default Cart;