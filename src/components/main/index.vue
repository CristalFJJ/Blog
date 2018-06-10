<template>
	<div class="front-desk">
		<Header></Header>
    <router-view class="front-desk-content"></router-view>
    <Footer class="front-desk-footer"></Footer>
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

<style lang="scss">
.front-desk{
	background: #f7f7f7;
}
</style>
