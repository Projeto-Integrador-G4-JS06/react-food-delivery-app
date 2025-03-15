import ListaProdutosSaudaveis from "../../components/produtos/listaprodutos/ListaProdutosSaudaveis";
import CarrosselCategoria from "../../components/carrosselcategoria/CarrosselCategoria";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  return (
    <section className="container w-full mx-auto flex flex-col justify-center gap-8">
      <Link to="/produtos">
        {/* Spinner enquanto a imagem não carrega */}
        {!isImageLoaded && (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#FF6F61" size={60}/>
          </div>
        )}

        {/* Imagem para desktop */}
        <img
          src="https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/light_home.svg?updatedAt=1742068443672"
          alt="Banner desktop"
          className={`w-full hidden md:block ${isImageLoaded ? "" : "hidden"}`}
          onLoad={handleImageLoad}
        />

        {/* Imagem para mobile */}
        <img
          src="https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/light_mobile_home.svg?updatedAt=1742068492107"
          alt="Banner mobile"
          className={`w-full md:hidden ${isImageLoaded ? "" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      </Link>
      <h2 className="text-2xl xl:text-3xl font-semibold font-[family-name:var(--font-heading)] text-gray-700 px-8 py-2">
        Conheça as nossas categorias!
      </h2>

      <CarrosselCategoria />
      <div className="w-full bg-[#ECE9E3] rounded-2xl">
        <h2 className="text-2xl xl:text-3xl font-semibold font-[family-name:var(--font-heading)] text-gray-700 p-10 xl:px-20 xl:py-15">
          Produtos Saudáveis
        </h2>
        <div className="xl:px-25 xl:pb-15">
          <ListaProdutosSaudaveis />
        </div>
      </div>
    </section >
  );
}

export default Home;
