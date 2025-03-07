import { useEffect, useState } from "react";
import { PacmanLoader } from 'react-spinners';
import Categoria from "../../../models/Categoria";
import CardCategorias from "../cardcategorias/CardCategorias";
import { listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Link } from "react-router-dom";

function ListaCategorias() {

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function buscarCategorias() {

        try {

            setIsLoading(true);

            await listar('/categorias/all', setCategorias);

        } catch (error: unknown) {
            if (error instanceof Error) {
                ToastAlerta(`Erro ao listar as Categorias: ${error.message}`, 'erro');
            } else {
                ToastAlerta("Erro desconhecido ao listar as Categorias!", 'erro');
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    return (
        <>

            {/* Centralized PacmanLoader */}
            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-[var(--color-beige-500)] bg-opacity-75 z-50">
                    <PacmanLoader
                        color="#CD533B"
                        margin={0}
                        size={50}
                        speedMultiplier={2}
                        aria-label="Pacman-loading"
                    />
                </div>
            )}
            <div className="w-full pb-8 flex justify-center items-center">
                <div className="container flex flex-col mx-4">
                    {(!isLoading && categorias.length === 0) && (
                        <span className="my-8 text-3xl text-center">
                            Nenhuma categoria foi encontrada!
                        </span>
                    )}
                    <section className="container w-full mx-auto px-4 flex flex-col justify-center items-center gap-10">
                        <div className="w-full h-30 flex justify-between px-8 items-center bg-[var(--color-olive-500)] text-white">
                            <p className="text-2xl font-[family-name:var(--font-heading)]">Categorias</p>
                            <Link to={`/cadastrarcategoria`}>
                            <button
                type="submit"
                className="font-heading mt-4 rounded-lg bg-[#CD533B] text-white h-13 w-55"
              >
                <Link to={'/cadastrarcategoria'}> Cadastrar Categoria</Link>
              </button>
                            </Link>

                        </div>
                        {/* <div className='  flex flex-col justify-center items-center'> */}

                        <div className="grid grid-cols-1 mx-6 gap-10 md:grid-cols-3 lg:grid-cols-4">
                            {categorias
                                .sort((a, b) => a.id - b.id)
                                .map((categoria: Categoria) => (
                                    <CardCategorias
                                        key={categoria.id}
                                        categoria={categoria}
                                    />
                                ))
                            }
                        </div>
                        {/* </div> */}

                    </section>
                </div >
            </div>
        </>
    );
}
export default ListaCategorias;