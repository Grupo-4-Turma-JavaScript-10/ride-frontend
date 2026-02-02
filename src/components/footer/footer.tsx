import { Link } from 'react-router-dom';
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { Mail } from 'lucide-react';
import Logo from "../../assets/Logo.png";
import Vertex from "../../assets/vertex.png";

const Footer = () => {
  return (
    <footer className="bg-pink-700 text-white py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

        <div className="flex flex-col items-center md:items-start gap-2 md:w-1/4">
          <img src={Logo} alt="Velo" className="w-20 sm:w-24" />
          <div className="text-center md:text-left">
            <h1 className="font-extrabold text-2xl">VELO</h1>
            <p className="text-sm text-white/90">Vá do seu jeito</p>
          </div>
          <div className="flex space-x-3 mt-1">
            <a href="#" className="hover:text-white/70 transition-colors">
              <InstagramLogoIcon className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              <GithubLogoIcon className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              <LinkedinLogoIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:w-1/4 gap-2 text-white/90">
          <span className="font-bold text-sm mb-2">Navegação</span>
          <Link to="/" className="hover:underline text-sm">Home</Link>
          <Link to="/produtos" className="hover:underline text-sm">Produtos</Link>
          <Link to="/sobre" className="hover:underline text-sm">Sobre Nós</Link>
          <Link to="/contato" className="hover:underline text-sm">Contato</Link>
        </div>

        <div className="flex flex-col md:w-1/4 gap-1 text-white/90 text-sm">
          <span className="font-bold mb-2">Contato</span>
          <p className="flex items-center gap-1"><Mail className="w-4 h-4" /> contato@velo.com</p>
          <p>📞 (51) 9999-9999</p>
          <p>📍 Porto Alegre, RS</p>
        </div>

        <div className="flex justify-center md:justify-end md:w-1/4">
          <img src={Vertex} alt="Vertex.Bah" className="h-12" />
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs text-white/70">
        &copy; {new Date().getFullYear()} Velo. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;