Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// 初始化
//mui.init({
//	subpages : [loen.h.normalPage('list')]
//});
var main = null;
var showMenu = false;
var menu = null;
var add = null;

// 所有方法都放在这里
mui.plusReady(function(){
	
	// 初始化数据库
	//initDb();

});

var initdata = [
	{'size':'04','constant':0.0113,'number':0,'price':400,'cube':0,'count':0},
	{'size':'06','constant':0.0201,'number':0,'price':550,'cube':0,'count':0},
	{'size':'08','constant':0.031,'number':0,'price':650,'cube':0,'count':0},
	{'size':'10','constant':0.045,'number':0,'price':680,'cube':0,'count':0},
	{'size':'12','constant':0.062,'number':0,'price':710,'cube':0,'count':0},
	{'size':'14','constant':0.083,'number':0,'price':740,'cube':0,'count':0},
	{'size':'16','constant':0.106,'number':0,'price':740,'cube':0,'count':0},
	{'size':'18','constant':0.132,'number':0,'price':740,'cube':0,'count':0},
	{'size':'20','constant':0.16,'number':0,'price':740,'cube':0,'count':0},
	{'size':'22','constant':0.191,'number':0,'price':740,'cube':0,'count':0},
	{'size':'24','constant':0.225,'number':0,'price':740,'cube':0,'count':0},
	];


var app = angular.module('myApp',[]);

app.controller('myCtrl',function($scope){
	$scope.name = 'Loen wang';
	
	// 初始化木材数据
	$scope.wooddata = [];
	angular.copy(initdata,$scope.wooddata);
	
	$scope.datetime = new Date().Format("yyyy-MM-dd");
	
	
	$scope.initwooddata = function(){
		
		angular.copy(initdata,$scope.wooddata);
	};
	
	$scope.focusnumber = function(number){
		
		if(typeof number == 'undefined'){
			return 0;
		}
		
		number = -(-number); // 转换成数值

		if(number === 0){
			return '';
		}
		
		return number;
	}
	
	$scope.blurnumber = function(number){
		
		if(typeof number == 'undefined'){
			return 0;
		}
		
		number = -(-number); // 转换成数值
		
		if(number < 0){
			return Math.abs(number);
		}
		
		return number;
	}
	
	
	$scope.priceminus = function(price){
		
		if(typeof price == 'undefined'){
			return 0;
		}
		price = -(-price); // 转换成数值
		
		price = price - 5;
		if(price < 0){
			return 0;
		}
		
		return price;
	}
	
	$scope.priceplus = function(price){
		
		if(typeof price == 'undefined'){
			return 0;
		}
		price = -(-price); // 转换成数值
		
		price = price + 5;
		if(price < 0){
			return 0;
		}
		return price;
	}
	
	$scope.totalnumber = 0;
	$scope.totalcube = 0;
	$scope.totalprice = 0;
	$scope.formulary = [];
	
	// 监听并计算总价格
	$scope.$watch('wooddata',function(){
		$scope.totalnumber = 0;
		$scope.totalcube = 0;
		$scope.totalprice = 0;
		$scope.formulary = [];
		var i = 0, tcube = 0;
		for(var p in $scope.wooddata){
			if($scope.wooddata[p].count > 0){ // 有木材
				$scope.totalnumber = $scope.totalnumber + $scope.wooddata[p].number;
				tcube = $scope.wooddata[p].number*$scope.wooddata[p].constant;
				$scope.totalcube = $scope.totalcube + tcube;
				$scope.formulary[i] =$scope.wooddata[p].size+"(尺寸) "+tcube+"(立方): " + $scope.wooddata[p].number + ' × ' + $scope.wooddata[p].constant + ' × ' + $scope.wooddata[p].price + ' = ' + $scope.wooddata[p].count + '';
				$scope.totalprice = $scope.totalprice + $scope.wooddata[p].count;
				i++;
			}
		}
		
	},true);
	
	
});


