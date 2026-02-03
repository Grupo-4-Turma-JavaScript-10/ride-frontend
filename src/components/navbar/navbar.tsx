import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { ToastAlerta } from "../../util/ToastAlerta";
import Logo from "../../assets/Logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout, isAuthenticated, usuario } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigationItems = [
    { label: "Home", path: "/home" },
    { label: "Viagens", path: "/" },
    { label: "Perfil", path: "/perfil" },
    { label: "Sobre", path: "/sobre" },
  ];
  
  function logout() {
    handleLogout();
    ToastAlerta('Usuário deslogado com sucesso', 'info');
    setIsOpen(false);
    navigate('/');
  }
  
  return (
    <header className="flex bg-gradient-custom font-roboto w-full p-4 items-center">
      <Link to={navigationItems[0].path} className="font-extrabold flex items-center gap-1">
        <img src={Logo} alt="Velo" className="w-10 scale-130" />
        <h1 className="text-2xl hidden sm:block">VELO</h1>
      </Link>
      
      <nav className="font-bold sm:ml-auto flex items-center gap-5 text-black/80">
        <button
          className="sm:hidden focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
        
        {isOpen && (
          <div 
            className="w-full h-full fixed bg-black/10 inset-0 z-[5]" 
            onClick={() => setIsOpen(false)}
          />
        )}
        
        <div 
          className={`z-10 fixed flex flex-col top-0 left-0 w-fit h-full p-6 rounded-r-xl items-start sm:hidden bg-gradient-custom transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex mb-20 items-center">
            <img src={Logo} alt="Velo" className="w-10 scale-130" />
            <h1 className="flex text-2xl block ml-2">VELO</h1>
          </div>
          
          {navigationItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="mb-8 text-xl hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <button
              onClick={logout}
              className="mt-auto text-xl text-red-600 hover:text-red-700 transition-colors"
            >
              Sair
            </button>
          )}
        </div>
        
        {navigationItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className="sm:flex hidden hover:text-black transition-colors"
          >
            {item.label}
          </Link>
        ))} 
      </nav>
      
      <div className="ml-10 flex gap-2 items-center font-bold sm:ml-10 ml-auto">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:inline text-black/80">
              Olá, {usuario.nome || "Usuário"}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl p-1 px-3 transition-colors"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className="hover:text-black transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/cadastro" 
              className="bg-custom-yellow hover:bg-yellow-400 rounded-xl p-1 px-3 transition-colors"
            >
              Cadastre-se
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;