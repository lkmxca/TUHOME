<template>
  <div>

    <!--背景变为浅灰色-->
    <div class="allbg"></div>

    <!--侧栏菜单-->
    <div class="right-nav">
      <input type="button" value="X" @click="GuanNav" />
      <ul class="ul-teo">
        <!--
        <li><span class="mui-icon mui-icon-home"></span>首页</li>
        <li><span class="mui-icon mui-icon-location"></span>搜索附近</li>
        <li><span class="mui-icon mui-icon-person"></span>登录/注册</li>
        <li><span class="mui-icon mui-icon-email"></span>意见反馈</li>
        -->
        <li v-for="item of rightnav" :key="item.id">
          <router-link :to="item.link">
            <span :class="item.class"></span>
            {{item.text}}
          </router-link>
        </li>
      </ul>
      <P class="ttop">{{yonghuming}}<span @click="DeleteT">{{tuil}}</span></p>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
         rightnav:"",//绑定侧栏菜单
         yonghuming:"",//用户名
         tuil:"退出",
      }
    },
    created() {
      this.RightNav();//侧栏菜单
      this.DeleteO();//获取用户名
    },
    methods: {
       // 退出用户
      DeleteT() {
        sessionStorage.removeItem("loginName");
        this.yonghuming = "";
        var url = "http://127.0.0.1:3200/delroot";
        this.axios.get(url).then(result=>{
          if(result.data.code == 1){
            this.$toast("退出成功");
          }
        })
      },
      // 获取用户名
      DeleteO() {
        // var url = "http://127.0.0.1:3200/Del";
        // this.axios.get(url).then(result=>{
        //   if(result.data.code == 1){
        //     this.$toast("已退出");
        //   }else{
        //     this.$toast("请先登录");
        //   }
        // })
        // 1:获取sessionStorage用户名
        var n = sessionStorage.getItem("loginName");
        // console.log(n);
        var ttop = document.querySelector(".ttop");
        this.yonghuming = n ;
      },
      // 关闭菜单
      GuanNav() {
        // 获取信息
        var Fdiv = document.querySelector(".right-nav");
        var All = document.querySelector(".allbg");
        // console.log(Fdiv);
        Fdiv.style.right = "-200px";
        All.style.display = "none";
      },
      // 侧栏菜单
      RightNav() {
        var url = "http://127.0.0.1:3200/rightnav";
        this.axios.get(url).then(result=>{
          this.rightnav = result.data.data;
          // console.log(result.data.data);
        })
      },
    },
  }
</script>

<style scored>
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
  .right-nav>p{
    /*border:1px solid #f00;*/
    text-align:center;
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