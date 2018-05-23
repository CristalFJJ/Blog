<template>
  <div class="main-content search-page">
    <i-input @on-keypress="enterSearch" @on-click="search" :maxlength="30" v-model="searchVal" icon="search" placeholder="Enter something..."></i-input>
    <div class="search-tags">
      <p>👇 The following tabs can help you!</p>
      <a class="bg-color-white" @click="searchTag(item.type)" href="javaScript:void(0)" v-for="(item,index) in tagArr" :key="index"># {{item.label}}（{{item.num}}）</a>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchVal: '',
      tagArr:[]
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.statisticalLabel();
    },
    statisticalLabel(){
      this.$api.statisticalLabel({},res=>{
        this.tagArr = res.data;
      },err=>{
        console.log(err);
      })
    },
    enterSearch(e){
      if(e.keyCode == 13){
        this.search();
      }
    },
    search(){
      if(this.$utils.CommonUtils.isEmptyOrNull(this.searchVal)) return; 
      let obj = {
        content: this.searchVal,
        limit: 0,
        way: 'Search'
      };
      this.$router.push({path:'/searchArticle',name:'searchArticle',query:obj});
    },
    searchTag(val){
      let obj = {
        content: val,
        limit: 0,
        way: 'Tag'
      };
      this.$router.push({path:'/searchArticle',name:'searchArticle',query:obj});
    }
  }
}
</script>

<style lang="scss">
  .search-page{
    max-width: 700px;
    padding: 100px 25px 20px;
    .ivu-input{
      border: none;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      border: 1px solid rgba(184,197,214,.2);
      border-radius: 20px;
      padding: 0 40px 0 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      &:focus{
        border-color: none;
      }
    }
    .ivu-input-icon{
      right: 10px;
      top: 4px;
      cursor: pointer;
    }
    .search-tags{
      padding: 15px 0;
      text-align: center;
      min-height: calc(100vh - 350px);
      p{
        margin: 20px 0 0;
        font-size: 14px;
        line-height: 1.8;
        color: #313131;
        margin-bottom: 20px;
      }
      a{
        font-size: 13px;
        display: inline-block;
        margin: 10px 8px 0 0;
        padding: 2px 15px;
        transition-duration: .4s;
        letter-spacing: 0;
        border-radius: 15px;
        box-shadow: 0 1px 4px rgba(0,0,0,.04);
        color: #313131;
        &:hover{
          color: #eb5055;
        }
      }
    }
  }

</style>
