# Проект "Чат (Slack)"

### Hexlet tests and linter status:
[![Actions Status](https://github.com/nathalieMalsh/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nathalieMalsh/frontend-project-12/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nathalieMalsh_frontend-project-12&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=nathalieMalsh_frontend-project-12)

## Описание проекта

Это учебный проект, выполненный в рамках курса "Фронтенд-разработчик" на [Хекслете](https://ru.hexlet.io). Приложение представляет собой упрощённую версию Slack.

Функциональность:
- Регистрация и авторизация пользователей
- Создание, удаление и переименование каналов
- Обмен сообщениями в реальном времени
- Удобные уведомления 
- Валидация форм и фильтрация нецензурной лексики

Используемые технологии:

- React
- Redux Toolkit
- React Redux
- React Router DOM
- Bootstrap / React-Bootstrap
- React Toastify
- Axios
- Socket.io Client
- Formik
- Yup
- i18next / React-i18next
- Leo Profanity
- @hexlet/chat-server (готовый бэкенд)
- Makefile
- Rollbar
- npm

В системе уже зарегистрирован один пользователь по умолчанию:

Ник: admin
Пароль: admin

## Установка и запуск проекта локально

> Требуется **Node.js 22.14.0** или выше

1. **Клонируйте данный репозиторий**

```
git clone https://github.com/nathalieMalsh/frontend-project-12
```

2. **Перейдите в папку проекта**

```
cd frontend-project-12
```

3. **Установите зависимости**

```
make install
```

4. **Запустите dev-сервер и откройте проект в браузере**

```
make start
```

5. **Сборка проекта (опционально)**

```
make build
```

Собранные файлы появятся в папке ```./frontend/dist```

## Ссылка на задеплоенное приложение
https://frontend-project-12-36c9.onrender.com