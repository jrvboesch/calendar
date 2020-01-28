import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {
  routerMiddleware
} from 'react-router-redux';
import {
  browserHistory
} from 'react-router';

import {
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



function configureStore(initialState) {
  const middlewares = [
    routerMiddleware(browserHistory),
    thunk,
  ];

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['routing']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(persistedReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  )
  );

  let persistor = persistStore(store);

  return {
    store,
    persistor
  };
}

export default configureStore;