import { CHANGE_SETTINGS } from './constants';
const initialState = {
  settings: {
    isometric: true,
  }
};

export default function reducer(state = initialState, action) {
  const { type, ...payload } = action;
  const newState = Object.assign({}, state);
  switch (type) {
    case CHANGE_SETTINGS: 
      newState.settings = Object.assign({}, state.settings, payload);
      return newState;
    default:
     return state;
  }
}
