import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { User } from "@phosphor-icons/react";

export function DropdownUsuario() {
  const navigate = useNavigate();
  //   const { handleLogout, usuario } = useContext(AuthContext);
  const [usuarioDropdown, setUsuarioDropdown] = useState(false);
  const usuarioDropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
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
    // handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  return (
    <div className="relative capitalize" ref={usuarioDropdownRef}>
      <button
        onClick={() => setUsuarioDropdown(!usuarioDropdown)}
        className="cursor-pointer border-[#FFC100] rounded-xl p-1.5 bg-[#FFC100] hover:text-pink-50 transition duration-300 ease-in-out hover:-translate-y-1"
      >
        <User size={32} weight="bold" />
      </button>
      {usuarioDropdown && (
        <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40 left-0">
          {/* {usuario ? ( */}
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
          {/* ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => setUsuarioDropdown(false)}
            >
              Login
            </Link> */}
          {/* )} */}
        </div>
      )}
    </div>
  );
}