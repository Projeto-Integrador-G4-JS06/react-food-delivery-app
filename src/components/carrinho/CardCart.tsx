import { Minus, Plus } from "@phosphor-icons/react";
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
        <div className="w-fit-content ml-4">
          <img
            src={item.foto}
            className="rounded-2xl ml-1 w-64 h-40 drop-shadow-lg"
            alt={item.nome_produto}
          />
        </div>
        <div className="flex items-center justify-center text-center font-medium mx-2">
          {item.nome_produto}
        </div>
        <div className="flex items-center justify-center gap-2 text-black">
          <button
            className="border-2 w-6 h-6 rounded-md flex items-center justify-center hover:cursor-pointer"
            onClick={() => removerItem(item.id)}
          >
            <p>-</p>
          </button>
          <p className="mx-2 w-8 text-center">{item.quantidade}</p>
          <button
            className="border-2 w-6 h-6 rounded-md flex items-center justify-center hover:cursor-pointer"
            onClick={() => adicionarItem(item.id)}
          >
            <p>+</p>
          </button>
        </div>
        <div className=" flex items-center justify-center">
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
