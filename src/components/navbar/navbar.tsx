import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../util/ToastAlerta";
import Logo from "../../assets/Logo.png";
import DefaultUserImage from "../../assets/default-user.png";


function Navbar() {
  const navigate = useNavigate();
  const {
    handleLogout,
    isAuthenticated,
    usuario,
    isMotorista,
  } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

const navigationItems = [
  { label: "Home", path: "/home" },

  ...(isAuthenticated
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Perfil", path: "/perfil" },
        { label: "Viagem", path: "/produtos" },
        ...(isMotorista
          ? [{ label: "Veículos", path: "/categorias" }]
          : [])
      ]
    : []),

  { label: "Sobre", path: "/sobre" },
];

  function logout() {
    handleLogout();
    ToastAlerta("Usuário deslogado com sucesso", "info");
    setIsOpen(false);
    navigate("/");
  }

  function handleProfileClick() {
    navigate("/perfil");
  }

  return (
    <header className="flex bg-gradient-custom font-roboto w-full p-4 items-center justify-between sticky top-0 z-50">
      <Link
        to="/home"
        className="font-extrabold flex items-center gap-1 text-black hover:text-gray-100 transition-colors"
      >
        <img
          src={Logo}
          alt="Velo"
          className="w-10 transition-transform duration-300 hover:scale-110"
        />
        <h1 className="text-2xl hidden sm:block">VELO</h1>
      </Link>

      <nav className="font-bold sm:ml-auto flex items-center gap-5 text-black relative">
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          ☰
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-5"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 h-full w-fit p-6 rounded-r-xl bg-gradient-custom z-10 flex flex-col transition-transform duration-300 sm:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center mb-20">
            <img src={Logo} alt="Velo" className="w-10" />
            <h1 className="text-2xl ml-2">VELO</h1>
          </div>

          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="mb-8 text-xl hover:text-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="mt-auto text-xl text-white hover:text-gray-100"
            >
              Sair
            </button>
          )}
        </div>

        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative hidden sm:inline-block hover:text-gray-100"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-200 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>

      <div className="ml-10 flex gap-4 items-center font-bold">
        {isAuthenticated ? (
          <>
            <div
              className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={handleProfileClick}
            >
              <img
                src={usuario?.foto || DefaultUserImage}
                alt="Perfil"
                className="w-12 h-12 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <span className="hidden sm:inline text-black/80">
                Olá, {usuario?.nome}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white rounded-xl px-4 py-2 transition"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-100">
              Login
            </Link>
            <Link
              to="/cadastro"
              className="bg-custom-yellow hover:bg-yellow-400 text-black rounded-xl px-4 py-2 transition"
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