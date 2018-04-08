import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from './components/home/HomeComponent'
import PopularMoviesComponent from './components/movies/PopularMoviesComponent'
import MyFavouritesComponent from './components/movies/MyFavouritesComponent'
import DetailsComponent from './components/movies/DetailsComponent'
import ProfileComponent from './components/profile/ProfileComponent'
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
      path: '/popular',
      name: 'popular',
      component: PopularMoviesComponent,
      meta: {
        title: 'Популярные фильмы'
      }
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: MyFavouritesComponent,
      meta: {
        title: 'Мои фильмы'
      }
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsComponent,
      meta: {
        title: 'О фильме'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileComponent,
      meta: {
        title: 'Профиль'
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
