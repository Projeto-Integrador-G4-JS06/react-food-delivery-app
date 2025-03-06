import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CardProdutosProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutosProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-100 h-auto sm:w-139 mx-auto m-6 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-lg flex drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Div para o conteúdo do card */}
      <div className="flex flex-col w-60 justify-between gap-y-2">
        <h2 className="text-xl font-bold text-gray-800 font-heading">
          {produto.nome_produto}
        </h2>
        <p className="text-gray-600 text-sm text-right font-body">
          {produto.descricao}
        </p>
        {/* Preço ajustado com mt-auto */}
        <p className="text-lg font-semibold text-gray-700 mt-auto text-right">
          R$ {produto.preco}
        </p>
        {/* Botão sem muito espaçamento extra */}
        <button className="bg-[#CD533B] hover:bg-[#b7452f] text-white py-2 rounded-4xl transition font-body">
          Adicionar ao carrinho
        </button>
      </div>

      {/* Div para a imagem e botões */}
      <div className="ml-4 relative min-w-[66px] min-h-[66px]">
        <div className="relative group">
          <img
            src={produto.foto}
            alt={produto.nome_produto}
            className="w-66 h-66 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
        </div>

        <div
          className={`absolute top-2 right-2 flex gap-2 transition-all duration-700 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition">
            {" "}
            <Link to={`/atualizarproduto/${produto.id}`}>
              <Pencil size={28} />
            </Link>
          </button>
          <Link to={`/produto/${produto.id}`}>
            <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
              <Trash size={28} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;
