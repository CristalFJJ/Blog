import CollapseTransition from './ElCollapseTransition';
const components = [
  CollapseTransition,
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
}
export default moduleComponents;