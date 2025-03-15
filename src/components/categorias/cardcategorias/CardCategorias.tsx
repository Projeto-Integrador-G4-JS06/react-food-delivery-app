import { Pencil, Trash } from '@phosphor-icons/react';
import Categoria from '../../../models/Categoria';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import { deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import Swal from 'sweetalert2';
import "./CardCategorias.css";
import { toTitleCase } from "../../../utils/stringUtils";

interface CardCategoriaProps {
  categoria: Categoria;
  onDelete: (id: string) => void; // Adiciona a prop onDelete
}

// Função para garantir que o src da imagem sempre seja válido
const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== '' ? icone : 'https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Categorias/meal.png?updatedAt=1742050394154';
};

function CardCategorias({ categoria, onDelete }: CardCategoriaProps) {
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
      html: `Você está prestes a deletar a categoria: "<b>${toTitleCase(categoria.nome_categoria)}</b>".<br>Essa ação não pode ser desfeita!`,
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
          await deletarCategoria(categoria.id.toString());
          onDelete(categoria.id.toString()); // Chama a função onDelete passada pelo componente pai
          Swal.fire({
            title: "Deletada!",
            text: "A categoria foi deletada com sucesso.",
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
            text: "Ocorreu um erro ao tentar deletar a categoria.",
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

  const deletarCategoria = async (id: string) => {
    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Categoria deletada com sucesso!", "sucesso");
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar categoria!", "erro");
      }
    }
  };

  return (
    <div className='flex flex-col overflow-hidden border border-gray-200 rounded-2xl drop-shadow-xl h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer'>
      <header className='flex justify-start gap-4 items-center px-4 text-2xl text-white bg-[#E02D2D] font-heading min-h-[4rem]'>
        <img
          src={getImagemSrc(categoria?.icone)} // Usando a função getImagemSrc
          alt="Category Icon"
          className="my-2 h-10 max-w-75"
        />
        <h2 className='font-normal text-base lg:text-lg text-white font-[family-name:var(--font-heading)] break-all whitespace-normal max-w-full text-center'>
          {toTitleCase(categoria.nome_categoria)}
        </h2>
      </header>
      <div className="flex-1 overflow-y-auto p-4 bg-white flex justify-center items-center">
        <p className='text-base lg:text-base text-center p-4 bg-white font-[family-name:var(--font-body)] break-words whitespace-normal max-w-full'>
          {categoria.descricao}
        </p>
      </div>

      <div className="flex justify-end gap-4 bg-white py-2 px-2">
        <Link to={`/editarcategoria/${categoria.id}`} className="inline-flex items-center">
          <button>
            <Pencil size={28} className='text-black font-bold  active:text-[#A64B4B] cursor-pointer' />
          </button>
        </Link>
        <button onClick={handleDelete} className='mx-2'>
          <Trash size={28} className='text-black font-bold active:text-[#A64B4B] cursor-pointer' />
        </button>
      </div>
    </div>
  );
}

export default CardCategorias;