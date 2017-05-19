import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import createLayout from './predictUI/createLayout';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const predict = createLayout();

const store = createStore(reducers);

store.subscribe(() => { predict.storeSubscribeHandler(store.getState()); });


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
