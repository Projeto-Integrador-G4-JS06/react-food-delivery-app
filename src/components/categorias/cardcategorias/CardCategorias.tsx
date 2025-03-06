import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { Pencil, Trash } from '@phosphor-icons/react';

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {
  return (
    <div className='flex flex-col justify-between overflow-hidden border border-yellow-400 rounded-2xl drop-shadow-xl h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg'>
      <header className='flex justify-start gap-4 items-center px-4 text-2xl text-white bg-yellow-500 font-heading'>
        <img src={`${categoria.icone}`} alt="Category Icon" className="my-2 h-10 max-w-75" />
        <p className='text-base lg:text-lg text-gray-800 font-medium font-[family-name:var(--font-heading)]'>{categoria.nome_categoria}</p>
      </header>
      <p className='text-sm lg:text-base flex justify-center text-center items-center h-full p-8 bg-[var(--color-beige-600)] font-[family-name:var(--font-body)]'>{categoria.descricao}</p>

      <div className="flex">
        {/* Versão para mobile */}
        <Link to={`/editarcategoria/${categoria.id}`}
          className='flex items-center justify-center w-full py-2 bg-emerald-500 text-slate-50 hover:bg-emerald-700'>
          <button className="md:hidden"><Pencil size={24} className='text-white' /></button>
          <button className="hidden md:block text-xs">Editar</button>
        </Link>

        {/* Versão para mobile */}
        <Link to={`/deletarcategoria/${categoria.id}`}
          className='flex items-center justify-center w-full bg-red-600 text-slate-50 hover:bg-red-700'>
          <button className="md:hidden"><Trash size={24} className='text-white font-bold' /></button>
          <button className="hidden md:block text-xs">Deletar</button>
        </Link>
      </div>
    </div >
  )
}

export default CardCategorias;