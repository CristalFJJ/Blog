<template>
  <ul class="comment-component">
    <li>
      <div class="comment-component-header flex-start">
        <div class="comment-component-header-portrait"><img :src="data.portrait" alt=""></div>
        <a class="comment-component-header-userName" :href="data.site?data.site:'javaScript:void(0)'">{{data.userName}}</a>
      </div>
      <p class="comment-component-message">{{data.msg}}</p>
      <div class="comment-component-meta space-between" :class="borderBottom">
        <p class="comment-component-time">{{data.createdTime}}</p>
        <p class="comment-component-reply">回复</p>
      </div>
      <span @click="nodeClick(data.title)">{{data.title}}</span>
      <comment-component class="component-style" v-for="(item , index) in data.children" :data="item" :key="index" @nodeClick="outClick"></comment-component>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'commentComponent',
    props: {
      data: {
        type: Object,
        default (){
          return {
            
          }
        }
      }
    },
    computed:{
      borderBottom(){
        let classStr = '';
        if(this.data.children && this.data.children.length == 0){
          classStr = 'comment-component-meta-border-bottom-none';
        } 
        return classStr;
      }
    },
    methods: {
      nodeClick(title){
        this.$emit('nodeClick',title);
      },
      outClick(title){
        this.$emit('nodeClick',title);
      }
    }
  }
</script>
<style lang="scss">
  .comment-component{
    width: 100%;
    padding: 20px 20px;
    .comment-component-header{
      .comment-component-header-portrait{
        width: 40px;
        height: 40px;
        border: 1px solid #eaeaea;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .comment-component-header-userName{
        line-height: 45px;
        margin-left: 20px;
        font-size: 13px;
        color: #5f5f5f;
      }
    }
    .comment-component-message{
      margin-top: 10px;
      color: #313131;
      font-size: 14px;
      line-height: 1.8;
      
    }
    
    .comment-component-meta{
      margin-top: 10px;
      font-size: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(184,197,214,.2);
      .comment-component-time{
        color: #5f5f5f;
      }
      .comment-component-reply{
        color: #eb5055;
        cursor: pointer;
        &:hover{
          color: #fc8d92;
        }
      }
    }
    .comment-component-meta-border-bottom-none{
      border-bottom: none;
    }
  }
  .component-style{
    width: calc(100% + 40px);
    padding: 0px 20px;
    margin-top: 10px;
    margin-left: -20px; 
  }
  .component-style:nth-last-child(1){
    .comment-component-meta{
      border-bottom: none;
      padding-bottom: 0px;
    }
  }
  
</style>