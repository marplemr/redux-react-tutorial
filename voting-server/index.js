import makeStore from './src/store';
import startServer from './src/server'

export const store = makeStore();
startServer(); //starts the socket.io server
