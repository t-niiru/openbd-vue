import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.ROOT_BASE,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
