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
  login(param, success, fail) { // 登录接口
    apiPost(config.LOGIN_IN, param, success, fail);
	},
	loginOut(param, success, fail){ // 登出接口
		apiPost(config.LOGIN_OUT, param, success, fail);
	},
  registerPreview(param, success, fail) { //用户名检测
    apiGet(config.REGISTER_PREVIEW, param, success, fail);
  },
  userRegister(param, success, fail) { //用户注册
    apiPost(config.USER_REGISTER, param, success, fail);
  },
  createArticle(param, success, fail){ //创建文章
    apiPost(config.CREATE_ARTICLE, param, success, fail);
  },
  updateArticle(param, success, fail){ //更新文章
    apiPost(config.UPDATE_ARTICLE, param, success, fail);
  },
  listArticle(param, success, fail){ //查询文章
    apiGet(config.LIST_ARTICLE, param, success, fail)
  },
  detailArticle(param,success, fail){ //查询文章具体
    apiGet(config.DETAIL_ARTICLE, param, success, fail)
  },
  deleteArticle(param,success,fail){ //删除文章
    apiPost(config.DELETE_ARTICLE, param, success, fail);
  },
  searchArticle(param,success,fail){ //模糊搜索
    apiGet(config.SEARCH_ARTICLE, param, success, fail);
  },
  searchOneArticle(param,success,fail){ //搜索单个
    apiGet(config.SEARCH_ONE_ARTICLE, param, success, fail);
  },
  createDraft(param, success, fail){ //创建草稿
    apiPost(config.CREATE_DRAFT, param, success, fail);
  },
  listDraft(param, success, fail){ //草稿列表
    apiGet(config.LIST_DRAFT, param, success, fail);
  },
  detailDraft(param,success, fail){ //查询文章具体
    apiGet(config.DETAIL_DRAFT, param, success, fail)
  },
  deleteDraft(param,success,fail){ //删除文章
    apiPost(config.DELETE_DRAFT, param, success, fail);
  },
  searchDraft(param,success,fail){ //模糊搜索
    apiGet(config.SEARCH_DRAFT, param, success, fail);
  },
  searchOneDraft(param,success,fail){ //搜索单个
    apiGet(config.SEARCH_ONE_DRAFT, param, success, fail);
  },
  upload(param, success, fail) { //上传接口
    apiPost(config.UPLOAD, param, success, fail);
  }
}
