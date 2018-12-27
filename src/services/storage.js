// local storage API
const { localStorage } = window;

// emulation of local storage on cookies
class CookieStorage { // polyfill from MDN https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
  // eslint-disable-next-line
  length = (document.cookie.match(/\=/g) || localStorage).length;

  getItem = (sKey) => {
    if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
    // eslint-disable-next-line
    return unescape(document.cookie.replace(new RegExp(`(?:^|.*;\\s*)${escape(sKey).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`), '$1'));
  };

  // eslint-disable-next-line
  key = nKeyId => unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, '').split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);

  setItem = (sKey, sValue) => {
    if (!sKey) { return; }
    document.cookie = `${escape(sKey)}=${escape(sValue)}; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`;
    // eslint-disable-next-line
    this.length = document.cookie.match(/\=/g).length;
  };

  removeItem = (sKey) => {
    if (!sKey || !this.hasOwnProperty(sKey)) { return; }
    document.cookie = `${escape(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    this.length--;
  };

  // eslint-disable-next-line
  hasOwnProperty = sKey => (new RegExp(`(?:^|;\\s*)${escape(sKey).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=`)).test(document.cookie)
}

// on private browsing Safari does not allow local storage to be used at all
let ok = true;
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
} catch (e) {
  ok = false;
}

class Storage {
  isEmulation = !ok;

  localStorage;

  cookieStorage = new CookieStorage();

  /**
     * @description synchronize data between localStorage and cookies storage
     * @example almStorage.sync(['auth', 'language', 'stateBack']);
     * @param {Array} list of field names
     * @function almStorage.sync
     * @public
     */
  sync = (list) => {
    for (let key = 0, fieldName, data; !this.isEmulation && list && (key < list.length); key++) {
      fieldName = list[key];
      data = this.cookieStorage.getItem(fieldName);
      if (data) {
        localStorage.setItem(fieldName, data);
      } else {
        data = localStorage.getItem(fieldName);
        if (data) {
          this.cookieStorage.setItem(fieldName, data);
        }
      }
    }
  };

  /**
     * @description before get item convert it from JSON format
     * @param {String} name - name of item
     * @returns {*}
     * @function almStorage.get
     * @public
     */
  get = (name) => {
    const data = (!this.isEmulation ? localStorage : this.cookieStorage).getItem(name);
    try {
      return JSON.parse(data);
    } catch (e) { return null; }
  };

  /**
     * @description clear value by name
     * @param {String} name - name of item
     * @function almStorage.set
     * @public
     */
  remove = (name) => {
    if (!this.isEmulation) {
      localStorage.removeItem(name);
    }
    this.cookieStorage.removeItem(name);
  };

  /**
     * @description before set item convert it to JSON
     * @param {String} name - name of item
     * @param {*} data - data by rules convert to json format
     * @function almStorage.set
     * @public
     */
  set = (name, data) => {
    // eslint-disable-next-line
    data = JSON.stringify(data);
    this.remove(name);
    if (ok) {
      localStorage.setItem(name, data);
    }
    this.cookieStorage.setItem(name, data);
  };
}

export default new Storage();
