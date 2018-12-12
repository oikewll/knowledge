/* global Vue */
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

Vue.prototype.config = {
	baseurl: '//127.0.0.1:3004',
}

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
