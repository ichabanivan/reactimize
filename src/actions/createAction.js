import { get } from "lodash";

/**
 * createAction
 * @param {String} type
 * @returns {*} action
 */
const createAction = type => payload => ({
  type: get(type, 'START') || type,
  payload,
  types: type, // This can be used for universal loaders
});

export default createAction;
