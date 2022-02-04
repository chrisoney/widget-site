import { createStore, combineReducers, applyMiddleware, compose, Store} from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';

let enhancer: any;

export interface windowWithRedux extends Window {
  store?: {};
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  csrfFetch?: any;
  sessionActions?: any;
}

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const myWindow: windowWithRedux = window;
  const composeEnhancers = myWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
  session: sessionReducer,
})

const configureStore = (preloadedState: ({} | undefined)): Store => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;