<template>
  <nav>
    <ul class="pagination center">
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"><Icon type="arrow-left-c"></Icon></a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="(item,index) in grouplist" :class="{'active': current == item.val}" :key="index">
        <a href="javascript:;" @click="setCurrent(item.val)"> {{ item.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"><Icon type="arrow-right-c"></Icon></a></li>
    </ul>
  </nav>
</template>

<script type="es6">
  export default{
    data(){
      return {
        current: this.currentPage
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      rows: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
      console.log(Math.ceil(this.total / this.rows))
        return Math.ceil(this.total / this.rows);
      },
      grouplist: function () { // 获取分页页码
        let len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;

        if (len <= this.pagegroup) { //总页数小于等于设定的最大展示页数
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }

        while (len--) { //总页数大于设定的最大展示页数
          temp.push(this.page - len);
        };
        
        let idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx); //找到中心
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup); //当前展示的页
        do {
          let t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);

        if (this.page > this.pagegroup) { //首尾加上
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }

        return list;
        
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);
        }
      }
    }
  }
</script>

<style lang="scss">
  .pagination {
    overflow: hidden;
    margin: 0 auto;
    height: 50px;
    .disabled{
      display: none;
    }
    li {
      float: left;
      height: 30px;
      border-radius: 5px;
      margin: 3px 8px;
      color: #5f5f5f;
      &:hover {
        a {
          color: #eb5055;
        }
      }
      a {
        display: block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        border-radius: 5px;
        text-decoration: none;
        color: #5f5f5f;
      }
    }
    .active {
      a {
        color: #eb5055;
      }
    }
  }

</style>