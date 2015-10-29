import Server from 'socket.io';

//creats socket.io server and regular HTTP server on port 8090
export default function startServer(store) {
  const io = new Server().attach(8090);

  //subscribe to redux store and emit any state changes (the ENTIRE state is sent each time) via socket.io, which will then go to the client app
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  //whenever a client connection occurs, emit the entire state to the client app
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  });

}
