import React from "react";
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore({});

const history = syncHistoryWithStore(browserHistory, store.store);

const App = () => {
  return (
  	<Provider store={store.store}>
  		<PersistGate loading={null} persistor={store.persistor}>
        <Router history={history} routes={routes} />
      </PersistGate>
    </Provider>
  );
};
export default App;