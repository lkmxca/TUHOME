//app.js
//1:复制服务器端模块
//2:引入第三方模块
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
//2.1:引入跨域模块
const cors = require("cors");
//2.2:配置允许列表

//3:创建连接池
const pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"tujia"//引入库
})
//配置模块对象

//4:创建express对象
var server = express();
//4.1:配置允许列表3000允许
server.use(session({
  secret:"128位密钥",//添加密钥
  resave:true,//添加路有修改值为true
  saveUninitialized:true,//保存初始化数据
}));
// 跨域
server.use(cors({
  //origin允许访问列表
  origin:['http://127.0.0.1:8080','https://127.0.0.1:8080'],
  credentials:true//提高安全级别每次访问验证
}))

//5:绑定监听端口 3200
server.listen(3200);
//项目中所有图片放在服务器
server.use(express.static("public"));

// 6:注册请求
server.get("/reg",(req,res)=>{
  // 后跟ajax请求url上的
  var phone = req.query.phone;
  var pwd = req.query.pwd;
  var sql = "INSERT INTO tujia_use VALUES(NULL,?,md5(?))";
  pool.query(sql,[phone,pwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:-1,msg:"手机号或者密码错误"});
    }else{
      // console.log(result);
      res.send({code:1,msg:"注册成功"});
    }
  })
})

// 7:登录请求
server.get("/login",(req,res)=>{
  // 获取数据
  var phone = req.query.phone;
  var pwd = req.query.pwd;
  var sql = "SELECT tj_id FROM tujia_use WHERE tj_phone=? AND tj_password=md5(?)";
  pool.query(sql,[phone,pwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:-1,msg:"用户名或者密码错误"});
    }else{
      //将用户登录成功的凭据保存到session对象\
      //result=[{id:1}]
      //获取uid
      var uid = result[0].tj_id;
      //保存session对象中
      // console.log(uid);
      // console.log(result[0]);
      req.session.uid = uid;
      res.send({code:1,msg:"登录成功"});
    }
  })
})

// 8:首页轮播图
server.get("/imglist",(req,res)=>{
  var rows = [
    {id:1,img_url:"http://127.0.0.1:3200/home/lunbo01.jpg",link:"/Home"},
    {id:2,img_url:"http://127.0.0.1:3200/home/lunbo02.jpg",link:"/Home"},
    {id:3,img_url:"http://127.0.0.1:3200/home/lunbo03.jpg",link:"/Home"},
  ];
  res.send({code:1,data:rows});
})

// 9:首页九宫格
server.get("/gong",(req,res)=>{
  var lows = [
    {id:1,img_url:"http://127.0.0.1:3200/home/gong01.png",link:"/Tujzs",text:"途家住宿"},
    {id:2,img_url:"http://127.0.0.1:3200/home/gong02.png",link:"/Dingdan",text:"我的订单"},
  ];
  res.send({code:1,data:lows});
})

// 10:首页侧栏导航栏
server.get("/rightnav",(req,res)=>{
  var rightnav = [
    {id:1,text:"首页",class:"mui-icon mui-icon-home",link:"/Home"},
    {id:2,text:"搜索附近",class:"mui-icon mui-icon-location",link:"/Sousuo"},
    {id:3,text:"登录/注册",class:"mui-icon mui-icon-person",link:"/Reg"},
    {id:4,text:"意见反馈",class:"mui-icon mui-icon-email",link:"/Ldear"},
    {id:5,text:"意见社区",class:"mui-icon-extra mui-icon-extra-custom",link:"/Shequ"},
  ];
  res.send({code:1,data:rightnav});
})

// 11:首页第二个轮播
server.get("/Hlunbo",(req,res)=>{
  var Hlunbo = [
    {id:1,link:"/Home",img_url:"http://127.0.0.1:3200/home/xlunbo01.jpg"},
    {id:2,link:"/Home",img_url:"http://127.0.0.1:3200/home/xlunbo02.png"},
  ];
  res.send({code:1,data:Hlunbo});
})

// 12:首页公寓
server.get("/Hgongyu",(req,res)=>{
  // 获取页码和页内数量
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  // 定义初始状态
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  // 创建变量保存发送给客户端数据
  var obj = {code:1};
  // 创建变量保存进度
  var progress = 0;
  var sql = "SELECT tj_lid,tj_imgurl,tj_price,tj_timgurl,tj_texto,tj_textt,tj_textso,tj_textst,tj_textsr,tj_link FROM tujia_hgongyu LIMIT ?,?";
  // 创建一个变量offset 起始行数
  var offset = (pno-1) * pageSize;
  // 创建一个变量ps   一页数据
  var ps = parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    progress+=50;
    obj.data = result;
    // 获取数据库返回结果
    // 将返回值返回客户端
    // res.send({code:1,data:result});
    if(progress==100){
      res.send(obj);
    }
  })
  // 计算总页数 创建sql查询总记录数  count自增
  var sql="SELECT count(tj_lid) AS c FROM tujia_hgongyu";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    progress+=50;
    var pc = Math.ceil(result[0].c/pageSize);//ceil()向上取整
    //res.send({code:1,pageCount:pc});
    obj.pageCount = pc;
    if(progress==100){
      res.send(obj)
    }
  })
})

// 13:首页公寓的房屋详情轮播
server.get("/fwxq",(req,res)=>{
  var sql = "SELECT tj_mid,tj_imgurl,tj_text,tj_link FROM tujia_fwxq";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})

// 14:首页公寓房屋的跳转详情页
server.get("/hgongyux",(req,res)=>{
  var hxqgu = [
    {id:1,img_url:"http://127.0.0.1:3200/hgongyu/men.png",title1:"1室0厅 1卫1厨",title2:"普通公寓 35平米 可做饭"},
    {id:2,img_url:"http://127.0.0.1:3200/hgongyu/chuang.png",title1:"宜住2人 1床",title2:"大床(2*1.5米) 1张"}
  ];
  res.send({code:1,data:hxqgu});
})

// 15:详情页设施服务
server.get("/ssfw",(req,res)=>{
  var sql = "SELECT tj_sid,tj_imgurl,tj_text FROM tujia_fwss";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})

// 16:途家住宿房屋加载
server.get("/Tujiaw",(req,res)=>{
  // 获取页码和页内数量
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  // 定义初始状态
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 6;
  }
  // 创建变量保存发送给客户端数据
  var obj = {code:1};
  // 创建变量保存进度
  var progress = 0;
  var sql = "SELECT tj_aid,tj_imgurl,tj_text1,tj_text2,tj_price,tj_link,tj_count FROM tujia_fangwu LIMIT ?,?";
  // 创建一个变量offset 起始行数
  var offset = (pno-1) * pageSize;
  // 创建一个变量ps   一页数据
  var ps = parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    progress+=50;
    obj.data = result;
    // 获取数据库返回结果
    // 将返回值返回客户端
    // res.send({code:1,data:result});
    if(progress==100){
      res.send(obj);
    }
  })
  // 计算总页数 创建sql查询总记录数  count自增
  var sql="SELECT count(tj_aid) AS c FROM tujia_fangwu";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    progress+=50;
    var pc = Math.ceil(result[0].c/pageSize);//ceil()向上取整
    //res.send({code:1,pageCount:pc});
    obj.pageCount = pc;
    if(progress==100){
      res.send(obj)
    }
  })
})

// 17:途家住宿房屋添加到订单
server.get("/TTian",(req,res)=>{
  // 获取session uid
  var uid = req.session.uid;
  // 判断是否登录
  if(!uid){
    res.send({code:5,msg:"请登录",data:[]});
    return;
  }
  var tw = req.query.tw;
  var tu = req.query.tu;
  var tj = req.query.tj;
  var tk = req.query.tk;
  var tshu = req.query.tshu;
  // console.log(tk);
  var sql = "INSERT INTO tujia_dingdan VALUES(NULL,?,?,?,?,?)";
  pool.query(sql,[tu,tw,tj,tk,tshu],(err,result)=>{
    if(err) throw err;
    if(result.length == 0){
      res.send({code:-1,msg:"添加失败"});
    }else{
      res.send({code:1,msg:"添加成功",data:result});
    }
  })
})


// 18:订单数据
server.get("/Dingdan",(req,res)=>{
  // 获取session uid
  var uid = req.session.uid;
  // 判断是否登录
  if(!uid){
    res.send({code:-1,msg:"请登录",data:[]});
    return;
  }
  // 请求订单表
  var sql = "SELECT tj_cid,tj_durl,tj_title,tj_dprice,tj_dlink,tj_count FROM tujia_dingdan ORDER BY tj_cid DESC";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})

// 18.1:订单数量减
server.get("/down",(req,res)=>{
  var cid=req.query.cid;
  var sql="UPDATE tujia_dingdan SET tj_count=tj_count-1 WHERE tj_cid=?";
  pool.query(sql,[cid],(err,result)=>{
    if(result.affectedRows>0){
      res.send({code:1,data:"修改成功"});
    }else{
      res.send({code:-1,data:"修改失败"});
    }
  })
});

// 18.2:订单数量减
server.get("/add",(req,res)=>{
  var cid=req.query.cid;
  var sql="UPDATE tujia_dingdan SET tj_count=tj_count+1 WHERE tj_cid=?";
  pool.query(sql,[cid],(err,result)=>{
    if(result.affectedRows>0){
      res.send({code:1,data:"修改成功"});
    }else{
      res.send({code:-1,data:"修改失败"});
    }
  })
});


// 19:删除单个订单
server.get("/removeitem",(req,res)=>{
  var id = req.query.id;
  var sql = "DELETE FROM tujia_dingdan WHERE tj_cid=?";
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows==0){//affectedRows:result影响的行数
      res.send({code:-1,msg:"删除失败"});
    }else{
      res.send({code:1,msg:"删除成功"});
    } 
  })
})

// 20:删除多个订单
server.get("/delM",(req,res)=>{
  //1:参数  19
  var ids = req.query.ids;
  //2:sql
  var sql = "DELETE FROM tujia_dingdan WHERE tj_cid IN ("+ids+")";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows==0){
      res.send({code:-1,msg:"删除失败"})
    }else{
      res.send({code:1,msg:"删除成功"})
    }
  })
  //3:json
})

// 21:查询页面input
server.get("/Souu",(req,res)=>{
  var text = req.query.text;
  // console.log(text);
  // 模糊查询在sql中不能直接添加，会报错多一个占位符%
  text = "%"+text+"%";
  // console.log(text);
  // var sql = "SELECT * FROM tujia_fangwu WHERE tj_text1 LIKE '%北京%' OR tj_text1 LIKE '巴厘岛' OR tj_text1 LIKE '%香港%' OR tj_text1 LIKE '%花莲%' OR tj_text1 LIKE '%台北%' OR tj_text1 LIKE '%重庆%' OR tj_text1 LIKE '%成都%' OR tj_text1 LIKE '%北欧%' OR tj_text1 LIKE '%中式%' OR tj_text1 LIKE '%北京%' OR tj_text1 LIKE '%限时%'";
  // 模糊查询并按照价格从高到低降序排列，默认升序排列
  var sql = "SELECT * FROM tujia_fangwu WHERE tj_text1 LIKE ? ORDER BY tj_price DESC";
  pool.query(sql,[text],(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.send({code:1,data:result});
    }else{
      res.send({code:-1,msg:"查询失败"});
    }  
    // console.log(result);
  })
})

// 22:意见反馈提交
server.get("/Yijian",(req,res)=>{
  // 获取session uid
  var uid = req.session.uid;
  // 判断是否登录
  if(!uid){
    res.send({code:5,msg:"请登录",data:[]});
    return;
  }
  // 获取客户端url传递数据
  var yn = req.query.yn;
  var yt = req.query.yt;
  var ys = req.query.ys;
  var sql = "INSERT INTO tujia_yijian VALUES(NULL,?,?,?)";
  pool.query(sql,[yn,yt,ys],(err,result)=>{
    if(err) throw err;
    if(result.length == 0){
      res.send({code:-1,msg:"提交失败"});
    }else{
      res.send({code:1,msg:"提交成功"});
    }
  })
})

// 23:意见反馈查询
server.get("/Cyi",(req,res)=>{
  // order by ** desc依照什么降序排列，asc默认升序排列
  var sql = "SELECT tj_oid,tj_yname,tj_yname,tj_ytext,tj_ydate FROM tujia_yijian ORDER BY tj_oid DESC";
  pool.query(sql,(err,result)=>{
    if(result.length == 0){
      res.send({code:-1,msg:"查询失败"});
    }else{
      res.send({code:1,data:result});
    }
  })
})

// 24:退出登录
server.get("/delroot",(req,res)=>{
  req.session.uid = "";
  pool.query((err,result)=>{
    res.send({code:1,msg:"退出成功"});
  })
})
