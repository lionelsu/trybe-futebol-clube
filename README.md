<!-- Este é um comentário: omitir os tópidos redundantes -->
<!--  **| [Brazil](README.md) | [asdf](README_en.md) |** -->

# Futebol Clube API

[Documentação da API no Postman](https://documenter.getpostman.com/view/30159355/2s9YR85Dtg)

Futebol Clube API é uma API RESTful e um aplicativo CRUD moderno com uma interface gráfica desenvolvida em ReactJs, oferecendo funcionalidades de CRUD para a gestão de classificação em uma equipe de Clube de Futebol. Ela inclui filtros para obter informações sobre equipes, partidas e postagens, bem como a capacidade de finalizar e atualizar partidas. Foi desenvolvida utilizando a metodologia TDD, os princípios SOLID, POO e Arquitetura Limpa. Além disso, segue uma arquitetura em camadas (MSC), e o esquema do banco de dados utiliza o Diagrama de Entidade-Relacionamento (DER).

# Ferramentas Utilizadas

- **Tecnologias Principais:**
  - Node.js
  - Express.js
  - MySQL Server
  - React.js
  - Sequelize ORM

- **Testes:**
  - Mocha
  - Chai
  - Sinon

- **Documentação:**
  - Swagger
  - Postman

## Pré-Requisitos

Node versão igual ou superio a 16.14.0 LTS:

- [Node.js](https://nodejs.org/en/)

Docker e Docker Compose:

- [Docker & Docker Compose](https://docs.docker.com/compose/)

<!-- ## Features -->
## Instalação

1. Clonar o Repositório

    Primeiro, copie ou clone este repositório para o seu sistema local usando o Git:

    ```bash
    git clone git@github.com:lionelsu/trybe-futebol-clube.git && cd trybe-futebol-clube
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

    Utilize o script `npm run install:all` para instalar as dependencias do frontend, backend e subir o servidor docker

    ```bash
    npm run install:all
    ```

3. Acesse o frontend da aplicação:

    ```http
    http://localhost:3000
    ```

    Teste as funcionalidades do login com:
    Login:

      ```json
      admin@admin.com
      ```

    Senha:

      ```json
      secret_admin
      ```

![partidas](/leaderboards.png)

## Rotas da API

**Teams:**

- **`GET /teams`**: Retorna todos os times cadastrados.
- **`GET /teams/:id`**: Retorna um time específico pelo ID.

**Login:**

- **`POST /login`**: Autentica um usuário.
- **`GET /login/role`**: Retorna o "papel" do usuário logado.

**Matches:**

- **`GET /matches`**: Retorna todos as partidas cadastradas.
- **`GET /matches?inProgress=`**: Retorna todas as partidas em andamento se =true e se for =false, retorna as partidas finalizadas.
- **`PATCH /matches/:id/finish`**: Finaliza uma partida.
- **`PATCH /matches/:id`**: Atualiza o placar de uma partida.
- **`POST /matches`**: Cria uma nova partida.

**Leaderboards:**

- **`GET /leaderboard/home`**: Retorna a classificação dos times da casa.
- **`GET /leaderboard/away`**: Retorna a classificação dos times visitantes.
- **`GET /leaderboard`**: Retorna a classificação geral.

## Testes

- Dentro da **linha de comando**, você pode executar os seguintes testes:

  - Testes Unitários:

  ```bash
  npm run test:coverage
  ```

## Habilidades desenvolvidas

Usei o `Node.js` com o `Express.js` como base da minha aplicação, permitindo criar facilmente endpoints `HTTP` para atender às necessidades do sistema. Para melhor a descrição e compreenção do código como também a consistencia do mesmo, utilizei o `Typescript` com o paradigma de `Orientação a Objetos (POO)` e `Clean Archtecture`, também utilizei os principios `SOLID` para ter um código com entidades mais coerentes.

O banco de dados `MySQL Server` foi escolhido para armazenar dados relacionados aos Times, Usuarios e Partidas.

A regra de negocio foi implementada utilizando o `Sequelize ORM` para facilitar a interação com o banco de dados e os algorithmos de classificação foram implementados utilizando o `Typescript` em uma camada especifica para isso.

A qualidade do código foi garantida por meio de testes rigorosos usando `Mocha`, `Chai`. Esses testes avaliaram minuciosamente os endpoints, serviços e funções para garantir que tudo funcionasse corretamente.

Também disponibilizei uma coleção no `Postman` para facilitar testes e interações com a `API`.

Com essas etapas concluídas, estou confiante na entrega de uma `API` sólida e funcional com uma `GUI` em `ReactJs` intuitiva, pronta para atender às necessidades dos usuários.
