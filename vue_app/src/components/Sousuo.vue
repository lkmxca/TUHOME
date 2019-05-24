<template>
  <div class="app-sou">
    
    <!--头-->
    <mt-header title="搜索">
      <router-link to="/Home" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <!--搜索框-->
    <div class="sousu">
      <router-link to="">
        <input type="text" placeholder="地址/店名" class="btn-input" />
        <span class="mui-icon mui-icon-search" @click="BtnInp"></span>
      </router-link>
    </div>

    <!--提示-->
    <div class="souji">
      <div>
        <span>{{sttxt1}}</span>
        <span>{{sttxt2}}</span>
        <span>{{sttxt3}}</span>
      </div>
    </div> 

    <!--内容显示-->
    <div class="Soun">
      <div v-for="item of ssuo" :key="item.id">
        <!--图片-->
        <router-link :to="item.tj_link">
          <img :src="item.tj_imgurl" />
        </router-link>
        <!--店名-->
        <h4>{{item.tj_text1}}</h4>
        <P>
          <!--价格-->
          <span>￥{{item.tj_price}}</span>
          <!--二级文-->
          <span>{{item.tj_text2}}</span>
        </p>
      </div>
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
        ssuo:"",//查询数据
        sttxt1:"北京",
        sttxt2:"成都",
        sttxt3:"花莲",
      }
    },
    name:'home',
    components: {
      HomeCe
    },
    created() {

    },
    methods: {
      // 查询按钮
      BtnInp() {
        var btnin = document.querySelector(".btn-input");
        // console.log(btnin);
        // console.log(btnin.value);
        var ttx = btnin.value;
        // console.log(ttx);
        // this.jiju = ttx;
        var url = "http://127.0.0.1:3200/Souu?text="+ttx;
        this.axios.get(url).then(result=>{
          if(result.data.code == 1){
            this.$toast("查询成功");
            this.ssuo = result.data.data;
          }else{
            this.$toast("您搜索的暂时还未上架,请搜索其他店家");
          }
        })
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
  /*搜索记录*/
  .app-sou .souji{
    /*border:1px solid #f00;*/
    width:90%;
    margin:2px 5%;
  }
  .app-sou .souji::after{
    content:"";
    display:block;
    clear:both;
  }
  .app-sou .souji div{
    width:100%;
  }
  .app-sou .souji span{
    display:block;
    border:1px solid #aaa;
    color:#ddd;
    width:19%;
    float:left;
    font-size:.5rem;
    text-align:center;
    margin:5px 0 5px 1%;
  }
  /*搜索内容*/
  .app-sou .Soun{
    /*border:1px solid #f00;*/
  }
  .app-sou .Soun>div{
    /*border:1px solid #f00;*/
  }
  .app-sou .Soun>div a img{
    /*border:1px solid #0f0;*/
    height:160px;width:90%;
    margin:0 5%;
    border-radius:10px;
  }
  .app-sou .Soun>div h4{
    width:100%;
    /*border:1px solid #ff0;*/
    padding:0 5%;
  }
  .app-sou .Soun>div p{
    width:100%;height:40px;
    line-height:40px;
    /*border:1px solid #f0f;*/
    padding:0 5%;
  }
  .app-sou .Soun>div p span{
    display:inline-block;
    height:40px;line-height:40px;
    /*border:1px solid #000;*/
  }
  .app-sou .Soun>div p span:nth-child(1){
    float:left;
    width:20%;
    color:#fd8238;
  }
  .app-sou .Soun>div p span:nth-child(2){
    float:right; 
    width:80%;
  }
  /*搜索框*/
  .app-sou .sousu{
    /*border:1px solid #f00;*/
    margin: 0 5%;
    position:relative;
  }
  .app-sou .sousu a{
    color:#000;
  }
  .app-sou .sousu input{
    width:100%;
    border-radius:10px;
  }
  .app-sou .sousu span{
    position:absolute;
    top:15%;right:4%;
  }
  /*侧栏菜单*/
  .right-nav{
    width:200px;height:100%;
    /*border:1px solid #f00;*/
    position:fixed;
    top:0;right:-200px;
    background-color:#fff;
  }
  /*关闭按钮*/
  .right-nav>input{
    border:0 !important;
    float:right;
    font-size:20px !important;
    color:#666 !important;
    margin:5px 0;
  }
  .right-nav>ul{
    clear:both;
    list-style:none;
    font-family:"新宋体";
    font-size:14px;
    /*border:1px solid #f00;*/
    width:60%;
    margin:auto;
    padding-left:0;
  }
  .right-nav>ul>li{
    margin:20px 0;
    width:100%;
    /*border:1px solid #f00;*/
  }
  .right-nav>ul>li>span{
    margin-right:10px;
  }
  .right-nav>ul>li:nth-child(2){
    border-bottom:1px solid #ddd;
    padding-bottom:40px;
    margin-bottom:30px;
  }
  .right-nav>ul>li:nth-child(3){
    margin-bottom:50px;
  }
  .right-nav>ul>li>a{
    color:#000;
  }
  /*背景变为浅灰色*/
  .allbg{
    background-color:rgba(0,0,0,.5);
    width:100%;height:100vh;
    position:fixed;
    top:0;
    display:none;
  }
</style>