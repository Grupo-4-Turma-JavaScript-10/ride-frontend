import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { ToastAlerta } from "../../util/ToastAlerta";
import Logo from "../../assets/Logo.png";
import DefaultUserImage from "../../assets/default-user.png";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout, isAuthenticated, usuario } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Home", path: "/home" },
    ...(isAuthenticated
      ? [
          { label: "Viagens", path: "/" },
          { label: "Perfil", path: "/perfil" },
        ]
      : []),
    { label: "Sobre", path: "/sobre" },
  ];

  const logout = () => {
    handleLogout();
    ToastAlerta("Usuário deslogado com sucesso", "info");
    setIsOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => navigate("/perfil");

  return (
    <header className="flex bg-gradient-custom font-roboto w-full p-4 items-center justify-between sticky top-0 z-50">
      <Link
        to={navigationItems[0].path}
        className="font-extrabold flex items-center gap-1 text-black hover:text-gray-100 transition-colors"
      >
        <img
          src={Logo}
          alt="Velo"
          className="w-10 transform transition-transform duration-300 hover:scale-110"
        />
        <h1 className="text-2xl hidden sm:block">VELO</h1>
      </Link>

      <nav className="font-bold sm:ml-auto flex items-center gap-5 text-black relative">
        <button
          className="sm:hidden focus:outline-none text-2xl text-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          ☰
        </button>

        {isOpen && (
          <div
            className="w-full h-full fixed bg-black/50 inset-0 z-5"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`z-10 fixed flex flex-col top-0 left-0 w-fit h-full p-6 rounded-r-xl items-start sm:hidden bg-gradient-custom transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex mb-20 items-center">
            <img
              src={Logo}
              alt="Velo"
              className="w-10 transform transition-transform duration-300 hover:scale-110"
            />
            <h1 className="flex text-2xl ml-2 text-black">VELO</h1>
          </div>

          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="mb-8 text-xl text-black hover:text-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="mt-auto text-xl text-white hover:text-gray-100 transition-colors"
            >
              Sair
            </button>
          )}
        </div>

        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative hidden sm:inline-block text-black hover:text-gray-100 transition-colors"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-200 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>

      <div className="ml-10 flex gap-4 items-center font-bold sm:ml-10">
        {isAuthenticated ? (
          <>
            <div
              className="flex items-center gap-3 cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={handleProfileClick}
            >
              <img
                src={usuario.foto || DefaultUserImage}
                alt="Foto de Perfil"
                className="w-12 h-12 rounded-full object-cover border-4 border-white shadow-lg hover:border-indigo-400 transition-colors"
              />
              <span className="hidden sm:inline text-black/80">
                Olá, {usuario.nome || "Usuário"}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white rounded-xl p-2 px-4 transition-all duration-300"
            >
              <span>Sair</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-black hover:text-gray-100 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/cadastro"
              className="bg-custom-yellow hover:bg-yellow-400 text-black rounded-xl p-2 px-4 transition-colors"
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