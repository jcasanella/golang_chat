# WebSocket Server in Golang

A rudimentary WebSocket server built using Golang that supports broadcasting messages to connected clients. The client implementation is done using Node.js.

## Features
- Accepts WebSocket connections
- Supports broadcasting messages to all connected clients
- Simple implementation for easy understanding and extension

## Installation

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
