import { Link } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import ListaProdutosSaudaveis from "../../components/produtos/listaprodutos/ListaProdutosSaudaveis";
import CardCategoriaHome from "../../components/categorias/cardcategorias/CardCategoriaHome";
import CarroselCategoria from "../../components/carroselcategoria/CarroselCategoria";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  return (
    <div className="bg-[#F6EED9]">
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
      <CarroselCategoria />
      <div className="flex justify-center py-8"></div>
      <div className="bg-[#FFE5A0] rounded-2xl pb-20  sm:mx-10">
        <div className="">
          <h2 className=" pt-6 pb-4 md:py-10 pl-2 md:pl-5 font-heading font-semibold text-2xl md:text-3xl">
            Produtos Saudáveis
          </h2>
          <ul className="list-disc">
            <ListaProdutosSaudaveis />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
