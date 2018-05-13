<template>
  <ul class="comment-component">
    <li>
      <div class="comment-component-header flex-start">
        <div><img :src="data.portrait" alt=""></div>
        <p>{{data.userName}}</p>
      </div>
      <p>{{data.msg}}</p>
      <p>{{data.createdTime}}</p>
      <span @click="nodeClick(data.title)">{{data.title}}</span>
      <comment-component v-for="(item , index) in data.children" :data="item" :key="index" @nodeClick="outClick"></comment-component>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'commentComponent',
    props: {
      data: {
        type: Object,
        default (){
          return {
            
          }
        }
      }
    },
    methods: {
      nodeClick(title){
        this.$emit('nodeClick',title);
      },
      outClick(title){
        this.$emit('nodeClick',title);
      }
    }
  }
</script>
<style lang="scss">

</style>