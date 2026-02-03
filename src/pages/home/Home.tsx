import homeImg from "../../assets/homeImg.png"
import driver from "../../assets/driver.png"
import driverPink from "../../assets/home/driverpink.png"
import money from "../../assets/home/money.png"
import people from "../../assets/home/people.png"
import loginImg from "../../assets/home/loginimg.png"

function Home() {
  const funcionamento = [
    {
      img: loginImg,
      texto: "Busque seu destino, selecione a carona que respeita sua identidade e reserve sua vaga para viajar com total liberdade e segurança."
    },
    {
      img: loginImg,
      texto: "Filtre suas viagens por gênero para garantir um ambiente onde você se sinta totalmente à vontade e seguro."
    },
    {
      img: loginImg,
      texto: "Cadastre-se com verificação de identidade e personalize seu perfil com suas preferências e grupos de afinidade, garantindo conexões autênticas e segurança desde a primeira viagem."
    }
  ]

  return (
    <main>
      <section className="font-roboto flex bg-cover sm:bg-center bg-position-[65%_35%] w-full min-h-110" style={{
        backgroundImage: `url(${homeImg})`
      }}>
        <div className="flex flex-col w-full">
          <div className="bg-black/50 sm:bg-black/0 mt-12 p-5  sm:p-0 mx-auto sm:ml-12 rounded-lg ">
            <h1 className="text-white text-3xl sm:text-6xl font-extrabold self-start">Vá do seu <span className="text-custom-pink">jeito</span></h1>
            <h2 className="text-white text-2x1 sm:text-5xl font-extrabold mt-2 sm:mt-5 self-start">Chegue aonde <span className="text-custom-yellow">quiser</span></h2>
          </div>
          <section className="shadow-lg flex flex-col">
            <div className="flex w-full gap-5 ">
              <form className="bg-white rounded-lg p-4 mt-10 flex flex-wrap gap-5 max-w-150 w-full ml-5 sm:ml-20 [container-type:inline-size]">
                <input
                  type="text"
                  id="partida"
                  name="partida"
                  placeholder="Partida"
                  className="border rounded-sm p-1 font-regular sm:max-w-[47cqmin] w-full indent-3 "
                />
                <input
                  type="text"
                  id="local"
                  name="local"
                  placeholder="Para onde ir?"
                  className="border rounded-sm p-1 font-regular sm:max-w-[47cqmin] w-full indent-3"
                />
                <input
                  type="date"
                  id="data"
                  name="data"
                  className="text-gray-600 border rounded-sm p-1 font-regular indent-3 sm:max-w-[60cqmin] w-full"
                />
                <button className="border rounded-sm p-1 font-regular w-43 bg-black/80 font-semibold sm:max-w-[34cqmin] w-full"><p className="bg-linear-to-r from-[#FFF7AD] to-[#FFA9F9] bg-clip-text text-transparent">Achar uma viagem</p></button>
              </form>
              <div className="shadow-lg ml-auto mt-auto mr-4 sm:mr-12 bg-white rounded-xl p-3 font-semibold">
                <p>Você é motorista?</p>
                <div className="flex items-center">
                  <p>Clique aqui!</p>
                  <div className="bg-custom-yellow rounded-full aspect-square p-2 ml-auto">
                    <img src={driver} alt="motorista" className="w-6 aspect-square" />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="bg-black/50 sm:bg-black/0 p-1 rounded-md mb-5 ml-20 max-w-150 sm:w-full text-center text-custom-yellow font-bold w-fit mt-5 sm:text-xl self-start">Liberdade para ser e viajar</p>
          </section>
        </div>
      </section>
      <section className="font-roboto flex flex-col items-center sm:-translate-y-10 -translate-y-3 ">
          <div className="flex gap-5 sm:flex-row flex-col items-start justify-around w-[90%] bg-gray-100 rounded-xl p-4 transform-translate shadow-lg">
            <div className="flex gap-3 items-center sm:max-w-52">
              <img src={money} alt="Dinheiro" className="h-10 aspect-square"/>
              <div>
                <p className="text-sm font-bold">Preço justo </p>
                <p className="text-xs">Viagens excelentes por valores acessiveis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:max-w-52">
              <img src={driverPink} alt="Motorista" className="h-10 aspect-square" />
              <div>
                <p className="text-sm font-bold">Motoristas Confiaveis</p>
                <p className="text-xs">Otimos motoristas com dados armazenados para seguranca</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:max-w-52">
              <img src={people} alt="People" className="h-12 aspect-square" />
              <div>
                <p className="text-sm font-bold">Filtro de afinidade</p>
                <p className="text-xs">Viagens com motoristas do mesmo genero</p>
              </div>
            </div>
        </div>
      </section>
      <section className="font-roboto flex flex-col items-center w-full sm:px-15 px-5 mb-7">
        <h1 className="mt-10 sm:mt-0 font-extrabold mb-10">COMO O <span className="text-custom-pink">VELO</span> FUNCIONA?</h1>
        <div className="font-semibold text-center flex flex-wrap justify-around w-full sm:gap-3 gap-10">
          {funcionamento.map((texto, index) => (
            <div key={index} className="flex flex-col sm:w-70 w-full gap-4 items-center">
              <img src={texto.img} alt="" className="border rounded-lg"/>
              <p className="w-[85%]">{texto.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home