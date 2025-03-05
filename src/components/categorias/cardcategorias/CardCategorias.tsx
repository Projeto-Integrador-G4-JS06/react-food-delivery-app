import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { Pencil, Trash } from '@phosphor-icons/react';

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {
  return (
    <div className='flex flex-col justify-between overflow-hidden border rounded-2xl'>
      <header className='px-6 py-2 text-2xl font-bold text-white bg-slate-700'>
        Categoria
      </header>
      <p className='h-full p-8 text-3xl bg-white'>{categoria.nome}</p>

      <div className="flex">
        <Link to={`/editarcategoria/${categoria.id}`}
          className='flex items-center justify-center w-full py-2 bg-teal-600 text-slate-50 hover:bg-teal-800'>
          <button><Pencil size={24} className='text-white' /></button>
        </Link>

        <Link to={`/deletarcategoria/${categoria.id}`}
          className='flex items-center justify-center w-full bg-red-500 text-slate-50 hover:bg-red-700'>
          <button><Trash size={24} className='text-white font-bold' /></button>
        </Link>
      </div>
    </div >
  )
}

export default CardCategorias;