<template>
  <div class="write-article  flex-start">

    <div class="write-article-editor">

      <i-input class="write-article-editor-title" v-model="title" placeholder="标题"></i-input>

      <quill-editor 
        class="write-article-editor-content"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>

      <div class="write-article-editor-button">
        <i-button @click="draft">草稿</i-button>
        <i-button type="info" @click="release">发布</i-button>
      </div>

    </div>

    <div class="write-article-class">

      <div>选项</div>

      <div class="write-article-class-content">

        <p>分类</p>

        <RadioGroup v-model="radioValue" vertical class="write-article-class-content-radio-group" @on-change="radioChange">
          <Radio v-for="(item,index) in radioData" :key="index" :label="item.value" class="write-article-class-content-radio">
              <Icon :type="item.icon" class="write-article-class-content-radio-icon"></Icon>
              <span>{{item.title}}</span>
          </Radio>
        </RadioGroup >

        <i-input v-model="articleLabel" placeholder="标签"></i-input>

        <div class="write-article-class-content-senior">
          <i-button type="info" @click="optionsShow">高级选项</i-button>
        </div>

        <collapse-transition>
          <ul v-show="optionsBol">
            <li>更新</li>
            <li>选项一</li>
            <li>选项一</li>
            <li>选项一</li>
          </ul>
        </collapse-transition>

      </div>
      
    </div>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      title:'', //标题
      content: '', //内容
      editorOption: {
          // some quill options
      },
      radioData:[ //分类
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
      radioValue:'', //单选值
      articleLabel: '', //标签
      optionsBol: false,
    }
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.content = html;
    },
    radioChange(e){
      console.log(e);
    },
    draft(){ //草稿
      console.log(this.title);
      console.log(this.content);
      console.log(this.radioValue);
      console.log(this.articleLabel);
    },
    release(){ //发布
      console.log(this.title);
      console.log(this.content);
      console.log(this.radioValue);
      console.log(this.articleLabel);
    },
    optionsShow(){ //选项
      this.optionsBol = !this.optionsBol;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor);
  }
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
      .write-article-editor-content{
        height: calc(100% - 112px);
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
          margin-top: 150px;
          text-align: center;
        }
        
      }
    }
  }
</style>
