import Server from 'socket.io';

//creats socket.io server and regular HTTP server on port 8090
export default function startServer() {
  const io = new Server().attach(8090);
}
