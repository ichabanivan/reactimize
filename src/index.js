// Polyfill
import 'babel-polyfill';
// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux and router
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LocalizeProvider } from 'react-localize-redux';
// App
import App from './App';
// serviceWorker
import * as serviceWorker from './serviceWorker';
// Store & History
import store from './store/store';
import history from './store/history';

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
