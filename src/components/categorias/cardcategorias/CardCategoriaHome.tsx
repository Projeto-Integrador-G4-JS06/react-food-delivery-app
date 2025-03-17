import Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

const getImagemSrc = (icone?: string) => {
  return icone && icone.trim() !== ""
    ? icone
    : "https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Categorias/meal.png?updatedAt=1742050394154";
};

function CardCategoriaHome({ categoria }: CardCategoriaProps) {
  return (
    <div className="bg-[#F5E9D9] dark:bg-gray-300 border-1 border-gray-800 p-2 rounded-2xl w-[7rem] h-[7rem] items-center flex flex-col justify-center drop-shadow-2xl my-2">
      <img
        src={getImagemSrc(categoria?.icone)}
        alt="Category Icon"
        className="my-2 h-10 max-w-75"
      ></img>
      <p className="text-xs lg:text-sm text-center text-gray-800 font-medium font-[family-name:var(--font-heading)] break-words max-w-full">
        {categoria.nome_categoria}
      </p>
    </div>
  );
}

export default CardCategoriaHome;
