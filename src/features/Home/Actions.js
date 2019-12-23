import {ADD_REMINDER} from './Actiontypes';

const addReminder = (reminders) => {
	return {
		type: ADD_REMINDER,
		reminders
	}
}

export const AddReminder = (reminder) => (dispatch, getState) => {
	let state = getState();
	let reminders = state.calendar.reminders;
	dispatch(addReminder([...reminders, reminder]));
}