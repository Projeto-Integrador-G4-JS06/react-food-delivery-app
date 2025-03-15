import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import Produto from "../../../models/Produto";
import { listar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";

function ListarProdutosPorNome() {
    const [produtos, setProdutos] = useState<Produto[]>([]); // Todos os Produtos
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]); // Produtos Filtrados
    const [filtroPreco, setFiltroPreco] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const { nome } = useParams<{ nome: string }>();

    async function buscarTodosProdutos() {
        try {
            setIsLoading(true);
            await listar(`/produtos/nome/${nome}`, setProdutos);
        } catch (error) {
            alert("Erro ao carregar produtos!");
        } finally {
            setIsLoading(false);
        }
    }

    function filtrarProdutos() {
        let produtosFiltrados = produtos;

        if (produtosFiltrados && nome) {
            produtosFiltrados = produtosFiltrados.filter((produto) =>
                produto.nome_produto.toUpperCase().includes(nome.toUpperCase())
            );
        }

        if (filtroPreco) {
            produtosFiltrados = produtosFiltrados.filter((produto) => {
                const preco = produto.preco;
                if (filtroPreco === "30") return preco <= 30;
                if (filtroPreco === "50") return preco > 30 && preco <= 50;
                if (filtroPreco === "80") return preco > 50 && preco <= 80;
                if (filtroPreco === "100") return preco > 80 && preco <= 100;
                if (filtroPreco === "m100") return preco > 100;
                return true;
            });
        }

        setProdutosFiltrados(produtosFiltrados);
    }

    function limparFiltroPreco() {
        setFiltroPreco("");
        const radioButtons = document.getElementsByName("preco");
        radioButtons.forEach((radio) => {
            (radio as HTMLInputElement).checked = false;
        });
    }

    // Carrega todos os produtos na primeira vez
    useEffect(() => {
        buscarTodosProdutos();
    }, []);

    // Filtra os produtos de acordo com o termo da busca
    useEffect(() => {
        filtrarProdutos();
    }, [nome, produtos, filtroPreco]);

    return (
        <>
            <div className="bg-gray-200 flex flex-col justify-center items-center w-full min-h-screen font-poppins">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl text-center my-4">
                        Resultados da busca por {" "}
                        <span className="italic text-teal-800">"{nome}"</span>
                    </h1>

                    {isLoading && (
                        <PacmanLoader
                            color="#0D9488"
                            margin={0}
                            size={80}
                            speedMultiplier={2}
                            aria-label="Pacman-loading"
                            className="mx-auto my-8"
                        />
                    )}

                    {!isLoading && produtosFiltrados.length === 0 && (
                        <div className="text-center my-4">
                            <h2 className="text-2xl text-gray-600">
                                Nenhum produto encontrado para "{nome}"
                            </h2>
                        </div>
                    )}

                 <div className="flex w-full gap-8 items-start">
                        {/* Filtro de preços */}
                        <div className="flex flex-col w-1/4 rounded-lg p-4">
                            <h3 className="font-medium p-3 text-[#050303] text-xl py-2 ">
                                Filtrar por preço:
                            </h3>
                            <div className="pt-4 p-2 space-y-2">
                                <div className="flex items-center gap-2">
                                    
                                    <input
                                        type="radio"
                                        name="preco"
                                        value="30"
                                        onChange={(e) =>
                                            setFiltroPreco(e.target.value)
                                        }
                                    />
                                    <label htmlFor="30"> Até R$ 30,00</label>
                                </div>
                                <div className="py-1 flex gap-2">
                                    <input
                                        type="radio"
                                        name="preco"
                                        value="50"
                                        onChange={(e) =>
                                            setFiltroPreco(e.target.value)
                                        }
                                    />
                                    <label htmlFor="50">
                                        {" "}
                                        R$30,00 - R$50,00
                                    </label>
                                </div>
                                <div className="py-1 flex gap-2">
                                    <input
                                        type="radio"
                                        name="preco"
                                        value="80"
                                        onChange={(e) =>
                                            setFiltroPreco(e.target.value)
                                        }
                                    />
                                    <label htmlFor="80">
                                        {" "}
                                        R$50,00 - R$80,00
                                    </label>
                                </div>
                                <div className="py-1 flex gap-2">
                                    <input
                                        type="radio"
                                        name="preco"
                                        value="100"
                                        onChange={(e) =>
                                            setFiltroPreco(e.target.value)
                                        }
                                    />
                                    <label htmlFor="100">
                                        {" "}
                                        R$80,00 - R$100,00
                                    </label>
                                </div>
                                <div className="py-1 flex gap-2">
                                    <input
                                        type="radio"
                                        name="preco"
                                        value="m100"
                                        onChange={(e) =>
                                            setFiltroPreco(e.target.value)
                                        }
                                    />
                                    <label htmlFor="m100">
                                        Acima de R$ 100,00
                                    </label>
                                </div>
                            </div>
                            <div className=" mt-3">
                                <button
                                    className="font-[family-name:var(--font-poppins)] font-medium rounded-xl bg-[#E02D2D] hover:bg-[#B22222] text-white h-9 w-50 cursor-pointer"
                                    onClick={limparFiltroPreco}
                                >
                                    Limpar
                                </button>
                            </div>
                        </div>
                        <div className="w-[1px] bg-black self-stretch"></div>

                        

                        {!isLoading && produtosFiltrados.length > 0 && (
                            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                {produtosFiltrados.map((produto) => (
                                    <CardProdutos
                                        key={produto.id}
                                        produto={produto}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarProdutosPorNome;
