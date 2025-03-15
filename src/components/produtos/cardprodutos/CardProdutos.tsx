import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CardProdutos.css";
import { toTitleCase } from "../../../utils/stringUtils";


interface CardProdutosProps {
  produto: Produto;
  onDelete: (id: string) => void; // Adiciona a prop onDelete
}

const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== ""
    ? icone
    : "https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/PedeAi_secundaria.svg?updatedAt=1742050552057";
};

function CardProdutos({ produto, onDelete }: CardProdutosProps) {

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const navigate = useNavigate();

  const { adicionarProduto } = useContext(CartContext);

  const handleDelete = () => {
    if (!token) {
      ToastAlerta("Você precisa estar logado para deletar um produto.", "info");
      navigate("/login");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      html: `Você está prestes a deletar o produto: "<b>${toTitleCase(produto.nome_produto)}</b>".<br>Essa ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E02D2D", // Cor de fundo do botão de confirmação
      cancelButtonColor: "#F0F0F0", // Cor de fundo do botão de cancelamento
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
      background: "#ECE9E3", // Cor de fundo da modal
      customClass: {
        popup: "custom-swal-popup", // Classe para o popup
        confirmButton: "custom-confirm-button", // Classe para o botão de confirmação
        cancelButton: "custom-cancel-button", // Classe para o botão de cancelamento
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
            background: "#ECE9E3", // Cor de fundo da modal de sucesso
            confirmButtonColor: "#E02D2D", // Cor de fundo do botão de confirmação
            customClass: {
              popup: "custom-swal-popup", // Classe para o popup
              confirmButton: "custom-confirm-button", // Classe para o botão de confirmação
            },
          });
        } catch (error) {
          console.error("Erro ao deletar o produto:", error);
          Swal.fire({
            title: "Erro!",
            text: "Ocorreu um erro ao tentar deletar o produto.",
            icon: "error",
            background: "#ECE9E3", // Cor de fundo da modal de erro
            confirmButtonColor: "#E02D2D", // Cor de fundo do botão de confirmação
            customClass: {
              popup: "custom-swal-popup", // Classe para o popup
              confirmButton: "custom-confirm-button", // Classe para o botão de confirmação
            },
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

  return (
    <section className="overflow-hidden border bg-white border-gray-200 rounded-2xl drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
      {/* Botões para mobile */}
      <div className="flex justify-end gap-2 m-4 lg:hidden">
        <Link to={`/atualizarproduto/${produto.id}`}>
          <Pencil size={24} />
        </Link>
        <button onClick={handleDelete}>
          <Trash size={24} />
        </button>
      </div>

      {/* Conteúdo do card */}
      <div className="container flex flex-col justify-center items-center gap-x-5 gap-y-4 p-4 md:p-8 text-center lg:flex-row lg:items-start lg:text-center">
        {/* Div para a imagem e botões (hover effect a partir de lg) */}
        <div className="lg:flex lg:order-2 relative group">
          <img
            src={getImagemSrc(produto?.foto)}
            alt={produto.nome_produto}
            className="w-48 h-48 rounded-lg object-cover lg:w-90 lg:h-64 transition-opacity duration-300"
          />

          {/* Overlay escuro ao passar o mouse (apenas a partir de lg) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>

          {/* Botões no canto superior direito (apenas a partir de lg) */}
          <div
            className={
              "absolute top-2 right-2 hidden lg:flex gap-2 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700"
            }
          >
            <Link to={`/atualizarproduto/${produto.id}`}>
              <button className="bg-gray-700/75 text-white p-2 rounded-full hover:bg-gray-800/75 transition hover:cursor-pointer">
                <Pencil size={28} />
              </button>
            </Link>
            <button
              className="bg-gray-700/75 text-white p-2 rounded-full 
              hover:bg-gray-800/75 transition hover:cursor-pointer"
              onClick={handleDelete}
            >
              <Trash size={28} />
            </button>
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="container lg:flex lg:order-1 lg:h-64 flex flex-col items-center lg:w-full min-w-0">
          <h2 className="text-base xl:text-lg font-semibold md:font-extrabold text-gray-800 font-[family-name:var(--font-heading)] mx-2 mb-4 xl:my-0 break-words max-w-full">
            {toTitleCase(produto.nome_produto)}
          </h2>

          <div className="container flex-1 flex flex-col justify-evenly">
            <p className="text-sm xl:text-base text-gray-600 font-[family-name:var(--font-body)] break-words max-w-full">
              {produto.descricao}
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-700 font-[family-name:var(--font-body)] my-4">
              R$ {produto.preco.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              className="w-50 bg-[#E02D2D] hover:bg-[#B22222] text-white p-2 rounded-lg transition font-[family-name:var(--font-quicksand)]"
              onClick={() => adicionarProduto(produto)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </section >
  );
}

export default CardProdutos;
