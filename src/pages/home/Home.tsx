import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import CarroselCategoria from "../../components/carroselcategoria/CarroselCategoria";
import ListaProdutosSaudaveis from "../../components/produtos/listaprodutos/ListaProdutosSaudaveis";
import banner_dark from '../../assets/dark_home.svg';
import banner_mobile_dark from '../../assets/dark_mobile_home.svg';
import banner_light from '../../assets/light_home.svg';
import banner_mobile_light from '../../assets/light_mobile_home.svg';

interface HomeProps {
  isDark: boolean;
}

function Home({ isDark }: HomeProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <section className="container w-full mx-auto flex flex-col justify-center gap-8 dark:bg-[#3A3A3A]">
      <div>
        <Link to="/produtos">
          {/* Spinner enquanto a imagem não carrega */}
          {!isImageLoaded && (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#FF6F61" size={60} />
            </div>
          )}

          {/* light mode */}
          {!isDark && (
            <>
              <img
                src={banner_light}
                alt="Banner desktop (modo claro)"
                className={`w-full hidden md:block ${
                  isImageLoaded ? "" : "hidden"
                }`}
                onLoad={handleImageLoad}
              />

              <img
                src={banner_mobile_light}
                alt="Banner mobile (modo claro)"
                className={`w-full md:hidden ${isDark ? "hidden" : ""} ${
                  isImageLoaded ? "" : "hidden"
                }`}
                onLoad={handleImageLoad}
              />
            </>
          )}

          {/* dark mode */}
          {isDark && (
            <>
              <img
                src={banner_dark}
                alt="Banner desktop (modo escuro)"
                className={`w-full hidden md:block ${
                  isImageLoaded ? "" : "hidden"
                }`}
                onLoad={handleImageLoad}
              />

              <img
                src={banner_mobile_dark}
                alt="Banner mobile (modo escuro)"
                className={`w-full md:hidden ${isDark ? "" : "hidden"} ${
                  isImageLoaded ? "" : "hidden"
                }`}
                onLoad={handleImageLoad}
              />
            </>
          )}
        </Link>

        <h2 className="text-3xl font-semibold font-[family-name:var(--font-heading)] text-gray-800 dark:text-white px-8 py-2">
          Conheça as nossas categorias!
        </h2>

        <CarroselCategoria />
        <div className="w-full bg-[#ECE9E3] dark:bg-[#2D2D2D] p-auto rounded-2xl">
          <h2 className="text-3xl font-semibold font-[family-name:var(--font-heading)] text-gray-800 dark:text-white px-20 py-15">
            Produtos Saudáveis
          </h2>
          <div className="md:px-25 md:pb-15">
            <ListaProdutosSaudaveis />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
