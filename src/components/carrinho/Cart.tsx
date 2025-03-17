import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CardCart from "./CardCart";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "./Cart.css";

function Cart() {
  const { items, quantidadeItems, valorTotal, limparCart } =
    useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [finalPosition, setFinalPosition] = useState(100);
  const navigate = useNavigate();

  const handleFinalizar = () => {
    setIsLoading(true);

    Swal.fire({
      title: "Obrigado por Comprar no PedeAí!",
      text: "Sua compra já está sendo preparada, e logo sairá para a entrega. Bom apetite! 😋",
      icon: "success",
      confirmButtonText: "Voltar",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/produtos");
      }
    });

    setTimeout(() => {
      setIsLoading(false);
      limparCart();
    }, 1200);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] bg-opacity-75 z-[1070] dark:bg-dark-gray-100">
          <span className="loader"></span>
        </div>
      )}

      <div className="w-full bg-[#ECE9E3] dark:bg-dark-gray-200 py-6">
        <div className="container mx-auto flex justify-between items-center py-2 px-8">
          <p className="hidden sm:block text-2xl font-medium font-heading text-gray-600 dark:text-white">
            Carrinho
          </p>
          <Link to={`/produtos`} className="flex justify-end w-full sm:w-auto">
            <button
              type="submit"
              className="font-quicksand font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer dark:bg-dark-red-700 dark:hover:bg-dark-red-800"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>

      {quantidadeItems > 0 ? (
        <div className="container mx-auto px-4 sm:px-8 my-4 mb-10 flex flex-col lg:flex-row justify-between gap-4 font-heading min-h-[80vh]">
          {/* Resumo do Pedido - Primeiro no Mobile */}
          <div className="order-1 lg:order-2 w-full lg:w-[35%] h-auto flex flex-col mt-10 justify-start items-center gap-10">
            <div className="h-auto flex flex-col w-full rounded-2xl font-heading drop-shadow-lg">
              <div className="flex flex-col w-full rounded-2xl bg-white font-heading drop-shadow-lg dark:bg-dark-gray-200">
                <div className="bg-[#E02D2D] w-full flex items-center justify-center h-auto rounded-t-2xl py-4 dark:bg-[#D84343]">
                  <p className="font-heading text-xl xl:text-2xl text-white">
                    Resumo do Pedido
                  </p>
                </div>
                <div className="flex flex-col mx-4 sm:mx-16 lg:mx-4 mt-5 gap-4 text-base md:text-lg dark:text-white">
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
                    <p>Frete</p>
                    <p>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(0.0)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total de Itens</p>
                    <p>{quantidadeItems}</p>
                  </div>

                  <div className="w-full h-[0.1px] bg-zinc-300 dark:bg-gray-500"></div>
                  <div className="flex justify-between mt-2 mb-5 font-bold">
                    <p className="font-heading text-lg xl:text-xl">Total</p>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(valorTotal)}
                  </div>
                  <div className="flex justify-center mt-2 mb-5">
                    <button
                      className="font-quicksand font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white p-2 w-45 hover:cursor-pointer dark:bg-[#D84343] dark:hover:bg-[#D32F2F] dark:active:[#C62828] text-base xl:text-lg"
                      onClick={handleFinalizar}
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itens do Carrinho */}
          <div className="order-2 lg:order-1 w-full lg:w-[60%] mt-10 border-1 border-zinc-600 rounded-2xl drop-shadow-lg bg-white dark:bg-dark-gray-200 h-fit">
            <div className="overflow-hidden py-4 flex xl:grid xl:grid-cols-4 text-center justify-center items-center font-bold border-b-1 border-zinc-400 text-[#6D6D6D] dark:text-white">
              <div></div>
              <div className="hidden xl:block">
                <p>Nome</p>
              </div>
              <div>
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
                {index < items.length - 1 && (
                  <div className="bg-zinc-400 w-48/50 h-[1px] mx-auto"></div>
                )}
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="container h-full min-h-[80vh] mx-auto px-4 sm:px-8 my-4 mb-10 text-center flex-col flex items-center gap-4 text-gray-600 dark:text-white">
          <p className="my-8 text-2xl font-medium font-heading text-center text-gray-600 dark:text-white">
            O carrinho está vazio!
          </p>
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: finalPosition }}
            transition={{
              repeat: 2,
              repeatType: "reverse",
              duration: 1,
              ease: "linear",
            }}
            onAnimationComplete={() => {
              setFinalPosition(0);
            }}
          >
            <img
              src="https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/Carrinho.png?updatedAt=1742154591978"
              className="w-48 h-48 rounded-lg object-cover lg:w-80 lg:h-80 transition-opacity duration-300 my-15"
              alt="Foto do carrinho"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Cart;