
// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.ts'
import Main from "../views/Main.vue";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import UserEdit from "../views/UserEdit.vue"
import Music from "../views/Music.vue"
// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
  {
    //默认展示，这是主页面路由必须加斜杠 /
    path: "/",
    component: Main,
    redirect: '/home',
    children:[{
      path: "/home",
      name:"Home",
      component: Home,
    },
    {
      path: "/:catchAll(.*)",
      name:"NotFound",
      component: NotFound,
    },
    {
      path: "/music/:mid",
      name:"Music",
      component: NotFound,
      props: true,
    },
    {
      path: "/list",
      name:"List",
      component: NotFound,
    },
    {
      path: "/rank",
      name:"Rank",
      component: NotFound,
    },
    {
      path: "/explore",
      name:"Explore",
      component: NotFound,
    },
    {
      path: "/follow",
      name:"Follow",
      component: NotFound,
    },
    {
      path: "/create",
      name:"Create",
      component: NotFound,
    },
    {
      path: "/user",
      name:"User",
      component: User,
    },
    {
      path: "/login",
      name:"Login",
      component: Login,
    },
    {
      path: "/register",
      name:"Register",
      component: Register,
    },
    {
      path: "/user/edit",
      name:"UserEdit",
      component: UserEdit,
    },
    {
      path: "/music/:music_id",
      name:"Music",
      props: true,
      component: Music,
    },
  ]},
];
 
// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to,from,next) => {

  window.scrollTo(0,0);

  if(to.path == from.path){
    window.location.reload();
  }
  
});

router.beforeEach((to, from, next) => {
  store.commit('getAccessToken')
  const token = store.state.access_token
  if (!token && (to.path == '/user' || to.path == '/follow' || to.path == '/create'))
  {
    next({ path: '/login' })
  } else if (token && to.path == 'login') 
  {
    next({ path: '/user' })
  } else (
      next()
  )
})

// 导出路由
export default router;