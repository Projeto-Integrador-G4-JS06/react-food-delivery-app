import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { listar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";
import Produto from "../../../models/Produto";

function ListaProdutosCategorias() {
  const { nome_categoria } = useParams<{ nome_categoria: string }>();
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  // const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarCategoria() {
    try {
      await listar(
        `/categorias/nome/${nome_categoria}`,
        setCategoria
      );
    } catch (error) {
      console.error("Erro ao buscar a categoria:", error);
    }
  }

  // useEffect(() => {
  //   setCategoria({
  //     ...categoria,
  //     produtos: produtos,
  //   });
  // }, [produtos]);

  useEffect(() => {
    buscarCategoria();
  }, [nome_categoria]);

  return (
    <>
      <div className="bg-[#F6EED9] min-h-screen p-6">
        <h2>Produtos da categoria: {categoria.nome_categoria}</h2>

        {categoria.produtos && categoria.produtos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 gap-y-0 gap-x-8">
            {categoria.produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            Nenhum produto encontrado para esta categoria.
          </p>
        )}
      </div>
    </>
  );
}

export default ListaProdutosCategorias;
