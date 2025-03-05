import { ShoppingCart, User } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownUsuario } from "./DropdownUsuario";

function Navbar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>("");

  function handleBuscarProdutos(e: ChangeEvent<HTMLInputElement>) {
    setNome(e.target.value);
  }

  function buscarProdutos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/consultarnome/${nome}`);
    setNome("");
  }

  return (
    <>
      <div className="font-body uppercase flex justify-center w-full px-15 py-[10px] text-white bg-[#CD533B] shadow-lg">
        <div className="container flex items-center justify-between mx-4 text-">
          <Link to="/home">
            <img
              src="https://ik.imagekit.io/iyume/pede%20a%C3%AD/logo.png?updatedAt=1741184467390"
              alt="Logo"
              className="w-20" // Ajuste o tamanho da logo aqui
            />
          </Link>

          <div className="relative flex items-center justify-center w-2/5 text-black">
            <form
              className="flex items-center justify-center w-full"
              onSubmit={buscarProdutos}
            >
              <input
                className="font-body w-10/12 px-4 py-4 bg-white rounded-lg h-9 focus:outline-[#FFA500]"
                type="search"
                placeholder="Busque por itens ou lojas"
                id="nome"
                name="nome"
                required
                value={nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleBuscarProdutos(e)}
              />
              <button
                type="submit"
                className="h-10 w-10 p-2.5 ms-2 text-sm font-medium text-white bg-[#FFC100] hover:bg-[#FFA500] rounded-lg border border-[#FFC100] transition duration-300 ease-in-out"
              >
                <MagnifyingGlass size={17} weight="bold" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-7 py-4">
            <Link
              to="/produtos"
              className="hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#FFC100]"
            >
              Produtos
            </Link>
            <Link
              to="/categorias"
              className="hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#FFC100]"
            >
              Categorias
            </Link>
            <Link
              to="/sobre"
              className="hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#FFC100]"
            >
              Sobre
            </Link>
            <DropdownUsuario />

            <Link
              to="/carrinho"
              className="cursor-pointer border-[#FFC100] rounded-xl p-1.5 bg-[#FFC100] hover:text-pink-50 transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <ShoppingCart size={32} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;