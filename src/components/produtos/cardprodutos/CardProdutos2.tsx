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
      className="w-100 h-auto sm:w-139 mx-auto m-6 bg-white border border-gray-200 rounded-xl p-4 shadow-lg flex drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Div para o conteúdo do card */}
      <div className="flex flex-col justify-center text-center w-60 gap-4">
        <h2 className="text-xl font-bold text-gray-800 font-heading">
          {produto.nome_produto}
        </h2>
        <p className="text-gray-600 text-sm font-body">
          {produto.descricao}
        </p>
        {/* Preço ajustado com mt-auto */}
        <p className="text-lg font-semibold text-gray-700 mt-auto items-center">
          R$ {produto.preco}
        </p>
        {/* Botão sem muito espaçamento extra */}
        <button className="w-full bg-[#FF3333] hover:bg-[#b7452f] text-white py-2 rounded-lg transition font-body">
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
          className={`absolute top-2 right-2 flex gap-2 transition-all duration-700 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <Link to={`/atualizarproduto/${produto.id}`}>
            <button className="bg-[#6B8EFF] text-white p-2 rounded-full hover:bg-[#526DC4] transition hover:cursor-pointer">
              {" "}
              <Pencil size={28} />
            </button>
          </Link>
          <Link to={`/produto/${produto.id}`}>
            <button className="bg-[#FF6F61] text-white p-2 rounded-full hover:bg-[#E65A4D] transition hover:cursor-pointer">
              <Trash size={28} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;
