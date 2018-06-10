<template>
  <div class="slide">
    <div class="sliding">
      <div class="portrait"><img :src="portrait" alt=""></div>
      <ul class="introduction">
        <li>前端工程师: Cristal</li>
        <li>努力成为你想成为的人!</li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import img from "../../../static/image/me.png";
export default {
  mounted () {
    this.init();
  },
  beforeDestroy () {
    this.$utils.CommonUtils.resetResize();
  },
  data () {
    return {
      portrait: img,  
    }
  },
  methods: {
    init() {
      this.creatSlide();
    },
    // 获取滑行宽度 控制@keyframes
    creatSlide() {
      var creatingSlide = function(){
        var docWidth = document.body.clientWidth;
        var rule = `@keyframes sliding{0% { transform: translateX(${docWidth}px)}100% { transform: translateX(-400px)}}`;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '';
        var styleSheet = document.styleSheets;
        document.head.appendChild(style);
        styleSheet = document.styleSheets[document.styleSheets.length-1];
        try {
          styleSheet.insertRule( rule ,styleSheet.rules.length);
        } 
        catch (e) {
        };
      }
      creatingSlide();
      window.onresize = () =>  {
        document.head.removeChild(document.head.childNodes[document.head.childNodes.length - 1]);
        creatingSlide();
      }
    }
  }
};
</script>

<style lang="scss">
.slide {
  width: 100%;
  .sliding{
    padding: 5px 5px 0px;
    border-right: 5px solid transparent;
    border-radius: 64px;
    overflow: hidden;
    width: 400px;
    background-color: rgba(0,0,0,0.6);
    border: 1px solid #ddd;
    box-shadow: 2px 30px 60px 0px #f9f9f9;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    animation-name: sliding;
    animation-duration: 30s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    animation-direction: normal;
    animation-iteration-count: infinite;
    .portrait{
      width: 64px;
      img{
        width: 64px;
        border-radius: 50%;
        height: 64px;
        border: 5px solid #f6f5f5;
      }
    }
    .introduction{
      font-size: 14px;
      margin-left: 32px;
      li:nth-child(1){
        color: #7fcaad;
        font-weight: 700;
        margin-bottom: 10px;
      }
      li:nth-child(2){
        color: #FFF;
      }
    }
  }
}
</style>
