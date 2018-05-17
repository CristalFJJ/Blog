<template>
  <div class="article-comments">
    <p class="response">{{titleText}}</p>
    <i-form class="article-comments-content" :model="userInfo">
      <Form-item class="article-comments-content-header">
        <i-input v-model="userInfo.userName" disabled placeholder="昵称">
          <span slot="prepend">Name:</span>
        </i-input>
        <i-input :title="userInfo.email" v-model="userInfo.email" disabled placeholder="个人邮箱">
          <span slot="prepend">Email:</span>
        </i-input>
        <i-input :title="userInfo.site" v-model="userInfo.site" disabled placeholder="个人网站地址">
          <span slot="prepend">Site:</span>
        </i-input>
      </Form-item>
      <FormItem class="article-comments-content-textarea">
        <i-input v-model="userInfo.msg" type="textarea" :disabled="disabledWrite" @on-focus="commentFocus" :rows="7" placeholder="comment something..."></i-input>
      </FormItem>
      <FormItem class="article-comments-content-button">
        <a @click="submitComment">SUBMIT</a>
      </FormItem>
    </i-form>
    <Modal
        v-model="modalShow"
        title="需登录后才能留言哦"
        @on-ok="goLogin"
        ok-text= "前往"
        @on-cancel="cancel">
        <p>去往登录页</p>
    </Modal>
  </div>
</template>

<script>
export default {
  props:{
    from:{
      type: String,
      required: true
    },
    type:{
      type: String,
      default:'article',
    },
    titleText:{
      type: String,
      default: 'Responses'
    }
  },
  data () {
    return {
      userInfo:{
        userName: '',
        email: '',
        site: '',
        portrait: '',
        userId: '',
        msg: '',
        level: '',
      },
      disabledWrite: false,
      modalShow: false,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      let userInfo = this.$utils.Account.getUserInfo();
      if(userInfo){
        Object.keys(this.userInfo).forEach( item=>{
          userInfo[item] && (this.userInfo[item] = userInfo[item]);
        })
        this.userInfo.userId = userInfo._id;
      }
    },
    commentFocus(){
      if(!this.userInfo.userName){
        this.modalShow = true;
        this.disabledWrite = true;
      }
    },
    goLogin(){
      this.$router.push({path:'/login',name:'login',params:{to:this.from}});
    },
    cancel(){
      
    },
    submitComment(){
      if(this.disabledWrite){
        this.modalShow = true;
        return;
      }
      if(this.$utils.CommonUtils.isEmptyOrNull(this.userInfo.msg)){
        this.$msg('留言内容不能为空');
        return;
      }
      if(this.type == 'article'){ //文章留言
        let objData = {
          articleId: this.$utils.SessionLocal.getItem('articleId'),
          data: this.userInfo
        }
        this.$api.addComment(objData,res => {
          if(res.code == 200){
            this.$emit('addComment');
            this.userInfo.msg = '';
          }
        },err => {
          console.log(err);
        })
      }else{ // 留言板留言
        this.$api.createMessage(this.userInfo,res=>{
          if(res.code == 200){
            this.$emit('addComment',res.data);
            this.userInfo.msg = '';
          }
        },err => {

        })
      }
    }
  }
}
</script>

<style lang="scss">
  .article-comments{
    max-width: 700px;
    margin: 0 auto;
    .response{
      font-size: 14px;
      font-weight: 400;
      display: block;
      padding: 30px 0 30px 20px;
      color: #5f5f5f;
    }
    .article-comments-content{
      position: relative;
      margin: 0 0 40px;
      padding: 10px 20px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      overflow: hidden;
      .ivu-form-item{
        margin-bottom: 5px; 
      }
      .article-comments-content-header{
        .ivu-form-item-content{
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .ivu-input-group{
          width: 33.33%;
        }
        .ivu-input-group-prepend{
          border: none;
          background-color: #fff;
          border-bottom: 1px dashed #dddee1;
        }
        .ivu-input[disabled]{
          background-color: #fff;
        }
        .ivu-input{
          border: none;
          border-bottom: 1px dashed #dddee1;
          &:focus{
            border-color: none;
            box-shadow: none;
          }
        }
      }
      .article-comments-content-textarea{
        
        .ivu-input{
          border: none;
          &:focus{
            border-color: none;
            box-shadow: none;
          }
        }
      }
      .article-comments-content-button{
        position: absolute;
        right: 40px;
        bottom: 12px;
        a{
          font-size: 14px;
          display: block;
          height: 32px;
          margin: 0 auto;
          padding: 0 20px;
          transition-duration: .4s;
          text-align: center;
          color: #313131;
          border: 1px solid #f7f7f7;
          border-radius: 30px;
          background-color: #f7f7f7;
          &:hover{
            color: #eb5055;
            border: 1px solid #eb5055;
            outline-style: none;
            background-color: #fff;
          }
        }
      }
    }
  }
  
</style>
