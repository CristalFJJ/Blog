<template>
  <div class="management-personal-setting">
    <div class="personal-setting space-between">
      <div class="personal-setting-left">
        <p class="font-color-blue font-size-20">个人设置</p>
        <Form ref="formData" :model="formData" >
          <FormItem label="个性签名" prop="name">
            <Input type="text" v-model="formData.remarks" placeholder="remark">
              <Icon type="paintbrush" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="email" label="电子邮箱地址">
            <Input type="text" v-model="formData.email" placeholder="email">
              <Icon type="email" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="site" label="个人网站">
            <i-input type="text" v-model="formData.site" placeholder="site">
              <Icon type="monitor" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem class="upload-form" label="修改头像">
            <Upload 
              class="upload-img"
              ref="upload"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload"
              type="drag"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              action="javascript:void(0)">
              <div class="upload-icon">
                <Icon type="camera" size="30"></Icon>
              </div>
            </Upload>
            <div class="upload-list" v-if="uploadList.status">
              <template v-if="uploadList.status == 'finished'">
                  <img :src="uploadList.url">
                  <div class="upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                  </div>
              </template>
              <template v-else>
                <i-circle :percent="uploadList.percentage" :stroke-color="percentageColor">
                  <span style="font-size:24px">{{uploadList.percentage}}%</span>
                </i-circle>
              </template>
            </div>
            <Modal title="预览" v-model="visible">
              <img :src="uploadList.url" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem>
            <div class="personal-setting-left-upDate">
              <Button type="primary" @click="upDateDate()">更新资料</Button>
            </div>
          </FormItem>
        </Form>
        <p class="font-color-blue font-size-20 completion-margin">密码修改</p>
        <Form ref="formData" :model="passWord">
          <FormItem label="用户密码">
            <Input type="password" v-model="passWord.first" placeholder="passWord">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="用户密码确认">
            <Input type="password" v-model="passWord.again" placeholder="againPassWord">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <div class="personal-setting-left-upDate">
              <Button type="primary" @click="upDatePassWord()">更新密码</Button>
            </div>
          </FormItem>
        </Form>
      </div>
      
      <div class="personal-setting-right">
        <div  class="static-img">
          <img :src="personalImg" alt="">
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import personalImg from '../../../../../static/image/personal.jpg';
import {SERVICE} from '../../../../common/api/config';
export default {
  data() {
    return {
      formData: {
        remarks: "",
        email: "",
        site: ""
      },
      passWord:{
        first: '',
        again: '',
      },
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: {},
      imgFile:'',
      personalImg: personalImg,
    };
  },
  computed: {
    percentageColor () {
      let color = '#2db7f5';
      if (this.uploadList.percentage == 100) {
        color = '#5cb85c';
      }
      return color;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      let userInfo = this.$utils.Account.getUserInfo();
      this.$api.userFind({_id:userInfo._id},res=>{
        let data = res.data;
        this.formData.remarks = data.remarks || '';
        this.formData.email = data.email || '';
        this.formData.site = data.site || '';
        if(data.portrait.includes('defaultAvatar')){
          data.portrait = SERVICE + data.portrait
        }
        this.$set(this.uploadList,'url', data.portrait);
        this.$set(this.uploadList,'status', "finished");
      },err=>{
        console.log(err);
      })
    },
    upDateDate() {
      if(this.formData.email !='' && !this.$utils.RegexUtils.email(this.formData.email)){ //验证邮箱格式
        console.log(this.formData.email);
        this.$msg('邮箱格式有误');
        return 
      }
      let userInfo = this.$utils.Account.getUserInfo();

      let obj = {
        _id: userInfo._id,
        remarks: this.formData.remarks,
        email: this.formData.email,
        site: this.formData.site,
        portrait: this.uploadList.url
      }
      this.$api.userUpDate(obj,res=>{
        if(res.code == 200){
          window.bus.$emit('userUpDate');
          this.$msg('资料更新成功',2,'success');
        }
      },err=>{
        console.log(err);
      });
    },
    upDatePassWord(){
      let userInfo = this.$utils.Account.getUserInfo();
      if(this.passWord.first !== this.passWord.again){
        this.$msg('两次密码输入不一致',1.5,'error');
        return;
      }
      let reg = /^.{6,12}$/;
      if(!reg.test(this.passWord.first)){
        return this.$msg('密码长度为6-12',1.5,'error');
      }
      let obj = {
        _id: userInfo._id,
        passWord: this.passWord.first
      }

      this.$api.userUpDatePassWord(obj,res=>{
        if(res.code == 200){
          this.passWord.first = '';
          this.passWord.again = '';
          this.$msg('密码更新成功',2,'success');
        }
      },err=>{
        console.log(err);
      });
    },
    handleView () {
      this.visible = true;
    },
    handleRemove () {
      this.uploadList = {};
    },
    handleBeforeUpload (file) {
      let reader = new FileReader(); 
      //为文件读取成功设置事件  
      reader.onload = e => {
        this.$set(this.uploadList,'url', e.target.result);
        this.$set(this.uploadList,'status', "finished");
        this.imgFile = e.target.result; 
      };
      reader.onprogress = e => {
        this.$set(this.uploadList,'percentage', (e.loaded/e.total).toFixed(2) * 100);
        this.$set(this.uploadList,'status', "loading");
      }
      //正式读取文件  
      reader.readAsDataURL(file);  
      return false;
    },
  },
  watch:{
    
  }
  
};
</script>

<style lang="scss">
.management-personal-setting{
  .personal-setting{
    height: calc(100vh - 60px);
    background-color: #FFF;
    border-radius: 4px;
    padding: 30px;
    align-items: stretch;
    .ivu-form-item-label-upDate{
      font-size: 14px;
    }
    .ivu-input-group .ivu-input{
      width: 250px;
    }
    .personal-setting-left{
      width: 280px;
      .upload-form{
        .ivu-form-item-label{
          float: none;
        }
        .ivu-form-item-content{
          margin-top: 10px;
          width: 280px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .upload-list{
          display: inline-block;
          width: 81px;
          height: 81px;
          text-align: center;
          line-height: 81px;
          border: 1px solid transparent;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          position: relative;
         
          box-shadow: 0 1px 1px rgba(0,0,0,.2);    
          .ivu-chart-circle{
            width: 80px !important;
            height: 80px !important;
          }
        }
        .upload-list img{
            width: 100%;
            height: 100%;
        }
        .upload-list-cover{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        .upload-list:hover .upload-list-cover{
            display: block;
        }
        .upload-list-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
            margin-top: 32px;
        }
        .upload-img{
          width: 80px;
          .ivu-upload-drag{
            border-radius: 50%;
            overflow: hidden;
          }
          .upload-icon{
            width: 80px;
            height:80px;
            line-height: 80px;
            i{
              margin-top: 26px;
            }
          }
        }
      }
      .personal-setting-left-upDate{
        width: 280px;
        text-align: center;
      }
      .completion-margin{
        margin-top: calc(100vh - 830px);
      }
    }
    .personal-setting-right{
      flex: 1;
      height: calc(100vh - 120px);
      text-align: center;
      .static-img{
        width: 100%;
        height: 100%;
        img{
          width: 80%;
          vertical-align: middle;
        }
      }
       .static-img:before{
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        
      }
    }
  }
}
  
</style>
