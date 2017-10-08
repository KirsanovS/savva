 

var app = angular.module('app', ['send',"ngRoute", "ngTouch", "ngAnimate" ,'textAngular','ngResource', 'ngSessionStorage','slickCarousel']);

/* app.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
})
  */

 app.controller('main', function (getData,$scope,$location,$rootScope, $routeParams, $templateCache,  $http, textAngularManager,itemsResource,usersResource , menuResource, orderResource, $sessionStorage, lookbookResource, backConnection, newsResource,  $timeout, $compile){
 
	$scope.menuSwipe2 = function(value){ 
		console.log('value', value)
	}
	 
	$scope.menuSwipe = function(value){
		$scope.flagCont = value;
		console.log('$scope.flagCont',$scope.flagCont)
	}
	$scope.trans = function(name){ 
		var transliterate = (
			function() {
				var
					rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
					eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
				;
				return function(text, engToRus) {
					var x;
					for(x = 0; x < rus.length; x++) {
						text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
						text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());	
					}
					return text;
				}
			}
		)();
		var name = transliterate(name,false)
		name = name.split(' ').join('')
		return name
		//console.log(name)
	} 
	
	$rootScope.DateNow = (new Date).getTime() 
	 
	$rootScope.sail = 0;
	 
	//items
	$scope.itemsResource = itemsResource
	itemsResource.query( function(items){ $scope.items = items.items })
	 
	//menu 
	menuResource.query(function(menu){  if(menu)$scope.menuItems = menu.menu[0].menu ; } )
	 
	 
	// order 
	$scope.endOrderView = function(result){ if(result)$location.path('/endOrder'); $rootScope.basket = []  }
	
	$scope.orderResource = orderResource 
	$scope.createOrderObj = function(){$rootScope.freeOrder = $rootScope.userExist||1 ;  }
	
		$scope.checkSelectSize = function(freeOrder){
			var basret = freeOrder.newPurchase
			$scope.selectSizeInfo = 0;
			for(var i = 0; i < basret.length; i++){
				if(!basret[i].selectSize){ $scope.selectSizeInfo = 'Необходимо выбрать хотя бы один размен в каждом из выбранных товаров'	}
				console.log('basret[i]',basret[i])
			}
		}
		
		$scope.endOrder = function(){
			$rootScope.basket = []
			console.log('$rootScope.basket',$rootScope.basket)
			//$scope.endOrderView()
			$scope.getOrder()
			$location.path('/endOrder')
		}
		$scope.saveOrder = function(freeOrder){
			$scope.checkSelectSize(freeOrder)
			 
			if(!$scope.selectSizeInfo){ 
				orderResource.save(freeOrder ,function(){ 	$scope.endOrder() 	})
			} 
		} 
		$scope.updateOrder = function(freeOrder){
			$scope.checkSelectSize(freeOrder) 
			
			if(!$scope.selectSizeInfo){ 
				orderResource.update(freeOrder ,function(){ 	$scope.endOrder() 	})
			} 
		}
	 
	$scope.getOrder = function(){
		if($rootScope.userExist){console.log('getOrder')
			orderResource.get({'id':$rootScope.userExist._id},function(order){ 
				console.log('order',order)
				if(order&&order.newPurchase&& (order.newPurchase.length > 0) ){
					$rootScope.order = order;
					$rootScope.purchaseSumm = $scope.sumPurchase($rootScope.order); 
				}
				
			})
		}
		
	} 
	
	
	//Users 
	console.log('$rootScope.userExist',$rootScope.userExist)
	usersResource.query(function(users){ $scope.users = users.users;  })
	$scope.usersResource = usersResource; $rootScope.userExist
	$scope.autoriz = function(autorizObj){  if(!autorizObj)return
		usersResource.get(autorizObj,function(user){ console.log('userFromServ',user)
			if(user.errorAutoriz == 1){$scope.errorAutoriz = 1; return}else{$scope.errorAutoriz = 0}
			$rootScope.freeOrder=$rootScope.userExist = user   
			$scope.getOrder()
			$location.path('/startPrivatRoom')
			$rootScope.sail = $scope.yourSail($rootScope.userExist) 
			
			$sessionStorage.put('userExist', JSON.stringify(user) )
		})
		 
	} 
	 
	if($sessionStorage.get('userExist' )!=0){
		$rootScope.userExist = JSON.parse($sessionStorage.get('userExist' ))
		$scope.getOrder()
	}
	
	$scope.exit = function(){ $rootScope.userExist = 0 ; $rootScope.order = 0; $sessionStorage.put('userExist', 0)}
	
	$scope.registration = function(regObj){ 
		usersResource.save(regObj, function(equalUserExist){  
			$scope.equalUserExist = equalUserExist
			if(equalUserExist.result == 1){console.log("equalUserExist", equalUserExist); return}
			 
			 if(equalUserExist.result == 0){
				 console.log('regObj',regObj)
				 $scope.autoriz(regObj) 
			 }
			 
		})
	} 
	 
	 //backConnection
	$scope.backConnection = backConnection
	$scope.saveBackCon = function(message){
		 message.date = $rootScope.DateNow 
		 backConnection.save(message)
		 $location.path('/products')
	} 
	
	
	//newsList 
	newsResource.query(function(newsList){$scope.newsList =newsList.news;   })
	
	$scope.getNewsById = function( id){
		 var news
		newsResource.query(function(newsList){ 
			$scope.newsList =newsList.news; 
		 	  
			for(var i =0; i < $scope.newsList.length; i++){ 
				if( $scope.newsList[i]._id == id ){  $scope.news = $scope.newsList[i]; 	  }
			} 
		 
		})    
	}
	
	$scope.getShare = function(){
		newsResource.query(function(newsList){ 
			$scope.newsList =newsList.news; 
		 	  
			for(var i =0; i < $scope.newsList.length; i++){ 
				if( $scope.newsList[i].flagShare ){  $scope.share = $scope.newsList[i]; 	  }
			} 
		 
		})  
	}
	$scope.getShare()
	
	//lookbook 
	lookbookResource.query(function(lookbook){$scope.lookbook = lookbook.lookbook;  })  
	 
	 
	 
	$scope.$on("$routeChangeSuccess", function(){   
		var id = $routeParams["idDinamic"]
		if(id){    
			 $scope.oneItem = itemsResource.get({'_id':id})
			 
			 if($location.url().indexOf('/oneItemPage')>=0){ 
				$rootScope.title = $scope.oneItem.title 
				$rootScope.keywords = $scope.oneItem.keywords 
				$rootScope.description = $scope.oneItem.description 
			 } 	
		}	
	   
		var id = $routeParams["newsId"]
		if(id ){     
			   $scope.getNewsById(id )
			console.log(' $scope.news',	 $scope.news )
			
			 if($scope.news&&$location.url().indexOf('/news')>=0){ 
				$rootScope.title = $scope.news.title 
				$rootScope.keywords = $scope.news.keywords 
				$rootScope.description = $scope.news.description 
			 } 	
			 
		}	
		
		if($location.url() == '/products'){
			$rootScope.title = 'title products' 
			$rootScope.keywords = '1'
			$rootScope.description = '2'
		}
		if($location.url() == '/main'){
			$rootScope.title = 'title main' 
			$rootScope.keywords = '1'
			$rootScope.description = '2'
		}  
		
	})
	  
/* 	$scope.getOneItem = function(){
		var id = $routeParams["idDinamic"]
		$scope.oneItem = itemsResource.get({'_id':id})
		 
	} */

	 
//----------------------------------------------------------------------------------------------	 
	$scope.btnText = 'Добавить товар в корзину'
	$scope.existObject = function(item,items){  
		if(!item||!items||!items.length)return 0
		for(var i = 0; i < items.length; i++){
			if(items[i] == item){return 1}else{return 0}
		}
	}
	$scope.delObject = function(item,items){	 
		for(var i = 0; i < items.length; i++){
			if(items[i] == item){ items.splice(i,1)   }
		}
	}
	
 
	
	$rootScope.getUserById = function(id ){
		if(!$scope.users){ console.log('$scope.users not founded:', $scope.users); return }
		for(var i = 0; i<$scope.users.length; i++){ 
			if($scope.users[i]._id == id){ return $scope.users[i] }
		}
	}
	
	$rootScope.getItemById = function(id ){
		if(!$scope.items){ console.log('$scope.users not founded:', $scope.items); return }
		for(var i = 0; i<$scope.items.length; i++){ 
			if($scope.items[i]._id == id){ return $scope.items[i] }
		}
	}
	
	$scope.yourSail = function(user){
		if(!user||!user.purchase) return 0
		var pointSumm = 0
		for(var i = 0; i<user.purchase.length; i++){ 
			 pointSumm += user.purchase[i].point;  
			$scope.pointSumm = pointSumm 
			console.log('pointSumm', pointSumm)
			if(pointSumm == 20)return 20
			if(pointSumm > 20)return 15
			if(pointSumm > 10 && pointSumm < 20)return 10  
			return 0
		}
	}
	 
		
	$scope.changeSection = function(selectSex, selectSection, selectNew, selectDisc){ //console.log(arguments)
		$rootScope.sex = selectSex
		$scope.section = selectSection
		$scope.new = selectNew
		$rootScope.disc = selectDisc
	}
	
	 
	$scope.basketFn = function(item){
		if(!$rootScope.basket){$rootScope.basket = []}
		$rootScope.basket.push(item)
		item.basketFlag = 1
		$rootScope.basketSumm =0
		for(var i = 0; i<$rootScope.basket.length; i++){ 
			$rootScope.basketSumm += $rootScope.basket[i].mony; 
		} 
		console.log('$rootScope.basketSumm',$rootScope.basketSumm)
	}
 
	
	$scope.sumPurchase = function(order){
		if(!order)return
		var purchaseSumm = 0
		for(var i = 0; i<order.newPurchase.length; i++){ 
			 purchaseSumm += order.newPurchase[i].mony; 
		} 
		return purchaseSumm
	}
	
	$scope.selectSizeBask = function( size,bask){ 
		if(size.is){   
			arr =[]
			size.select == 1?size.select = 0:size.select = 1
			for(var i = 0; i<5; i++){
				if(bask.flagSize[i].select)  arr.push(bask.flagSize[i].name)  
			}
			bask.selectSize = arr.join(", ") 
		}
	}
	
/* 	$scope.getFormClass = function(ngModelController){
		return{
			error:ngModelController.$invalid && ngModelController.$dirty,
			success: ngModelController.$valid && ngModelController.$dirty
		}
	}
	$scope.showFormError = function(ngModelController, error){
		console.log('ngModelController.$error[error]',ngModelController.$error[error])
		return ngModelController.$error[error]
	}  */
 
	//====================================
    // Slick x
    //====================================
	 $scope.slickConfigXLoaded = true
	 $scope.myArr = [{'w':'w' },{'w':'w' },{'w':'w' },{'w':'w' } ]
	 $scope.slickConfigX = {
      dots: true, 
      initialSlide: 3,
      infinite: true, 
      method: {}, 
    };
	 
 
	$scope.$on('tplLoad', function(){ motionFunctions() })
	
	 
				 
 
	 				  
	$rootScope.toSizeX = function(item){
		if(item ){ 
			var textSize = [{name:'XS', is:"" },{name:'S', is:"" },{name:'M', is:"" },{name:'L', is:"" },{name:'XL', is:"" }]
			if(typeof  item[0]  != 'object')
				for(var i =0; i<5; i++){   
					var value = item[i]? true: false;   
					item[i]={name:textSize[i].name, is:value }
					 
				}	 
					 
			 return  item;
		}
	}	
	 
	$scope.showMenuImg = function(menu,menuItems){
		menuItems.forEach(function(menu){
			menu.flagShowImg = 0
			if(menu.inside){
					menu.inside.forEach(function(inside){
						inside.flagIsideShowImg = 0
					})
			} 
		})
		menu.flagShowImg = 1
	}
	$scope.showIsideMenuImg = function(inside,  menuItems ){
	 	menuItems.forEach(function(menu){ //console.log('menu',menu)
			menu.flagShowImg = 0
			if(menu.inside){
					menu.inside.forEach(function(inside){
						inside.flagIsideShowImg = 0
					})
			} 
		})  
		inside.flagIsideShowImg = 1
	}
	$scope.cnsl = function(){
		console.log('cnsl ' )
	}
} );


app.filter('toSize', function ( ) {
  return function (item , $scope) {  
	if(item&&item.length ){ 
		var textSize = [{name:'XS', is:"" },{name:'S', is:"" },{name:'M', is:"" },{name:'L', is:"" },{name:'XL', is:"" }]
		if(typeof  item[0]  != 'object')
			for(var i =0; i<5; i++){   
				var value = item[i]? true: false;   
				item[i]={name:textSize[i].name, is:value }
				 
			}	 
				 
		 return  viewSize;
	}
	
  };
});
 
 app.directive('checkLoad', function(){
	return{
		scope: true,
		link: function($scope, $element, attrs){
			$scope.$root.$broadcast('tplLoad')
		}
	}
 })

 

  	
 

 
 
 

 

