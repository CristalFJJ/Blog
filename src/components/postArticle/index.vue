<template>
  <div class="post-article main-content">
    <div class="post-article-header">
      <h1>{{article.title}}</h1>
      <div>Published on {{publishTime}} in <a href="javascript:void(0)" class="post-article-classification">{{article.classification}}</a></div>
    </div>
    <div class="post-article-content">
      <p class="post-article-tag">
        <a href="javascript:void(0)" v-for="(item,index) in labelArr" :key="index"># {{item}}</a>
      </p>
      <div class="post-article-main">
        <p>{{article.content}}</p>
      </div>
      <div class="post-article-info">
        <p>本站文章除注明转载/出处外，均为本站原创，转载前请务必署名</p>
        <br>
        <p>最后编辑时间为: {{article.upDatedTime}}</p>
      </div>
    </div>
    <comment></comment>
    <comment-list :dataArr="dataArr"></comment-list>
  </div>
</template>

<script>
import comment from '../common/comment';
import commentList from '../common/commentList';
export default {
  components: {
    comment,
    commentList
  },
  data () {
    return {
      dataArr:[
        {
          'title': '111',
          'children': [
            {
              'title': '111 - 1'
            }, 
            {
              'title': '111 - 2',
              'children': [
                {'title': '111 - 2 - 1'}
              ]
            }
          ]
        },
        {
          'title': '222',
          'children': [
            {
              'title': '222 - 1'
            }, 
            {
              'title': '222 - 2',
              'children': [
                {'title': '222 - 2 - 1'}
              ]
            }
          ]
        }
      ],
      article:{
        title: '测试标题',
        createdTime: '2018-05-10 09:33:57',
        upDatedTime: '2018-05-11 09:33:57',
        classification: 'technology',
        label:"js,css,html,note",
        content:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
      }
    }
  },
  computed: {
    publishTime(){
      return this.article.createdTime.substring(0,10);
    },
    labelArr(){
      let arr = this.article.label.split(',');
      return arr;
    }
  }
}
</script>

<style lang="scss">
  .post-article{
    max-width: 700px;
    padding: 130px 25px 20px;
    // background-color: #FFF;
    .post-article-header{
      color: #5f5f5f;
      .post-article-classification{
        color: #5f5f5f;
        font-weight: 600;
      }
    }
    .post-article-content{
      .post-article-tag{
        padding: 5px 0 15px;
        border-bottom: 1px solid #e0e0e0;
        a{
          color: #fff;
          border-radius: 15px;
          background: #6fa3ef;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin: 4px 8px 0 0;
          padding: 0 15px;
          transition-duration: .6s;
          letter-spacing: 0;
        } 
        & a:nth-child(1n)  {
          border: 1px solid #6fa3ef;
          background: #6fa3ef;
        }
        & a:nth-child(2n)  {
          border: 1px solid #ff9800;
          background: #ff9800;
        }
        & a:nth-child(3n)  {
          border: 1px solid #46c47c;
          background: #46c47c;
        }
        & a:nth-child(4n)  {
          border: 1px solid #bc99c4;
          background: #bc99c4;
        }  
        & a:nth-child(5n)  {
          border: 1px solid #f9bb3c;
          background: #f9bb3c;
        }  
        & a:hover{
          color: #5f5f5f;
          border: 1px solid #f7f7f7;
          outline-style: none;
          background: #f7f7f7;
        }
      }
      .post-article-main{
        font-size: 14px;
        p{
          margin: 20px 0;
        }
      }
      .post-article-info{
        font-size: 14px;
        overflow: hidden;
        margin: 25px -20px 0;
        padding: 25px 20px 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-top: 1px solid #e0e0e0;
      }
    }   
  }
</style>
