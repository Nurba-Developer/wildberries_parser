
# Wildberries Analytics - Backend

# О проекте
Backend часть проекта Wildberries Analytics — это REST API, реализованное на FastAPI с использованием PostgreSQL в качестве базы данных. Сервис предоставляет данные о товарах, фильтрацию, сортировку и аналитику.

# Технологии
- Python 3.10+
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic (миграции базы данных)
- Docker и Docker Compose

# Установка и запуск

# Локально без Docker
1. Создайте виртуальное окружение и активируйте его:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   .\venv\Scripts\activate   # Windows
````

2. Установите зависимости:

   ```bash
   pip install -r requirements.txt
   ```
3. Настройте переменные окружения (создайте `.env` файл), например:

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/wildberries_db
   ```
4. Запустите миграции:

   ```bash
   alembic upgrade head
   ```
5. Запустите сервер:

   ```bash
   uvicorn app.main:app --reload
   ```

# С помощью Docker

```bash
docker-compose up --build backend
```

# API документация

После запуска сервера доступна Swagger UI по адресу:
`http://localhost:8000/docs`

# Структура проекта

* `app/` — исходный код FastAPI приложения
* `alembic/` — миграции базы данных
* `requirements.txt` — зависимости Python
* `Dockerfile` — докерфайл для backend

# Тестирование

(Если добавлены тесты, указать здесь, как запускать)