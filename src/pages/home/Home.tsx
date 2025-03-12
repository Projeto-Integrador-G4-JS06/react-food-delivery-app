import { Link } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import ListaProdutosSaudaveis from "../../components/produtos/listaprodutos/ListaProdutosSaudaveis";
import CardCategoriaHome from "../../components/categorias/cardcategorias/CardCategoriaHome";
import CarroselCategoria from "../../components/carroselcategoria/CarroselCategoria";

function Home() {
  return (
    <div className="bg-[#f8f8f8]">
      <Banner />
      <CarroselCategoria />
      <div className="flex justify-center py-8"></div>
      <div className="bg-[#f5f5f5] rounded-2xl pb-20  sm:mx-10">
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

export default Home
