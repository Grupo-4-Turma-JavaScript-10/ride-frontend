# 🚗 Ride Frontend: Velo

> Aplicação web para gestão de caronas e transporte compartilhado.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white)

---

## 📌 Descrição

Aplicação web desenvolvida com **React** e **TypeScript**, projetada para facilitar a gestão de caronas e transporte compartilhado. Interface intuitiva e responsiva para encontrar, oferecer e gerenciar caronas de forma eficiente.

---

## 🚀 Tecnologias

| Tecnologia | Função |
|---|---|
| React 18+ | Biblioteca para construção de interfaces |
| TypeScript | Tipagem estática |
| Vite | Build tool e dev server |
| React Router DOM | Navegação e roteamento |
| Context API / Redux | Gerenciamento de estado global |
| Axios | Cliente HTTP |
| React Query | Cache e gerenciamento de requisições |
| CSS Modules / Styled Components | Estilização componentizada |
| ESLint + Prettier | Qualidade e formatação de código |

---

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/lancellot/ride-frontend.git

# Acesse a pasta e instale as dependências
cd ride-frontend
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

> Aplicação disponível em: **http://localhost:5173**

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Ride Frontend
```

---

## 🗺️ Rotas

| Rota | Descrição |
|---|---|
| `/` | Página inicial com busca de caronas |
| `/login` | Autenticação de usuários |
| `/cadastro` | Registro de novos usuários |
| `/perfil` | Gerenciamento de perfil |
| `/minhas-caronas` | Histórico e caronas ativas |
| `/oferecer-carona` | Formulário para criar nova carona |

---

## 💡 Diferenciais do projeto

- ✅ Autenticação segura com JWT integrado ao backend
- ✅ Arquitetura componentizada com React
- ✅ Tipagem estática com TypeScript
- ✅ Interface responsiva para desktop, tablet e mobile
- ✅ Boas práticas com ESLint e Prettier

---

## 🌐 Deploy

> https://ride-frontend-tan.vercel.app/

---

## 📷 Screenshots

> <img width="1867" height="912" alt="Captura de tela 2026-04-15 155556" src="https://github.com/user-attachments/assets/e614c200-4a3f-4c2a-9580-a893a2b4c745" />


---

## 📈 Melhorias futuras

- [ ] Documentação de componentes com Storybook
- [ ] Testes unitários com Vitest
- [ ] Paginação e filtros avançados nas buscas
- [ ] PWA para uso mobile offline
- [ ] Deploy automatizado com CI/CD
