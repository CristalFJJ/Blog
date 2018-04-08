<template>
    <div class="demo">
      <div class="demo-img"><img :src="imgSrc" alt=""></div>
      <div class="demo-button"></div>
    </div>
</template>

<script>
import imgSrc from '../../../static/image/balloon.jpg';
export default {
  data () {
    return {
      imgSrc: imgSrc
    }
  }
}
</script>

<style lang="scss">
  .demo{
    position: relative;
    width: 800px;
    .demo-img{
      img{
        border-radius: 50%;
        width: 100%;
      }
    }
    .demo-button{
      width: 50px;
      height: 50px;
      background: red;
      position: absolute;
      left: 500px;
      top: 350px;
    }
  }
</style>
