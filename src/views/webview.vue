<template>
	<div class="wrapper">
		<cell class="mod-loading pageload" v-if="pageload">
			<image class="loadimg" src="https://static.xiaoxiaoge.com/icon/ellipsis.svg"></image>
		</cell>

		<web class="webview" :src="url"
			@pagestart="onPageStart" 
			@pagefinish="onPageFinish" 
			@error="onError" v-else>
		</web>
	</div>
</template>

<script>
export default{
	name: 'webview',
	data(){
		return {
			pageload: !true,
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
			this.pageload = false;
		},
		onError(e) {
			console.log('onError', e);
		}
	}
}
</script>

<style scoped>
.wrapper,
.webview{
	width: 100%;
	height: 100%;
	background: url(https://static.xiaoxiaoge.com/icon/ellipsis.svg) no-repeat center;
	background-size: auto 70px;
}
.mod-loading{
	height: 120px;
	line-height: 120px;
	text-align: center;
	color: #999;
	font-size: 24px;
}
.loadimg{
	height: 70px;
	position: relative;
	top: 50%;
}
.pageload{
	height: 500px;
	line-height: 500px;
}
</style>