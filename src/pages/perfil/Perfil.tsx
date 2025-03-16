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

  // Função para converter o nome da categoria em title case
  const toTitleCase = (str: string | undefined): string => {
    if (!str) return ''; // Retorna uma string vazia se str for undefined ou null
    return str
      .toLowerCase() // Converte toda a string para minúsculas
      .split(' ') // Divide a string em um array de palavras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
      .join(' '); // Junta as palavras de volta em uma única string
  };

  const getImagemSrc = (foto?: string) => {
    return foto && foto.trim() !== ""
      ? foto
      : "https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/user.png?updatedAt=1742050532225";
  };

  return (
    <section className="container w-full mx-auto flex flex-col justify-center">
      <div className="flex justify-center items-center min-h-[80vh]">
        {/* <div className="md:w-screen mx-0 md:mx-10 lg:mx-15"> */}
        <div className="container flex flex-col bg-[#B2B2B2] m-8 rounded-2xl overflow-hidden dark:bg-dark-gray-300">
          <div
            className="w-full h-72 object-cover round border-b-8 border-white"
          />
          <img
            className="rounded-full w-56 h-56 mx-auto md:mx-8 mt-[-8rem] border-7
              border-white relative z-10"
            src={getImagemSrc(usuario?.foto)}
            alt={`Foto de perfil de ${toTitleCase(usuario.nome_usuario)}`}
          />

          <div
            className="relative font-[family-name:var(--font-heading)] font-normal 
              mt-[-6rem] h-72 flex flex-col bg-[#FF5656] md:h-80 rounded-b-2xl
                      md:py-[8%] lg:py-[2%] py-[30%] px-[2%] md:px-[38%] 
                      lg:px-[25%] xl:px-[20%] dark:bg-dark-red-600"
          >
            <div className="flex flex-col text-center items-center text-white text-base md:text-xl my-3 md:mx-2 md:my-8 lg:px-[1%] md:items-start md:flex-col md:gap-4">
              <div className="flex flex-col md:w-max gap-1">
                <span className="font-bold text-center md:text-start">
                  Nome:
                </span>
                <p>{toTitleCase(usuario.nome_usuario)}</p>
              </div>
              <div className="flex flex-col h-full">
                <span className="font-bold text-center md:text-start">
                  Email:
                </span>
                <p>{usuario.usuario}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Perfil;