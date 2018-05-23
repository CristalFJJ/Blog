import {CollapseTransition} from './ElCollapseTransition';
import Loading from './loading';
const components = [
  CollapseTransition,
  Loading
];
const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  // Vue.prototype.$message = Message;
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
const moduleComponents = {
  install,
  CollapseTransition,
  Loading
}
export default moduleComponents;