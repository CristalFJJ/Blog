import axios from 'axios';
import {SERVICE} from './config';

axios.defaults.baseURL = SERVICE; // 设置默认服务地址
axios.defaults.timeout = 0; // 设置超时时间

// http请求拦截器 var loadinginstace;
axios
    .interceptors
    .request
    .use(config => {
        // }
        // let token = Account.getToken();
        // if (!CommonUtils.isEmptyOrNull(token)) { // 判断是否存在token，如果存在的话，则每个http header都加上toke
        //     if (!CommonUtils.isEmptyOrNull(token)) {
        //         config.headers.Authorization = `${token}`;
        //     }
        // }
        return config;
    }, error => {
      return Promise.reject(error);
  });

  var is401 = false;

// http响应拦截器
axios
    .interceptors
    .response
    .use(res => {
        // is401 = false;
        // if (CommonUtils.isEmptyOrNull(res)){
        //     let err = new Error('出错了...')
        //     return Promise.reject(err);
        // }
        // if (!CommonUtils.isEmptyOrNull(res.status)){
        //     if (res.status !== 200) {
        //         return Promise.reject(res);
        //     };
        // }
        return res;
    }, error => {
        // if (error && error.response) {
        //     if (error.response.data.code === 401) {
        //         //多个接口401时只执行一次提示和跳转
        //         if(!is401){
        //             is401 = true;
        //             alert('身份验证已失效，请重新登录再操作');
        //             CommonUtils.getDefaultPath();
        //         }
        //     }
        //     return Promise.reject(error);
        // }
        // else{
        //     return Promise.reject({
        //         response: {
        //             data: {
        //                 msg: '请求有误，请稍后再试'
        //             }
        //         }
        //     });
        // }
    });

export default axios;