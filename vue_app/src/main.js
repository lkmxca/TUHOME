import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

//按需加载mint-ui组件库中一个组件Header
//1:按需引入Header与Button
//import {Header} from "mint-ui"
//Swipe,SwipeItem轮播图所需组件
//Lazyload图片懒加载组件，即所需图片未加载出来出现的
//import {Header,Button,Swipe,SwipeItem,Lazyload} from "mint-ui"
//2:全局注册Header
//希望Header组件可以像标签直接调用
//标签：Header.name="mt-header"
//在项目中任意组件模板都可以直接使用
//Vue.component("标签名称",组件对象);
//Vue.component(Header.name,Header);
//Vue.component("mt-button",Button);//自设名，原型名
//Vue.component(Swipe.name,Swipe);
//Vue.component(SwipeItem.name,SwipeItem);
// 在export之前引入需要组件,Toast提示框
import {Toast} from "mint-ui"
// 引入选择框组件
import {MessageBox} from 'mint-ui'
//完整引入mint-ui组件
import MintUI from "mint-ui";
Vue.use(MintUI);

//3:引入axios库 main.js
//3.1:引入axios库
import axios from "axios"//引入整个库不需加{}
//3.2:配置跨域选项保存session中数据
axios.defaults.withCredentials = true
//3.3:将axios配Vue实例属性实例中
Vue.prototype.axios = axios

//4:创建全局日期格式过滤器
Vue.filter("DateTime",function(val){
  var now = new Date(val);
  //1:获取年份 月份 日期
  var y = now.getFullYear();
  var m = now.getMonth()+1;//月份返回0~11
  var d = now.getDate();
  //2:获取小时 分钟 秒
  var h = now.getHours();
  var mi = now.getMinutes();
  var s = now.getSeconds();
  m<10 && (m="0"+m);//如果m<10为true，结果前加上0
  d<10 && (d="0"+d);
  h<10 && (h="0"+h);
  mi<10 && (mi="0"+mi);
  s<10 && (s="0"+s);
  return `${y}年/${m}月/${d}日 ${h}:${mi}:${s}`;
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
