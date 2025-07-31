# 🛠️ Desafio Técnico – CRUD de Produtos

Este projeto é a entrega do desafio técnico. Consiste em uma aplicação fullstack com autenticação, CRUD de produtos.

---

## ✅ Visão Geral

| Parte      | Descrição                                 |
|------------|--------------------------------------------|
| 🔐 Login   | Com usuário fixo (`admin@b4you.dev`) usando JWT |
| 🔧 API     | Node.js + Express + Sequelize + MySQL      |
| 🖥️ Frontend | Next.js com Chakra UI + Axios              |

---

## 🧪 Usuário de Teste

Email: admin@b4you.dev
Senha: 123456

---

## 📦 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Sequelize ORM
- MySQL (local)
- Yup (validação)
- JWT (autenticação)

### Frontend
- Next.js
- React
- Chakra UI
- Axios
- React Hook Form

---

## 📁 Estrutura de Pastas

CrudProdutos/
├── frontend-produtos/ # Next.js
├── controllers/ # Lógica de produto e login
├── routes/ # Rotas Express
├── models/ # Sequelize models
├── migrations/ # Sequelize migrations
├── middleware/ # Autenticação JWT
├── validators/ # Yup validation
├── config/ # Config do Sequelize
└── server.js # API principal

---

## 🚀 Como rodar localmente

### 🧩 Clonar o projeto

```bash
git clone https://github.com/germanojulio/CrudProdutos.git
cd CrudProdutos

⚙️ Backend
Instalar dependências

npm install
Configurar .env

Crie um arquivo .env com:
JWT_SECRET=seusegredoaqui
DB_NAME=api_produtos
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=127.0.0.1

Executar as migrations
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

Isso criará a tabela products com 5 produtos iniciais

Iniciar servidor
npm run dev

💻 Frontend
cd frontend-produtos
npm install
Criar .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api

Rodar
npm run dev


📋 Funcionalidades
🔐 Autenticação (JWT)
Login: POST /auth/login

Token válido por 1 hora

Proteção total em todas as rotas /products

🧾 CRUD de Produtos
Método	Rota	Ação
GET	/products	Lista todos
GET	/products/:id	Produto por ID
POST	/products	Cria novo produto
PUT	/products/:id	Atualiza produto
DELETE	/products/:id	Remove produto

Todos os campos validados com Yup.

Diferenciais já implementados

✅ Interceptor Axios com token automático

✅ Tela protegida com redirect de sessão

✅ Validação visual no frontend

✅ Feedback visual de loading, erros e ações

✅ Estrutura escalável

✅ README completo com .env.example e instruções

📁 Exemplo .env
Backend
JWT_SECRET=segredo_supersecreto
DB_NAME=products_db
DB_USER=root
DB_PASSWORD=JulioDev321
DB_HOST=localhost

Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000/api


✨ Ideias de melhorias (em andamento)
 Deploy com Render + Vercel 🔜
Upload de imagem dos produtos 🔜
Busca 🔜
CI/CD (GitHub Actions)	🔜

👨‍💻 Autor
Feito por Júlio Germano

📝 Licença
Este projeto está sob licença MIT.