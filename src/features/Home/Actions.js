import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import {ADD_REMINDER, DELETE_REMINDER, DELETE_DAY_REMINDERS, EDIT_REMINDER, WEATHER} from './Actiontypes';

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
	let newReminder = {id: count, ...reminder};
	
	dispatch(addReminder([...reminders, newReminder]));

	return newReminder;
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
	let state = getState();
	let reminders = state.calendar.reminders;

	dispatch(removeAllReminders(date, reminders));
};

const editReminder = (newReminder, reminders) => {
	return {
		type: EDIT_REMINDER,
		reminders: reminders.map((reminder) => reminder.id == newReminder.id ? newReminder : reminder)
	}
};

export const EditReminder = (reminder) => (dispatch, getState) => {
	let state = getState();
	let reminders = state.calendar.reminders;
	
	dispatch(editReminder(reminder, reminders));
};

export const GetCurrentWeather = (cityId) => (dispatch) => {
	return axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId.toString()}&units=metric&APPID=bcfd29594d7b74f04968a4888c6681da`)
		.then((response) => [response.data]);
}

const getCityWeather = (weathers) => 
	_.groupBy(weathers.map((weather) => ({...weather, date: moment(weather.dt_txt).format("YYYY-MM-DD")})), "date");

export const GetCityWeather = (cityId, date) => (dispatch) => {
	return axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId.toString()}&units=metric&APPID=bcfd29594d7b74f04968a4888c6681da`)
		.then((response) => getCityWeather(response.data.list)[date]);
}























