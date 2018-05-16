<template>
  <div>
    <div class="bg-color-white">
      <div class="main-content about-page">
        <div class="about-page-header">
          <h1>About</h1>
          <p>Published on May 28, 2018</p>
        </div>
        <div class="about-page-content">
          <h3><span>#</span> Hello,World!</h3>
          <p class="about-page-content-about">我是 Cristal ...</p>
        </div>
      </div>
    </div>
    <div class="main-content about-page-comment">
      <comment from="./about" type="about" @addComment="addComment"></comment>
      <commentList class="about-page-comment-list" from="./postArticle" :dataArr="dataArr" @reply="reply" @replyDelete="replyDelete"></commentList>
      <pagination v-if="dataArr.length>0" class="pagination" :total="total" :rows="queryData.rows" :current-page='queryData.page' @pagechange="pagechange"></pagination>
    </div>
    
  </div>
  
</template>

<script>
import comment from '../common/comment';
import commentList from '../common/commentList';
import pagination from '../common/pagination';
export default {
  components:{
    comment,
    commentList,
    pagination
  },
  data () {
    return {
      dataArr:[],
      total: 1,
      queryData:{
        page: 1,
        rows: 6
      },
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    async init(){
      await this.getMessageList();
    },
    getMessageList(){
      return new Promise((resolve,reject)=>{
        this.$api.listMessage(this.queryData,res=>{
          if(res.code == 200){
            this.total = res.total;
            this.dataArr = res.data; 
            resolve();
          }
        },err=>{
          console.log(err);
          reject();
        })
      })
      
    },
    addComment(val){
      this.queryData.page = 1;
      this.getMessageList();
      this.$nextTick().then(()=>{
        let dom = document.querySelector('.about-page-comment-list');
        let scrollTop = dom.offsetTop + dom.offsetParent.offsetTop - 40;
        window.scrollTo(0,scrollTop);
        this.$msg('留言成功',1.5,'success');
      })
    },
    reply(val){
      let params = {
        data: val.data,
        messageId: val._id
      };
      this.$api.messageReply(params,res=>{
        if(res.code == 200){
          console.log(res);
          this.$msg('回复成功',1.5,'success');
          this.getMessageList();
        }
      },err=>{
        console.log(err);
      })
    },
    replyDelete(val){
      let params = {
        createdTime: val.createdTime,
        messageId: val._id
      }
      this.$api.deleteMessage(params,res=>{
        if(res.code == 200){
          this.$msg('删除成功',1.5,'success');
          this.getMessageList();
        }
      },err=>{
        console.log(err);
      });
    },
    pagechange(currentPage){
      this.queryData.page = currentPage;
      this.getMessageList();
    }
  }
}
</script>

<style lang="scss">
  .about-page{
    max-width: 700px;
    padding: 100px 25px 20px;
    .about-page-header{
      p{
        color: #5f5f5f;
      }
      
    }
    .about-page-content{
      margin-top: 20px;
      font-size: 14px;
      span{
        color: #eb5055;
      }
      p{
        margin-top: 20px;
      }
    }
  }
  .about-page-comment{
    max-width: 700px;
    padding: 0 25px 20px;
    .about-page-comment-list{

    }
  } 
  
  
</style>
