 
  app.controller('admin', function (getData,$scope,$location,$rootScope, $routeParams, $templateCache, $http,$timeout,textAngularManager, getData ,itemsResource, usersResource, menuResource, orderResource, backConnection, newsResource, $sessionStorage, lookbookResource, coreResource){
	
	$scope.menuResource = menuResource 
	$scope.orderResource = orderResource
	$scope.coreResource = coreResource
	$scope.itemsResource = itemsResource
	$scope.getData = getData
	
	$scope.sendMail = function(mail,mess){
		var mailsArr = []
		if(typeof mail == "object"){
			mails = mail 
			for(var i = 0; i < mails.length; i++){
				if( mails[i] && mails[i].mail ) mailsArr.push(mails[i].mail)
			} 
		}else{
			mailsArr.push(mail) 
		}
		
		if(mailsArr.length) usersResource.sendMail({'mails':mailsArr, 'mess':mess},function(){	 alert('Сообщение отправлено')	}) 
		
	}
	
	// - autoriz
	if($sessionStorage.get('autorizAdmin')!=0){ $scope.autorizAdmin = parseInt( $sessionStorage.get('autorizAdmin') ); }
	$scope.exitAdminAutorization = function(){
		 if( $scope.autorizAdmin){$sessionStorage.put('autorizAdmin', 0)} 
		 $scope.autorizAdmin = 0
	}
	$scope.checkAdminAutorization = function(result){	console.log('checkAdminAutorization',result)
		 $scope.errorAutoriz = result.errorAutoriz
		 $scope.autorizAdmin =  result.autorizAdmin
		
		 if( $scope.autorizAdmin){$sessionStorage.put('autorizAdmin', 1)} 
	}
	 
	
	$scope.adminRechangePassFn = function(result){console.log('result',result)
		 $scope.adminRechangePass = result.result
	}
	
 
	//Item 
	$scope.getItems = function(){ itemsResource.query( function(items){ $scope.items = items.items }) }; 
	$scope.getItems() 
	 
	$scope.copyItem = function(item){ $scope.newItem = item	}; $scope.newItem = {}
	$scope.selectPartSections = function(sex ){
			sex == 1 ? $scope.sections = $scope.menuItems[1].inside : $scope.sections = $scope.menuItems[2].inside  
	}   
	
 
	 
	
	//--users  
	$scope.getUsers = function(){
		usersResource.query(function(users){ $scope.users = users.users;  })
	}
	$scope.getUsers()
	
	 
	
	
	//menu  
	menuResource.query(function(menu){  
		$scope.menuItems = menu.menu[0].menu ;
		
		if(!menu){console.log('$scope.menuItems not founded'); return  }
		var arr1 = $scope.menuItems[1].inside, arr2 = $scope.menuItems[2].inside 
		var newArr = []
		for(var i = 0; i < arr2.length; i++){ newArr.push(arr2[i]) }
		for(var i = 0; i < arr1.length; i++){ newArr.push(arr1[i]) }
		$scope.allSections = newArr 
	} )
	$scope.addMenu = function(newMenu){ 
		if((!newMenu.flagSex)&&(!newMenu.name))console.log('flagSex || name is not founded');return
		var flagSection = Math.floor(Math.random()*100000000)
		var saveObj = {'name':newMenu.name, 'flagSection':flagSection} 
		newMenu.flagSex == 1? $scope.menuItems[1].inside =saveObj : $scope.menuItems[2].inside =saveObj  
	} 
	$scope.getNameFlagSections = function(number, flagSections){
		if(!flagSections || flagSections.lenght){console.log('getNameFlagSections err'); return } 
		for(var i = 0; i < flagSections.length; i++){
			if(flagSections[i].flagSection == number){   return flagSections[i].name}
		}
		 
	}
	
	
	//order
	$scope.orderResource = orderResource ;
	 
	$scope.getOrders = function(){ orderResource.query(function(order){ $scope.orders = order.order;  }) }
	 $scope.getOrders()
	
	$scope.deleteOrder = function(userId,orderId,item){ if(!item.selectSize){console.log('--Size item is not selected--')} 
		var saveObject = {'idItem':item._id, 'size': item.selectSize, 'date': $rootScope.DateNow, } 
		saveObject.point = userId&&!item.flagDisc?2:0
		orderResource.delete({'userId':userId,'orderId':orderId, 'saveObject':saveObject} , function(result){ 
			alert('пользователю было начислено '+saveObject.point+' баллa(ов) за товары') 
			$scope.getOrders() 
		}) ;  
	}
	
	//backConnection
	$scope.backConnection = backConnection
	$scope.getMessages = function(){
		backConnection.query(function(messages){ $scope.messages = messages.messages ; console.log(messages)})
	}
	$scope.getMessages()
	
	//news
	$scope.newsResource = newsResource
	$scope.getNews= function(){ 
		newsResource.query(function(newsList){$scope.newsList  = newsList.news; $scope.newNews = {} })
	}
	$scope.getNews()
	
	$scope.saveAlt = function(news){  
		var newsFS = newsResource.get({_id:news._id},function(){ 
			newsFS.alt = news.alt
			newsFS.$saveAlt()
			$scope.getNews()
		})  
	}
	
	$scope.editNews = function(news){
		$scope.newNews = news
		console.log(news)
	} 
	 
	 
	
	//lookbook 
	$scope.getLookbook = function(){ lookbookResource.query(function(lookbook){$scope.lookbook = lookbook.lookbook; console.log('reset luukbook') })  }
	$scope.getLookbook()
	$scope.lookbookResource = lookbookResource
	 
 
	$scope.returnAdminSection = function(){
		if($scope.showAdminSection==0){return 'tamplates/admin/adminOrder.html'};
		if($scope.showAdminSection==1){return 'tamplates/admin/adminUsers.html'};
		if($scope.showAdminSection==2){return 'tamplates/admin/adminItems.html'};
		if($scope.showAdminSection==3){return 'tamplates/admin/adminComments.html'};
		if($scope.showAdminSection==4){return 'tamplates/admin/adminMenu.html'};
		if($scope.showAdminSection==5){return 'tamplates/admin/adminLookbook.html'};  
		if($scope.showAdminSection==6){return 'tamplates/admin/adminNews.html'};  
		if($scope.showAdminSection==7){return 'tamplates/admin/adminBackConnection.html'};  
	} 
	$scope.setActive = function(adminSection){
		var navItem = $('.navItem')
		navItem.removeClass('active')
		navItem.eq(adminSection).addClass('active') 
	}
	
	$rootScope.delObject = function(item,items){	 
		for(var i = 0; i < items.length; i++){
			if(items[i] == item){ items.splice(i,1)   }
		}
	}
	
	$scope.userFilter = function(fieldName){  
		$scope.fieldName != fieldName ? $scope.fieldName = fieldName : $scope.fieldName = '-'+fieldName;   
	}
	
	$scope.core = function(){ 
		 var coreArr = []
		 document.onkeydown = function checkKeycode(event){ //фиксация нажатия клавишь
			 coreArr.push(event.which) 
			 if( coreArr.join('').indexOf('8079768983846583') >= 0 ){
				console.log('Connecting...')
					$scope.coreFlag =  1
					$timeout();
					coreArr = []
			 }  
		 }
		 $scope.coreShow = function(result){
			 console.log(result)
		 }
	}()	  
	
} ); 
  	
 
 
 
app.filter('showSex', function ( ) {
  return function (numbers) { 
	return numbers  == 1? numbers ='муж': numbers =  'жен'
  };
});

app.filter('howOld', function ( ) {
	return function (birth) {  
		var now = (new Date()).getTime();  
		var oldInMilliseconds =  (now-birth) 
		var old = Math.floor(	oldInMilliseconds/(1000*60*60*24*365) )
		return old 
 
	};
});
 
 
 

 

