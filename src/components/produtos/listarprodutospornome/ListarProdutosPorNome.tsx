import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { listar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { toTitleCase } from "../../../utils/stringUtils";

function ListarProdutosPorNome() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
    const [filtroPreco, setFiltroPreco] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const { nome } = useParams<{ nome: string }>();

    async function buscarTodosProdutos() {
        const tempoMinimoLoading = 1900; // 1 segundo (ajuste conforme necessário)
        const inicioLoading = Date.now();

        setIsLoading(true);
        try {
            const produtosRecebidos: Produto[] = [];
            await listar(`/produtos/nome/${nome}`, (data: Produto[]) => {
                produtosRecebidos.push(...data);
            });
            setProdutos(produtosRecebidos);
            setProdutosFiltrados(produtosRecebidos);
        } catch (error: unknown) {
            if (error instanceof Error) {
                ToastAlerta(`Erro ao listar produtos: ${error.message}`, "erro");
            } else {
                ToastAlerta("Erro desconhecido ao listar os produtos!", "erro");
            }
        } finally {
            const tempoDecorrido = Date.now() - inicioLoading;
            const tempoRestante = tempoMinimoLoading - tempoDecorrido;

            if (tempoRestante > 0) {
                // Aguarda o tempo restante antes de desativar o loading
                setTimeout(() => setIsLoading(false), tempoRestante);
            } else {
                // Se o tempo mínimo já foi atingido, desativa o loading imediatamente
                setIsLoading(false);
            }
        }
    }

    function filtrarProdutos() {
        let produtosAtualizados = produtos;

        if (nome) {
            produtosAtualizados = produtosAtualizados.filter((produto) =>
                produto.nome_produto.toUpperCase().includes(nome.toUpperCase())
            );
        }

        if (filtroPreco) {
            produtosAtualizados = produtosAtualizados.filter((produto) => {
                const preco = produto.preco;
                if (filtroPreco === "30") return preco <= 30;
                if (filtroPreco === "50") return preco > 30 && preco <= 50;
                if (filtroPreco === "80") return preco > 50 && preco <= 80;
                if (filtroPreco === "100") return preco > 80 && preco <= 100;
                if (filtroPreco === "m100") return preco > 100;
                return true;
            });
        }

        setProdutosFiltrados(produtosAtualizados);
    }

    function limparFiltroPreco() {
        setFiltroPreco("");
        document.getElementsByName("preco").forEach((radio) => {
            (radio as HTMLInputElement).checked = false;
        });
    }

    const removerProduto = (id: string) => {
        setProdutos((prevProdutos) =>
            prevProdutos.filter((produto) => produto.id.toString() !== id)
        );
    };

    useEffect(() => {
        buscarTodosProdutos();
    }, [nome]);

    useEffect(() => {
        filtrarProdutos();
    }, [produtos, nome, filtroPreco]);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] bg-opacity-75 z-56 dark:bg-dark-gray-200">
                    <span className="loader"></span>
                </div>
            )}

            <div className="w-full bg-[#ECE9E3] py-6 dark:bg-dark-gray-200">
                <div className="container mx-auto flex justify-between items-center py-2 px-8">
                    <p className="hidden sm:block text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600 dark:text-white">
                        Produtos
                    </p>
                    <Link
                        to={`/home`}
                        className="flex justify-end w-full sm:w-auto"
                    >
                        <button
                            type="submit"
                            className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer transition-colors duration-200 dark:bg-dark-red-700 dark:hover:bg-dark-red-800"
                        >
                            Voltar
                        </button>
                    </Link>
                </div>
            </div>

            <div className="container w-full mx-auto flex flex-col justify-start items-center gap-10 my-8 md:min-h-[80vh]">
                <div className="w-full flex flex-col mx-4">
                    {!isLoading && produtos.length === 0 && (
                        <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600 dark:text-white">
                            Nenhum produto foi encontrado!
                        </span>
                    )}

                    {!isLoading && produtos.length > 0 && (
                        <section className="container w-full mx-auto px-4 flex flex-col justify-start items-center gap-10">
                            <h2 className="font-medium text-gray-600 dark:text-gray-200 font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-center my-4">
                                Resultados da busca por{" "}
                                <span className="italic">
                                    "{nome ? toTitleCase(nome) : "N/A"}"
                                </span>
                            </h2>

                            <div className="flex flex-col xl:flex-row w-full">
                                {/* Div do Filtro */}
                                <div className="flex flex-col xl:flex-row w-full items-center xl:items-start">
                                    {/* Div do Filtro */}
                                    <div className="md:mr-10 md:ml-10 font-[family-name:var(--font-heading)] w-full xl:w-1/4 text-center xl:text-left flex flex-col items-center xl:items-start mx-auto">
                                        <h3 className="font-medium p-3 text-gray-800 dark:text-white  text-xl md:text-2xl pb-5">
                                            Filtrar por preço:
                                        </h3>
                                        <div className="text-lg pt-4 p-2 space-y-2 dark:text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="preco"
                                                    value="30"
                                                    onChange={(e) =>
                                                        setFiltroPreco(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="30">
                                                    Até R$ 30,00
                                                </label>
                                            </div>
                                            <div className="py-1 flex gap-2">
                                                <input
                                                    type="radio"
                                                    name="preco"
                                                    value="50"
                                                    onChange={(e) =>
                                                        setFiltroPreco(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="50">
                                                    R$30,00 - R$50,00
                                                </label>
                                            </div>
                                            <div className="py-1 flex gap-2">
                                                <input
                                                    type="radio"
                                                    name="preco"
                                                    value="80"
                                                    onChange={(e) =>
                                                        setFiltroPreco(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="80">
                                                    R$50,00 - R$80,00
                                                </label>
                                            </div>
                                            <div className="py-1 flex gap-2">
                                                <input
                                                    type="radio"
                                                    name="preco"
                                                    value="100"
                                                    onChange={(e) =>
                                                        setFiltroPreco(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="100">
                                                    R$80,00 - R$100,00
                                                </label>
                                            </div>
                                            <div className="py-1 flex gap-2">
                                                <input
                                                    type="radio"
                                                    name="preco"
                                                    value="m100"
                                                    onChange={(e) =>
                                                        setFiltroPreco(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="m100">
                                                    Acima de R$ 100,00
                                                </label>
                                            </div>
                                        </div>
                                        <div className="pb-15 mt-6">
                                            <button
                                                className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-9 w-40 hover:cursor-pointer transition-colors duration-200 dark:bg-dark-red-700 dark:hover:bg-dark-red-800"
                                                onClick={limparFiltroPreco}
                                            >
                                                Limpar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Cards dos Produtos */}
                                    <div className="flex-grow grid grid-cols-1 mx-4 gap-10 md:grid-cols-2 2xl:mx-40">
                                        {produtosFiltrados.length > 0 ? (
                                            produtosFiltrados
                                                .sort((a, b) => a.id - b.id)
                                                .map((produto: Produto) => (
                                                    <CardProdutos
                                                        key={produto.id}
                                                        produto={produto}
                                                        onDelete={removerProduto}
                                                    />
                                                ))
                                        ) : (
                                            <div className="col-span-2 xl:col-span-1 w-full h-64 flex justify-center items-center">
                                                <span className="text-xl md:text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600 text-center dark:text-white">
                                                    Não há nenhum produto cadastrado
                                                    neste valor!
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListarProdutosPorNome;
