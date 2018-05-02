<template>
  <div class="manage-article-container">
    <tableComponent
      :title="title"  
      :total="total" 
      :page="queryData.page" 
      :tableData="tableData" 
			:searchALL="false"
			:searchClass="queryData.searchClass"
      @searchSelect="searchOneArticle" 
      @pageChange="pageChange"
      @sureDelete="sureDelete"
      @sureDeleteAll="sureDeleteAll">
			<Tabs type="card" @on-click="tabClick" class="manage-class-tab">
				<TabPane v-for="(item,index) in classArr" :key="index" :label="item"></TabPane>
			</Tabs>
		</tableComponent>
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
				rows:10,
				searchClass:'technology'
      },
      total: 1,
			title:'文章分类',
			classArr: ['技术','学习','兴趣','日志'],
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
        this.$api.listArticle(this.queryData,res=>{
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
      this.$api.searchOneArticle(obj,res=>{
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
		tabClick(val){
			switch(val){
				case 0:
				  this.queryData.searchClass = 'technology';
					break;
				case 1:
				  this.queryData.searchClass = 'study';
					break;
				case 2:
				  this.queryData.searchClass = 'hobby';
					break;
				case 3:
				  this.queryData.searchClass = 'note';
					break;
			}
			this.search();
		}
  }

}
</script>

<style lang="scss">
.manage-article-container {
	height: 100%;
	.manage-class-tab{
		margin-top: 20px;
	}
}
</style>

