import React from 'react';
import ReactDOM from 'react-dom';
import 'grommet-css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import './index.css';

import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
