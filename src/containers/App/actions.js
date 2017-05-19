import { CHANGE_SETTINGS } from './constants';

export function changeSettings(settings) {
  return Object.assign({}, {
    type: CHANGE_SETTINGS,
  }, settings);
};
