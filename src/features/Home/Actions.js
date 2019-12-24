import moment from 'moment';

import {ADD_REMINDER, DELETE_REMINDER, DELETE_DAY_REMINDERS} from './Actiontypes';

const addReminder = (reminders) => {
	return {
		type: ADD_REMINDER,
		reminders
	}
};

export const AddReminder = (reminder) => (dispatch, getState) => {
	let state = getState();
	let reminders = state.calendar.reminders;
	let count = state.calendar.count + 1;

	dispatch(addReminder([...reminders, {id: count, ...reminder}]));
};

const deleteReminder = (id, reminders) => {
	return {
		type: DELETE_REMINDER,
		reminders: reminders.filter((reminder) => reminder.id != id)
	}
};

export const DeleteReminder = ({id}) => (dispatch, getState) => {
	let state = getState();
	let reminders = state.calendar.reminders;

	dispatch(deleteReminder(id, reminders));
};

const removeAllReminders = (date, reminders) => {
	return {
		type: DELETE_DAY_REMINDERS,
		reminders: reminders.filter((reminder) => !date.isSame(moment(reminder.date), 'day'))
	}
};

export const RemoveAllReminders = (date) => (dispatch, getState) => {
	console.log(date)
	let state = getState();
	let reminders = state.calendar.reminders;

	dispatch(removeAllReminders(date, reminders));
};

