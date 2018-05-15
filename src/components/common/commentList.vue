<template>
  <div class="comment-list">
    <commentContent 
      class="comment-list-content" 
      ref="commentContent" 
      v-for="(item,index) in dataArr" 
      :key="index" 
      :data="item" 
      :from="from" 
      @replyClose="replyClose"
      @replyCloseChild="replyCloseChild"
      @cancelReply="cancelReply"
      @reply="reply($event,index)"
      @replyDelete="replyDelete($event,index)">
    </commentContent>
  </div>
</template>

<script>
import commentContent from './commentComponent';
export default {
  props:{
    dataArr: {
      type: Array,
      default (){
        return []
      }
    },
    from:{
      type: String,
      required: true
    }
  },
  components: {
    commentContent
  },
  mounted(){
    console.log(this.from);
  },
  methods: {
    reply(val,index){
      let data = Object.assign({},val.userInfo);
      data.msg = `@${val.writer}  ${data.msg }`;
      this.$emit('reply',{data:data,index:index})
      this.cancelReply();
      let dom = this.$refs.commentContent[index].$el;
      let scrollTop = dom.offsetTop + dom.offsetParent.offsetTop + dom.offsetHeight - 500;
      window.scrollTo(0,scrollTop);
    },
    replyClose(){
      this.$refs.commentContent.forEach((item)=>{ //关闭所有的
        item.$children.forEach(itemChild=>{
          if(itemChild.$el.className == 'component-style'){
            itemChild.replyAreaShow = false;
          }
        })
        item.replyAreaShow = false;
      })
    },
    replyCloseChild(){
      this.$refs.commentContent.forEach((item)=>{ //关闭父级
        item.replyAreaShow = false;
      })
    },
    cancelReply(){
      this.$refs.commentContent.forEach((item)=>{ //关闭当前的并只清空当前的
        item.$children.forEach(itemChild=>{
          if(itemChild.$el.className == 'component-style'  && itemChild.replyAreaShow){
            itemChild.replyAreaShow = false;
            itemChild.userInfo.msg = '';
          }
        })
        if(item.replyAreaShow){
          item.replyAreaShow = false;
          item.userInfo.msg = '';
        }
      })
    },
    replyDelete(val,index){
      this.$emit('replyDelete',{createdTime:val,index:index});
    }
  }
}
</script>

<style lang="scss">
  .comment-list{
    .comment-list-content{
      margin: 20px 0;
      border: 1px solid rgba(184,197,214,.2);
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
    }
  }
</style>
