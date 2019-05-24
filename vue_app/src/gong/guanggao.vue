<template>
  <div>

    <!--广告-->
    <div class="home-guangao">
      <span @click="GuanBi">×</span>
      <img src="http://127.0.0.1:3200/home/top01.png" />
      <div>
        <p>{{gtext1}}</p>
        <p>{{gtext2}}</p>
      </div>
      <input type="submit" value="立即下载" @click="Down" />
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        gtext1:"住民宿,上途家",
        gtext2:"新用户下载APP,尽享新人专享红包"
      }
    },
    created() {
      
    },
    methods: {
      // 关闭广告
      GuanBi() {
        // 获取信息
        var Fdiv = document.querySelector(".home-guangao");
        // console.log(Fdiv);
        Fdiv.style.display = "none";
      },
      // 立即下载
      Down() {
        window.location.href = "https://m.tujia.com/d";
      },
    },
  }
</script>

<style scored>
  /*顶部广告*/
  .home-guangao>span,.home-guangao>img,.home-guangao>div,.home-guangao>input{
    float:left;
  }
  .home-guangao>span{
    font-size:40px;
    color:#fd8238;
    margin:18px 10px;
  }
  .home-guangao>img{
    margin:10px;
  }
  .home-guangao>div{
    margin-top:10px;
  }
  .home-guangao>div>p{
    margin:0;
    font-size:15px;
  }
  .home-guangao>div>p:nth-child(1){
    font-weight:bold;
  }
  .home-guangao>div>p:nth-child(2){
    font-size:2px;
  }
  .home-guangao>input{
    background-color:#fd8238 !important;
    border:0 !important;
    border-radius:5px !important;
    margin:15px 5px;
  }
</style>