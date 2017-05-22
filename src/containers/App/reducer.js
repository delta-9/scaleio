import { 
  CHANGE_SETTINGS,
  ADD_ELEMENT,
  ADD_CONNECTION,
  SET_ELEMENT_PROPERTIES
} from './constants';

const initialState = {
  settings: {
    isometric: true,
  },
  elements: {},
  connections: {},
};

export default function reducer(state = initialState, action) {
  const { type, ...payload } = action;
  const newState = Object.assign({}, state);
  switch (type) {
    case CHANGE_SETTINGS: 
      newState.settings = Object.assign({}, state.settings, payload);
      return newState;
    case ADD_ELEMENT:  
      newState.elements[action.elementId] = {
        type: action.elementType,
        options: action.options,
      };
      return newState;
    case ADD_CONNECTION:
      newState.connections[action.connectionId] = {
        type: action.connectionType,
        elements: action.elements,
      };
      return newState;
    case SET_ELEMENT_PROPERTIES:
      newState.settings = Object.assign({}, state.settings, payload);
      return newState;
    default:
     return state;
  }
}
