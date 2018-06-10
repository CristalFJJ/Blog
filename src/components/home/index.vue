<template>
  <div class="home-page main-content">
		<ul class="artilce-list clear-float">
			<li class="fl" v-for="(item,index) in articleArr" :key="index">
        <div class="artilce-list-contain"  @click="viewArticle(item._id)">
          <div class="cover-picture" :style="{backgroundImage:`url(${item.coverPicture})`}"></div>
          <div class="article-desc">
            <p>{{item.describe}}</p>
          </div>
          <div class="slant-dark"></div>
          <div class="slant"></div>
          <div class="article-label">
            <div class="article-title">{{item.title}}</div>
            <div class="article-classification">
              <span class="article-classification-title">{{item.classification}}</span> <div class="article-classification-icon"><Icon :type="getIcon(item.classification)" :style="{color:getColor(item.classification)}"></Icon></div>
            </div>
          </div>
        </div>
      </li>
		</ul>
    <pagination class="pagination" :total="total" :rows="queryData.rows" :current-page='queryData.page' @pagechange="pagechange"></pagination>
    <Loading :spinShow="spinShow"></Loading>
	</div>
</template>
<script>
import coverPicture from '../../../static/image/balloon.jpg';
import pagination from '../common/pagination';
import { mapMutations } from "vuex";
export default {
  components:{
    pagination
  },
  data(){
    return{
      total: 1,     // 记录总条数
      queryData:{
        rows: 12,   // 每页显示条数
        page: 1,   // 当前的页数
      },
      articleArr: [],
      spinShow: false,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    ...mapMutations(['selected_fn']),
    async init(){
      await this.getArticleList();
    },
    getArticleList(){
      return new Promise((resolve,reject)=>{
        this.spinShow = true;
        this.$api.listArticle(this.queryData,res=>{
          this.articleArr = res.data;
          this.total = res.total;
          setTimeout(()=>{
            this.spinShow = false;
          },500)
          resolve();
        },err=>{
          console.log(err);
          reject(err);
        })
      })
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
    viewArticle(_id){
      this.$utils.SessionLocal.setItem('articleId',_id);
      this.selected_fn(-1);
      this.$router.push({path:'/postArticle',name:'postArticle'});
    },
    pagechange(currentPage){
      this.queryData.page = currentPage;
      this.getArticleList();
    }
  }
}
</script>

<style lang="scss">
  .home-page{
    max-width: 940px;
    padding: 120px 20px 0;
  }
  @media only screen and (max-width: 880px) {
    .home-page{
      padding: 80px 0 0;
      .pagination{
        // margin: 25px 0 30px;
      }
      .artilce-list{
        li{
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
  }
  @media only screen and (max-width: 580px) {
    .home-page{
      padding: 70px 0 0;
      .artilce-list{
        li{
          width: 100%;
          padding: 10px 20px;
          &:first-child{
            padding-top: 20px;
          }
        }
      }
    }
  }
  .pagination{
    // margin: 30px 0 35px;
  }
  .artilce-list{
    li{
      width: 33.3333%;
      height: auto;
      padding: 15px;
      align-items: center;
    }
    .artilce-list-contain{
      position: relative;
      overflow: hidden;
      width: 100%;
      padding: 0;
      border-radius: 3px;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      &:hover{
        box-shadow: 2px 2px 4px rgba(0,0,0,.1);
      }
      &:hover .cover-picture{
        transform: scale(1.1);
        filter: blur(3px);
      }
      &:hover .article-desc{
        display: block;
        p{
          opacity: 1;
        }
      }
      .cover-picture{
        width: 100%;
        position: relative;
        min-height: 250px;
        transition: transform .5s ease,filter .5s ease;
        background-position: 50% 50%;
        background-size: cover;
      }
      .article-desc{
        cursor: pointer;
        position: absolute;
        top: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        padding: 40px 28px;
        display: none;
        background-color: rgba(0,0,0,0.5);
        p{
          animation: fade-in;
          animation-duration: .5s;
          font-size: 14px;
          word-break: break-all;
          opacity: 0;
          color: #fff;
          max-height: 150px;
          overflow: hidden;
          letter-spacing: 1px;
          &::after {
            content:"...";
          }
        }
        
      }
      .slant-dark{
        transform: rotate(-10deg) translate(10px,-10px);
        opacity: .7;
        position: absolute;
        z-index: 0;
        right: 0;
        bottom: 50px;
        left: 0;
        width: 110%;
        min-height: 100px;
        background-color: rgba(0,0,0,.5);
      }
      .slant{
        position: absolute;
        z-index: 0;
        right: 0;
        bottom: 50px;
        left: 0;
        width: 110%;
        min-height: 100px;
        transform: rotate(7deg) translate(-10px,0);
        background-color: #fff;
      }
      .article-label{
        position: relative;
        height: 130px;
        padding: 10px 20px 40px;
        background-color: #fff;
        .article-title{
          font-size: 17px;
          line-height: 17px;
          word-break: break-all;
          color: #313131;
          cursor: pointer;
        }
        .article-classification{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 100%;
          padding: 0 15px 15px;
          text-align: right;
          font-size: 14px;
          color: #5f5f5f;
          .article-classification-title{
            cursor: pointer;
          }
          .article-classification-icon{
            cursor: pointer;
            margin-left: 5px;
            width: 36px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            display: inline-block;
            font-size: 20px;
            border: 1px solid #eaeaea;
            border-radius: 50%;
          }
        }
      }
    }
    
  }

</style>
