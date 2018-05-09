<template>
  <div class="write-article  flex-start">

    <div class="write-article-editor">

      <i-input class="write-article-editor-title" v-model="article.title" placeholder="标题"></i-input>

      <i-input class="write-article-editor-describe" v-model="article.describe" placeholder="描述"></i-input>

      <quill-editor 
        class="write-article-editor-content"
        v-model="article.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>

      <div class="write-article-editor-button">
        <i-button v-if="!upDateArticle" @click="draft">草稿</i-button>
        <i-button type="info" @click="release">{{upDateArticle?'更新':'发布'}}</i-button>
      </div>

    </div>

    <div class="write-article-class">

      <div>选项</div>

      <div class="write-article-class-content">

        <p>分类</p>

        <RadioGroup v-model="article.classification" vertical class="write-article-class-content-radio-group" @on-change="classificationChange">
          <Radio v-for="(item,index) in classificationData" :key="index" :label="item.value" class="write-article-class-content-radio">
              <Icon :type="item.icon" class="write-article-class-content-radio-icon"></Icon>
              <span>{{item.title}}</span>
          </Radio>
        </RadioGroup >

        <i-input v-model="article.label" placeholder="标签"></i-input>

        <div class="write-article-class-content-senior">
          <i-button type="info" @click="optionsDisplay">其它选项</i-button>
        </div>

        <div class="upload-list" v-if="uploadList.status === 'finished'">
          <p>封面图片</p>
          <div class="upload-list-content">
            <img :src="uploadList.url">
            <div class="upload-list-cover">
              <div class="upload-list-cover-icon">
                <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
              </div>
            </div>
          </div>
        </div>

        <Modal title="预览" v-model="preview">
          <img :src="uploadList.url" v-if="preview" style="width: 100%">
        </Modal>

        <Modal
          v-model="optionsShow"
          title="其它选项"
          :loading="optionsLoading"
          @on-ok="optionsSure"
          @on-cancel="optionsCancel">
          <Form :model="optionsForm" @submit.native.prevent>

            <FormItem>
              <p>●上传封面</p>
              <Upload
                type="drag"
                :show-upload-list="true"
                :before-upload="handleBeforeUpload"
                accept="image/jpg,image/jpeg,image/png"
                :max-size="2048"
                @on-error="handleUploadErr"
                @on-format-error="handleUploadFormatErr"
                @on-exceeded-size="handleUploadSize"
                action="javascript:void(0)">
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或者拖动图片到此区域上传</p>
                </div>
              </Upload>
              <p class="font-color-green" v-show="uploadSuccess">上传成功</p>
            </FormItem>

          </Form>
        </Modal>
      </div>
      
    </div>

  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { addClass, removeClass } from './../../../../common/js/components/ElCollapseTransition/src/dom';
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      article:{
        title:'', //标题
        describe: '', //描述
        content: '', //内容
        classification: '',//分类
        label: '', //标签
        userName: '', 
        level: 2,
      },
      optionsShow: false,
      optionsForm:{ //其它选项
        
      },
      uploadList: {}, //封面上传
      uploadSuccess: false, //上传成功
      optionsLoading: true,
      preview: false, //预览
      editorOption: {
        // some quill options
      },
      classificationData:[ //分类
        {
          title:"技术",
          value:'technology',
          icon:'laptop'
        },
        {
          title:"学习",
          value:'study',
          icon:'planet'
        },
        {
          title:"兴趣",
          value:'hobby',
          icon:'ios-game-controller-b'
        },
        {
          title:"日志",
          value:'note',
          icon:'waterdrop'
        },
      ],
      upDateArticle:false,
      draftArticle:false,
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      if(JSON.stringify(this.$route.params) != "{}"){
        let data = this.$route.params.data;
        Object.keys(this.article).forEach(item=>{
          this.article[item] = data[item];
        })
        this.article['_id'] = data['_id']; //记录id直接更新
        if(data['coverPicture']){
          this.uploadList.url = data['coverPicture'];
          this.uploadList.status = 'finished';
        }
        if(this.$route.params.from == 'draft'){
          this.draftArticle = true;
        }else{
          this.upDateArticle = true;
        } 
      }
    },
    onEditorBlur(quill) {
      // console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
      // console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      // console.log('editor ready!', quill);
    },
    classificationChange(e){
      console.log(e);
    },
    deleteDraft(){
      return new Promise((resolve,reject)=>{
        this.$api.deleteDraft([this.article],res=>{
          resolve();
        },err=>{
          reject(err);
        })
      })
    },
    draft(){ //草稿
      if(this.draftArticle){
        this.deleteDraft();
      }
      let userInfo = this.$utils.Account.getUserInfo();
      this.article.userName = userInfo.userName;
      this.article.level = userInfo.level;
      this.$api.createDraft(this.article,res=>{
        this.$router.push("/management/draft");
      },err=>{
        console.log('err',err);
      })
    },
    release(){ //发布
      let release = true;
      let userInfo = this.$utils.Account.getUserInfo();
      this.article.userName = userInfo.userName;
      this.article.level = userInfo.level;
      Object.values(this.article).map(item=>{
        if(this.$utils.CommonUtils.isEmptyOrNull(item)){
          release = false;
          return;
        }
      });
      if(this.draftArticle){
        this.deleteDraft();
      }
      if(release){
        if(this.uploadList.url){
          this.article.coverPicture = this.uploadList.url;
        }
        if(this.upDateArticle){ //更新
          this.$api.updateArticle(this.article,res=>{
            this.$router.push("/management/article");
          })
        }else{ //发布
          this.$api.createArticle(this.article,res=>{
            this.$router.push("/management/article");
          },err=>{
            console.log('err',err);
          })
        }
        
      }else{
        this.$msg('请填写完整');
      }
    },
    optionsDisplay(){ //选项
      this.optionsShow = true;
      this.uploadSuccess = false;
    },
    handleBeforeUpload(file){
      let reader = new FileReader(); 
      //为文件读取成功设置事件  
      reader.onload = e => {
        this.uploadSuccess = true;
        this.$set(this.uploadList,'url', e.target.result);
        this.$set(this.uploadList,'status', "finished");
      };
      reader.onprogress = e => {
        this.$set(this.uploadList,'percentage', (e.loaded/e.total).toFixed(2) * 100);
        this.$set(this.uploadList,'status', "loading");
      }
      //正式读取文件  
      reader.readAsDataURL(file);  
      return false;
    },
    handleUploadErr(err){
      this.$msg(err,1.5,'error');
    },
    handleUploadFormatErr(err){
      this.$msg(err,1.5,'error');
    },
    handleUploadSize(err){
      this.$msg(err,1.5,'error');
    },
    handleView(){
      this.preview = true;
    },
    handleRemove(){
      this.uploadList = {};
    },
    changeLoading() {
      this.optionsLoading = false;
      this.$nextTick().then(()=> {
        this.optionsLoading = true;
      });
    },
    optionsSure(){
      if(this.uploadList.status && this.uploadList.status == 'loading'){
        this.$msg("图片暂未上传完毕");
        this.changeLoading();
        return;
      }
      this.optionsShow = false;
    },
    optionsCancel(){

    }
  },
  
}
</script>

<style lang="scss">
  .write-article{
    height: 100%;
    .write-article-editor{
      background: #FFF;
      width: 600px;
      flex: 4;
      height: 100%;
      padding:30px; 
      border-radius: 4px;
      .ivu-input{
        line-height: 40px;
        height: 40px;
        font-size: 18px;
        letter-spacing: 2px;
      }
      .write-article-editor-title{
        margin-bottom: 20px;
      }
      .write-article-editor-describe{
        margin-bottom: 20px;
        .ivu-input{
          font-size: 14px; 
        }
      }
      .write-article-editor-content{
        height: calc(100% - 162px);
        margin-bottom: 20px;
        .ql-container{
          height: calc(100% - 90px);
        }
      }
      .write-article-editor-button{
        text-align: right;
        button{
          margin-left: 20px;
        }
      }
    }
    .write-article-class{
      margin-left: 30px;
      flex: 1;
      width: 150px;
      background: #FFF;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
      >div:nth-child(1){
        line-height: 40px;
        font-size: 16px;
        color: #FFF;
        text-align: center;
        background-color: rgb(92, 151, 219) ;
      }
      .write-article-class-content{
        position: relative;
        height: calc(100% - 40px);
        padding: 20px;
        >p:nth-child(1){
          color: #9E9E9E;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .write-article-class-content-radio-group{
          .write-article-class-content-radio{
            font-size: 16px;
            .write-article-class-content-radio-icon{
              margin-left: 10px;
              margin-right: 5px;
            }
          }
          .write-article-class-content-radio:nth-child(3){
            .write-article-class-content-radio-icon{
              font-size: 18px;
            }
          }
          .write-article-class-content-radio:nth-child(4){
            .write-article-class-content-radio-icon{
              font-size: 18px;
              margin-right: 8px;
            }
          }
        }
        .ivu-input{
          margin-top: 100px;
          line-height: 36px;
          height: 36px;
          font-size: 14px;
        }
        .write-article-class-content-senior{
          margin-top: 50px;
          text-align: center;
        }
        .upload-list{
          margin-top: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eaeaea;
          >p{
            font-weight: 600;
            margin-bottom: 10px;
          }
          .upload-list-content{
            position: relative;
            border-radius: 4px;
            overflow: hidden;
            img{
              width: 100%;
            }
            .upload-list-cover{
              display: none;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background: rgba(0,0,0,.6);
              .upload-list-cover-icon{
                position: absolute;
                left: 50%;
                top: 50%;
                margin-top: -8px;
                margin-left: -23px;
                i{
                  color:#FFF;
                  margin-right: 15px;
                  font-size: 20px;
                  cursor: pointer;
                }
              }
              
            }
            &:hover .upload-list-cover{
              display: block;
            }
          }
          
        }
        
      }
    }
  }
</style>
