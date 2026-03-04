# DreamSoft Furniture Starter

Стартовый проект на Next.js + TypeScript для мебельного сайта с внутренней админкой.

## Что уже есть

- Публичная часть: ` / `, ` /catalog `, ` /page/[slug] `
- Базовая админка: ` /admin `
- Prisma-схема для:
  - товаров и категорий
  - меню хедера
  - ссылок футера
  - настроек сайта
  - контент-страниц
- Серверный слой данных с fallback-данными (сайт работает даже до заполнения БД)
- Простая авторизация админа по логину/паролю из `.env`
- CRUD-формы в админке:
  - `/admin/products`
  - `/admin/menu`
  - `/admin/footer`
  - `/admin/settings`

## Запуск

1. Установить зависимости:

```bash
npm install
```

2. Проверить переменные в `.env` (пример в `.env.example`):
   - `DATABASE_URL`
   - `ADMIN_LOGIN`
   - `ADMIN_PASSWORD`
   - `AUTH_SECRET`

3. Сгенерировать Prisma Client:

```bash
npm run db:generate
```

4. Применить миграции:

```bash
npm run db:migrate
```

5. Заполнить тестовыми данными (товары, галерея, характеристики, наличие, рекомендации):

```bash
npm run db:seed
```

6. Запустить проект:

```bash
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) и [http://localhost:3000/admin](http://localhost:3000/admin).

## Следующий шаг

- Добавить полноценную ролевую модель пользователей
- Подключить загрузку изображений (S3/Cloudinary)
- Сделать расширенные формы товара (галерея/specs/рекомендации из админки)
