import CardSobre from "../../components/cardsobre/CardSobre"
import CarrosselSobre from "../../components/carrosselsobre/CarrosselSobre"

function Sobre() {
    return (
        <div className="flex justify-center min-h-screen bg-[#f6eed9]">
            <div className="container">
                <div className="mx-4">
                    {/* sobre o projeto */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col justify-center items-center gap-8">
                            <h1 className="font-heading text-4xl text-[#CD533B] font-medium">
                                Tá com fome? PedeAí!
                            </h1>
                            <div>
                                <p>
                                    Com o <span className="font-semibold">PedeAí</span>, pedir comida é simples e rápido. Escolha entre diversos restaurantes, encontre o prato perfeito e receba tudo no conforto da sua casa – sem complicação e do jeito que você gosta!
                                </p>
                                <br />
                                <h1 className="text-lg font-semibold">Comida saudável? A gente tem! 🥗✨</h1>
                                <br />
                                <p>
                                    Quer uma refeição equilibrada sem abrir mão do sabor? No <span className="font-semibold">PedeAí</span>, você encontra uma <span className="font-semibold">categoria exclusiva de alimentos saudáveis</span>, onde pode filtrar as opções pelo <span className="font-semibold">Nutri Score</span> e fazer escolhas mais conscientes sem perder tempo.
                                </p>
                                <br />
                                <p>
                                    Peça agora e descubra como é fácil matar a fome com o <span className="font-semibold">PedeAí</span>!
                                </p>
                            </div>

                        </div>

                        <div className="">
                            <img src="https://ik.imagekit.io/liaMatsubara/Obrigado!.svg?updatedAt=1741277224988" alt="" className="" />
                        </div>
                    </div>

                    <hr className="my-20 border-t-2 border-[#FFA500]" />

                    <div className="flex justify-center">
                        <h1 className="font-heading text-4xl text-[#CD533B] font-medium mb-8">
                            Conheça Nosso Time
                        </h1>


                    </div>

                    <div className="mb-30">
                        <CarrosselSobre />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Sobre