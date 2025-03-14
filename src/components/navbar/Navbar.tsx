import {
  ShoppingCart,
  List,
  X,
  User,
  SignIn,
  SignOut,
} from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { DropdownUsuario } from "./DropdownUsuario";
import logo from "../../assets/PedeAi_padrao.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  function handleBuscarProdutos(e) {
    setNome(e.target.value);
  }

  function buscarProdutos(e) {
    e.preventDefault();
    navigate(`/consultarnome/${nome}`);
    setNome("");
  }

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
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

  // Função para abrir/fechar o menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="font-body uppercase w-full px-8 py-3 bg-[#f1f1f1] dark:bg-[#121212] shadow-lg relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Botão do menu mobile */}
        <button
          className="lg:hidden text-red-100 border-3 rounded-lg border-red-100 p-1.25" // Alterado de md:hidden para lg:hidden
          onClick={toggleMenu}
        >
          <List size={32} weight="regular" />
        </button>

        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="Logo" className="w-28 md:w-35" />
        </Link>

        {/* Barra de busca (desktop) */}
        <div className="hidden lg:flex items-center w-2/5">
          {" "}
          {/* Alterado de md:flex para lg:flex */}
          <form className="flex w-full" onSubmit={buscarProdutos}>
            <input
              className="font-body w-full px-4 py-2 bg-white dark:bg-[#2D2D2D] dark:text-gray-200 rounded-lg focus:outline-red-100 border dark:focus:outline-[#FF5252] border-[#B8B8B8] dark:border-[#616161] shadow-sm"
              type="search"
              placeholder="Busque por itens ou lojas"
              required
              value={nome}
              onChange={handleBuscarProdutos}
            />
            <button
              type="submit"
              className="text-white p-2 ms-2 bg-red-100 hover:bg-[#e04a4a] dark:bg-[#FF5252] dark:hover:bg-[#FF3D3D] rounded-lg transition duration-300"
            >
              <MagnifyingGlass size={17} weight="bold" />
            </button>
          </form>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex gap-6 items-center ml-6">
          {" "}
          {/* Alterado de lg:flex para xl:flex se necessário */}
          <Link
            to="/produtos"
            className="text-[#333333] dark:text-white transition duration-300 ease-in-out hover:-translate-y-1 active:text-red-100"
          >
            Produtos
          </Link>
          <Link
            to="/categorias"
            className="text-[#333333] dark:text-white  transition duration-300 ease-in-out hover:-translate-y-1 active:text-red-100"
          >
            Categorias
          </Link>
          <Link
            to="/sobre"
            className="text-[#333333] dark:text-white  transition duration-300 ease-in-out hover:-translate-y-1 active:text-red-100"
          >
            Sobre
          </Link>
        </div>

        {/* Ícones do usuário e carrinho */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:block">
            {" "}
            {/* Alterado de md:block para lg:block */}
            {usuario.token ? (
              <DropdownUsuario />
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-lg text-red-100 dark:text-[#FF5252] transition duration-300 ease-in-out hover:-translate-y-1 active:text-[#e04a4a]"
              >
                <SignIn size={32} weight="regular" />
              </Link>
            )}
          </div>

          {/* Ícone do carrinho */}
          <Link
            to="/carrinho"
            className="p-2 bg-red-100 active:bg-[#e04a4a] dark:bg-[#FF5252] rounded-lg text-white cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1"
          >
            <ShoppingCart size={32} weight="regular" />
          </Link>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {" "}
          {/* Alterado de md:hidden para lg:hidden */}
          {/* Overlay com desfoque e transparência */}
          <div
            className="absolute inset-0 backdrop-brightness-80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
          {/* Conteúdo do Menu */}
          <div
            ref={menuRef}
            className="absolute top-0 h-full left-0 w-64 bg-[#E14848] bg-opacity-90 text-white py-4 z-50 shadow-lg"
          >
            <ul className="flex flex-col items-start px-4">
              <li className="w-full py-3 border-b border-gray-300">
                <Link
                  to="/produtos"
                  className="block transition duration-300 ease-in-out hover:-translate-y-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Produtos
                </Link>
              </li>
              <li className="w-full py-3 border-b border-gray-300">
                <Link
                  to="/categorias"
                  className="block transition duration-300 ease-in-out hover:-translate-y-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Categorias
                </Link>
              </li>
              <li className="w-full py-3 border-b border-gray-300">
                <Link
                  to="/sobre"
                  className="block transition duration-300 ease-in-out hover:-translate-y-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre
                </Link>
              </li>

              {usuario.token ? (
                <>
                  <li className="border-b border-gray-300 w-full py-3">
                    <Link
                      to="/perfil"
                      className="block transition duration-300 ease-in-out hover:-translate-y-1"
                    >
                      Perfil
                    </Link>
                  </li>

                  <li className="border-b border-gray-300 w-full py-3">
                    <button
                      onClick={logout}
                      className="block uppercase transition duration-300 ease-in-out hover:-translate-y-1"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <li className="border-b border-gray-300 w-full py-3">
                  <Link
                    to="/login"
                    className="block transition duration-300 ease-in-out hover:-translate-y-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
