import homeImg from "../../assets/homeImg.png"
import driver from "../../assets/driver.png"
import driverPink from "../../assets/home/driverpink.png"
import money from "../../assets/home/money.png"
import people from "../../assets/home/people.png"
import loginImg from "../../assets/home/loginimg.png"
import { useContext, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import  Generoimg  from "../../assets/home/genero.png"
import DestinoImg from "../../assets/home/destino.png"

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [buscaCarona, setBuscaCarona] = useState({
    partida: '',
    destino: '',
    data: ''
  });

  const funcionamento = [
    {
      img: DestinoImg,
      texto: "Busque seu destino, selecione a carona que respeita sua identidade e reserve sua vaga para viajar com total liberdade e segurança."
    },
    {
      img: Generoimg,
      texto: "Filtre suas viagens por gênero para garantir um ambiente onde você se sinta totalmente à vontade e seguro."
    },
    {
      img: loginImg,
      texto: "Cadastre-se com verificação de identidade e personalize seu perfil com suas preferências e grupos de afinidade, garantindo conexões autênticas e segurança desde a primeira viagem."
    }
  ]

  const diferenciais = [
    {
      titulo: "Viaje com Quem Respeita Você",
      descricao: "No Velo, acreditamos que toda viagem deve ser uma experiência confortável e segura. Por isso, oferecemos filtros de afinidade que permitem escolher motoristas e passageiros que compartilham dos mesmos valores de respeito e diversidade."
    },
    {
      titulo: "Comunidade Inclusiva",
      descricao: "Somos mais que um app de carona. Somos uma comunidade que celebra a diversidade e promove conexões genuínas. Aqui, pessoas LGBTQIA+, mulheres e aliados encontram um espaço seguro para compartilhar viagens."
    },
    {
      titulo: "Segurança em Primeiro Lugar",
      descricao: "Todos os perfis passam por verificação de identidade. Você pode avaliar motoristas e passageiros, compartilhar sua localização em tempo real e contar com suporte 24/7 para qualquer situação."
    }
  ]

  const beneficios = [
    {
      icone: "🌈",
      titulo: "Diversidade Celebrada",
      texto: "Um espaço onde você pode ser autêntico sem medo de julgamentos"
    },
    {
      icone: "🛡️",
      titulo: "Verificação de Identidade",
      texto: "Todos os usuários passam por verificação rigorosa antes de viajar"
    },
    {
      icone: "⭐",
      titulo: "Sistema de Avaliações",
      texto: "Avalie e seja avaliado para construir uma comunidade de confiança"
    },
    {
      icone: "💬",
      titulo: "Chat Seguro",
      texto: "Converse com motoristas e passageiros antes de confirmar a viagem"
    },
    {
      icone: "📍",
      titulo: "Rastreamento em Tempo Real",
      texto: "Compartilhe sua localização com pessoas de confiança durante a viagem"
    },
    {
      icone: "🎯",
      titulo: "Filtros Personalizados",
      texto: "Escolha viagens que respeitem suas preferências e identidade"
    }
  ]

  const depoimentos = [
    {
      nome: "Maria Silva",
      texto: "Finalmente um app onde me sinto segura para viajar! Os filtros de gênero fazem toda diferença.",
      avaliacao: 5
    },
    {
      nome: "João Pedro",
      texto: "Como motorista, adoro poder conectar com pessoas que compartilham valores de respeito e inclusão.",
      avaliacao: 5
    },
    {
      nome: "Ana Costa",
      texto: "Economizo dinheiro e ainda faço viagens incríveis com pessoas que me respeitam. Recomendo!",
      avaliacao: 5
    }
  ]

  const handleBuscarViagem = (e: FormEvent) => {
    e.preventDefault();

    navigate('/cadastrarproduto', {
      state: {
        origem: buscaCarona.partida,
        destino: buscaCarona.destino,
        data: buscaCarona.data
      }
    });
  };

  const handleMotorista = () => {
    navigate('/cadastrarproduto');
  };

  return (
    <main className="overflow-x-hidden">
      <section className="font-roboto flex bg-cover sm:bg-center bg-position-[65%_35%] w-full min-h-110 relative" style={{
        backgroundImage: `url(${homeImg})`
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 sm:bg-gradient-to-r sm:from-black/50 sm:via-transparent sm:to-transparent"></div>

        <div className="flex flex-col w-full relative z-10">
          <div className="mt-12 p-5 sm:p-0 mx-auto sm:ml-12 sm:mt-20">
            <h1 className="text-white text-3xl sm:text-7xl font-extrabold self-start drop-shadow-lg">
              Vá do seu <span className="text-custom-pink">jeito</span>
            </h1>
            <h2 className="text-white text-2xl sm:text-6xl font-extrabold mt-2 sm:mt-5 self-start drop-shadow-lg">
              Chegue aonde <span className="text-custom-yellow">quiser</span>
            </h2>
            <p className="text-white text-lg sm:text-2xl mt-4 max-w-2xl drop-shadow-md font-medium">
              A plataforma de carona que celebra a diversidade e garante viagens seguras para todos
            </p>
          </div>

          <section className=" flex flex-col mt-8">
            <div className="flex w-full gap-5 flex-wrap lg:flex-nowrap">
              <form
                onSubmit={handleBuscarViagem}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mt-10 flex flex-wrap gap-5 max-w-150 w-full ml-5 sm:ml-20 shadow-xl border border-gray-200"
              >
                <div className="w-full sm:w-[calc(50%-0.625rem)]">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">De onde você sai?</label>
                  <input
                    type="text"
                    id="partida"
                    name="partida"
                    placeholder="Cidade de partida"
                    value={buscaCarona.partida}
                    onChange={(e) => setBuscaCarona({ ...buscaCarona, partida: e.target.value })}
                    className="border-2 border-gray-300 rounded-lg p-3 font-regular w-full indent-3 focus:border-custom-pink focus:outline-none transition-colors"
                  />
                </div>

                <div className="w-full sm:w-[calc(50%-0.625rem)]">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Para onde vai?</label>
                  <input
                    type="text"
                    id="local"
                    name="local"
                    placeholder="Cidade de destino"
                    value={buscaCarona.destino}
                    onChange={(e) => setBuscaCarona({ ...buscaCarona, destino: e.target.value })}
                    className="border-2 border-gray-300 rounded-lg p-3 font-regular w-full indent-3 focus:border-custom-pink focus:outline-none transition-colors"
                  />
                </div>

                <div className="w-full sm:w-[calc(50%-0.625rem)]">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Quando?</label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={buscaCarona.data}
                    onChange={(e) => setBuscaCarona({ ...buscaCarona, data: e.target.value })}
                    className="text-gray-600 border-2 border-gray-300 rounded-lg p-3 font-regular w-full indent-3 focus:border-custom-pink focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-[calc(50%-0.625rem)] border-2 border-transparent rounded-lg p-2 font-regular bg-gradient-to-r from-black to-black font-bold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <p className="text-white text-lg">
                    Buscar Viagem
                  </p>
                </button>
              </form>

              <button
                onClick={handleMotorista}
                className="shadow-xl ml-5 lg:ml-auto mt-10 lg:mt-auto mr-5 sm:mr-12 mb-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5 font-semibold hover:shadow-2xl transition-all cursor-pointer border border-gray-200 hover:scale-105 transform"
              >
                <p className="text-lg mb-2">Você é motorista?</p>
                <div className="flex items-center gap-3">
                  <p className="text-custom-pink font-bold text-xl">Oferece uma carona!</p>
                  <div className="bg-custom-yellow rounded-full aspect-square p-3 ml-auto">
                    <img src={driver} alt="motorista" className="w-7 aspect-square" />
                  </div>
                </div>
              </button>
            </div>

            <p className="bg-gradient-to-r from-pink-500 to-pink-500 p-3 rounded-lg mb-5 ml-5 sm:ml-20 max-w-150 sm:w-fit text-center text-white font-bold mt-5 text-xl self-start shadow-lg">
              Liberdade para ser e viajar com segurança
            </p>
          </section>
        </div>
      </section>

      <section className="font-roboto flex flex-col items-center sm:-translate-y-10 -translate-y-3 px-5">
        <div className="flex gap-5 sm:flex-row flex-col items-start justify-around w-[90%] max-w-7xl bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 transform-translate shadow-2xl border border-gray-100">
          <div className="flex gap-4 items-center sm:max-w-72 hover:scale-105 transition-transform">
            <div className="bg-custom-yellow/20 rounded-full p-3">
              <img src={money} alt="Dinheiro" className="h-12 aspect-square" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-800">Preço Justo</p>
              <p className="text-sm text-gray-600 mt-1">Viagens excelentes por valores acessíveis. Economize e viaje mais!</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:max-w-72 hover:scale-105 transition-transform">
            <div className="bg-custom-pink/20 rounded-full p-3">
              <img src={driverPink} alt="Motorista" className="h-12 aspect-square" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-800">Motoristas Confiáveis</p>
              <p className="text-sm text-gray-600 mt-1">Motoristas verificados com dados armazenados para sua segurança</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:max-w-72 hover:scale-105 transition-transform">
            <div className="bg-purple-100 rounded-full p-3">
              <img src={people} alt="People" className="h-12 aspect-square" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-800">Filtro de Afinidade</p>
              <p className="text-sm text-gray-600 mt-1">Viagens com motoristas do mesmo gênero ou grupos de afinidade</p>
            </div>
          </div>
        </div>
      </section>

      <section className="font-roboto flex flex-col items-center w-full sm:px-15 px-5 mb-16 mt-12">
        <div className="max-w-7xl w-full">
          <h1 className="mt-10 sm:mt-0 font-extrabold mb-4 text-3xl sm:text-4xl text-center">
            COMO O <span className="text-custom-pink">VELO</span> FUNCIONA?
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            Em apenas 3 passos simples você encontra a carona perfeita que respeita sua identidade
          </p>

          <div className="font-semibold flex flex-wrap justify-center w-full gap-8">
            {funcionamento.map((texto, index) => (
              <div key={index} className="flex flex-col sm:w-80 w-full gap-5 items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:scale-105 transform">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 bg-gradient-to-br from-custom-pink to-custom-yellow text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <img src={texto.img} alt="" className="border-4 border-gray-100 rounded-xl shadow-md" />
                </div>
                <p className="w-full text-center text-gray-700 leading-relaxed">{texto.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
            Por que escolher o <span className="text-custom-pink">VELO</span>?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            Mais que um app de carona, somos uma comunidade que celebra a diversidade
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {diferenciais.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
            Benefícios que fazem a <span className="text-custom-yellow">diferença</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Recursos pensados para sua segurança e conforto
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:scale-105 transform">
                <div className="text-4xl mb-3">{beneficio.icone}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{beneficio.titulo}</h3>
                <p className="text-gray-600 text-sm">{beneficio.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-white">
            O que dizem nossos <span className="text-custom-yellow">viajantes</span>
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Histórias reais de pessoas que viajam com segurança e liberdade
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex mb-3">
                  {[...Array(depoimento.avaliacao)].map((_, i) => (
                    <span key={i} className="text-custom-yellow text-xl">★</span>
                  ))}
                </div>
                <p className="text-white mb-4 italic">"{depoimento.texto}"</p>
                <p className="text-custom-pink font-bold">— {depoimento.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{!isAuthenticated && (
      <section className="bg-gradient-to-r from-custom-pink to-custom-yellow py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Pronto para viajar com liberdade?
          </h2>
          <p className="text-white text-lg sm:text-xl mb-8 opacity-90">
            Junte-se a milhares de pessoas que já viajam com segurança, respeito e economia
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/cadastro')}
              className="bg-white text-custom-pink font-bold px-8 py-4 rounded-full text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Cadastre-se Agora
            </button>
            <button
              onClick={() => navigate('/cadastro')}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white hover:text-custom-pink transition-all transform hover:scale-105"
            >
              Sou Motorista
            </button>
          </div>
        </div>
      </section>
)}
      <section className="bg-gray-900 py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-white">
            <div>
              <h3 className="font-bold text-xl mb-4 text-custom-yellow">Sobre o Velo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Conectando pessoas com segurança, respeito e celebrando a diversidade em cada viagem.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-custom-pink">Segurança</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>✓ Verificação de identidade</li>
                <li>✓ Avaliações em tempo real</li>
                <li>✓ Suporte 24/7</li>
                <li>✓ Rastreamento de viagens</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-custom-yellow">Comunidade</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>✓ Inclusiva e diversa</li>
                <li>✓ Filtros de afinidade</li>
                <li>✓ Respeito garantido</li>
                <li>✓ Conexões autênticas</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-custom-pink">Vantagens</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>✓ Preços acessíveis</li>
                <li>✓ Economia de combustível</li>
                <li>✓ Viagens sustentáveis</li>
                <li>✓ Novas amizades</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home