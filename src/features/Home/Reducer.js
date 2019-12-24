import {ADD_REMINDER, DELETE_REMINDER, DELETE_DAY_REMINDERS} from './Actiontypes';

const initState = {
	reminders: [],
	count: 0
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case ADD_REMINDER: 
			return {
				...state,
				reminders: action.reminders,
				count: state.count + 1
			}
		case DELETE_REMINDER:
		case DELETE_DAY_REMINDERS:
			return {
				...state,
				reminders: action.reminders
			}
		default:
			return state;
	}
};

export default reducer;