import Logo from "../../assets/Logo.png"
import Vertex from "../../assets/vertex.png"

function footer() {
  return (
    <footer className="mt-auto p-5 bg-gradient-pink w-full flex mt-auto h-fit font-roboto flex-col items-center sm:items-start sm:flex-row ">
      <img src={Logo} alt="Velo" className="w-60"/>
      <div className="sm:mt-15 flex flex-col items-center sm:block">
        <h1 className="font-extrabold text-4xl mb-2">VELO</h1>
        <h2 className="font-extrabold text-white text-2xl mb-10">Vá do seu jeito</h2>
      </div>
      <img src={Vertex} alt="Vertex.Bah" className="sm:ml-auto mt-auto h-15 mb-5" />
    </footer>
  )
}

export default footer