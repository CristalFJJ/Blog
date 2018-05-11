<template>
	<div class="front-desk">
		<Header></Header>
    <router-view></router-view>
    <Footer></Footer>
	</div>
</template>
<script>
import Header from '../common/header';
import Footer from '../common/footer';
export default {
  components: {
		Header,
		Footer
	},
	data () {
		return {
		}
	},
	mounted () {
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.front-desk{
	background: #f7f7f7;
}
</style>
