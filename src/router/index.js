import Vue from 'vue';
import VueRouter from 'vue-router';
// import * as routesEnum from 'assets/js/enum/routeEnum';
const Main = resolve => require(['@/components/main'], resolve);
const Hobby = resolve => require(['@/components/hobby'], resolve);
const Note = resolve => require(['@/components/note'], resolve);
const Study = resolve => require(['@/components/study'], resolve);
const Technology = resolve => require(['@/components/technology'], resolve);
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
        if (val === null) delete router.redirect
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
const main = getModel('/', Main, 'main');

//hobby
const hobby = getModel('/hobby', Hobby, 'hobby');

//note
const note = getModel('/note', Note, 'note');

//study
const study = getModel('/study', Study, 'study');

//technology
const technology = getModel('/technology', Technology, 'technology');

//login
const login = getModel('/login', Login, 'login');

//management
const management = getModel('/management', Management, 'management',null,'/management/overview');
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
  hobby,
  note,
  study,
  technology,
  management,
  login
]
//里面的属性是routes
const router = new VueRouter({routes});

export default router;



