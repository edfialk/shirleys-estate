import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import(/* webpackChunkName: "index" */ './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/add-item',
      name: 'add-item',
      component: () => import('./views/AddItem.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/i/:id',
      name: 'item',
      component: () => import('./views/Item.vue'),
      props: true
    },
    {
      path: '/edit/:id',
      name: 'edit-item',
      component: () => import('./views/EditItem.vue'),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        firebase.auth().signOut().then(() => {
          next('/');
        });
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.meta.requiresAuth;

  requiresAuth && !currentUser && next('login');
  currentUser && to.name == 'login' && next('/');
  next();
})

const DEFAULT_TITLE = "Shirley's Estate Sale";
router.afterEach(to => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;