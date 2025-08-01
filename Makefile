install: # чистая установка зависимостей (устанавливает зависимости строго по package-lock.json)
	npm ci

link: # генерация ссылки для проекта
	npm link

# перед этим использовать make link (npm link)
publish: #отладка публикации проекта
	npm publish --dry-run

build: # сборка фронтенда в папку dist
	npm ci && cd frontend && npm ci && npm run build

start: # запуск сервера
	npx start-server -s ./frontend/dist
