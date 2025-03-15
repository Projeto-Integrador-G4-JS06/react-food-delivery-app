import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

interface CardSobreProps {
  nome: string;
  imagem: string;
  cargo: string;
  responsabilidades: string[];
  linkedin: string;
  github: string;
}

function CardSobre({nome, imagem, cargo, responsabilidades, linkedin, github}: CardSobreProps) {
    return (
        <div className='flex flex-col justify-center items-center bg-[#ECE9E3] border-1 border-[#ae0606] max-w-sm rounded-xl m-2 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out'>
            
            <div className="w-full h-32 bg-[#E02D2D] flex justify-center items-end relative">
                
                <img
                    src={imagem}
                    alt="Foto de perfil"
                    className='w-40 h-40 md:w-50 md:h-50 rounded-full object-cover border-4 border-[#ECE9E3] transform translate-y-1/2'
                />
            </div>

            {/* Conteúdo abaixo da foto */}
            <div className='flex flex-col items-center gap-1 mt-20 md:mt-30 mb-4 px-4'>
                <h1 className='font-heading text-xl md:text-2xl text-center text-[#ae0606] font-medium'>
                    {nome}
                </h1>

                <div className="flex flex-col mt-4 text-start gap-1 h-40">
                    <p className="text-sm md:text-base">{cargo}</p>
                    <p className="text-sm md:text-base">Responsável por:</p>
                    <ul className='list-disc list-outside pl-6 text-left text-sm md:text-base'>
                        {responsabilidades.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Ícones */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-6 w-full px-4">
                    <a href={linkedin} target='_blank' className='flex gap-2 items-center justify-center text-[#ae0606] font-medium border-1 border-[#ae0606] p-2 rounded-md hover:bg-[#e02d2d] hover:text-white'>
                        <LinkedinLogo size={24} weight="light" /> <span className="hidden md:inline">Linkedin</span>
                    </a>
                    <a href={github} target='_blank' className='flex gap-2 items-center justify-center text-[#ae0606] font-medium border-1 border-[#ae0606] p-2 rounded-md hover:bg-[#e02d2d] hover:text-white'>
                        <GithubLogo size={24} weight="light" /> <span className="hidden md:inline">Github</span>
                    </a>
                </div>
            </div>
        </div>
  );
}

export default CardSobre;
