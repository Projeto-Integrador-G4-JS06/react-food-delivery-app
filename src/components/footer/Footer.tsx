import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <footer className="w-full bottom-0 fixed px-15 flex justify-center bg-[#CD533B] text-white font-heading">
      {/* Footer Responsivo (Mobile e Desktop) */}
      <div className="container mx-auto max-md:flex-col px-4 flex flex-row justify-between items-center py-4 pt-5">
        <Link
          to="/home"
          className="text-3xl font-logo ease-in-out hover:text-[#FFC100] transition-colors duration-200"
        >
          PedeAí!
        </Link>

        <p className="text-xs md:text-sm xl:text-lg py-2">
          Tá com fome? Pede Aí! | © {data}
        </p>

        <section className="flex gap-3 py-1">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo
              className="font-medium w-7 h-7 md:w-[35px] md:h-[35px] hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#FFC100]"
              aria-label="LinkedIn"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo
              className="font-medium w-7 h-7 md:w-[35px] md:h-[35px] hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#FFC100]"
              aria-label="Instagram"
            />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookLogo
              className="font-medium w-7 h-7 md:w-[35px] md:h-[35px] hover:-translate-y-1 transition duration-300 ease-in-out hover:text-[#FFC100]"
              aria-label="Facebook"
            />
          </a>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
