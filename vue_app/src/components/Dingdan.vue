<template>
  <div class="app-dingdan">
    
    <!--头-->
    <mt-header title="我的订单">
      <router-link to="/Home" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link> 
      <!--三横按钮-->
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <!--订单内容-->
    <!--i下标-->
    <div class="dingn" v-for="(item,i) of allding" :key="item.id">
      <!--订单卡-->
      <div class="dingn-ka">
        <!--复选框-->
        <div id="checkbox">
          <input type="checkbox" class="cb" id="c1" :checked="item.cb" @change="modifyItem" :data-i="i" />
          <!--改变复选框样式-->
          <label for="c1"></label>
        </div>
        <div class="dingn-kain">
          <!--跳转-->
          <router-link to="/Hgongyu1">
            <!--订单图片url-->
            <img :src="item.tj_durl" />
          </router-link>
          <!--订单名-->
          <h4>{{item.tj_title}}</h4>
          <!--订单价格-->
          <p>￥<strong class="olp">{{item.tj_dprice}}</strong></p>
          <!--订单量-->
          <div class="dingn-kainl">
            <div class="mui-numbox">
				      <button :data-id="item.tj_cid" class="mui-btn mui-btn-numbox-minus" type="button" @click="Djleft">-</button>
              <span id="test" class="mui-input-numbox ccot">{{item.tj_count}}</span>
				      <button :data-id="item.tj_cid" class="mui-btn mui-btn-numbox-plus" type="button" @click="Djright">+</button>
				    </div>
            天
          </div>
          <!--删除按钮-->
          <!--:data-id="item.tj_cid"获取本条数据的id，即数据库中的tj_cid-->
          <button class="shan" @click="RemoveItem" :data-id="item.tj_cid">{{dtext1}}</button>
        </div>   
      </div>
    </div>

    <!--离底部距离-->
    <div class="bottomjl"></div>

    <!--全选-->
    <!--全选按钮-->
    <div class="dingn-quan">
      <div id="checkbox">
        <!--全选框-->
        <input type="checkbox" class="cb" id="c1" @change="selectAll" :checked="allcb" />
        <label for="c1"></label>
      </div>
      <h4>{{dtext2}}<span>{{total.toFixed(2)}}</span><b class="bbn"></b></h4>
      <button @click="removeSelect">{{dtext3}}</button>
      <button @click="jiesuan">{{dtext4}}</button>
    </div>

    <!--结算弹出框-->
    <div class="jiesuan">
      {{dtext5}}{{prices}}{{dtext6}}
      <button @click="guanx">X</button>
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
        allding:"",//绑定订单数据
        // spanl:1,//绑定订单量初始数据
        allcb:false,//全选状态 默认未选中
        bnm:0,//总价的初始状态
        prices:"",//消费额
        dtext1:"删除订单",
        dtext2:"总价：￥",
        dtext3:"删除全部",
        dtext4:"结算订单",
        dtext5:"感谢您的惠顾,您一共消费",
        dtext6:"元"
      }
    },
    name:'home',
    components: {
      HomeCe
    },
    created() {
      // 组件创建成功后直接调用
      this.AllDingDan();//订单数据卡
    },
    methods: {
      // 关闭订单弹出框
      guanx() {
        var vm = document.querySelector(".jiesuan");
        vm.style.display = "none";
      },
      // 结算订单
      jiesuan(e) {
        var sum = e.target.previousSibling.previousSibling.children[0].innerHTML;
        this.prices = sum;
        var kj = document.querySelector(".jiesuan");
        // console.log(kj);
        kj.style.display = "block";
      },
      // 订单数据
      AllDingDan() {
        var url = "http://127.0.0.1:3200/Dingdan";
        this.axios.get(url).then(result=>{
          // console.log(result.data.data.length); 
          if(result.data.code < 1){
            this.$toast("请登录");
            this.$router.push({path:"/Login"});
            return;
          }
          if(result.data.data.length == 0){
            this.$toast("订单内没有订单了，记得添加订单哟！");
          }
          if(result.data.code==1){
            // 为数组元素添加cb复选框状态
            var rows = result.data.data;
            for(var item of rows){
              item.cb = false;//决定复选框状态是否为checked
            }
            this.allding = rows;
          }else{
            this.show=false;
          }
        })
      },
      // 删除单个订单
      RemoveItem(e) {
        // 确认是否删除
        this.$messagebox.confirm("确认是否删除订单？").then(action=>{
          // 选择确认删除订单
          // console.log(e.target.dataset.id)
          var tjcid = e.target.dataset.id;/*id是不变的,自己加的data-id所带的*/
          // console.log(tjcid);
          var url = "http://127.0.0.1:3200/removeitem?id="+tjcid;
          this.axios.get(url).then(result=>{
            if(result.data.code == 1){
              this.$toast("删除成功");
              // 删除成功后网页内容重新加载
              this.AllDingDan();
            }else{
              this.$toast("删除失败");
            }
          })
        }).catch(result=>{
          // console.log("取消");
        }) 
      },  
      // 删除多个订单
      removeSelect(){
        //console.log("删除选中的商品");
        //-1:显示确认框 "是否删除选中商品"
        this.$messagebox.confirm("是否删除选中商品?").then(action=>{
          // console.log("确认")
          //-2:如果用户选中 确认
          //2.1:获取用户选中商品
          //-创建变量保存删除商品 ids = ""
          var ids = "";
          //-创建循环遍历数组
          for(var item of this.allding){
            if(item.cb){
              ids += item.tj_cid+",";
            }
          }
          // console.log(ids);
          //-如果用户没有选中商品,停止删除操作
          if(ids.length==0){
            this.$toast("请选中您需要删除的商品");
            return;
          }
          //-如果用户选中多个商品 1,2, 去除后面
          //substring(?,?) 截取字符串
          //? 起始位置
          //? 几个
          ids =  ids.substring(0,ids.length-1);
          //console.log(ids);
          //return;
          //-如果当前元素cb:true
          //-获取当前元素id拼字符串 ids+="1"
          //2.2:创建变量  var ids = "11,12";
          //var ids = "1,2";
          //2.3:发送ajax请求给服务器 /delM
          var url = "http://127.0.0.1:3200";
          url+="/delM?ids="+ids;
          this.axios.get(url).then(result=>{
            //console.log(result.data.msg);
            //2.4:接收服务器返回结果 56
            //2.5:提示   删除成功 或者删除失败
            this.$toast(result.data.msg);
            //2.6:重新加载购物车数据
            this.AllDingDan();
          })
        }).catch(result=>{
          // console.log("取消")
        });
      },
      // 选择单个订单
      modifyItem(e) {
        //功能:如果用户选中商品，将当前商品对应对象
        //     cb=true
        //     如果用户取消选中 将当前商品对应对象
        //     cb=false 50
        //1:获取当前元素选中状态
        var cb = e.target.checked;
        // console.log(cb);
        // console.log("选中状态"+cb);
        //2:获取当前元素对应商品对象
        //2.1:获取当前元素下标   01
        var i = e.target.dataset.i;
        // console.log(i);
        // console.log("当前元素下标"+i);
        //2.2:将数组下标对象//3:修改商品对象cb 属性
        this.allding[i].cb = cb;
        // console.log("修改后选中状态"+this.allding[i].cb);
        // console.log(this.allding);
        //4:修改全选状态 true fales  17:32
        //4.1:如果完成  累加计算
        //4.2:创建变量count 保存累加和
        var count = 0;
        //4.3:创建循环遍历所有元素
        //4.4:获取cb如果值等于true count++
        for(var item of this.allding){
          if(item.cb){
            count++;
            this.n=count;
          }
        }
        // console.log(count);
        // console.log(this.allding.length);
        // console.log(this.allcb);
        // console.log(1111);
        //4.5:如果count个数与数组长度一致
        //4.6:将全选复选框选中
        //4.7:否则清空全选复选框
        if(count == this.allding.length){
          // console.log("全选选中");
          this.allcb = true;
          // console.log(this.allcb);
          this.n=count;
        }else{
          //console.log("全选消空");
          this.allcb = false;
        }
      },
       // 选中多个订单
      selectAll(e){ 
        // this.bnm = 0;
        //console.log(12345);
        //1:获取全选状态
        var cb = e.target.checked;//当前元素触发状态
        // console.log(cb);
        //2:遍历所有商品
        //3:将全选状态赋值商品选中状态
        for(var item of this.allding){
          item.cb = cb;
        }
        //4:修改全选状态
        this.allcb = cb;  
      },
      // 订单数量减
      Djleft(e) {
        // // nextSibling获取下一兄弟节点
        // var ddn = e.target.nextSibling.innerHTML;
        // // console.log(ddn);
        // // console.log(e.target.nextSibling);
        // if(e.target.nextSibling.innerHTML > 1){
        //   ddn--;
        //   e.target.nextSibling.innerHTML = ddn;
        // }
        // console.log(e.target.nextSibling.innerHTML-1);
        if(e.target.nextSibling.innerHTML-1==0){
          this.$toast("就剩一天了，不能再点了哦！");
          return;
        }
        var cid = e.target.dataset.id;
        // console.log(cid);
        this.axios.get("http://127.0.0.1:3200/down",{
          params:{cid}
        }).then(res=>{
          if(res.data.code==1){
            this.AllDingDan();
          }
        })
      },
      // 订单数量增
      Djright(e) {
        // // previousSibling获取上一兄弟节点
        // var ddn = e.target.previousSibling.innerHTML;
        // // console.log(ddn);
        // // console.log(e.target.previousSibling);
        // ddn++;
        // e.target.previousSibling.innerHTML = ddn;
          var cid = e.target.dataset.id;
          // console.log(cid);
          this.axios.get("http://127.0.0.1:3200/add",{
            params:{cid}
          }).then(res=>{
            if(res.data.code==1){
              this.AllDingDan();
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
    computed: {//用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
      total(){
        var total=0;
        for(var i=0;i<this.allding.length;i++){
          var item=this.allding[i];
          if(item.cb){
            total+=Number(item.tj_dprice)*Number(item.tj_count);
          }
        }
        return total;
      }
    },
  }
</script>

<style scored>
  /*结算额*/
  .jiesuan{
    position:fixed;
    top:35%;left:35%;
    border-radius:10px;
    background-color:rgba(250,110,10,.8);
    width:35%;
    font-size:14px;
    color:#fff;
    text-align:center;
    padding:15px;
    display:none;
  }
  .jiesuan button{
    background-color:transparent;
    border:0;
    color:#fff;
    position:absolute;
    right:-5%;top:0;
  }
  /*离底部距离*/
  .app-dingdan .bottomjl{
    margin-top:50px;
  }
  /*订单卡*/
  .app-dingdan .dingn{
    border:1px solid transparent;
    margin-bottom:10px;
    position:relative;
  }
  .app-dingdan .dingn:after{
    content:"";
    display:block;
    clear:both;
  }
  .app-dingdan .dingn .dingn-ka .dingn-kain{
    /*border:1px solid #f00;*/
    float:right;
    width:90%;
    margin-top:-11px;
    margin-right:5px;
    box-shadow:0 0 2px 2px #ddd;
    border-radius:10px;
  }
  /*订单图片*/
  .app-dingdan .dingn .dingn-ka .dingn-kain img{
    width:100%;height:120px;
    border-radius:10px;
  }
  /*订单名*/
  .app-dingdan .dingn .dingn-ka .dingn-kain h4{
    width:100%;
    /*border:1px solid #f00;*/
    font-size:16px;
    margin:15px 0;
  }
  /*订单价格*/
  .app-dingdan .dingn .dingn-ka .dingn-kain p{
    /*border:1px solid #f00;*/
    width:20%;height:25px;
    float:left;
    padding-top:5px;
  }
  /*订单量*/
  .app-dingdan .dingn .dingn-ka .dingn-kain .dingn-kainl{
    /*border:1px solid #f00;*/
    width:48%;
    float:left;
    color:rgba(0,0,0,.5);
    font-size:12px;
  }
  .app-dingdan .dingn .dingn-ka .dingn-kain .dingn-kainl .mui-numbox{
    border:0;
    height:25px;
  }
  .app-dingdan .dingn .dingn-ka .dingn-kain .dingn-kainl .mui-numbox span{
    border:0 !important;
    display:inline-block;
    height:25px;
    padding-top:2px !important;
  }
  /*删除订单*/
  .app-dingdan .dingn .shan{
    float:right;
    background-color:#ff9645;
    color:#fff;
    border:0;
    margin:-5px 5px;
  }
  /*全选*/
  .app-dingdan .dingn-quan{
    /*border:1px solid #f00;*/
    position:fixed;
    bottom:0%;
    width:100%;height:40px;
    background-color:#e5e1e1;
  }
  .app-dingdan .dingn-quan #checkbox input,.app-dingdan .dingn-quan h4{
    float:left;
  }
  .app-dingdan .dingn-quan h4{
    margin:0 0 0 12%;
    /*border:1px solid #f00;*/
    color:#ff9645;
  }
  .app-dingdan .dingn-quan button{
    background-color:#ff9645;
    color:#fff;
    border:0;
    height:40px;
    float:right;
    margin-top:-12px; 
    margin-left:5px;
  }
  .app-dingdan #checkbox{
    margin:12px;
    position:relative;
  }
  .app-dingdan #checkbox .cb{
    position:absolute;
    visibility:hidden;
  }
  .app-dingdan #checkbox .cb+label{
    position:absolute;
    width:18px;height:18px;
    border:2px solid #ff9645;
    border-radius:50%;
    background-color:transparent;
    left:-5px;top:-2px;
  }
  .app-dingdan #checkbox .cb:checked+label:after{
    content:"";
    position:absolute;
    left:1px;top:1px;
    width:9px;height:4px;
    border:2px solid #ff9645;
    border-top-color:transparent;
    border-right-color:transparent;
    transform:rotate(-45deg);
  }
</style>