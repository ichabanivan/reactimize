import { put, call, fork, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { get } from 'lodash';
import { addTranslationForLanguage, setActiveLanguage } from 'react-localize-redux';
// Constants
import config from '../constants/config';
import CONSTANTS from '../constants';
import APP from '../actions/types';

/**
 * changeLanguage
 */
export function* getLanguages() {
  try {
    const urlAR = `${get(config, 'translations')}/ar.json`;
    const urlEN = `${get(config, 'translations')}/en.json`;

    const [ar, en] = yield all([
      call(axios, {
        url: urlAR,
      }),
      call(axios, {
        url: urlEN,
      }),
    ]);

    yield put(addTranslationForLanguage(ar, CONSTANTS.AR));
    yield put(addTranslationForLanguage(en, CONSTANTS.EN));
    yield put(setActiveLanguage(get(config, 'defaultLanguage')));
  } catch (e) {
    console.error(e);
  }
}

/**
 * setLanguage
 */
export function* setLanguage(action) {
  const { payload } = action;
  try {
    yield put(setActiveLanguage(payload));

    yield put({
      type: APP.LANGUAGE.REDUCER,
      payload,
    });
  } catch (e) {
    console.error(e);
  }
}


/**
 * App Saga
 */
export default function* () {
  yield fork(takeLatest, APP.LANGUAGE.START, setLanguage);

  yield* getLanguages();
}
