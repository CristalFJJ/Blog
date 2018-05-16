<template>
  <div>
    <div class="bg-color-white">
      <div class="post-article main-content">
        <div class="post-article-header">
          <h1>{{article.title}}</h1>
          <div class="post-article-classification">
            Published on {{publishTime}} in <a href="javascript:void(0)">{{article.classification}}</a>
            with <a href="javascript:void(0)" @click="scrollMessage">{{article.message.length}} message </a>
          </div>
        </div>
        <div class="post-article-content">
          <p class="post-article-tag">
            <a href="javascript:void(0)" v-for="(item,index) in labelArr" :key="index"># {{item}}</a>
          </p>
          <div class="post-article-main" v-html="article.content"></div>
          <div class="post-article-info">
            <p>本站文章除注明转载/出处外，均为本站原创，转载前请务必署名</p>
            <br>
            <p>最后编辑时间为: {{article.upDatedTime?article.upDatedTime:article.createdTime}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="post-article-comment main-content">
      <comment from="./postArticle" @addComment="addComment"></comment>
      <comment-list class="post-article-comment-list" from="./postArticle" :dataArr="dataArr" @reply="reply" @replyDelete="replyDelete"></comment-list>
      <pagination :total="article.message.length" v-if="article.message.length>rows" :rows="rows" :current-page='page' @pagechange="pagechange"></pagination>
    </div>
    <div class="directory-contain">
      <transition name="appear">
        <div id="directory" v-show="directoryShow">
          <ul>
            <li v-for="(item,index) in directory" :key="index">
              <a href="javascript:void(0)" @click="scrollTitle(index)">{{index+1}} {{item}}</a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    
  </div>
</template>

<script>
import pagination from '../common/pagination'; 
import comment from '../common/comment';
import commentList from '../common/commentList';
import portrait from '../../../static/image/me.png';
export default {
  components: {
    comment,
    commentList,
    pagination
  },
  data () {
    return {
      page: 1, // 留言区页数
      rows: 6, // 一页显示多少条留言
      directory: [], //目录
      directoryShow: false, //目录显示
      dataArr:[],
      article:{
        title: '',
        createdTime: '',
        upDatedTime: '',
        classification: '',
        label: '',
        message: [],
        content:''
      }
    }
  },
  computed: {
    publishTime(){
      return this.article.createdTime.substring(0,10);
    },
    labelArr(){
      let arr = this.article.label.split(',');
      return arr;
    },
  },
  mounted(){
    this.init();
  },
  destroyed(){
    window.onscroll = '';
  },
  methods:{
    async init(){
      window.scrollTo(0,0);
      let _id = this.$utils.SessionLocal.getItem('articleId');

      await this.searchDetail({_id:_id});

      if(this.article.message.length > this.rows){
        this.dataArr = this.article.message.slice(0,this.rows);
      }else{
        this.dataArr = this.article.message;
      }

      this.directoryControl();
    },
    directoryControl(){ //目录显示
      window.onscroll = (e)=>{
        let scrollTop = document.documentElement.scrollTop;
        if(scrollTop > 70){
          this.directoryShow = true;
        }else{
          this.directoryShow = false;
        }
      }
    },  
    searchDetail(val){ //获取文章信息
      return new Promise((resolve,reject)=>{
        this.$api.detailArticle(val,res=>{
          this.article = res.data;
          this.$nextTick().then(()=>{
            let h3Arr = Array.from(document.getElementsByTagName('h3')); //获取目录
            h3Arr.forEach(item => {
              this.directory.push(item.innerText.slice(2,item.innerText.length));
            })
            resolve();
          })
        },err=>{
          console.log(err);
          reject();
        })
      })
    },
    scrollMessage(){
      let target = document.querySelector('.post-article-comment');
      let scrollTop = target.offsetTop;
      window.scrollTo(0,scrollTop);
    },
    upDatecomment(val,type){ // 更新评论
      this.$api.detailArticle(val,res=>{
        this.article.message = res.data.message;
        if(type == 'updateComment'){
          this.page = 1;
          this.dataArr = this.article.message.slice(0,this.rows);
          this.$nextTick().then(()=>{
            let dom = document.querySelector('.post-article-comment-list');
            let scrollTop = dom.offsetTop + dom.offsetParent.offsetTop - 40;
            window.scrollTo(0,scrollTop);
            this.$msg('留言成功',1.5,'success');
          })
        }else{
          this.dataArr = this.article.message.slice((this.page - 1) * this.rows ,this.page * this.rows);
          if(type == 'updateReply'){
            this.$msg('回复成功',1.5,'success');
          }else{
            this.$msg('删除留言成功',1.5,'success');
          }
        }
        
      },err=>{
        console.log(err);
      })
    },
    pagechange(page){ //页数变化
      this.page = page;
      if(this.article.message.length > this.page * this.rows){
        this.dataArr = this.article.message.slice((this.page - 1) * this.rows ,this.page * this.rows);
      }else{
        this.dataArr = this.article.message.slice((this.page - 1) * this.rows ,this.article.message.length);
      }
    },
    scrollTitle(index){ // 目录
      let target = Array.from(document.getElementsByTagName('h3'))[index]; 
      let scrollTop = target.offsetTop - 75;
      window.scrollTo(0,scrollTop);
    },
    addComment(){ //评论添加
      let _id = this.$utils.SessionLocal.getItem('articleId');
      this.upDatecomment({_id:_id},'updateComment');
    },
    reply(val){ //评论回复
      let param = {
        articleId: this.$utils.SessionLocal.getItem('articleId'),
        commentIndex : val.index + (this.page - 1) * this.rows,
        data: val.data
      }
      this.$api.addReply(param,(res)=>{
        if(res.code == 200){
          this.upDatecomment({_id:param.articleId},'updateReply');
        }
      },(err)=>{

      })
    },
    replyDelete(val){ //删除评论
      let param = {
        articleId: this.$utils.SessionLocal.getItem('articleId'),
        commentIndex : val.index + (this.page - 1) * this.rows,
        createdTime: val.createdTime
      }
      this.$api.deleteReply(param,(res)=>{
        if(res.code == 200){
          this.upDatecomment({_id:param.articleId},'deleteReply');
        }
      },(err)=>{

      })
      console.log(param.createdTime,param.commentIndex);
    }
    
  }
}
</script>

<style lang="scss">
  .post-article{
    max-width: 700px;
    padding: 100px 25px 20px;
    .post-article-header{
      color: #5f5f5f;
      .post-article-classification{
        margin-top: 5px;
        a{
          color: #5f5f5f;
          font-weight: 600;
        }
      }
    }
    .post-article-content{
      .post-article-tag{
        padding: 5px 0 15px;
        border-bottom: 1px solid #e0e0e0;
        a{
          color: #fff;
          border-radius: 15px;
          background: #6fa3ef;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin: 4px 8px 0 0;
          padding: 0 15px;
          transition-duration: .6s;
          letter-spacing: 0;
        } 
        & a:nth-child(1n)  {
          border: 1px solid #6fa3ef;
          background: #6fa3ef;
        }
        & a:nth-child(2n)  {
          border: 1px solid #ff9800;
          background: #ff9800;
        }
        & a:nth-child(3n)  {
          border: 1px solid #46c47c;
          background: #46c47c;
        }
        & a:nth-child(4n)  {
          border: 1px solid #bc99c4;
          background: #bc99c4;
        }  
        & a:nth-child(5n)  {
          border: 1px solid #f9bb3c;
          background: #f9bb3c;
        }  
        & a:hover{
          color: #5f5f5f;
          border: 1px solid #f7f7f7;
          outline-style: none;
          background: #f7f7f7;
        }
      }
      .post-article-main{
        font-size: 14px;
        blockquote, dl, ol,pre, table, ul,h3,p{
          margin: 20px 0;
          overflow-x: auto;
        }
      }
      .post-article-info{
        font-size: 14px;
        overflow: hidden;
        margin: 25px 0px 0;
        padding: 25px 0px 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-top: 1px solid #e0e0e0;
      }
    }   
  }
  .post-article-comment{
    max-width: 700px;
    padding: 0 25px 20px;
  }
  .directory-contain{
    position: relative;
    z-index: 0;
    max-width: 720px;
    margin: 0 auto;
    transition: opacity 1s ease-in-out;
    text-align: right;
  }
  #directory{
    position: fixed;
    z-index: 0;
    top: 100px;
    display: inline-block;
    text-align: left;
    ul{
      position: relative;
      border-left: 1px solid #ddd;
      li{
        font-size: 14px; 
        line-height: 1.8;
        color: #313131;
        margin-left: 5px;
        a{
          color: #313131;
          &:hover{
            color: #eb5055;
          }
        }
        &::before{
          position: relative;
          top: 0;
          left: -9px;
          display: inline-block;
          width: 8px;
          height: 8px;
          content: '';
          border-radius: 50%;
          background-color: #eb5055;
        }
      }
    }
  }
</style>
