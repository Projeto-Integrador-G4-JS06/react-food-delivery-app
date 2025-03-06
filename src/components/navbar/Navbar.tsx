import { ShoppingCart, List, X } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { DropdownUsuario } from "./DropdownUsuario";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nome, setNome] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleBuscarProdutos(e: ChangeEvent<HTMLInputElement>) {
    setNome(e.target.value);
  }

  function buscarProdutos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/consultarnome/${nome}`);
    setNome("");
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="font-body uppercase w-full px-5 py-3 bg-[#CD533B] shadow-lg relative">
      <div className="container mx-auto flex items-center justify-between">
        <button
          className="md:hidden text-white border-3 rounded-lg border-[#FFC100] p-1.25"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={32} /> : <List size={32} weight="regular" />}
        </button>

        <Link to="/home">
          <img
            src="https://ik.imagekit.io/iyume/pede%20a%C3%AD/logo.png?updatedAt=1741184467390"
            alt="Logo"
            className="w-20"
          />
        </Link>

        <div className="hidden md:flex items-center w-2/5">
          <form className="flex w-full" onSubmit={buscarProdutos}>
            <input
              className="font-body w-full px-4 py-2 bg-white rounded-lg focus:outline-[#FFA500]"
              type="search"
              placeholder="Busque por itens ou lojas"
              required
              value={nome}
              onChange={handleBuscarProdutos}
            />
            <button
              type="submit"
              className="p-2 ms-2 bg-[#FFC100] hover:bg-[#FFA500] rounded-lg border transition duration-300"
            >
              <MagnifyingGlass size={17} weight="bold" />
            </button>
          </form>
        </div>

        <div className="hidden md:flex gap-6 items-center ml-6">
          <Link
            to="/produtos"
            className="text-white transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Produtos
          </Link>
          <Link
            to="/categorias"
            className="text-white transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Categorias
          </Link>
          <Link
            to="/sobre"
            className="text-white transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Sobre
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Ícone do perfil só aparece no desktop */}
          <div className="hidden md:block">
            <DropdownUsuario />
          </div>

          {/* Carrinho continua visível */}
          <Link
            to="/carrinho"
            className="p-2 bg-[#FFC100] rounded-lg text-white cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1"
          >
            <ShoppingCart size={32} weight="regular" />
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 backdrop-brightness-80"
            onClick={() => setMenuOpen(false)}
          ></div>
          <nav
            ref={menuRef}
            className="absolute top-[100px] left-0 w-4/6 bg-[#CD533B] text-white py-2 z-50 shadow-lg"
          >
            <ul className="flex flex-col items-start px-4">
              <li className="w-full py-3 border-b border-gray-400">
                <Link
                  to="/produtos"
                  className="transition duration-300 ease-in-out hover:-translate-y-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Produtos
                </Link>
              </li>
              <li className="w-full py-3 border-b border-gray-400">
                <Link
                  to="/categorias"
                  className="transition duration-300 ease-in-out hover:-translate-y-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Categorias
                </Link>
              </li>
              <li className="w-full py-3 border-b border-gray-400">
                <Link
                  to="/sobre"
                  className="transition duration-300 ease-in-out hover:-translate-y-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre
                </Link>
              </li>
              <li className="w-full py-3">
                <DropdownUsuario>
                  <span className="text-white hover:underline uppercase">
                    Perfil
                  </span>
                </DropdownUsuario>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
