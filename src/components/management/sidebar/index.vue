<template>
  <div class="menu">
    <div class="menu-header">
      <img :src="imgSrc" alt=" ">
      <p>{{name}}</p>
    </div>
    <Menu active-name="1-1" :open-names="['1']" width="260px" class="menu-content" @on-select="selectNav">
      <Submenu v-for="(item,index) in menuData" :key="index" :name="item.name">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          {{item.title}}
        </template>
        <MenuItem v-for="(childItem,childIndex) in item.children" :key="childIndex" :name="childItem.name">{{childItem.title}}</MenuItem>
      </Submenu>
    </Menu>
    <div class="exit"><div class="exitLogin" @click="loginOut">登出</div></div>
  </div>
</template>

<script>
import photo from '../../../../static/image/me.png';
import {Account} from '../../../common/js/blogUtils';
export default {
  data () {
    return {
      name:'Cristal',
      imgSrc:photo,
      menuHeight:0,//高度
      menuData:[
        {
          name:'1',
          title: '控制台',
          icon: 'ios-monitor',
          children:[
            {
              name:'1-1',
              title: '概览',
            }
          ]
        },
        {
          name:'2',
          title: '撰写',
          icon: 'ios-compose',
          children:[
            {
              name:'2-1',
              title: '撰写文章',
            },
          ]
        },
        {
          name:'3',
          title: '管理',
          icon: 'ios-folder',
          children:[
            {
              name:'3-1',
              title: '文章',
            },
            {
              name:'3-2',
              title: '分类',
            },
            {
              name:'3-3',
              title: '标签',
            },
          ]
        },
        {
          name:'4',
          title: '设置',
          icon: 'ios-gear',
          children:[ 
            {
              name:'4-1',
              title: '个人设置',
            }]
        },
      ],
    }
  },
  mounted () {
    
  },
  methods: {
    selectNav(val){
      switch(val){
        case '1-1':
          this.$router.push("/management/overview");
          break;
        case '2-1':
          this.$router.push("/management/writeArticle");
          break;
        case '3-1':
          this.$router.push("/management/article");
          break;
        case '3-2':
          this.$router.push("/management/classification");
          break;
        case '3-3':
          this.$router.push("/management/label");
          break;
        case '4-1':
          this.$router.push("/management/personalSetting");
          break;
      }
    },
    loginOut(){
      let _id = Account.getUserInfo()._id;
      this.$api.loginOut({_id:_id},res => {
        this.$router.push("/login");
      },err =>{
        console.log(err);
        this.$router.push("/login");
      })
    },
  }
};
</script>

<style lang="scss">
  .menu{
    width: 260px;
    height: 100%;
    position: relative;
    border-right: 1px solid #DDDEE1;
  }
  .menu-header{
    width: 100%;
    padding: 30px;
    height: 120px;
    background-color: #212121;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid white;
      margin-right: 30px;
    }
    p{
      font-size: 24px;
      color: #CECECD;
    }
  }
  .menu-content{
    height: 500px;
  }
  .exit{
    position: absolute;
    bottom: 50px;
    z-index: 900;
    width: 100%;
  }
  .exitLogin{
    width: 180px;
    line-height: 30px;
    border-radius: 4px;
    background-color: rgb(201, 77, 77);
    text-align: center;
    margin: 0 auto;
    color: #FFF;
    cursor: pointer;
    &:hover{
       background-color: rgb(253, 93, 93);
    }
  }
</style>
