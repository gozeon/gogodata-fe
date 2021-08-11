import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/group/:groupID',
    name: 'DataSource',
    // route level code-splitting
    // this generates a separate chunk (DataSource.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "DataSource" */ '../views/DataSource.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/:dsID',
    name: 'DataSource.edit',
    // route level code-splitting
    // this generates a separate chunk (DataSource.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "EditorDatasource" */ '../components/EditorDatasource.vue'
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../components/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard.Home',
        component: () =>
          import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
    meta: {
      guest: true,
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 需要权限
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store
      .dispatch('auth/me')
      .then(() => {
        next()
      })
      .catch((e) => {
        next({
          name: 'Login',
          query: { nextUrl: to.fullPath },
        })
      })
  } else {
    // 判断 guest
    next()
  }
})

export default router
