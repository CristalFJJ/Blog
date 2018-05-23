<template>
  <div>
    <div class="bg-color-white">
      <div class="main-content share-page">
        <div class="share-page-header">
          <h1>Share</h1>
        </div>
        <div class="prose">
          <p>突然发现想找书看的时候找不到，</p>
          <p>所以</p>
          <p>这里放一些我看过听过的值得一留的书籍、音乐、电影，作记录,</p>
          <p>也做推荐，方便他人。</p>
        </div>
        <div class="share-page-content">
          <div class="music">
            <h3>
              音乐<span class="line"></span>
            </h3>
            <p>《虚无的十字架》、《球状闪电》、《无声告白》、《霍乱时期的爱情》、《看见》、《活着》、《狼图腾》、《百年孤独》、《嫌疑人X的献身》、《白夜行》、《悟空传》、《地球往事》、《我是个算命先生》、《仙逆》、《求魔》、《黄金时代三部曲》、《他们最幸福》、《万物生长三部曲》、《活着活着就老了》、《解忧杂货店》、《目送》、《素年锦时》、《眠空》、《得未曾有》、《信息简史》、《君子之道》、《天舞纪》、《站在两个世界的边缘》、《1Q84》、《失乐园》、《诛仙》、《道可道》</p>
          </div>
          <div class="film">
            <h3>
              电影<span class="line"></span>
            </h3>
            <p>《死神的精度》、《第36个故事》、《暗战》、《冲锋车》、《极品飞车》、《盛夏的方程式》、《秦时明月》、《罗小黑战记》</p>
          </div>
          <div class="book">
            <h3>
              书籍<span class="line"></span>
            </h3>
            <p>《明日晴れるから》、《all of me – 张靓颖》、《车站－李健》、《在冬天和奶奶一起晒太阳 – 赵照》、《为你我受冷风吹 – 林忆莲》、《颓废 – 弦子》、《印象西湖雨 – 张靓颖》、《太多 – 陈冠蒲》、《她的改变 – 雷光夏》、《天作之合 – 赵季平》、《良人 – 邓福如》、《长头发 – 许佩哲》、《有梦的人 – 任贤齐》、《哭砂 – 叶倩文》、《距离 – 陈绮贞》、《We Are One – Kelly Sweet》、《Say Hello – Rosie Thoma》、《Life is like a boat – Rie fu》、《明日を信じて – 西村由紀江》、《同手同脚 – 林宜融》、《乱红 – 陈悦》、《I didn’t know – 张靓颖》、《相思 – 毛阿敏》</p>
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
