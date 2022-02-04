import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore, { windowWithRedux } from './store';
import * as sessionActions from './store/session';

import { restoreCSRF, csrfFetch } from './store/csrf';


const store = configureStore(undefined);
const myWindow : windowWithRedux = window;

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  myWindow.csrfFetch = csrfFetch;
  myWindow.store = store;
  myWindow.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);