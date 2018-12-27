import { fork } from 'redux-saga/effects';
import app from './app';
import auth from './auth';

/**
 * rootSaga
 * @param {Object} store
 */
function* rootSaga(store) {
  yield fork(app, store);
  yield fork(auth, store);
}

export default rootSaga;
