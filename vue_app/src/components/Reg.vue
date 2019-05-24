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
        <h1>{{retxt1}}</h1>
        <h6>{{retxt2}}</h6>
        <form>
          <input type="tel" placeholder="输入手机号" v-model="phone" />
          <div class="pw-eye">
            <input type="password" placeholder="输入6~12位字母数字密码"   autocomplete='password' class="inp-pwd" v-model="password" />
          </div>
          <input type="submit" value="注册" class="input-res" @click="Zcjj" />
          <router-link to="/Login">
            <input type="submit" value="登录" class="input-res" />
          </router-link>
        </form>
        <p class="a-xieyi">
          {{retxt3}}<br/>&lt&lt<a href="https://passport.tujia.com/H5Site/ServicePage">{{retxt4}}</a>&gt&gt&lt&lt<a href="https://pwa.tujia.com/h5/mob/protocol/registerprivacy">{{retxt5}}</a>&gt&gt
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
        retxt1:"注册途家",
        retxt2:"新用户登录机自动注册途家账号",
        retxt3:"注册代表你已同意",
        retxt4:"途家网服务协议",
        retxt5:"隐私政策",
      }
    },
    created() {

    },
    methods: {
      Zcjj() {
        // 正则表达式
        var guizePH = /^1[34578]\d{9}$/;//手机号
        var guiziPW = /^[a-zA-Z0-9]{6,12}$/;//密码
        // 获取用户输入手机号,密码
        var p = this.phone;
        var pw = this.password;
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
        var url = "http://127.0.0.1:3200/reg?phone="+p+"&pwd="+pw;
        this.axios.get(url).then(result=>{
          // console.log(result.data.code);
          if(result.data.code == 1){
            this.$toast("注册成功");
            // 跳转页面
            this.$router.push({path:"/Login"});
          }else if(result.data.code < 1){
            this.$toast("手机号或者密码有误");
          }else{
            this.$toast("该手机号已注册")
          }
        }) 
      },
    },
  }
</script>

<style scored>
  
</style>