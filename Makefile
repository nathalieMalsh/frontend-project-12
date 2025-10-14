install: # чистая установка зависимостей (устанавливает зависимости строго по package-lock.json)
	npm ci && cd frontend && npm ci

build: # сборка проекта в папку ./frontend/dist
	npm ci && cd frontend && npm ci && npm run build

start: # запуск сервера
	npx start-server -s ./frontend/dist
