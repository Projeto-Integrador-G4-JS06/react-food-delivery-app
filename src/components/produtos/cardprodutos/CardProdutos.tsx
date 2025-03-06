import {
  Calendar,
  CurrencyCircleDollar,
  HourglassMedium,
  MapPin,
  Pencil,
  Trash,
} from "@phosphor-icons/react";

import { Link } from "react-router-dom";
import Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <div className="flex flex-col my-10 mx-10 overflow-hidden bg-gray-50 w-[13.5rem] h-[25rem] rounded-lg">
      <div className="flex  border-amber-500 bg-orange py-1.5 justify-between pt-2 pr-2">
        <p className="text-[#293241] mx-1.5">Produto</p>
        {/* <Link to={`/editarproduto/${produto.id}`}> */}
        <div className="flex ">
          <Pencil
            size={24}
            color="#293241"
            className="mr-1 hover:fill-teal-800"
          />
          {/* </Link> */}
          {/* <Link to={`/deletarproduto/${produto.id}`}> */}
          <Trash
            size={24}
            color="#293241"
            className="mr-1 hover:fill-red-700"
          />
          {/* </Link> */}
        </div>
      </div>
      <div className="p-4 flex flex-col items-start ">
        <p className="text-sm flex font-poppins">
          <MapPin size={20} color="#293241" />
          Partida:
        </p>
        <p className="text-sm font-poppins">
          {produto.nome_produto} - {produto.preco}
        </p>
        <br />
        <p className="text-sm flex font-poppins">
          <MapPin size={20} color="#293241" />
          Destino:
        </p>
        <p className="text-sm font-poppins">
          {produto.descricao} - {produto.nutri_score}
        </p>
        <br />
        <p className="text-sm flex font-poppins">
          <Calendar size={20} color="#293241" />
          Data:
        </p>
        <p className="text-sm font-poppins">
          {new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(produto.criado_em))}
        </p>
        <br />
        <p className="text-sm flex font-poppins">
          <CurrencyCircleDollar size={20} color="#293241" />
          Preço:
        </p>
        <p className="text-sm font-poppins">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(produto.preco)}
        </p>
        <br />
        <p className="text-sm flex font-poppins">
          <HourglassMedium size={20} color="#293241" />
          Duração:
        </p>
        <p className="text-sm font-poppins">{produto.foto}</p>
      </div>
    </div>
  );
}

export default CardProduto;
