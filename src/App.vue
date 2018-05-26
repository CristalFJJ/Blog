<template>
  <div id="app">
    <router-view></router-view>
    <Back-top :height="100" :bottom="100">
      <div class="top">TOP</div>
    </Back-top>
    <transition name="music">
      <songList v-show="musicShow" class="app-song-list"></songList>
    </transition>
  </div>
</template>

<script>
import dotLine from './common/js/components/dot';
import songList from './components/common/songList';
import { mapState} from "vuex";
export default {
  name: 'app',
  components: {
    songList
  },
  computed: {
    ...mapState({
      musicShow: state => state.Common.musicShow, // 是否显示
    })
  },
  mounted () {
    // dotLine('canvas');
  }
}
</script>

<style lang="scss">
  #app{
    height: 100%;
    #canvas{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 40;
      background:transparent;
    }
    .top{
      width: 57px;
      height: 57px;
      text-align: center;
      line-height: 57px;
      background: #FFF;
      color: #333;
      border: 2px solid #333;
      font-weight: 700;
    }
    @media only screen and (max-width: 880px) {
      .top{
        width: 45px;
        height: 45px;
        line-height: 45px;
      }
    }
    @media only screen and (max-width: 580px) {
      .top{
        width: 35px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #333;
        font-weight: 600;
        font-size: 12px;
      }
    }
  }
</style>
