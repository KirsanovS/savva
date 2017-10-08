var send = angular.module('send', []);

send.service('getData',['$http',function($http){

		return function(obj){	  
			var data  = new FormData()  
			 
			for(prop in obj){ // console.log('err0',prop,':',obj[prop])
				if( obj[prop] && typeof obj[prop] == 'object' && obj[prop][0] && obj[prop][0]._file ){ //console.log('objectxx', obj[prop]) 
					var imgs = obj[prop] ;  
					for( var i = 0; i < imgs.length; i++){ 
						 data.append(prop+i,imgs[i]._file)
					}   
				}  
			} 
			data.append('JSONstring', JSON.stringify(obj) )  
			return data
		} 
		
}]) 

send.directive('fileModel',['$parse',function($parse){
	return{
		restrict: 'A',
		link: function(scope,element, attrs){
			var model = $parse(attrs.fileModel);  
			var modelSetter = model.assign;    
			 
			element.bind('change',function(){
				var values = [];
				angular.forEach(element[0].files,function(item){
					var value = {
						fileName: item.name,
						fileSize: item.size,
						url: URL.createObjectURL(item),
						_file: item
					}
					values.push(value)
				} )
				 /* console.log('attrs.fileModel',attrs.fileModel) */
				scope.$apply(function(){
					if(attrs.multiple){
						modelSetter(scope,values)
					}else{
						modelSetter(scope,[values[0]])
					}
					
					
				})
			})
		}
	}
}])	

//instruction
//  send.post('/urlString , objectFromForm)  // var regApp = angular.module('regApp', ['send']); //function reg($scope,$http ,send){
//	file-model="mod.myFile">  - set derective
