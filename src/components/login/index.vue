<template>
  <div class="login">
    <div class="login-img">
      <img :src="loginImg" alt="">
    </div>
    <div class="login-page">
      <p class="login-title">LOGIN</p>
      <Form :model="userForm" class="login-form" @submit.native.prevent>
        <FormItem prop="userName">
          <Input type="text" v-model="userForm.userName" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="userForm.passWord" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <div class="login-forgot">
        <Checkbox v-model="rememberPassword" @on-change="rememberControl"> Remember Me</Checkbox>
        <p @click="forGot">Forgot Password?</p>
      </div>
      <div class="login-button"><Button  :loading="loginLoading" long @click="login">登录</Button></div>
      <div><Button long type="success" @click="registerModal">注册</Button></div>
    </div>
    <Modal
      v-model="registerShow"
      title="用户注册"
      :loading="registerLoading"
      @on-ok="register"
      @on-cancel="registerCancel">
      <Form :model="registerForm" class="login-form" :rules="registerRule" @submit.native.prevent>
        <FormItem prop="userName" label="用户名">
          <Input type="text" v-model="registerForm.userName" :icon="userNameIcon" placeholder="Username" autocomplete.native="off"></Input>
        </FormItem>
        <FormItem prop="passWord" label="用户密码" :show-message="passWordErr">
          <Input type="password" v-model="registerForm.passWord" :icon="passWordIcon" placeholder="Password" autocomplete.native="off"></Input>
        </FormItem>
        <FormItem prop="passWordAgain" label="确认密码" :show-message="passWordErr">
          <Input type="password" v-model="registerForm.passWordAgain" :icon="passWordIcon" placeholder="passWordAgain" autocomplete.native="off"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import loginImg from "../../../static/image/login.jpg";
const crypto = require('crypto');
export default {
  data() {
    return {
      loginImg: loginImg,
      userForm: {
        userName: "",
        passWord: ""
      },
      registerForm:{
        userName: "",
        passWord: "",
        passWordAgain: "",
      },
      userNameCheck:0, //0:未检测 1:已注册 2:可用
      passWordCheck:0,//0:未检测 1:不一样 2:一样
      registerLoading: true,
      rememberPassword: false,
      loginLoading: false,
      registerShow:false,
      registerRule: {
        userName: [{ validator: this.checkName, trigger: 'blur' }],
        passWord:[{validator: this.checkPassWord, trigger: 'blur' }],
        passWordAgain:[{validator: this.checkPassWord, trigger: 'blur'}]
      }
    }
  },
  computed:{
    userNameIcon:function(){
      switch(this.userNameCheck){
        case 0:
          return "";
          break;
        case 1:
          return "close";
          break;
        case 2:
          return "checkmark"
      }
    },
    passWordIcon:function(){
      switch(this.passWordCheck){
        case 0:
          return "";
          break;
        case 1:
          return "close";
          break;
        case 2:
          return "checkmark"
      }
    },
    passWordErr:function(){
      if(this.passWordCheck == 2){
        return false;
      }else{
        return true;
      }
    },
  },
  created(){
    this.registerForm = {
      userName: "",
      passWord: "",
      passWordAgain: "",
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      let CommonUtils = this.$utils.CommonUtils;
      let remember = this.$utils.Storage.getItem("remember");

      if(!CommonUtils.isEmptyOrNull(remember)){
        if(remember == "notRemember") return;
        this.rememberPassword = true;
        let cyusername = this.$utils.Cookie.getCookie('blog_username');
        let cypassword = this.$utils.Cookie.getCookie('blog_password');
        if(!CommonUtils.isEmptyOrNull(cyusername)){
          this.userForm.userName  = this.decipher(cyusername, 'cristal');
        }
        if(!CommonUtils.isEmptyOrNull(cypassword)){
          this.userForm.passWord  = this.decipher(cypassword, 'cristal');
        }
      }
    },
    cipher(mainText, subText) {
      // 加密
      const cipher = crypto.createCipher("aes192", subText);
      let encrypted = cipher.update(mainText, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    },
    decipher(mainText, subText) {
      const decipher = crypto.createDecipher("aes192", subText);
      let decrypted = decipher.update(mainText, "hex", "utf8");

      decrypted += decipher.final("utf8");
      return decrypted;
    },
    //是否记住密码
    rememberControl(bol){
      console.log(bol);
      if(bol){
        this.$utils.Storage.setItem("remember","remember");
      }else{
        this.$utils.Storage.setItem("remember","notRemember");
      }
      console.log(this.$utils.Storage.getItem("remember"));
    },
    //忘记密码
    forGot(){
      this.$msg("可以重新注册哟~",2,"info");
    },
    //登录
    login() {
      if(this.$utils.CommonUtils.isEmptyOrNull(this.userForm.userName) || this.$utils.CommonUtils.isEmptyOrNull(this.userForm.passWord)){
        this.$msg("请输入完整登录信息");
        return;
      }
      if (this.rememberPassword) {
        let userName = this.cipher(this.userForm.userName, "cristal");
        let passWord = this.cipher(this.userForm.passWord, "cristal");
        this.$utils.Cookie.setCookie("blog_username", userName, "d1");
        this.$utils.Cookie.setCookie("blog_password", passWord, "d1");
      } else {
        this.$utils.Cookie.clearCookie("blog_username");
        this.$utils.Cookie.clearCookie("blog_password");
      }

      this.$api.login(this.userForm,res => {
        if (res.code == 200) {
          let data = res.info;
          console.log(data);
          this.$utils.Storage.setObj("userInfo", data);
          this.$router.push("/management");
        }else{
          this.$msg(res.msg);
        }
      },err => {
        console.log(err);
      });
    },
    registerModal(){
      this.registerShow = true;
    },
    //检测用户名
    checkName(rule, value, callback){
      if(value == ""){
        this.userNameCheck = 0;
        return callback(new Error('请输入用户名'));
      }
      let reg = /^[a-zA-Z0-9]{2,12}$/;
      if(!reg.test(value)){
        this.userNameCheck = 1;
        return callback(new Error('请输入2-12位数字或字母'));
      }

      this.$api.registerPreview({userName:value},res => {
        if(res.code == 202){
          this.userNameCheck = 1;
          return callback(new Error('该用户已存在'));
        }else{
          this.userNameCheck = 2;
          callback();
        }
        
      })
    },
    //检测密码是否重复
    checkPassWord(rule, value, callback){
      let reg = /^.{6,12}$/;
      if(!reg.test(value)){
        this.passWordCheck = 0;
        return callback(new Error('请输入6-12位密码'));
      }
      if(this.registerForm.passWord == "" || this.registerForm.passWordAgain == ""){
        this.passWordCheck = 0;
        return callback();
      }
      if(this.registerForm.passWord != this.registerForm.passWordAgain){
        this.passWordCheck = 1;
        return callback(new Error('两次密码输入不一致'));
      }else{
        this.passWordCheck = 2;
        callback();
      }
    },
    changeLoading() {
      this.registerLoading = false;
      this.$nextTick().then(()=> {
        this.registerLoading = true;
      });
    },
    //注册
    register(){
      if(this.registerForm.userName == "" || this.registerForm.passWord == "" || this.registerForm.passWordAgain == ""){
        this.$msg("请输入完整信息");
        this.changeLoading();
        return;
      }
      if(this.userNameCheck != 2 || this.passWordCheck != 2){
        this.$msg("请输入正确格式");
        this.changeLoading();
        return;
      }
      this.$api.userRegister(this.registerForm,res => {
        if(res.code == 200){
          this.registerShow = false;
          let obj = {
            userName: res.info.userName,
            _id: res.info._id,
            level: res.info.level,
            token: res.info.token
          } 
          this.$utils.Storage.setObj("userInfo", obj);
          this.$router.push("/management");
        }
        console.log(res);
      },err => {
        console.log(err);
      });
    },
    //取消注册
    registerCancel(){
      this.registerForm = {
        userName: "",
        passWord: "",
        passWordAgain: "",
      };
      this.userNameCheck = 0;
      this.passWordCheck = 0;
      this.registerShow = false;
    },
    
  }
};
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .login-img {
    flex: 1;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login-page {
    flex: 1;
    background-color: #fff;
    text-align: center;
    .login-title {
      font-size: 28px;
      font-weight: 400;
    }
    .login-form{
      .ivu-form-item{
        margin-bottom: 0px;
      }
      .ivu-form-item-error-tip{
        position:static;
      }
    }
    .ivu-input-group {
      max-width: 400px;
      height: 40px;
      margin: 20px auto;
      .ivu-input {
        height: 40px;
      }
    }
    .login-forgot {
      width: 100%;
      margin: 0 auto;
      max-width: 400px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        cursor: pointer;
        color: rgb(21, 142, 212);
        &:hover {
          color: #5774f3;
          border-color: #5774f3;
        }
      }
    }
    .login-button{
      .ivu-btn {
        color: #57c2f3;
        background-color: #fff;
        border-color: #57c2f3;
        &:hover {
          color: #5774f3;
          border-color: #5774f3;
        }
      }
    }
    .ivu-btn {
      margin-top: 20px;
      height: 40px;
      max-width: 400px;
    }
  }
}
</style>
