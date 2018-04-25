// export const SERVICE = 'https://easy-mock.com/mock/5aa5140a22dafa042a4c7289/blog';// 测试接口
export const SERVICE = 'http://192.168.0.23:3000';// 公司测试接口
export const API_PATH = '/blog/api';
export const API_FULL = SERVICE + API_PATH;
/**
 * user: 13533795966
 * passWord: 123456
 */
/* 登录接口 */
export const LOGIN = API_FULL + '/loginIn'; // 登录
export const REGISTER_PREVIEW = API_FULL + '/registerPreview'; // 验证用户名是否可用
export const USER_REGISTER = API_FULL + '/userRegister'; // 用户注册

/* 上传接口 */
export const UPLOAD = API_FULL + '/upload'; // 上传