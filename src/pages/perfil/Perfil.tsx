import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex justify-center md:w-screen mx-4">
        <div className="container  mx-auto my-4 rounded-2xl overflow-hidden">
          <img
            className="w-full h-72 object-cover border-b-8 border-white"
            src="https://ik.imagekit.io/22g34n0mo/Restaurantes/foodu.jpg?updatedAt=1741200397225"
            alt="Capa do Perfil"
          />

          <img
            className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
            src={usuario.foto}
            alt={`Foto de perfil de ${usuario.nome_usuario}`}
          />

          <div
            className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-[#CD533B] md:h-80  rounded-b-2xl text-white text-2xl items-center justify-center"
          >
            <p>Nome: {usuario.nome_usuario} </p>
            <p>Email: {usuario.usuario}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
