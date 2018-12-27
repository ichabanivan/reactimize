/* eslint-disable no-useless-escape */
import check from 'check-types';

/**
 * required
 * @param {String} value
 * @returns {String} error or undefined
 */
export const required = value => (value ? undefined : 'REQUIRED');

/**
 * url
 * @param {String} url
 * @returns {*} error or undefined
 */
export const youtubeLink = (url) => {
  if (url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      // Do anything for being valid
      return undefined;
    }
    return 'ENTER_VALID_YOUTUBE_URL';
    // Do anything for not being valid
  }
  return undefined;
};

/**
 * email
 * @param {String} value
 * @returns {String} error or undefined
 */
export const email = value => (value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'ENTER_VALID_EMAIL' : undefined);

/**
 * password
 * @param {String} value
 * @returns {String} error or undefined
 */
export const password = value => (value && value.length < 6 ? 'ENTER_VALID_PASSWORD' : undefined);

/**
 * matchPasswords
 * @param {String} value
 * @param {String} allValues
 * @returns {*} error or undefined
 */
export const matchPasswords = (value, allValues) => (value !== allValues.password ? 'PASSWORD_DOESNT_MATCH' : undefined);

/**
 * phone
 * @param {String} value
 * @returns {*} error or undefined
 */
export const phone = value => (/^([0-9+]*)$/i.test(value) ? undefined : 'PHONE_INCORRECT');

