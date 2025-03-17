import { useContext } from "react";
import { CartContext, Items } from "../../contexts/CartContext";

interface CardProdutosProps {
  item: Items;
}

function CardCart({ item }: CardProdutosProps) {
  const { adicionarItem, removerItem } = useContext(CartContext);

  return (
    <>
      <div className="xl:grid xl:grid-cols-4 xl:gap-2 xl:py-4 flex flex-col items-center justify-center gap-4 my-2">
        <div className="w-fit-content m-5 mt-3 mb-3">
          <img
            src={item.foto}
            className="w-48 h-48 rounded-lg object-cover lg:w-90 lg:h-64 transition-opacity duration-300"
            alt={item.nome_produto}
          />
        </div>
        <div className="flex items-center justify-center text-center font-medium mx-2 dark:text-white">
          {item.nome_produto}
        </div>
        <div className="flex items-center justify-center gap-2 mb-1 text-black dark:text-white">
          <button
            className="border-2 w-6 h-6 rounded-md flex items-center justify-center hover:cursor-pointer"
            onClick={() => removerItem(item.id)}
          >
            <p className="dark:text-gray-300">-</p>
          </button>
          <p className="mx-2 w-8 text-center">{item.quantidade}</p>
          <button
            className="border-2 w-6 h-6 rounded-md flex items-center justify-center hover:cursor-pointer"
            onClick={() => adicionarItem(item.id)}
          >
            <p className="dark:text-gray-300">+</p>
          </button>
        </div>
        <div className="flex items-center justify-center mb-1 dark:text-white">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.preco)}
        </div>
      </div>
    </>
  );
}

export default CardCart;
