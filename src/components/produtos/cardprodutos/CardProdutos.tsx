import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";
import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./CardProduto.css";

interface CardProdutosProps {
  produto: Produto;
  onDelete: (id: string) => void; // Adiciona a prop onDelete
}

function CardProdutos({ produto, onDelete }: CardProdutosProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!token) {
      ToastAlerta("Você precisa estar logado para deletar um produto.", "info");
      navigate("/login");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      html: `Você está prestes a deletar o produto "<b>${produto.nome_produto}</b>".<br>Essa ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E02D2D",
      cancelButtonColor: "#F0F0F0",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
      background: "#F5E9D9",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletarProduto(produto.id.toString());
          onDelete(produto.id.toString()); // Chama a função onDelete passada pelo componente pai
          Swal.fire({
            title: "Deletado!",
            text: "O produto foi deletado com sucesso.",
            icon: "success",
            background: "#F5E9D9",
            confirmButtonColor: "#E02D2D",
          });
        } catch (error) {
          Swal.fire({
            title: "Erro!",
            text: "Ocorreu um erro ao tentar deletar o produto.",
            icon: "error",
            background: "#F5E9D9",
            confirmButtonColor: "#E02D2D",
          });
        }
      }
    });
  };

  const deletarProduto = async (id: string) => {
    try {
      await deletar(`/produtos/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Produto deletado com sucesso!", "sucesso");
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar produto!", "erro");
      }
    }
  };
  const getImagemSrc = (icone?: string) => {
    return icone && icone.trim() !== ""
      ? icone
      : "https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/PedeAi_secundaria.svg?updatedAt=1741648622817";
  };

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
        <p className="text-lg font-semibold text-gray-700 mt-auto text-right">
          R$ {produto.preco}
        </p>
        <button className="bg-[#CD533B] hover:bg-[#b7452f] text-white py-2 rounded-4xl transition font-body">
          Adicionar ao carrinho
        </button>
        <div className="overflow-hidden border bg-white border-gray-200 rounded-2xl drop-shadow-xl h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          
          {/* Botões para mobile */}
          <div className="flex justify-end gap-2 m-4 lg:hidden">
            <Link to={`/atualizarproduto/${produto.id}`}>
              <Pencil size={24} />
            </Link>
            <Link to={`/produto/${produto.id}`}>
              <Trash size={24} />
            </Link>
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
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <button className="bg-[#FFD166] text-black p-2 rounded-full hover:bg-[#E6B952] transition hover:cursor-pointer">
                {" "}
                <Link to={`/atualizarproduto/${produto.id}`}>
                  <Pencil size={28} />
                </Link>
              </button>
              <button
                className="bg-[#FF6F61] text-black p-2 rounded-full hover:bg-[#E65A4D] transition hover:cursor-pointer"
                onClick={handleDelete}
              >
                <Trash size={28} />
              </button>
            </div>
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
    </div>
  );
}

export default CardProdutos;
