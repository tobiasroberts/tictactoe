import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import moves from './js/reducers/';
import App from './js/components/App';

const store = createStore(moves);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
