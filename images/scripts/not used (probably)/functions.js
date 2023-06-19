
$(function()
{
	
	delay	= 2000;
	$(function()
	{
	
		$('#diapo ul').anythingSlider({
			theme           : 'metallic'
			,easing          : 'swing'
			,autoPlay		: true
			,delay			: delay
			,hashTags		: false
			,mode			: 'f'
	
		});
					
		$('#chambres ul').anythingSlider({
			theme           : 'metallic'
			,autoPlay		: false
			,mode			: 'f'
			,buildArrows    : true
			,buildNavigation     : true
			,buildStartStop      : true

			
		});
		
	})
})