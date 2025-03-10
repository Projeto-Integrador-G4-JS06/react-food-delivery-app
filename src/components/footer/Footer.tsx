import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import logo from '../../assets/PedeAi_padrao.svg';

function Footer() {
  let data = new Date().getFullYear();

    return (
        <footer className="w-full px-15 flex justify-center bg-[#F0F0F0] text-[#333333] font-heading">
      {/* Footer Responsivo (Mobile e Desktop) */}
      <div className="container mx-auto max-md:flex-col px-5 flex flex-row justify-between items-center py-4 pt-5">
        <Link to="/home" className="w-28 md:w-35">
          <img src={logo} alt="" />
        </Link>

        <p className="text-xs md:text-sm xl:text-lg py-2 text-center">
        Bateu a fome? Quer comer saudável? Pede Aí! | © {data} 
        </p>

        <section className="flex gap-3 py-1">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo
              className="font-medium text-red-100 w-7 h-7 md:w-[35px] md:h-[35px] hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#e04a4a]"
              aria-label="LinkedIn"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo
              className="font-medium text-red-100 w-7 h-7 md:w-[35px] md:h-[35px] hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#e04a4a]"
              aria-label="Instagram"
            />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookLogo
              className="font-medium text-red-100 w-7 h-7 md:w-[35px] md:h-[35px] hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#e04a4a]"
              aria-label="Facebook"
            />
          </a>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
