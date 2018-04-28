<template>
  <div class="manage-article-container">
    <div class="manage-article">
      <div class="space-between manage-article-title">
        <p class="font-color-blue font-size-20">管理文章</p>
        <div v-show="!detailShow" class="font-size-16 flex-start">
          <AutoComplete
            class="search-article"
            :class="searchBol?'search-articl-show':'search-articl-hidden'"
            v-model="searchValue"
            :data="searchData"
            @on-search="searchArticle">
          </AutoComplete>
          <div v-show="!batchDeleteShow">
            <Icon type="search" @click.native="searchShow"></Icon>
            <Icon type="plus"></Icon>
            <Icon type="more"  @click.native="batchDelete"></Icon>
          </div>
          <div v-show="batchDeleteShow" class="delete-button">
            <Button @click="cancelBatchDelete">取消</Button>
            <Button type="primary" @click="sureBatchDelete">批量删除</Button>
          </div>
        </div>
        <div v-show="detailShow" @click="back" class="back-article">
          <Icon type="reply" class="font-size-16"></Icon>
          <span class="font-size-14">文章列表</span>
        </div>
    </div>
    <div v-show="!detailShow">
      <Table 
        class="manage-article-table" 
        ellipsis 
        border 
        ref="articleTable" 
        :columns="tableColumn" 
        :data="tableData" 
        @on-row-dblclick="searchDetail"
        @on-selection-change="selectChange">
      </Table>
      <Page class="manage-article-page" :total="total" :current="queryData.page" show-elevator show-total @on-change="pageChange"></Page>
    </div>

    <Modal
      v-model="deleteModel"
      :title="modalTitle"
      @on-ok="deleteOk"
      @on-cancel="deleteCancel">
      <p>是否{{modalTitle}}{{modalTitle=='批量删除'? this.selectData.length + '条':''}}</p>
    </Modal>

    <div v-show="detailShow" class="article-detail">
      <h1 class="article-detail-title">{{articleDetail.title}}</h1>
      <div class="article-detail-info">
        <div class="article-detail-info-create font-color-brown">创建时间:{{articleDetail.createdTime}}</div>
        <div class="article-detail-info-writer">{{articleDetail.userName}}</div>
        <div class="article-detail-info-upDate font-color-brown" v-show="articleDetail.updatedTime">更新时间:{{articleDetail.updatedTime}}</div>
      </div>
      <div class="article-detail-contain">
        <scroll-bar>
          <div class="ql-editor article-detail-content" v-html="articleDetail.content"></div>
          <ul class="space-between article-detail-footer">
            <li>分类: {{articleDetail.classification}}</li>
            <li>标签: {{articleDetail.label}}</li>
            <li>收藏: {{articleDetail.collect?articleDetail.collect.length:0}}</li>
            <!-- <li>留言: {{articleDetail.msgCount}}</li> -->
          </ul>
          <p></p>
          <p></p>
        </scroll-bar>
      </div>
    </div>
    
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      searchData: [],
      searchBol: false,
      queryData:{
        page:1,
        rows:10
      },
      modalTitle: '',
      deleteModel: false,
      total:1,
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
      tableData: [], // 列表数据
      selectData:[], // 选中的数据
      articleDetail:{}, // 文章具体信息
      detailShow:false, // 是否显示具体文章
      individualData: {}, // 单个删除对应的信息
      batchDeleteShow:false, // 批量删除显示 
    };
  },
  computed:{
    
  },
  mounted(){
    this.init();
  },
  methods: {
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
    searchArticle(val) {
      this.searchData = !val ? [] : [val, val + val, val + val + val];
    },
    searchShow() {
      this.searchBol = !this.searchBol;
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
        this.$api.deleteArticle(arr,res=>{
          console.log(res);
          resolve();
        },err=>{
          reject(err);
        })
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
      await this.search();
      this.batchDeleteShow = false;
      this.tableColumn.shift();
      this.$refs.articleTable.selectAll(false);
    },
    async sureDelete(){ //单个删除
      await this.deleteArticle([this.individualData]);
      await this.search();
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
      console.log(val);
    },
    deletePost(val){ //点击单个删除
      this.individualData = val;
      this.modalTitle = '删除';
      this.deleteModel = true;
    },
    pageChange(val){ //页数变化请求
      this.queryData.page = val;
      this.search();
    },
    searchDetail(val){ //查看文章具体
      this.$api.detailArticle(val,res=>{
        this.articleDetail = res.data;
        this.detailShow = true;
        console.log(this.articleDetail);
      },err=>{
        cosnole.log(err);
      })
    },
    back(){
      this.detailShow = false;
      this.articleDetail = {};
    },
  }
};
</script>

<style lang="scss">
.manage-article-container {
  height: 100%;
  .manage-article {
    padding: 30px;
    height: 100%;
    border-radius: 4px;
    background-color: #fff;
    .manage-article-title {
      i {
        margin-left: 20px;
        cursor: pointer;
        &:hover {
          color: rgb(92, 151, 219);
        }
      }
      .search-article {
        transition: 0.5s;
      }
      .search-articl-hidden {
        width: 0px;
        opacity: 0;
      }
      .search-articl-show {
        width: 200px;
        opacity: 1;
      }
      .delete-button{
        .ivu-btn{
          width: 80px;
          margin-left: 10px;
        }
      }
      .back-article{
        cursor: pointer;
      }
    }
    .manage-article-table{
      margin-top: 20px;
      .ivu-checkbox-wrapper{
        margin-right: 0px;
      }
    }
    .manage-article-page{
      margin-top: 20px;
    }
  }
  .article-detail{
    .article-detail-title{
      text-align: center;
    }
    .article-detail-contain{
      height: calc(100vh - 230px);
    }
    .article-detail-info{
      position: relative;
      text-align: center;
      margin-top: 10px;
      font-size: 12px;
      .article-detail-info-create{
        position: absolute;
        top:0;
        left:0;
      }
      .article-detail-info-writer{
        font-size: 14px;
        font-weight: 600;
      }
      .article-detail-info-upDate{
        position: absolute;
        top:0;
        right:0;
      }
    }
    .article-detail-content{
      text-indent: 2em;
      font-size: 14px;
      letter-spacing: 0.5px;
    }
    .article-detail-footer{
      font-weight: 600;
      padding: 0 15px;
    }
  }
}
</style>
