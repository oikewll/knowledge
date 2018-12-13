<template>
	<list class="item-list"
		loadmoreoffset='40'
		@loadmore="loadmore"
	>
		<cell>
			<text class="title">你知道吗？</text>
		</cell>

		<cell class="mod-loading pageload" v-if="pageload">
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
			cout: 10,
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
		transform(obj) {
			let ret = "";
			for (let key in obj) {
				ret +=
				encodeURIComponent(key) +
				"=" +
				encodeURIComponent((typeof(obj[key]) === 'object') ? JSON.stringify(obj[key]) : (typeof(obj[key]) === 'number') ? Number(obj[key]) : obj[key] ) +
				"&";
			}
			return ret;
		},
		setItem(obj){
			stream.fetch({
		        method: 'POST',
				url: this.config.baseurl + '/set',
				type:'json',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: this.transform(obj),
			}, ret => {
				if (!ret.ok) {
					console.error(ret);
					return;
				}

			}, info => {
				console.log(info);
			});
		},
		showItem(link, obj){
			console.log(link, obj);
			/**
			 * 这里点击后用av的查询id，
			 * 如果没有的就存储一份到数据库
			 */
			this.setItem(obj);
			this.$router.push({
				path: '/web',
				query: {
					url: link
				}
			});
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

				/**
				 * 后端转发百度api的related相关条目是数组object，
				 * 但有可能会请求超时或者被封api，
				 * 调用av云存储的时候以string写入，所以这里要做个判断，
				 */
				for (let i = 0; i < that.list.length; i++) {
					if (typeof(that.list[i].related) === 'string') {
						that.list[i].related = JSON.parse(that.list[i].related);
					}
				}

				that.endload = false;
			}, info => {
				console.log(info);
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
	position: relative;
	top: 50%;
}
.pageload{
	height: 500px;
	line-height: 500px;
}
.item-list{
	background: #f4f4f4;
	color: #666;
	padding-top: 20px;
	padding-right: 20px;
	padding-left: 20px;
	height: 100%;
}
.title{
	font-size: 60px;
	color: #666;
	margin-bottom: 20px;
}
.items{
	border-top: 1px solid #e6e6e6;
	border-right: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
	border-left: 1px solid #e6e6e6;
	border-radius: 10px;
	background: #fff;
	padding-top: 40px;
	padding-left: 30px;
	padding-right: 30px;
	padding-bottom: 40px;
	margin-bottom: 30px;
	box-shadow: 0 0 15px rgba(0,0,0,.1);
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
