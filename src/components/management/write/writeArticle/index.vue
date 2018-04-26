<template>
  <div class="write-article  flex-start">

    <div class="write-article-editor">

      <i-input class="write-article-editor-title" v-model="article.title" placeholder="标题"></i-input>

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
        <i-button @click="draft">草稿</i-button>
        <i-button type="info" @click="release">发布</i-button>
      </div>

    </div>

    <div class="write-article-class">

      <div>选项</div>

      <div class="write-article-class-content">

        <p>分类</p>

        <RadioGroup v-model="article.classification" vertical class="write-article-class-content-radio-group" @on-change="radioChange">
          <Radio v-for="(item,index) in classificationData" :key="index" :label="item.value" class="write-article-class-content-radio">
              <Icon :type="item.icon" class="write-article-class-content-radio-icon"></Icon>
              <span>{{item.title}}</span>
          </Radio>
        </RadioGroup >

        <i-input v-model="article.label" placeholder="标签"></i-input>

        <div class="write-article-class-content-senior">
          <i-button type="info" @click="optionsShow">其它选项</i-button>
        </div>

        <transition 
          @enter="enter" 
          @beforeEnter="beforeEnter" 
          @afterEnter="afterEnter" 
          @leave="leave" 
          @beforeLeave="beforeLeave" 
          @afterLeave="afterLeave"
        >
          <CheckboxGroup v-model="checkValue" v-if="optionsBol" class="other-options">
            <Checkbox label="更新"></Checkbox>
            <Checkbox label="其它一" ></Checkbox>
            <Checkbox label="其它二"></Checkbox>
          </CheckboxGroup>
        </transition>

      </div>
      
    </div>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
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
        content: '', //内容
        classification: "", //分类
        label: "", //标签
      },
      
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
      optionsBol: false,
      checkValue: [],//多选值

    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor);
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
      Object.values(this.article).map(item=>{
        if(this.$utils.CommonUtils.isEmptyOrNull(item)){
          console.log(item);
          return;
        }
      });
      console.log(arr);
    },
    optionsShow(){ //选项
      this.optionsBol = !this.optionsBol;
      console.log(this.checkValue);
    },
    beforeEnter(el) {
      addClass(el, 'collapse-transition');
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },

    enter(el) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';
    },
    afterEnter(el) {
      removeClass(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    },

    leave(el) {
      if (el.scrollHeight !== 0) {
        addClass(el, 'collapse-transition');
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },

    afterLeave(el) {
      removeClass(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    },
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
        .other-options{
          .ivu-checkbox-wrapper{
            width: 100%;
            margin-top: 10px;
          }
        }
        
      }
    }
  }
</style>
