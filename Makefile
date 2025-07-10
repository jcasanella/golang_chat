postgresinit:
	docker run --name postgres15 -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:15-alpine

wait-for-db:
	@echo "Waiting for PostgreSQL to be ready..."
	@until docker exec postgres15 pg_isready -U postgres; do \
		echo "PostgreSQL is unavailable - sleeping"; \
		sleep 2; \
	done
	@echo "PostgreSQL is ready!"

createdb:
	docker exec -it postgres15 createdb --username=root --owner=root go-chat 

dropdb:
	docker exec -it postgres15 dropdb go-chat

migrations-up:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose up

migrations-down:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose down

all: postgresinit wait-for-db createdb migrations-up

.PHONY: postgresinit wait-for-db createdb dropdb migrations-up migrations-down all
