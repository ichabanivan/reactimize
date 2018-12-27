import { combineReducers } from 'redux';
import { get } from 'lodash';
// Constants
import APP from '../actions/types';
import config from '../constants/config';
import CONSTANTS from '../constants';

/**
 * direction
 * @param {String} state='ltr'
 * @param {Object} action
 * @return {Object} state
 */
export function direction(state = get(config, 'defaultDirection', 'ltr'), action) {
  switch (action.type) {
    case APP.SET_DIRECTION:
      return action.payload;

    default:
      return state;
  }
}

/**
 * language
 * @param {String} state='ar'
 * @param {Object} action
 * @return {Object} state
 */
export function language(state = get(config, 'defaultLanguage', CONSTANTS.AR), action) {
  switch (action.type) {
    case APP.LANGUAGE.REDUCER:
      return action.payload;

    default:
      return state;
  }
}

export default combineReducers({
  direction,
  language,
});
