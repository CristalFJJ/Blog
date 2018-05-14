import { RegexEnum } from './enum/regexEnum'; // 正则规则枚举

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
	getDefaultPath(){ //返回入口面
		window.location.href = window.location.origin;
  },
  regValidator(regx, value) {
    /**
     * 正则统一验证函数
     * @param (regex : regex) 正则规则
     * @param (value : Objext) 值
     * @return Boolean
     * 
     */
    if (CommonUtils.isEmptyOrNull(regx) || CommonUtils.isEmptyOrNull(value) || CommonUtils.isArray(value)) {
        // throw new Error('参数有误...');
        return false;
    }
    return regx.test(value);
  },
  randomString(len) {  // 获取随机字符串
    len = len || 0;
    var ranStr= 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678<>%#$~(){}^&*!+-';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = ranStr.length;
    var str = '';
    for (let i = 0; i < len; i++) {
      str += ranStr.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  },
  //滚动条在Y轴上的滚动距离
  getScrollTop(){
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　if(document.body){
  　　bodyScrollTop = document.body.scrollTop;
  　}
  　if(document.documentElement){
  　　documentScrollTop = document.documentElement.scrollTop;
  　}
  　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　return scrollTop;
  },
  
  //文档的总高度
  getScrollHeight(){
    let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　if(document.body){
  　　bodyScrollHeight = document.body.scrollHeight;
  　}
  　if(document.documentElement){
  　　documentScrollHeight = document.documentElement.scrollHeight;
  　}
  　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　return scrollHeight;
  },
  
  //浏览器视口的高度
  getWindowHeight(){
    let windowHeight = 0;
  　if(document.compatMode == "CSS1Compat"){
  　　windowHeight = document.documentElement.clientHeight;
  　}else{
  　  windowHeight = document.body.clientHeight;
  　}
  　return windowHeight;
  },
  // 查找字符串
  findString (str) { 
    let TRange=null;
    if (parseInt(navigator.appVersion)<4) return;
    let strFound;
    if (window.find) {
    // CODE FOR BROWSERS THAT SUPPORT window.find
      strFound=self.find(str);
      if (strFound && self.getSelection && !self.getSelection().anchorNode) {
        strFound=self.find(str)
        
      }
      if (!strFound) {
        strFound=self.find(str,0,1)
        while (self.find(str,0,1)) continue
      }
    }
    else if (navigator.appName.indexOf("Microsoft")!=-1) {
    // EXPLORER-SPECIFIC CODE
      if (TRange!=null) {
        TRange.collapse(false)
        strFound=TRange.findText(str)
        if (strFound) TRange.select()
      }
      if (TRange==null || strFound==0) {
        TRange=self.document.body.createTextRange()
        strFound=TRange.findText(str)
        if (strFound) TRange.select()
      }
    }
    else if (navigator.appName=="Opera") {
      console.log ("Opera browsers not supported, sorry...")
      return;
    }
    if (!strFound) console.log ("String '"+str+"' not found!")
    return;
  } 
}
// 正则工具类
export const RegexUtils = {
  accountFormat(v) {  //账户格式
    return CommonUtils.regValidator(RegexEnum.ISACCOUNT, v);
  },
  phoneFormat(v) { // 手机格式
    return CommonUtils.regValidator(RegexEnum.ISMOBILE, v);
  },
  TelFormat(v) { // 座机格式
    return CommonUtils.regValidator(RegexEnum.TELPHONE, v);
  },
  email(v) { // 邮箱
    return CommonUtils.regValidator(RegexEnum.EMAIL, v);
  },
  userName(v) { // 用户名格式
    return CommonUtils.regValidator(RegexEnum.USERNAME, v);
  },
  isName(v) { // 名称
    return CommonUtils.regValidator(RegexEnum.NAME, v);
  },
  isPassword(v) { // 检测密码格式
    return CommonUtils.regValidator(RegexEnum.ISPWD, v);
  },
  isNumber(v) { // 是否为数字
    return CommonUtils.regValidator(RegexEnum.NUMBER, v);
  },
  lowLevel(v) { // 弱密码格式
    return CommonUtils.regValidator(RegexEnum.LOWPWD, v);
  },
  highLevel(v) { // 强密码格式
    return CommonUtils.regValidator(RegexEnum.HIGHPWD, v);
  },
  isMileage(v) { // Mileage
    return CommonUtils.regValidator(RegexEnum.MILEAGE, v);
  },
  isCost(v) { // COST
    return CommonUtils.regValidator(RegexEnum.COST, v);
  },
  isErrorCost(v) { // setError COST
    return CommonUtils.regValidator(RegexEnum.ERRORCOST, v);
  },
  isUrl(v) { // 匹配url地址
    return CommonUtils.regValidator(RegexEnum.URL, v);
  }
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
  setItem(key, value) { // 保存单个
    if (this.storage == null || CommonUtils.isEmptyOrNull(key) || CommonUtils.isEmptyOrNull(value) || !CommonUtils.isString(value)) {
      return;
    }
    this.storage.setItem(key, value);
  }
  getItem(key) { // 获取单个
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

// 登录用户信息
class LoginAccount {
	constructor() {
		this.LocalStorage = new LocalStorage();
	}
	getToken(name = 'userInfo') { // 登录返回的token
		let account = this.LocalStorage.getObj(name);
		if (CommonUtils.isEmptyOrNull(account)) {
			return '';
		}
		return account.token;
	}
	getUserInfo(name = 'userInfo') { // 获取登录用户信息
		let account = this.LocalStorage.getObj(name);
		if (CommonUtils.isEmptyOrNull(account)) {
			return '';
		}
		return account;
	}
}
export const Account = new LoginAccount();

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
