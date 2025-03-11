import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";
import { Link } from "react-router-dom";

interface CardProdutosProps {
  produto: Produto;
}

const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== '' ? icone : 'https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/PedeAi_secundaria.svg?updatedAt=1741648622817';
};

function CardProdutos({ produto }: CardProdutosProps) {

  return (
    <section className="overflow-hidden border bg-white border-gray-200 rounded-2xl drop-shadow-xl h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="flex justify-end gap-2 m-4 lg:hidden">
        <Link to={`/atualizarproduto/${produto.id}`}>
          <Pencil size={24} />
        </Link>
        <Link to={`/produto/${produto.id}`}>
          <Trash size={24} />
        </Link>
      </div>
      <div className="container flex flex-col justify-center items-center gap-2 p-4 text-center lg:flex-row lg:items-start lg:text-center">
        <div className="lg:flex lg:order-2">
          <img
            src={getImagemSrc(produto?.foto)}
            alt={produto.nome_produto}
            className="w-48 h-48 rounded-lg object-cover lg:w-64 lg:h-68"
          />
        </div>
        <div className="lg:flex-1 lg:order-1 lg:h-64 flex flex-col items-center my-2">
          {/* Nome do produto (sempre no topo) */}
          <h2 className="text-base xl:text-lg font-medium text-gray-800 font-[family-name:var(--font-heading)] mx-4">
            {produto.nome_produto}
          </h2>

          {/* Descrição e preço (espaço proporcional no meio) */}
          <div className="flex-1 flex flex-col justify-evenly">
            <p className="text-sm xl:text-base text-gray-600 font-[family-name:var(--font-body)] m-2">
              {produto.descricao}
            </p>
            <p className="text-base xl:text-lg font-semibold text-gray-700 font-[family-name:var(--font-body)] m-4">
              R$ {produto.preco.toFixed(2)}
            </p>
          </div>

          {/* Botão (centralizado na base) */}
          <div className="flex justify-center">
            <button className="w-50 bg-[#E02D2D] hover:bg-[#B22222] text-white py-2 rounded-lg transition font-[family-name:var(--font-quicksand)]">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardProdutos;