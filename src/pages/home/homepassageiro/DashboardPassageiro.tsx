import React, { useState } from "react";

interface Destino {
  nome: string;
  endereco?: string;
}

interface Viagem {
  motorista: string;
  origem: string;
  destino: string;
  horario: string;
}

export default function Dashboard() {
  const [destino, setDestino] = useState(""); 
  const [destinosRecentes, setDestinosRecentes] = useState<Destino[]>([
    { nome: "Casa", endereco: "Rua das Flores, 123" },
    { nome: "Trabalho", endereco: "Av. Paulista, 1000" },
    { nome: "Shopping Center" },
  ]);

  const [proximaViagem, setProximaViagem] = useState<Viagem | null>({
    motorista: "Carlos Silva (Toyota Corolla)",
    origem: "Sua Localização Atual",
    destino: "Aeroporto de Congonhas",
    horario: "Hoje, 14:30",
  });

  const handleDestinoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestino(e.target.value);
  };

  const solicitarCarona = () => {
    if (!destino.trim()) {
      alert("Digite um destino antes de solicitar a carona!");
      return;
    }

    const novaViagem: Viagem = {
      motorista: "Motorista Aleatório (Carro XYZ)",
      origem: "Sua Localização Atual",
      destino,
      horario: "Agora",
    };

    setProximaViagem(novaViagem);

    setDestinosRecentes((prev) => [
      { nome: destino },
      ...prev.filter((d) => d.nome !== destino),
    ]);

    setDestino(""); 
  };

  const cancelarViagem = () => {
    setProximaViagem(null);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
        <div className="text-2xl font-bold flex items-center gap-2 mb-8">
          <span className="text-pink-400">📍</span>
          <span>Velo</span>
        </div>
        <button className="w-full text-left px-4 py-2 rounded-lg bg-linear-to-r from-yellow-200 to-pink-200 font-medium">
          Dashboard
        </button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Minhas Viagens</button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Pagamentos</button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Mensagens</button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Perfil</button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Ajuda</button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-6">Olá, Ana! Para onde vamos?</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={destino}
            onChange={handleDestinoChange}
            placeholder="Digite seu destino..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={solicitarCarona}
            className="px-6 py-3 bg-linear-to-r from-yellow-200 to-pink-200 rounded-lg font-semibold"
          >
            Solicitar Carona
          </button>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-3">Destinos Recentes</h2>
          <div className="flex gap-4">
            {destinosRecentes.map((dest) => (
              <div
                key={dest.nome}
                className="border border-pink-200 rounded-lg p-3 flex flex-col items-start gap-1 w-40"
              >
                <span className="text-pink-400">📍</span>
                <span className="font-medium">{dest.nome}</span>
                {dest.endereco && <span className="text-gray-500 text-sm">{dest.endereco}</span>}
              </div>
            ))}
          </div>
        </div>

        {proximaViagem && (
          <div className="border border-pink-200 rounded-lg p-6 flex flex-col gap-4 max-w-md">
            <h2 className="font-semibold text-lg">Próxima Viagem</h2>
            <p><strong>Motorista:</strong> {proximaViagem.motorista}</p>
            <p><strong>Origem:</strong> {proximaViagem.origem}</p>
            <p><strong>Destino:</strong> {proximaViagem.destino}</p>
            <p><strong>Horário:</strong> {proximaViagem.horario}</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-yellow-200 rounded-lg">Ver Detalhes</button>
              <button
                onClick={cancelarViagem}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
