import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Thanks from '../views/Thanks.vue'
import Register from '../views/Register.vue'
import Reserved from '../views/Reserved.vue'
import Login from '../views/Login.vue'
import ToggleButton from 'vue-js-toggle-button'
import store from "../store/index";
import LogoutThanks from "../views/LogoutThanks.vue"
import RestaurantDetail from "../views/RestaurantDetail.vue"
import CheckReservation from "../views/CheckReservation.vue"
import Mypage from "../views/MyPage.vue"
import StarRating from 'vue-star-rating'
import Review from '../views/Review.vue'


Vue.use(VueRouter);
Vue.use(ToggleButton);
Vue.use(StarRating);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks,
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path: '/reserved',
    name: 'Reserved',
    component: Reserved,
    meta: {
      requiresAuth:true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component:LogoutThanks
  },
  {
    path: '/restaurantdetail/:id',
    name: 'RestaurantDetail',
    component: RestaurantDetail,
    props: true,
    meta: {
      requiresAuth:true,
    }
  },
  {
    path: '/checkreservation/:id',
    name: 'CheckReservation',
    component: CheckReservation,
    props: true,
    meta: {
      requiresAuth:true,
    }
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: Mypage,
    meta: {
      requiresAuth:true,
    }
  },
  {
    path: '/review/:id',
    name: 'Review',
    component: Review,
    meta: {
      requiresAuth:true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if
    (to.matched.some((record) => record.meta.requiresAuth)
    &&
    !store.state.auth)
  {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
    
  } else {
    next();
  }
});

export default router
