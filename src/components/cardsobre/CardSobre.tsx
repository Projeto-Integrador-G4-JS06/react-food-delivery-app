import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

interface CardSobreProps {
    nome: string;
    imagem: string;
    cargo: string;
    responsabilidades: string[];
    linkedin: string;
    github: string;
}

function CardSobre({ nome, imagem, cargo, responsabilidades, linkedin, github }: CardSobreProps) {
    return (
        <div className='flex flex-col bg-[#f6eed9] border-1 border-[#FFA500] max-w-sm rounded-xl
        m-2 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out'>
            
            <div className="w-full h-32 bg-[#FFC100] flex justify-center items-end relative">
                <img
                    src={imagem}
                    alt="Foto de perfil"
                    className='w-50 h-50 rounded-full object-cover border-4 border-[#f6eed9] 
                    transform translate-y-1/2'
                />
            </div>
            
            <div className='flex flex-col items-center gap-1 mt-30 mb-4 px-4'>
                <h1 className='font-heading text-2xl text-center text-[#CD533B] font-medium'>
                    {nome}
                </h1>

                <div className="flex flex-col mt-4 text-center gap-1 h-50">
                    <p className="font-semibold">{cargo}</p>
                    <p>Responsável por:</p>
                    <ul className='list-disc list-outside pl-6 text-left '>
                        {responsabilidades.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Ícones e botões responsivos */}
                <div className="flex md:gap-8 mt-6 justify-between gap-8">
                    <a href={linkedin} target='_blank' className='text-[#CD533B] p-0 rounded-md max-sm:border-0
                    border-1 border-[#CD533B] hover:bg-[#ffa600] hover:text-white 
                    flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 md:gap-2'>
                        <LinkedinLogo size={32} weight="bold" />
                        <span className="hidden md:inline">Linkedin</span>
                    </a>
                    <a href={github} target='_blank' className='text-[#CD533B] p-0 rounded-md max-sm:border-0
                    border-1 border-[#CD533B] hover:bg-[#ffa600] hover:text-white 
                    flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 md:gap-2'>
                        <GithubLogo size={32} weight="bold" />
                        <span className="hidden md:inline">Github</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CardSobre;