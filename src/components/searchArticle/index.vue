<template>
  <div class="main-content search-list-page">
    <p class="search-list-page-title"><span>#</span> {{way}}：{{content}}</p>
    <p class="search-list-page-none" v-if="dataArr.length == 0">没有找到内容,请换别的关键字进行检索。</p>
    <ul v-else class="clear-float">
      <li v-for="(item,index) in dataArr" :key="index" class="post-list-item fl">
        <div class="post-list-item-container">
          <p class="beyond-ellipsis post-list-item-container-title" @click="viewArticle(item)">{{item.title}}</p>
          <div class="space-between">
            <p class="post-list-item-container-createdTime">{{item.createdTime.slice(0,10)}}</p>
            <div class="post-list-item-container-icon"><Icon :type="getIcon(item.classification)" :style="{color:getColor(item.classification)}"></Icon></div>
          </div>
        </div>
      </li>
    </ul>
    <Loading :spinShow="spinShow"></Loading>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data(){
    return{
      dataArr: [],
      way: '',
      content: '',
      spinShow: false,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    ...mapMutations(['selected_fn']),
    init(){
      let obj = this.$route.query;
      this.way = obj.way;
      this.content = obj.content;
      this.spinShow = true;
      console.log(obj)
      this.$api.searchArticle(obj,res=>{
        this.dataArr = res.data;
        setTimeout(()=>{
          this.spinShow = false;
        },500)
      },err=>{
        console.log(err);
      })
    },
    viewArticle(val){
      this.$utils.SessionLocal.setItem('articleId',val._id);
      this.selected_fn(-1);
      this.$router.push({path:'/postArticle',name:'postArticle'});
    },
    getIcon(type){
      switch(type){
        case　'technology':
          return 'wrench';
        break;
        case　'study':
          return 'university';
        break;
        case　'hobby':
          return 'ios-game-controller-b';
        break;
        case　'note':
          return 'ios-paper';
        break;
      }
    },
    getColor(type){
      switch(type){
        case　'technology':
          return '#70E1FF';
        break;
        case　'study':
          return '#1291A9';
        break;
        case　'hobby':
          return '#FE4365';
        break;
        case　'note':
          return '#712704';
        break;
      }
    },
  }
}
</script>

<style lang="scss">
  .search-list-page{
    padding: 100px 20px 40px;
    max-width: 940px;
    min-height: calc(100vh - 204px);
    .search-list-page-title{
      margin: 10px 0;
      font-size: 16px;
      color: #5f5f5f;
      span{
        font-size: 14px;
        color: #eb5055;
      }
    }
    .search-list-page-none{
      width: 50%;
      font-size: 16px;
      margin: 20px 0;
      transition-duration: .3s;
      &:hover{
        transform: scale(1.03);
      }
    }
    .post-list-item{
      width: 50%;
      height: auto;
      padding: 15px;
      align-items: center;
      transition-duration: .3s;
      &:hover{
        transform: scale(1.03);
      }
      .post-list-item-container{
        padding: 25px 20px;
        border: 1px solid rgba(184,197,214,.2);
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,.04);
        .post-list-item-container-title{
          font-size: 14px;
          color: #313131;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .post-list-item-container-createdTime{
          color: #5f5f5f;
          font-size: 12px;
        }
        .post-list-item-container-icon{
          width: 30px;
          height: 30px;
          border: 1px solid #eaeaea;
          border-radius: 50%;
          font-size: 20px;
          text-align: center;
          line-height: 30px;
        }  
      }
    }
  }
</style>
