

var doc = document, 
	video = doc.createElement("video");


doc.head.appendChild( video );
// Determine type of transform support

var specProp = "Transform", 
		prefixes = [ "Webkit", "Moz", "ms", "O", "" ],
		supports = specProp.toLowerCase();	

for( var i = 0, len = prefixes.length; i < len; i++ ) {

	var prop = prefixes[ i ] + specProp;

	if ( prop in video.style ) {
		supports = prop;
		break;
	}
}


doc.head.removeChild( video );



module("API");
test("Popcorn.zoom", function() {
  
  expect(2);
  
  ok( Popcorn.zoom, "Popcorn.zoom exists" );
  
  equal( typeof Popcorn.zoom, "function", "Popcorn.zoom() is a function" );
  
});

test("Popcorn.prototype.zoom", function() {
  
  expect(2);
  
  ok( Popcorn.prototype.zoom, "Popcorn.prototype.zoom exists" );
  
  equal( typeof Popcorn.prototype.zoom, "function", "Popcorn.prototype.zoom() is a function" );
  
});

module("Functional, arg list")
test(".zoom( scale )", function() {

	var $zoom = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 0.75, 2 ];

	expect(scalez.length);
	
	scalez.forEach( function( scale ) {

		$zoom.zoom( scale );

		equal( $zoom.media.style[ supports ], "scale("+scale+") rotate(0deg)", "scale("+scale+") and rotate(0deg) " );

	});
});
test(".zoom( scale, degrees )", function() {

	var $zoom = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 0.75, 2 ], 
		rotatez = [ 0, 360, 90, 45, 180 ];

	expect(rotatez.length);


	rotatez.forEach( function( rotate ) {

		$zoom.zoom( 1, rotate );

		equal( $zoom.media.style[ supports ], "scale(1) rotate("+rotate+"deg)", "scale(1) and rotate("+rotate+"deg) " );

	});

});

test(".rotate( degrees )", function() {

	var $rotate = Popcorn("#video"), 
		rotatez = [ 1, 1.2, 1.5, 0.75, 2 ];

	expect(rotatez.length);
	
	rotatez.forEach( function( degrees ) {

		$rotate.rotate( degrees );

		equal( $rotate.media.style[ supports ], "scale(1) rotate("+degrees+"deg)", "scale(1) and rotate("+degrees+"deg) " );

	});
});
test(".rotate( degrees, scale )", function() {

	var $rotate = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 0.75, 2 ], 
		rotatez = [ 0, 360, 90, 45, 180 ];

	expect(scalez.length);


	scalez.forEach( function( scale, idx ) {

		$rotate.rotate( 0, scale );

		equal( $rotate.media.style[ supports ], "scale("+scale+") rotate(0deg)", 
												"scale("+scale+") and rotate(0deg) " );

	});

});

test("zoom/rotate(rotatez[idx], scale)", function() {

	var $rotate = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 2, 1, .75 ], 
		rotatez = [ 0, 360, 90, 180, 45, 180 ];

	expect(scalez.length);

	scalez.forEach( function( scale, idx ) {

		$rotate.rotate( rotatez[idx], scale );

		equal( $rotate.media.style[ supports ], 
				"scale("+scale+") rotate("+rotatez[idx]+"deg)", 
				"scale("+scale+") and rotate("+rotatez[idx]+"deg) " );

	});
	
	$rotate.play();

});

module("Functional, option object")
test(".zoom({ scale: scale, rotate: 0 })", function() {

	var $zoom = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 0.75, 2 ];

	expect(scalez.length);
	
	scalez.forEach( function( scale ) {

		$zoom.zoom({ 
			scale: scale, 
			rotate: 0
		});

		equal( $zoom.media.style[ supports ], "scale("+scale+") rotate(0deg)", "scale("+scale+") and rotate(0deg) " );

	});
});
test(".zoom({ scale: 1, rotate: rotate })", function() {

	var $zoom = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 0.75, 2 ], 
		rotatez = [ 0, 360, 90, 45, 180 ];

	expect(rotatez.length);


	rotatez.forEach( function( rotate ) {

		$zoom.zoom({ 
			scale: 1, 
			rotate: rotate 
		});

		equal( $zoom.media.style[ supports ], "scale(1) rotate("+rotate+"deg)", "scale(1) and rotate("+rotate+"deg) " );

	});

});

test(".rotate({ scale: 1, rotate: rotate })", function() {

	var $rotate = Popcorn("#video"), 
		rotatez = [ 0, 360, 90, 45, 180 ];

	expect(rotatez.length);
	
	rotatez.forEach( function( rotate ) {

		$rotate.rotate({ 
			scale: 1, 
			rotate: rotate 
		});

		equal( $rotate.media.style[ supports ], "scale(1) rotate("+rotate+"deg)", "scale(1) and rotate("+rotate+"deg) " );

	});
});
test(".rotate({ rotate: 0, scale: scale })", function() {

	var $rotate = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 0.75, 2 ], 
		rotatez = [ 0, 360, 90, 45, 180 ];

	expect(scalez.length);


	scalez.forEach( function( scale, idx ) {

		$rotate.rotate({ 
			rotate: 0, 
			scale: scale 
		});

		equal( $rotate.media.style[ supports ], "scale("+scale+") rotate(0deg)", 
												"scale("+scale+") and rotate(0deg) " );

	});

});

test("zoom/rotate({ rotate: rotatez[idx], scale: scale})", function() {

	var $rotate = Popcorn("#video"), 
		scalez = [ 1, 1.2, 1.5, 2, 1, .75 ], 
		rotatez = [ 0, 360, 90, 180, 45, 180 ];

	expect(scalez.length);

	scalez.forEach( function( scale, idx ) {

		$rotate.rotate({ 
			rotate: rotatez[idx], 
			scale: scale
	  });

		equal( $rotate.media.style[ supports ], 
				"scale("+scale+") rotate("+rotatez[idx]+"deg)", 
				"scale("+scale+") and rotate("+rotatez[idx]+"deg) " );

	});
	
	$rotate.play();

});

