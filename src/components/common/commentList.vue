<template>
  <div class="comment-list">
    <commentContent class="comment-list-content" v-for="(item,index) in dataArr" :key="index" :data="item" @nodeClick="nCllick"></commentContent>
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
  },
  components: {
    commentContent
  },
  methods: {
    nCllick(title){
      console.log(title)
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
