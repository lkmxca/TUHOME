SET NAMES UTF8;
DROP DATABASE IF EXISTS tujia;
CREATE DATABASE tujia CHARSET=UTF8;
USE tujia;

/*1:用户表*/
CREATE TABLE tujia_use(
  tj_id INT PRIMARY KEY AUTO_INCREMENT,     /*id*/
  tj_phone VARCHAR(16),                     /*手机号*/
  tj_password VARCHAR(32)                   /*密码*/
);
/*md5加密*/
INSERT INTO tujia_use VALUES(NULL,"13633855772",md5("123456")),
(NULL,"13673622112",md5("123456")),
(NULL,"13623852772",md5("123456")),
(NULL,"15038368799",md5("123456")),
(NULL,"15713801188",md5("123456")),
(NULL,"18239686943",md5("123456"));

/*2:首页公寓*/
CREATE TABLE tujia_hgongyu(
  tj_lid INT PRIMARY KEY AUTO_INCREMENT,   /*lid*/
  tj_imgurl VARCHAR(255),                  /*主图url*/
  tj_price DECIMAL(10,2),                  /*价格,高精度小数，包含小数点后两位的10位*/ 
  tj_timgurl VARCHAR(255),                 /*头像url*/
  tj_texto VARCHAR(255),                   /*第一个p*/
  tj_textt VARCHAR(255),                   /*第二个p*/
  tj_textso VARCHAR(255),                  /*第三个p的span1*/
  tj_textst VARCHAR(255),                  /*第三个p的span2*/
  tj_textsr VARCHAR(255),                  /*第三个p的span3*/
  tj_link VARCHAR(255)                     /*router-link跳转地址*/ 
);
INSERT INTO tujia_hgongyu VALUES(NULL,"http://127.0.0.1:3200/home/gongyu01.jpg","188","http://127.0.0.1:3200/home/gongyu02.jpg","夫子庙新街口精装高层大飘窗巨幕亲子房","4.9分/19点评·1居/1床/宜住2人·近张府园地铁站","优选","闪订","验真","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/home/gongyu03.jpg","256","http://127.0.0.1:3200/home/gongyu04.jpg","姐夫哥·967·给你家的味道","5分/17点评·3居/3床/宜住5人·近东门大桥地铁站","优选","闪订","验真","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/home/gongyu05.jpg","450","http://127.0.0.1:3200/home/gongyu06.jpg","渔村海景艺术民宿《海草家羽恋·羽恋》","5分/22点评·1居/1床/宜住2人","优选","闪订","验真","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/home/gongyu07.jpg","699","http://127.0.0.1:3200/home/gongyu08.jpg","春熙路太古里/高空观景房/大隐-行者","4.9分/16点评·1居/1床/宜住2人·近东门大桥地铁站","优选","闪订","验真","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/home/gongyu09.jpg","198","http://127.0.0.1:3200/home/gongyu10.jpg","成都天府广场宽窄巷子温馨双床房","4.7分/68点评·1居/2床/宜住2人·近东门大桥地铁站","优选","闪订","验真","/Hgongyu1");

/*3:首页公寓的房屋详情*/
CREATE TABLE tujia_fwxq(
  tj_mid INT PRIMARY KEY AUTO_INCREMENT,   /*mid*/
  tj_imgurl VARCHAR(255),                  /*图片*/
  tj_text VARCHAR(255),                    /*下方页数*/
  tj_link VARCHAR(255)                     /*跳转*/
);
INSERT INTO tujia_fwxq VALUES(NULL,"http://127.0.0.1:3200/hgongyu/banner01.jpg","1/5","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/hgongyu/banner02.jpg","2/5","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/hgongyu/banner03.jpg","3/5","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/hgongyu/banner04.jpg","4/5","/Hgongyu1"),
(NULL,"http://127.0.0.1:3200/hgongyu/banner05.jpg","5/5","/Hgongyu1");

/*4:房屋详情设施服务*/
CREATE TABLE tujia_fwss(
  tj_sid INT PRIMARY KEY AUTO_INCREMENT,     /*sid*/
  tj_imgurl VARCHAR(255),                    /*图片url*/
  tj_text VARCHAR(255)                       /*文字*/
);
INSERT INTO tujia_fwss VALUES(NULL,"http://127.0.0.1:3200/hgongyu/ss01.png","无线网络"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss02.png","空调"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss03.png","电视"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss04.png","洗衣机"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss05.png","冰箱"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss06.png","电热水壶"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss07.png","电吹风"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss08.png","全天热水"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss09.png","独立卫浴"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss10.png","烹饪锅具"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss11.png","刀具菜板"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss12.png","超市"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss13.png","提款机"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss14.png","保安"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss15.png","门禁系统"),
(NULL,"http://127.0.0.1:3200/hgongyu/ss16.png","电梯");

/*5:途家住宿房屋信息*/
CREATE TABLE tujia_fangwu(
  tj_aid INT PRIMARY KEY AUTO_INCREMENT,     /*aid*/
  tj_imgurl VARCHAR(255),                    /*图片url*/
  tj_text1 VARCHAR(255),                     /*文字1*/
  tj_text2 VARCHAR(255),                     /*文字2*/
  tj_price DECIMAL(10,2),                    /*价格*/
  tj_link VARCHAR(255),                      /*跳转*/
  tj_count VARCHAR(255)                      /*数量*/
);
INSERT INTO tujia_fangwu VALUES(NULL,"http://127.0.0.1:3200/hgongyu/fangwu01.jpg","地铁七号线欢乐谷附近·时光印象·北欧一居(北京·欢乐谷)","5分/11点评·1居/2床/宜住2人","398","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu02.jpg","欢乐谷旅游区简约欧式家具金蝉北里一房(北京·欢乐谷)","5分/3点评·1居/1床/宜住2人","238","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu03.jpg","国贸/大望路LOFT公寓(北京·欢乐谷)","4.7分/19点评·1居/1床/宜住2人","476","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu04.jpg","故宫、天安门、南站旁,奢华度假浪漫小屋(北京·湖景房)","3居/3床/宜住6人","428","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu05.jpg","可俯瞰古北水镇的双卧套房(北京·湖景房)","5分/49点评·2居/4床/宜住6人","467","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu06.jpg","北京公共恭亲王府旅居华丽单间(北京·恭王府)","4.6分/779点评·1居/1床/宜住2人","242","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu07.jpg","雍和宫簋街南锣鼓巷北新桥地铁口独立小院(北京·恭王府)","5分/6点评·1居/2床/宜住4人","628","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu08.jpg","【王府别院四合院】后海/护国寺·榻榻米(北京·恭王府)","5分/2点评·1居/1床/宜住2人","388","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu09.jpg","【暖屋】安德馨居大三居loft长租FZB(北京·恭王府)","4.7分/12点评·3居/3床/宜住6人","1025","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu10.jpg","隐海「祥云·祥凤还巢」恭王府旁四合院大床(北京·恭王府)","5分/1点评·1居/1床/宜住2人","1671","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu11.jpg","鼓楼胡同/北锣鼓巷/猫咪(北京·恭王府)","4.9分/3点评·2居/1床/宜住2人","345","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu12.jpg","『中式小院』鼓樓/後海/南鑼鼓巷/故宮(北京·恭王府)","2居/2床/宜住4人","872","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu13.jpg","【南锣鼓巷X柿树四合院】后海独门四合院(北京·恭王府)","4.7分/29点评·2居/3床/宜住6人","663","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu14.jpg","「空·舍吾」南锣鼓巷鼓楼后海近地铁口两室(北京·恭王府)","5分/3点评·2居/2床/宜住4人","951","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu15.jpg","【拾伍柒】什刹海&amp;北海&amp;6号线旁欧风独栋(北京·恭王府)","5分/3点评·1居/3床/宜住5人","503","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu16.jpg","Romantic Private Pool Villa in Kuta(巴厘岛)","1居/1床/宜住2人","551","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu17.jpg","金巴兰库塔海边私人泳池花园双卧别墅(巴厘岛)","1居/1床/宜住2人","318","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu18.jpg","巴图贝里格昌德精品别墅·巴厘家庭旅业两卧室别墅(巴厘岛)","2居/2床/宜住4人","1824","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu19.jpg","奥里亚杜阿别墅(巴厘岛)","3居/3床/宜住6人","1679","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu20.jpg","香港油尖旺区弥敦道双人房标准·双床房(香港)","4.9分/98点评·1居/2床/宜住2人","385","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu21.jpg","猫头鹰城堡民宿富丽·大床房(花莲)","4.8分/190点评·1居/1床/宜住3人","278","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu22.jpg","花莲海中天会馆无敌海景双人·双床房(花莲)","4.8分/6点评·1居/2床/宜住2人","651","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu23.jpg","NewTaipei浪人吉普賽~獨立3房3衛(台北)","5分/1点评·3居/5床/宜住7人","795","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu24.jpg","Simple Life忠孝敦化民宿(台北)","5分/12点评·1居/1床/宜住3人","381","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu25.jpg","香都公寓豪华·大床房(台北)","4.9分/6点评·1居/1床/宜住2人","529","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu26.jpg","台北車站JD HOUSE标准平价随机·三人房(台北)","4.4分/123点评·1居/2床/宜住3人","329","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu27.jpg","橙舍青年旅舍·II女生太空舱·胶囊房(台北)","1居/2床/宜住1人","110","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu28.jpg","日安西門城市民宿·精致·大床房(台北)","4.3分/14点评·1居/1床/宜住3人","263","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu29.jpg","民权西栈民宿背包客·双床房(台北)","4.7分/13点评·1居/2床/宜住2人","232","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu30.jpg","二十轮民宿大安馆标准·双床房(台北)","5分/6点评·1居/2床/宜住2人","784","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu31.jpg","解放碑洪崖洞/观音桥/轻轨站【花生1号】(重庆)","5分/293点评·1居/1床/宜住2人","132","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu32.jpg","解放碑洪崖洞长江索道旁自然风江景投影房(重庆)","4.8分/83点评·1居/1床/宜住2人","191","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu33.jpg","HiPlume解放碑中心洪崖洞ins北欧(重庆)","5分/90点评·1居/1床/宜住2人","399","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu34.jpg","太古里/春熙路/天府广场精致豪华套一(成都)","5分/99点评·1居/1床/宜住2人","360","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu35.jpg","【成都印象】春熙太古里投影轻奢两室套房(成都)","5分/98点评·2居/2床/宜住4人","450","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu36.jpg","【享宿】成都宽窄巷子特色家庭双床房(成都)","4.8分/591点评·2居/2床/宜住4人","188","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu37.jpg","【方聚】俯瞰春熙路蒹葭苍苍雅致一居(成都)","5分/601点评·1居/1床/宜住2人","450","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu38.jpg","太古里·宽窄巷子·春熙路旁精品双卧套房(成都)","4.9分/189点评·2居/2床/宜住4人","299","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu39.jpg","「欢庆」春熙路天府广场三卧室两厅家庭套房(成都)","5分/233点评·3居/3床/宜住6人","710","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu40.jpg","【限时特价】城景房近地铁,太古里,小吃街(成都)","5分/227点评·1居/1床/宜住2人","144","/Hgongyu1","1");

/*6:订单数据*/
CREATE TABLE tujia_dingdan(
  tj_cid INT PRIMARY KEY AUTO_INCREMENT,     /*cid*/
  tj_durl VARCHAR(255),                      /*图片地址*/
  tj_title VARCHAR(255),                     /*住宿店名*/
  tj_dprice DECIMAL(10,2),                   /*价格*/
  tj_dlink VARCHAR(255),                     /*跳转地址*/ 
  tj_count VARCHAR(255)                      /*数量*/
);
INSERT INTO tujia_dingdan VALUES(NULL,"http://127.0.0.1:3200/hgongyu/fangwu39.jpg","【限时特价】城景房近地铁,太古里,小吃街(成都)","144","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu32.jpg","解放碑洪崖洞长江索道旁自然风江景投影房(重庆)","191","/Hgongyu1","1"),
(NULL,"http://127.0.0.1:3200/hgongyu/fangwu06.jpg","北京公共恭亲王府旅居华丽单间(北京·恭王府)","242","/Hgongyu1","1");

/*7:意见反馈*/
CREATE TABLE tujia_yijian(
  tj_oid INT PRIMARY KEY AUTO_INCREMENT,     /*oid*/
  tj_yname VARCHAR(255),                     /*昵称*/
  tj_ytext VARCHAR(255),                     /*意见*/
  tj_ydate VARCHAR(255)                      /*时间*/
);