// Configuration parameters for all application
import config from './app-config';

// ON debug mode for production using url params
config.DEBUG = config.DEBUG ? true : /show_DEBUG/.test(window.location.href);

const env = process.env;

config.DEBUG &&
console.log('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;',
  '\n full ENV:', env,
  '\n SCRIPT_ENV:', env.NODE_ENV,
  '\n REACT_APP_ENV:', env.REACT_APP_ENV,
  '\n config:', config,
);

export default config;
