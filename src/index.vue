<template>
	<list class="item-list"
		loadmoreoffset='40'
		@loadmore="loadmore"
	>
		<cell class="title">你知道吗？</cell>

		<cell class="mod-loading" v-if="pageload">
			<image class="loadimg" src="https://static.xiaoxiaoge.com/icon/ellipsis.svg"></image>
		</cell>
		<cell class="items" v-for="(item, index) in list" :key="item.itemId" @click="showItem(item.wapLink, item)" :data-id="item.itemId" v-else>
			<text class="item-tit">{{item.title}}</text>
			<div class="item-cont">
				<image class="images" resize="cover" :src="item.pic"></image>
				<text class="content">{{item.desc}}</text>
			</div>
			<div class="item-btm">
				<text class="read">阅读：{{item.pv}}</text>
				<div class="tags">
					<text class="tag" v-for="tag in item.related" @click="showItem(tag.url, null)">{{tag.title}}</text>
				</div>
			</div>
		</cell>
		<cell class="mod-loading" v-if="endload">加载中…</cell>
	</list>
</template>

<script>
const modal = weex.requireModule('modal');
const stream = weex.requireModule('stream');
export default {
	name: 'App',
	data () {
		return {
			pageload: true,
			cout: 15,
			page: 1,
			keyWord: '',
			list: [],
			endload: false,
			type: ['全部', '人物', '社会', '生活', '文化', '娱乐', '健康', '历史', '科学']
		}
	},
	created(){
		this.getList();
	},
	methods: {
		showItem(link, obj){
			console.log(link, obj);
			/**
			 * 这里点击后用av的查询id，
			 * 如果没有的就存储一份到数据库
			 */
		},
		getList(){
			let that = this;
			stream.fetch({
		        method: 'GET',
				url: that.config.baseurl + '/list?count='+that.cout+'&page='+that.page+'&keyWord='+ that.keyWord,
				type:'json'
			}, ret => {
				if (!ret.ok) {
					modal.toast({
						message: '请求错误',
						duration: 1.4
					});
					return;
				}

				if (that.page > 1) {
					// 除了第一页以外，都需要把旧的数据和新的数据合并
					that.list = [...that.list, ...ret.data];
				}else{
					that.list = ret.data;
					that.pageload = false;
				}

				that.endload = false;


			}, err => {
				console.error(err);
			});
		},
		loadmore(){
			let that = this;
			that.page = that.page + 1;
			that.endload = true;

			that.getList();
		}
	}
}
</script>

<style scoped>
.mod-loading{
	height: 120px;
	line-height: 120px;
	text-align: center;
	color: #999;
	font-size: 24px;
}
.loadimg{
	height: 70px;
}
.item-list{
	background: #f4f4f4;
	color: #666;
	padding-top: 30px;
	padding-right: 30px;
	padding-left: 30px;
	height: 100%;
}
.title{
	font-size: 60px;
	color: #666;
	margin-bottom: 30px;
}
.items{
	border: 1px solid #d8d8d8;
	border-radius: 8px;
	background: #fff;
	padding-top: 40px;
	padding-left: 30px;
	padding-right: 30px;
	padding-bottom: 40px;
	margin-bottom: 40px;
}
.item-tit{
	font-size: 40px;
	margin-bottom: 40px;
}
.item-cont{
	margin-bottom: 40px;
	flex-direction: row;
	/*justify-content: space-between;*/
}
.images{
	width: 130px;
	height: 130px;
	background: #e0e0e0;
}
.content{	
	font-size: 32px;
	line-height: 1.6;
	color: #666;
	padding-left: 30px;
	/*width: 200px;*/
	flex: 2;
	margin-top: -8px;
}
.item-btm{
	font-size: 28px;
	position: relative;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.read{
	display: inline-block;
	color: #999;
	font-size: 28px;
}
.tags{
	right: 0;
	top: 0;
	flex-direction: row;
	justify-content: flex-end;
}
.tag{
	font-size: 26px;
	color: #999;
	border: 1px solid #e0e0e0;
	min-width: 50px;
	line-height: 1.6;
	padding-left: 20px;
	padding-right: 20px;
	margin-left: 20px;
}
</style>
