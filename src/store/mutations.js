export const Common = {
  selected_fn(state,val){
    state.selected = val;
  },
  play_music_fn(state,val){
    state.playMusic = val;
  },
  music_show_fn(state,val){
    state.musicShow = val;
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