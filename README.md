# Wildberries Analytics

## О проекте

Wildberries Analytics — это веб-приложение для аналитики товаров с маркетплейса Wildberries.  
Сервис собирает данные о товарах (цены, скидки, рейтинги, отзывы) и визуализирует их для анализа рынка.

Основные возможности:  
- Фильтрация товаров по цене, рейтингу и количеству отзывов  
- Таблица товаров с сортировкой  
- Гистограммы распределения цен и скидок  
- Графики зависимости скидки от рейтинга и средней цены по рейтингу  
- Интерактивный и адаптивный интерфейс

---

## Технологии

- Backend: Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic  
- Frontend: React, Vite, Recharts, Tailwind CSS  
- Контейнеризация: Docker, docker-compose  
- Тестирование: Pytest (backend), Jest (frontend, при наличии)

---

## Установка и запуск

### Требования

- Docker и Docker Compose  
- Git

### Клонирование репозитория

```bash
git clone https://github.com/Nurba-Developer/wildberries_parser.git
cd wildberries_parser
````

### Запуск через Docker

```bash
docker-compose up --build
```

Сервисы будут доступны по адресам:

* Backend API: [http://localhost:8000](http://localhost:8000)
* Frontend: [http://localhost:3000](http://localhost:5173)

---

## Запуск локально без Docker

### Backend

1. Перейти в папку backend
2. Создать и активировать виртуальное окружение
3. Установить зависимости из `requirements.txt`
4. Настроить `.env` с переменными окружения (например, DATABASE\_URL)
5. Запустить миграции Alembic
6. Запустить FastAPI сервер

```bash
cd backend
python -m venv venv
source venv/bin/activate  # или venv\Scripts\activate на Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend

1. Перейти в папку frontend
2. Установить зависимости npm
3. Запустить dev-сервер

```bash
cd frontend
npm install
npm run dev
```

---

## Использование

После запуска в браузере откройте [http://localhost:5173] — увидите главную страницу с аналитикой товаров.

---

## Структура проекта

```
wildberries_parser/
├── backend/          # Backend API (FastAPI)
│   ├── app/
│   ├── alembic/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## Тестирование

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd frontend
npm test
```

## Контакты

Если есть вопросы или предложения, свяжитесь со мной:

* Email: (nurbolot.dolatbekovich@gmail.com)
* GitHub:(https://github.com/Nurba-Developer)
