import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { PacmanLoader } from "react-spinners";

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
            await listar(`/categorias/${id}`, setCategoria);
        } catch (error: unknown) {
            console.error("Erro ao cadastrar/atualizar categoria:", error);
            ToastAlerta("Categoria não encontrada!", "info");
            retornar();
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id && !buscaExecutada.current) { // Verifica se a busca já foi executada
            buscaExecutada.current = true; // Marca a busca como executada
            buscarCategoriaPorId(id);
        } else {
            setCategoria({
                id: 0,
                nome_categoria: '',
                status: false,
                descricao: '',
                criado_em: '',
                atualizado_em: '',
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
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: token },
                })
                ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso");
            } catch (error: unknown) {
                if (error instanceof Error && error.message.includes("401")) {
                    handleLogout();
                } else {
                    console.error("Erro ao atualizar categoria:", error);
                    ToastAlerta("Erro ao atualizar a categoria!", "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: token }
                })
                ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso");
            } catch (error: unknown) {
                if (error instanceof Error && error.message.includes("401")) {
                    handleLogout();
                } else {
                    console.error("Erro ao cadastrar a categoria:", error);
                    ToastAlerta("Erro ao cadastrar a categoria!", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/categorias");
    }

    return (
        <section className="w-full py-8 flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 flex flex-col justify-center items-center">
                <div className="mx-1 lg:w-1/3">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center my-4">
                        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
                    </h1>

                    {isLoading && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75 z-50">
                            <PacmanLoader
                                color="#0D9488"
                                margin={0}
                                size={50}
                                speedMultiplier={2}
                                aria-label="Pacman-loading"
                            />
                        </div>
                    )}

                    <form className="flex flex-col w-full gap-4" onSubmit={gerarNovaCategoria}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="categoria" className="flex justify-center lg:justify-start">Informações da Categoria</label>
                            <input
                                type="text"
                                placeholder="Informe aqui o nome da categoria"
                                name='nome'
                                className="text-sm md:text-base p-2 border-2 rounded border-slate-700 bg-white"
                                required
                                value={categoria.nome_categoria}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                            <input
                                type="text"
                                placeholder="Informe aqui a descrição da categoria"
                                name='descricao'
                                className="text-sm md:text-base p-2 border-2 rounded border-slate-700 bg-white"
                                required
                                value={categoria.descricao}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <button
                            className="flex justify-center w-32 lg:w-48 py-2 mx-auto rounded text-white text-sm lg:text-base bg-slate-700 hover:bg-slate-800"
                            type="submit"
                            disabled={isLoading} // Desabilita o botão durante o carregamento
                        >
                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default FormCategoria;