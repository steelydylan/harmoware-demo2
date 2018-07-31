import { render } from 'react-dom';
import reducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import App from './containers/app';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
