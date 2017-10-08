$(window).on("load",function(){
 
 	

(function($){ 

		$("body").mCustomScrollbar({
			theme:"minimal-dark",
			mouseWheelPixels: 100,
			documentTouchScroll: true,
			scrollInertia:60,
			callbacks:{   
			}
		});
		
		$('#contacts').click(function(){
			$("body").mCustomScrollbar("scrollTo",'bottom',{
				scrollInertia:1000
			});
		} )
		
		 

})(jQuery);
});

