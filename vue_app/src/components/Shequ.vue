<template>
  <div class="app-shequ">
    
    <!--头-->
    <mt-header title="意见社区">
      <router-link to="/Ldear" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link> 
      <!--三横按钮-->
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <!--意见内容-->
    <div class="section" v-for="item of yijian" :key="item.id">
      <!--头像-->
      <img :src="imgchange" />
      <!--昵称与时间-->
      <P>
        <span>{{item.tj_yname}}</span>
        <span>{{item.tj_ydate}}</span>
      </p>
      <!--意见-->
      <p>{{item.tj_ytext}}</p>
    </div>


    <!--侧栏菜单和背景变灰色-->
    <home-ce></home-ce>

  </div>
</template>

<script>
  import HomeCe from "../gong/celan";
  export default {
    data() {
      return {
        imgchange:"",//头像
        yijian:"",//意见
      }
    },
    name:'home',
    components: {
      HomeCe
    },
    created() {
      // 组件创建成功后直接调用
      this.ImgChange();//头像
      this.YiJian();//意见
    },
    methods: {
      // 意见
      YiJian() {
        var url = "http://127.0.0.1:3200/Cyi";
        this.axios.get(url).then(result=>{
          this.yijian = result.data.data;
        })
      },
      // 头像
      ImgChange() {
        var schange = Math.floor(Math.random()*10)+1;
        // console.log(schange);
        var vc = "http://127.0.0.1:3200/yijian/tou"+schange+".png";
        // console.log(vc);
        this.imgchange = vc;
        // console.log(this.imgchange);
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
    },
  }
</script>

<style scored>
  .app-shequ .section{
    /*border:1px solid #f00;*/
    padding:10px;
    margin:5px 0;
    box-shadow:0 0 2px 2px #ddd;
  }
  .app-shequ .section:after{
    content:"";
    display:block;
    clear:both;
  }
  .app-shequ .section img{
    width:50px;height:50px;
    border-radius:50%;
    padding:4px;
    border:1px solid #fd8238;
    float:left;
    margin:0 10px 10px 0;
  }
  .app-shequ .section p:nth-child(2){
    /*border:1px solid #0f0;*/
    width:83%;
    float:left;
    margin-top:4px;
  }
  .app-shequ .section p:nth-child(2) span{
    display:block;
  }
  .app-shequ .section p:nth-child(2) span:nth-child(1){
    font-size:14px;
    color:#fd8238;
  }
  .app-shequ .section p:nth-child(2) span:nth-child(2){
    font-size:8px;
  }
  .app-shequ .section p:nth-child(3){
    clear:both;
    /*border:1px solid #f00;*/
    text-indent:2em;
    padding:0 10px;
  }
</style>