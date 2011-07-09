/*!
 * Popcorn.prototype.transform()
 * Popcorn.prototype.zoom()
 * Popcorn.prototype.rotate()
 *
 * Copyright 2011, Rick Waldron
 * Licensed under MIT license.
 *
 */


//	Requires Popcorn.js
(function( global, Popcorn ) {

	// Determine CSS3 Transform support
	var doc = global.document,
	video = doc.createElement("video"),
	specProp = "Transform",
	prefixes = [ "Webkit", "Moz", "ms", "O", "" ],
	supports = specProp.toLowerCase(),
	prop, idx, len;

	doc.head.appendChild( video );

	for ( idx = 0, len = prefixes.length; idx < len; idx++ ) {

		prop = prefixes[ idx ] + specProp;

		if ( prop in video.style ) {
			supports = prop;
			break;
		}
	}
	// Garbage collect support test video
	doc.head.removeChild( video );

	// Declare and define static Popcorn.transform method
	Popcorn.transform = function( pop, scale, rotate, wrap ) {

		media = pop.media;

		var position = pop.position(),
		resets = [ "top", "left" ],
		transform = {
		  scale: 1,
			rotate: 0
		},
		transition = {};

		//	If options object
		if ( typeof scale === "object" ) {
			var obj = scale;

			scale = obj.scale || 1;
			rotate = obj.rotate || 0;
			wrap = obj.wrap;
		}

		//	Arg list support
		transform.scale = scale || 1;
		transform.rotate = rotate || 0;

		//	TODO: wrapper creation should be optional
		var parent = media.parentNode,
			wrapNode, wrapDims;

		if ( wrap && !parent.getAttribute("data-popcorn-zoom-frame") ) {

			wrapNode = doc.createElement("div"),
			wrapDims = { "Width": true, "Height": true };

			wrapNode.setAttribute("data-popcorn-zoom-frame", "true");

			pop.listen( "canplaythrough", function() {
				for ( var prop in wrapDims ) {
					wrapNode.style[ prop.toLowerCase() ] = media[ "video" + prop ] + "px";
				}
			});

			// Extend wrapper style declaration properties
			Popcorn.extend( wrapNode.style, {
				overflow: "hidden",
				display: "inline-block",
				position: "relative"
			});

			// Place the wrapper
			parent.replaceChild( wrapNode, media );

			// Inject media into the wrapper
			wrapNode.appendChild( media );

			// Extend media style declaration properties
			Popcorn.extend( media.style, {
				position: "absolute",
				left: 0,
				top: 0
			});
		}

		//	Remove wrapper if function was called without wrap=true
		if ( !wrap && parent.getAttribute("data-popcorn-zoom-frame") ) {
			parent.parentNode.appendChild( media );
			parent.parentNode.removeChild( parent );
		}

		//	TODO: transform fns should be created based on options arg
		media.style[ supports ] = "scale(" + transform.scale + ") rotate(" + transform.rotate + "deg)";

		resets.forEach(function( val ) {
			media.style[ val ] = ( wrap ? "0" : position[ val ] ) + "px";
		});

		return pop;
	};

	//	TODO: DRY zoom/rotate method definitions

	Popcorn.p.zoom = function( scale, rotate, wrap ) {
		Popcorn.transform( this, scale, rotate, wrap );
		return this;
	};

	Popcorn.p.rotate = function( rotate, scale, wrap ) {
		//	Fix arguments to accomodate options object syntax
		if ( typeof rotate === "object" && !rotate.length ) {
			scale = rotate;
			rotate = null;
		}
		Popcorn.transform( this, scale, rotate, wrap );
		return this;
	};

})( this, Popcorn );
