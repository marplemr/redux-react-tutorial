import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_DOGBREEDS', () => {
    const initialState = Map();
    const action = {type: 'SET_DOGBREEDS', dogBreeds: ['Chihuahua']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      dogBreeds: ['Chihuahua']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      dogBreeds: ['Chihuahua', 'Miniature Pinscher']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chihuahua', 'Miniature Pinscher']
      },
      dogBreeds: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Chihuahua', 'Miniature Pinscher']
      },
      dogBreeds: []
    });
    const action = {type: 'VOTE', dogBreed: 'Chihuahua'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chihuahua', 'Miniature Pinscher'],
        tally: {Chihuahua: 1}
      },
      dogBreeds: []
    }));
  });

  //test to see if reducer can handle an undefined state passed in
  it('has an initial state', () => {
    const action = {type: 'SET_DOGBREEDS', dogBreeds: ['Chihuahua']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      dogBreeds: ['Chihuahua']
    }));
  });

});
