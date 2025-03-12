import Banner from "../../components/banner/Banner";
import ListaProdutosSaudaveis from "../../components/produtos/listaprodutos/ListaProdutosSaudaveis";
import CarroselCategoria from "../../components/carroselcategoria/CarroselCategoria";
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
          src="https://ik.imagekit.io/iyume/pede%20a%C3%AD/banner_desktop.svg?updatedAt=1741712196513"
          alt="Banner desktop"
          className={`w-full hidden md:block ${isImageLoaded ? "" : "hidden"}`}
          onLoad={handleImageLoad}
        />

        {/* Imagem para mobile */}
        <img
          src="https://ik.imagekit.io/iyume/pede%20a%C3%AD/banner_mobile.svg?updatedAt=1741712211643"
          alt="Banner mobile"
          className={`w-full md:hidden ${isImageLoaded ? "" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      </Link>
      <h2 className="text-3xl font-semibold font-[family-name:var(--font-heading)] text-gray-800 px-8 py-2">
        Conheça as nossas categorias!
      </h2>

      <CarroselCategoria />
      <div className="w-full bg-[#ECE9E3] p-auto rounded-2xl">
        <h2 className="text-3xl font-semibold font-[family-name:var(--font-heading)] text-gray-800 px-20 py-15">
          Produtos Saudáveis
        </h2>
        <div className="px-25 pb-15">
          <ListaProdutosSaudaveis />
        </div>
      </div>
    </section >
  );
}

export default Home;
