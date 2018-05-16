<template>
  <div>
    <ul class="comment-component" ref="comment">
      <li>
        <div class="comment-component-header flex-start">
          <div class="comment-component-header-portrait"><img :src="data.portrait" alt=""></div>
          <a class="comment-component-header-userName" :href="data.site?data.site:'javaScript:void(0)'">{{data.userName}}</a>
          <Tooltip content="管理员认证" placement="top">
            <div class="comment-component-header-admin" v-if="data.level == 'supreme'">Admin</div>
          </Tooltip>
        </div>

        <p class="comment-component-message">{{data.msg}}</p>

        <div class="comment-component-meta " :class="borderBottom">
          <div class="space-between">
            <p class="comment-component-time">{{data.createdTime}}</p>
            <div class="flex-start">
              <p class="comment-component-delete" v-if="userInfo.level == 'supreme'" @click="replyDelete">删除</p>
              <p class="comment-component-reply" @click="replyPrepare">回复</p>
            </div>
            
          </div>
          <transition 
            @beforeEnter="$utils.collapseFun.beforeEnter"
            @enter="$utils.collapseFun.enter"
            @afterEnter="$utils.collapseFun.afterEnter"
            @beforeLeave="$utils.collapseFun.beforeLeave"
            @leave="$utils.collapseFun.leave"
            @afterLeave="$utils.collapseFun.afterLeave">
            <div class="comment-component-reply-area" v-show="replyAreaShow">
              <div class="comment-component-reply-area-header space-between">
                <p>welcome, <span>{{userInfo.userName}} :</span></p>
                <a href="javaScript:void(0)" @click="cancelReply">取消回复</a>
              </div>
              <i-input v-model="userInfo.msg" autofocus type="textarea" :rows="4" placeholder="reply something..."></i-input>
              <Button type="dashed" class="comment-component-post-comment" @click="reply">Post Comment</Button>
            </div>
          </transition>
        </div>

        <comment-component 
          class="component-style" 
          v-for="(item , index) in data.children" 
          :data="item" :key="index" 
          :from="from" 
          @reply="replyChild"
          @replyDelete="sureDeleteChild"
          @cancelReply="cancelReply"
          @replyClose="replyPrepareChild">
        </comment-component>

      </li>
    </ul>
    <Modal
      v-model="modalShow"
      title="需登录后才能留言哦"
      @on-ok="goLogin"
      ok-text= "前往"
      @on-cancel="cancel">
      <p>去往登录页</p>
    </Modal>
    <Modal
      v-model="deleteShow"
      title="确定删除该条留言?"
      @on-ok="sureDelete"
      ok-text= "删除"
      @on-cancel="cancel">
      <p>删除留言</p>
    </Modal>
  </div>
</template>

<script>
/**递归组件 如果需要向父级emit事件 子递归需要在递归的时候先接收再传递*/
  export default {
    name: 'commentComponent',
    props: {
      data: {
        type: Object,
        default (){
          return {}
        }
      },
      from:{
        type: String,
        required: true
      },
    },
    data(){
      return{
        userInfo:{
          userName: '',
          email: '',
          site: '',
          portrait: '',
          userId: '',
          msg: '',
          level: '',
        },
        modalShow: false,
        replyAreaShow: false,
        deleteShow: false,
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
    mounted(){
      this.init();
    },
    methods: {
      init(){
        let userInfo = this.$utils.Account.getUserInfo();
        if(userInfo){
          Object.keys(this.userInfo).forEach( item=>{
            userInfo[item] && (this.userInfo[item] = userInfo[item]);
          })
          this.userInfo.userId = userInfo._id;
        }
      },
      replyPrepare(){ //递归子组件会优先触发这个
        if(this.$utils.CommonUtils.isEmptyOrNull(this.userInfo.userName)){
          this.modalShow = true;
          return;
        }
        this.$emit('replyClose');
        this.replyAreaShow = true;
      },
      replyPrepareChild(){ 
        this.$emit('replyClose'); // 上面触发了一次打开父的和子的，再一次关闭所有包括子留言  由于递归组件底层会跟着联动 暂时用的是笨方法
        this.replyAreaShow = true;
        this.$emit('replyCloseChild'); // 关闭父的
      },
      replyDelete(){
        this.deleteShow = true;
      },
      reply(){
        if(this.$utils.CommonUtils.isEmptyOrNull(this.userInfo.msg)){
          this.$msg('回复内容不能为空');
          return;
        }
        this.$emit('reply',{writer:this.data.userName,userInfo:this.userInfo,_id:this.data._id});
      },
      replyChild(val){
        this.$emit('reply',{writer:val.writer,userInfo:val.userInfo,_id:val._id});
      },
      goLogin(){
        this.$router.push({path:'/login',name:'login',params:{to:this.from}});
      },
      cancel(){
        
      },
      sureDelete(){
        let objData = {
          createdTime: this.data.createdTime,
          _id: this.data._id
        }
        this.$emit('replyDelete',objData);
      },
      sureDeleteChild(val){
        this.$emit('replyDelete',val);
      },
      cancelDelete(){

      },
      cancelReply(){
        this.$emit('cancelReply');
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
        font-weight: 600;
        color: #5f5f5f;
      }
      .comment-component-header-admin{
        width: 40px;
        text-align: center;
        line-height: 18px;
        margin-left: 8px;
        border-radius: 3px;
        background-color: #38cfd4;
        color: #fff;
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;
      }
    }
    .comment-component-message{
      margin-top: 10px;
      color: #313131;
      font-size: 14px;
      line-height: 1.8;
      word-break:normal;  
      white-space:pre-warp;  
      word-wrap:break-word;  
    }
    
    .comment-component-meta{
      margin-top: 10px;
      font-size: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(184,197,214,.2);
      .comment-component-time{
        color: #5f5f5f;
      }
      .comment-component-delete{
        margin-right: 20px;
        color: #50adeb;
        cursor: pointer;
        &:hover{
          color: rgb(108, 212, 243);
        }
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
    .comment-component-reply-area{
      margin-top: 10px;
      .comment-component-reply-area-header{
        margin-bottom: 5px;
        font-size: 12px;
        span{
          font-weight: 700;
        }
      }
      .comment-component-post-comment{
        margin-top: 10px;
      }
    }
  }
  .component-style{
    width: calc(100% + 80px);
    padding: 0px 20px;
    margin-top: 10px;
    margin-left: -40px; 
    .comment-component{
      padding: 0 20px;
    }
  }
  .component-style:nth-last-child(1){
    .comment-component-meta{
      border-bottom: none;
      padding-bottom: 0px;
    }
  }
  
</style>