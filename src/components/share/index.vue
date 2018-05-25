<template>
  <div>
    <div class="bg-color-white">
      <div class="main-content share-page">
        <div class="share-page-header">
          <h1>Share</h1>
        </div>
        <div class="prose">
          <p>记忆轻浅，只有在某个不经意的情境里，才会若有若无的想起</p>
          <p>所以</p>
          <p>这里记录一些看过听过的值得一留的书籍、音乐、电影</p>
          <p>留作痕迹</p>
        </div>
        <div class="share-page-content">
          <div class="music">
            <h3>
              音乐<span class="line"></span>
            </h3>
            <p>
              <a href="javaScript:void(0)" @click="playMusic(item,index)" v-for="(item,index) in music" :key="index">《{{item.name}}》</a>
            </p>
          </div>
          <div class="film">
            <h3>
              电影<span class="line"></span>
            </h3>
            <p><a href="javaScript:void(0)" v-for="(item,index) in film" :key="index">《{{item}}》</a></p>
          </div>
          <div class="book">
            <h3>
              书籍<span class="line"></span>
            </h3>
            <p>
              <a href="javaScript:void(0)" v-for="(item,index) in book" :key="index">《{{item}}》</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content share-page-comment">
      <comment from="./share" type="share" titleText="Message Board" @addComment="addComment"></comment>
      <commentList class="share-page-comment-list" from="./postArticle" :dataArr="dataArr" @reply="reply" @replyDelete="replyDelete"></commentList>
      <pagination v-if="dataArr.length>0" class="pagination" :total="total" :rows="queryData.rows" :current-page='queryData.page' @pagechange="pagechange"></pagination>
    </div>
  </div>
  
</template>

<script>
import comment from '../common/comment';
import commentList from '../common/commentList';
import pagination from '../common/pagination';
import {songList,filmList,bookList} from '../common/list.js';
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
      musicUrl: '',
      queryData:{
        page: 1,
        rows: 6
      },
      music: songList,
      film: filmList,
      book: bookList
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
        let dom = document.querySelector('.share-page-comment-list');
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
    },
    playMusic(val,index){
      let params = {
        val: val,
        index: index
      }
      window.bus.$emit('playMusic',params);
    }
  }
}
</script>

<style lang="scss">
  .share-page{
    max-width: 700px;
    padding: 100px 25px 20px;
    .share-page-header{
      p{
        color: #5f5f5f;
      }
      
    }
    .music,.film,.book{
      p{
        a{
          color: #5f5f5f;
          margin-right: 10px;
        }
      }
    }
    .film,.book{
      a{
        cursor: text;
      }
    }
    .prose{
      margin-top: 20px;
      p{
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .share-page-content{
      margin-top: 20px;
      font-size: 14px;
      .music,.film,.book{
        margin-top: 20px;
      }
      span{
        color: #eb5055;
      }
      p{
        font-size: 14px;
        margin-top: 20px;
      }
      .share-community{
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
  .share-page-comment{
    max-width: 700px;
    padding: 0 25px 20px;
    .share-page-comment-list{
    }
  } 

  @media only screen and (max-width: 700px) {
    .share-page{
      padding: 80px 25px 20px;
    }
  }
  
</style>
