<template>
  <div class="footer">
    <div class="footer-content">
      <ul>
        <li>Cristal</li>
        <li>学习好比苦行，需朝课暮诵，朝夕勤修务</li>
				<li class="change-word">{{prefixWord}}<span v-for="(item,index) in changeWord" :key="index" :style="{color:makeColor()}">{{item}}</span></li>
      </ul>
    </div>
		<p>Copyright ©cristal.com All rights reserved.</p>
  </div>
</template>

<script>
export default {
	data(){
		return{
			prefixWord: '',
			prefixTimer: '',
			prefixMessage: 'I work with ',
			changeWord: [],
			someWord: [' JavaScript.',' Html & Css.',' Vue.',' Node.js.',' Passion & Love.'],
			someWordIndex: 0,
			changeTimerAdd: '',
			changeTimerLess: '',
		}
	},
	computed:{
		
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			this.scrollFun();
		},
		scrollFun(){
			let arrive = function arriveBottom(){
				if(this.$utils.CommonUtils.getScrollTop() + this.$utils.CommonUtils.getWindowHeight() >= this.$utils.CommonUtils.getScrollHeight() - 20){
					this.startChange();
					document.removeEventListener('scroll',arrive);
		　　}
			}.bind(this);
			document.addEventListener('scroll',arrive);
		},
		async startChange(){
			await this.prefixFun();
			await this.changeFun();
		},
		prefixFun(){ //前缀生成
			return new Promise((resolve,reject)=>{
				clearInterval(this.prefixTimer);
				let length = this.prefixMessage.length;
				let count = -1;
				this.prefixTimer = setInterval(()=>{
					if(count >= length-1){
						clearInterval(this.prefixTimer);
						resolve();
					}
					this.changeWord = this.$utils.CommonUtils.randomString(length - count - 1).split('');
					if(count>=0){
						this.prefixWord += this.prefixMessage[count];
					}
					count ++;
				},200);
			})
		},
		changeFun(){
			return new Promise((resolve,rejevt)=>{
				clearInterval(this.changeTimerAdd);
				let length = this.someWord[this.someWordIndex].length;
				let count = 0;
				this.changeTimerAdd = setInterval(()=>{
					if(count >= length-1){
						clearInterval(this.changeTimerAdd);
						this.changeFunLess(count);
					}
					this.changeWord = this.$utils.CommonUtils.randomString(length - count - 1).split('');
					if(count >= 0){
						this.prefixWord +=  this.someWord[this.someWordIndex][count];
					}
					count ++;
				},200);
			})
		},
		changeFunLess(count){
			setTimeout(()=>{
				clearInterval(this.changeTimerLess);
				this.changeTimerLess = setInterval(()=>{
					if(count<=0){
						clearInterval(this.changeTimerLess);
						if(this.someWordIndex < this.someWord.length -1){
							this.someWordIndex++;
						}else{
							this.someWordIndex = 0;
						}
						this.changeFun();
					}
					this.changeWord = this.$utils.CommonUtils.randomString(count).split('');
					count --;
					this.prefixWord = this.prefixWord.substring(0,this.prefixMessage.length + count);
				},200)
			},1000);
		},
		makeColor(){
			let r = Math.floor(Math.random()*256);
			let g = Math.floor(Math.random()*256);
			let b = Math.floor(Math.random()*256);
			return `rgb(${r},${g},${b})`;
		}
	}
};
</script>

<style lang="scss" scoped>
.footer{
	width: 100%;
	.footer-content{
		padding: 20px 0 10px;
		background: #575756;
		li{
			text-align: center;
			margin: 10px auto 10px;
		}
		li:nth-child(1){
			color: #d9d9d9;
			font-weight: 800;
			font-size: 24px;
		}
		li:nth-child(2){
			letter-spacing: 3px;
			color: #d9d9d9;
			font-weight: 300;
			font-size: 16px;
		}
		.change-word{
			// height: 24px;
			font-size: 16px;
			color: white;
		}
	}
	>p{
		text-align: center;
		color: #7c7c7c;
		font-weight: 400;
		letter-spacing: 1px;
		background: #373735;
		font-size: 14px;
		line-height: 50px;
	}
	@media only screen and (max-width: 880px) {
    .footer-content{
			padding: 5px 0 5px;
			li{
				margin: 5px auto 5px;
			}
			li:nth-child(1){
				font-weight: 700;
				font-size: 22px;
			}
			li:nth-child(2){
				letter-spacing: 2px;
				font-weight: 300;
				font-size: 16px;
			}
			.change-word{
				font-size: 16px;
			}
		}
		>p{
			line-height: 40px;
		}
  }
  @media only screen and (max-width: 580px) {
    .footer-content{
			padding: 2px 0 2px;
			li{
				margin: 2px auto 2px;
			}
			li:nth-child(1){
				font-weight: 600;
				font-size: 16px;
			}
			li:nth-child(2){
				letter-spacing: 2px;
				font-weight: 300;
				font-size: 12px;
			}
			.change-word{
				// height: 24px;
				font-size: 12px;
			}
		}
		>p{
			line-height: 30px;
			font-size: 12px;
		}
  }
}
</style>
