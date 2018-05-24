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
        <audio src="http://m2.music.126.net/0ljwNg6-tb38o87tSlxadw==/7978056371345236.mp3" controls>播放</audio>
        <div class="share-page-content">
          <div class="music">
            <h3>
              音乐<span class="line"></span>
            </h3>
            <p>
              <a href="javaScript:void(0)" @click="playMusic(item)" v-for="(item,index) in music" :key="index">《{{item.name}}》</a>
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
      music:[
        {
          name: '夜空中最亮的星',
          singer: '逃跑计划',
          id: 25706282,
        },
        {
          name: '敢爱敢做',
          singer: '林子祥',
          id: 28253731,
        },
        {
          name: '后来的我们',
          singer: '五月天',
          id: 28253731,
        },
        {
          name: '达尔文',
          singer: '蔡健雅',
          id: 28253731,
        },
        {
          name: '风再起时',
          singer: '张国荣',
          id: 28253731,
        },
        {
          name: '被驯服的象',
          singer: '蔡健雅',
          id: 28253731,
        },
        {
          name: '不醉不会',
          singer: '田馥甄',
          id: 28253731,
        },
        {
          name: '祝君好',
          singer: '张智霖',
          id: 28253731,
        },
        {
          name: 'Ther',
          singer: 'Kraffa',
          id: 28253731,
        },
        {
          name: '今天只做一件事',
          singer: '陈奕迅',
          id: 28253731,
        },
        {
          name: '光年之外',
          singer: '邓紫棋',
          id: 28253731,
        },
        {
          name: 'Beautiful World',
          singer: 'Westlife',
          id: 28253731,
        },
        {
          name: '心中尚未崩坏的地方 World',
          singer: '五月天',
          id: 28253731,
        },
        {
          name: '盛夏光年',
          singer: '五月天',
          id: 28253731,
        },
        {
          name: '一路向北',
          singer: '周杰伦',
          id: 28253731,
        },
        {
          name: '一列绿皮',
          singer: '伏仪',
          id: 28253731,
        },
        {
          name: '不来也不去',
          singer: '陈奕迅',
        },
        {
          name: '假如让我说下去',
          singer: '杨千嬅',
        },
        {
          name: '彩虹',
          singer: '周杰伦',
        },
        {
          name: '知足',
          singer: '五月天',
        },
        {
          name: '手写的重前',
          singer: '周杰伦',
        },
        {
          name: 'Croawtian Rhapsody',
          singer: 'Maksim Mrvica',
        },
      ],
      film:[
        '头号玩家',
        '小萝莉的猴神大叔',
        '看不见的客人',
        '华尔街之狼',
        '大话西游',
        '釜山行',
      ],
      book:[
        '白夜行',
        
      ]
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
    playMusic(val){
      let params = {
        s: val.name,
        type: 1,
        limit: 10,
        singer: val.singer
      }
      this.$api.searchMusic(params,res=>{
        console.log(JSON.parse(res.data)); 
      },err=>{
        console.log(err);
      })
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
