import { 
  CHANGE_SETTINGS,
  ADD_ELEMENT,
  ADD_CONNECTION,
  SET_ELEMENT_PROPERTIES
} from './constants';

export function changeSettings(settings) {
  return Object.assign({}, {
    type: CHANGE_SETTINGS,
  }, settings);
};

export function addElement(elementType, elementId) {
  return {
    type: ADD_ELEMENT,
    elementType,
    elementId,
  }
}

export function addConnection(connectionType, elements, connectionId) {
  return {
    type: ADD_CONNECTION,
    connectionType,
    elements,
    connectionId,
  }
}

export function setElementProperties(elementId, properties) {
  return {
    type: SET_ELEMENT_PROPERTIES,
    elementId,
    properties
  }
}