import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';

const reducers = combineReducers({
  map: appReducer,
});

export default reducers;