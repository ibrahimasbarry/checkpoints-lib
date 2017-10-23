const mammals = ['Tiger', 'Panda', 'Pig'];
const birds = ['Eagle', 'Flamingo', 'Penguin'];
const fish = [ 'Seahorse', 'Octopus', 'Stingray'];

const initialState = {
	selectedMammal: 'Tiger',
	selectedBird: 'Eagle',
	selectedFish: 'Seahorse',
	mammals,
	birds,
	fish,
};

import { SET_MAMMAL, SET_BIRD, SET_FISH } from '../action-creators/actions';

export default (state = initialState, action) => {

	const nextState = Object.assign({}, state);

	switch (action.type) {
		case SET_MAMMAL:
			nextState.selectedMammal = action.animal;
			return nextState;
		case SET_BIRD:
			nextState.selectedBird = action.animal;
			return nextState;
		case SET_FISH:
			nextState.selectedFish = action.animal;
			return nextState;
		default:
			return state;
	}

};
