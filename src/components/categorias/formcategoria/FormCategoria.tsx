import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
// import { PacmanLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    const buscaExecutada = useRef(false); // Rastreia se a busca já foi executada

    async function buscarCategoriaPorId(id: string) {
        try {
            await listar(`/categorias/id/${id}`, setCategoria);
        } catch (error: unknown) {
            console.error("Erro ao encontrar categoria:", error);
            ToastAlerta("Categoria não encontrada!", "erro");
            retornar();
        }
    }

    useEffect(() => {
        if (token === "" && !buscaExecutada.current) {
            ToastAlerta("Você precisa estar logado", "info");
            buscaExecutada.current = true;
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id && !buscaExecutada.current) { // Verifica se a busca já foi executada
            console.log(`ID: ${id}`)
            buscaExecutada.current = true; // Marca a busca como executada
            buscarCategoriaPorId(id);
        } else {
            setCategoria({
                id: 0,
                nome_categoria: '',
                descricao: '',
                icone: '',
                criado_em: new Date().toISOString(),
                atualizado_em: new Date().toISOString(),
                status: false,
            });
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/categorias/atualizar`, categoria, setCategoria, {
                    headers: { Authorization: token },
                });
                ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso");
            } catch (error: unknown) {
                if (error instanceof Error && error.message.includes("401")) {
                    ToastAlerta("Você precisa estar logado", "info");
                    handleLogout();
                } else {
                    console.error("Erro ao atualizar categoria:", error);
                    ToastAlerta("Erro ao atualizar a categoria!", "erro");
                }
            }
        } else {
            try {
                console.log("Dados da categoria sendo enviados:", categoria); // Log dos dados
                const response = await cadastrar(`/categorias/cadastrar`, categoria, setCategoria, {
                    headers: { Authorization: token }
                });
                console.log("Resposta da API:", response); // Log da resposta
                ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso");
            } catch (error: unknown) {
                if (error instanceof Error && error.message.includes("401")) {
                    ToastAlerta("Você precisa estar logado", "info");
                    handleLogout();
                } else {
                    console.error("Erro ao cadastrar a categoria:", error);
                    ToastAlerta("Erro ao cadastrar a categoria 123!", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/categorias");
    }

    const carregandoCategoria = categoria.nome_categoria === '' || categoria.descricao === '';

    console.log(JSON.stringify(categoria))

    return (
        <section className="w-full py-8 flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 flex flex-col justify-center items-center">
                <div className="mx-1 lg:w-1/3">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center my-4 font-[family-name:var(--font-heading)] text-[#CD533B]">
                        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
                    </h1>

                    {/* {isLoading && (
                        <div className="fixed inset-0 flex justify-center items-center bg-[var(--color-beige-500)] bg-opacity-75 z-50">
                            <PacmanLoader
                                color="#0D9488"
                                margin={0}
                                size={50}
                                speedMultiplier={2}
                                aria-label="Pacman-loading"
                            />
                        </div>
                    )} */}

                    <form className="flex flex-col w-full gap-4 text-gray-700 font-medium" onSubmit={gerarNovaCategoria}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="categoria" className="flex justify-center lg:justify-start">Nome da Categoria</label>
                            <input
                                type="text"
                                placeholder="Informe aqui o nome da categoria"
                                name='nome_categoria'
                                className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
                                required
                                value={categoria.nome_categoria}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                            <label htmlFor="descricao" className="flex justify-center lg:justify-start">Descrição</label>
                            <input
                                type="text"
                                placeholder="Informe aqui a descrição da categoria"
                                name='descricao'
                                className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
                                required
                                value={categoria.descricao}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                            <label htmlFor="icone" className="flex justify-center lg:justify-start">ícone (imagem)</label>
                            <input
                                type="text"
                                placeholder="Insira o link da imagem da categoria"
                                name='icone'
                                className="border-2 text-sm md:text-base bg-[#F5F5DC] border-[#FFA500] rounded-xl p-2 focus:outline-amber-600"
                                // required
                                value={categoria.icone}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <button
                            className="flex justify-center w-32 lg:w-48 py-2 mx-auto disabled:bg-[#d89d92] rounded-xl text-white text-sm lg:text-base bg-[#CD533B] hover:bg-[#EA5A3D]"
                            type="submit"
                            // disabled={isLoading} // Desabilita o botão durante o carregamento
                            disabled={carregandoCategoria}
                        >
                            {isLoading ? (
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                />
                            ) : (
                                <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default FormCategoria;