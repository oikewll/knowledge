/* global Vue */
import Router from 'vue-router'

Vue.use(Router)

Vue.prototype.config = {
	baseurl: (process.env.NODE_ENV === 'development') ? '//127.0.0.1:3000' : '//douknow.leanapp.cn',
}

module.exports = new Router({
  routes: [
	{
		path: '/',
		name: 'index',
		component: () => import('@/views/home')
	},
	{
		path: '/web',
		name: 'webview',
		component: () => import('@/views/webview')
	},
	{
		name: 'error',
		path: '/error',
		component: () => import('@/views/error')
	},
	{
		path: '*',
		redirect: '/error'
	}]
})
