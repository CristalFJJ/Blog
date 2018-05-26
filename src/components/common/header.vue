<template>
	<transition name="fade">
		<header v-show="headerShow">
			<div class="header space-between" >
				<p class="header-name" @click="backIndex">{{$t('Common.name')}}.</p>
				<ul class="flex-start header-list-pc">
					<li class="music-button" @click="musicShowControl"><Icon type="music-note" :class="playMusic?'twinkling':''"></Icon></li>
					<li v-for="(item,index) in route" :key="index" @click="goRoute(item,index)" :class="selected==index?'selected':''">
						<Icon v-if="item.icon" type="search"></Icon>
						<span v-else>{{capitalized(item.name)}}</span>
					</li>
				</ul>
				<ul class="flex-start header-list-phone">
					<li class="music-button" @click="musicShowControl"><Icon type="music-note" :class="playMusic?'twinkling':''"></Icon></li>
					<li class="search-icon" :class="selected=='icon'?'selected':''" @click="goRoute({route: '/search'},'icon')"><Icon type="search"></Icon></li>
					<li class="header-mobile-menu">
						<span class="icon-menu cross">
							<span class="middle"></span>
						</span>
						<ul class="header-mobile-menu-list">
							<li v-for="(item,index) in route" :key="index" @click="goRoute(item,index)" :class="selected==index?'selected':''">
								<span v-if="!item.icon">{{item.name}}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</header>
	</transition>	
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
	data () {
		return {
			route: this.$t('Header.navs'),
			headerShow: true,
			scrollTop:0,
			musicTimer: '', //音乐闪烁定时器
		}
	},
	computed: {
    ...mapState({
			selected: state => state.Common.selected, // 当前选择
			playMusic: state => state.Common.playMusic, // 是否播放
			musicShow: state => state.Common.musicShow, // 是否显示
    })
  },
	mounted () {
		this.listenScroll();
	},
	methods: {
		...mapMutations(['selected_fn','music_show_fn']),
		musicShowControl(){
			console.log(this.musicShow);
			this.music_show_fn(!this.musicShow);
		},
		backIndex(){
			this.selected_fn(-1);
			this.$router.push('/');
		},
		capitalized(str){
			return str.substring(0,1).toUpperCase()+str.substring(1); 
		},
		goRoute(val,index) {
			this.selected_fn(index);
			if(val.name == "management"){
				let userInfo = this.$utils.Account.getUserInfo();
      	if(userInfo.userName){
					if(userInfo.level == 'supreme'){
						this.$router.push('/management');
					}else{
						this.$router.push('/setting');
					}
					return;
				}
			}
			this.$router.push({path:val.route,name:val.name,query:{to:`/${val.name}`}});
		},
		listenScroll(){
			document.addEventListener('scroll',(e)=>{
				let scrollTop = document.documentElement.scrollTop;
				if(scrollTop > this.scrollTop){
					this.headerShow = false;
				}else{
					this.headerShow = true;
				}
				this.scrollTop = document.documentElement.scrollTop;
			})
		}
	}
};
</script>

<style lang="scss" scoped>
header{
  position: fixed;
  z-index: 1000;
  top: 0;
  display: block;
	width: 100%;
	background: #FFF;
	box-shadow: 0 1px 5px rgba(0,0,0,0.1);
	.header{
		width:1040px;
		max-width:100%;
		margin: auto;
		height:70px;
		.music-button{
			margin-top: 5px;
		}
		.twinkling{
			border-radius: 100px;
			animation: twinkling 1s ease-in-out infinite alternate;
		}
		.header-name{
			margin-left: 30px; 
			color: #313131;
			font-size: 26px;
			height: 60px;
			line-height: 60px; 
			cursor: pointer;
			&:hover{
				color: #5e5e5e;
			}
		}
		ul{
			margin-right: 30px;
			li{
				color: #313131;
				font-size: 16px;
				cursor: pointer;
				&:hover{
					color: #eb5055;
				}
				i{
					font-size: 20px;
				}
			}
			.selected{
				color:#eb5055;
			}
		}
		.header-list-pc{
			display: flex;
			li{
				margin-left: 30px;
				height: 60px;
				line-height: 60px;
			}
		}
		@media only screen and (max-width: 680px) {
			.header-name{
				margin-left: 20px; 
			}
			.header-list-pc{
				display: none;
			}
			.header-list-phone{
				display:flex !important;
			}
		}
		.header-list-phone{
			margin-right: 0px;
			display: none;
			.header-mobile-menu{
				line-height: 70px;
				z-index: 1;
				width: 28px;
				padding: 0 45px 0 10px;
				cursor: pointer;
				.header-mobile-menu-list{
					position: absolute;
					top: 100%;
					transition: 0.3s;
					transform: translateX(55px);
					li{
						text-align: right;
						font-size: 15px;
						line-height: 2.2;
						display: block;
						width: 140px;
						margin: 0;
						padding: 8px 25px;
						background-color: #eee;
					}
				}
				&:hover .icon-menu{
					transform: rotateZ(360deg);
				}
				&:hover .cross::before{
					top: 5px;
					transform: rotate(45deg);
					box-shadow: 0 0 0 #fff;
					background: #eb5055;
				}
				&:hover .middle{
					opacity: 0;
					background: #eb5055;
				}
				&:hover .cross::after{
					bottom: 5px;
					transform: rotate(135deg);
					box-shadow: 0 0 0 #fff;
					background: #eb5055;
				}
				&:hover .header-mobile-menu-list{
					transform: translateX(-94px);
				}
				
			}
			.search-icon{
				margin: 3px 20px 0 20px;
				i{
					font-size:22px;
				}
			}
			.icon-menu {
				position: relative;
				display: inline-block;
				width: 20px;
				height: 12px;
				transition: all .4s ease-in-out;
				transition-timing-function: cubic-bezier(.61,.04,.17,1.32);
				&::before{
					top: 0;
					position: absolute;
					left: -.25em;
					width: 20px;
					height: 2px;
					content: '';
					transition: all .4s ease-in-out;
					transform-origin: 50% 50% 0;
					background: #313131;
				}
				.middle{
					position: absolute;
					top: 50%;
					left: -.25em;
					display: inline-block;
					width: 20px;
					height: 2px;
					margin-top: -1px;
					transition: all .4s ease-in-out;
					background: #313131;
				}
				&::after{
					bottom: 0;
					position: absolute;
					left: -.25em;
					width: 20px;
					height: 2px;
					content: '';
					transition: all .4s ease-in-out;
					transform-origin: 50% 50% 0;
					background: #313131;
				}
			}
		}
	}
}


</style>
