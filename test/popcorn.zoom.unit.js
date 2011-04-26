
var useOgv = document.createElement("video").canPlayType("video/ogg") === "maybe" && 
                  !document.createElement("video").canPlayType("video/mp4"), 

    useType = useOgv && ".ogv" || "_512kb.mp4", 
    
    localMediaList = [
      { 
        src: "assets/snowdriving.ogv", 
        in: 10,
        out: 13
      }, 
      {
        src: "assets/eich.ogv",
        in: 8, 
        out: 11
      }
    ],  
    remoteMediaList = [
      {
        src: "http://ia600208.us.archive.org/5/items/Brunette_2/Brunette_2" + useType,  
        in: 3,
        out: 6
      },
      {
        src: "http://ia600208.us.archive.org/0/items/Blonde_2/Blonde_2" + useType,  
        in: 6,
        out: 9
      }
    ], 
    mixedSourceList = [
      {
        src: "http://ia600102.us.archive.org/23/items/HotNumber/HotNumber" + useType,  
        in: 0, 
        out: 2
      },
      {
        src: "http://ia600102.us.archive.org/23/items/HotNumber/HotNumber" + useType,  
        in: 5, 
        out: 7
      },
      {
        src: "http://ia600208.us.archive.org/5/items/Brunette_2/Brunette_2" + useType,  
        in: 8,
        out: 10
      }, 
      {
        src: "assets/snowdriving.ogv",
        in: 11,
        out: 13
      }, 
      {
        src: "http://ia600208.us.archive.org/0/items/Blonde_2/Blonde_2" + useType, 
        in: 14,
        out: 16
      }
    ];

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

module("Functional")
test(".zoom( scale )", function() {

	var $zoom = Popcorn("#video"), 
			scalez = [ 1, 1.2, 1.5, 0.75, 2 ];

	expect(scalez.length);
	
	scalez.forEach( function( scale ) {

		$zoom.zoom( scale );

		equal( $zoom.media.style[ supports ], "scale("+scale+") rotate(0deg)", "scale("+scale+") and rotate(0deg) " );

	});
});
test(".zoom( scale, rotate )", function() {

	var $zoom = Popcorn("#video"), 
			scalez = [ 1, 1.2, 1.5, 0.75, 2 ], 
			rotatez = [ 0, 360, 90, 45, 180 ];

	expect(rotatez.length);


	rotatez.forEach( function( rotate ) {

		$zoom.zoom( 1, rotate );

		equal( $zoom.media.style[ supports ], "scale(1) rotate("+rotate+"deg)", "scale(1) and rotate("+rotate+"deg) " );

	});

});

