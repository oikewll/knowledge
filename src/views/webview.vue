<template>
	<web class="webview" :src="url"
		@pagestart="onPageStart" 
		@pagefinish="onPageFinish" 
		@error="onError">
	</web>
</template>

<script>
export default{
	name: 'webview',
	data(){
		return {
			url: '',
			pagestart: '',
			pagefinish: '',
			title: '',
			error: ''
		}
	},
	created: function(){
		let that = this,
			url = that.$route.query.url;

		that.url = decodeURIComponent(url);
	},
	methods: {
		onPageStart(e) {
			console.log('onPageStart', e);
		},
		onPageFinish(e) {
			console.log('onPageFinish', e);
		},
		onError(e) {
			console.log('onError', e);
		}
	}
}
</script>

<style scoped>
.webview{
	width: 100%;
	height: 100%;
}
</style>