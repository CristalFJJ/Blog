<template>
  <div class="main-content archive-page">
    <ul>
      <li v-for="(item,index) in dateArr" :key="index">
        <p class="post-list-date"><span>#</span> {{item.date}}</p>
        <div class="clear-float">
          <div class="fl post-list-item" v-for="(itemChild,indexChild) in item.articleArr" :key="indexChild">
            <div class="post-list-item-container">
              <p class="beyond-ellipsis post-list-item-container-title" @click="viewArticle(itemChild)">{{itemChild.title}}</p>
              <p class="post-list-item-container-createdTime">{{itemChild.createdTime.slice(0,10)}}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data(){
    return{
      dateArr: []
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    ...mapMutations(['selected_fn']),
    init(){
      this.search();
    },
    search(){
      return new Promise((resolve,reject)=>{
        this.$api.listArticle({},res=>{
          this.dateArr= [];
          res.data.forEach((item,index)=>{
            this.judgeDate(this.dateArr,item)
          });
          resolve();
        },err=>{
          console.log(err); 
          reject(err);
        })
      })
    },
    // 判断是否已经有日期，有就直接在子集加入，没有就在父级加入
    judgeDate(arr, data) {
      let index = arr.findIndex(item => item.date == data.createdTime.slice(0,7));
      if (index > -1) {
        arr[index].articleArr.push(data);
      } else {
        arr.push({
          date: data.createdTime.slice(0,7),
          articleArr: [data]
        });
      }
    },
    viewArticle(val){
      this.$utils.SessionLocal.setItem('articleId',val._id);
      this.selected_fn(-1);
      this.$router.push({path:'/postArticle',name:'postArticle'});
    }
  },
}
</script>

<style lang="scss">
  .archive-page {
    padding: 100px 20px 40px;
    .post-list-date{
      margin: 10px 0;
      font-size: 16px;
      color: #5f5f5f;
      padding: 0 30px; 
      span{
        font-size: 14px;
        color: #eb5055;
      }
    }
    .post-list-item{
      width: 33.3333%;
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
        }
        .post-list-item-container-createdTime{
          color: #5f5f5f;
          font-size: 12px;
          margin-top: 15px;
        }
      }
    }
  }
  @media only screen and (max-width: 880px) {
    .archive-page{
      padding: 80px 0 20px;
      .post-list-item{
        width: 50%;
        padding: 10px;
        &:nth-child(odd){
          padding-left: 20px;
        }
        &:nth-child(even){
          padding-right: 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 580px) {
    .archive-page{
      padding: 70px 0 20px;
      .post-list-item{
        width: 100%;
        padding: 10px 20px;
      }
    }
  }
</style>
