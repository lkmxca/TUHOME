// 引入
import Vue from 'vue'
import Router from 'vue-router'

import HelloContainer from "./components/HelloWorld.vue"
import Reg from "./components/Reg.vue"
import Login from "./components/Login.vue"
import Home from "./components/Home.vue"
import Sousuo from "./components/Sousuo.vue"
import Ldear from "./components/Ldear.vue"
import Hgongyu1 from "./components/Hgongyu1.vue"
import Dingdan from "./components/Dingdan.vue"
import Tujzs from "./components/Tujzs.vue"
import Shequ from "./components/Shequ.vue"
import guanggao from "./gong/guanggao.vue"
import celan from "./gong/celan.vue"




Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:HelloContainer},
    {path:'/Reg',component:Reg},
    {path:'/Login',component:Login},
    {path:'/Home',component:Home},
    {path:'/Sousuo',component:Sousuo},
    {path:'/Ldear',component:Ldear},
    {path:'/Hgongyu1',component:Hgongyu1},
    {path:'/Dingdan',component:Dingdan},
    {path:'/Tujzs',component:Tujzs},
    {path:'/Shequ',component:Shequ},
    {path:'/guanggao',component:guanggao},
    {path:'/celan',component:celan},
    
  ]
})
