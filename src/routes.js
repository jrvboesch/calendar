import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './features/layouts/Main';
import PageNotFound from './features/PageNotFound';
import Home from './features/Home';

export default (
	<Route>
		<Route path="/" component={Main}>
			<IndexRoute component={Home}/>
		</Route>
		<Route path="*" component={PageNotFound}/>
	</Route>
);