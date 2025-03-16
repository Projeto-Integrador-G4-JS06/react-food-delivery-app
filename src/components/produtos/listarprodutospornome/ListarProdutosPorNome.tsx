import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { listar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { toTitleCase } from "../../../utils/stringUtils";

function ListarProdutosPorNome() {
    const [produtos, setProdutos] = useState<Produto[]>([]); // Todos os Produtos
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]); // Produtos Filtrados
    const [filtroPreco, setFiltroPreco] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const { nome } = useParams<{ nome: string }>();

    async function buscarTodosProdutos() {
        const tempoMinimoLoading = 1900; // 1 segundo (ajuste conforme necessário)
        const inicioLoading = Date.now();

        try {
            setIsLoading(true);
            await listar(`/produtos/nome/${nome}`, setProdutos);
        } catch (error: unknown) {
            if (error instanceof Error) {
                ToastAlerta(
                    `Erro ao listar produtos: ${error.message}`,
                    "erro"
                );
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

    // Função para remover um produto da lista
    const removerProduto = (id: string) => {
        setProdutos((prevProdutos) =>
            prevProdutos.filter((produto) => produto.id.toString() !== id)
        );
    };

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
            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-[#ECE9E3] bg-opacity-75 z-56">
                    <span className="loader"></span>
                </div>
            )}

            <div className="w-full bg-[#ECE9E3] py-6">
                <div className="container mx-auto flex justify-between items-center py-2 px-8">
                    <p className="hidden sm:block text-2xl font-medium font-[family-name:var(--font-heading)] text-gray-600">
                        Produtos
                    </p>
                    <Link
                        to={`/home`}
                        className="flex justify-end w-full sm:w-auto"
                    >
                        <button
                            type="submit"
                            className="font-[family-name:var(--font-quicksand)] font-medium rounded-lg bg-[#E02D2D] hover:bg-[#B22222] active:bg-[#8B1A1A] text-white h-13 w-45 hover:cursor-pointer"
                        >
                            Voltar
                        </button>
                    </Link>
                </div>
            </div>

            <div className="container w-full mx-auto flex flex-col justify-center items-center gap-10 my-8">
                <div className="w-full flex flex-col mx-4">
                    {!isLoading && produtos.length === 0 && (
                        <span className="my-8 text-2xl font-medium font-[family-name:var(--font-heading)] text-center text-gray-600">
                            Nenhum produto foi encontrado!
                        </span>
                    )}

                    <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-10">
                        <h2 className="font-medium text-gray-600 font-[family-name:var(--font-heading)] text-4xl text-center my-4">
                            Resultados da busca por{" "}
                            <span className="italic">
                                "{nome ? toTitleCase(nome) : "N/A"}"
                            </span>
                        </h2>

                        <div className="flex flex-col xl:flex-row w-full">
                            {/* Div do Filtro */}
                            <div className="flex flex-col xl:flex-row w-full items-center xl:items-start">
                                {/* Div do Filtro */}
                                <div className="md:mr-10 font-[family-name:var(--font-heading)] w-full xl:w-1/4 text-center xl:text-left flex flex-col items-center xl:items-start mx-auto">
                                    <h3 className="font-medium p-3 text-gray-800 text-2xl py-2">
                                        Filtrar por preço:
                                    </h3>
                                    <div className="text-lg pt-4 p-2 space-y-2">
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
                                    <div className="pb-15 mt-3">
                                        <button
                                            className="font-medium rounded-xl bg-[#E02D2D] hover:bg-[#B22222] text-white h-9 w-40 cursor-pointer text-lg"
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
                                        <div className="col-span-full w-full h-64 flex justify-center items-center">
                                            <span className="text-3xl font-medium font-[family-name:var(--font-heading)] text-gray-600 text-center">
                                                Não há nenhum produto cadastrado
                                                neste valor!
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ListarProdutosPorNome;
