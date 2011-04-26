
$(function() {

	var refs = [
		{
			scale: 1.5, 
			rotate: 90, 
			wrap: false
		},
		{
			scale: 1, 
			rotate: 45, 
			wrap: true
		},
		{
			scale: 1.2, 
			rotate: 180, 
			wrap: false
		},
		{
			scale: 1.75, 
			rotate: 45, 
			wrap: true
		}
	], 
	//	DOM frag cache
	$video = $("<video/>"), 

	//	Misc
	cssProps = {
		width: "300px", 
		height: "225px"
	};

	$.each( refs, function( idx, ref ) {

		var $clone = $video.clone(), 
				cloneId = "video-" + idx;

		$clone.css( cssProps ).attr({
			"src": "assets/snowdriving.ogv", 
			"id": cloneId, 
			"controls": true
		});

		$clone.appendTo("body");

		Popcorn( "#" + cloneId ).zoom( ref );

	});

});
