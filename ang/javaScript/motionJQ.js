 function motionFunctions(){
	
	//menu  
	var count = 0; 
	$('.checkHover').unbind('click').click(function(e){ console.log( 'ok')
		var nextEl = $(e.currentTarget).next()
		var classEl = nextEl.attr('class') ;  
		if(classEl.indexOf('inpsideMenu') >= 0 && nextEl.children().length >1){	   
			if( nextEl.css('max-height') == '0px'){ nextEl.css({'max-height':'270px','transition': 'max-height 1s'}) }else{
				nextEl.css({'max-height':'0px',  'transition': 'max-height 0.5s' })  
			}  
		} 
		
		 
	}) 
	
	var count = 0;  
	$('.SelectHeader').unbind('click').click(function(e){ console.log( 'ok')
		var nextEl = $(e.currentTarget).next()  
		if( count++%2 == 0 ){ nextEl.css({'max-height':'150px','transition': 'max-height 1s'}) }else{
			nextEl.css({'max-height':'0px',  'transition': 'max-height 0.5s' })  
		}   
		$('.SelectItem').click(function(e){
			 count++
			 nextEl.css({'max-height':'0px',  'transition': 'max-height 0.5s' }) 
		})
	
	})   
	
	
	 var countHistory = 0;  
	$('.showHistoryPurchase').unbind('click').click(function(e){ 
		var nextEl = $(e.currentTarget).next()  
		if( countHistory++%2 == 0 ){ nextEl.css({'max-height':'1500px','transition': 'max-height 1s'}) }else{
			nextEl.css({'max-height':'0px',  'transition': 'max-height 1s' })  
		}   
	})   
	
	var countHistory2 = 0;  
	$('.showHistoryPurchase2').unbind('click').click(function(e){ 
		var nextEl = $(e.currentTarget).next()  
		if( countHistory2++%2 == 0 ){ nextEl.css({'max-height':'500px','transition': 'max-height 1s'}) }else{
			nextEl.css({'max-height':'0px',  'transition': 'max-height 1s' })  
		}   
	})  
	
/* 	$('window').scroll(function(){console.log('www')})
	function qwees(){
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
	} */
	 
	// $('.zzz').css({'position':'fixed', 'background':'red',})
	// $('.zzz').addClass('qwe')
	//$('.showHistoryPurchase2').addClass('qwe')
   // var avatarSourceBottom = avatarElem.getBoundingClientRect().bottom + window.pageYOffset;
   
   
   
   var avatarElem = document.getElementsByClassName('zzz')[0];
	var avatarSourceBottom = 90
	 window.onscroll = function() {
      if (  window.pageYOffset < avatarSourceBottom) {
 
         $('.zzz').css({'position':'relative' })
		console.log('menuFixed remove' )
      } else if (window.pageYOffset > avatarSourceBottom) {
        
		 $('.zzz').css({'position':'fixed', top:0,})
		console.log('menuFixed add' )
      }
    };		 
 

//inside img main menu
 
 
 }