import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import moves from './js/reducers';
import App from './js/components/App';

const store = createStore(moves, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.createElement('div')
  );
});
