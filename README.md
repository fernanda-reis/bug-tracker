# Bug Tracker

Aplicação simples de rastreamento de bugs com backend em Node.js + Express e banco SQLite.

## Visão geral

Este projeto foi criado para registrar bugs, listar todos os itens e atualizar status e prioridade. A API expõe endpoints para gerenciar tarefas de correção e acompanhamento.

## Tecnologias

- Node.js
- Express
- TypeScript
- SQLite com better-sqlite3

## Estrutura do projeto

```bash
bug-tracker/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── database.db
├── frontend/
└── README.md
```

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## Como rodar o backend

1. Abra o terminal no diretório `backend`:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor ficará disponível em:

```bash
http://localhost:3000
```

## Endpoints da API

### GET /

Retorna uma mensagem simples de teste.

### POST /bugs

Cria um novo bug.

Body exemplo:

```json
{
  "title": "Erro ao salvar formulário",
  "description": "Ao clicar em salvar, a aplicação trava.",
  "status": "OPEN",
  "priority": "HIGH"
}
```

### GET /bugs

Lista todos os bugs cadastrados.

### PATCH /bugs/:id

Atualiza status e/ou prioridade de um bug existente.

Body exemplo:

```json
{
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```

## Banco de dados

O projeto usa SQLite e cria automaticamente a tabela `bugs` ao iniciar o backend, se ela ainda não existir.

## Observações

- O banco fica no arquivo `backend/database.db`.
- O projeto ainda está em desenvolvimento e pode receber melhorias na estrutura e na interface do frontend.
