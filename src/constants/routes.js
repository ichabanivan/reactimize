export const ROOT_PATH = '/';

export const HOMEPAGE = {
  LINK: () => (`${ROOT_PATH}`),
  ROUTE: ROOT_PATH,
};

export const NO_MATCH = {
  LINK: () => ('/404'),
  ROUTE: '/404',
};

/*------------------------------------------*/
//                AUTH
/*------------------------------------------*/

export const SIGN_IN = {
  LINK: () => ('/login'),
  ROUTE: '/login',
};

export const CHECK_HEALTH = {
  LINK: () => ('/check-health'),
  ROUTE: '/check-health',
};

export const SIGN_UP = {
  LINK: () => ('/signup'),
  ROUTE: '/signup',
};

export const SIGN_UP_CONFIRMATION = {
  LINK: ({ token }) => (`/signup-confirmation/${token}`),
  ROUTE: '/signup-confirmation/:token',
};

export const CODE = {
  LINK: ({ type }) => (`/code/${type}`),
  ROUTE: '/code/:type',
};
