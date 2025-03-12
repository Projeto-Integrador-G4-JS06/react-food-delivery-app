import Banner from "../../components/banner/Banner";
import ListaProdutosSaudaveis from "../../components/produtos/listaprodutos/ListaProdutosSaudaveis";
import CarroselCategoria from "../../components/carroselcategoria/CarroselCategoria";

function Home() {
  return (
    <section className="bg-[#E5E5E5] container w-full mx-auto flex flex-col justify-center gap-8">
      <Banner />
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

export default Home
