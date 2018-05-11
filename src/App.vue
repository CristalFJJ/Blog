<template>
  <div id="app">
    <!-- <canvas id="canvas"></canvas> -->
    <router-view></router-view>
    <Back-top :height="100" :bottom="100">
      <div class="top">TOP</div>
    </Back-top>
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
  }
</style>
