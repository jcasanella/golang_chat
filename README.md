# Chat App - WIP

A rudimentary WebSocket server built using Golang that supports broadcasting messages to connected clients. The client implementation is done using Node.js.

## Features
- Accepts WebSocket connections
- Supports broadcasting messages to all connected clients
- Simple implementation for easy understanding and extension

## Installation

### Postgres 
1. Install Postgres, using docker
```
docker pull postgres:15-alpine
docker run --name postgres -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:15-alpine
docker exec -it postgres15 createdb --username=root --owner=root go-chat 
```

### Server (Golang)
1. Install Go (if not installed already): [Download Go](https://golang.org/dl/)
2. Clone this repository:
   ```sh
   git clone <repository_url>
   cd websocket-golang
   ```
3. Install Dependencies
```
go mod tidy
```
4. Run the websocket Server
```
go run main.go
```

## API List

### Create User

Creates an user with the `username`, `email` and `password` provided.

* url: localhost:8080/signup

* Body:
```
{
    "username": "jordi",
    "email": "jordikiter@hotmail.es",
    "password": "password"
}
```

* Sample Response:
```
{
    "id": "1",
    "username": "jordi",
    "email": "jordikiter@hotmail.es"
}
```

### Create Room

Creates a room with the `id` and `name` provided.

* url: localhost:8080/ws/createRoom

* Body:
```
{
    "id": "1",
    "name": "goRoom"
}
```

* Sample Response:
```
{
    "id": "2",
    "name": "typescriptRoom"
}
```

### Get Rooms

Return all the existing rooms

* url: localhost:8080/ws/getRooms

* Sample Response:
```
[
    {
        "id": "1",
        "name": "goRoom"
    },
    {
        "id": "2",
        "name": "typescriptRoom"
    }
]
```

### Client Node JS
1. Install NodeJS (if not installed already): [Download NodeJs](https://nodejs.org/)
2. Install dependencies
```
pnpm install
```
3. Run the client
```
node client.js
```

## Future Enhancements
* Authentication for clients
* Private messaging
* Improved error handling
