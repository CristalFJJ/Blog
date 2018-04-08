export const CommonUtils = {
  isEmptyOrNull(v) { // 判断字符串是否为空
    return typeof (v) === 'undefined' || v == '' || v == null ? true : false;
  },
  isObject(v) { // 判断是否为对象
      if (Object.prototype.toString.call(v) == '[object Array]') {
          return false;
      }
      return typeof (v) === 'object' || v != null ? true : false;
  },
  isArray(v) { // 判断是否为数组
      return Object.prototype.toString.call(v) === '[object Array]';
  },
  isNodeList(v) { // 判断是否为节点集
      return Object.prototype.toString.call(v) === '[object NodeList]';
  },
  isInputElement(v) { // 判断是否为input元素
      return Object.prototype.toString.call(v) === '[object HTMLInputElement]';
  },
  isFunction(v) { // 判断是否为函数
      return typeof (v) === 'function';
  },
  isNumber(v) { // 判断是否为整数
      return typeof (v) === 'number';
  },
  isString(v) { // 判断是否为字符串
      return typeof (v) === 'string';
  },
  resetResize() {
      /**
      * 这个是重置监听浏览器缩放响应事件
      * 建议在beforeDestroy事件里写
      */
      window.onresize = '';
  },
}

/**
 * 本地保存父类
 */
class StorageS {
  constructor(storage) {
      if (!storage) {
          return new Error('当前浏览器不支持本地存储...');
      }
      this.storage = storage;
  }
  setItem(key, value) { // 保存单个字符串
      if (this.storage == null || CommonUtils.isEmptyOrNull(key) || CommonUtils.isEmptyOrNull(value) || !CommonUtils.isString(value)) {
          return;
      }
      this.storage.setItem(key, value);
  }
  getItem(key) { // 获取单个字符串
      if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
          return null;
      }
      if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
          return null;
      }
      return this.storage.getItem(key);
  }
  setObj(key, value) { // 保存json对象
      if (this.storage == null || CommonUtils.isEmptyOrNull(key) || (CommonUtils.isEmptyOrNull(value) && !CommonUtils.isArray(value))) {
          return;
      }
      if (!CommonUtils.isObject(value) && CommonUtils.isString(value) && !CommonUtils.isArray(value)) {
          this.storage.setItem(key, value);
          return;
      }
      this.storage.setItem(key, JSON.stringify(value));
  }
  getObj(key) { // 获取json对象
      if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
          return null;
      }
      if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
          return null;
      }
      return JSON.parse(this.storage.getItem(key));
  }
  remove(key) { // 删除本地存储
      if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
          return true;
      }
      if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
          return true;
      }
      this.storage.removeItem(key);
      if (!CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
          return false;
      }
      return true;
  }
  clear() {
      this.storage.clear();
  }
}

// 本地存储对象
class LocalStorage extends StorageS {
  constructor() {
      super(window.localStorage);
  }
}
export const Storage = new LocalStorage();

// 会话存储对象
class SessionStorage extends StorageS {
  constructor() {
      super(window.sessionStorage);
  }
}
export const SessionLocal = new SessionStorage();

// cookie
class CookieStorage {
  setCookie(name, value, time) {
      if (CommonUtils.isEmptyOrNull(name) || CommonUtils.isEmptyOrNull(value)) {
          return;
      }
      let date = new Date();
      let times = 0;
      if (time.charAt(0).toLowerCase() === 'd') { // 以天为单位
          times = parseInt(time.substr(1));
          date.setTime(date.getTime() + times * 24 * 60 * 60 * 1000);
      } else if (time.charAt(0).toLowerCase() === 'h') { // 以小时为单位
          times = parseInt(time.substr(1));
          date.setTime(date.getTime() + times * 60 * 60 * 1000);
      }
      document.cookie = name + '=' + escape(value) + ' ;expires=' + date.toGMTString();
  }
  getCookie(name) {
      if (CommonUtils.isEmptyOrNull(name)) {
          return;
      }
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      let arr = document.cookie.match(reg);
      if (!CommonUtils.isArray(arr)) {
          return null;
      }
      return unescape(arr[2]);
  }
  clearCookie(name) {
      let cookie = this.getCookie(name);
      if (CommonUtils.isEmptyOrNull(name) || CommonUtils.isEmptyOrNull(cookie)) {
          return;
      }
      let date = new Date();
      date.setTime(date.getTime() - 1);
      document.cookie = name + '=' + cookie + ' ;expires=' + date.toGMTString();
  }
}
export const Cookie = new CookieStorage();