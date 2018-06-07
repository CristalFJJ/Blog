<template>
  <div class="music-list">
    <audio :src="musicUrl" id="audio" autoplay @pause="pause" @play="play" @ended="ended"></audio>
    <div class="music-list-button">
      <span class="list-control" :class="playMusic?'list-pause':'list-play'" @click="switchPlay">
        <span class="list-control-icon"></span>
      </span>
    </div>
    <!-- <scroll-bar> -->
      <div class="scroll-bar">
        <ul>
          <li class="music-list-detail" :class="musicIndex===index?'selectMusic':''" v-for="(item,index) in songArr" :key="index" @click="listenMusic(item,index)">
            <span>{{item.name}} - {{item.singer}}</span>
          </li>
        </ul>
      </div>
    <!-- </scroll-bar> -->
    
  </div>
</template>

<script>
import {songList} from './list.js';
import { mapState, mapMutations } from "vuex";
import {SERVICE} from '../../common/api/config';
export default {
  data(){
    return{
      songArr: songList,
      musicUrl: '',
      musicIndex: '',
    }
  },
  computed: {
    ...mapState({
      playMusic: state => state.Common.playMusic, // 是否播放
    })
  },
  mounted () {
    this.init();
  },
  methods:{
    ...mapMutations(['play_music_fn']),
    init(){
      window.bus.$on('playMusic',res=>{
        this.listenMusic(res.val,res.index);
      })
    },
    pause(){
      this.play_music_fn(false);
    },
    play(){
      this.play_music_fn(true);
    },
    ended(){
      let index = 0;
      if(this.musicIndex == this.songArr.length - 1){
        index = 0;
      }else{
        index = this.musicIndex + 1;
      }
      this.listenMusic(this.songArr[index],index);
    },
    async switchPlay(){
      if(this.musicUrl === ''){
        await this.listenMusic(this.songArr[0],0);
      }
      let audio = document.getElementById('audio');
      if(audio.paused) {
        audio.play();
      }else{
        audio.pause();
      } 
    },
    listenMusic(val,index){
      return new Promise((resolve,reject)=>{
        let params = {
          s: val.name,
          type: 1,
          singer: val.singer
        }
        let audio = document.getElementById('audio');
        if(this.musicIndex === index){
          if(audio.paused) {
            audio.play();
          }else{
            audio.pause();
          }
          resolve();
        }else{
          this.$api.searchMusic(params,res=>{
            this.musicIndex = index;
            // this.musicUrl = SERVICE + res.data;
            this.musicUrl = res.data;
            resolve()
          },err=>{
            reject(err);
            console.log(err);
          })
        }
        
      })
      
    }
  },
  watch: {
    musicIndex:function(val){
      let dom = document.getElementsByClassName('music-list-detail')[val];
      dom.parentNode.scrollTop = dom.offsetTop - 46;
    }
  }
}
</script>

<style lang="scss">
  .music-list{
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: rgba(26,26,26,0.81); 
    .music-list-button{
      text-align: center;
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
    .scroll-bar{
      width: 100%;
      overflow: hidden;
    }
    ul{
      height: 190px;
      width: 100%;
      box-sizing: content-box;
      padding-right: 20px; 
      overflow-y: scroll;
      overflow-x: hidden;
      li{
        box-sizing: content-box;
        width: calc(100% - 32px); 
        text-align: center;
        &:hover{
          background: rgba(0,0,0,0.7);
          color: #df846c;
        }
      }
      .selectMusic{
        background: rgba(0,0,0,0.7);
        color: #df846c;
      }
      @media only screen and (max-width: 580px) {
        li{
          width: auto;
        }
      }
    }
    .music-list-detail{
      line-height: 24px;
      padding: 6px 24px;
      color: #999;
      cursor: pointer;
    }
  }
  
    
</style>
