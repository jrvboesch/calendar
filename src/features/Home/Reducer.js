import {ADD_REMINDER, DELETE_REMINDER, DELETE_DAY_REMINDERS, EDIT_REMINDER, WEATHER} from './Actiontypes';

const initState = {
  reminders: [],
  count: 0,
  weathers: {}
};

const reducer = (state = initState, action) => {
  switch (action.type) {
  case ADD_REMINDER: 
    return {
      ...state,
      reminders: action.reminders,
      count: state.count + 1
    };
  case EDIT_REMINDER:
  case DELETE_REMINDER:
  case DELETE_DAY_REMINDERS:
    return {
      ...state,
      reminders: action.reminders
    };
  case WEATHER: 
    return {
      ...state,
      weathers: action.weathers
    };
  default:
    return state;
  }
};

export default reducer;