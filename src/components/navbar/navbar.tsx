import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Home", path: "/home"},
    { label: "Viagens", path: "/"},
    { label: "Sobre", path: "/sobre"},
  ]

  return (
    <header className="flex bg-gradient-custom font-roboto w-full p-4 items-center">
      <Link to={navigationItems[0].path} className="font-extrabold flex items-center gap-1">
        <img src={Logo} alt="Velo" className="w-10 scale-130" />
        <h1 className="text-2xl hidden sm:block " >VELO</h1>
      </Link>
      <nav className="font-bold sm:ml-auto flex items-center gap-5 text-black/80 ">
        <button
          className="sm:hidden focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >☰</button>
        {isOpen && (
          <div className="w-full h-full fixed bg-black/10 inset-0" onClick={() => setIsOpen(false)}></div>
        )}
        <div className={`z-10 fixed flex flex-col top-0 left-0 w-fit h-full p-6 rounded-r-xl items-center sm:hidden bg-gradient-custom transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} >
          <div className="flex mb-20 items-center">
            <img src={Logo} alt="Velo" className="w-10 scale-130" />
            <h1 className="flex text-2xl block " >VELO</h1>
          </div>
          {navigationItems.map((item) => (
            <Link to={item.path} className="mb-10 text-2xl">{item.label}</Link>
          ))} 
        </div>
        {navigationItems.map((item) => (
          <Link to={item.path} className="sm:flex hidden">{item.label}</Link>
        ))} 
      </nav>
      <div className="ml-10 flex gap-2 items-center font-bold sm:ml-10 ml-auto">
        <a href="#">Login</a>
        <a href="#" className="bg-custom-yellow rounded-xl p-1 px-3">Cadastre-se</a>
      </div>
    </header>
  )
}

export default Navbar