<template>
  <div class="app-ldear">
    
    <!--头-->
    <mt-header title="意见反馈">
      <router-link to="/Home" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link> 
      <!--三横按钮-->
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <h4>{{ltt}}</h4>

    <!--提交意见表单-->
    <div class="section">
      <form>
        <p><strong>昵称：</strong><input type="text" placeholder="请输入4到8位中文汉字" v-model="yname" /></p>
        <!--row可见行数  cols可见宽度-->
        <P><strong>意见：</strong><textarea row="3" cols="20" maxlength="200" onchange="this.value=this.value.substring(0,200)" onkeydown="this.value=this.value.substring(0,200)" onkeyup="this.value=this.value.substring(0,200)" placeholder="请输入至多200字" v-model="ytext"></textarea></p>
        <!--提交按钮-->
        <p><input type="submit" @click="TTj" /></p>
      </form>
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
        yname:"",//绑定昵称
        ytext:"",//绑定意见
        ltt:"请提出您的意见，使我们加以改正"
      }
    },
    name:'home',
    components: {
      HomeCe
    },
    created() {
      // 组件创建成功后直接调用
    },
    methods: {
      // 提交
      TTj() {
        // 获取输入昵称与意见
        var yname = this.yname;
        var ytext = this.ytext;
        // 获取日期与时间
        var myDate = new Date();
        var vv = myDate.toLocaleString();
        // console.log(yname,ytext,vv);
        // 昵称规则
        var guin = /^[\u4e00-\u9fa5]{4,8}$/;
        if(!guin.test(yname)){
          this.$toast("昵称不符合规则,请重新输入");
          return;
        }
        if(ytext.length == 0){
          this.$toast("不能为空,请重新输入");
          return;
        }
        var url = "http://127.0.0.1:3200/Yijian?yn="+yname+"&yt="+ytext+"&ys="+vv;
        this.axios.get(url).then(result=>{
          if(result.data.code == 1){
            this.$toast("提交成功");
          }else if(result.data.code > 1){
            this.$toast("请先登录");
          }else{
            this.$toast("提交失败");
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
  .app-container .app-ldear{
    /*border:1px solid #f00;*/
    height:100vh;
    background:url("http://127.0.0.1:3200/yijian/bg.png") no-repeat center bottom;
  }
  .app-ldear h4{
    color:#fd8238;
    margin:5% 0;
    text-align:center;
  }
  .app-ldear .section{
    /*border:1px solid #f00;*/
    padding:10px 15px;
  }
  .app-ldear .section form{
    /*border:1px solid #0f0;*/
    margin-top:10%;
  }
  .app-ldear .section form p{
    /*border:1px solid #00f;*/
    height:70px;
    position:relative;
  }
  .app-ldear .section form input,.app-ldear .section form textarea{
    width:80%;
  }
  .app-ldear .section form strong{
    width:20%;height:70px;
    line-height:70px;
    display:inline-block;
    text-align:center;
    /*border:1px solid #f00;*/
  }
  .app-ldear .section form p:nth-child(2) strong{
    position:absolute;
    top:0;
  }
  .app-ldear .section form textarea{
    position:absolute;
    right:0%;
  }
  .app-ldear .section form p:last-child input{
    width:40%;
    margin:10px 30%;
    background-color:#fd8238;
    border:0;
    border-radius:10px;
  }
</style>