import {List, Map} from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}
export const INITIAL_STATE = Map();

//sets dogBreeds into state under dogBreeds node
export function setDogBreeds(state, dogBreeds) {
  return state.set('dogBreeds', List(dogBreeds));
}

//sets a 'vote' node under the root state node.
//sets a 'pair' node under the vote node. The pair node will have the two dogBreed nodes under it.
//sets pair by taking first two entries from dogBreeds state
//sets dogBreeds by skipping first two entries in dogBreeds state
export function next(state) {
  const dogBreeds = state.get('dogBreeds')
                         .concat(getWinners(state.get('vote'))); //concats winner(s) into dogBreeds state at end of map
  if (dogBreeds.size === 1) { //if size of dogBreeds is 1 after winner is merged in
    return state.remove('vote') //safer to modify original state than build it up from scratch
                .remove('dogBreeds') //safer to modify original state than build it up from scratch
                .set('winner', dogBreeds.first());
  } else {
    return state.merge({
      vote: Map({pair: dogBreeds.take(2)}),
      dogBreeds: dogBreeds.skip(2)
    });
  }
}

//sets a 'tally' node under the vote node. The tally node will have the two dogBreed nodes under it.
//sets the value of the tally under each dogBreed.
//if tally key is missing, set it and set it to 0; otherwise, increment it by one
export function vote(voteState, dogBreed) {
  return voteState.updateIn(
    ['tally', dogBreed],
    0,
    tally => tally + 1
  );
}
