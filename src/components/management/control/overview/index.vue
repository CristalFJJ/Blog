<template>
  <div class="control flex-start">
    <div class="left-area">
      <div class="left-area-statistics">
          <p class="font-color-blue font-size-24">网站统计</p>
          <div class="flex-start">
            <ul class="flex-start left-area-statistics-count font-size-16">
              <li>文章 <span>37</span></li>
              <li>评论 <span>25</span></li>
              <li>分类 <span>8</span></li>
              <li>访问量 <span>1111</span></li>
            </ul>
            <div class="left-area-statistics-info font-size-20">
              <div class="left-area-statistics-info-name">Cristal</div>
              <p class="left-area-statistics-info-version">版本:1.0</p>
            </div>
          </div>
      </div>
      <ul class="left-area-nav space-between font-size-18 font-color-blue">
        <li>撰写文章</li>
        <li>查看文章</li>
        <li>个人设置</li>
      </ul>
      <div class="left-area-recently-artcle">
        <p class="font-size-18 font-color-blue">最近文章</p>
        <ul>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
        </ul>
      </div>
      <div class="left-area-recently-comment">
        <p class="font-size-18 font-color-blue">最近评论</p>
        <ul>
         <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span>2018/04/01</span>
            <span>测试</span>
            <span>测试XXXXXXXXXXXXXXXXXXXXX</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-area">
      <div class="right-area-cheat">
        <div class="space-between">
          <div class="right-area-cheat-time font-size-20"><span>2018</span>年 <span>04</span>月<span>01</span>日</div>
          <div class="right-area-cheat-add font-size-14">新增备忘</div>
        </div>
        <ul>
          <li>
            <div>
              <p>4月</p>
              <p>1日</p>
            </div>
            <p>XXXXXXXXXX</p>
          </li>
          <li>
            <div>
              <p>4月</p>
              <p>1日</p>
            </div>
            <p>XXXXXXXXXX</p>
          </li>
          <li>
            <div>
              <p>4月</p>
              <p>1日</p>
            </div>
            <p>XXXXXXXXXX</p>
          </li>
        </ul>
        <div>更多</div>
      </div>
      <div class="right-area-draft">
        <p>最近保存草稿</p>
        <div>
          <div>
            <p>标题</p>
            <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div>继续编写</div>
        </div>
      </div>
      <div class="right-area-log">
        <p>最新日志</p>
        <ul>
          <li>10.14 参与官方下个版本的投票</li>
          <li>10.11 XXXXXXXXXXXXXXXXXXX</li>
          <li>10.04 XXXXXXXXXXXXXXXXXXX</li>
        </ul>
        <div>更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .control{
    padding: 30px;
    align-items: stretch;
    .left-area{
      flex: 2;
      width: 600px;
      .left-area-statistics{
        width: 100%;
        background: #FFF;
        padding: 5%;
        border-radius: 4px;
        .left-area-statistics-count{
          width: 66.7%;
          flex: 2;
          padding-top: 30px;
          flex-wrap: wrap;
          border-right: 5px dotted #dad8d8;
          color: #060606;
          li{
            width: 30%;
            margin-right: 30px;
            margin-bottom: 30px;
            span{
              margin-left: 8.3%;
              display: inline-block;
              width: 41.7%;
              text-align: center;
              background: #9E9E9E;
              color: #FFF;
              border-radius: 5px;
            }
          }
        }
        .left-area-statistics-info{
          width: 33.3%;
          flex: 1;
          color: #BABABA;
          .left-area-statistics-info-name{
            color: #060606;
            text-align: center;
            margin-bottom: 15%;
          }
          .left-area-statistics-info-version{
            text-align: center;
          }
        }
      }
      .left-area-nav{
        width: 100%;
        li{
          width: 30%;
          text-align: center;
          background-color: #FFF;
          line-height: 40px;
          margin-top: 30px;
          border-radius: 4px;
          box-shadow: 0 0 5px rgb(224, 222, 222);
          cursor: pointer;
          &:hover{
            background-color: #1464C2;
            color: #FFF;
          }
        }
      }
      .left-area-recently-artcle,.left-area-recently-comment{
        padding: 10px 30px;
        margin-top:30px; 
        width: 100%;
        background-color: #FFF; 
        border-radius: 4px;
        ul{
          li{
            font-size: 14px;
            margin-top: 10px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            
            span{
              margin-right: 20px
            }
            span:nth-child(3){
              color: rgb(182, 182, 182);
              margin-right: 0px;
            }
          }
        }
      }

      
    }
    .right-area{
      flex: 1;
      margin-left: 30px;
      .right-area-cheat{
        background-color: #FFF;
        padding: 20px;
        border-radius: 4px;
        .right-area-cheat-time{
          color: rgb(136, 136, 136);
          span{
            color: #1464C2;
            font-size: 30px;
            margin: 0 4px;
          }
          span:nth-child(1){
            margin-left: 0;
          }
        }
        .right-area-cheat-add{
          cursor: pointer;
          margin-top: 10px;
          padding: 0 10px;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          color: #9E9E9E;
          &:hover{
            color: #060606;
          }
        }
      }
    }
  }
</style>
