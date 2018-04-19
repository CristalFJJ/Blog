<template>
  <div class="control flex-start">
    <div class="control-left-area">
      <div class="control-left-area-statistics">
          <p class="font-color-blue font-size-24">网站统计</p>
          <div class="flex-start">
            <ul class="flex-start control-left-area-statistics-count font-size-16">
              <li>文章 <span>37</span></li>
              <li>评论 <span>25</span></li>
              <li>分类 <span>8</span></li>
              <li>访问量 <span>1111</span></li>
            </ul>
            <div class="control-left-area-statistics-info font-size-20">
              <div class="control-left-area-statistics-info-name">Cristal</div>
              <p class="control-left-area-statistics-info-version">版本:1.0</p>
            </div>
          </div>
      </div>
      <ul class="control-left-area-nav space-between font-size-18 font-color-blue">
        <li>撰写文章</li>
        <li>查看文章</li>
        <li>个人设置</li>
      </ul>
      <div class="control-left-area-recently-artcle">
        <p class="font-size-18 font-color-blue">最近文章</p>
        <ul>
            <scroll-bar>
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
            </scroll-bar>
          </ul>
        
      </div>
      <div class="control-left-area-recently-comment">
        <p class="font-size-18 font-color-blue">最近评论</p>
        <ul>
         <scroll-bar>
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
          </scroll-bar>
        </ul>
      </div>
    </div>
    <div class="control-right-area">
      <div class="control-right-area-cheat">
        <div class="space-between">
          <div class="control-right-area-cheat-time font-size-20"><span>2018</span>年 <span>04</span>月<span>01</span>日</div>
          <div class="control-right-area-cheat-add font-size-14">新增备忘</div>
        </div>
        <ul class="control-right-area-cheat-detail">
          <li>
            <div>
              <p>04月</p>
              <p>01日</p>
            </div>
            <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          </li>
          <li>
            <div>
              <p>04月</p>
              <p>01日</p>
            </div>
            <p>XXXXXXXXXX</p>
          </li>
          <li>
            <div>
              <p>04月</p>
              <p>01日</p>
            </div>
            <p>XXXXXXXXXX</p>
          </li>
        </ul>
        <div class="control-right-area-cheat-more">更多</div>
      </div>
      <div class="control-right-area-draft">
        <p class="font-size-18 font-color-blue">最近保存草稿</p>
        <div class="flex-start">
          <div class="control-right-area-draft-content font-size-14">
            <p>标题</p>
            <p class="font-size-12">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="control-right-area-draft-write font-size-14">继续编写</div>
        </div>
      </div>
      <div class="control-right-area-log">
        <p class="font-size-18 font-color-blue">最新日志</p>
        <ul>
          <scroll-bar>
            <li><span>10.14</span> 参与官方下个版本的投票</li>
            <li><span>10.14</span> XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</li>
            <li><span>10.14</span> XXXXXXXXXXXXXXXXXXX</li>
            <li><span>10.14</span> XXXXXXXXXXXXXXXXXXX</li>
            <li><span>10.14</span> XXXXXXXXXXXXXXXXXXX</li>
            <li><span>10.14</span> XXXXXXXXXXXXXXXXXXX</li>
            <li><span>10.14</span> XXXXXXXXXXXXXXXXXXX</li>
          </scroll-bar>
        </ul>
        <div class="control-right-area-log-more">更多</div>
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
    align-items: stretch;
    .control-left-area{
      flex: 2;
      width: 600px;
      .control-left-area-statistics{
        width: 100%;
        background: #FFF;
        padding: 20px 30px;
        border-radius: 4px;
        .control-left-area-statistics-count{
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
              margin-left: 10px;
              display: inline-block;
              width: 41.7%;
              text-align: center;
              background: #9E9E9E;
              color: #FFF;
              border-radius: 5px;
            }
          }
        }
        .control-left-area-statistics-info{
          width: 33.3%;
          flex: 1;
          color: #BABABA;
          .control-left-area-statistics-info-name{
            color: #060606;
            text-align: center;
            margin-bottom: 30px;
          }
          .control-left-area-statistics-info-version{
            text-align: center;
          }
        }
      }
      .control-left-area-nav{
        width: 100%;
        li{
          width: 30%;
          text-align: center;
          background-color: #FFF;
          line-height: 40px;
          margin-top: 20px;
          border-radius: 4px;
          box-shadow: 0 0 5px rgb(224, 222, 222);
          cursor: pointer;
          &:hover{
            background-color: #1464C2;
            color: #FFF;
          }
        }
      }
      .control-left-area-recently-artcle,.control-left-area-recently-comment{
        padding: 10px 30px;
        margin-top:20px; 
        width: 100%;
        background-color: #FFF; 
        border-radius: 4px;
        ul{
          height: calc(50vh - 237px);
          li{
            width: 100%;
            font-size: 14px;
            margin-top: 10px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
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
    .control-right-area{
      width: 300px;
      flex: 1;
      margin-left: 30px;
      .control-right-area-cheat{
        background-color: #FFF;
        padding: 20px;
        border-radius: 4px;
        .control-right-area-cheat-time{
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
        .control-right-area-cheat-add{
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
        .control-right-area-cheat-detail{
          margin-top: 20px;
          li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 10px;
            div{
              margin-right: 20px;
              padding-right: 20px;
              border-right: 2px solid; 
              font-size: 12px;
            }
            >p{
              flex: 1;
              width: 100px;
              flex-wrap: nowrap;
              overflow: hidden;
              text-overflow:ellipsis;
              font-size: 16px;
              color: rgb(172, 169, 169);
            }
          }
          li:nth-child(1) div{
            border-color: rgb(208, 19, 59);
            p:nth-child(2){
              color: rgb(208, 19, 59);
            }
          }
          li:nth-child(2) div{
            border-color: rgb(90, 174, 214);
            p:nth-child(2){
              color: rgb(90, 174, 214);
            }
          }
          li:nth-child(3) div{
            border-color: rgb(55, 143, 59);
            p:nth-child(2){
              color: rgb(55, 143, 59);
            }
          }
        }
        .control-right-area-cheat-more{
          text-align: right;
          cursor: pointer;
          color: rgb(172, 169, 169);
          &:hover{
            color: rgb(104, 104, 104);
          }
        }
      }
      .control-right-area-draft,.control-right-area-log{
        padding: 10px 20px;
        margin-top:20px; 
        width: 100%;
        background-color: #FFF; 
        border-radius: 4px;
      }
      .control-right-area-draft{
        .control-right-area-draft-content{
          margin-bottom: 10px;
          margin-top: 20px;
          flex: 1;
          width: 100px;
          flex-wrap: nowrap;
          margin-right: 20px;
          padding-left: 8px;
          border-left: 2px solid rgb(30, 145, 206); 
          p{
            overflow: hidden;
            text-overflow:ellipsis;
          }
          p:nth-child(2){
            margin-top: 5px;
            color: rgb(172, 169, 169);
          }
        }
        .control-right-area-draft-write{
          cursor: pointer;
          padding: 0 10px;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          color: #9E9E9E;
          &:hover{
            color: #060606;
          }
        }
      }
      .control-right-area-log{
        ul{
          height: calc(100vh - 555px);
          li{
            font-size: 14px;
            margin-top: 10px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            color: rgb(172, 169, 169);
            span{
              margin-right: 5px;
              color: #060606;
            }
          }
        }
        .control-right-area-log-more{
          text-align: right;
          cursor: pointer;
          color: rgb(172, 169, 169);
          &:hover{
            color: rgb(104, 104, 104);
          }
        }
      }
    }
  }
</style>
