# IXChat API - Backend do Projeto de Chat em Tempo Real

Este é o backend da aplicação IXChat, um sistema de chat em tempo real desenvolvido com Node.js.

## Visão Geral do Projeto

O IXChat API é construído usando Express.js e oferece funcionalidades de autenticação, gerenciamento de usuários e troca de mensagens em tempo real. Ele utiliza MongoDB como banco de dados e implementa várias tecnologias para criar uma experiência de chat.

## Principais Dependências

- **Express.js**: Framework web para Node.js, usado para criar a API RESTful.
- **Passport.js**: Middleware de autenticação, utilizado para implementar estratégias de login.
- **Socket.IO**: Biblioteca para comunicação em tempo real, permitindo a troca instantânea de mensagens.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB, facilitando a interação com o banco de dados.
- **bcrypt**: Utilizado para hash de senhas, aumentando a segurança do armazenamento de credenciais.
- **JSON Web Token (JWT)**: Implementado para autenticação stateless e segura.
- **Cors**: Middleware para habilitar o CORS (Cross-Origin Resource Sharing).
- **dotenv**: Para carregar variáveis de ambiente de um arquivo .env.

## Funcionalidades Principais

- Autenticação de usuários (registro, login, logout)
- Gerenciamento de perfis de usuário
- Envio e recebimento de mensagens em tempo real
- Listagem de usuários e conversas

## Iniciando o Projeto

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` com suas variáveis de ambiente
4. Inicie o servidor: `npm run dev`

Para mais detalhes sobre como iniciar o projeto, consulte as instruções no README principal do repositório.

## Estrutura do Projeto

- `src/`: Contém o código-fonte principal
  - `controllers/`: Lógica de negócios
  - `models/`: Esquemas do Mongoose
  - `routes/`: Definições de rotas da API
  - `middleware/`: Middlewares personalizados
  - `config/`: Configurações (ex: Passport, banco de dados)
- `app.js`: Ponto de entrada da aplicação

## Contribuindo

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.
