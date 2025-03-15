import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importe os ícones de olho

function Cadastro() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [senhaValida, setSenhaValida] = useState<boolean>(true); // Estado para validação da senha
    const [senhasCoincidem, setSenhasCoincidem] = useState<boolean>(true); // Estado para verificar se as senhas coincidem
    const [botaoHabilitado, setBotaoHabilitado] = useState<boolean>(false); // Estado para habilitar/desabilitar o botão
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false); // Estado para mostrar/ocultar senha

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome_usuario: "",
        tipo: "",
        usuario: "",
        senha: "",
        num_celular: "",
        cpf: "",
        cnpj: "",
        foto: "",
        endereco: "",
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
    });

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    useEffect(() => {
        verificarCamposObrigatorios();
    }, [usuario, confirmarSenha]);

    function retornar() {
        navigate("/login");
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });

        if (name === "senha") {
            setSenhaValida(value.length >= 8);
            setSenhasCoincidem(value === confirmarSenha);
        }
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setConfirmarSenha(value);
        setSenhasCoincidem(value === usuario.senha);
    }

    function verificarCamposObrigatorios() {
        const { nome_usuario, usuario: usuarioLogin, senha, num_celular, endereco } = usuario as Usuario;

        const camposPreenchidos =
            nome_usuario.trim() !== "" &&
            usuarioLogin.trim() !== "" &&
            senha.trim() !== "" &&
            num_celular.trim() !== "" &&
            endereco.trim() !== "" &&
            senha.length >= 8 &&
            confirmarSenha === senha;

        setBotaoHabilitado(camposPreenchidos);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (usuario.senha.length < 8) {
            ToastAlerta("A senha deve ter no mínimo 8 caracteres!", "info");
            return;
        }

        if (confirmarSenha === usuario.senha) {
            setIsLoading(true);

            try {
                await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
                ToastAlerta("Usuário Cadastrado com sucesso!", "sucesso");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    ToastAlerta(`Erro ao cadastrar o Usuário!: ${error.message}`, "erro");
                } else {
                    ToastAlerta("Erro desconhecido ao cadastrar o usuário!", "erro");
                }
            }
        } else {
            ToastAlerta("As senhas não coincidem! Verifique as informações e tente novamente.", "info");
            setUsuario({ ...usuario, senha: "" });
            setConfirmarSenha("");
        }

        setIsLoading(false);
    }

    return (
        <>
            <section className="container w-full mx-auto flex flex-col p-4 justify-center">
                <div className="flex items-center justify-center my-2 md:my-6 xl:mx-30">
                    <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-full rounded-2xl">
                        <div className="bg-[#FF5656] fundoCadastro hidden xl:block rounded-l-2xl py-6"></div>
                        <div className="place-items-center bg-[#F8F8F8] flex justify-center w-full rounded-2xl xl:transform xl:-translate-x-5 py-6">
                            <form
                                className="flex flex-col gap-4 w-70 xl:w-3/5"
                                onSubmit={cadastrarNovoUsuario}
                            >
                                <h2 className="text-[#33333] font-semibold text-3xl text-center border-b-1 p-6 border-b-black w-full font-[family-name:var(--font-heading)]">
                                    Cadastre-se
                                </h2>
                                {/* Campos do formulário */}
                                <div className="flex flex-col w-full relative">
                                    <label className="text-gray-700 p-1" htmlFor="nome_usuario">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="nome_usuario"
                                        name="nome_usuario"
                                        placeholder="Nome"
                                        className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2"
                                        value={usuario.nome_usuario}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 p-1" htmlFor="usuario">
                                        Usuário
                                    </label>
                                    <input
                                        type="text"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="user@email.com"
                                        className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2"
                                        value={usuario.usuario}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 p-1" htmlFor="num_celular">
                                        Telefone
                                    </label>
                                    <input
                                        type="text"
                                        id="num_celular"
                                        name="num_celular"
                                        placeholder="(xx) xxxxx-xxxx"
                                        className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2"
                                        value={usuario.num_celular}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 p-1" htmlFor="endereco">
                                        Endereço
                                    </label>
                                    <input
                                        type="text"
                                        id="endereco"
                                        name="endereco"
                                        placeholder="R. Nome da Rua, 123 - Bairro - Cidade/UF - CEP"
                                        className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2"
                                        value={usuario.endereco}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 p-1" htmlFor="foto">
                                        Foto
                                    </label>
                                    <input
                                        type="text"
                                        id="foto"
                                        name="foto"
                                        placeholder="Insira o link da sua foto de perfil..."
                                        className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2"
                                        value={usuario.foto}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 p-1" htmlFor="senha">
                                        Senha
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={mostrarSenha ? "text" : "password"}
                                            id="senha"
                                            name="senha"
                                            placeholder="Insira sua senha..."
                                            className={`bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 pr-10 w-full ${!senhaValida ? "border border-red-500" : ""
                                                }`}
                                            value={usuario.senha}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 focus:outline-none"
                                            onClick={() => setMostrarSenha(!mostrarSenha)}
                                        >
                                            {mostrarSenha ? (
                                                <FaEyeSlash className="text-gray-500" />
                                            ) : (
                                                <FaEye className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    {!senhaValida && (
                                        <p className="text-red-500 text-sm mt-1">
                                            A senha deve ter no mínimo 8 caracteres.
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 p-1" htmlFor="confirmarSenha">
                                        Confirmar Senha
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={mostrarSenha ? "text" : "password"}
                                            id="confirmarSenha"
                                            name="confirmarSenha"
                                            placeholder="Confirmar Senha"
                                            className={`bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2 pr-10 w-full ${!senhasCoincidem ? "border border-red-500" : ""}`}
                                            value={confirmarSenha}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 focus:outline-none"
                                            onClick={() => setMostrarSenha(!mostrarSenha)}
                                        >
                                            {mostrarSenha ? (
                                                <FaEyeSlash className="text-gray-500" />
                                            ) : (
                                                <FaEye className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    {!senhasCoincidem && (
                                        <p className="text-red-500 text-sm mt-1">
                                            As senhas não coincidem.
                                        </p>
                                    )}
                                </div>
                                {/* Botões */}
                                <div className="flex justify-between w-full gap-8 py-6">
                                    <button
                                        type="reset"
                                        className="font-[family-name:var(--font-quicksand)] font-medium rounded-xl bg-[#E97E7E] hover:bg-[#B22222] text-white h-13 w-80 cursor-pointer"
                                        onClick={retornar}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={`font-[family-name:var(--font-quicksand)] font-medium rounded-xl bg-[#E02D2D] hover:bg-[#B22222] text-white h-13 w-80 cursor-pointer ${!botaoHabilitado ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        disabled={!botaoHabilitado}
                                    >
                                        {isLoading ? (
                                            <div className="flex justify-center items-center">
                                                <RotatingLines
                                                    strokeColor="white"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="24"
                                                    visible={true}
                                                />
                                            </div>
                                        ) : (
                                            <span>Cadastrar</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cadastro;