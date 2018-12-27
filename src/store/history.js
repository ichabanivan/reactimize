import createHistory from 'history/createBrowserHistory';
// Constants
import { HISTORY } from '../constants';

const browserHistory = createHistory();

browserHistory.listen((location, action) => {
  // We will scroll top when user change the page but not for the search
  if (action === HISTORY.PUSH || action === HISTORY.POP) {
    window.scrollTo(0, 0);
  }
});

export default browserHistory;
