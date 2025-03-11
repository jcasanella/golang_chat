postgresinit:
	docker run --name postgres15 -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:15-alpine

createdb:
	docker exec -it postgres15 createdb --username=root --owner=root go-chat 

dropdb:
	docker exec -it postgres15 dropdb go-chat

migrations-up:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose up

migrations-down:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose down

.PHONY: postgresinit createdb dropdb migrations-up migrations-down
