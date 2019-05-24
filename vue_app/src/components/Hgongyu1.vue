<template>
  <div class="app-hongyu1">
    
    <!--广告-->
    <home-gao></home-gao>

    <!--头-->
    <mt-header title="房屋详情">
      <router-link to="/Home" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link> 
      <!--三横按钮-->
      <mt-button slot="right" class="mui-icon mui-action-menu mui-icon-bars mui-pull-right" @click="OpenNav"></mt-button>
    </mt-header>

    <!--房屋图文详情-->
    <div class="x-tuwen">
      <!--图片轮播-->
      <div class="tuwen-lun">
        <mt-swipe :auto="0" :show-indicators="false">  
            <mt-swipe-item v-for="item of arr" :key="item.id">
              <router-link :to="item.tj_link">
                <img :src="item.tj_imgurl" />
              </router-link> 
              <!--下方数量显示-->
              <P>{{item.tj_text}}</p>
            </mt-swipe-item>      
        </mt-swipe>
      </div>
      <!--分享按钮-->
      <router-link to="" class="btn1">
        <span class="mui-icon mui-icon-upload"></span>
      </router-link>
      <!--心形按钮-->
      <router-link to="" class="btn2">
        <span class="mui-icon-extra mui-icon-extra-heart-filled"></span>
      </router-link>
      <!--下方文字介绍-->
      <div class="tuwen-text">
        <h4>{{hhtxt1}}</h4>
        <P><span>{{hhtxt2}}</span>{{hhtxt3}}<span>▶</span></p>
      </div>
    </div>

    <!--九宫格-->
    <div class="mui-content jjhg">
		  <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 ghv" v-for="item of xgongyu" :key="item.id">
          <!-- 运用跳转标签router-link直接跳转,to后跟跳转路径,不是首选项,需有a标签 -->
		      <img :src="item.img_url" class="imgg" />
		      <div class="mui-media-body">
            <p>{{item.title1}}</p>
            <p>{{item.title2}}</p>
          </div>
        </li>
      </ul>
		</div>

    <!--房东-->
    <div class="fangdong">
      <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="http://127.0.0.1:3200/hgongyu/toux.jpg">
						<div class="mui-media-body">
							<strong>犀牛之家</strong>
							<p class='mui-ellipsis'>{{hhtxt6}}</p>
						</div>
					</a>
				</li>
        <!--总评价-->
        <div class="pngjia">
          <li class="mui-table-view-cell mui-media">
					  <a class="mui-navigate-right">
              <img class="mui-media-object mui-pull-left" src="http://127.0.0.1:3200/hgongyu/pfen.png">
					  	<div class="mui-media-body">
                <strong>★★★★★</strong>
					  		<p class='mui-ellipsis'>超赞！<span>查看全部<em>19</em>条评论</span></p>
					  	</div>
					  </a>
				  </li>
        </div>
        <!--头评价-->
        <div class="oned">
          <div>
            <img src="http://127.0.0.1:3200/hgongyu/pt.png" />
            <P>小***沐</P>
            <P>2019-01-21点评</P>
          </div>
          <P>{{hhtxt4}}</p>
        </div>
			</ul>
    </div>

    <!--房屋详情-->
    <div class="fwxxx">
      <h4>房屋详情</h4>
      <h5>房屋描述</h5>
      <P class="fw-mm">{{hhtxt5}}</p>
      <!--展开全部-->
      <button class="btn-he" @focus="Changeph1" @blur="Changeph2">
        展开全部
        <span class="mui-icon mui-icon-arrowdown"></span>
        <span class="mui-icon mui-icon-arrowup"></span>
      </button>
    </div>

    <!--设施服务-->
    <div class="ssvv">
      <h4>设施服务</h4>
      <!--九宫-->
      <div id="Gallery" class="mui-slider" style="margin-top:15px;">
				<div class="mui-slider-group">
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="item of ssvv" :key="item.id">
								<a href="javascript:;">
									<img :src="item.tj_imgurl"/>
									<div class="mui-media-body">{{item.tj_text}}</div>
								</a>
							</li>
						</ul>
					</div>
        </div>
      </div>
    </div>

    <!--入住须知-->
    <div class="rzhu">
      <h4>入住须知</h4>
      <img src="http://127.0.0.1:3200/hgongyu/rzhu.png" />
      <img src="http://127.0.0.1:3200/hgongyu/rzhu02.png" />
    </div>

    <!--格外费用-->
    <div class="ewai">
      <p><strong>额外费用</strong>额外费用不包含在总房费内，有房东线下收取</P>
      <p>加入：最大入住2人，不接受加人</P>
      <p>加床：不允许加床</P>
      <p>做饭：可做饭</P>
      <p>聚会：房间内不允许聚会</P>
      <p>摄影：允许商业拍摄</P>
      <P>其他：.</p>
    </div>

    <!--价格说明-->
    <div class="dprice">
      <img src="http://127.0.0.1:3200/hgongyu/dprice.png" />
    </div>

    <!--侧栏菜单和背景变灰色-->
    <home-ce></home-ce>
 
  </div>
</template>

<script>
  import HomeGao from "../gong/guanggao";
  import HomeCe from "../gong/celan";
  export default {
    data() {
      return {
        hhtxt1:"夫子庙新街口精装高层大飘窗巨幕亲子房",
        hhtxt2:"优选",
        hhtxt3:"·闪订·验真",
        hhtxt4:"超级棒，洗衣做饭都没有问题，床超级软，躺着刷电影超级舒服，房东人也炒鸡nice，问了很多问题都耐心回答了，下次来的话还住这",
        hhtxt5:"市中心新街口高层，房屋配有落地飘窗，房屋大阳台可看大蓝鲸景色，靠近夫子庙，临近新街口，靠近地铁一号线张府园站，出行游玩很方便，美的变频空调，24小时热水，百兆宽带，120寸巨幕投影，1.5双人床和0.9宽的单人宜家沙发床，可住三人",
        hhtxt6:"个人房东 · 实名认证",
        arr:[], //绑定房屋详情轮播图信息
        xgongyu:"",//绑定轮播下九宫格
        ssvv:"",//绑定设施详情
      }
    },
    name:'home',
    components: {
      HomeGao,HomeCe
    },
    created() {
      // 组件创建成功后直接调用
      this.Fwxq();//房屋详情轮播图
      this.Xgong();//轮播下九宫格
      this.Ssvv();//设施详情
    },
    methods:{
      // 设施详情
      Ssvv() {
        var url = "http://127.0.0.1:3200/ssfw";
        this.axios.get(url).then(result=>{
          this.ssvv = result.data.data;
          // console.log(this.ssvv);
        })
      },
      // 展开全部 获得焦点
      Changeph1() {
        // 获取信息
        var Cp = document.querySelector(".fw-mm");
        var Span1 = document.querySelector(".btn-he>span:nth-child(1)"); 
        var Span2 = document.querySelector(".btn-he>span:nth-child(2)"); 
        Cp.style.height = "107px";
        Span1.style.display = "none";
        Span2.style.display = "inline-block";
      },
      // 展开全部 失去焦点
      Changeph2() {
        // 获取信息
        var Cp = document.querySelector(".fw-mm");
        var Span1 = document.querySelector(".btn-he>span:nth-child(1)"); 
        var Span2 = document.querySelector(".btn-he>span:nth-child(2)"); 
        Cp.style.height = "45px";
        Span2.style.display = "none";
        Span1.style.display = "inline-block";
      },
      // 轮播下九宫格
      Xgong() {
        var url = "http://127.0.0.1:3200/hgongyux";
        this.axios.get(url).then(result=>{
          this.xgongyu = result.data.data;
          // console.log(this.xgongyu);
        })
      },
      // 房屋详情轮播图
      Fwxq() {
        var url = "http://127.0.0.1:3200/fwxq";
        this.axios.get(url).then(result=>{
        this.arr = result.data.data;
        // console.log(this.arr);
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
    } 
  }
</script>

<style scored>
  /*头*/
  .mint-header{
    border-bottom:0;
    height:48px !important;
  }
  .mint-header-title{
    background:none;
    color:#000;
    line-height:48px !important;
  }
  /*图文详情*/
  .x-tuwen{
    /*border:1px solid #f00;*/
    position:relative;
  }
  /*心按钮、分享按钮*/
  .x-tuwen .btn1,.x-tuwen .btn2{
    position:absolute;
    top:2%;
    color:#fff;
    /*border:1px solid #f00;*/
  }
  .x-tuwen>.btn2{
    right:5%;
  }
  .x-tuwen>.btn1{
    right:15%;
  }
  .x-tuwen .mint-swipe{
    height:250px !important;
  }
  /*图片*/
  .x-tuwen .tuwen-lun{
    /*border:1px solid #f00;*/
    position:relative;
    height:250px;
  }
  .x-tuwen .tuwen-lun p{
    background-color:rgba(0,0,0,.5);
    color:#fff;
    text-align:right;
    padding-right:20px;
    position:absolute;
    width:100%;height:30px !important;
    line-height:30px;
    bottom:0;
    margin-bottom:0;
  }
  /*下方文字描述*/
  .x-tuwen .tuwen-text>h4{
    text-indent:1em;
    padding:5px 0;
  }
  .x-tuwen .tuwen-text>p{
    text-indent:1.2em;
  }
  .x-tuwen .tuwen-text>p>span:nth-child(1){
    color:#fd8238;
  }
  .x-tuwen .tuwen-text>p>span:nth-child(2){
    font-size:5px;
    margin-left:2px;
  }
  /*九宫格*/
  .jjhg{
    margin-bottom:0;
  }
  .jjhg ul{
    background-color:#f7f9fb !important;
  }
  /*li高*/
  .jjhg .ghv{
    height:110px;width:120px;
    /*border:1px solid #f00 !important;*/
    margin:15px 0 15px 45px !important;
    padding-left:0 !important;
  }
  /*图片*/
  .jjhg .imgg{
    width:50%;height:30px;
    padding-left:15px;
  }
  /*里面div文字高*/
  .jjhg div{
    height:60px !important;width:120px !important;
    /*border:1px solid #f00 !important;*/
    margin-top:0 !important;
  }
  .jjhg div>p:nth-child(1){
    font-weight:bold;
    color:#000;
    margin:5px 0;
  }
  .jjhg div>p:nth-child(2){
    font-size:10px;
  }
  /*房东*/
  .fangdong img{
    border-radius:50%;
  }
  /*总评价*/
  .pngjia{
    /*border:1px solid #f00;*/
    width:80%;
    margin:15px auto;
    background-color:#fff9eb;
  }
  /*星星*/
  .pngjia strong,.pngjia p span em{
    color:#fd8238;
  }
  /*数量*/
  .pngjia p span{
    font-size:10px;
  }
  /*头点评*/
  .oned{
    /*border:1px solid #f00;*/
  }
  .oned>div{
    /*border:1px solid #f00;*/
    padding-bottom:5px;
  }
  .oned>div>img{
    width:40px;
    float:left;
    margin:5px 5px 5px 16px;
  }
  .oned>div>p{
    margin:5px 0 2px 0;
    color:#000;
  }
  .oned>div p:nth-child(2){
    font-weight:bolder;
  }
  .oned>div p:nth-child(3){
    font-size:5px;
  }
  .oned>P{
    clear:both;
    width:90%;
    font-size:12px;
    margin:auto;
  }
  /*房屋详情*/
  .fwxxx{
    /*border:1px solid #f00;*/
    padding:10px 15px;
  }
  .fwxxx>h4{
    margin-bottom:15px;
  }
  .fwxxx>h5{
    color:#000; 
    font-weight:bold;
    margin-bottom:10px;
  }
  .fwxxx>p{
    /*border:1px solid #f00;*/
    height:45px;width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .fwxxx>button{
    margin:0 35%;
    width:30%;
    border:0;
    color:#fd8238;
  }
  .fwxxx>button:focus{
    background-color:transparent !important;
  }
  .fwxxx>button>span:nth-child(2){
    display:none;
  }
  /*设施服务*/
  .ssvv{
    padding:15px;
  }
  .ssvv ul{
    background-color:transparent !important;
    border:0 !important;
  }
  .ssvv li{
    border:0 !important;
    width:25%;
  }
  .ssvv li img{
    width:50% !important;
  } 
  .ssvv li div{
    font-size:12px !important;
  }
  /*入住须知*/
  .rzhu{
    padding:15px;
    /*border:1px solid #f00;*/
  }
  .rzhu h4{
    padding-bottom:10px;
  }
  .rzhu img{
    margin:10px 15px;
  }
  /*额外费用*/
  .ewai{
    /*border:1px solid #f00;*/
    color:#000;
    background-color:#fff9eb;
    padding:15px;
  }
  .ewai strong{
    font-size:15px;
  }
  .ewai p{
    font-size:12px;
    text-indent:1em;
  }
  /*价格说明*/
  .dprice{
    padding:16px 25px;
  }
</style>