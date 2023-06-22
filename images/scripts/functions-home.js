
$(function()
{
	
	delay	= 3000;
	$(function()
	{
	
		$('#diapo ul').anythingSlider({
			theme           : 'metallic'
			,easing          : 'swing'
			,autoPlay		: true
			,delay			: delay
			,hashTags		: false
			,mode			: 'f'
			,onSlideComplete : function(slider){
				/*if(slider.pages == slider.currentPage)
				{
					$('.publicite').data('AnythingSlider').startStop(false);
					setTimeout(function()
					{
						$('.publicite').anythingSlider(1);
						$('.publicite').data('AnythingSlider').startStop(true);
					},delay)
				}*/
			}
		});//$('#slider1').anythingSlider
		
	})
})
