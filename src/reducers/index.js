import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';

import CalendarReducer from '../features/Home/Reducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	calendar: CalendarReducer
});

export default rootReducer;