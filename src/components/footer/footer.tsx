import { Link } from 'react-router-dom';
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from "../../assets/Logo.png";
import Vertex from "../../assets/vertex.png";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-custom-pink to-pink-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3 mb-4">
              <img src={Logo} alt="Velo" className="w-16 h-16 sm:w-20 sm:h-20" />
              <div>
                <h1 className="font-extrabold text-2xl sm:text-3xl">VELO</h1>
                <p className="text-xs sm:text-sm text-white/90 font-medium">Vá do seu jeito</p>
              </div>
            </div>
            <p className="text-sm text-white/80 text-center sm:text-left mb-4 leading-relaxed">
              Conectando pessoas com segurança, respeito e celebrando a diversidade.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramLogoIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <GithubLogoIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinLogoIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-white">Navegação</h3>
            <nav className="flex flex-col gap-2.5 text-center sm:text-left">
              <Link 
                to="/" 
                className="text-sm sm:text-base text-white/90 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Home
              </Link>
              <Link 
                to="/produtos" 
                className="text-sm sm:text-base text-white/90 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Viagens
              </Link>
              <Link 
                to="/categorias" 
                className="text-sm sm:text-base text-white/90 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Veículos
              </Link>
              <Link 
                to="/sobre" 
                className="text-sm sm:text-base text-white/90 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Sobre Nós
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-white">Contato</h3>
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <a 
                href="mailto:contato@velo.com"
                className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-white/90 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>contato@velo.com</span>
              </a>
              <a 
                href="tel:+5551999999999"
                className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-white/90 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>(51) 9999-9999</span>
              </a>
              <p className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-white/90">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Porto Alegre, RS</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-white">Desenvolvido por</h3>
            <div className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-200">
              <img 
                src={Vertex} 
                alt="Vertex.Bah" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-white/70 mt-3 text-center sm:text-left">
              Tecnologia e inovação para conectar pessoas
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/80">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Velo. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link to="/privacidade" className="hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link to="/termos" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;