import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { User } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";

interface DropdownUsuarioProps {
  children?: React.ReactNode;
}

export function DropdownUsuario({ children }: DropdownUsuarioProps) {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [usuarioDropdown, setUsuarioDropdown] = useState(false);
  const usuarioDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        usuarioDropdownRef.current &&
        !usuarioDropdownRef.current.contains(event.target as Node)
      ) {
        setUsuarioDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  return (
    <div className="relative capitalize z-20" ref={usuarioDropdownRef}>
      <button
        onClick={() => setUsuarioDropdown(!usuarioDropdown)}
        className="flex items-center cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1"
      >
        {/* Ícone visível apenas no desktop */}
        <div className="p-2 bg-[#FFC100] rounded-lg text-white hidden md:block">
          <User size={32} weight="regular" />
        </div>

        {/* Texto "Perfil" visível apenas no menu hambúrguer */}
        <span className="text-white hover:underline uppercase md:hidden">
          {children}
        </span>
      </button>

      {usuarioDropdown && (
        <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40 right-0">
          {usuario.token ? (  // Verificando se o usuário está autenticado (token não nulo)
            <>
              <Link
                to="/perfil"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setUsuarioDropdown(false)}
              >
                Perfil
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => setUsuarioDropdown(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}