# Task Manager API 📝

API REST para gerenciamento de usuários e tarefas, desenvolvida com **Node.js, TypeScript, Express e PostgreSQL**.

O projeto foi desenvolvido com foco em aprendizado e prática de desenvolvimento **backend**, aplicando conceitos como separação de responsabilidades, regras de negócio, autenticação, middlewares, validação de dados e comunicação com banco de dados relacional.

## 🚀 Tecnologias

* **Node.js**
* **TypeScript**
* **Express**
* **PostgreSQL**
* **pg**
* **JWT (JSON Web Token)**
* **bcrypt**
* **dotenv**

## 📌 Funcionalidades

### Usuários

* Criar usuário
* Listar usuários
* Buscar usuário por ID
* Atualizar usuário
* Remover usuário
* Autenticação por e-mail e senha
* Geração de token JWT
* Validação de dados de entrada

### Tarefas

* Criar tarefa
* Listar tarefas
* Buscar tarefa por ID
* Atualizar tarefa
* Remover tarefa
* Alternar status de conclusão da tarefa
* Associar tarefas a usuários através de `user_id`
* Validação de dados
* Validação de IDs
* Tratamento de recursos inexistentes

### Segurança

* Senhas armazenadas utilizando hash com `bcrypt`
* Autenticação utilizando JWT
* Middleware para validação do token
* Utilização de variáveis de ambiente para informações sensíveis
* Queries parametrizadas no PostgreSQL

## 🏗️ Arquitetura

A aplicação utiliza uma estrutura baseada na separação de responsabilidades:

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Middlewares
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

### Routes

Responsáveis por definir os endpoints da API e encaminhar as requisições para os controllers.

### Middlewares

Responsáveis por tarefas executadas durante o processamento da requisição, como:

* Validação de IDs
* Validação dos dados recebidos
* Validação de autenticação
* Verificação de token JWT
* Tratamento de erros

### Controllers

Responsáveis pela comunicação HTTP.

Recebem os dados da requisição, chamam os services responsáveis pela operação e retornam a resposta para o cliente.

### Services

Responsáveis pelas regras de negócio da aplicação.

Essa camada concentra a lógica que não deve ficar diretamente dentro dos controllers ou repositories.

### Repositories

Responsáveis pelo acesso ao banco de dados.

As consultas SQL ficam concentradas nessa camada, mantendo o restante da aplicação independente da implementação das queries.

### Database

Responsável pela configuração da conexão com o PostgreSQL.

## 📂 Estrutura do projeto

```text
src/
├── controllers/
│   ├── homeController.ts
│   ├── taskController.ts
│   └── userController.ts
│
├── database/
│   └── connections.js
│
├── middlewares/
│   ├── authMiddleware.ts
│   ├── errorMiddleware.ts
│   ├── taskMiddleware.ts
│   └── userMiddleware.ts
│
├── repositories/
│   ├── taskRepository.ts
│   └── userRepository.ts
│
├── routes/
│   ├── index.ts
│   ├── task.routes.ts
│   └── user.routes.ts
│
├── services/
│   ├── taskService.ts
│   └── userService.ts
│
├── types/
│   ├── task.ts
│   └── user.ts
│
├── app.ts
└── server.ts
```

## 🔌 Endpoints

### 👤 Usuários

| Método   | Endpoint           | Descrição                      |
| -------- | ------------------ | ------------------------------ |
| `GET`    | `/users`           | Lista todos os usuários        |
| `GET`    | `/users/:id`       | Busca um usuário pelo ID       |
| `GET`    | `/users/:id/tasks` | Lista as tarefas de um usuário |
| `POST`   | `/users`           | Cria um novo usuário           |
| `POST`   | `/users/auth`      | Autentica um usuário           |
| `PUT`    | `/users/:id`       | Atualiza um usuário            |
| `DELETE` | `/users/:id`       | Remove um usuário              |

### 📝 Tarefas

| Método   | Endpoint               | Descrição                  |
| -------- | ---------------------- | -------------------------- |
| `GET`    | `/tasks`               | Lista todas as tarefas     |
| `GET`    | `/tasks/:id`           | Busca uma tarefa pelo ID   |
| `POST`   | `/tasks`               | Cria uma nova tarefa       |
| `PUT`    | `/tasks/:id`           | Atualiza uma tarefa        |
| `PATCH`  | `/tasks/:id/completed` | Alterna o status da tarefa |
| `DELETE` | `/tasks/:id`           | Remove uma tarefa          |

Os endpoints acima correspondem às rotas atualmente definidas no projeto.

## 📥 Exemplos de requisições

### Criar usuário

```http
POST /users
Content-Type: application/json
```

```json
{
  "name": "Luis",
  "email": "luis@email.com",
  "password": "123456"
}
```

### Autenticar usuário

```http
POST /users/auth
Content-Type: application/json
```

```json
{
  "email": "luis@email.com",
  "password": "123456"
}
```

A autenticação retorna um token JWT que pode ser utilizado posteriormente para acessar recursos protegidos.

### Criar tarefa

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "user_id": 1,
  "title": "Estudar Node.js",
  "description": "Continuar os estudos de desenvolvimento backend"
}
```

Uma tarefa possui atualmente os seguintes dados:

```json
{
  "id": 1,
  "user_id": 1,
  "title": "Estudar Node.js",
  "description": "Continuar os estudos de desenvolvimento backend",
  "completed": false
}
```

O `user_id` permite relacionar cada tarefa ao usuário responsável por ela.

### Atualizar tarefa

```http
PUT /tasks/1
Content-Type: application/json
```

```json
{
  "title": "Estudar Node.js e TypeScript",
  "description": "Continuar o desenvolvimento da API"
}
```

### Alternar conclusão

```http
PATCH /tasks/1/completed
```

Esse endpoint alterna o estado `completed` da tarefa.

### Buscar tarefas de um usuário

```http
GET /users/1/tasks
```

Retorna as tarefas relacionadas ao usuário informado.

## 🔐 Autenticação

A API utiliza **JWT** para autenticação.

Após realizar o login através de:

```http
POST /users/auth
```

o servidor retorna um token que pode ser enviado no header `Authorization`:

```http
Authorization: Bearer SEU_TOKEN
```

O middleware de autenticação verifica a existência do header, valida o formato `Bearer` e verifica o token utilizando o segredo configurado em `JWT_SECRET`. O ID do usuário autenticado é então disponibilizado através de `req.userId`.

> A autenticação e autorização do projeto ainda estão em evolução.

## 🗄️ Banco de dados

O projeto utiliza **PostgreSQL** como banco de dados relacional e o pacote `pg` para realizar a comunicação com o banco.

As consultas utilizam parâmetros separados dos valores recebidos pela API:

```sql
SELECT * FROM tasks WHERE id = $1;
```

Isso evita a construção de queries através da concatenação direta de valores recebidos do usuário e ajuda a prevenir **SQL Injection**.

## ⚙️ Configuração

### Pré-requisitos

Antes de executar o projeto, tenha instalado:

* Node.js
* npm
* PostgreSQL

### 1. Clone o repositório

```bash
git clone https://github.com/LuisFellipe-Dev/Task-Manager-API.git
```

### 2. Entre na pasta

```bash
cd Task-Manager-API
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=tasks

JWT_SECRET=sua_chave_secreta
```

Configure os valores de acordo com o seu ambiente PostgreSQL.

**Não compartilhe ou versione o arquivo `.env`.**

### 5. Execute o projeto

Modo de desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Executar a versão compilada:

```bash
npm start
```

Por padrão, a API é executada em:

```text
http://localhost:3000
```

Os scripts de desenvolvimento, build e execução estão definidos no `package.json` do projeto.

## 🧪 Validações

A API possui middlewares específicos para validar os dados recebidos antes que eles cheguem às camadas responsáveis pela lógica da aplicação.

Entre as validações implementadas estão:

* IDs devem ser inteiros positivos
* Nome de usuário obrigatório
* E-mail obrigatório
* Senha obrigatória
* Título da tarefa obrigatório
* Limite de caracteres para título
* Limite de caracteres para descrição
* Validação do `user_id`
* Validação de credenciais durante a autenticação

As validações de tarefas e usuários estão concentradas nos respectivos middlewares.

## 📡 Tratamento de respostas

A API utiliza códigos HTTP para representar o resultado das operações.

Exemplos:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

As respostas de erro utilizam JSON, por exemplo:

```json
{
  "message": "Tarefa não encontrada."
}
```

## 🎯 Objetivo do projeto

O objetivo principal deste projeto é praticar o desenvolvimento de uma API backend utilizando uma estrutura próxima da utilizada em aplicações reais.

Além da implementação dos endpoints, o projeto busca desenvolver conhecimentos em:

* APIs REST
* Node.js
* TypeScript
* Express
* PostgreSQL
* SQL
* HTTP
* JWT
* Autenticação
* Middlewares
* Validação de dados
* Regras de negócio
* Controllers
* Services
* Repositories
* Separação de responsabilidades
* Variáveis de ambiente
* Queries parametrizadas
* Tratamento de erros

O projeto está sendo desenvolvido de forma incremental, adicionando novas funcionalidades conforme novos conceitos de backend são estudados.

## 🔮 Próximos passos

Algumas funcionalidades que podem ser adicionadas durante a evolução do projeto:

* [ ] Finalizar autorização baseada no usuário autenticado
* [ ] Garantir que usuários só possam acessar suas próprias tarefas
* [ ] Melhorar tratamento global de erros
* [ ] Adicionar filtros de tarefas
* [ ] Adicionar paginação
* [ ] Adicionar testes automatizados
* [ ] Documentar a API com Swagger/OpenAPI
* [ ] Melhorar a configuração do banco
* [ ] Dockerizar a aplicação
* [ ] Realizar deploy da API

---

Projeto desenvolvido para estudos e prática de desenvolvimento **backend com Node.js, TypeScript, Express e PostgreSQL**.

**Autor:** Luis Fellipe
