import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importe os ícones de olho

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false); // Estado para mostrar/ocultar senha

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <>
      <section className="container w-full mx-auto flex flex-col p-4 justify-center">
        <div className="flex items-center justify-center xl:my-4 xl:mx-30">
          <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-screen">
            <div className="place-items-center bg-[#F8F8F8] flex justify-center w-full xl:w-5/4 rounded-2xl z-10 px-4">
              <form
                className="flex flex-col gap-4 w-80 xl:w-3/5"
                onSubmit={login}
              >
                <h2 className="text-[#33333] font-bold text-2xl text-center border-b-1 border-b-black p-6 w-full font-heading">
                  Faça login com sua conta
                </h2>
                <div className="flex flex-col mt-4 w-full">
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Email"
                    className="bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] p-2"
                    value={usuarioLogin.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full relative">
                  <input
                    type={mostrarSenha ? "text" : "password"} // Alterna entre texto e senha
                    id="senha"
                    name="senha"
                    placeholder="Senha"
                    className="p-2 bg-[#eeeeee] rounded-xl text-gray-700 focus:outline-[#e02d2d] pr-10 w-full"
                    value={usuarioLogin.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    onClick={() => setMostrarSenha(!mostrarSenha)} // Alterna a visibilidade
                  >
                    {mostrarSenha ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-[#e02d2d] flex justify-center
                                   hover:bg-[#D46A6A] hover:cursor-pointer  text-white w-full py-2 mt-4"
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
                    <span>Entrar</span>
                  )}
                </button>

                <p className="-mt-2 text-sm text-[#33333] text-center">
                  Ainda não tem uma conta?{" "}
                  <Link
                    to="/cadastro"
                    className="text-[#e02d2d] hover:underline "
                  >
                    Cadastre-se
                  </Link>
                </p>
              </form>
            </div>
            <div className="hidden xl:block rounded-r-2xl bg-[#FF5656] fundoLogin"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;