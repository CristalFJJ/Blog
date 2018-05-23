import Vue from 'vue';
import VueRouter from 'vue-router';
import {Account as UserAccount} from 'assets/js/blogUtils';
// import * as routesEnum from 'assets/js/enum/routeEnum';
const Main = resolve => require(['@/components/main'], resolve);
const Share = resolve => require(['@/components/share'], resolve);
const Archives = resolve => require(['@/components/archives'], resolve);
const SearchArticle = resolve => require(['@/components/searchArticle'], resolve);
const About = resolve => require(['@/components/about'], resolve);
const Home = resolve => require(['@/components/home'], resolve);
const PostArticle = resolve => require(['@/components/postArticle'], resolve);
const Search = resolve => require(['@/components/search'], resolve);
const Setting = resolve => require(['@/components/setting'], resolve);

const Login = resolve => require(['@/components/login'], resolve);

const Management = resolve => require(['@/components/management'], resolve);
const Overview = resolve => require(['@/components/management/control/overview'], resolve);
const Article = resolve => require(['@/components/management/manage/article'], resolve);
const Classification = resolve => require(['@/components/management/manage/classification'], resolve);
const Draft = resolve => require(['@/components/management/manage/draft'], resolve);
const Label = resolve => require(['@/components/management/manage/label'], resolve);
const PersonalSetting = resolve => require(['@/components/management/setting/personalSetting'], resolve);
const WriteArticle = resolve => require(['@/components/management/write/writeArticle'], resolve);

Vue.use(VueRouter);

// 获取路由实体
function getModel(path, component, name = undefined, meta = null, redirect = undefined) {
  const router = {
    path: path,
    component: component,
    name: name,
    meta: meta,
    redirect: redirect
  }
  for (const [key, val] of Object.entries(router)) {
    switch (key) {
      case 'name':
        if (val === undefined) delete router.name
        break
      case 'meta':
        if (val === null) delete router.meta
        break
      case 'path':
        if (path === undefined || path === '' || path === null) throw new Error('路径错误！')
        break
      case 'component':
        if (path === undefined || path === '' || path === null) throw new Error('组件错误！')
        break
      case 'redirect':
        if (val === undefined) delete router.redirect
        break
    }
  }
  return router
}

/**
 * example
  const example = getModel('/example', EXAMPLE, 'example', {
    title: 'Example',
    icon: 'example'
  }, '/example/ui')
  const ui = getModel('ui', UI, 'UI', {
    title: 'UI',
    icon: 'table'
  })
  example.children = [ui]
 */
// main
const main = getModel('/', Main, 'main',null,'/home');

//share
const share = getModel('/share', Share, 'share');

//archives
const archives = getModel('/archives', Archives, 'archives');

//searchArticle
const searchArticle = getModel('/searchArticle', SearchArticle, 'searchArticle');

//home
const home = getModel('/home', Home, 'home');

//postArticle
const postArticle = getModel('/postArticle', PostArticle, 'postArticle');

//about
const about = getModel('/about', About, 'about');

//setting
const setting = getModel('/setting', Setting, 'setting');

//search
const search = getModel('/search', Search, 'search');

main.children = [home,archives,share,about,postArticle,setting,search,searchArticle];

//login
const login = getModel('/login', Login, 'login');


//management
const management = getModel('/management', Management, 'management',{requiresAuth:true},'/management/overview');
const overview = getModel('/management/overview', Overview, 'overview',{menuName:'1-1',openName:["1"]});
const article = getModel('/management/article', Article, 'article',{menuName:'3-1',openName:["3"]});
const classification = getModel('/management/classification', Classification, 'classification',{menuName:'3-2',openName:["3"]});
const draft = getModel('/management/draft', Draft, 'draft',{menuName:'3-4',openName:["3"]});
const label = getModel('/management/label', Label, 'label',{menuName:'3-3',openName:["3"]});
const personalSetting = getModel('/management/personalSetting', PersonalSetting, 'personalSetting',{menuName:'4-1',openName:["4"]});
const writeArticle = getModel('/management/writeArticle', WriteArticle, 'writeArticle',{menuName:'2-1',openName:["2"]});

management.children = [overview,article,classification,draft,label,personalSetting,writeArticle];

const routes = [
  main,
  management,
  login
]
//里面的属性是routes
const router = new VueRouter({routes});

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  //断网提示
  if(!navigator.onLine){
      bus.$msg('网络异常，请检查网络并刷新页面');
      return;
  }
  loadingStart(to.name); // 加载loading条
  
  if (to.matched.some(res => res.meta.requiresAuth)) {
      if (!UserAccount.getToken()) { // 判断是否登录
        toLogin(next);
      }else{
        next();
      }
  } else {
    next();
  }

  function toLogin(next) {
      alert('身份验证已失效，请重新登录');
      next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
      });
  }
});

// 路由文件渲染完成
router.beforeResolve((to, from, next) => {
  loadingEnd(); // 关闭loading条
  next();
});

function loadingStart(hash) {
  var id = document.getElementById('loadingBar');
  if (id) {
      id.style.width = '0';
      id.style.backgroundColor = hash === 'login' ? '#eb5055' : '#5f5f5f'; // 登录页蓝色，其他页白色
      setTimeout(() => {
          id.style.opacity = 1;
          id.style.transition = 'width 1s';
          id.style.width = '61.8%'; // 
      }, 0);
  } else {
      var bar = document.createElement('div');
      bar.id = 'loadingBar';
      bar.style.position = 'fixed';
      bar.style.top = '0';
      bar.style.width = '0';
      bar.style.height = '2px';
      bar.style.backgroundColor = hash === 'login' ? '#eb5055' : '#5f5f5f'; // 登录页蓝色，其他页白色
      bar.style.transition = 'width 1s';
      document.body.appendChild(bar);
      setTimeout(() => {
          bar.style.width = '61.8%'; //
      }, 0);
  }
}

function loadingEnd() {
  setTimeout(() => {
      var id = document.getElementById('loadingBar');
      if (id) {
          id.style.transition = 'width .5s';
          id.style.width = '100%';
          setTimeout(() => {
              id.style.opacity = 0;
              id.style.width = '0';
          }, 500);
      }
  }, 1000);
}
export default router;



