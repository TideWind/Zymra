
// ������Ҫ��ģ��
import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie"
import store from '../store/index.ts'
import Main from "../views/Main.vue";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import UserEdit from "../views/UserEdit.vue"
import Music from "../views/Music.vue"
import Create from "../views/Create.vue"
import Submit from "../views/Submit.vue"
import Works from "../views/Works.vue"
import Data from "../views/Data.vue"
import Follow from "../views/Follow.vue"
import Fans from "../views/Fans.vue"
import MusicEdit from "../views/MusicEdit.vue"
import Rank from "../views/Rank.vue"
import Explore from "../views/Explore.vue"
import List from "../views/List.vue"

const routes = [
  {
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
      path: "/list",
      name:"List",
      props: true,
      component: List,
    },
    {
      path: "/rank",
      name:"Rank",
      component: Rank,
    },
    {
      path: "/explore",
      name:"Explore",
      component: Explore,
    },
    {
      path: "/follow/:username",
      name:"Follow",
      props: true,
      component: Follow,
    },
    {
      path: "/fans/:username",
      name:"Fans",
      props: true,
      component: Fans,
    },
    {
      path: "/user/:username",
      name:"User",
      props: true,
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
    {
      path: "/create",
      name:"Create",
      component: Create,
      redirect: '/create/submit',
      children:[{
        path: "/create/submit",
        name:"Submit",
        component: Submit,
      },
      {
        path: "/create/works",
        name:"Works",
        component: Works,
      },
      {
        path: "/create/data",
        name:"Data",
        component: Data,
      },
      {
        path: "/create/edit/:music_id",
        name:"MusicEdit",
        props: true,
        component: MusicEdit,
      },
    ]},
  ]},
];
 

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to,from,next) => {

  window.scrollTo(0,0);

  if(to.name == from.name){
    window.location.reload();
  }
  if(Cookies.get('current_username')!=null && to.path == '/home' && from.path == '/login'){
    window.location.reload();
  }
  if(Cookies.get('current_username')==null && to.path == '/home' && from.name == 'User'){
    window.location.reload();
  }
  
});

router.beforeEach((to, from, next) => {
  store.commit('getAccessToken')
  const token = store.state.access_token
  if (!token && (to.path == '/user' || to.path == '/follow' || to.path == '/create' || to.path == '/create/submit'))
  {
    next({ path: '/login' })
  } else if (token && to.path == '/login') 
  {
    next({ path: '/user' })
  } else (
      next()
  )
})


export default router;