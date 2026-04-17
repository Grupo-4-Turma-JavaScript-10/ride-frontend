import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../util/ToastAlerta";
import Logo from "../../assets/Logo.png";
import DefaultUserImage from "../../assets/default-user.png";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout, isAuthenticated, usuario, isMotorista } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    handleLogout();
    ToastAlerta("Usuário deslogado com sucesso", "info");
    setIsOpen(false);
    navigate("/");
  }

  function handleProfileClick() {
    navigate("/perfil");
  }

  const navigationItems = [
    { label: "Home", path: "/home" },
    ...(isAuthenticated
      ? [
          { label: "Meu Painel", path: "/dashboard" },
          { label: "Viagem", path: "/produtos" },
          ...(isMotorista ? [{ label: "Veículos", path: "/categorias" }] : []),
        ]
      : []),
    { label: "Sobre", path: "/sobre" },
  ];

  return (
    <header className="bg-gradient-custom font-roboto w-full sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/home"
            className="font-extrabold flex items-center gap-2 text-black hover:opacity-80 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={Logo}
                alt="Velo"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
            </div>
            <h1 className="text-2xl hidden sm:block tracking-tight">VELO</h1>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-black font-semibold rounded-lg hover:bg-black/5 transition-all duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-black group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div
                  className="hidden sm:flex items-center gap-3 cursor-pointer hover:bg-black/5 rounded-xl px-3 py-2 transition-all duration-200 group"
                  onClick={handleProfileClick}
                >
                  <div className="relative">
                    <img
                      src={usuario?.foto || DefaultUserImage}
                      alt="Perfil"
                      className="w-10 h-10 rounded-full object-cover border-3 border-white shadow-md group-hover:shadow-lg transition-all duration-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden lg:flex flex-col">
                    <span className="text-xs text-black/60 font-medium">Bem-vindo</span>
                    <span className="text-sm text-black font-semibold -mt-0.5">{usuario?.nome}</span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 bg-black hover:bg-gray-800 text-white rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-block text-black font-semibold hover:bg-black/5 px-5 py-2.5 rounded-xl transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/cadastro"
                  className="bg-custom-yellow hover:bg-yellow-400 text-black font-bold rounded-xl px-5 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                >
                  Cadastre-se
                </Link>
              </>
            )}

            <button
              className="lg:hidden p-2 text-black  hover:bg-black/5 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-gradient-custom z-50 flex flex-col lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex items-center justify-between p-6 bg-white">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Velo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">VELO</h1>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 hover:bg-black/10 rounded-full transition-all duration-200"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20 bg-white">
          {isAuthenticated && (
            <div 
              className="mb-12 flex flex-col items-center cursor-pointer group" 
              onClick={handleProfileClick}
            >
              <div className="relative mb-3">
                <img 
                  src={usuario?.foto || DefaultUserImage} 
                  alt="Perfil" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200" 
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full" />
              </div>
              <span className="text-xl font-bold text-black">{usuario?.nome}</span>
              <span className="text-sm text-black/60">Ver perfil</span>
            </div>
          )}

          <nav className="w-full max-w-sm">
            <div className="space-y-3">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-center px-6 py-4 text-xl font-bold text-black bg-white/50 hover:bg-white/70 rounded-2xl transition-all duration-200 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                  style={{
                    animation: isOpen ? `fadeInUp 0.4s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="w-full max-w-sm mt-12">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white rounded-2xl px-6 py-4 text-lg font-bold transition-all duration-200 shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sair
              </button>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  className="block w-full text-center text-black font-bold bg-white/50 hover:bg-white/70 px-6 py-4 text-lg rounded-2xl transition-all duration-200" 
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/cadastro" 
                  className="block w-full text-center bg-custom-yellow hover:bg-yellow-400 text-black font-bold rounded-2xl px-6 py-4 text-lg transition-all duration-200 shadow-lg hover:scale-105" 
                  onClick={() => setIsOpen(false)}
                >
                  Cadastre-se
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </header>
  );
}

export default Navbar;