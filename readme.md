# IXChat - Projeto de Chat em Tempo Real

Este projeto consiste em uma aplicação de chat em tempo real com um backend em Node.js (ixchat-api) e um frontend em Next.js (ixchat-front-end).


## Iniciando o Backend (ixchat-api)

1. Navegue até a pasta do backend:   ```
   cd ixchat-api   ```

2. Instale as dependências:   ```
   npm install   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis no arquivo `.env` com suas configurações
   -  Ao iniciar a aplicação, um banco MongoDB será automaticamente criado conforme as variáveis do arquivo .env

4. Inicie o servidor de desenvolvimento:   ```
   npm run dev   ```

O servidor backend estará rodando em `http://localhost:3333`.

## Iniciando o Frontend (ixchat-front-end)

1. Abra um novo terminal e navegue até a pasta do frontend:   ```
   cd ixchat-front-end   ```

2. Instale as dependências:   ```
   npm install   ```

3. Inicie o servidor de desenvolvimento:   ```
   npm run dev   ```

O aplicativo frontend estará disponível em `http://localhost:3000`.

## Observações

- Certifique-se de que o MongoDB está rodando e acessível antes de iniciar o backend.
- Para desenvolvimento, o frontend está configurado para se comunicar com o backend na porta 3333. Certifique-se de que esta porta está correta e disponível.
