import {setDogBreeds, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_DOGBREEDS':
    return setDogBreeds(state, action.dogBreeds);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return state.update('vote',
                        voteState => vote(voteState, action.dogBreed))
    //return vote(state, action.dogBreed)
  }
  return state; //if reducer doesn't recognize action, it will return the current state
}
