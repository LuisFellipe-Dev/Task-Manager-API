# Task-Manager-API

API REST para gerenciamento de tarefas, desenvolvida com **Node.js, TypeScript, Express e PostgreSQL**.

O projeto tem como objetivo colocar em prática conceitos de desenvolvimento backend, desde a criação dos endpoints até a comunicação com o banco de dados, utilizando uma estrutura organizada por responsabilidades.

## Tecnologias

* **Node.js** — ambiente de execução
* **TypeScript** — tipagem e desenvolvimento
* **Express** — criação da API REST
* **PostgreSQL** — banco de dados relacional
* **pg** — comunicação com o PostgreSQL
* **dotenv** — gerenciamento de variáveis de ambiente

## Sobre o projeto

A aplicação permite realizar operações básicas de gerenciamento de tarefas através de uma API REST.

A estrutura foi organizada em camadas para separar as responsabilidades da aplicação:

```text
Cliente
   │
   ▼
 Routes
   │
   ▼
Controller
   │
   ▼
 Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

Essa separação permite que cada parte da aplicação tenha uma responsabilidade específica, facilitando a manutenção e evolução do projeto.

## Funcionalidades

* [x] Criar tarefas
* [x] Listar tarefas
* [x] Buscar tarefa por ID
* [x] Atualizar tarefas
* [x] Remover tarefas
* [x] Validação de dados
* [x] Tratamento de erros HTTP
* [x] Queries parametrizadas
* [x] Separação entre Controller, Service e Repository

## Estrutura

```text
src/
├── controllers/
│   └── task.controller.ts
│
├── database/
│   └── connections.js
│
├── repositories/
│   └── task.repository.ts
│
├── routes/
│   ├── index.ts
│   └── task.routes.ts
│
├── services/
│   └── task.service.ts
│
└── app.ts
```

### Routes

Responsável por definir os endpoints da API e encaminhar as requisições para os controllers.

### Controllers

Responsável pela comunicação com o cliente através do protocolo HTTP.

Recebe os dados da requisição, chama o service apropriado e retorna a resposta.

### Services

Responsável pelas regras de negócio da aplicação.

É a camada intermediária entre o controller e o repository.

### Repositories

Responsável pelo acesso ao banco de dados.

As operações SQL ficam concentradas nessa camada, evitando que as consultas sejam espalhadas pelo restante da aplicação.

### Database

Responsável pela configuração da conexão com o PostgreSQL.

## API

### Listar tarefas

```http
GET /tasks
```

Retorna todas as tarefas cadastradas.

### Buscar tarefa por ID

```http
GET /tasks/:id
```

Retorna uma tarefa específica.

Exemplo:

```http
GET /tasks/1
```

### Criar tarefa

```http
POST /tasks
```

Exemplo de corpo:

```json
{
  "title": "Estudar Node.js"
}
```

### Atualizar tarefa

```http
PUT /tasks/:id
```

Exemplo:

```http
PUT /tasks/1
```

```json
{
  "title": "Estudar Node.js e TypeScript"
}
```

### Remover tarefa

```http
DELETE /tasks/:id
```

Exemplo:

```http
DELETE /tasks/1
```

## Configuração

### Pré-requisitos

* Node.js
* PostgreSQL
* npm

### Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd tasks-api
```

Instale as dependências:

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=tasks
```

Configure os valores de acordo com o seu ambiente PostgreSQL.

### Executando

Inicie o projeto em modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Banco de dados

O projeto utiliza **PostgreSQL** para armazenamento das tarefas.

As consultas são realizadas através do pacote `pg` e utilizam parâmetros nas queries:

```sql
SELECT * FROM tasks WHERE id = $1;
```

Em vez de inserir diretamente os valores recebidos pelo usuário na consulta, os parâmetros são enviados separadamente para o PostgreSQL.

Isso ajuda a evitar problemas como **SQL Injection**.

## Tratamento de erros

A API utiliza códigos HTTP para representar diferentes situações.

Exemplos:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

As respostas de erro seguem um formato JSON:

```json
{
  "message": "Tarefa não encontrada."
}
```

## Objetivo do projeto

Este projeto está sendo desenvolvido como parte dos estudos de **desenvolvimento backend**.

O foco principal é compreender não apenas como escrever o código, mas também como estruturar uma aplicação backend de forma organizada.

Entre os conceitos praticados estão:

* APIs REST
* Node.js
* TypeScript
* Express
* PostgreSQL
* SQL
* HTTP
* Controllers
* Services
* Repositories
* Middlewares
* Validação de dados
* Tratamento de erros
* Variáveis de ambiente
* Queries parametrizadas
* Separação de responsabilidades

## Próximos passos

O projeto continuará sendo evoluído conforme novos conceitos forem estudados.

Algumas funcionalidades planejadas:

* [ ] Autenticação
* [ ] Usuários
* [ ] Associação entre usuários e tarefas
* [ ] Middleware de autenticação
* [ ] Status das tarefas
* [ ] Filtros
* [ ] Paginação
* [ ] Testes automatizados
* [ ] Documentação da API
* [ ] Deploy

---

**Projeto desenvolvido para estudos e prática de desenvolvimento backend com Node.js e TypeScript.**
