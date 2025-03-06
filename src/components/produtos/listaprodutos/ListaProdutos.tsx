import { useEffect, useState } from "react";

import { listar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import Produto from "../../../models/Produto";
import CardProduto from "../cardprodutos/CardProdutos";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  //   const { usuario, handleLogout } = useContext(AuthContext);
  //   const token = usuario.token;

  async function buscarProdutos() {
    try {
      await listar("/produtos", setProdutos, {
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
      {/* {viagens.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )} */}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div
            className="grid grid-cols-1 md:grid-cols-3
                                    lg:grid-cols-5 gap-8"
          >
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
