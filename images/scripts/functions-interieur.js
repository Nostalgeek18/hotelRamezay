
$(function()
{

	delay	= 3000;
	$(function()
	{

		$('#chambres ul').anythingSlider({
			theme           : 'metallic'
			,autoPlay		: false
			,mode			: 'f'
			,hashTags		: false
			,buildArrows    : true
			,buildNavigation     : true
			,buildStartStop      : true
			,toggleControls : true
			,startPanel		: 1
			,changeBy       : 1
			,infiniteSlides : true
			,onSlideComplete : function(slider){
				/* if(slider.pages == slider.currentPage)
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
