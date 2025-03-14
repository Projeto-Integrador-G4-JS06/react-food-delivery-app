import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CardCart from "./CardCart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";

function Cart() {
  const { items, quantidadeItems, valorTotal, limparCart } =
    useContext(CartContext);

  const handleFinalizar = () => {
    Swal.fire({
      title: "Compra Finalizada!",
      text: "Seus produtos serão entregues em breve!",
      icon: "success",
      confirmButtonText: "Voltar ao carrinho",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
    limparCart();
  };
  return (
    <>
      <div className="w-full h-30 flex flex-col justify-center px-4 sm:px-8 items-center bg-[#ECE9E3] text-black">
        <p className=" text-3xl font-[family-name:var(--font-heading)] font-medium">
          Carrinho
        </p>
      </div>

      {quantidadeItems > 0 ? (
        <div className="container mx-auto px-4 sm:px-8 my-4 mb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 font-heading">
          <div
            className={`order-2 lg:order-1 col-span-2 w-full lg:w-[90%] mt-10 border-1 border-zinc-400 ${
              items.length > 0 ? "h-fit" : "h-min"
            } rounded-2xl drop-shadow-lg bg-white`}
          >
            <div className="overflow-hidden py-4 flex xl:grid xl:grid-cols-4 text-center justify-center items-center font-bold border-b-1 border-zinc-400 text-[#6D6D6D]">
              <div></div>
              <div className="hidden xl:block">
                <p>Nome</p>
              </div>
              <div className="">
                <p className="hidden xl:block">Quantidade</p>
                <p className="block xl:hidden">Produtos</p>
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
          <div className="order-1 lg:order-2 col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1 w-full lg:w-[80%] h-auto flex flex-col mt-10 justify-start items-center gap-10">
            <div className="h-auto sticky top-8 flex flex-col w-full rounded-2xl font-heading drop-shadow-lg">
              <div className="flex flex-col w-full rounded-2xl bg-white font-heading drop-shadow-lg">
                <div className="bg-[#E02D2D] w-full flex items-center justify-center h-auto rounded-t-2xl py-4">
                  <p className="font-heading text-xl sm:text-2xl text-white">
                    Resumo do Pedido
                  </p>
                </div>
                <div className="flex flex-col mx-4 sm:mx-16 lg:mx-4 mt-5 gap-4 text-lg sm:text-xl">
                  <div className="flex justify-between gap-4">
                    <p className="">Produtos</p>
                    <p>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(valorTotal)}
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="">Frete</p>
                    <p>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(0.0)}
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="">Itens</p>
                    <p>x{quantidadeItems}</p>
                  </div>

                  <div className="w-full h-[0.1px] bg-zinc-300"></div>
                  <div className="flex justify-between mt-2 mb-5 font-bold">
                    <p className="font-heading">Total</p>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(valorTotal)}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  className="w-[70%] bg-[#E02D2D] hover:bg-[#B22222] text-white font-bold text-xl sm:text-2xl
                                            drop-shadow-2xl    p-2 rounded-lg transition font-[family-name:var(--font-quicksand)]"
                  onClick={handleFinalizar}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-8 my-4 mb-10 text-center flex-col flex items-center jus gap-4 text-gray-600">
          <p className="text-2xl font-[family-name:var(--font-heading)] font-medium">
            O carrinho está vazio
          </p>

          <Link
            to={`/home`}
            className="flex justify-center items-center w-full sm:w-auto"
          >
            <button
              type="submit"
              className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer"
            >
              Voltar
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
