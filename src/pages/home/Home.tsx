import Banner from "../../components/banner/Banner";

function Home() {
  return (
    <div className="bg-[#F6EED9]">
      <Banner />
      <div className="flex justify-center py-8">
        {/* <div className="container grid grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <h2 className="text-4xl font-heading font-semibold text-gray-800">
              Tá com fome? Pede Aí!
            </h2>
            <p className="text-lg font-body">
              Pratos deliciosos a um clique de distância!
            </p>
            <p></p>
            <div className="flex justify-around gap-4">
              <div className="flex justify-around gap-4">
                <button className=" font-semibold w-full h-auto py-2.5 px-5 bg-[#CD533B] text-white rounded-full hover:bg-[#B3492F]">
                  <Link to="/produtos">Faça seu pedido agora!</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://ik.imagekit.io/iyume/pede%20a%C3%AD/Order%20food-amico.png"
              alt="Imagem da Página Home"
              className="w-2/3"
            />
          </div>
        </div> */}
      </div>
      <div className="bg-[#FFE5A0] rounded-2xl mx-10 pb-20">
        <div className="pl-10">
          <h2 className=" py-10 pl-5 font-heading font-semibold text-3xl">
            Produtos Saudáveis
          </h2>
          <ul className="list-disc pl-4">
            <li>Adicionar os cards de produtos saudáveis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
