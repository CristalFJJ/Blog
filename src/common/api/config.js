// export const SERVICE = 'https://easy-mock.com/mock/5aa5140a22dafa042a4c7289/blog';// 测试接口
// export const SERVICE = 'http://192.168.0.23:3000';// 公司测试接口
export const SERVICE = 'http://192.168.3.28:3000';// 测试接口

export const API_PATH = '/blog/api';
export const API_FULL = SERVICE + API_PATH;
/**
 * user: 13533795966
 * passWord: 123456
 */
/* 登录接口 */
export const REGISTER_PREVIEW = API_FULL + '/registerPreview'; // 验证用户名是否可用
export const USER_REGISTER = API_FULL + '/userRegister'; // 用户注册
export const LOGIN_IN = API_FULL + '/loginIn'; // 登录
export const LOGIN_OUT = API_FULL + '/loginOut'; // 登出

/* 文章管理接口*/
export const CREATE_ARTICLE = API_FULL + '/createArticle'; //创建文章
export const UPDATE_ARTICLE = API_FULL + '/updateArticle'; // 更新文章
export const LIST_ARTICLE =  API_FULL + '/listArticle'; // 查询文章列表
export const DETAIL_ARTICLE = API_FULL + '/detailArticle'; // 查询文章具体信息
export const DELETE_ARTICLE = API_FULL + '/deleteArticle'; // 删除文章
export const SEARCH_ARTICLE = API_FULL + '/searchArticle'; // 搜索文章
export const SEARCH_ONE_ARTICLE = API_FULL + '/searchOneArticle'; // 搜索单个文章
/* 上传接口 */
export const UPLOAD = API_FULL + '/upload'; // 上传