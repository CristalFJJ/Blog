<template>
  <div class="footer">
      <div class="footer-content">
          <ul>
              <li>Cristal</li>
              <li>学习好比苦行，需朝课暮诵，朝夕勤修务</li>
          </ul>
      </div>
			<p>Copyright ©cristal.com All rights reserved.</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer{
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
}
</style>
