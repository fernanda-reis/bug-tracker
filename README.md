# Bug Tracker

Aplicação para registrar e acompanhar bugs, com frontend em Vue, API em Node.js + Express e banco SQLite.

## Visão geral

O sistema permite criar, listar e excluir bugs. Cada item tem título, descrição, prioridade, status e data de criação. A API também permite atualizar o status e a prioridade.

## Tecnologias

- Node.js e npm workspaces
- Vue 3 e Vue CLI
- Express 5 e TypeScript
- SQLite com `better-sqlite3`

## Estrutura do projeto

```text
bug-tracker/
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   └── package.json
├── package.json
└── README.md
```

## Pré-requisitos

- Node.js
- npm

## Instalação e execução

Na raiz do projeto, instale as dependências e inicie o frontend e o backend:

```bash
npm install
npm run dev
```

O frontend fica disponível em `http://localhost:8080` e o backend em `http://localhost:3000`. Durante o desenvolvimento, as chamadas do frontend para `/bugs` são encaminhadas para o backend.

Também é possível iniciar cada parte separadamente na raiz:

```bash
npm run dev:backend
npm run dev:frontend
```

## API

Todos os endpoints usam o backend em `http://localhost:3000`.

### `GET /`

Retorna uma mensagem simples para verificar se o servidor está ativo.

### `GET /bugs`

Retorna a lista de bugs no campo `bugs`.

### `POST /bugs`

Cria um bug. `title` e `description` são obrigatórios; `status` e `priority` são opcionais e assumem `OPEN` e `LOW` quando não informados.

```json
{
  "title": "Erro ao salvar formulário",
  "description": "Ao clicar em salvar, a aplicação trava.",
  "status": "OPEN",
  "priority": "HIGH"
}
```

### `PATCH /bugs/:id`

Atualiza o status e/ou a prioridade de um bug.

```json
{
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```

### `DELETE /bugs/:id`

Exclui o bug indicado pelo ID.

## Banco de dados

O backend cria a tabela `bugs` ao iniciar, caso ela ainda não exista. O arquivo SQLite local é `backend/database.db` e é ignorado pelo Git.
