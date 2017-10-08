app.factory('itemsResource', ['$resource', function($resource) {
return $resource('/items/:method', {id: '@id'},
    {
        update: { method:"POST",transformRequest: angular.identity, headers: {'Content-Type':undefined },params:{method:"update"}}, 
		save: {method: "POST",transformRequest:angular.identity, headers:{'Content-Type':undefined },params:{method:"save"}}, 
		saveAlt: {method: "POST", params:{method:"saveAlt"}}, 
		get: {  method: "POST",  params: {	method: "get"	}   }, 
		query: {  method: "POST",  params: {	method: "query"	}   },  
		delete:{	method: "POST", params: {	method: "delete"	}},
		
		saveComm: {  method: "POST", params: {	method: "saveComm" }  }, 
		deleteComm: {  method: "POST", params: {	method: "deleteComm" }  }, 
		
    });
}]);

app.factory('usersResource', ['$resource', function($resource) {
return $resource('/users/:method', { },
    {	
	
		get: {  method: "POST",  params: {	method: "get"	} } ,
		query: {   method: "POST", params: {	method: "query"	} } ,
        update: {   method: "POST", params: {	method: "update"	}  }, 
		save: {  method: "POST", params: {	method: "save" }  },
		delete:{	method: "POST", params: {	method: "delete"	}} , 
		sendMail:{	method: "POST", params: {	method: "sendMail"	}} , 
    });
}]); 

app.factory('menuResource', ['$resource', function($resource) {
return $resource('/menu/:method', { },
    {	
		get: {  method: "POST",  params: {	method: "get"	} } ,
		query: {   method: "POST", params: {	method: "query"	} } , 
		save: {  method: "POST", params: {	method: "save" }  }, 
		delete: {  method: "POST", params: {	method: "delete" }  }, 
		
    });
}]);

app.factory('orderResource', ['$resource', function($resource) {
return $resource('/orders/:method', { },
    {	
		get: {  method: "POST",  params: {	method: "get"	} } ,
		query: {   method: "POST", params: {	method: "query"	} } , 
		save: {  method: "POST", params: {	method: "save" }  }, 
		update: {  method: "POST", params: {	method: "update" }  }, 
		delete: {  method: "POST", params: {	method: "delete" }  }, 
		
    });
}]);

app.factory('lookbookResource', ['$resource', function($resource) {
return $resource('/lookbook/:method', { },
    {	 
		query: {   method: "POST", params: {	method: "query"	} } , 
		update:{method:"POST",transformRequest: angular.identity, headers: {'Content-Type':undefined }, params: {method: "update" }}, 
		save:{method:"POST",transformRequest: angular.identity, headers: {'Content-Type':undefined }, params: {method: "save" }}, 
		saveAlt:{method:"POST", params: {method: "saveAlt" }}, 
		delete:{method:"POST", params: {method: "delete" }},  
    });
}]);

 

 

app.factory('newsResource', ['$resource', function($resource) {
return $resource('/news/:method', { },
    {	 
		update:{method:"POST",transformRequest: angular.identity, headers: {'Content-Type':undefined }, params: {method: "update" }}, 
		save:{method:"POST",transformRequest: angular.identity, headers: {'Content-Type':undefined }, params: {method: "save" }}, 
		saveAlt:{method:"POST", params: {method: "saveAlt" }}, 
		
		update: {  method: "POST", params: {	method: "update" }  }, 	
		query: {   method: "POST", params: {	method: "query"	} } ,  
		get: {  method: "POST",  params: {	method: "get"	} } , 
		delete:{method:"POST", params: {method: "delete" }},  
    });
}]);







