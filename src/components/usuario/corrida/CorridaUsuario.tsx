import { CarIcon, MapPinIcon, ClockIcon, SpeedometerIcon, CalendarIcon, CheckIcon, X } from '@phosphor-icons/react';
import type Produto from '../../../models/Produto';

interface CorridasUsuarioProps {
  produtos: Produto[];
  tipoUsuario: 'PASSAGEIRO' | 'MOTORISTA';
}

function CorridasUsuario({ produtos, tipoUsuario }: CorridasUsuarioProps) {
  if (!produtos || produtos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <CarIcon size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nenhuma corrida encontrada
        </h3>
        <p className="text-gray-500">
          {tipoUsuario === 'MOTORISTA' 
            ? 'Você ainda não cadastrou nenhuma corrida.'
            : 'Você ainda não solicitou nenhuma corrida.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {tipoUsuario === 'MOTORISTA' ? 'Minhas Corridas Oferecidas' : 'Minhas Corridas Solicitadas'}
        </h2>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
          {produtos.length} {produtos.length === 1 ? 'corrida' : 'corridas'}
        </span>
      </div>

      <div className="space-y-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
              produto.ativo ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Informações principais */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {produto.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm">{produto.descricao}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    produto.ativo 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {produto.ativo ? (
                      <>
                        <CheckIcon size={16} weight="bold" />
                        <span className="text-sm font-semibold">Ativa</span>
                      </>
                    ) : (
                      <>
                        <X size={16} weight="bold" />
                        <span className="text-sm font-semibold">Inativa</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Rota */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPinIcon size={20} className="text-blue-600" weight="fill" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">ORIGEM</p>
                      <p className="text-sm font-semibold text-gray-800">{produto.origem}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <MapPinIcon size={20} className="text-red-600" weight="fill" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">DESTINO</p>
                      <p className="text-sm font-semibold text-gray-800">{produto.destino}</p>
                    </div>
                  </div>
                </div>

                {/* Detalhes da corrida */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <CarIcon size={18} className="text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Distância</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {produto.distanciaKm.toFixed(1)} km
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ClockIcon size={18} className="text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Tempo</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {produto.tempoMinutos} min
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <SpeedometerIcon size={18} className="text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Velocidade</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {produto.velocidadeMediaKmh} km/h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarIcon size={18} className="text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Data</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(produto.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                    {produto.categoria.placa}
                  </span>
                  {produto.motoristaMesmoGenero && (
                    <span className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
                      Motorista Mesmo Gênero
                    </span>
                  )}
                </div>
              </div>

              {/* Preço */}
              <div className="flex md:flex-col items-center md:items-end gap-2">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-6 py-4 rounded-lg text-center shadow-lg">
                  <p className="text-xs font-medium opacity-90 mb-1">PREÇO</p>
                  <p className="text-3xl font-bold">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CorridasUsuario;