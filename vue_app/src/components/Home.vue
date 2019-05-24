<template>
  <div class="app-home">

    <!--广告-->
    <home-gao></home-gao>

    <!--头-->
    <mt-header title="途家">
      <!--
      <router-link to="/" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
      <mt-button icon="more" slot="right"></mt-button>
      -->
      <!--三横按钮-->
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <!--轮播图-->
    <!-- :show-indicators="false"取消下方圆形按钮 -->
    <!-- :auto="4000"时间 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item of list" :key="item.id">
        <router-link :to="item.link">
          <img :src="item.img_url" />
        </router-link>
        <!--搜索框-->
        <router-link to="/Sousuo" class="finpu-sous">
          <input type="text" placeholder="你想去哪？" class="inp-sous" />
          <span class="mui-icon mui-icon-search"></span>
        </router-link>
      </mt-swipe-item>
    </mt-swipe> 

    <!--九宫格-->
    <div class="mui-content">
		  <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="item of gongs" :key="item.id">
          <!-- 运用跳转标签router-link直接跳转,to后跟跳转路径,不是首选项,需有a标签 -->
          <!-- router跳转 route接收 -->
          <router-link :to="item.link">
		        <img :src="item.img_url" />
		        <div class="mui-media-body">{{item.text}}</div>
          </router-link>
        </li>
      </ul>
		</div>

    <!--精选主题-->
    <h3 class="h-zhuti">{{hometxt1}}</h3>
    <mt-swipe :auto="3000"> 
      <mt-swipe-item v-for="item of Hlunbo" :key="item.id">
         <router-link :to="item.link">
           <img :src="item.img_url" />
         </router-link>
      </mt-swipe-item>
    </mt-swipe>

    <!--发现公寓-->
    <h3 class="h-zhuti">{{hometxt2}}</h3>
    <div class="find-gy" v-for="item of Rows" :key="item.id">
      <!--心形-添加到订单-->
      <a class="x-tianjia" @click="Btianjia"><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
      <router-link :to="item.tj_link">
        <div class="find-gyin">
          <!--主图-->
          <img :src="item.tj_imgurl" />      
          <!--价格-->
          <span>￥{{item.tj_price}}</span>
          <!--头像-->
          <div class="H-use">
            <img :src="item.tj_timgurl" />
          </div>
          <!--文字-->
          <p class="H-text1">{{item.tj_texto}}</p>
          <p class="H-text2">{{item.tj_textt}}</p>
          <p class="H-text3">
            <span>{{item.tj_textso}}</span>
            <span>{{item.tj_textst}}</span>
            <span>{{item.tj_textsr}}</span>
          </p>
        </div>
       </router-link>
    </div>

    <!--加载更多-->
    <button @click="LoadMore" type="button" class="mui-btn mui-btn-warning mui-btn-block mtg">{{hometxt3}}</button>

    <!--底部广告-->
    <div class="bottom-gug">
      <span @click="Guangug">X</span>
      <h2>{{hometxt4}}</h2>
      <h4>{{hometxt5}}<span>{{hometxt6}}</span></h4>
      <input type="submit" value="立即下载" @click="Down" />
    </div>

    <!--侧栏菜单和背景变灰色-->
    <home-ce></home-ce>

  </div>
</template>

<script>
  // 在export之前引入需要组件,Toast提示框
  // import {Toast} from "mint-ui"
  import HomeGao from "../gong/guanggao";
  import HomeCe from "../gong/celan";
  export default {
    data() {
      return {
        list:"",//绑定轮播
        gongs:"",//绑定九宫格
        Hlunbo:"",//绑定第二个轮播
        Rows:[],//保存公寓服务器数据
        pno:0,//页码
        pageSize:4,//页大小
        hasMore:true,//公寓是否有下一页数据
        hometxt1:"精选主题",
        hometxt2:"发现公寓",
        hometxt3:"加载更多",
        hometxt4:"住民宿 上途家",
        hometxt5:"新用户下载APP,尽享",
        hometxt6:"新人专享",
        hometxt7:"红包",
      }
    },
    name:'home',
    components: {
      HomeGao,HomeCe
    },
    created() {
      // 组件创建成功后直接调用
      this.LoadImgList();//轮播
      this.GongJiu();//九宫格
      this.DeLunbo();//第二个轮播
      this.LoadMore();//公寓数据
    },
    methods: {
      // 心形添加和变色
      Btianjia(e) {
        // console.log(e.target);
        // 获取信息
        // var aB = document.querySelector(".x-tianjia>span");
        // console.log(aB);
        e.target.style.color = "#f00";
      },
      // 公寓数据
      LoadMore() {
        //如果没有下一页数据，提示停止执行
        if(this.hasMore==false){
          this.$toast("没有更多的数据了...");//this.$toast全局引入,toast的写法
          return;
        }
        // 加载下一页数据，pno自增
        this.pno++;
        // console.log(this.pno);
        // ajax请求
        var url = "http://127.0.0.1:3200/Hgongyu?pno="+this.pno;
        this.axios.get(url).then(result=>{
          //获取服务器端数据
          //console.log(result.data.data);
          //保存Rows
          // this.Rows = result.data.data;
          //console.log(this.Rows);
          //追加  concat添加
          var rows = this.Rows.concat(result.data.data);
          this.Rows = rows;
          // console.log(rows.length);
          // if(rows.length >= 5){
          //   Toast("已经没有更多的公寓了");
          // }
          // 判断是否还有数据
          if(this.pno >= result.data.pageCount){
            this.hasMore = false;
          }
        })
      },
      // 立即下载
      Down() {
        window.location.href = "https://m.tujia.com/d";
      },
      // 弹出菜单
      OpenNav() {
        // 获取信息
        var Fdiv = document.querySelector(".right-nav");
        var All = document.querySelector(".allbg");
        // console.log(Fdiv);
        Fdiv.style.right = "0";
        All.style.display = "block";
      },
      // 轮播图
      LoadImgList() {
        var url = "http://127.0.0.1:3200/imglist";
        // ajax请求
        this.axios.get(url).then(result=>{
          // 获取返回数据
          // console.log(result.data.data);
          // 保存到data中
          this.list = result.data.data;
        })
      },
      // 九宫格
      GongJiu() {
        var url = "http://127.0.0.1:3200/gong";
        this.axios.get(url).then(result=>{
          this.gongs = result.data.data;
        })
      },
      // 关闭底部广告
      Guangug() {
        var FGun = document.querySelector(".bottom-gug");
        FGun.style.display = "none";
      },
      // 第二个轮播
      DeLunbo() {
        var url = "http://127.0.0.1:3200/Hlunbo";
        this.axios.get(url).then(result=>{
          this.Hlunbo = result.data.data;
        })
      },
    },
  }
</script>

<style scored>
  /*清除页面上内边距*/
  .app-container{
    padding:0;
    /*touch-action: none;*/
  }
  /*mt-header头*/
  .mint-header{
    clear:both;
    background-color:#fff !important;
    color:#fd8238 !important;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
    height:50px !important;
  }
  /*头部logo*/
  .mint-header-title{
    background:url("http://127.0.0.1:3200/home/home-logo.ico") no-repeat center center;
    background-size:60px 36px;
    color:transparent;
    height:48px;
  }
  /*轮播图*/
  .mint-swipe{
    height:300px !important;
  }
  .mint-swipe img{
    width:100%;height:100%;
    /*touch-action: none;*/
  }
  /*搜索框外套*/
  .finpu-sous{
    position:absolute;
    bottom:15%;left:25%;
  }
  .finpu-sous span{
    position:absolute;
    top:15%;right:25%;
  }
  /*搜索框*/
  .inp-sous{
    width:80% !important;
    background-color:rgba(255,255,255,.8) !important;
    border-radius:8px !important;
  }
  /*九宫格*/
  .mui-content{
    margin-bottom:15px;
  }
  .mui-content ul{
    margin-top:0 !important;
    background-color:#fff !important;
  }
  .mui-content ul li{
    border:0 !important;
    width:25%;height:100px;
    margin-left:16% !important;  
  }
  /*底部广告*/
  .bottom-gug{
    width:100%;height:155px;
    /*border:1px solid #f00;*/
    position:fixed;
    bottom:0;
    background:url("http://127.0.0.1:3200/home/bottomguanggao.jpg") no-repeat center center;
    background-size:100%;
    color:#fff;
    /*opacity:.7;*/
  }
  .bottom-gug>span{
    color:#ddd;
    float:right;
    margin:15px;
  }
  .bottom-gug>h2{
    text-indent:1em;
    margin-top:40px;
  }
  .bottom-gug>h4{
    text-indent:2em;
  }
  .bottom-gug>h4{
    font-size:16px;
  }
  .bottom-gug>h4>span{
    color:#ffb900;
    font-size:20px;
  }
  .bottom-gug>input{
    margin: 10px 30px;
    background-color:#f68e23 !important;
    border:0 !important;
    border-radius:50px !important;
  }
  /*精选主题*/
  .h-zhuti{
    /*border:1px solid #f00;*/
    text-align:center;
    padding:15px 0;
    color:#666;
  }
  /*发现公寓*/
  .find-gy{
    /*border:1px solid #f00;*/
    position:relative;
  }
  .find-gyin{
    /*border:1px solid #0f0;*/
  }
  .find-gyin>img{
    /*border:1px solid #ff0;*/
    width:100%;height:200px;
  }
  /*心、价格*/
  .x-tianjia,.find-gyin>span{
    position:absolute;
  }
  .find-gyin>span{
    top:170px;left:0%;
    /*border:1px solid #f00;*/
    width:60px;height:30px;
    line-height:30px;
    color:#fff;
    background-color:rgba(0,0,0,.5);
    text-align:center;
  }
  .x-tianjia{
    top:8%;right:5%;
    background-color:rgba(0,0,0,.4);
    border-radius:50%;
    width:36px;height:36px;
  }
  .x-tianjia>span{
    margin:7px 6px;
    color:#fff;
  }
  /*头像*/
  .H-use{
    /*border:1px solid #f00;*/
    width:50px;height:50px;
    border-radius:50%;
    overflow:hidden;
    position:absolute;
    right:8%;top:55%;
    box-shadow:0 0 2px 2px #fff;
  }
  .H-use>img{
    width:100%;height:100%;
  }
  /*文字*/
  .find-gyin>p{
    /*border:1px solid #00f;*/
    text-indent:1em;
    overflow: hidden;
    text-overflow:ellipsis;
    width:100%;
  }
  .H-text1{
    font-weight:bold !important;
    color:#000;
    font-size:18px !important;
    height:30px;
    line-height:30px;
  }
  .H-text2,.H-text3{
    text-indent:1.5em !important;
  }
  .H-text2{
    font-size:12px;
  }
  .H-text3{
    color:#000;
  }
  .H-text3>span{
    /*border:1px solid #f00;*/
    margin-right:20px;
  }
  .H-text3>span:first-child{
    color:#f68e23;
  }
  /*加载更多*/
  .mtg{
    margin:0 !important;
  }
  

</style>