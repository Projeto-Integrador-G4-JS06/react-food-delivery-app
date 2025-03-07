import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { listar } from "../../../services/Service"; // Apenas se precisar buscar os produtos inicialmente

function ListaProdutosCategorias() {
  const { nome_categoria } = useParams<{ nome_categoria: string }>();

  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]); // Armazena todos os produtos
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]); // Produtos filtrados pela categoria

  useEffect(() => {
    async function buscarProdutos() {
      try {
        await listar("/produtos/all", setTodosProdutos); 
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    buscarProdutos();
  }, []);

  // Filtrando produtos sempre que `nome_categoria` mudar
  useEffect(() => {
    if (nome_categoria) {
      const produtosFiltrados = todosProdutos.filter(
        (produto) => produto.categoria.nome_categoria === nome_categoria
      );
      setProdutosFiltrados(produtosFiltrados);
    }
  }, [nome_categoria, todosProdutos]);

  return (
    <div className="bg-[#F6EED9] min-h-screen p-6">
      <h2 className="text-2xl font-bold">
        Produtos da categoria: {nome_categoria}
      </h2>

      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 gap-y-4 gap-x-8">
          {produtosFiltrados.map((produto) => (
            <CardProdutos key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          Nenhum produto encontrado para esta categoria.
        </p>
      )}
    </div>
  );
}

export default ListaProdutosCategorias;
