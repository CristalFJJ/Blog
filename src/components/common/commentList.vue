<template>
  <div class="comment-list">
    <commentContent v-for="(item,index) in dataArr" :key="index" :data="item" @nodeClick="nCllick"></commentContent>
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
    padding: 20px;
  }
</style>
