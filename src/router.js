import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from './components/home/HomeComponent'
import LoginComponent from './components/login/LoginComponent'
import SignUpComponent from './components/login/SignUpComponent'
import NotFoundComponent from './components/notfound/NotFoundComponent'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeComponent,
      meta: {
        title: 'Домашняя страница'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
      meta: {
        title: 'Вход'
      }
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: SignUpComponent,
      meta: {
        title: 'Регистрация'
      }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      component: NotFoundComponent,
      meta: {
        title: '404'
      }
    }
  ]
})
