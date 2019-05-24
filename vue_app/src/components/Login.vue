<template>
  <div class="app-login">
  
    <!--头-->
    <mt-header title="">
      <router-link to="/Home" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link> 
    </mt-header>

    <!--主体内容-->
    <div class="vv-inf">
      <span class="button-yellow"></span>
      <div class="vv-in">
        <h1>{{logtxt1}}</h1>
        <h6>{{logtxt2}}</h6>
        <form>
          <input type="text" placeholder="输入手机号" v-model="phone" />
          <div class="pw-eye">
            <input type="password" placeholder="输入6~12位字母数字密码" autocomplete='password' class="inp-pwd" v-model="password" />
            <!--眼睛-->
            <a class="active" @click="eYedj"><span class="mui-icon mui-icon-eye"></span></a>
          </div>
          <input type="submit" value="登录" class="input-res" @click="loginDj" />
          <router-link to="/Reg">
            <input type="submit" value="注册" class="input-res" />
          </router-link>
        </form>
        <p class="a-xieyi">
          登录代表你已同意<br/>&lt&lt<a href="https://passport.tujia.com/H5Site/ServicePage">{{logtxt3}}</a>&gt&gt&lt&lt<a href="https://pwa.tujia.com/h5/mob/protocol/registerprivacy">{{logtxt4}}</a>&gt&gt
        </p>
      </div>
    </div>
    
  </div>
</template>

<script>
  // 在export之前引入需要组件,Toast提示框
  // import {Toast} from "mint-ui"
  export default {
    data(){
      return{
        phone:"",//绑定手机号
        password:"",//绑定密码
        logtxt1:"登录途家",
        logtxt2:"新用户登录机自动注册途家账号",
        logtxt3:"途家网服务协议",
        logtxt4:"隐私政策",
      }
    },
    methods: {
      loginDj(){
        // 正则表达式
        var guizePH = /^1[34578]\d{9}$/;//手机号
        var guiziPW = /^[a-zA-Z0-9]{6,12}$/;//密码
        // 获取用户输入手机号,密码
        var p = this.phone;
        var pw = this.password;
        // // 1:获取sessionStorage用户名
        // var n = sessionStorage.getItem("loginName");
        // // 将用户名保存sessionStroage中
        // sessionStorage.setItem("loginName",n);
        sessionStorage.setItem("loginName",p);
        // console.log(pw);
        // console.log(p);
        // 判断是否符合条件
        if(!guizePH.test(p)){
          this.$toast("手机号输入格式不正确，请检查");
          return;
        }
        // console.log(111);
        if(!guiziPW.test(pw)){
          this.$toast("密码格式输入不正确，请检查");
          return;
        }
        // 发送ajax请求
        var url = "http://127.0.0.1:3200/login?phone="+p+"&pwd="+pw;
         this.axios.get(url).then(result=>{
          // console.log(result.data.code);
          if(result.data.code == 1){
            this.$toast("登录成功");
            // 跳转页面
            this.$router.push({path:"/Home"});
          }else{
            this.$toast("手机号或者密码有误");
          }
        }) 
      },
      // 点击眼睛触发
      eYedj(){
        // 获取信息
        var inp = document.querySelector(".inp-pwd");
        // console.log(inp.type);
        // 修改格式
        inp.type = "text";
      },
    },
  }
</script>

<style scored>
  /*全局*/
  .app-container{
    background-color:#fff;
    height:100vh;
  }
  .app-login{
    margin-top:0px;
    padding:0 15px;
  }
  /*外框*/
  .vv-inf{
    /*border:1px solid #f00 !important;*/
    padding:0 25px;
  }
  .vv-inf:after{
    content:"";
    display:block;
    clear:both;
  }
  /*头框*/
  .button-yellow{
    width:8px;height:50px;
    background-color:#fd8238;
    display:inline-block;
    margin-left:-15px;
    box-shadow:2px 1px 2px 2px #fad1b8;
    float:left;
  }
  .vv-in{
    /*border:1px solid #f00;*/
    float:left;
    padding:0 5px;
    position:relative;
    width:99%;
  }
  .vv-in h1{
    font-family:"宋体" !important;
  }
  /*输入框*/
  .vv-in input{
    border:0 !important;
    border-bottom:1px solid #ddd !important;
    margin:15px 0;
  }
  /*眼睛*/
  .active{
    position:absolute;
    top:26%;right:5%;
    color:#ddd;
  }
  .active>span:focus{
    color:#ddd !important;
  }
  /*登录按钮*/
  .input-res{
    background-color:#ddd !important;
    width:100%;
    border-radius:10px !important;
    height:50px !important;
    margin-bottom:15px !important;
  }
  /*协议*/
  .a-xieyi{
    font-size:12px;
    text-align:center;
    margin-top:200px;
  }
</style>