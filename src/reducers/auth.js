import { combineReducers } from 'redux';
// Constants
import { AUTH } from '../actions/types';

/**
 * @name user
 * @param {Object} state
 * @param {Object} action
 * @return {Object} state
 */
export function user(state = null, action) {
  switch (action.type) {
    case AUTH.GET_SELF.REDUCER:
      return action.payload;

    default:
      return state;
  }
}

export default combineReducers({
  user,
});
