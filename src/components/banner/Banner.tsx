import 'swiper/swiper-bundle.css';
import './Banner.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
  // Array de objetos contendo a URL da imagem e o link
  const banners = [
    {
      image: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/Fa%C3%A7a_seu_pedido_agora!_upscaled.png?updatedAt=1741198804947',
      link: '/produtos',
    },
    {
      image: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/Fa%C3%A7a_seu_pedido_agora!_upscaled.png?updatedAt=1741198804947',
      link: '/comprar',
    },
    {
      image: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/Fa%C3%A7a_seu_pedido_agora!_upscaled.png?updatedAt=1741198804947',
      link: '/promocoes',
    },
  ];

  return (
    <div className="flex items-center w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 15000 }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            {/* Link na imagem */}
            <a href={banner.link}>
              <img
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;