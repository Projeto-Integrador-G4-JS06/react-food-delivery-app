import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { Pencil, Trash } from '@phosphor-icons/react';

interface CardCategoriaProps {
  categoria: Categoria;
}

// Função para garantir que o src da imagem sempre seja válido
const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== '' ? icone : 'https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/meal.png?updatedAt=1741281654261';
};

function CardCategorias({ categoria }: CardCategoriaProps) {
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
        <Link to={`/deletarcategoria/${categoria.id}`}
          className='flex items-center justify-center w-full bg-red-700 text-slate-50 hover:bg-red-600'>
          <button className="md:hidden"><Trash size={24} className='text-white font-bold' /></button>
          <button className="hidden md:block text-s font-semibold">Deletar</button>
        </Link>
      </div>
    </div >
  )
}

export default CardCategorias;