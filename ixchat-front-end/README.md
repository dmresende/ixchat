# IXChat Front-end - Interface do Usuário para o Projeto de Chat em Tempo Real

Este é o front-end da aplicação IXChat, um sistema de chat em tempo real desenvolvido com Next.js.

## Visão Geral do Projeto

O IXChat Front-end é uma aplicação web e responsiva que oferece uma interface intuitiva para os usuários interagirem com o sistema de chat. Ele se conecta ao backend IXChat API para fornecer funcionalidades de autenticação, listagem de usuários e troca de mensagens em tempo real.

## Principais Tecnologias e Dependências

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset tipado de JavaScript, melhorando a qualidade e manutenibilidade do código.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **Zustand**: Biblioteca de gerenciamento de estado, usada para gerenciar o estado global da aplicação.
- **Tailwind CSS**: Framework CSS utilitário para design rápido e responsivo.
- **React Hot Toast**: Biblioteca para notificações de toast elegantes e customizáveis.

## Funcionalidades Principais

- Autenticação de usuários (login e registro)
- Listagem de usuários disponíveis para chat
- Interface de chat em tempo real
- Gerenciamento de perfil de usuário

## Iniciando o Projeto

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env.local`
4. Inicie o servidor de desenvolvimento: `npm run dev`

O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

- `src/`: Contém o código-fonte principal
  - `app/`: Componentes e páginas da aplicação
  - `components/`: Componentes React reutilizáveis
  - `hooks/`: Hooks personalizados, incluindo o hook de autenticação
  - `utils/`: Utilitários e configurações (ex: configuração do Axios)
- `public/`: Arquivos estáticos

## Integração com o Backend

Este front-end é projetado para trabalhar em conjunto com o IXChat API. Certifique-se de que o backend está configurado e rodando corretamente para o pleno funcionamento do sistema.

## Contribuindo

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.
