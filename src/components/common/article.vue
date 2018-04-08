<template>
  <div class="article">
    <ul>
      <li class="date">2018/01/17</li>
      <li class="title">JS正则表达式</li>
      <li class="classification">JAVASCRIPT, 正则表达式</li>
      <li class="image"><img :src="demoImg" alt=""></li>
      <li class="content">
        <p>正则表达式，英语：Regular Expression，在代码中常简写为regex、regexp或RE。是由一个字符序列形成的搜索模式，搜索模式可用于文本搜索和文本替换。</p>
      </li>
      <li class="footer">
        <p>CONTINUE READING →</p>
        <div class="record">
          <div><Icon type="eye"></Icon><p>100</p></div>
          <div><Icon type="ios-chatboxes"></Icon><p>1</p></div>
        </div>
      </li>   
    </ul>
  </div>
</template>

<script>
import img from '../../../static/image/regexp.jpg';
import {Icon} from 'iview';
export default {
  components: {
    Icon,
  },
  data () {
    return {
      demoImg: img
    }
  }
}
</script>

<style lang="scss" scoped>
.article{
  border: 1px solid #ddd;
  width: 66.66666667%;
  margin: 0 auto;
  .date{
    font-size: 16px;
    color: #bfbfbf;
    letter-spacing: 1px;
    text-align: center;
    padding: 40px 0 10px;
    width: 100%;
  }
  .title{
    line-height: 30px;
    text-transform: uppercase;
    color: #575756;
    font-size: 24px;
    letter-spacing: 2px;
    font-weight: 600;
    text-align: center;
    margin-top: 0;
  }
  .classification{
    font-weight: 400;
    color: #7fcaad;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-top: 10px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 44px;
  }
  .image{
    width: 100%;
    img{
      width: 100%;
    }
  }
  .content{
    margin: 50px auto;
    padding: 0 20px;
    font-size: 16px;
    p{
      letter-spacing: 0.6px;
      line-height: 30px;
      width: 100%;
      text-align: justify;
      text-justify: inter-word;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    >p{
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #7fcaad;
      margin-bottom: 25px;
      cursor: pointer;
      &:hover{
        font-weight: 800;
      }
    }
    .record{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      >div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    i{
      font-size: 18px; 
      padding-top: 3px;
      margin-left: 10px;
      margin-right: 3px;
    }
  }
}
</style>
