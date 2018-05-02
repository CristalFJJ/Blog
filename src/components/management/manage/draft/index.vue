<template>
  <div class="manage-article-container">
    <tableComponent
      :draft="true"
      :title="title"  
      :total="total" 
      :page="queryData.page" 
      :tableData="tableData" 
      @searchSelect="searchOneArticle" 
      @pageChange="pageChange"
      @sureDelete="sureDelete"
      @sureDeleteAll="sureDeleteAll"
    ></tableComponent>
  </div>
</template>

<script>
import tableComponent from '../../../common/tableComponent';
export default {
  components:{
    tableComponent
  },
  data(){
    return{
      tableData: [],
      queryData:{
        page:1,
        rows:10
      },
      total: 1,
      title:'草稿箱'
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
     this.search();
    },
    search(){
      return new Promise((resolve,reject)=>{
        this.$api.listDraft(this.queryData,res=>{
          this.tableData = res.data;
          this.total = res.total;
          resolve();
        },err=>{
          console.log(err);
          reject(err);
        })
      })
    },
    searchOneArticle(obj){
      this.$api.searchOneDraft(obj,res=>{
        this.tableData = [res.data];
      },err=>{
        console.log(err);
      })
    },
    pageChange(val){
      this.queryData.page = val;
      this.search();
    },
    sureDelete(){
      this.search();
    },
    sureDeleteAll(){
      this.search();
    },
  }

}
</script>

<style lang="scss">
.manage-article-container {
  height: 100%;
}
</style>
