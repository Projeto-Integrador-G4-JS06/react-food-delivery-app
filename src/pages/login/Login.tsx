import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

//   useEffect(() => {
//     if (usuario.token !== "") {
//       navigate("/home");
//     }
//   }, [usuario]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center bg-[radial-gradient(circle,_#F27294_0%,_#CD533B_100%)] font-bold">
        <form
          className="flex justify-center items-center flex-col w-1/2 gap-4"
          onSubmit={login}
        >
          <h2 className="text-white text-2xl border-b-2 border-b-white p-3 w-full font-poppins">
            Faça login com sua conta
          </h2>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Email"
              className="font-inter p-2 bg-[#eeeeee] rounded-xl text-gray-500"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="font-inter p-2 bg-[#eeeeee] rounded-xl text-gray-500"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-[#FFC100] flex justify-center
                                   hover:bg-amber-200 hover:cursor-pointer font-inter text-white w-full py-2"
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

          <p className="font-inter -mt-2 text-sm text-white">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="text-amber-300 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="fundoLogin  lg:block"></div>
      </div>
    </>
  );
}

export default Login;
