<template>
	<div class="header">
		<p @click="backIndex">{{$t('Common.name')}}</p>
		<ul>
			<li v-for="(item,index) in route" :key="index" @click="goRoute(item)">{{item.text}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	data () {
		return {
			route: this.$t('Header.navs'),
		}
	},
	mounted () {
		
	},
	methods: {
		backIndex(){
			this.$router.push('/');
		},
		goRoute(val) {
			this.$router.push(val.route);
		}
	}
};
</script>

<style lang="scss" scoped>
.header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #d0d4d9;
	p{
		margin-left: 30px; 
		color: #777;
		font-size: 22px;
		height: 60px;
		line-height: 60px; 
		cursor: pointer;
		&:hover{
			color: #5e5e5e;
		}
	}
	ul{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-right: 30px;
		li{
			margin-left: 30px;
			color: #777;
			height: 60px;
			line-height: 60px; 
			font-size: 16px;
			cursor: pointer;
			&:hover{
				color: #5e5e5e;
			}
		}
	}
}

</style>
