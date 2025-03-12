import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";
import { Link } from "react-router-dom";

interface CardProdutosProps {
  produto: Produto;
}

const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== ""
    ? icone
    : "https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/PedeAi_secundaria.svg?updatedAt=1741648622817";
};

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <section className="overflow-hidden border bg-white border-gray-200 rounded-2xl drop-shadow-xl h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
      {/* Botões para mobile */}
      <div className="flex justify-end gap-2 m-4 lg:hidden">
        <Link to={`/atualizarproduto/${produto.id}`}>
          <Pencil size={24} />
        </Link>
        <Link to={`/produto/${produto.id}`}>
          <Trash size={24} />
        </Link>
      </div>

      {/* Conteúdo do card */}
      <div className="container flex flex-col justify-center items-center gap-2 p-4 text-center lg:flex-row lg:items-start lg:text-center">
        {/* Div para a imagem e botões (hover effect a partir de lg) */}
        <div className="lg:flex lg:order-2 relative group">
          <img
            src={getImagemSrc(produto?.foto)}
            alt={produto.nome_produto}
            className="w-48 h-48 rounded-lg object-cover lg:w-70 lg:h-64 transition-opacity duration-300"
          />

          {/* Overlay escuro ao passar o mouse (apenas a partir de lg) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>

          {/* Botões no canto superior direito (apenas a partir de lg) */}
          <div className="absolute top-2 right-2 hidden lg:flex gap-2 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700">
            <Link to={`/atualizarproduto/${produto.id}`}>
              <button className="bg-gray-700/75 text-white p-2 rounded-full hover:bg-gray-800/75 transition hover:cursor-pointer">
                <Pencil size={28} />
              </button>
            </Link>
            <Link to={`/produto/${produto.id}`}>
              <button className="bg-gray-700/75 text-white p-2 rounded-full hover:bg-gray-800/75 transition hover:cursor-pointer">
                <Trash size={28} />
              </button>
            </Link>
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="lg:flex-1 lg:order-1 lg:h-64 flex flex-col items-center">
          <h2 className="text-base xl:text-lg font-medium text-gray-800 font-[family-name:var(--font-heading)] mx-4">
            {produto.nome_produto}
          </h2>

          <div className="flex-1 flex flex-col justify-evenly">
            <p className="text-sm xl:text-base text-gray-600 font-[family-name:var(--font-body)] m-2">
              {produto.descricao}
            </p>
            <p className="text-base xl:text-lg font-semibold text-gray-700 font-[family-name:var(--font-body)] m-4">
              R$ {produto.preco.toFixed(2)}
            </p>
          </div>

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
