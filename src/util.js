import moment from 'moment';

export const getCalendarMatrix = (date) => {

	let prevMonthDays = moment(date).subtract(1, "month").daysInMonth();
	let startDay = [...Array(date.day()).keys()].map((x) => prevMonthDays - x).reverse();
	let days = [...Array(date.daysInMonth()).keys()].map(x => x + 1);

	days = [...startDay.map((day) => ({
		day,
		outRange: true
	})), ...days.map((day) => ({
		day,
		outRange: false,
		date: moment(date).date(day)
	}))];

	let nextMonthDays = 42 - days.length;

	if (nextMonthDays)
		days = [...days, ...[...Array(nextMonthDays).keys()].map((day) => ({
			day: day + 1,
			outRange: true
		}))];

	return days;
};

export const isReminderInMonth = (date, current) => {
	let startDay = moment(current).date(1);
	let endDay = moment(current).date(current.daysInMonth());

	return moment(date).isBetween(startDay, endDay, null, '[]');
};

export const isReminderBetween5Days = (current=moment()) => {
	let today = moment().startOf('day');
	let next16Days = moment().add(5, 'days').endOf('day');

	return moment(current).isBetween(today, next16Days, null, '[]');
};

export const isReminderInThePast = (current=moment()) => {
	let today = moment().startOf('day');

	return moment(current).isSameOrAfter(today);
};