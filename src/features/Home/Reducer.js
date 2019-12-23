import {ADD_REMINDER} from './Actiontypes';

const initState = {
	reminders: []
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case ADD_REMINDER: 
			return {
				...state,
				reminders: action.reminders
			}
		default:
			return state;
	}
};

export default reducer;