import { Link, useNavigate } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { Pencil, Trash } from '@phosphor-icons/react';
import { deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

interface CardCategoriaProps {
  categoria: Categoria;
  onDelete: (id: string) => void;
}

// Função para garantir que o src da imagem sempre seja válido
const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== '' ? icone : 'https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/meal.png?updatedAt=1741281654261';
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
      html: `Você está prestes a deletar a categoria "<b>${categoria.nome_categoria}</b>".<br>Essa ação não pode ser desfeita!`,
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
            title: "Deletado!",
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
    <div className='flex flex-col justify-between overflow-hidden border border-yellow-400 rounded-2xl drop-shadow-xl h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer'>
      <header className='flex justify-start gap-4 items-center px-4 text-2xl text-white bg-yellow-500 font-heading'>
        <img
          src={getImagemSrc(categoria?.icone)} // Usando a função getImagemSrc
          alt="Category Icon"
          className="my-2 h-10 max-w-75"
        />
        <p className='text-base lg:text-lg text-gray-800 font-medium font-[family-name:var(--font-heading)]'>{categoria.nome_categoria}</p>
      </header>
      <p className='text-sm lg:text-base flex justify-center text-center items-center h-full p-8 bg-[var(--color-beige-600)] font-[family-name:var(--font-body)]'>{categoria.descricao}</p>

      <div className="flex">
        {/* Versão para mobile */}
        <Link to={`/editarcategoria/${categoria.id}`}
          className='flex items-center justify-center w-full py-2 bg-emerald-700 text-slate-50 hover:bg-emerald-500'>
          <button className="md:hidden"><Pencil size={24} className='text-white' /></button>
          <button className="hidden md:block text-s font-semibold">Editar</button>
        </Link>

        {/* Versão para mobile */}
        <div
          className='flex items-center justify-center w-full bg-red-700 text-slate-50 hover:bg-red-600'>
          <button className="md:hidden" onClick={handleDelete}><Trash size={24} className='text-white font-bold' /></button>
          <button className="hidden md:block text-s font-semibold" onClick={handleDelete}>Deletar</button>
        </div>
      </div>
    </div >
  )
}

export default CardCategorias;