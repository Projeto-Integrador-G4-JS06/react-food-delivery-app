import 'swiper/swiper-bundle.css';
import './Banner.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
  // Array de objetos contendo a URL da imagem para diferentes tamanhos
  const banners = [
    {
      image: {
        small: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/banner01_small.png?updatedAt=1741271203444',
        medium: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/1.png?updatedAt=1741271831216',
        large: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/Fa%C3%A7a_seu_pedido_agora!_upscaled.png?updatedAt=1741198804947',
      },
      link: '/produtos',
    },
    {
      image: {
        small: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/banner01_small.png?updatedAt=1741271203444',
        medium: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/1.png?updatedAt=1741271831216',
        large: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/Fa%C3%A7a_seu_pedido_agora!_upscaled.png?updatedAt=1741198804947',
      },
      link: '/produtos',
    },
    {
      image: {
        small: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/banner01_small.png?updatedAt=1741271203444',
        medium: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/1.png?updatedAt=1741271831216',
        large: 'https://ik.imagekit.io/iyume/pede%20a%C3%AD/Fa%C3%A7a_seu_pedido_agora!_upscaled.png?updatedAt=1741198804947',
      },
      link: '/produtos',
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
                srcSet={`${banner.image.small} 320w, ${banner.image.medium} 768w, ${banner.image.large} 1024w`}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 768px, 1024px"
                src={banner.image.medium} // Fallback
                alt={`Banner ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
