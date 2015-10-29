import makeStore from './src/store';
import startServer from './src/server'

export const store = makeStore();
startServer(store); //starts the socket.io server AND listens to redux state store (redux will emit a state event )

// sets redux store with value from json file and starts the voting process with NEXT action type
store.dispatch({
  type: 'SET_DOGBREEDS',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
