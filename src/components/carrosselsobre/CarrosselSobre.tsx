
import Slider from 'react-slick';
import CardSobre from '../cardsobre/CardSobre';

const CardsDados = [
  {
    nome: "Alan",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/alan.png?updatedAt=1740587313242",
    cargo: "Desenvolvedor Full Stack",
    responsabilidades: ['CardCategorias', 'ListarCategorias', 'FormCategorias'],
    linkedin: "https://www.linkedin.com/in/alanbmrosa/",
    github: "https://github.com/alanbrunoscience"
  },
  {
    nome: "Fernando",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/fernando.jpeg?updatedAt=1740587313152",
    cargo: "Desenvolvedor Full Stack",
    responsabilidades: ['Perfil', 'Deploy','Home-Produtos Saudáveis', 'Documentação'],
    linkedin: "https://www.linkedin.com/in/fernando-lana/",
    github: "https://github.com/loslanas"
  },
  {
    nome: "Gabriela",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/gaba1.jpg?updatedAt=1740588316189",
    cargo: "Desenvolvedora Full Stack",
    responsabilidades: ['Login', 'FormProdutos'],
    linkedin: "https://www.linkedin.com/in/gaba-teixeira/",
    github: "https://github.com/gaba-teixeira"
  },
  {
    nome: "Isis",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/Isis.png?updatedAt=1740587313258",
    cargo: "Desenvolvedora Full Stack",
    responsabilidades: ['Home', 'NavBar e Footer', 'DeletarProduto', 'Figma'],
    linkedin: "https://www.linkedin.com/in/isis-okamoto/",
    github: "https://github.com/iyumw"
  },
  {
    nome: "João",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/joao.jpg?updatedAt=17405883031848",
    cargo: "Desenvolvedor Full Stack",
    responsabilidades: ['Service', 'Model', 'CadastroUsuario'],
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-henrique-0665081a2/",
    github: "https://github.com/Jhacss"
  },
  {
    nome: "Lia",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/lia%20(1).jpg?updatedAt=1740587359401",
    cargo: "Desenvolvedora Full Stack",
    responsabilidades: ['Identidade Visual', 'Sobre', 'CarrosselSobre', 'CardSobre'],
    linkedin: "https://www.linkedin.com/in/liamatsubara/",
    github: "https://github.com/liamatsubara"
  },
  {
    nome: "Samuel",
    imagem: "https://ik.imagekit.io/liaMatsubara/rh_fotos/samuel.jpeg?updatedAt=1740587313309",
    cargo: "Desenvolvedor Full Stack & Tester",
    responsabilidades: ['API Back-End', 'CardProduto', 'Tester','Design Responsivo'],
    linkedin: "https://www.linkedin.com/in/samueldos-santos/",
    github: "https://github.com/Samuel-1210"
  },
];

function CarrosselSobre() {
  // Configurações do Slick
  const settings = {
    dots: true, // Mostra os pontos de navegação
    infinite: true, // Loop infinito
    speed: 500, // Velocidade da transição
    slidesToShow: 3, // Quantidade de slides visíveis
    slidesToScroll: 1, // Quantidade de slides a rolar por vez
    centerMode: true,
    autoplay: true, // Ativa o autoplay
    autoplaySpeed: 2000, // Define o intervalo entre os slides em milissegundos
    responsive: [
      {
        breakpoint: 1024, // Telas grandes
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 912, // Surface Pro 7
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 853, // Telas médias
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820, // Telas médias
        settings: {
          slidesToShow: 2,
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
    <div className="p-4 flex flex-col justify-center">
      <Slider {...settings}>
        {CardsDados.map((card, index) => (
          <div key={index} className="flex justify-center">
            <CardSobre
              nome={card.nome}
              imagem={card.imagem}
              cargo={card.cargo}
              responsabilidades={card.responsabilidades}
              linkedin={card.linkedin}
              github={card.github}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarrosselSobre;