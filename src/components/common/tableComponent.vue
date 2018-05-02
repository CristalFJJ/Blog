<template>
  <div class="table">
    <div class="space-between table-title">
			<p class="font-color-blue font-size-20">{{title}}</p>
			<div v-show="!detailShow" class="font-size-16 flex-start">
				<AutoComplete
					class="search-table"
					:class="searchBol?'search-table-show':'search-table-hidden'"
					v-model="searchValue"
					:data="searchData"
					@on-click="searchSelect"
					@on-enter="searchSelect"
					@on-select="searchSelect"
					@on-search="searchArticle">
				</AutoComplete>
				<div v-show="!batchDeleteShow">
					<Icon type="search" @click.native="searchShow"></Icon>
					<Icon type="plus"  @click.native="addArticle"></Icon>
					<Icon type="more"  @click.native="batchDelete"></Icon>
				</div>
				<div v-show="batchDeleteShow" class="delete-button">
					<Button @click="cancelBatchDelete">取消</Button>
					<Button type="primary" @click="sureBatchDelete">批量删除</Button>
				</div>
			</div>
			<div v-show="detailShow" @click="back" class="back-table">
				<Icon type="reply" class="font-size-16"></Icon>
				<span class="font-size-14">文章列表</span>
			</div>
		</div>
    <slot></slot>
    <div v-show="!detailShow">
			<Table 
				class="article-table" 
				ellipsis 
				border 
				ref="articleTable" 
				:columns="tableColumn" 
				:data="tableData" 
				@on-row-dblclick="searchDetail"
				@on-selection-change="selectChange">
			</Table>
			<Page class="table-page" :total="total" :current="page" show-elevator show-total @on-change="pageChange"></Page>
		</div>

		<Modal
			v-model="deleteModel"
			:title="modalTitle"
			@on-ok="deleteOk"
			@on-cancel="deleteCancel">
			<p>是否{{modalTitle}}{{modalTitle=='批量删除'? this.selectData.length + '条':''}}</p>
		</Modal>

		<div v-show="detailShow" class="table-detail">
			<h1 class="table-detail-title">{{articleDetail.title}}</h1>
			<div class="table-detail-info">
				<div class="table-detail-info-create font-color-brown">创建时间:{{articleDetail.createdTime}}</div>
				<div class="table-detail-info-writer">{{articleDetail.userName}}</div>
				<div class="table-detail-info-upDate font-color-brown" v-show="articleDetail.upDatedTime">更新时间:{{articleDetail.upDatedTime}}</div>
			</div>
			<div class="table-detail-contain">
				<scroll-bar>
					<div class="ql-editor table-detail-content" v-html="articleDetail.content"></div>
					<ul class="space-between table-detail-footer">
						<li>分类: {{articleDetail.classification}}</li>
						<li>标签: {{articleDetail.label}}</li>
						<li>收藏: {{articleDetail.collect?articleDetail.collect.length:0}}</li>
						<!-- <li>留言: {{articleDetail.msgCount}}</li> -->
					</ul>
				</scroll-bar>
			</div>
		</div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  props:{
    title:{
      type: String,
      default: ''
    },
    searchALL:{
      type: Boolean,
      default: true
    },
    searchClass:{
      type: String,
      default: ''
    },
    tableData:{
      type: Array,
      default: []
    },
    page:{
      type: Number || String,
      default:1
    },
    total:{
      type: Number || String,
      default:1
    },
    draft:{
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      searchValue: "",
      searchData: [],
      searchBol: false,
      modalTitle: '',
      deleteModel: false,
      tableColumn: [
        {
          title: '标题',
          key: 'title',
          minWidth: 160,
          ellipsis: true,
        },
        {
          title: '作者',
          key: 'userName'
        },
        {
          title: '分类',
          key: 'classification'
        },
        {
          title: '日期',
          key: 'createdTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.editorPost(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deletePost(params.row)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      selectData:[], // 选中的数据
      articleDetail:{}, // 文章具体信息
      detailShow:false, // 是否显示具体文章
      individualData: {}, // 单个删除对应的信息
      batchDeleteShow:false, // 批量删除显示 
      searchTimer:'', //搜索节流定时器
      searchFuzzyBol: false, //是否在搜索中
    };
  },
  computed:{
    
  },
  mounted(){
    this.init();
  },
  methods: {
    ...mapMutations(['menu_active_name_fn','open_name_fn']),
    init(){
    },
    searchArticle(val) {
      if(this.$utils.CommonUtils.isEmptyOrNull(val) || this.searchFuzzyBol) return; 
      this.searchFuzzyBol = true;
      this.searchData = [];
      this.searchTimer = setTimeout(()=>{
        let obj = {content: val};
        if(!this.searchALL){
          obj.searchClass = this.searchClass;
        };
        if(!this.draft){
          this.$api.searchArticle(obj,res=>{
            let data = res.data;
            let arr = [];
            data.forEach(item=>{
              arr.push(item.title);
            })
            this.searchData = arr;
            this.searchFuzzyBol = false;
          },err=>{
            this.searchFuzzyBol = false;
            console.log(err);
          })
        }else{
          this.$api.searchDraft(obj,res=>{
            let data = res.data;
            let arr = [];
            data.forEach(item=>{
              arr.push(item.title);
            })
            this.searchData = arr;
            this.searchFuzzyBol = false;
          },err=>{
            this.searchFuzzyBol = false;
            console.log(err);
          })
        }
        
      },1000)
    },
    searchSelect(val){ 
      this.$emit('searchSelect',{type:'title',value:val})
    },
    searchShow() { //出现搜索框
      this.searchBol = !this.searchBol;
    },
    addArticle(){ //添加文章
      this.$router.push('/management/writeArticle');
    },
    batchDelete(){  //点击批量删除图标
      let select = {
        type: 'selection',
        width: 60,
        align: 'center'
      };
      this.tableColumn.unshift(select);
      this.searchBol = false;
      this.batchDeleteShow = true;
    },
    deleteArticle(arr){ //删除文章
      return new Promise((resolve,reject)=>{
        if(!this.draft){
          this.$api.deleteArticle(arr,res=>{
            resolve();
          },err=>{
            reject(err);
          })
        }else{
          this.$api.deleteDraft(arr,res=>{
            resolve();
          },err=>{
            reject(err);
          })
        }
      })
    },
    selectChange(select,row){ // 多选选项变化
      this.selectData = select;
    },
    cancelBatchDelete(){ //取消批量删除
      this.batchDeleteShow = false;
      this.tableColumn.shift();
      this.$refs.articleTable.selectAll(false);
    },
    sureBatchDelete(){ // 点击批量删除
      if(this.selectData.length == 0) {
        this.$msg("请选择文章");
        return;
      }
      this.modalTitle = '批量删除';
      this.deleteModel = true;
    },
    async sureDeleteAll(){ //批量删除
      await this.deleteArticle(this.selectData);
      this.$emit('sureDeleteAll');
      this.batchDeleteShow = false;
      this.tableColumn.shift();
      this.$refs.articleTable.selectAll(false);
    },
    async sureDelete(){ //单个删除
      await this.deleteArticle([this.individualData]);
      this.$emit('sureDelete');
    },
    deleteOk(){ //控制删除
      if(this.modalTitle == '批量删除'){
        this.sureDeleteAll();
      }else{
        this.sureDelete(); 
      }
    },
    deleteCancel(){ //取消删除
      this.deleteModel = false;
      this.modalTitle = '';
      this.individualData = {};
    },
    editorPost(val){ //点击修改
      if(!this.draft){
        this.$api.detailArticle(val,res=>{
          this.menu_active_name_fn('2-1');
          this.open_name_fn(['2']);
          this.$router.push({path:'/management/writeArticle',name:'writeArticle',params:{data:res.data}})
        },err=>{
          cosnole.log(err);
        })
      }else{
        this.$api.detailDraft(val,res=>{
          this.menu_active_name_fn('3-4');
          this.open_name_fn(['3']);
          this.$router.push({path:'/management/draft',name:'draft',params:{data:res.data}})
        },err=>{
          cosnole.log(err);
        })
      }
      
    },
    deletePost(val){ //点击单个删除
      this.individualData = val;
      this.modalTitle = '删除';
      this.deleteModel = true;
    },
    pageChange(val){ //页数变化请求
      this.$emit('pageChange',val);
    },
    searchDetail(val){ //查看文章具体
     if(!this.draft){
       this.$api.detailArticle(val,res=>{
          this.articleDetail = res.data;
          this.detailShow = true;
        },err=>{
          cosnole.log(err);
        })
     }else{
       this.$api.detailDraft(val,res=>{
          this.articleDetail = res.data;
          this.detailShow = true;
        },err=>{
          cosnole.log(err);
        })
     }
      
    },
    back(){
      this.detailShow = false;
      this.articleDetail = {};
    },
  }
};
</script>

<style lang="scss">
.table{
  padding: 30px;
  height: 100%;
  border-radius: 4px;
  background-color: #fff;
  .table-title {
    i {
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        color: rgb(92, 151, 219);
      }
    }
    .search-table {
      transition: 0.5s;
    }
    .search-table-hidden {
      width: 0px;
      opacity: 0;
    }
    .search-table-show {
      width: 200px;
      opacity: 1;
    }
    .delete-button{
      .ivu-btn{
        width: 80px;
        margin-left: 10px;
      }
    }
    .back-table{
      cursor: pointer;
    }
  }
  .article-table{
    margin-top: 20px;
    .ivu-checkbox-wrapper{
      margin-right: 0px;
    }
  }
  .table-page{
    margin-top: 20px;
  }
}
.table-detail{
  .table-detail-title{
    text-align: center;
  }
  .table-detail-contain{
    height: calc(100vh - 230px);
  }
  .table-detail-info{
    position: relative;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    .table-detail-info-create{
      position: absolute;
      top:0;
      left:0;
    }
    .table-detail-info-writer{
      font-size: 14px;
      font-weight: 600;
    }
    .table-detail-info-upDate{
      position: absolute;
      top:0;
      right:0;
    }
  }
  .table-detail-content{
    text-indent: 2em;
    font-size: 14px;
    letter-spacing: 0.5px;
  }
  .table-detail-footer{
    font-weight: 600;
    padding: 0 15px;
  }
}

</style>
