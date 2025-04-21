Seu `README.md` já está ótimo! Aqui está ele com um pequeno ajuste de formatação e pontuação para manter a clareza e consistência:

---

```md
# 📝 NestJS To-Do List API

Projeto de API para gerenciamento de tarefas usando NestJS, PostgreSQL, TypeORM e Docker.

## 🔧 Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/Yanclopes/todolist.git
   cd todolist
   ```

2. Renomeie o arquivo `.env.example` para `.env`.

3. Inicie os containers com Docker Compose:

   ```bash
   docker compose up -d
   ```

4. Execute as migrations dentro do container da aplicação:

   ```bash
   docker exec -it nest_todolist npm run typeorm:run
   ```

A API estará disponível em `http://localhost:3000`.
```
