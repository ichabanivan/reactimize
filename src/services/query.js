/* eslint-disable no-param-reassign, no-useless-escape */

/**
 * @description method to parse url query
 * @param {String} query
 * @returns {Object}
 * @public
 */
function parseQueryParams(query) {
  const list = query.replace(/^[\?]/, '').split('&');
  const result = {};
  for (const item of list) {
    const [field, value] = item.split('=');
    result[field] = decodeURIComponent(value);
  }
  return result;
}

/**
* @description method to format object data to url query
* NOTE only one level of nesting
* @param {Object} params
* @returns {String}
* @public
*/
function formatQueryParams(params) {
  let query = '';
  for (const name in params) {
    if ({}.hasOwnProperty.call(params, name)) {
      query += `${name}=${encodeURIComponent(String(params[name]))}&`;
    }
  }
  // NOTE remove last "&"
  return `?${query.substring(0, query.length - 1)}`;
}
/**
 * @name getParamByName
 * @description method to get param from url by name
 * NOTE only one level of nesting
 * @param {String} name
 * @param {String} url
 * @returns {String}
 * @public
 */
function getParamByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export { parseQueryParams, formatQueryParams, getParamByName };
