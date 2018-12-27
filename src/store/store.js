import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
// Root reducer and saga
import createRootReducer from '../reducers';
import rootSaga from '../sagas';
// History
import history from './history';

// eslint-disable-next-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);

const initialState = {};

/**
 * configuratedStore
 * @param  {Object} initialState={}
 * @param  {Object} history
 * @return {Object} store
 */
function configuratedStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middleware),
    devtools(),
  ];

  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(...enhancers),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configuratedStore(initialState, history);
