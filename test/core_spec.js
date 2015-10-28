import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setDogBreeds, next, vote} from '../src/core';

describe('application logic', () => {

  describe('vote', () => {
  it('creates a tally for the voted dog entry', () => {
    const state = Map({
      vote: Map({
        pair: List.of('Chihuahua', 'Miniature Pinscher')
      }),
      dogBreeds: List()
    });
    const nextState = vote(state, 'Chihuahua');
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Chihuahua', 'Miniature Pinscher'),
        tally: Map({
          'Chihuahua': 1
        })
      }),
      dogBreeds: List()
    }));
  });
  it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Chihuahua', 'Miniature Pinscher'),
          tally: Map({
            'Chihuahua': 3,
            'Miniature Pinscher': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Chihuahua');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Chihuahua', 'Miniature Pinscher'),
          tally: Map({
            'Chihuahua': 4,
            'Miniature Pinscher': 2
          })
        }),
        entries: List()
      }));
    });
});

  describe('setDogBreeds', () => {
    it('add dog breeds to the state', () => {
      const state = Map();
      const dogBreeds = List.of('Chihuahua', 'Miniature Pinscher');
      const nextState = setDogBreeds(state, dogBreeds);
      expect(nextState).to.equal(Map({
        dogBreeds: List.of('Chihuahua', 'Miniature Pinscher')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two dog breeds under vote', () => {
      const state = Map({
        dogBreeds: List.of('Chihuahua', 'Miniature Pinscher', 'Poodle')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Chihuahua', 'Miniature Pinscher')
        }),
        dogBreeds: List.of('Poodle')
      }));
    });
    it('puts winner of current vote back to dogBreeds', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Chihuahua', 'Miniature Pinscher'),
          tally: Map({
            'Chihuahua': 4,
            'Miniature Pinscher': 2
          })
        }),
        dogBreeds: List.of('Poodle', 'Great Dane', 'Bull Dog')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Poodle', 'Great Dane')
        }),
        dogBreeds: List.of('Bull Dog', 'Chihuahua')
      }));
    });
    it('puts both from tied vote back to dogBreeds', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Chihuahua', 'Miniature Pinscher'),
          tally: Map({
            'Chihuahua': 3,
            'Miniature Pinscher': 3
          })
        }),
        dogBreeds: List.of('Poodle', 'Great Dane', 'Bull Dog')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Poodle', 'Great Dane')
        }),
        dogBreeds: List.of('Bull Dog', 'Chihuahua', 'Miniature Pinscher')
      }));
    });
    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Chihuahua', 'Miniature Pinscher'),
          tally: Map({
            'Chihuahua': 4,
            'Miniature Pinscher': 2
          })
        }),
        dogBreeds: List() //no entries left bc they all have been voted on and removed from
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Chihuahua'
      }));
    });
  });

});
