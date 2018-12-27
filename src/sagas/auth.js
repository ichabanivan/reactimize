import axios from 'axios';
import { get } from 'lodash';
import { put, call, takeLatest, fork } from 'redux-saga/effects';
// History
import history from '../store/history';
import store from '../store/store';
// Constants
import { AUTH, PROFILE } from '../actions/types';
import config from '../constants/config';
import { ROOT_PATH } from '../constants/routes';
// Services
import storage from '../services/storage';
// Absolute url to API
const API_PATH = config.serviceUrl + config.apiPath;
// AUTH CONSTANTS
const AUTH_STORE = 'sAuth';
const AUTH_BEARER = 'Bearer ';
const AUTH_HEADER = 'Authorization';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

/**
 * @name instanceAPI
 * @description axios instance with base configuration of app
 * @public
 */
export const instanceAPI = axios.create({
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

/**
 * @name prepareResponse
 * @description prepare results. Solution to prepare data ... or not
 * @param {Object} response
 * @private
 * @return {*} response
 */
function prepareResponse(response) {
  // NOTE solution to prepare data
  return get(response, 'data');
}

/**
 * @description check health of server
 * @example checkHealth().then( ... ).catch( ... )
 * @returns {Promise}
 * @public
 */
function checkHealth() {
  // NOTE used the origin axios instance
  return axios.get(`${API_PATH}/ping`);
}

/**
 * @name prepareError
 * @description prepare error
 * @param {Object} error
 * @private
 * @return {Promise} error
 */
function prepareError(error) {
  const { response, request, config } = error;
  console.info('%c Interceptor', 'background: #EC1B24; color: #fff; font-size: 14px; font-weigth: bold;',
    '\n', error,
    '\n config:', config,
    '\n request:', request,
    '\n response:', response,
  );

  if (
    !response
    // NOTE skip ping request
    && !/\/api\/ping/.test(config.url)
  ) {
    checkHealth()
      .then(() => '')
      // NOTE send to root-health page using hard reboot
      .catch(() => {
        // if (window.location.pathname !== ROOT_PATH) {
        //   window.location.pathname = ROOT_PATH;
        // }
      });
  }
  const data = get(response, 'data') || { message: get(error, 'message') };
  return Promise.reject(data);
}

/**
 * @name saveSession
 * @description sync check to known is user logged in
 * @param {Object} data
 * @private
 */
export function saveSession(data) {
  // NOTE save session at the moment primitive
  storage.set(AUTH_STORE, {
    [ACCESS_TOKEN]: get(data, ACCESS_TOKEN),
    [REFRESH_TOKEN]: get(data, REFRESH_TOKEN),
  });
}

/**
 * @name clearSession
 * @description sync check to known is user logged in
 * @private
 */
function clearSession() {
  // NOTE clear session at the moment primitive
  storage.remove(AUTH_STORE);
}

/**
 * @description
 * @example logout().then( ... ).catch( ... )
 * @returns {Promise}
 * @public
 */
function logout() {
  return new Promise((resolve) => {
    const out = () => {
      clearSession();
      delete instanceAPI.defaults.headers[AUTH_HEADER];
      store.dispatch({
        type: AUTH.GET_SELF.FINISH,
        payload: null,
      });
      store.dispatch({
        type: AUTH.SIGNED,
        payload: false,
      });
      resolve({});
    };
    instanceAPI({
      method: 'post',
      url: `${API_PATH}/oauth/token/sign-out`,
    })
      .then(out)
      .catch(out);
  });
}

/**
 * @description try to refresh session using refresh_token
 * @example refreshSession().then( ... ).catch( ... )
 * @public
 * @return {Promise}
 */
export function refreshSession() {
  return new Promise((resolve, reject) => {
    // Remove authentication header if it present
    delete instanceAPI.defaults.headers[AUTH_HEADER];
    // Get refresh token
    const refreshToken = storage.get(AUTH_STORE)[REFRESH_TOKEN];
    // NOTE use the axios origin instance to refresh and store new session data
    axios.post(`${API_PATH}/oauth/token/refresh-token`, { refreshToken })
      .then((session) => {
        saveSession(session);
        // Set common header
        instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
        resolve(session);
      })
      // NOTE execute application logout
      .catch(error => logout().finally(() => {
        reject(error);
      }));
  });
}

/**
 * isRefreshing
 * @description local variables to correctness refreshing session process
 * @private
 */
let isRefreshing = false;

let stuckRequests = [];

/**
 * handleRefreshSession
 * @description store all requests with 401 refresh session and try send request again
 * @param {Object} error
 * @private
 * @return {*} Error
 */
function handleRefreshSession(error) {
  const { config } = error;
  if (!isRefreshing) {
    isRefreshing = true;
    refreshSession()
      .then((session) => {
        // NOTE resend all
        stuckRequests.map(({ config, resolve, reject }) => {
          // set common authentication header
          // eslint-disable-next-line
          config.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
          instanceAPI(config).then(resolve).catch(reject);
          // NOTE "array-callback-return"
          return null;
        });
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      })
      .catch(() => {
        // NOTE reject all
        stuckRequests.map(({ error, reject }) => reject(error));
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
        // store.dispatch(showModal('ModalSignIn'));
      });
  }
  // NOTE determine first trying to restore session
  // to prevent recursive restoring session for not allowed request based on user permissions
  if (!config.wasTryingToRestore) {
    return new Promise((resolve, reject) => {
      config.wasTryingToRestore = true;
      stuckRequests.push({ config, error, resolve, reject });
    });
  }
  return prepareError(error);
}

/**
 * @description origin axios instance interceptors
 * @private
 */
axios.interceptors.response.use(
  prepareResponse,
  prepareError,
);

/**
 * @description sync check to known is user logged in
 * NOTE to known more {@link https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c | axios-interceptors-refresh-token}
 * @private
 */
instanceAPI.interceptors.response.use(
  prepareResponse,
  error => (error.request.status === 401 ? handleRefreshSession(error) : prepareError(error)),
);

/**
 * @name signIn
 * @param {Object} action => { payload: { email: 'email', password: 'password' } }
 * @public
 */
export function* signIn(action) {
  const { payload } = action;
  // Incoming data
  const email = get(payload, 'email');
  const password = get(payload, 'password');

  try {
    // Sign In - get session
    const session = yield call(instanceAPI, {
      method: 'post',
      url: '/oauth/token',
      data: { email, password },
    });

    // yield put(hideModal('ModalSignIn'));
    // Set common authentication header
    instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
    // Save session
    saveSession(session);
    // Check token on API and getSelf
    yield put({
      type: AUTH.GET_SELF.START,
      payload: {
        session,
      },
    });
  } catch (e) {
    // yield put(hideModal('ModalSignIn'));
    // yield put(showModal('ModalSystem', e));
    // NOTE without preparing error
    yield put({
      type: AUTH.SIGN_OUT.START,
    });
  }
}

/**
 * @name signUp
 * @param {Object} action => { payload: { email: 'valid email', password: 'password' } }
 */
export function* signUp(action) {
  const { payload } = action;
  const name = get(payload, 'name');
  const email = get(payload, 'email');
  const password = get(payload, 'password');

  try {
    yield call(axios, {
      method: 'post',
      url: `${API_PATH}/users`,
      data: { email, password, name },
    });
    // yield put(hideModal('ModalSignUp'));
    // yield put(showModal('ModalSystem', {
    //   info: 'INFO.USER_WAS_CREATED',
    // }));
  } catch (e) {
  //   yield put(hideModal('ModalSignUp'));
  //   yield put(showModal('ModalSystem', e));
    // NOTE without preparing error
    yield put({
      type: AUTH.SIGN_OUT.START,
    });
  }
}

/**
 * @name isLoggedIn
 * @description sync check to known is user logged in
 * @example isLoggedIn(); // => true/false
 * @returns {Boolean}
 * @public
 */
export function* isLoggedIn() {
  const isLoggedIn = !!storage.get(AUTH_STORE);
  try {
    yield put({
      type: AUTH.SIGNED,
      payload: isLoggedIn,
    });
  } catch (e) {
    console.error(e);
  }
  return isLoggedIn;
}

/**
 * @name getSelf
 */
export function* getSelf() {
  try {
    // NOTE getSelf
    const user = yield call(instanceAPI, {
      method: 'get',
      url: '/users/self',
    });
    // NOTE save to reducer
    yield put({
      type: AUTH.GET_SELF.FINISH,
      payload: user,
    });
    yield put({
      type: PROFILE.SIMPLE_PLAYLISTS.START,
      payload: {},
    });
    yield call(isLoggedIn);
  } catch (e) {
    // NOTE execute application logout
    yield put({
      type: AUTH.SIGN_OUT.START,
    });
  }
}

/**
 * @name updateSelf
 * @param {*} action
 */
export function* updateSelf(action) {
  const { payload } = action;
  try {
    const user = yield call(instanceAPI, {
      method: 'put',
      url: '/users/self',
      data: payload,
    });

    yield put({
      type: AUTH.GET_SELF.FINISH,
      payload: user,
    });

    // yield put(showModal('ModalSystem', { info: 'INFO.PROFILE_UPDATED' }));
  } catch (e) {
    console.error(e);
  }
}

/**
 * @name restoreSession
 * @description try to restore session after reloading application page
 * @public
 */
function* restoreSession() {
  try {
    // If don't have a session at all
    const signed = yield call(isLoggedIn);

    if (signed) {
      // Get session from storage
      const session = storage.get(AUTH_STORE);
      // Set common authentication header
      instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
      // Check token on API
      yield put({
        type: AUTH.GET_SELF.START,
        payload: {
          session,
        },
      });
    } else {
      yield put({
        type: AUTH.SIGN_OUT.START,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * @name verifyPasswordToken
 * @description check token for changing password
 * @param {Object} action
 * @public
 */
export function* verifyPasswordToken(action) {
  const { payload } = action;
  const token = get(payload, 'token');

  try {
    // NOTE used the origin axios instance
    yield call(axios, {
      url: `${API_PATH}/oauth/token/forgot-password/exists`,
      data: {
        token,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @name changePassword
 * @description change password by token
 * @param {Object} action
 * @public
 */
function* changePassword(action) {
  const { payload } = action;
  const token = get(payload, 'token');
  const password = get(payload, 'password');

  try {
    // NOTE used the origin axios instance
    yield call(axios, {
      method: 'post',
      url: `${API_PATH}/oauth/token/forgot-password`,
      params: {
        token,
        password,
      },
    });
  } catch (e) {
    yield call(history.replace, ROOT_PATH);
    // yield put(showModal('ModalSystem', { info: 'INFO.PASSWORD_CHANGED' }));
  }
}

/**
 * @name changePassword
 * @description change password by token
 * @param {Object} action
 * @public
 */
function* updatePassword(action) {
  const { payload } = action;

  try {
    // NOTE used the origin axios instance
    yield call(axios, {
      method: 'PUT',
      url: `${API_PATH}/users/password`,
      data: payload,
    });
    // yield put(showModal('ModalSystem', { info: 'INFO.PASSWORD_CHANGED' }));
  } catch (e) {
    // yield put(showModal('ModalSystem', { info: 'INFO.PASSWORD_NOT_CHANGED' }));
  }
}

/**
 * @name forgotPassword
 * @description force password restore by email
 * @param {Object} action
 * @public
 */
export function* forgotPassword(action) {
  const { payload } = action;
  const email = get(payload, 'email');
  try {
    // NOTE used the origin axios instance
    yield call(axios, {
      method: 'get',
      url: `${API_PATH}/oauth/token/forgot-password`,
      params: {
        email,
      },
    });

    // yield put(hideModal('ForgotPassword'));
  } catch (e) {
    console.error(e);
  }
}

/**
 * @name emailConfirmation
 * @param {Object} action
 * @public
 */
function* emailConfirmation(action) {
  const { payload } = action;
  const token = get(payload, 'token');

  try {
    // NOTE used the origin axios instance
    const session = yield call(axios, {
      method: 'get',
      url: `${API_PATH}/oauth/token/confirmation`,
      params: {
        token,
      },
    });

    saveSession(session);

    // Set common authentication header
    instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
    // check token on API
    yield put({
      type: AUTH.GET_SELF.START,
      payload: {
        session,
      },
    });

    yield call(history.replace, ROOT_PATH);
    // yield put(showModal('ModalSystem', {
    //   message: 'WELCOME',
    // }));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Sign In / Sign Up with facebook / twitter
 */
export function socialSignUp(action) {
  const { payload } = action;
  // Go to sign in/sign up in new window
  const params = {
    width: 600,
    height: 600,
    top: window.screenY + ((window.outerHeight - 600) / 2.5),
    left: window.screenX + ((window.outerWidth - 600) / 2),
    toolbar: 'no',
    location: 'no',
    directories: 'no',
    status: 'no',
    menubar: 'no',
    scrollbars: 'no',
    resizable: 'no',
    copyhistory: 'no',
  };

  const parts = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      parts.push(`${key}=${params[key]}`);
    }
  }

  window.open(`${config.serviceUrl}${config.apiPath}/oauth/token/${payload}`, '_blank', parts.join(', '));
}

/**
 * Getting a token using social network
 * This action will be called only in a new window!!!
 * @param {Object} action
 */
export function* socialGetToken(action) {
  const {
    payload,
  } = action;
  // localStorage.removeItem(APP.TOKENS);

  console.log(payload);

  try {
    // Getting a token
    const session = yield call(instanceAPI, {
      method: 'GET',
      url: `/oauth/token/${payload.social}?code=${payload.code}`,
    });

    saveSession(session);

    // Set common authentication header
    instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
    // check token on API
    yield put({
      type: AUTH.GET_SELF.START,
      payload: {
        session,
      },
    });

    yield call(history.replace, ROOT_PATH);
    if (window.opener) {
      window.close();
      window.opener.location.reload();
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * App Saga
 */
export default function* () {
  yield fork(takeLatest, AUTH.GET_SELF.START, getSelf);
  yield fork(takeLatest, AUTH.UPDATE_PROFILE.START, updateSelf);
  yield fork(takeLatest, AUTH.SIGN_IN.START, signIn);
  yield fork(takeLatest, AUTH.SIGN_UP.START, signUp);
  yield fork(takeLatest, AUTH.SIGN_OUT.START, logout);
  yield fork(takeLatest, AUTH.CHECK_HEATH.START, checkHealth);
  yield fork(takeLatest, AUTH.REFRESH_SESSION.START, refreshSession);
  yield fork(takeLatest, AUTH.RESTORE_SESSION.START, restoreSession);
  yield fork(takeLatest, AUTH.EMAIL_CONFIRMATION.START, emailConfirmation);
  yield fork(takeLatest, AUTH.FORGOT_PASSWORD.START, forgotPassword);
  yield fork(takeLatest, AUTH.CHANGE_PASSWORD.START, changePassword);
  yield fork(takeLatest, AUTH.UPDATE_PASSWORD.START, updatePassword);
  yield fork(takeLatest, AUTH.VERIFY_PASSWORD_TOKEN.START, verifyPasswordToken);
  yield fork(takeLatest, AUTH.SOCIAL_SIGN_UP.START, socialSignUp);
  yield fork(takeLatest, AUTH.SOCIAL_GET_TOKEN.START, socialGetToken);

  yield* restoreSession();
}
