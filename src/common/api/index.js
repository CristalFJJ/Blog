import axios from './axios';
import * as config from './config';
/**
 * get公共调用方法
 * @param {any} url
 * @param {any} param
 * @param {any} sucess
 * @param {any} fail
 */
function apiGet(url, params, sucess, fail) {
  if (params) {
    params._ = Date.parse(new Date()); // 设置请求不缓存
  }
  axios
    .get(url, {
      params: params
    })
    .then(res => {
      sucess(res);
    })
    .catch(error => {
      fail(error);
    });
}
/**
 * post公共调用方法
 * @param {any} url
 * @param {any} param
 * @param {any} sucess
 * @param {any} fail
 */
function apiPost(url, param = {}, sucess, fail) {
  // 判断参数类型
  axios
    .post(url, param)
    .then(res => {
      sucess(res);
    })
    .catch(error => {
      fail(error);
    });
}
export default {
  login(param, sucess, fail) { // 登录接口
    apiPost(config.LOGIN_IN, param, sucess, fail);
	},
	loginOut(param, sucess, fail){ // 登出接口
		apiPost(config.LOGIN_OUT, param, sucess, fail);
	},
  registerPreview(param, sucess, fail) { //用户名检测
    apiGet(config.REGISTER_PREVIEW, param, sucess, fail);
  },
  userRegister(param, sucess, fail) { //用户注册
    apiPost(config.USER_REGISTER, param, sucess, fail);
  },
  createArticle(param, sucess, fail){ //创建文章
    apiPost(config.CREATE_ARTICLE, param, sucess, fail);
  },
  listArticle(param, sucess, fail){ //查询文章
    apiGet(config.LIST_ARTICLE, param, sucess, fail)
  },
  upload(param, sucess, fail) { //上传接口
    apiPost(config.UPLOAD, param, sucess, fail);
  }
}
