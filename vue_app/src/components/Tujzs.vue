<template>
  <div class="app-zhu">

    <!--锚点-->
    <router-link to="" class="tiaom"></router-link>

    <!--头-->
    <mt-header title="途家住宿">
      <router-link to="/Home" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link> 
      <!--三横按钮-->
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <!--住宿-->
    <div class="cont">
      <div class="cont-in" v-for="item of Rows" :key="item.id">
        <router-link :to="item.tj_link">
          <img class="turl" :src="item.tj_imgurl" />
          <div class="cont-int">
            <h4 class="twen">{{item.tj_text1}}</h4>
            <P>￥<strong class="tjia">{{item.tj_price}}</strong>-----<b>{{item.tj_count}}</b>晚<span>{{item.tj_text2}}</span></p>
          </div>
        </router-link>  
        <button @click="Tiann">{{httxt1}}</button>
      </div>
    </div>

    <!--加载更多-->
    <button @click="LoadMore" type="button" class="mui-btn mui-btn-warning mui-btn-block mtg kkl">{{httxt2}}</button>

    <!--到达顶部-->
    <router-link to="" class="zhu-top">
      <span class="mui-icon-extra mui-icon-extra-top" @click="Miao"></span>
    </router-link>
    
    <!--侧栏菜单和背景变灰色-->
    <home-ce></home-ce>

  </div>
</template>

<script>
  import HomeCe from "../gong/celan";
  export default {
    data() {
      return {
        Rows:[],//保存房屋服务器数据
        pno:0,//页码
        pageSize:4,//页大小
        hasMore:true,//房屋是否有下一页数据
        httxt1:"添加订单",
        httxt2:"加载更多",
      }
    },
    name:'home',
    components: {
      HomeCe
    },
    created() {
      // 组件创建成功后直接调用
      this.LoadMore();//房屋数据
    },
    methods: {
      // 添加订单
      Tiann(e) {
        // console.log(e.target);
        // console.log(e.target.parentNode.children[0].children[0].src);
        // 获取所需数据
        // parentNode获取父元素
        var twen = e.target.parentNode.children[0].children[1].children[0].innerHTML;
        var turl = e.target.parentNode.children[0].children[0].src;
        var tjia = e.target.parentNode.children[0].children[1].children[1].children[0].innerHTML;
        var tlks = e.target.parentNode.children[0].href.split("#")[1];
        var tshu = e.target.parentNode.children[0].children[1].children[1].children[1].innerHTML;
        console.log(tshu);
        // console.log(e.target.parentNode.children[0].href.split("#")[1]);
        // console.log(twen);
        // console.log(turl);
        // console.log(tjia);
        var url = "http://127.0.0.1:3200/TTian?tw="+twen+"&tu="+turl+"&tj="+tjia+"&tk="+tlks+'&tshu='+tshu;
        this.axios.get(url).then(result=>{
          if(result.data.code == 1){
            this.$toast("添加成功");
          }else if(result.data.code < 1){
            this.$toast("添加失败");
          }else{
            this.$toast("请先登录");
          }
          // console.log(result.data.code);
        })
      },
      // 锚点跳转顶部
      Miao() {
        document.querySelector(".tiaom").scrollIntoView(true);;
      },
      // 房屋数据
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
        var url = "http://127.0.0.1:3200/Tujiaw?pno="+this.pno;
        this.axios.get(url).then(result=>{
          //获取服务器端数据
          //console.log(result.data.data);
          //保存Rows
          // this.Rows = result.data.data;
          //console.log(this.Rows);
          //追加  concat添加
          // var rows = this.Rows.concat(result.data.data);
          // this.Rows = rows;
          this.Rows = result.data.data;
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
  /*房屋信息*/
  .app-zhu .cont{
    /*border:1px solid #f00;*/
    box-shadow:0 2px 2px 2px #ddd;
    padding:5px 10px;
  }
  .app-zhu .cont:after,.app-zhu .cont-int:after{
    display:block;
    content:"";
    clear:both;
  }
  .app-zhu .cont img{
    width:100%;height:160px;
    border-radius:10px;
  }
  .app-zhu .cont-int{
    /*border:1px solid #f00;*/
    width:100%;
    margin-bottom:5px;
  }
  .app-zhu .cont-int p{
    width:100%;height:30px;
    /*border:1px solid #f00;*/
    line-height:30px;
    color:#fd8238;
  }
  .app-zhu .cont-int h4{
    color:#000 !important;
    width:100%;
    /*border:1px solid #f00;*/
    line-height:25px;
  }
  .app-zhu .cont-int p span{
    /*border:1px solid #f00;*/
    display:inline-block;
    width:250px;height:100%;
    float:right;
    text-align:right;
    padding-right:15px;
    color:rgba(0,0,0,.4);
  }
  .app-zhu .cont-in button{
    border:0;
    color:#fd8238;
    float:right;
    margin-bottom:5px;
  }
  .app-zhu .cont-in button:focus{
    background-color:transparent !important;
    border:1px solid #fd8238;
  }
  /*加载更多*/
  .app-zhu .kkl{
    width:50% !important;
    margin:10px 25% 0 25% !important;
    height:40px;line-height:40px !important;
    padding:0 !important;
    background-color:transparent;
    color:#ddd;
    border:0;
  }
  .app-zhu .kkl:focus{
    background-color:transparent !important;
    color:#ddd !important;
    border:0 !important;
  }
  /*跳到顶部*/
  .app-zhu .zhu-top{
    position:absolute;
    bottom:3%;right:5%;
    border:1px solid #ddd;
    border-radius:50%;
    padding:5px;
    color:#8f8f94;
  }
</style>