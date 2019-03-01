var commonData={
	//navList:navData,	//导航
	sysTitle:"管理系统",
	//sysUser:userData[2],	//当前用户
	//userMenuList:userMenuData,
	//crumbsData:crumbsStrDo(navData)
};

var commonMethods={
	
};

function crumbsStrDo(navListObj,crumbsDataObj){
	var str=window.location.href;
	var crumbsStr1="";
	var crumbsStr2="";
	var crumbsStr3="";
	for(var i in navListObj){
		var objNav=navListObj[i];
		if(str.indexOf(navListObj[i].linkAddress)>=0){
			crumbsStr1=navListObj[i];
		}
		if(!$.isEmptyObject(navListObj[i].child)){	//判断是否有二级
			for(var j in navListObj[i].child){	//遍历二级数据
				var child1=navListObj[i].child[j];
				if(str.indexOf(child1.linkAddress)>=0){
					crumbsStr1=navListObj[i];
					crumbsStr2=navListObj[i].child[j];
				}
				if(!$.isEmptyObject(child1.child)){	//判断是否有三级
					for(var k in child1.child){	//遍历三级数据
						var child2=child1.child[k];
						if(str.indexOf(child2.linkAddress)>=0){
							crumbsStr1=navListObj[i];
							crumbsStr2=navListObj[i].child[j];
							crumbsStr3=navListObj[i].child[j].child[k];
						}
					}
				}
			}
		}
	}
	
	var obj1=crumbsStr1;
	var obj2;
	var obj3;
	var obj4=[];
	if(crumbsStr2!=""){
		if(crumbsStr3!=""){
			obj2=crumbsStr2;
			obj3=crumbsStr3;
			obj3.linkAddress="";
			obj4.push(obj1);
			obj4.push(obj2);
			obj4.push(obj3);
		}else{
			obj2=crumbsStr2;
			obj2.linkAddress="";
			obj4.push(obj1);
			obj4.push(obj2);
		}
	}else{
		obj4.push(obj1);
	}
	return obj4;
}

Vue.component('nav-menu', {
	props:['navdata'],
	template:"<ul>"+
		"<li class='n-li hwui-ease-in-out' v-for='item in navdata' v-if='item.isShow' :class='{on:item.isSelected}' @click='navLink(item)'>1{{item.title}}</li>"+
		"</ul>",
	methods:{
		navLink:function(obj){
			$("#mainIframe").attr("src",obj.linkAddress);
		}
	},
	mounted:function(){
		//console.log(window.mainIframe.src);
//		var str;
//		if(this.test==null){			
//			str=window.mainIframe.src;
//		}else{
//			str=this.test;
//		}
//		var str=window.location.href;
//		var subId,navIndex;
//		for(var i in this.navdata){
//			var objNav=this.navdata[i];
//			this.navdata[i].isSelected=false;
//			for(var j in this.navdata[i].child){
//				var child1=this.navdata[i].child[j];
//				if(!$.isEmptyObject(child1)){
//					if(str.indexOf(child1.linkAddress)>=0){
//						subId=child1.id;
//					}
//				}
//
//				for(var k in this.navdata[i].child[j].child){
//					var child2=this.navdata[i].child[j].child[k];
//					if(!$.isEmptyObject(child2)){
//						if(str.indexOf(child2.linkAddress)>=0){
//							subId=child2.id;
//						}
//					}
//				}
//			}
//			
//			for(var idx in objNav.subIds){
//				if(objNav.subIds[idx]==subId){
//					this.navdata[i].isSelected=true;
//				}
//			}
//		}
	}
});

Vue.component('menu-left',{
	props:['menudata','menuindex'],
	template:"<ul class='hwui-menu-left'>"+
		"<li v-for='item in menudata[menuindex].child'>"+
			"<h3 class='ml-lv-one hwui-border-box' @click='foldDo($event)'>"+
				"<i class='hwui hwuifont hwui-shezhi'></i>"+
				"<div class='hwui-ellipsis hwui-border-box'>{{item.title}}</div>"+
				"<em class='hwui hwuifont hwui-jiantou-up'></em>"+
			"</h3>"+
			"<div class='ml-lv-two'>"+
//				"<a v-for='i in item.child' :class='{on:i.isSelected}' @click='navLink(i)' class='hwui-ease-in-out'>"+
				"<a v-for='i in item.child' onclick='linkDo(this)' :class='{on:i.isSelected}' :href='i.linkAddress' target='mainIframe' class='hwui-ease-in-out'>"+
					"<div class='hwui-ellipsis' :class='{\"hwui-wp-80\":i.msgNum>0}'>{{i.title}}</div>"+
					"<em v-if='i.msgNum>0' class='hwui-badge hwui-radius'>{{i.msgNum}}</em>"+
				"</a>"+
			"</div>"+
		"</li>"+
		"</ul>",
	methods:{
		foldDo:function(e){
			if($(e.target).parent().find("em").hasClass("hwui-jiantou-down")){
				$(e.target).parent().find("em").removeClass("hwui-jiantou-down");	
				$(e.target).parent().find("em").addClass("hwui-jiantou-up");	
			}else{
				$(e.target).parent().find("em").removeClass("hwui-jiantou-up");
				$(e.target).parent().find("em").addClass("hwui-jiantou-down");	
			}
			$(e.target).parent().parent().find(".ml-lv-two").toggle();
		},
		navLink:function(obj){
			//$("#mainIframe").attr("src",obj.linkAddress);
//			$("#hrefHidden").val(obj.linkAddress);
		} 
	},
	mounted:function(){
//		var str=window.location.href;
//		var str=$("#hrefHidden").val();
//		if(this.test==null){			
//			str=window.mainIframe.src;
//		}else{
//			str=this.test;
//		}
//		for(var i in this.menudata){
//			var objNav=this.menudata[i];
//
//			for(var j in this.menudata[i].child){
//				var child1=this.menudata[i].child[j];
//				if(!$.isEmptyObject(child1)){
//					if(str.indexOf(child1.linkAddress)>=0){
//						this.menudata[i].child[j].isSelected=true;
//					}
//				}
//
//				for(var k in this.menudata[i].child[j].child){
//					var child2=this.menudata[i].child[j].child[k];
//					if(!$.isEmptyObject(child2)){
//						if(str.indexOf(child2.linkAddress)>=0){
//							this.menudata[i].child[j].child[k].isSelected=true;
//						}
//					}
//				}
//			}
//		}
	}
});

Vue.component('nav-crumbs',{
	props:['crumbslist','isback','jumplink','crumbscolor'],
	template:"<div class='hwui-crumbs-main' :class='crumbscolor'>"+
		"<div class='hwui-l-float'>"+
		"<a href='#'>首页</a>"+
		"<span v-if='item.title!=null' v-for='item in crumbslist'><em class='hwui-plr10'>></em><a href='#'>{{item.title}}</a></span>"+
		"</div>"+
		"<div v-if='isback==1' class='hwui-r-float'><a href='javascript:backwardDo()'>返回</a></div>"+
		"<div v-if='isback==2' class='hwui-r-float'><a :href='jumplink'>返回</a></div>"+
		"</div>",
	mounted:function(){

	}
});

Vue.component('footer-coypright',{
	template:"<div class='hwui-footer'>"+
			    "<div>Copyright © 2017 MingShi. All Rights Reserved.</div>"+
			    "<div class='mt5'>顺义区名师课程巡讲平台 版权所有</div>"+
			"</div>"
});

Vue.component('cover-settings',{
	props:["coverdata"],
	template:"<ul class='skin-list'><li v-for='item in coverdata'><img :src='item.imgSrc' /><i v-if='item.isDefault' class='icon iconfont icon-queding radius-all'></i></li></ul>"
})