import Slider from "react-slick";
import CardCategoriaHome from "../categorias/cardcategorias/CardCategoriaHome";
import Categoria from "../../models/Categoria";
import { useEffect, useState } from "react";
import { listar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";



function CarroselCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
   const navigate = useNavigate(); 

    function handleCategoriaClick(nomeCategoria: string) {
      navigate(`/produtos/categoria/${nomeCategoria}`);
    } 

  async function buscarCategorias() {
    try {
      await listar("/categorias/all", setCategorias);
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(`Erro ao listar as Categorias: ${error.message}`, "erro");
      } else {
        ToastAlerta("Erro desconhecido ao listar as Categorias!", "erro");
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  const settings = {
    dots: false, // Mostra os pontos de navegação
    infinite: true, // Loop infinito
    speed: 500, // Velocidade da transição
    slidesToShow: 6, // Quantidade de slides visíveis
    slidesToScroll: 1, // Quantidade de slides a rolar por vez
    centerMode: true,
    autoplay: false, // Ativa o autoplay
    autoplaySpeed: 2000, // Define o intervalo entre os slides em milissegundos
    responsive: [
      {
        breakpoint: 1024, // Telas grandes
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Telas médias
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Telas pequenas
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="p-10 -mb-5 overflow-hidden">
        <Slider {...settings}>
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="cursor-pointer"
              onClick={() => handleCategoriaClick(categoria.nome_categoria)}
            >
              <CardCategoriaHome categoria={categoria} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CarroselCategoria;
