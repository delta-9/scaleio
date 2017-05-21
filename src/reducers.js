import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';

const reducers = combineReducers({
  scene: appReducer,
});

export default reducers;