import makeStore from './src/store';
import startServer from './src/server'

export const store = makeStore();
startServer(store); //starts the socket.io server AND listens to redux state store (redux will emit a state event )
