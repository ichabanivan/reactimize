import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { localizeReducer } from 'react-localize-redux';
// Reducers
import app from './app';
import auth from './auth';

export default history => combineReducers({
  router: connectRouter(history),
  localize: localizeReducer,
  form: formReducer,
  app,
  auth,
});
