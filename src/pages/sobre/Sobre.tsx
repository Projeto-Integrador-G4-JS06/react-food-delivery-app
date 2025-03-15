import { ClipLoader } from "react-spinners";
import CarrosselSobre from "../../components/carrosselsobre/CarrosselSobre";
import { useState } from "react";
import banner_mobile_dark from '../../assets/dark_mobile_sobre.svg';
import banner_ipad_dark from '../../assets/dark_ipad_sobre.svg';
import banner_dark from '../../assets/dark_sobre.svg';

interface SobreProps {
  isDark: boolean;
}

function Sobre({ isDark }: SobreProps) {

  return (
    <div className="flex justify-center min-h-screen bg-[#ece9e3] dark:bg-dark-gray-200">
      <div className="container">
        <div className="mx-4 md:dark:mx-0">

          {/* Banner */}
          <div className="w-full flex justify-center">
            {/* light mode */}
            {!isDark && (
              <>
                {/* Imagem para telas maiores (desktop) */}
                <img
                  src="https://ik.imagekit.io/liaMatsubara/sobre_2.png?updatedAt=1741791068392"
                  alt="Banner PedeAí"
                  className="hidden lg:block w-full h-auto"
                />

                {/* Imagem para iPads */}
                <img
                  src="https://ik.imagekit.io/liaMatsubara/ipad_sobre.svg?updatedAt=1741964437819"
                  alt="Banner PedeAí iPad"
                  className="hidden md:block lg:hidden w-full h-auto"
                />

                {/* Imagem para telas menores (mobile) */}
                <img
                  src="https://ik.imagekit.io/liaMatsubara/sobre2(1080%20x%202600%20px).png?updatedAt=1741793083828"
                  alt="Banner PedeAí Mobile"
                  className="block md:hidden w-full h-auto"
                />
              </>
            )}

            {/* dark mode */}
            {isDark && (
              <>
                {/* Imagem para telas maiores (desktop) */}
                <img
                  src={banner_dark}
                  alt="Banner PedeAí"
                  className="hidden lg:block w-full h-auto"
                />

                {/* Imagem para iPads */}
                <img
                  src={banner_ipad_dark}
                  alt="Banner PedeAí iPad"
                  className="hidden md:block lg:hidden w-full h-auto"
                />

                {/* Imagem para telas menores (mobile) */}
                <img
                  src= {banner_mobile_dark}
                  alt="Banner PedeAí Mobile"
                  className="block md:hidden w-full h-auto"
                />
              </>
            )}
          </div>

          {/* Seção do Carrossel */}
          <div className="flex justify-center">
            <h1 className="font-heading text-2xl md:text-4xl text-[#e02d2d] font-medium my-4 md:mb-8 text-center pt-5">
              Conheça Nosso Time
            </h1>
          </div>

          <div className="mb-30 dark:md:mx-6">
            <CarrosselSobre />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
