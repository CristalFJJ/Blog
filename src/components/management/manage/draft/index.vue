<template>
  <div class="manage-article-container">
    <div class="manage-article">
      <div class="space-between manage-article-title">
        <p class="font-color-blue font-size-20">草稿箱</p>
        <div class="font-size-16">
          <AutoComplete
            class="search-article"
            :class="searchBol?'search-articl-show':'search-articl-hidden'"
            v-model="searchValue"
            :data="searchData"
            @on-search="searchArticle">
          </AutoComplete>
          <Icon type="search" @click.native="searchShow"></Icon>
          <Icon type="plus"></Icon>
          <Icon type="more"></Icon>
        </div>
    </div>
    <Table class="manage-article-table" ellipsis border ref="selection" :columns="tableColumn" :data="tableData"></Table>
    <Page class="manage-article-page" :total="11" :current="page" show-elevator show-total @on-change="pageChange"></Page>
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
      page:1,
      tableColumn: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 160,
          ellipsis: true,
        },
        {
          title: '作者',
          key: 'writer'
        },
        {
          title: '分类',
          key: 'class'
         
        },
        {
          title: '日期',
          key: 'date'
          
        }
      ],
      tableData: [
        {
          title: '文章测试XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
        {
          title: '文章测试',
          writer: 'Cristal',
          class: "technology",
          date: "2018/04/16"
        },
      ]
    };
  },
  methods: {
    searchArticle(val) {
      this.searchData = !val ? [] : [val, val + val, val + val + val];
    },
    searchShow() {
      this.searchBol = !this.searchBol;
    },
    pageChange(val){
      console.log(val);
    }
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
}
</style>
