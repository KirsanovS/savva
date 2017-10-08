var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var formidable = require('formidable')
function formLite(location){ //formidableOptions " 
	var form = new formidable.IncomingForm()
	if(!location) {console.log('formLite error: uploadDir is not exist')} 
	form.uploadDir = location
	form.keepExtensions = true
	return form
} 


var url = ""

app.use(express.static(__dirname+'/ang') ); 
app.use(bodyParser.json())
app.get('/',function(err,res){
	res.sendfile('index');
});


 	
	function getImgsNames(files){
		var arr = []
		for(i in files){
			arr.push(path.basename(files[i].path) )  
		}
		//console.log('getImgsNames',arr)
		return arr
	}
	
	function createObjectsImg(newImgs){
		var obj={}
		var arr = []
		if(newImgs&&newImgs.length)
		for(var i = 0; i < newImgs.length; i++){ 
			arr.push({'img':newImgs[i], 'alt':'Savva'}) 
		}
		///console.log('createObjectsImg',arr)
		return arr
	}
	
	function concatArraysObjects(newObjImgs,oldObjImgs){ 
		if(!oldObjImgs)oldObjImgs=[] 
		for(var i = 0; i < newObjImgs.length; i++){
			oldObjImgs.push(newObjImgs[i]) 
		} 
		for(var i = 0; i < oldObjImgs.length; i++){
			if(oldObjImgs[i].$$hashKey) delete oldObjImgs[i].$$hashKey 
		}
		//console.log('concatArraysObjects',oldObjImgs)
		return oldObjImgs
	}
	
			
	function queryKir(collectionKir, callBack){ 
		mongoClient.connect(url, function(err, db){ 	if(err){console.log(collectionKir, err); return } 
				db.collection(collectionKir).find().toArray(function(err, results){  	if(err){console.log(collectionKir, err); return }; 			 
					db.close(); 
					callBack(results) 
				})		 
				
		});
	}	
	
	function saveKir(collectionKir, data, callBack){ 
		recursionObj( data,function(prop,obj){  
			if( prop == '$$hashKey' ) delete obj[prop] 
			 
		}) 		
	
		if( data.$$hashKey ) delete data.$$hashKey
		if( data._id) delete data._id
		if( data.id) delete data.id  
		if( data.newImgs) delete data.newImgs  
			 //console.log('data',data   ) ;
		mongoClient.connect(url, function(err, db){ if(err){console.log(collectionKir, err); return } 
				db.collection(collectionKir).insertOne(data, function(err, results){ if(err){console.log(collectionKir, err); return }       				 
					db.close(); 
					callBack(results)
				});	 
		});
	}		
	
	function updateKir(collectionKir, data, callBack){ if( !data._id){console.log(collectionKir+': data._id not founded')}
		var _id = ObjectId(data._id); 
		recursionObj( data,function(prop,obj){  
			if( prop == '$$hashKey' ) delete obj[prop]  
		}) 
		if( data.$$hashKey ) delete data.$$hashKey  
		if( data.newImgs) delete data.newImgs   
		if( data._id) delete data._id 
		  
	 	mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
				db.collection(collectionKir).findOneAndUpdate(  {'_id':_id}, { $set: data}, function(err, result){
						if(err){console.log(collectionKir, err); return }
						db.close();  
						callBack(result)  
					}
				);	 	 
		});   
	}	
	
	function deleteKir(collectionKir, _id, callBack){  //console.log('_id', _id)
		if( !_id){console.log(collectionKir+': _id not founded')}
		mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
		
			db.collection(collectionKir).deleteOne( {"_id":ObjectId(_id) }, function(err, result){	
				if(err){console.log(collectionKir, err); return }
				db.close();
				callBack(result) ; 
			}) 	
			 		  
		});  
	}	
	
	function getKir(collectionKir, _id, callBack){  //console.log("----_id",_id)
		if( !_id){console.log(collectionKir+': data._id not founded')}
		mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
			mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
				db.collection(collectionKir).findOne(  {"_id":ObjectId(_id)}, function(err, result){  
						if(err){console.log(collectionKir, err); return }
						db.close(); 
						callBack(result)  
					}
				);	 	 
			}); 
			 		  
		});   
	}
	
	function autorizKir(collectionKir, data, callBack){ 
		var mail = data.mail
		var password = data.password
		mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
			db.collection(collectionKir).findOne(  {"mail":mail, 'password':password}, function(err, result){  
					if(err){console.log(collectionKir, err); return }
					db.close(); 
					callBack(result)
				}
			);	 	 
		});
	}
	
	function checkMailKir(collectionKir, mail, callBack){  
		mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
			db.collection(collectionKir).findOne(  {"mail":mail }, function(err, result){  
					if(err){console.log(collectionKir, err); return }
					db.close(); 
					callBack(result)
				}
			);	 	 
		});
	}	

	function sipparate(fields){ 
		console.log('sipparate', fields);
		if(!fields.flagSize || !fields.flagSize.length){	//console.log('sipparate err'); return}
			for(var i = 0; i < fields.flagSize.length; i++){
				if(fields.flagSize[i].$$hashKey) delete fields.flagSize[i].$$hashKey
			}
		}
						
	}
	
//----items----------------------------------------------------------------------------------------- 
app.post('/items/:method',function(req,res){	 console.log('req.params1',req.params ) 
	var id = req.params.id ;     var items = {}
	
	formLite("ang/imgs/items").parse(req, function(err, fields, files){    console.log('args1',arguments  ) 
		var rezult = {}
		switch(req.params.method){
			case 'save':
				fields = JSON.parse(fields.JSONstring) 
				var oldObjImgs = fields.imgs;
				var newImgs = getImgsNames(files); // console.log('newImgs',newImgs)
				fields.imgs = createObjectsImg(newImgs); // console.log('newObjImgs',newObjImgs)
				 sipparate(fields)
				//fields.imgs = concatArraysObjects(newObjImgs,oldObjImgs); //console.log('fields.imgs',fields.imgs)
				
				//create comments array
				fields.comments = []
				fields.lastComment = 0
				
				saveKir('items', fields, function(rez){
					 sended({rezult:rez})
				})  
			break
			case 'update': 
				fields = JSON.parse(fields.JSONstring); if(!fields._id)console.log('fields._id : '+fields._id+' not founded')
				var oldObjImgs = fields.imgs;
				var newImgs = getImgsNames(files); // console.log('newImgs',newImgs)
				var newObjImgs = createObjectsImg(newImgs); // console.log('newObjImgs',newObjImgs)
				
				fields.imgs = concatArraysObjects(newObjImgs,oldObjImgs); //console.log('fields.imgs',fields.imgs)
				updateKir('items', fields, function(rez){
					 sended({rezult:rez})
				})  
				console.log('update')  
			break	 
			case 'query':
				console.log('query' )
				queryKir('items',function(rez){ sended({items:rez}) })  
			break	 
		}	 
	 })
	 function sended(rezult){
		res.send(rezult)
	 }
	 
	 var fields = req.body; console.log('req.body',req.body) 	
	 switch(req.params.method){
		case 'delete': 
			deleteKir('items', fields.id, function(rez){ sended({items:rez}) })  
			//sended({items:'rez'})
			console.log('delete') 
			//var id = fields.id ; console.log(fields)  
		break 
		case 'get':
			console.log('get') 
			getKir('items',fields._id, function(rez){ sended(items.items = rez); /* console.log('rez',rez) */ })
			
			/* var id = fields.id ; console.log(fields) 
			for(var i = 0; i < comments.comments.length; i++){
				if(comments.comments[i].itemId == id) items.items[id].comments = comments.comments[i]
			}
			rezult = items.items[id]   */
		break  
		case 'saveAlt':   
			if(!fields.itemId||!fields.imgs.img|| !fields.imgs.alt)console.log('error--',fields)
			var _id =  ObjectId(fields.itemId)
			var collectionKir = 'items'
			mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	
				 
			var itemId =   fields.itemId 
			var imgs = fields.imgs
			var collectionKir = 'items'
			mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	
					var img = imgs.img
					db.collection(collectionKir).update( {"_id":ObjectId(itemId)},{$pull:{'imgs':{'img':img}}}, function(err, result){	
						if(err){console.log(collectionKir, err); return } 
							
						mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	  
							db.collection(collectionKir).findOneAndUpdate(  {'_id':ObjectId(itemId)  }, { $push:{imgs} }, function(err, result){  if(err){console.log(collectionKir, err); return }
									db.close();   
							});	 	 
						});  	
							
					}) 	 	 
					
				});  	 
			}); 
		
			console.log('saveAlt--' )  
			  
		break
		
		
		case 'saveComm':
			if(!fields.saveObject || !fields.saveObject.userId || !fields.saveObject.text){console.log( 'error: ' ,fields ); return }
			var itemId = fields.itemId  
			fields.saveObject.lastComment = fields.saveObject.date
			 
			var collectionKir = 'items'
				var userId = fields.saveObject.userId
				var comments = fields.saveObject
				//add obj to arr 'comments'
				mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
						db.collection(collectionKir).findOneAndUpdate(  {'_id':ObjectId(itemId)  }, { $push:{comments} }, function(err, result){  if(err){console.log(collectionKir, err); return }
								db.close(); 
								sended({res:1})
						});	 	 
				});   
			console.log('saveComm' )   
		break		 
		case 'deleteComm':
			if(!fields.itemId||!fields.date) console.log('error',fields ) 
			var collectionKir = 'items'
			var itemId = fields.itemId
			var date = fields.date
			
			mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	
				db.collection(collectionKir).update( {"_id":ObjectId(itemId)},{$pull:{'comments':{'date':date}}}, function(err, result){ if(err){console.log(collectionKir, err); return }
					db.close(); 
					sended({res:1})					
				}) 	 
			}); 
					
			console.log('deleteComm' )  
		break	
		console.log('-- Case for method not exist --')
	}	
	 
	
});

 

//---users---------------------------------------------------------------------------------
app.post('/users/:method',function(req,res){	 console.log('/users req.params' ,req.params );  console.log('req.body',req.body)
	var fields = req.body; 
	var rezult = {}
	switch(req.params.method){
		case 'get':
			console.log('get')
			var id = '59a17b2b3ff6b0799ab68447'
			//getKir('users', id, function(user){ sended(user); console.log('user',user) })
		 
			autorizKir('users',fields,function(user){ //console.log('user',user)
				   user?sended(user):sended({errorAutoriz:1})
			})
			  
		break
		case 'query':
			console.log('query--') 
			queryKir('users',function(rez){   sended({users:rez}) }) 
			rezult = users
		break	
		case 'update': 
			updateKir('users', fields, function(rez){	console.log('rez',rez)
				 sended({rezult:rez})
			})  
		break	
		case 'save':
			console.log('save') 
			
			var collectionKir = 'users'
			var mail = fields.mail
			mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
				db.collection(collectionKir).findOne(  {"mail":mail}, function(err, result){  
						if(err){console.log(collectionKir, err); return }
						db.close(); 
						console.log('result',result )
						if(result){
							console.log('not_zbs')
							sended({'result':1})
						}else{
							console.log('zbs')
							 saveKir('users', fields, function(rez){  sended({'result':0});   })
						}
						
					}
				);	 	 
			}); 
				 
			 
			   
		break	
		case 'delete':
			console.log('delete') 
			deleteKir('users', fields.id, function(rez){ sended({users:rez}) }) 
		break	
	 }  
		 
	 function sended(rezult){
		res.send(rezult)
	 }
	
}); 

//---order---------------------------------------------------------------------------------
app.post('/orders/:method',function(req,res){	 console.log('/order req.params' ,req.params )
		var fields = req.body;	console.log(fields ) 
		var rezult = {}		
		switch(req.params.method){ 
			case 'get':
				console.log('get' )  
				//get orders by user id 
				//rezult =  order.order[0]
				var userId = fields.id
				var order = {}
				//getKir('orders',fields.id, function(rez){ sended(order.order = rez);  console.log('rez',rez)   })
				var collectionKir = 'orders'
				mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
					db.collection(collectionKir).findOne(  {"userId":userId}, function(err, result){  
							if(err){console.log(collectionKir, err); return }
							db.close(); 
							 console.log('result',result)
							sended(order.order = result);
						}
					);	 	 
				}); 
			
			break
			case 'query':
				console.log('query' )  
				queryKir('orders',function(rez){   sended({order:rez}) }) 
			break
			case 'save':   
				if(fields){ saveKir('orders', fields, function(rez){  sended({'rezult':1});  }) }
				console.log('save' )  
			break
			case 'update':   
				var userId = fields.userId
				var collectionKir = 'orders'
				mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
					db.collection(collectionKir).findOne(  {"userId":userId}, function(err, result){  
							if(err){console.log(collectionKir, err); return }
							db.close(); 
							fields._id = result._id
							if(fields){ updateKir('orders', fields, function(res){  sended({'rezult':1}); console.log('res',res) }) } 
						}
					);	 	 
				});  
			break	
			case 'delete': 
				if(!fields.saveObject){
					console.log('//del fool Order')
					deleteKir('orders', fields.orderId, function(rez){ sended( rez );  }) 
				}else if(fields.userId){
					
					var collectionKir = 'users'
					var userId = fields.userId
					var purchase = fields.saveObject
					//add item to arr 'purchase'
					mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	 
							db.collection(collectionKir).findOneAndUpdate(  {'_id':ObjectId(userId)  }, { $push:{purchase} }, function(err, result){  if(err){console.log(collectionKir, err); return }
									db.close();  
									delItemFromOrders() 
							});	 	 
					});   
				 
					function delItemFromOrders(){
						var idItem = fields.saveObject.idItem
						var orderId = fields.orderId 
						mongoClient.connect(url, function(err, db){  if(err){console.log(collectionKir, err); return }	
							db.collection('orders').update( {"_id":ObjectId(orderId)},{$pull:{'newPurchase':{_id:idItem}}}, function(err, result){	
								if(err){console.log(collectionKir, err); return }
								db.close();  
								var p = fields.saveObject.points
								sended({'point': p })  						
							}) 	 
						}); 
						 
					}
					
			 
				} 			
				console.log('delete')  
			break	
		 } 
		 
		 function sended(rezult){
			res.send(rezult)
		 }
		 
		 
}); 
 
 //---menu--------------------------------------------------------------------------------- 
app.post('/menu/:method',function(req,res){	 console.log('/menu req.params' ,req.params )
	var fields = req.body; console.log('req.body',req.body) 	
	var rezult = {}
	switch(req.params.method){ 
		case 'query':
			console.log('query' )  
			//rezult = menu
			queryKir('menu', function(result){ sended( {menu:result} )  })  
		break
		case 'save':  
			saveKir('menu', fields, function(rez){  sended({'rezult':1});  })  
			console.log('save' )   
		break 
	 } 
	
	function sended(rezult){
		res.send(rezult)
	 }
		 
	 
});  
 
 //---lookbook---------------------------------------------------------------------------------
app.post('/lookbook/:method',function(req,res){	 console.log('/lookbook req.params' ,req.params ) 
	formLite("ang/imgs/lookbook").parse(req, function(err, fields, files){    console.log('/lookbook',arguments )     
		 
		switch(req.params.method){  
			case 'save':   
				var arrImgsNames = getImgsNames(files)
				  	
				var i=0
				recursLookBook()
				function recursLookBook(){
					saveKir('lookbook', {'img':arrImgsNames[i] ,'alt':'savva'}  , function(rez){ 
						i++
						if(arrImgsNames[i]){ recursLookBook() }else{ sended({'lookbook':'1'}) }
					})  
				}
				 
				console.log('save' )  
			break  
		 } 
		 
	}) 
	var fields = req.body; console.log('req.body',req.body) 
	switch(req.params.method){ 
		case 'query':
			queryKir('lookbook',function(result){ sended({'lookbook':result}) })  
			console.log('query' )  
			//rezult = lookbook  
		break
		case 'saveAlt':
			if(!fields._id||!fields.alt||fields.img)console.log('error', fields)
			
			updateKir('lookbook', fields, function(rez){  sended({'rezult':1});   })
			console.log('saveAlt' )  
		break  
		case 'delete': 
			deleteKir('lookbook', fields.id, function(res){ sended({items:res}) })   
			console.log('delete' )  
		break 
	 } 
	 
	 function sended(rezult){
		res.send(rezult)
	 }
});  

 

 //---news---------------------------------------------------------------------------------
app.post('/news/:method',function(req,res){	 console.log('/news req.params' ,req.params )
	 
	
	formLite("ang/imgs/news").parse(req, function(err, fields, files){    console.log('/news',arguments )     
		var rezult = {}
		switch(req.params.method){ 
			case 'query':
				queryKir('news',function(result){ sended({'news':result}) })  
				console.log('query' )  
				   
			break
			case 'save':   
				fields = JSON.parse(fields.JSONstring)
				fields.img = getImgsNames(files)
				fields.alt = 'savva'
				if(fields.newImgs)delete fields.newImgs
				console.log('fields save',fields)
				saveKir('news',fields  , function(rez){  
					  sended({'news':'1'})  
				})
				 
				console.log('save' )  
			break  
			case 'saveAlt':
			 
				console.log('saveAlt' )  
			break  
			case 'get': 
				 getKir('news',fields._id, function(rez){ sended({'news':rez});   console.log('rezNews',arguments)   })
				console.log('get' )  
			break  
			case 'delete':
				console.log('id',fields._id)
				 
				deleteKir('news', fields.id, function(rez){ sended({'news':rez}) })			
				console.log('delete' ) 
			break 
		 } 
		 
		  
		 
		
	})  
	function sended(rezult){
		res.send(rezult)
	}
	
	
	  
	fields = req.body
	console.log('fields', fields)
	switch(req.params.method){  
		case 'saveAlt':
		 
			console.log('saveAlt' )  
		break  
		case 'get':
			console.log('_id',fields._id)
			 
			console.log('get' )  
		break  
		case 'delete':
			console.log('id',fields._id)
			 
			deleteKir('news', fields.id, function(rez){ sended({users:rez}) })			
			console.log('delete' ) 
		break 
	 } 
	 
});  

 

app.listen(8888) 




 
			
 	
			
			
			
function recursionObj(obj,callBack){  
	if(!obj||!callBack) return 
	if(typeof obj != "object") return
	 
	for(prop in obj){
		typeof obj[prop] == "object"? recursionObj(obj[prop],callBack) : callBack(prop,obj)  
	} 
 } 			
			
			
			
			
			
			