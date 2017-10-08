app.config(function($routeProvider){
	$routeProvider.when('/main',
	{
		templateUrl:'tamplates/main.html',
		controller:'main'
	});
	
	$routeProvider.when('/products',
	{
		templateUrl:'tamplates/products.html',
		controller:'main'
	});

	$routeProvider.when("/oneItemPage/:nameItem/:idDinamic", 
	{
		templateUrl: "tamplates/oneItemPage.html",
		controller:'main'
	});
	
	
	$routeProvider.when("/news/:newsId", 
	{
		templateUrl: "tamplates/news.html",
		controller:'main'
	});
	
	$routeProvider.when("/newsList", 
	{
		templateUrl: "tamplates/newsList.html",
		controller:'main'
	});
	
	$routeProvider.when("/backConnection", 
	{
		templateUrl: "tamplates/backConnection.html",
		controller:'main'
	});
	
	$routeProvider.when("/contacts", 
	{
		templateUrl: "tamplates/contacts.html",
		controller:'main'
	});
	
	
	
	$routeProvider.when("/SocialNetworking", 
	{
		templateUrl: "tamplates/SocialNetworking.html",
		controller:'main'
	});
 
	$routeProvider.when("/endOrder", 
	{
		templateUrl: "tamplates/endOrder.html",
		controller:'main'
	});
	
	 
	
	$routeProvider.when("/dostavka", 
	{
		templateUrl: "tamplates/dostavka.html",
		controller:'main'
	}); 
	
	$routeProvider.when("/lookbook", 
	{
		templateUrl: "tamplates/lookbook.html",
		controller:'main'
	});
	
	$routeProvider.when("/products", 
	{
		templateUrl: "tamplates/products.html",
		controller:'main'
	});
	
	$routeProvider.when("/basket", 
	{
		templateUrl: "tamplates/basket.html",
		controller:'main'
	});
 
	$routeProvider.when("/admin", 
	{
		templateUrl: "tamplates/admin/adminMain.html",
		controller:'admin'
	});
	
	$routeProvider.otherwise( 
	{
		redirectTo: '/main'
	});
	
	
	
	$routeProvider.when("/startPrivatRoom", 
	{
		templateUrl: "tamplates/privat room/startPrivatRoom.html",
		controller:'main'
	});
	
	$routeProvider.when("/registrationPrivatRoom", 
	{
		templateUrl: "tamplates/privat room/registrationPrivatRoom.html",
		controller:'main'
	});
	

	
	
}) ; 








