import { useState, useEffect } from 'react';
import { UserIcon, CameraIcon, X, CheckIcon } from '@phosphor-icons/react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import type Usuario from '../../../models/Usuario';
import { ToastAlerta } from '../../../util/ToastAlerta';

interface PerfilUsuarioProps {
    usuario: Usuario;
    onUpdate: (usuarioAtualizado: Usuario) => void;
}


const GENEROS = [
    "Feminino",
    "Masculino",
    "Não binário",
    "Outro",
    "Gênero fluido",
    "Agênero",
    "Bigênero",
    "Transgênero",
    "Intergênero"
];

function PerfilUsuario({ usuario, onUpdate }: PerfilUsuarioProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Omit<Usuario, 'id' | 'produto'>>({
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: '',
        foto: usuario.foto,
        sexo: usuario.sexo,
        data: usuario.data,
        tipoUsuario: usuario.tipoUsuario,
    });
    const [previewFoto, setPreviewFoto] = useState<string>(usuario.foto);
    const [confirmarSenha, setConfirmarSenha] = useState('');

    useEffect(() => {
        setFormData({
            nome: usuario.nome,
            usuario: usuario.usuario,
            senha: '',
            foto: usuario.foto,
            sexo: usuario.sexo,
            data: usuario.data,
            tipoUsuario: usuario.tipoUsuario,
        });
        setPreviewFoto(usuario.foto);
    }, [usuario]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            foto: value,
        }));
        setPreviewFoto(value);
    };

    const validarFormulario = (): boolean => {
        if (!formData.nome.trim()) {
            ToastAlerta('O nome é obrigatório', 'erro');
            return false;
        }

        if (!formData.usuario.trim()) {
            ToastAlerta('O nome de usuário é obrigatório', 'erro');
            return false;
        }

        if (formData.senha && formData.senha !== confirmarSenha) {
            ToastAlerta('As senhas não coincidem', 'erro');
            return false;
        }

        if (formData.senha && formData.senha.length < 6) {
            ToastAlerta('A senha deve ter no mínimo 6 caracteres', 'erro');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validarFormulario()) return;

        setLoading(true);
        try {

            await new Promise((resolve) => setTimeout(resolve, 1000));

            const usuarioAtualizado: Usuario = {
                ...usuario,
                ...formData,
                senha: formData.senha || usuario.senha,
            };

            onUpdate(usuarioAtualizado);
            ToastAlerta('Perfil atualizado com sucesso!', 'sucesso');
            setIsEditing(false);
            setFormData((prev) => ({ ...prev, senha: '' }));
            setConfirmarSenha('');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            ToastAlerta('Erro ao atualizar perfil', 'erro');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelar = () => {
        setFormData({
            nome: usuario.nome,
            usuario: usuario.usuario,
            senha: '',
            foto: usuario.foto,
            sexo: usuario.sexo,
            data: usuario.data,
            tipoUsuario: usuario.tipoUsuario,
        });
        setPreviewFoto(usuario.foto);
        setConfirmarSenha('');
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Meu Perfil</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Editar Perfil
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <div className="relative">
                        {previewFoto ? (
                            <img
                                src={previewFoto}
                                alt={formData.nome}
                                className="w-full aspect-square object-cover rounded-lg"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        'https://via.placeholder.com/300x300?text=Sem+Foto';
                                }}
                            />
                        ) : (
                            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                                <UserIcon size={80} className="text-gray-400" />
                            </div>
                        )}

                        {isEditing && (
                            <Popup
                                trigger={
                                    <button className="absolute bottom-2 right-2 bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-colors">
                                        <CameraIcon size={20} />
                                    </button>
                                }
                                modal
                                nested
                            >
                                {((close: () => void) => (
                                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                Alterar Foto
                                            </h3>
                                            <button
                                                onClick={close}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    URL da Foto
                                                </label>
                                                <input
                                                    type="url"
                                                    value={formData.foto}
                                                    onChange={handleFotoChange}
                                                    placeholder="https://exemplo.com/foto.jpg"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            {previewFoto && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                                        Preview:
                                                    </p>
                                                    <img
                                                        src={previewFoto}
                                                        alt="Preview"
                                                        className="w-full aspect-square object-cover rounded-lg"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src =
                                                                'https://via.placeholder.com/300x300?text=URL+Inválida';
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            <button
                                                onClick={close}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                                            >
                                                Confirmar
                                            </button>
                                        </div>
                                    </div>
                                )) as unknown as React.ReactNode}
                            </Popup>

                        )}
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Tipo de Usuário</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {formData.tipoUsuario === 'PASSAGEIRO' ? 'PASSAGEIRO' : 'MOTORISTA'}
                        </p>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo *
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
                                    ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    : 'bg-gray-100 cursor-not-allowed'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome de Usuário *
                            </label>
                            <input
                                type="text"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
                                    ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    : 'bg-gray-100 cursor-not-allowed'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sexo
                            </label>
                            <select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
                                    ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    : 'bg-gray-100 cursor-not-allowed'
                                    }`}
                            >
                                {GENEROS.map((genero) => (
                                    <option key={genero} value={genero}>{genero}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data de Nascimento
                            </label>
                            <input
                                type="date"
                                name="data"
                                value={formData.data}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
                                    ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    : 'bg-gray-100 cursor-not-allowed'
                                    }`}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nova Senha (deixe em branco para manter a atual)
                                </label>
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                    placeholder="Mínimo 6 caracteres"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirmar Nova Senha
                                </label>
                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    placeholder="Confirme a nova senha"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}

                    {isEditing && (
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <CheckIcon size={20} />
                                        Salvar Alterações
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleCancelar}
                                disabled={loading}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <X size={20} />
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PerfilUsuario;