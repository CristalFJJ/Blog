export const SERVICE = 'http://192.168.0.23:3000';// 公司测试接口
// export const SERVICE = 'http://192.168.3.28:3000';// 测试接口

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
export const USER_FIND = API_FULL + '/userFind'; // 查找用户
export const USER_UPDATE_PASSWORD = API_FULL + '/userUpDatePassWord'; //更新密码
export const USER_UPDATE = API_FULL + '/userUpDate'; //更新资料

/* 文章管理接口*/
export const CREATE_ARTICLE = API_FULL + '/createArticle'; //创建文章
export const UPDATE_ARTICLE = API_FULL + '/updateArticle'; // 更新文章
export const LIST_ARTICLE =  API_FULL + '/listArticle'; // 查询文章列表
export const DETAIL_ARTICLE = API_FULL + '/detailArticle'; // 查询文章具体信息
export const DELETE_ARTICLE = API_FULL + '/deleteArticle'; // 删除文章
export const SEARCH_ARTICLE = API_FULL + '/searchArticle'; // 搜索文章
export const SEARCH_ONE_ARTICLE = API_FULL + '/searchOneArticle'; // 搜索单个文章
export const ADD_COMMENT = API_FULL + '/addComment'; // 添加评论
export const ADD_REPLY = API_FULL + '/addReply'; // 添加回复
export const DELETE_REPLY = API_FULL +'/deleteReply'; // 删除留言
export const STATISTICAL_LABEL = API_FULL +'/statisticalLabel'; // 统计标签

/*草稿*/
export const CREATE_DRAFT = API_FULL + '/createDraft'; //创建草稿
export const LIST_DRAFT =  API_FULL + '/listDraft'; // 查询文章列表
export const DETAIL_DRAFT = API_FULL + '/detailDraft'; // 查询文章具体信息
export const DELETE_DRAFT = API_FULL + '/deleteDraft'; // 删除文章
export const SEARCH_DRAFT = API_FULL + '/searchDraft'; // 搜索文章
export const SEARCH_ONE_DRAFT = API_FULL + '/searchOneDraft'; // 搜索单个文章

/*留言 */
export const CREATE_MESSAGE = API_FULL + '/createMessage'; // 新增留言
export const LIST_MESSAGE = API_FULL + '/listMessage'; // 查询留言
export const DELETE_MESSAGE = API_FULL + '/deleteMessage'; //删除留言
export const MESSAGE_REPLY = API_FULL + '/messageReply'; //留言回复

/* 音乐 */
export const SEARCH_MUSIC = API_FULL + '/searchMusic'; //搜索音乐