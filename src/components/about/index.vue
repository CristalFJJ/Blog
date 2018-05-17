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
          <h3 style="margin-top:20px"><span>#</span> 相关社区</h3>
          <ul class="about-community">
            <li><a href="https://juejin.im/user/5ad619acf265da239236daa1">juejin</a></li>
            <li><a href="https://segmentfault.com/u/cristal">SegmentFault</a></li>
            <li><a href="https://www.zhihu.com/people/cris-76-27/activities">zhihu</a></li>
          </ul>
          <div class="personal-email">
            <input id="copy-substitute" ref="substitute" type="text">
            <p>个人邮箱: <a href="javaScript:void(0)" @click="copyEmail($event)">cristal_F@163.com</a></p>
          </div>
          
        </div>
      </div>
    </div>
    <div class="main-content about-page-comment">
      <comment from="./about" type="about" titleText="Message Board" @addComment="addComment"></comment>
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
    },
    copyEmail(e){
      this.$refs.substitute.value = e.target.innerText;
      this.$refs.substitute.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      this.$msg('拷贝成功',1.5,'success');
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
      .about-community{
        margin: 20px 0;
        padding: 0 20px;
        li{
          list-style-type:square;
          a{
            color: #313131;
            text-decoration: underline;
          }
        }
      }
      .personal-email{
        position: relative;
        #copy-substitute{
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: -10;
        }
        p{
          font-weight: 550;
          a{
            color: #5c5c5c;
            &:hover{
              color: #858383;
            }
          }
        }
      }
    }
  }
  .about-page-comment{
    max-width: 700px;
    padding: 0 25px 20px;
    .about-page-comment-list{
    }
  } 

  @media only screen and (max-width: 700px) {
    .about-page{
      padding: 80px 25px 20px;
    }
  }
  
</style>
