import {AddReminder} from './Actions';
import moment from 'moment';

test('reminder Works', () => {
  let reminder = AddReminder({
    label: "test",
    date: moment("2019-12-17T08:27:42.599Z"),
    city: "707860"
  })(() => {}, () => ({calendar: {reminders: [], count: 0}}));

  expect(reminder.label.length).toBeLessThanOrEqual(30);
  expect(moment.isMoment(reminder.date)).toBeTruthy();
  expect(Number(reminder.city)).toBeGreaterThan(0);
});