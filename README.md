```
IXChat
│
├── .env
├── .gitignore
├── package-lock.json
│
└── src/
    ├── app.js
    │
    ├── controllers/
    │   └── userController.js
    │
    ├── db/
    │   └── connectionDB.js
    │
    ├── models/
    │   └── user.js
    │
    └── routes/
        └── user.js
```

Documentação do Projeto:

1. Visão Geral:
   Este projeto é uma aplicação Node.js/Express que implementa um sistema de gerenciamento de usuários com a finalidade de, com autenticação, usarem um IXChat.

2. Componentes Principais:
   - app.js: Ponto de entrada da aplicação. Configura o servidor Express, middleware e rotas.
   - models/user.js: Define o esquema do usuário para o MongoDB.
   - routes/user.js: Define as rotas para operações de usuário (CRUD e login).
   - controllers/userController.js: Contém a lógica de negócios para operações de usuário.

3. Funcionalidades:
   - Registro de usuário
   - Login de usuário
   - Obter todos os usuários
   - Obter um usuário específico
   - Atualizar usuário
   - Deletar usuário

4. Autenticação:
   - Utiliza Passport.js para autenticação
   - Implementa sessões para manter o estado de login do usuário

5. Banco de Dados:
   - Utiliza MongoDB como banco de dados
   - A conexão é gerenciada através do arquivo connectionDB.js

6. Segurança:
   - Senhas são armazenadas de forma segura (presumivelmente com hash)
   - Rotas protegidas requerem autenticação

7. Configuração:
   - Variáveis de ambiente são armazenadas no arquivo .env
   - Inclui configurações para porta do servidor, URI do MongoDB e chaves secretas

Para executar o projeto:
1. Instale as dependências: npm install
2. Configure as variáveis de ambiente no arquivo .env
3. Inicie o servidor: npm start

O servidor estará rodando na porta especificada (padrão: 3000).
