import vertexLogo from "../../assets/vertex.png";
import pedro from "../../assets/sobre/Pedro.png";
import assis from "../../assets/sobre/Assis.png";
import gabi from "../../assets/sobre/Gabi.png";
import kaua from "../../assets/sobre/Kaua.png";
import lia from "../../assets/sobre/Lia.png";
import pati from "../../assets/sobre/Pati.png";

function Sobre() {
  const valores = [
    {
      titulo: "Excelência Técnica",
      descricao: "Aplicamos boas práticas, padrões modernos e tecnologias consolidadas para garantir qualidade e performance."
    },
    {
      titulo: "Colaboração",
      descricao: "Acreditamos que o trabalho em equipe é essencial para criar soluções sólidas e sustentáveis."
    },
    {
      titulo: "Aprendizado Contínuo",
      descricao: "Estamos em constante evolução, acompanhando tendências e aprimorando nossas habilidades."
    },
    {
      titulo: "Inovação",
      descricao: "Buscamos soluções criativas que resolvem problemas reais de forma eficiente."
    },
    {
      titulo: "Profissionalismo",
      descricao: "Compromisso com prazos, clareza na comunicação e entrega de valor em cada projeto."
    }
  ];

  const stackFrontend = ["React", "TypeScript", "Tailwind CSS", "Vite"];
  const stackBackend = ["Node.js", "NestJS", "TypeScript", "MySQL"];
  const ferramentas = ["Git", "GitHub", "VS Code", "Trello"];

  const team = [
    {
      name: "Pedro Santana",
      role: "Full Stack Developer",
      img: pedro,
      description: "Atua no desenvolvimento de interfaces modernas e APIs escaláveis, com foco em qualidade e organização."
    },
    {
      name: "Assis Neto",
      role: "Full Stack Developer",
      img: assis,
      description: "Desenvolvedor orientado a boas práticas, código limpo e soluções eficientes."
    },
    {
      name: "Gabrieli Martins",
      role: "Full Stack Developer",
      img: gabi,
      description: "Experiência em front-end e foco em usabilidade e experiência do usuário."
    },
    {
      name: "Kaua Gabriel",
      role: "Full Stack Developer",
      img: kaua,
      description: "Explora novas tecnologias e aborda desafios técnicos com pensamento analítico."
    },
    {
      name: "Lilia Santos",
      role: "Full Stack Developer",
      img: lia,
      description: "Focada em performance, organização de código e otimização de aplicações web."
    },
    {
      name: "Patricia da Rosa",
      role: "Full Stack Developer",
      img: pati,
      description: "Atuação voltada à arquitetura de software e desenvolvimento de soluções escaláveis."
    }
  ];

  return (
    <main className="w-full ">
      <section
        className="min-h-screen px-[5%] py-32 flex flex-col items-center">
        <div className="inset-0 backdrop-blur-sm" />

        <header className="text-center mb-20">
          <h1 className="font-sansita text-6xl md:text-7xl font-bold mb-6">
            Sobre a Vertex.bah
          </h1>
          <div className="mx-auto h-1 w-24 bg-orange-600 rounded-full" />
        </header>

        <section className="max-w-6xl w-full bg-black/20 rounded-3xl shadow-2xl p-10 md:p-14 flex flex-col md:flex-row gap-12 items-center mb-20">
          <img
            src={vertexLogo}
            alt="Vertex.bah"
            className="w-64 md:w-80 drop-shadow-lg"
          />
          <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-gray-900">
              Tecnologia com identidade e propósito
            </h2>
            <p>
              A <strong className="text-orange-600">Vertex.bah</strong> é uma organização de desenvolvimento de software formada por profissionais apaixonados por tecnologia e inovação. Criamos soluções digitais modernas, escaláveis e alinhadas às necessidades reais de pessoas e empresas.
            </p>
            <p>
              Nossa trajetória começou no Bootcamp da Generation Brasil, onde o trabalho em equipe, a troca de conhecimento e a prática constante fortaleceram nossa base técnica e profissional.
            </p>
            <p>
              Atuamos no desenvolvimento full stack, entregando desde interfaces responsivas e acessíveis até APIs robustas e seguras, sempre com foco em qualidade, desempenho e experiência do usuário.
            </p>
          </div>
        </section>

        <section className="max-w-6xl w-full mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor) => (
              <div
                key={valor.titulo}
                className="bg-black/20 rounded-2xl p-8 shadow-xl border border-white/20 hover:-translate-y-1 transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {valor.descricao}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl w-full mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Stack Tecnológica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ title: "Frontend", items: stackFrontend }, { title: "Backend", items: stackBackend }, { title: "Ferramentas", items: ferramentas }].map((group) => (
              <div
                key={group.title}
                className="bg-black/20 rounded-2xl p-8 shadow-xl text-center"
              >
                <h3 className="text-2xl font-bold text-orange-600 mb-6">
                  {group.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl w-full mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nosso Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member) => (
              <article
                key={member.name}
                className="bg-black/20 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center hover:-translate-y-1 transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-36 h-36 rounded-full object-cover mb-4 ring-4 ring-orange-600"
                />
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <span className="text-sm font-semibold text-orange-600 mb-3">
                  {member.role}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="text-center max-w-3xl">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para transformar sua ideia em produto?
          </h3>
          <p className="text-lg mb-8">
            Entre em contato conosco e descubra como a Vertex.bah pode ajudar no seu próximo projeto digital.
          </p>
          <button className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg transition">
            Fale Conosco
          </button>
        </footer>
      </section>
    </main>
  );
}

export default Sobre;