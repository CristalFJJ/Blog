<template>
	<div class="main">
		<div class="login-background" v-show="loginShow">
			<Button type="primary" class="login-button" @click="login">个人后台</Button>
			<p class="notTips" @click="notTips">
				<Icon type="close"></Icon>
				<span>不再提醒</span>
			</p>
		</div>
		<Header></Header>
		<div class="motto">
			<p>Cristal</p>
			<p>Life is short and I deserve to be happy.</p>
		</div>
		<Carousel v-model="sweeperIndex" loop  autoplay :autoplay-speed='3000' dots="outside" class="sweeper" >
        <CarouselItem v-for="(items,indexs) in photoData" :key="indexs">
            <ul>
							<li v-for="(item,index) in items.children" :key="index" class="article-introduce">
								<img :src="item.img" alt="">
								<div>
									<p>{{item.title}}</p>
									<p>{{item.describe}}</p>
								</div>
							</li>
						</ul>
        </CarouselItem>
    </Carousel>
		<Slide class="slide"></Slide>
		<div class="content">
			<Article></Article>
		</div>
		<Footer></Footer>
		<Back-top :height="100" :bottom="100">
        <div class="top">TOP</div>
    </Back-top>
	</div>
</template>
<script>
import Header from '../common/header';
import Footer from '../common/footer';
import Slide from '../common/slide';
import Article from '../common/article'
export default {
  components: {
		Header,
		Slide,
		Article,
		Footer
	},
	data () {
		return {
			loginShow: true,
			sweeperIndex: 0,
			photoData:[
				{
					children:[
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题一',
							describe: '描述一'
						},
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题二',
							describe: '描述二'
						},
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题三',
							describe: '描述三'
						},
					]
				},
				{
					children:[
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题四',
							describe: '描述四'
						},
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题五',
							describe: '描述五'
						},
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题六',
							describe: '描述六'
						},
					]
				},
				{
					children:[
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题四',
							describe: '描述四'
						},
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题五',
							describe: '描述五'
						},
						{
							img:'../../../static/image/balloon.jpg',
							title: '标题六',
							describe: '描述六'
						},
					]
				}]
		}
	},
	mounted () {
	},
	methods: {
		init(){
			
		},
		sliding() {
			
		},
		login() {
			this.$router.push('/login');
		},
		notTips() {
			this.loginShow = false;
		},
	}
};
</script>

<style lang="scss" scoped>
.main{
	overflow-x: hidden;
	.login-background{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 10px 20px;
		color: #337ab7;
		border-bottom: 1px dashed #d0d4d9;
		.login-button{
			margin-right: 20px;
		}
		.ivu-btn-primary{
			background-color: #337ab7;
			border-color: #337ab7;
			&:hover{
				background-color: #439be9;
				border-color: #439be9;
			}
		}
		.notTips{
			cursor: pointer;
			&:hover{
				color: #439be9;
			}
		}
	}
	.motto{
		padding: 80px 0;
		p:nth-child(1){
			font-family: 'FuturaLTCondensedBoldOblique';
			font-size: 50px;
			color: #5ca087;
			text-align: center;
			margin: 10px 0; 
		}
		p:nth-child(2){
			margin: 10px;
			color: #aaaaaa;
			font-size: 1.5em;
			font-weight:800;
			font-family: 'FuturaLTCondensedBoldOblique';
			text-align: center;
		}
	}
	.sweeper{
		ul{
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.article-introduce{
			cursor: pointer;
			&:nth-child(3n+2){
				margin: 0 5px;
			}
			position: relative;
			img{
				width: 100%;
			}
			>div{
				width: 100%;
				position: absolute;
				bottom: 3px;
				background: rgba(0, 0, 0, 0.4);
				padding: 10px 20px;
				>p{
					color: #FFF;
				}
				>p:nth-child(1){
					font-size: 18px;
					font-weight: 500;
					letter-spacing: 2px;
					&:hover{
						text-decoration: underline;
					}
				}
				>p:nth-child(2){
					margin-top: 10px;
					font-size: 14px;
				}
			}
		}
		.ivu-carousel-dots li.ivu-carousel-active>button.radius{
			width: 10px;
		}
	}
	.slide{
		// margin-top: 10px;
	}
	.content{
		margin: 50px 0;
	}
	.top{
		width: 57px;
    height: 57px;
		text-align: center;
		line-height: 57px;
		background: #FFF;
		color: #333;
		border: 2px solid #333;
		font-weight: 700;
	}
}

</style>
