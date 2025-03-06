import { useContext, useEffect, useState } from "react";

import { listar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import Produto from "../../../models/Produto";

import { AuthContext } from "../../../contexts/AuthContext";
import CardProdutos from "../cardprodutos/CardProdutos";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      await listar("/produtos/all", setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("erro");
      }
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <>
      <div className="flex flex-col items-end sm:flex-row bg-[#646F4B] h-[8.18rem] w-screen sm:items-center justify-between ">
        <div className="mx-16 text-white text-3xl mt-5">Produtos</div>
        <div className="mx-16 mb-2">
          {" "}
          <button
            type="submit"
            className="font-heading mt-4 rounded-lg bg-[#CD533B] text-white h-13 w-55"
          >
            Cadastrar Produto
          </button>
        </div>
      </div>

      <div className="flex justify-center  bg-[#F6EED9] mb-6">
        <div className=" flex flex-col">
          <div
            className="grid grid-cols-1 md:grid-cols-1
                                    lg:grid-cols-2 xl:grid-cols- 2xl:grid-cols-2 3xl:grid-cols-3 gap-8 "
          >
            {produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
    </>
  );
}

export default ListaProdutos;
