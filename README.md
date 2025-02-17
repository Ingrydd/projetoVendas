# Sistema de Venda de Ingressos

> Bem-vindo ao projeto do Sistema de Venda de Ingressos!

## 📌 Sobre o Projeto

Este projeto consiste na construção de uma **API REST** para gerenciar a venda de ingressos de eventos. O sistema permite o cadastro e autenticação de usuários, a administração de ingressos e a realização de compras. Utiliza **MongoDB** para persistência de dados e autenticação via **JWT** para garantir a segurança das operações.

## 🚀 Como Utilizar

### 1️⃣ Clonar o Repositório

Clone o repositório para sua máquina local:
```bash
git clone https://github.com/Ingrydd/projetoVendas.git
```

### 2️⃣ Instalar Dependências
Navegue até a pasta do projeto e instale as dependências:
```bash
npm install
```

### 3️⃣ Configurar o Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
```bash
JWT_SECRET=sua_chave_secreta
MONGO_URI=mongodb://localhost:27017/...
PORT=port
```

### 4️⃣ Rodar o Servidor
Para rodar o servidor, utilize o comando:
```bash
npm start
```

O backend rodará na porta definida no `.env`.

## 🔥 Endpoints Principais

### 🔹 Usuários
- `POST /auth/login` → Autentica um usuário e retorna um token JWT.
- `DELETE /users/:id` →  Deleta  um usuário (somente admin)

### 🔹 Gerenciamento de Ingressos
- `GET /tickets` → Lista todos os ingressos disponíveis.
- `POST /tickets` → Realiza a compra de um ingresso (autenticado).

### 🔹 Histórico de Compras
- `GET /purchases/:id` → Retorna a lista de compras do usuário.

### 🔹 Detalhes de um Ingresso
- `GET /ticket/:id` → Retorna detalhes de um ingresso adquirido.
- `POST /purchases`→  Cria um evento para compra de ingresso (somente admin autenticado).

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/pt) - Para construção do backend.
- [Express](https://expressjs.com/pt-br/) - Framework para API REST.
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL.
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB.
- [JWT (JSON Web Token)](https://jwt.io/) - Autenticação de usuários.
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Criptografia de senhas.
- [Dotenv](https://www.npmjs.com/package/dotenv) - Gerenciamento de variáveis de ambiente.
- [Nodemon](https://www.npmjs.com/package/nodemon) - Monitoramento do servidor em tempo real.

## 👨‍💻 Autora
- Ingryd Belazzi Alves

