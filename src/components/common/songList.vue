<template>
  <div class="music-list">
    <ul>
      <li class="music-list-button">
        <span class="list-control" :class="playMusic?'list-play':'list-pause'" @click="switchPlay">
          <span class="list-control-icon"></span>
        </span>
      </li>
      <li class="music-list-detail" v-for="(item,index) in songArr" :key="index" >
        <span>{{item.name}} - {{item.singer}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {songList} from './list.js'
export default {
  data(){
    return{
      songArr: songList,
      playMusic: false,
    }
  },
  methods:{
    switchPlay(){
      this.playMusic = !this.playMusic;
    }
  }
}
</script>

<style lang="scss">
  .music-list{
    width: 100%;
    position: fixed;
    bottom: 0;
    ul{
      background-color: rgba(26,26,26,0.81); 
      li{
        text-align: center;
      }
    }
    .music-list-button{
      width: 100%;
      height: 48px;
      color: #fff;
      font-size: 0;
      line-height: 48px;
      background: rgba(0,0,0,0.4);
      .list-pause{
        .list-control-icon{
          transform: translate(0, 0);
        }
      }
      .list-play{
        .list-control-icon{
          transform: translate(-50%, 0);
        }
      }
      .list-control{
        width: 60px;
        height: 48px;
        display: inline-block;
        background-color: rgba(238,119,107, 0.8);
        overflow: hidden;
        cursor: pointer;
        &:hover{
          background-color: rgba(238,119,107, 0.6);
        }
        .list-control-icon{
          display: inline-block;
          width: 200%;
          height: 100%;
          position: relative;
          transition: transform ease 0.6s;
          &::before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            width: 5px;
            height: 20px;
            position: absolute;
            right: 75%;
            top: 50%;
            background: #fff;
            box-shadow: 10px 0 0 #FFF;
            transform: translate(calc(50% - 5px), -50%);
          }
          &::after{
            content: '';
            display: inline-block;
            vertical-align: middle;
            width: 0;
            height: 0;
            position: absolute;
            right: 25%;
            top: 50%;
            border-style: solid;
            border-width: 10px 0 10px 16px;
            border-color: transparent #fff;
            transform: translate(calc(50% + 10%), -50%);
          }
        }
      }
    }
    .music-list-detail{
      line-height: 24px;
      padding: 6px 24px;
      color: #999;
      span{
        cursor: pointer;
      }
    }
  }
  
    
</style>
