
# Тестовое задание: Backend аналога Trello.

## Стек:
- Framework: NestJS
- Database: PostgreSQL + Kysely
- Auth: JWT
- Documentation: Swagger

## Запуск проекта

1. Установка зависимостей:
   ```bash
   npm install
   ```
2. Настройка окружения:
   В корне проекта создать файл .env по примеру .env.example

4. Миграции:
    ```bash
    npm run db:migration:run
   ```

5. Запуск:
   ```bash
   npm run start:dev
   ```

После запуска Swagger доступен по адресу: 'http://localhost:3000/docs'

