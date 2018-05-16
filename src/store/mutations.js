export const Common = {
  selected_fn(state,val){
    state.selected = val;
  }
};
export const Management = {
  menu_active_name_fn(state,val){
    state.menuActiveName = val;
  },
  open_name_fn(state,val){
    state.openName = val
  }
}