import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/AppHome.vue'
import Login from '@/components/AppLogin.vue'
import Register from '@/components/AppRegister.vue'
import SearchResult from '@/components/SearchResult.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app-home',
      component: Home
    },
    {
      path: '/login',
      name: 'app-login',
      component: Login
    },
    {
      path: '/register',
      name: 'app-register',
      component: Register
    },
    {
      path: '/player/:lastName/:firstName',
      name: 'app-search-result',
      component: SearchResult,
      props: true
    }
  ]
})
