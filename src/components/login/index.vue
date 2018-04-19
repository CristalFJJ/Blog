<template>
  <div class="login">
    <div class="login-img">
      <img :src="loginImg" alt="">
    </div>
    <div class="login-page">
      <p class="login-title">LOGIN</p>
      <Form :model="userForm" class="login-form">
        <FormItem prop="user">
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
        <Checkbox v-model="rememberPassword"> Remember Me</Checkbox>
        <p>Forgot Password?</p>
      </div>
      <Button  :loading="loginLoading" long @click="login">Login</Button>
    </div>
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
      rememberPassword: false,
      loginLoading: false
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      let CommonUtils = this.$utils.CommonUtils;
      let cyusername = this.$utils.Cookie.getCookie('blog_username');
      let cypassword = this.$utils.Cookie.getCookie('blog_password');
      if(!CommonUtils.isEmptyOrNull(cyusername)){
        this.userForm.userName  = this.decipher(cyusername, 'cristal');
      }
      if(!CommonUtils.isEmptyOrNull(cypassword)){
        this.userForm.passWord  = this.decipher(cypassword, 'cristal');
      }
      if(this.userForm.userName && this.userForm.passWord){
        this.rememberPassword = true;
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
    //登录
    login() {
      if (this.rememberPassword) {
        let userName = this.cipher(this.userForm.userName, "cristal");
        let passWord = this.cipher(this.userForm.passWord, "cristal");
        this.$utils.Cookie.setCookie("blog_username", userName, "d1");
        this.$utils.Cookie.setCookie("blog_password", passWord, "d1");
      } else {
        this.$utils.Cookie.clearCookie("blog_username");
        this.$utils.Cookie.clearCookie("blog_password");
      }

      this.$api.login(
        this.userForm,
        res => {
          if (res.status == 200) {
            let data = res.data;
            this.$utils.Storage.setObj("userInfo", data);
            this.$router.push("/management");
          }
        },
        err => {}
      );
    }
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
    .ivu-btn {
      margin-top: 20px;
      height: 40px;
      max-width: 400px;
      color: #57c2f3;
      background-color: #fff;
      border-color: #57c2f3;
      &:hover {
        color: #5774f3;
        border-color: #5774f3;
      }
    }
  }
}
</style>
