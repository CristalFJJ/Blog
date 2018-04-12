<template>
  <div id="app">
    <!-- <canvas id="canvas"></canvas> -->
    <router-view></router-view>
  </div>
</template>

<script>
import dotLine from './common/js/dot';
export default {
  name: 'app',
  mounted () {
    
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
      z-index: -1;
      background:transparent;
    }
  }
</style>
