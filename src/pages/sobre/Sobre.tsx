import CarrosselSobre from "../../components/carrosselsobre/CarrosselSobre";

function Sobre() {
    return (
        <div className="flex justify-center min-h-screen bg-[#ece9e3]">
            <div className="container">
                <div className="mx-4">

                    {/* Banner */}
                    <div className="w-full flex justify-center">
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
                    </div>

                    {/* Seção do Carrossel */}
                    <div className="flex justify-center">
                        <h1 className="font-heading text-2xl md:text-4xl text-[#e02d2d] font-medium my-4 md:mb-8 text-center">
                            Conheça Nosso Time
                        </h1>
                    </div>

                    <div className="mb-30">
                        <CarrosselSobre />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Sobre;
