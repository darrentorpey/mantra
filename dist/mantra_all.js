/*
 * 
 * 
 * -meta---
 * version:    
 * builddate:  2013-01-21T18:55:05.412Z
 * generator:  interleave@0.5.24
 * 
 * 
 * 
 */ 

// umdjs returnExports pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root['mantra_all'] = factory();
    }
}(this, function () {
    /*!
     * jQuery JavaScript Library v1.6.2
     * http://jquery.com/
     *
     * Copyright 2011, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     * Copyright 2011, The Dojo Foundation
     * Released under the MIT, BSD, and GPL Licenses.
     *
     * Date: Thu Jun 30 14:16:56 2011 -0400
     */
    (function( window, undefined ) {
    
    // Use the correct document accordingly with window argument (sandbox)
    var document = window.document,
    	navigator = window.navigator,
    	location = window.location;
    var jQuery = (function() {
    
    // Define a local copy of jQuery
    var jQuery = function( selector, context ) {
    		// The jQuery object is actually just the init constructor 'enhanced'
    		return new jQuery.fn.init( selector, context, rootjQuery );
    	},
    
    	// Map over jQuery in case of overwrite
    	_jQuery = window.jQuery,
    
    	// Map over the $ in case of overwrite
    	_$ = window.$,
    
    	// A central reference to the root jQuery(document)
    	rootjQuery,
    
    	// A simple way to check for HTML strings or ID strings
    	// (both of which we optimize for)
    	quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
    
    	// Check if a string has a non-whitespace character in it
    	rnotwhite = /\S/,
    
    	// Used for trimming whitespace
    	trimLeft = /^\s+/,
    	trimRight = /\s+$/,
    
    	// Check for digits
    	rdigit = /\d/,
    
    	// Match a standalone tag
    	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
    
    	// JSON RegExp
    	rvalidchars = /^[\],:{}\s]*$/,
    	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    
    	// Useragent RegExp
    	rwebkit = /(webkit)[ \/]([\w.]+)/,
    	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
    	rmsie = /(msie) ([\w.]+)/,
    	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
    
    	// Matches dashed string for camelizing
    	rdashAlpha = /-([a-z])/ig,
    
    	// Used by jQuery.camelCase as callback to replace()
    	fcamelCase = function( all, letter ) {
    		return letter.toUpperCase();
    	},
    
    	// Keep a UserAgent string for use with jQuery.browser
    	userAgent = navigator.userAgent,
    
    	// For matching the engine and version of the browser
    	browserMatch,
    
    	// The deferred used on DOM ready
    	readyList,
    
    	// The ready event handler
    	DOMContentLoaded,
    
    	// Save a reference to some core methods
    	toString = Object.prototype.toString,
    	hasOwn = Object.prototype.hasOwnProperty,
    	push = Array.prototype.push,
    	slice = Array.prototype.slice,
    	trim = String.prototype.trim,
    	indexOf = Array.prototype.indexOf,
    
    	// [[Class]] -> type pairs
    	class2type = {};
    
    jQuery.fn = jQuery.prototype = {
    	constructor: jQuery,
    	init: function( selector, context, rootjQuery ) {
    		var match, elem, ret, doc;
    
    		// Handle $(""), $(null), or $(undefined)
    		if ( !selector ) {
    			return this;
    		}
    
    		// Handle $(DOMElement)
    		if ( selector.nodeType ) {
    			this.context = this[0] = selector;
    			this.length = 1;
    			return this;
    		}
    
    		// The body element only exists once, optimize finding it
    		if ( selector === "body" && !context && document.body ) {
    			this.context = document;
    			this[0] = document.body;
    			this.selector = selector;
    			this.length = 1;
    			return this;
    		}
    
    		// Handle HTML strings
    		if ( typeof selector === "string" ) {
    			// Are we dealing with HTML string or an ID?
    			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
    				// Assume that strings that start and end with <> are HTML and skip the regex check
    				match = [ null, selector, null ];
    
    			} else {
    				match = quickExpr.exec( selector );
    			}
    
    			// Verify a match, and that no context was specified for #id
    			if ( match && (match[1] || !context) ) {
    
    				// HANDLE: $(html) -> $(array)
    				if ( match[1] ) {
    					context = context instanceof jQuery ? context[0] : context;
    					doc = (context ? context.ownerDocument || context : document);
    
    					// If a single string is passed in and it's a single tag
    					// just do a createElement and skip the rest
    					ret = rsingleTag.exec( selector );
    
    					if ( ret ) {
    						if ( jQuery.isPlainObject( context ) ) {
    							selector = [ document.createElement( ret[1] ) ];
    							jQuery.fn.attr.call( selector, context, true );
    
    						} else {
    							selector = [ doc.createElement( ret[1] ) ];
    						}
    
    					} else {
    						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
    						selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
    					}
    
    					return jQuery.merge( this, selector );
    
    				// HANDLE: $("#id")
    				} else {
    					elem = document.getElementById( match[2] );
    
    					// Check parentNode to catch when Blackberry 4.6 returns
    					// nodes that are no longer in the document #6963
    					if ( elem && elem.parentNode ) {
    						// Handle the case where IE and Opera return items
    						// by name instead of ID
    						if ( elem.id !== match[2] ) {
    							return rootjQuery.find( selector );
    						}
    
    						// Otherwise, we inject the element directly into the jQuery object
    						this.length = 1;
    						this[0] = elem;
    					}
    
    					this.context = document;
    					this.selector = selector;
    					return this;
    				}
    
    			// HANDLE: $(expr, $(...))
    			} else if ( !context || context.jquery ) {
    				return (context || rootjQuery).find( selector );
    
    			// HANDLE: $(expr, context)
    			// (which is just equivalent to: $(context).find(expr)
    			} else {
    				return this.constructor( context ).find( selector );
    			}
    
    		// HANDLE: $(function)
    		// Shortcut for document ready
    		} else if ( jQuery.isFunction( selector ) ) {
    			return rootjQuery.ready( selector );
    		}
    
    		if (selector.selector !== undefined) {
    			this.selector = selector.selector;
    			this.context = selector.context;
    		}
    
    		return jQuery.makeArray( selector, this );
    	},
    
    	// Start with an empty selector
    	selector: "",
    
    	// The current version of jQuery being used
    	jquery: "1.6.2",
    
    	// The default length of a jQuery object is 0
    	length: 0,
    
    	// The number of elements contained in the matched element set
    	size: function() {
    		return this.length;
    	},
    
    	toArray: function() {
    		return slice.call( this, 0 );
    	},
    
    	// Get the Nth element in the matched element set OR
    	// Get the whole matched element set as a clean array
    	get: function( num ) {
    		return num == null ?
    
    			// Return a 'clean' array
    			this.toArray() :
    
    			// Return just the object
    			( num < 0 ? this[ this.length + num ] : this[ num ] );
    	},
    
    	// Take an array of elements and push it onto the stack
    	// (returning the new matched element set)
    	pushStack: function( elems, name, selector ) {
    		// Build a new jQuery matched element set
    		var ret = this.constructor();
    
    		if ( jQuery.isArray( elems ) ) {
    			push.apply( ret, elems );
    
    		} else {
    			jQuery.merge( ret, elems );
    		}
    
    		// Add the old object onto the stack (as a reference)
    		ret.prevObject = this;
    
    		ret.context = this.context;
    
    		if ( name === "find" ) {
    			ret.selector = this.selector + (this.selector ? " " : "") + selector;
    		} else if ( name ) {
    			ret.selector = this.selector + "." + name + "(" + selector + ")";
    		}
    
    		// Return the newly-formed element set
    		return ret;
    	},
    
    	// Execute a callback for every element in the matched set.
    	// (You can seed the arguments with an array of args, but this is
    	// only used internally.)
    	each: function( callback, args ) {
    		return jQuery.each( this, callback, args );
    	},
    
    	ready: function( fn ) {
    		// Attach the listeners
    		jQuery.bindReady();
    
    		// Add the callback
    		readyList.done( fn );
    
    		return this;
    	},
    
    	eq: function( i ) {
    		return i === -1 ?
    			this.slice( i ) :
    			this.slice( i, +i + 1 );
    	},
    
    	first: function() {
    		return this.eq( 0 );
    	},
    
    	last: function() {
    		return this.eq( -1 );
    	},
    
    	slice: function() {
    		return this.pushStack( slice.apply( this, arguments ),
    			"slice", slice.call(arguments).join(",") );
    	},
    
    	map: function( callback ) {
    		return this.pushStack( jQuery.map(this, function( elem, i ) {
    			return callback.call( elem, i, elem );
    		}));
    	},
    
    	end: function() {
    		return this.prevObject || this.constructor(null);
    	},
    
    	// For internal use only.
    	// Behaves like an Array's method, not like a jQuery method.
    	push: push,
    	sort: [].sort,
    	splice: [].splice
    };
    
    // Give the init function the jQuery prototype for later instantiation
    jQuery.fn.init.prototype = jQuery.fn;
    
    jQuery.extend = jQuery.fn.extend = function() {
    	var options, name, src, copy, copyIsArray, clone,
    		target = arguments[0] || {},
    		i = 1,
    		length = arguments.length,
    		deep = false;
    
    	// Handle a deep copy situation
    	if ( typeof target === "boolean" ) {
    		deep = target;
    		target = arguments[1] || {};
    		// skip the boolean and the target
    		i = 2;
    	}
    
    	// Handle case when target is a string or something (possible in deep copy)
    	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    		target = {};
    	}
    
    	// extend jQuery itself if only one argument is passed
    	if ( length === i ) {
    		target = this;
    		--i;
    	}
    
    	for ( ; i < length; i++ ) {
    		// Only deal with non-null/undefined values
    		if ( (options = arguments[ i ]) != null ) {
    			// Extend the base object
    			for ( name in options ) {
    				src = target[ name ];
    				copy = options[ name ];
    
    				// Prevent never-ending loop
    				if ( target === copy ) {
    					continue;
    				}
    
    				// Recurse if we're merging plain objects or arrays
    				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
    					if ( copyIsArray ) {
    						copyIsArray = false;
    						clone = src && jQuery.isArray(src) ? src : [];
    
    					} else {
    						clone = src && jQuery.isPlainObject(src) ? src : {};
    					}
    
    					// Never move original objects, clone them
    					target[ name ] = jQuery.extend( deep, clone, copy );
    
    				// Don't bring in undefined values
    				} else if ( copy !== undefined ) {
    					target[ name ] = copy;
    				}
    			}
    		}
    	}
    
    	// Return the modified object
    	return target;
    };
    
    jQuery.extend({
    	noConflict: function( deep ) {
    		if ( window.$ === jQuery ) {
    			window.$ = _$;
    		}
    
    		if ( deep && window.jQuery === jQuery ) {
    			window.jQuery = _jQuery;
    		}
    
    		return jQuery;
    	},
    
    	// Is the DOM ready to be used? Set to true once it occurs.
    	isReady: false,
    
    	// A counter to track how many items to wait for before
    	// the ready event fires. See #6781
    	readyWait: 1,
    
    	// Hold (or release) the ready event
    	holdReady: function( hold ) {
    		if ( hold ) {
    			jQuery.readyWait++;
    		} else {
    			jQuery.ready( true );
    		}
    	},
    
    	// Handle when the DOM is ready
    	ready: function( wait ) {
    		// Either a released hold or an DOMready/load event and not yet ready
    		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
    			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
    			if ( !document.body ) {
    				return setTimeout( jQuery.ready, 1 );
    			}
    
    			// Remember that the DOM is ready
    			jQuery.isReady = true;
    
    			// If a normal DOM Ready event fired, decrement, and wait if need be
    			if ( wait !== true && --jQuery.readyWait > 0 ) {
    				return;
    			}
    
    			// If there are functions bound, to execute
    			readyList.resolveWith( document, [ jQuery ] );
    
    			// Trigger any bound ready events
    			if ( jQuery.fn.trigger ) {
    				jQuery( document ).trigger( "ready" ).unbind( "ready" );
    			}
    		}
    	},
    
    	bindReady: function() {
    		if ( readyList ) {
    			return;
    		}
    
    		readyList = jQuery._Deferred();
    
    		// Catch cases where $(document).ready() is called after the
    		// browser event has already occurred.
    		if ( document.readyState === "complete" ) {
    			// Handle it asynchronously to allow scripts the opportunity to delay ready
    			return setTimeout( jQuery.ready, 1 );
    		}
    
    		// Mozilla, Opera and webkit nightlies currently support this event
    		if ( document.addEventListener ) {
    			// Use the handy event callback
    			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
    
    			// A fallback to window.onload, that will always work
    			window.addEventListener( "load", jQuery.ready, false );
    
    		// If IE event model is used
    		} else if ( document.attachEvent ) {
    			// ensure firing before onload,
    			// maybe late but safe also for iframes
    			document.attachEvent( "onreadystatechange", DOMContentLoaded );
    
    			// A fallback to window.onload, that will always work
    			window.attachEvent( "onload", jQuery.ready );
    
    			// If IE and not a frame
    			// continually check to see if the document is ready
    			var toplevel = false;
    
    			try {
    				toplevel = window.frameElement == null;
    			} catch(e) {}
    
    			if ( document.documentElement.doScroll && toplevel ) {
    				doScrollCheck();
    			}
    		}
    	},
    
    	// See test/unit/core.js for details concerning isFunction.
    	// Since version 1.3, DOM methods and functions like alert
    	// aren't supported. They return false on IE (#2968).
    	isFunction: function( obj ) {
    		return jQuery.type(obj) === "function";
    	},
    
    	isArray: Array.isArray || function( obj ) {
    		return jQuery.type(obj) === "array";
    	},
    
    	// A crude way of determining if an object is a window
    	isWindow: function( obj ) {
    		return obj && typeof obj === "object" && "setInterval" in obj;
    	},
    
    	isNaN: function( obj ) {
    		return obj == null || !rdigit.test( obj ) || isNaN( obj );
    	},
    
    	type: function( obj ) {
    		return obj == null ?
    			String( obj ) :
    			class2type[ toString.call(obj) ] || "object";
    	},
    
    	isPlainObject: function( obj ) {
    		// Must be an Object.
    		// Because of IE, we also have to check the presence of the constructor property.
    		// Make sure that DOM nodes and window objects don't pass through, as well
    		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
    			return false;
    		}
    
    		// Not own constructor property must be Object
    		if ( obj.constructor &&
    			!hasOwn.call(obj, "constructor") &&
    			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
    			return false;
    		}
    
    		// Own properties are enumerated firstly, so to speed up,
    		// if last one is own, then all properties are own.
    
    		var key;
    		for ( key in obj ) {}
    
    		return key === undefined || hasOwn.call( obj, key );
    	},
    
    	isEmptyObject: function( obj ) {
    		for ( var name in obj ) {
    			return false;
    		}
    		return true;
    	},
    
    	error: function( msg ) {
    		throw msg;
    	},
    
    	parseJSON: function( data ) {
    		if ( typeof data !== "string" || !data ) {
    			return null;
    		}
    
    		// Make sure leading/trailing whitespace is removed (IE can't handle it)
    		data = jQuery.trim( data );
    
    		// Attempt to parse using the native JSON parser first
    		if ( window.JSON && window.JSON.parse ) {
    			return window.JSON.parse( data );
    		}
    
    		// Make sure the incoming data is actual JSON
    		// Logic borrowed from http://json.org/json2.js
    		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
    			.replace( rvalidtokens, "]" )
    			.replace( rvalidbraces, "")) ) {
    
    			return (new Function( "return " + data ))();
    
    		}
    		jQuery.error( "Invalid JSON: " + data );
    	},
    
    	// Cross-browser xml parsing
    	// (xml & tmp used internally)
    	parseXML: function( data , xml , tmp ) {
    
    		if ( window.DOMParser ) { // Standard
    			tmp = new DOMParser();
    			xml = tmp.parseFromString( data , "text/xml" );
    		} else { // IE
    			xml = new ActiveXObject( "Microsoft.XMLDOM" );
    			xml.async = "false";
    			xml.loadXML( data );
    		}
    
    		tmp = xml.documentElement;
    
    		if ( ! tmp || ! tmp.nodeName || tmp.nodeName === "parsererror" ) {
    			jQuery.error( "Invalid XML: " + data );
    		}
    
    		return xml;
    	},
    
    	noop: function() {},
    
    	// Evaluates a script in a global context
    	// Workarounds based on findings by Jim Driscoll
    	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
    	globalEval: function( data ) {
    		if ( data && rnotwhite.test( data ) ) {
    			// We use execScript on Internet Explorer
    			// We use an anonymous function so that context is window
    			// rather than jQuery in Firefox
    			( window.execScript || function( data ) {
    				window[ "eval" ].call( window, data );
    			} )( data );
    		}
    	},
    
    	// Converts a dashed string to camelCased string;
    	// Used by both the css and data modules
    	camelCase: function( string ) {
    		return string.replace( rdashAlpha, fcamelCase );
    	},
    
    	nodeName: function( elem, name ) {
    		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    	},
    
    	// args is for internal usage only
    	each: function( object, callback, args ) {
    		var name, i = 0,
    			length = object.length,
    			isObj = length === undefined || jQuery.isFunction( object );
    
    		if ( args ) {
    			if ( isObj ) {
    				for ( name in object ) {
    					if ( callback.apply( object[ name ], args ) === false ) {
    						break;
    					}
    				}
    			} else {
    				for ( ; i < length; ) {
    					if ( callback.apply( object[ i++ ], args ) === false ) {
    						break;
    					}
    				}
    			}
    
    		// A special, fast, case for the most common use of each
    		} else {
    			if ( isObj ) {
    				for ( name in object ) {
    					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
    						break;
    					}
    				}
    			} else {
    				for ( ; i < length; ) {
    					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
    						break;
    					}
    				}
    			}
    		}
    
    		return object;
    	},
    
    	// Use native String.trim function wherever possible
    	trim: trim ?
    		function( text ) {
    			return text == null ?
    				"" :
    				trim.call( text );
    		} :
    
    		// Otherwise use our own trimming functionality
    		function( text ) {
    			return text == null ?
    				"" :
    				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
    		},
    
    	// results is for internal usage only
    	makeArray: function( array, results ) {
    		var ret = results || [];
    
    		if ( array != null ) {
    			// The window, strings (and functions) also have 'length'
    			// The extra typeof function check is to prevent crashes
    			// in Safari 2 (See: #3039)
    			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
    			var type = jQuery.type( array );
    
    			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
    				push.call( ret, array );
    			} else {
    				jQuery.merge( ret, array );
    			}
    		}
    
    		return ret;
    	},
    
    	inArray: function( elem, array ) {
    
    		if ( indexOf ) {
    			return indexOf.call( array, elem );
    		}
    
    		for ( var i = 0, length = array.length; i < length; i++ ) {
    			if ( array[ i ] === elem ) {
    				return i;
    			}
    		}
    
    		return -1;
    	},
    
    	merge: function( first, second ) {
    		var i = first.length,
    			j = 0;
    
    		if ( typeof second.length === "number" ) {
    			for ( var l = second.length; j < l; j++ ) {
    				first[ i++ ] = second[ j ];
    			}
    
    		} else {
    			while ( second[j] !== undefined ) {
    				first[ i++ ] = second[ j++ ];
    			}
    		}
    
    		first.length = i;
    
    		return first;
    	},
    
    	grep: function( elems, callback, inv ) {
    		var ret = [], retVal;
    		inv = !!inv;
    
    		// Go through the array, only saving the items
    		// that pass the validator function
    		for ( var i = 0, length = elems.length; i < length; i++ ) {
    			retVal = !!callback( elems[ i ], i );
    			if ( inv !== retVal ) {
    				ret.push( elems[ i ] );
    			}
    		}
    
    		return ret;
    	},
    
    	// arg is for internal usage only
    	map: function( elems, callback, arg ) {
    		var value, key, ret = [],
    			i = 0,
    			length = elems.length,
    			// jquery objects are treated as arrays
    			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;
    
    		// Go through the array, translating each of the items to their
    		if ( isArray ) {
    			for ( ; i < length; i++ ) {
    				value = callback( elems[ i ], i, arg );
    
    				if ( value != null ) {
    					ret[ ret.length ] = value;
    				}
    			}
    
    		// Go through every key on the object,
    		} else {
    			for ( key in elems ) {
    				value = callback( elems[ key ], key, arg );
    
    				if ( value != null ) {
    					ret[ ret.length ] = value;
    				}
    			}
    		}
    
    		// Flatten any nested arrays
    		return ret.concat.apply( [], ret );
    	},
    
    	// A global GUID counter for objects
    	guid: 1,
    
    	// Bind a function to a context, optionally partially applying any
    	// arguments.
    	proxy: function( fn, context ) {
    		if ( typeof context === "string" ) {
    			var tmp = fn[ context ];
    			context = fn;
    			fn = tmp;
    		}
    
    		// Quick check to determine if target is callable, in the spec
    		// this throws a TypeError, but we will just return undefined.
    		if ( !jQuery.isFunction( fn ) ) {
    			return undefined;
    		}
    
    		// Simulated bind
    		var args = slice.call( arguments, 2 ),
    			proxy = function() {
    				return fn.apply( context, args.concat( slice.call( arguments ) ) );
    			};
    
    		// Set the guid of unique handler to the same of original handler, so it can be removed
    		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
    
    		return proxy;
    	},
    
    	// Mutifunctional method to get and set values to a collection
    	// The value/s can optionally be executed if it's a function
    	access: function( elems, key, value, exec, fn, pass ) {
    		var length = elems.length;
    
    		// Setting many attributes
    		if ( typeof key === "object" ) {
    			for ( var k in key ) {
    				jQuery.access( elems, k, key[k], exec, fn, value );
    			}
    			return elems;
    		}
    
    		// Setting one attribute
    		if ( value !== undefined ) {
    			// Optionally, function values get executed if exec is true
    			exec = !pass && exec && jQuery.isFunction(value);
    
    			for ( var i = 0; i < length; i++ ) {
    				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
    			}
    
    			return elems;
    		}
    
    		// Getting an attribute
    		return length ? fn( elems[0], key ) : undefined;
    	},
    
    	now: function() {
    		return (new Date()).getTime();
    	},
    
    	// Use of jQuery.browser is frowned upon.
    	// More details: http://docs.jquery.com/Utilities/jQuery.browser
    	uaMatch: function( ua ) {
    		ua = ua.toLowerCase();
    
    		var match = rwebkit.exec( ua ) ||
    			ropera.exec( ua ) ||
    			rmsie.exec( ua ) ||
    			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
    			[];
    
    		return { browser: match[1] || "", version: match[2] || "0" };
    	},
    
    	sub: function() {
    		function jQuerySub( selector, context ) {
    			return new jQuerySub.fn.init( selector, context );
    		}
    		jQuery.extend( true, jQuerySub, this );
    		jQuerySub.superclass = this;
    		jQuerySub.fn = jQuerySub.prototype = this();
    		jQuerySub.fn.constructor = jQuerySub;
    		jQuerySub.sub = this.sub;
    		jQuerySub.fn.init = function init( selector, context ) {
    			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
    				context = jQuerySub( context );
    			}
    
    			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
    		};
    		jQuerySub.fn.init.prototype = jQuerySub.fn;
    		var rootjQuerySub = jQuerySub(document);
    		return jQuerySub;
    	},
    
    	browser: {}
    });
    
    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
    	class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });
    
    browserMatch = jQuery.uaMatch( userAgent );
    if ( browserMatch.browser ) {
    	jQuery.browser[ browserMatch.browser ] = true;
    	jQuery.browser.version = browserMatch.version;
    }
    
    // Deprecated, use jQuery.browser.webkit instead
    if ( jQuery.browser.webkit ) {
    	jQuery.browser.safari = true;
    }
    
    // IE doesn't match non-breaking spaces with \s
    if ( rnotwhite.test( "\xA0" ) ) {
    	trimLeft = /^[\s\xA0]+/;
    	trimRight = /[\s\xA0]+$/;
    }
    
    // All jQuery objects should point back to these
    rootjQuery = jQuery(document);
    
    // Cleanup functions for the document ready method
    if ( document.addEventListener ) {
    	DOMContentLoaded = function() {
    		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
    		jQuery.ready();
    	};
    
    } else if ( document.attachEvent ) {
    	DOMContentLoaded = function() {
    		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
    		if ( document.readyState === "complete" ) {
    			document.detachEvent( "onreadystatechange", DOMContentLoaded );
    			jQuery.ready();
    		}
    	};
    }
    
    // The DOM ready check for Internet Explorer
    function doScrollCheck() {
    	if ( jQuery.isReady ) {
    		return;
    	}
    
    	try {
    		// If IE is used, use the trick by Diego Perini
    		// http://javascript.nwbox.com/IEContentLoaded/
    		document.documentElement.doScroll("left");
    	} catch(e) {
    		setTimeout( doScrollCheck, 1 );
    		return;
    	}
    
    	// and execute any waiting functions
    	jQuery.ready();
    }
    
    return jQuery;
    
    })();
    
    
    var // Promise methods
    	promiseMethods = "done fail isResolved isRejected promise then always pipe".split( " " ),
    	// Static reference to slice
    	sliceDeferred = [].slice;
    
    jQuery.extend({
    	// Create a simple deferred (one callbacks list)
    	_Deferred: function() {
    		var // callbacks list
    			callbacks = [],
    			// stored [ context , args ]
    			fired,
    			// to avoid firing when already doing so
    			firing,
    			// flag to know if the deferred has been cancelled
    			cancelled,
    			// the deferred itself
    			deferred  = {
    
    				// done( f1, f2, ...)
    				done: function() {
    					if ( !cancelled ) {
    						var args = arguments,
    							i,
    							length,
    							elem,
    							type,
    							_fired;
    						if ( fired ) {
    							_fired = fired;
    							fired = 0;
    						}
    						for ( i = 0, length = args.length; i < length; i++ ) {
    							elem = args[ i ];
    							type = jQuery.type( elem );
    							if ( type === "array" ) {
    								deferred.done.apply( deferred, elem );
    							} else if ( type === "function" ) {
    								callbacks.push( elem );
    							}
    						}
    						if ( _fired ) {
    							deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
    						}
    					}
    					return this;
    				},
    
    				// resolve with given context and args
    				resolveWith: function( context, args ) {
    					if ( !cancelled && !fired && !firing ) {
    						// make sure args are available (#8421)
    						args = args || [];
    						firing = 1;
    						try {
    							while( callbacks[ 0 ] ) {
    								callbacks.shift().apply( context, args );
    							}
    						}
    						finally {
    							fired = [ context, args ];
    							firing = 0;
    						}
    					}
    					return this;
    				},
    
    				// resolve with this as context and given arguments
    				resolve: function() {
    					deferred.resolveWith( this, arguments );
    					return this;
    				},
    
    				// Has this deferred been resolved?
    				isResolved: function() {
    					return !!( firing || fired );
    				},
    
    				// Cancel
    				cancel: function() {
    					cancelled = 1;
    					callbacks = [];
    					return this;
    				}
    			};
    
    		return deferred;
    	},
    
    	// Full fledged deferred (two callbacks list)
    	Deferred: function( func ) {
    		var deferred = jQuery._Deferred(),
    			failDeferred = jQuery._Deferred(),
    			promise;
    		// Add errorDeferred methods, then and promise
    		jQuery.extend( deferred, {
    			then: function( doneCallbacks, failCallbacks ) {
    				deferred.done( doneCallbacks ).fail( failCallbacks );
    				return this;
    			},
    			always: function() {
    				return deferred.done.apply( deferred, arguments ).fail.apply( this, arguments );
    			},
    			fail: failDeferred.done,
    			rejectWith: failDeferred.resolveWith,
    			reject: failDeferred.resolve,
    			isRejected: failDeferred.isResolved,
    			pipe: function( fnDone, fnFail ) {
    				return jQuery.Deferred(function( newDefer ) {
    					jQuery.each( {
    						done: [ fnDone, "resolve" ],
    						fail: [ fnFail, "reject" ]
    					}, function( handler, data ) {
    						var fn = data[ 0 ],
    							action = data[ 1 ],
    							returned;
    						if ( jQuery.isFunction( fn ) ) {
    							deferred[ handler ](function() {
    								returned = fn.apply( this, arguments );
    								if ( returned && jQuery.isFunction( returned.promise ) ) {
    									returned.promise().then( newDefer.resolve, newDefer.reject );
    								} else {
    									newDefer[ action ]( returned );
    								}
    							});
    						} else {
    							deferred[ handler ]( newDefer[ action ] );
    						}
    					});
    				}).promise();
    			},
    			// Get a promise for this deferred
    			// If obj is provided, the promise aspect is added to the object
    			promise: function( obj ) {
    				if ( obj == null ) {
    					if ( promise ) {
    						return promise;
    					}
    					promise = obj = {};
    				}
    				var i = promiseMethods.length;
    				while( i-- ) {
    					obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];
    				}
    				return obj;
    			}
    		});
    		// Make sure only one callback list will be used
    		deferred.done( failDeferred.cancel ).fail( deferred.cancel );
    		// Unexpose cancel
    		delete deferred.cancel;
    		// Call given func if any
    		if ( func ) {
    			func.call( deferred, deferred );
    		}
    		return deferred;
    	},
    
    	// Deferred helper
    	when: function( firstParam ) {
    		var args = arguments,
    			i = 0,
    			length = args.length,
    			count = length,
    			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
    				firstParam :
    				jQuery.Deferred();
    		function resolveFunc( i ) {
    			return function( value ) {
    				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
    				if ( !( --count ) ) {
    					// Strange bug in FF4:
    					// Values changed onto the arguments object sometimes end up as undefined values
    					// outside the $.when method. Cloning the object into a fresh array solves the issue
    					deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );
    				}
    			};
    		}
    		if ( length > 1 ) {
    			for( ; i < length; i++ ) {
    				if ( args[ i ] && jQuery.isFunction( args[ i ].promise ) ) {
    					args[ i ].promise().then( resolveFunc(i), deferred.reject );
    				} else {
    					--count;
    				}
    			}
    			if ( !count ) {
    				deferred.resolveWith( deferred, args );
    			}
    		} else if ( deferred !== firstParam ) {
    			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
    		}
    		return deferred.promise();
    	}
    });
    
    
    
    jQuery.support = (function() {
    
    	var div = document.createElement( "div" ),
    		documentElement = document.documentElement,
    		all,
    		a,
    		select,
    		opt,
    		input,
    		marginDiv,
    		support,
    		fragment,
    		body,
    		testElementParent,
    		testElement,
    		testElementStyle,
    		tds,
    		events,
    		eventName,
    		i,
    		isSupported;
    
    	// Preliminary tests
    	div.setAttribute("className", "t");
    	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    
    	all = div.getElementsByTagName( "*" );
    	a = div.getElementsByTagName( "a" )[ 0 ];
    
    	// Can't get basic test support
    	if ( !all || !all.length || !a ) {
    		return {};
    	}
    
    	// First batch of supports tests
    	select = document.createElement( "select" );
    	opt = select.appendChild( document.createElement("option") );
    	input = div.getElementsByTagName( "input" )[ 0 ];
    
    	support = {
    		// IE strips leading whitespace when .innerHTML is used
    		leadingWhitespace: ( div.firstChild.nodeType === 3 ),
    
    		// Make sure that tbody elements aren't automatically inserted
    		// IE will insert them into empty tables
    		tbody: !div.getElementsByTagName( "tbody" ).length,
    
    		// Make sure that link elements get serialized correctly by innerHTML
    		// This requires a wrapper element in IE
    		htmlSerialize: !!div.getElementsByTagName( "link" ).length,
    
    		// Get the style information from getAttribute
    		// (IE uses .cssText instead)
    		style: /top/.test( a.getAttribute("style") ),
    
    		// Make sure that URLs aren't manipulated
    		// (IE normalizes it by default)
    		hrefNormalized: ( a.getAttribute( "href" ) === "/a" ),
    
    		// Make sure that element opacity exists
    		// (IE uses filter instead)
    		// Use a regex to work around a WebKit issue. See #5145
    		opacity: /^0.55$/.test( a.style.opacity ),
    
    		// Verify style float existence
    		// (IE uses styleFloat instead of cssFloat)
    		cssFloat: !!a.style.cssFloat,
    
    		// Make sure that if no value is specified for a checkbox
    		// that it defaults to "on".
    		// (WebKit defaults to "" instead)
    		checkOn: ( input.value === "on" ),
    
    		// Make sure that a selected-by-default option has a working selected property.
    		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
    		optSelected: opt.selected,
    
    		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
    		getSetAttribute: div.className !== "t",
    
    		// Will be defined later
    		submitBubbles: true,
    		changeBubbles: true,
    		focusinBubbles: false,
    		deleteExpando: true,
    		noCloneEvent: true,
    		inlineBlockNeedsLayout: false,
    		shrinkWrapBlocks: false,
    		reliableMarginRight: true
    	};
    
    	// Make sure checked status is properly cloned
    	input.checked = true;
    	support.noCloneChecked = input.cloneNode( true ).checked;
    
    	// Make sure that the options inside disabled selects aren't marked as disabled
    	// (WebKit marks them as disabled)
    	select.disabled = true;
    	support.optDisabled = !opt.disabled;
    
    	// Test to see if it's possible to delete an expando from an element
    	// Fails in Internet Explorer
    	try {
    		delete div.test;
    	} catch( e ) {
    		support.deleteExpando = false;
    	}
    
    	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
    		div.attachEvent( "onclick", function() {
    			// Cloning a node shouldn't copy over any
    			// bound event handlers (IE does this)
    			support.noCloneEvent = false;
    		});
    		div.cloneNode( true ).fireEvent( "onclick" );
    	}
    
    	// Check if a radio maintains it's value
    	// after being appended to the DOM
    	input = document.createElement("input");
    	input.value = "t";
    	input.setAttribute("type", "radio");
    	support.radioValue = input.value === "t";
    
    	input.setAttribute("checked", "checked");
    	div.appendChild( input );
    	fragment = document.createDocumentFragment();
    	fragment.appendChild( div.firstChild );
    
    	// WebKit doesn't clone checked state correctly in fragments
    	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;
    
    	div.innerHTML = "";
    
    	// Figure out if the W3C box model works as expected
    	div.style.width = div.style.paddingLeft = "1px";
    
    	body = document.getElementsByTagName( "body" )[ 0 ];
    	// We use our own, invisible, body unless the body is already present
    	// in which case we use a div (#9239)
    	testElement = document.createElement( body ? "div" : "body" );
    	testElementStyle = {
    		visibility: "hidden",
    		width: 0,
    		height: 0,
    		border: 0,
    		margin: 0
    	};
    	if ( body ) {
    		jQuery.extend( testElementStyle, {
    			position: "absolute",
    			left: -1000,
    			top: -1000
    		});
    	}
    	for ( i in testElementStyle ) {
    		testElement.style[ i ] = testElementStyle[ i ];
    	}
    	testElement.appendChild( div );
    	testElementParent = body || documentElement;
    	testElementParent.insertBefore( testElement, testElementParent.firstChild );
    
    	// Check if a disconnected checkbox will retain its checked
    	// value of true after appended to the DOM (IE6/7)
    	support.appendChecked = input.checked;
    
    	support.boxModel = div.offsetWidth === 2;
    
    	if ( "zoom" in div.style ) {
    		// Check if natively block-level elements act like inline-block
    		// elements when setting their display to 'inline' and giving
    		// them layout
    		// (IE < 8 does this)
    		div.style.display = "inline";
    		div.style.zoom = 1;
    		support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );
    
    		// Check if elements with layout shrink-wrap their children
    		// (IE 6 does this)
    		div.style.display = "";
    		div.innerHTML = "<div style='width:4px;'></div>";
    		support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
    	}
    
    	div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
    	tds = div.getElementsByTagName( "td" );
    
    	// Check if table cells still have offsetWidth/Height when they are set
    	// to display:none and there are still other visible table cells in a
    	// table row; if so, offsetWidth/Height are not reliable for use when
    	// determining if an element has been hidden directly using
    	// display:none (it is still safe to use offsets if a parent element is
    	// hidden; don safety goggles and see bug #4512 for more information).
    	// (only IE 8 fails this test)
    	isSupported = ( tds[ 0 ].offsetHeight === 0 );
    
    	tds[ 0 ].style.display = "";
    	tds[ 1 ].style.display = "none";
    
    	// Check if empty table cells still have offsetWidth/Height
    	// (IE < 8 fail this test)
    	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );
    	div.innerHTML = "";
    
    	// Check if div with explicit width and no margin-right incorrectly
    	// gets computed margin-right based on width of container. For more
    	// info see bug #3333
    	// Fails in WebKit before Feb 2011 nightlies
    	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
    	if ( document.defaultView && document.defaultView.getComputedStyle ) {
    		marginDiv = document.createElement( "div" );
    		marginDiv.style.width = "0";
    		marginDiv.style.marginRight = "0";
    		div.appendChild( marginDiv );
    		support.reliableMarginRight =
    			( parseInt( ( document.defaultView.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
    	}
    
    	// Remove the body element we added
    	testElement.innerHTML = "";
    	testElementParent.removeChild( testElement );
    
    	// Technique from Juriy Zaytsev
    	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
    	// We only care about the case where non-standard event systems
    	// are used, namely in IE. Short-circuiting here helps us to
    	// avoid an eval call (in setAttribute) which can cause CSP
    	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
    	if ( div.attachEvent ) {
    		for( i in {
    			submit: 1,
    			change: 1,
    			focusin: 1
    		} ) {
    			eventName = "on" + i;
    			isSupported = ( eventName in div );
    			if ( !isSupported ) {
    				div.setAttribute( eventName, "return;" );
    				isSupported = ( typeof div[ eventName ] === "function" );
    			}
    			support[ i + "Bubbles" ] = isSupported;
    		}
    	}
    
    	// Null connected elements to avoid leaks in IE
    	testElement = fragment = select = opt = body = marginDiv = div = input = null;
    
    	return support;
    })();
    
    // Keep track of boxModel
    jQuery.boxModel = jQuery.support.boxModel;
    
    
    
    
    var rbrace = /^(?:\{.*\}|\[.*\])$/,
    	rmultiDash = /([a-z])([A-Z])/g;
    
    jQuery.extend({
    	cache: {},
    
    	// Please use with caution
    	uuid: 0,
    
    	// Unique for each copy of jQuery on the page
    	// Non-digits removed to match rinlinejQuery
    	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),
    
    	// The following elements throw uncatchable exceptions if you
    	// attempt to add expando properties to them.
    	noData: {
    		"embed": true,
    		// Ban all objects except for Flash (which handle expandos)
    		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    		"applet": true
    	},
    
    	hasData: function( elem ) {
    		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
    
    		return !!elem && !isEmptyDataObject( elem );
    	},
    
    	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
    		if ( !jQuery.acceptData( elem ) ) {
    			return;
    		}
    
    		var internalKey = jQuery.expando, getByName = typeof name === "string", thisCache,
    
    			// We have to handle DOM nodes and JS objects differently because IE6-7
    			// can't GC object references properly across the DOM-JS boundary
    			isNode = elem.nodeType,
    
    			// Only DOM nodes need the global jQuery cache; JS object data is
    			// attached directly to the object so GC can occur automatically
    			cache = isNode ? jQuery.cache : elem,
    
    			// Only defining an ID for JS objects if its cache already exists allows
    			// the code to shortcut on the same path as a DOM node with no cache
    			id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando;
    
    		// Avoid doing any more work than we need to when trying to get data on an
    		// object that has no data at all
    		if ( (!id || (pvt && id && !cache[ id ][ internalKey ])) && getByName && data === undefined ) {
    			return;
    		}
    
    		if ( !id ) {
    			// Only DOM nodes need a new unique ID for each element since their data
    			// ends up in the global cache
    			if ( isNode ) {
    				elem[ jQuery.expando ] = id = ++jQuery.uuid;
    			} else {
    				id = jQuery.expando;
    			}
    		}
    
    		if ( !cache[ id ] ) {
    			cache[ id ] = {};
    
    			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
    			// metadata on plain JS objects when the object is serialized using
    			// JSON.stringify
    			if ( !isNode ) {
    				cache[ id ].toJSON = jQuery.noop;
    			}
    		}
    
    		// An object can be passed to jQuery.data instead of a key/value pair; this gets
    		// shallow copied over onto the existing cache
    		if ( typeof name === "object" || typeof name === "function" ) {
    			if ( pvt ) {
    				cache[ id ][ internalKey ] = jQuery.extend(cache[ id ][ internalKey ], name);
    			} else {
    				cache[ id ] = jQuery.extend(cache[ id ], name);
    			}
    		}
    
    		thisCache = cache[ id ];
    
    		// Internal jQuery data is stored in a separate object inside the object's data
    		// cache in order to avoid key collisions between internal data and user-defined
    		// data
    		if ( pvt ) {
    			if ( !thisCache[ internalKey ] ) {
    				thisCache[ internalKey ] = {};
    			}
    
    			thisCache = thisCache[ internalKey ];
    		}
    
    		if ( data !== undefined ) {
    			thisCache[ jQuery.camelCase( name ) ] = data;
    		}
    
    		// TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should
    		// not attempt to inspect the internal events object using jQuery.data, as this
    		// internal data object is undocumented and subject to change.
    		if ( name === "events" && !thisCache[name] ) {
    			return thisCache[ internalKey ] && thisCache[ internalKey ].events;
    		}
    
    		return getByName ? 
    			// Check for both converted-to-camel and non-converted data property names
    			thisCache[ jQuery.camelCase( name ) ] || thisCache[ name ] :
    			thisCache;
    	},
    
    	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
    		if ( !jQuery.acceptData( elem ) ) {
    			return;
    		}
    
    		var internalKey = jQuery.expando, isNode = elem.nodeType,
    
    			// See jQuery.data for more information
    			cache = isNode ? jQuery.cache : elem,
    
    			// See jQuery.data for more information
    			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;
    
    		// If there is already no cache entry for this object, there is no
    		// purpose in continuing
    		if ( !cache[ id ] ) {
    			return;
    		}
    
    		if ( name ) {
    			var thisCache = pvt ? cache[ id ][ internalKey ] : cache[ id ];
    
    			if ( thisCache ) {
    				delete thisCache[ name ];
    
    				// If there is no data left in the cache, we want to continue
    				// and let the cache object itself get destroyed
    				if ( !isEmptyDataObject(thisCache) ) {
    					return;
    				}
    			}
    		}
    
    		// See jQuery.data for more information
    		if ( pvt ) {
    			delete cache[ id ][ internalKey ];
    
    			// Don't destroy the parent cache unless the internal data object
    			// had been the only thing left in it
    			if ( !isEmptyDataObject(cache[ id ]) ) {
    				return;
    			}
    		}
    
    		var internalCache = cache[ id ][ internalKey ];
    
    		// Browsers that fail expando deletion also refuse to delete expandos on
    		// the window, but it will allow it on all other JS objects; other browsers
    		// don't care
    		if ( jQuery.support.deleteExpando || cache != window ) {
    			delete cache[ id ];
    		} else {
    			cache[ id ] = null;
    		}
    
    		// We destroyed the entire user cache at once because it's faster than
    		// iterating through each key, but we need to continue to persist internal
    		// data if it existed
    		if ( internalCache ) {
    			cache[ id ] = {};
    			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
    			// metadata on plain JS objects when the object is serialized using
    			// JSON.stringify
    			if ( !isNode ) {
    				cache[ id ].toJSON = jQuery.noop;
    			}
    
    			cache[ id ][ internalKey ] = internalCache;
    
    		// Otherwise, we need to eliminate the expando on the node to avoid
    		// false lookups in the cache for entries that no longer exist
    		} else if ( isNode ) {
    			// IE does not allow us to delete expando properties from nodes,
    			// nor does it have a removeAttribute function on Document nodes;
    			// we must handle all of these cases
    			if ( jQuery.support.deleteExpando ) {
    				delete elem[ jQuery.expando ];
    			} else if ( elem.removeAttribute ) {
    				elem.removeAttribute( jQuery.expando );
    			} else {
    				elem[ jQuery.expando ] = null;
    			}
    		}
    	},
    
    	// For internal use only.
    	_data: function( elem, name, data ) {
    		return jQuery.data( elem, name, data, true );
    	},
    
    	// A method for determining if a DOM node can handle the data expando
    	acceptData: function( elem ) {
    		if ( elem.nodeName ) {
    			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];
    
    			if ( match ) {
    				return !(match === true || elem.getAttribute("classid") !== match);
    			}
    		}
    
    		return true;
    	}
    });
    
    jQuery.fn.extend({
    	data: function( key, value ) {
    		var data = null;
    
    		if ( typeof key === "undefined" ) {
    			if ( this.length ) {
    				data = jQuery.data( this[0] );
    
    				if ( this[0].nodeType === 1 ) {
    			    var attr = this[0].attributes, name;
    					for ( var i = 0, l = attr.length; i < l; i++ ) {
    						name = attr[i].name;
    
    						if ( name.indexOf( "data-" ) === 0 ) {
    							name = jQuery.camelCase( name.substring(5) );
    
    							dataAttr( this[0], name, data[ name ] );
    						}
    					}
    				}
    			}
    
    			return data;
    
    		} else if ( typeof key === "object" ) {
    			return this.each(function() {
    				jQuery.data( this, key );
    			});
    		}
    
    		var parts = key.split(".");
    		parts[1] = parts[1] ? "." + parts[1] : "";
    
    		if ( value === undefined ) {
    			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
    
    			// Try to fetch any internally stored data first
    			if ( data === undefined && this.length ) {
    				data = jQuery.data( this[0], key );
    				data = dataAttr( this[0], key, data );
    			}
    
    			return data === undefined && parts[1] ?
    				this.data( parts[0] ) :
    				data;
    
    		} else {
    			return this.each(function() {
    				var $this = jQuery( this ),
    					args = [ parts[0], value ];
    
    				$this.triggerHandler( "setData" + parts[1] + "!", args );
    				jQuery.data( this, key, value );
    				$this.triggerHandler( "changeData" + parts[1] + "!", args );
    			});
    		}
    	},
    
    	removeData: function( key ) {
    		return this.each(function() {
    			jQuery.removeData( this, key );
    		});
    	}
    });
    
    function dataAttr( elem, key, data ) {
    	// If nothing was found internally, try to fetch any
    	// data from the HTML5 data-* attribute
    	if ( data === undefined && elem.nodeType === 1 ) {
    		var name = "data-" + key.replace( rmultiDash, "$1-$2" ).toLowerCase();
    
    		data = elem.getAttribute( name );
    
    		if ( typeof data === "string" ) {
    			try {
    				data = data === "true" ? true :
    				data === "false" ? false :
    				data === "null" ? null :
    				!jQuery.isNaN( data ) ? parseFloat( data ) :
    					rbrace.test( data ) ? jQuery.parseJSON( data ) :
    					data;
    			} catch( e ) {}
    
    			// Make sure we set the data so it isn't changed later
    			jQuery.data( elem, key, data );
    
    		} else {
    			data = undefined;
    		}
    	}
    
    	return data;
    }
    
    // TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON
    // property to be considered empty objects; this property always exists in
    // order to make sure JSON.stringify does not expose internal metadata
    function isEmptyDataObject( obj ) {
    	for ( var name in obj ) {
    		if ( name !== "toJSON" ) {
    			return false;
    		}
    	}
    
    	return true;
    }
    
    
    
    
    function handleQueueMarkDefer( elem, type, src ) {
    	var deferDataKey = type + "defer",
    		queueDataKey = type + "queue",
    		markDataKey = type + "mark",
    		defer = jQuery.data( elem, deferDataKey, undefined, true );
    	if ( defer &&
    		( src === "queue" || !jQuery.data( elem, queueDataKey, undefined, true ) ) &&
    		( src === "mark" || !jQuery.data( elem, markDataKey, undefined, true ) ) ) {
    		// Give room for hard-coded callbacks to fire first
    		// and eventually mark/queue something else on the element
    		setTimeout( function() {
    			if ( !jQuery.data( elem, queueDataKey, undefined, true ) &&
    				!jQuery.data( elem, markDataKey, undefined, true ) ) {
    				jQuery.removeData( elem, deferDataKey, true );
    				defer.resolve();
    			}
    		}, 0 );
    	}
    }
    
    jQuery.extend({
    
    	_mark: function( elem, type ) {
    		if ( elem ) {
    			type = (type || "fx") + "mark";
    			jQuery.data( elem, type, (jQuery.data(elem,type,undefined,true) || 0) + 1, true );
    		}
    	},
    
    	_unmark: function( force, elem, type ) {
    		if ( force !== true ) {
    			type = elem;
    			elem = force;
    			force = false;
    		}
    		if ( elem ) {
    			type = type || "fx";
    			var key = type + "mark",
    				count = force ? 0 : ( (jQuery.data( elem, key, undefined, true) || 1 ) - 1 );
    			if ( count ) {
    				jQuery.data( elem, key, count, true );
    			} else {
    				jQuery.removeData( elem, key, true );
    				handleQueueMarkDefer( elem, type, "mark" );
    			}
    		}
    	},
    
    	queue: function( elem, type, data ) {
    		if ( elem ) {
    			type = (type || "fx") + "queue";
    			var q = jQuery.data( elem, type, undefined, true );
    			// Speed up dequeue by getting out quickly if this is just a lookup
    			if ( data ) {
    				if ( !q || jQuery.isArray(data) ) {
    					q = jQuery.data( elem, type, jQuery.makeArray(data), true );
    				} else {
    					q.push( data );
    				}
    			}
    			return q || [];
    		}
    	},
    
    	dequeue: function( elem, type ) {
    		type = type || "fx";
    
    		var queue = jQuery.queue( elem, type ),
    			fn = queue.shift(),
    			defer;
    
    		// If the fx queue is dequeued, always remove the progress sentinel
    		if ( fn === "inprogress" ) {
    			fn = queue.shift();
    		}
    
    		if ( fn ) {
    			// Add a progress sentinel to prevent the fx queue from being
    			// automatically dequeued
    			if ( type === "fx" ) {
    				queue.unshift("inprogress");
    			}
    
    			fn.call(elem, function() {
    				jQuery.dequeue(elem, type);
    			});
    		}
    
    		if ( !queue.length ) {
    			jQuery.removeData( elem, type + "queue", true );
    			handleQueueMarkDefer( elem, type, "queue" );
    		}
    	}
    });
    
    jQuery.fn.extend({
    	queue: function( type, data ) {
    		if ( typeof type !== "string" ) {
    			data = type;
    			type = "fx";
    		}
    
    		if ( data === undefined ) {
    			return jQuery.queue( this[0], type );
    		}
    		return this.each(function() {
    			var queue = jQuery.queue( this, type, data );
    
    			if ( type === "fx" && queue[0] !== "inprogress" ) {
    				jQuery.dequeue( this, type );
    			}
    		});
    	},
    	dequeue: function( type ) {
    		return this.each(function() {
    			jQuery.dequeue( this, type );
    		});
    	},
    	// Based off of the plugin by Clint Helfers, with permission.
    	// http://blindsignals.com/index.php/2009/07/jquery-delay/
    	delay: function( time, type ) {
    		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    		type = type || "fx";
    
    		return this.queue( type, function() {
    			var elem = this;
    			setTimeout(function() {
    				jQuery.dequeue( elem, type );
    			}, time );
    		});
    	},
    	clearQueue: function( type ) {
    		return this.queue( type || "fx", [] );
    	},
    	// Get a promise resolved when queues of a certain type
    	// are emptied (fx is the type by default)
    	promise: function( type, object ) {
    		if ( typeof type !== "string" ) {
    			object = type;
    			type = undefined;
    		}
    		type = type || "fx";
    		var defer = jQuery.Deferred(),
    			elements = this,
    			i = elements.length,
    			count = 1,
    			deferDataKey = type + "defer",
    			queueDataKey = type + "queue",
    			markDataKey = type + "mark",
    			tmp;
    		function resolve() {
    			if ( !( --count ) ) {
    				defer.resolveWith( elements, [ elements ] );
    			}
    		}
    		while( i-- ) {
    			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
    					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
    						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
    					jQuery.data( elements[ i ], deferDataKey, jQuery._Deferred(), true ) )) {
    				count++;
    				tmp.done( resolve );
    			}
    		}
    		resolve();
    		return defer.promise();
    	}
    });
    
    
    
    
    var rclass = /[\n\t\r]/g,
    	rspace = /\s+/,
    	rreturn = /\r/g,
    	rtype = /^(?:button|input)$/i,
    	rfocusable = /^(?:button|input|object|select|textarea)$/i,
    	rclickable = /^a(?:rea)?$/i,
    	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    	rinvalidChar = /\:|^on/,
    	formHook, boolHook;
    
    jQuery.fn.extend({
    	attr: function( name, value ) {
    		return jQuery.access( this, name, value, true, jQuery.attr );
    	},
    
    	removeAttr: function( name ) {
    		return this.each(function() {
    			jQuery.removeAttr( this, name );
    		});
    	},
    	
    	prop: function( name, value ) {
    		return jQuery.access( this, name, value, true, jQuery.prop );
    	},
    	
    	removeProp: function( name ) {
    		name = jQuery.propFix[ name ] || name;
    		return this.each(function() {
    			// try/catch handles cases where IE balks (such as removing a property on window)
    			try {
    				this[ name ] = undefined;
    				delete this[ name ];
    			} catch( e ) {}
    		});
    	},
    
    	addClass: function( value ) {
    		var classNames, i, l, elem,
    			setClass, c, cl;
    
    		if ( jQuery.isFunction( value ) ) {
    			return this.each(function( j ) {
    				jQuery( this ).addClass( value.call(this, j, this.className) );
    			});
    		}
    
    		if ( value && typeof value === "string" ) {
    			classNames = value.split( rspace );
    
    			for ( i = 0, l = this.length; i < l; i++ ) {
    				elem = this[ i ];
    
    				if ( elem.nodeType === 1 ) {
    					if ( !elem.className && classNames.length === 1 ) {
    						elem.className = value;
    
    					} else {
    						setClass = " " + elem.className + " ";
    
    						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
    							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
    								setClass += classNames[ c ] + " ";
    							}
    						}
    						elem.className = jQuery.trim( setClass );
    					}
    				}
    			}
    		}
    
    		return this;
    	},
    
    	removeClass: function( value ) {
    		var classNames, i, l, elem, className, c, cl;
    
    		if ( jQuery.isFunction( value ) ) {
    			return this.each(function( j ) {
    				jQuery( this ).removeClass( value.call(this, j, this.className) );
    			});
    		}
    
    		if ( (value && typeof value === "string") || value === undefined ) {
    			classNames = (value || "").split( rspace );
    
    			for ( i = 0, l = this.length; i < l; i++ ) {
    				elem = this[ i ];
    
    				if ( elem.nodeType === 1 && elem.className ) {
    					if ( value ) {
    						className = (" " + elem.className + " ").replace( rclass, " " );
    						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
    							className = className.replace(" " + classNames[ c ] + " ", " ");
    						}
    						elem.className = jQuery.trim( className );
    
    					} else {
    						elem.className = "";
    					}
    				}
    			}
    		}
    
    		return this;
    	},
    
    	toggleClass: function( value, stateVal ) {
    		var type = typeof value,
    			isBool = typeof stateVal === "boolean";
    
    		if ( jQuery.isFunction( value ) ) {
    			return this.each(function( i ) {
    				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
    			});
    		}
    
    		return this.each(function() {
    			if ( type === "string" ) {
    				// toggle individual class names
    				var className,
    					i = 0,
    					self = jQuery( this ),
    					state = stateVal,
    					classNames = value.split( rspace );
    
    				while ( (className = classNames[ i++ ]) ) {
    					// check each className given, space seperated list
    					state = isBool ? state : !self.hasClass( className );
    					self[ state ? "addClass" : "removeClass" ]( className );
    				}
    
    			} else if ( type === "undefined" || type === "boolean" ) {
    				if ( this.className ) {
    					// store className if set
    					jQuery._data( this, "__className__", this.className );
    				}
    
    				// toggle whole className
    				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
    			}
    		});
    	},
    
    	hasClass: function( selector ) {
    		var className = " " + selector + " ";
    		for ( var i = 0, l = this.length; i < l; i++ ) {
    			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
    				return true;
    			}
    		}
    
    		return false;
    	},
    
    	val: function( value ) {
    		var hooks, ret,
    			elem = this[0];
    		
    		if ( !arguments.length ) {
    			if ( elem ) {
    				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];
    
    				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
    					return ret;
    				}
    
    				ret = elem.value;
    
    				return typeof ret === "string" ? 
    					// handle most common string cases
    					ret.replace(rreturn, "") : 
    					// handle cases where value is null/undef or number
    					ret == null ? "" : ret;
    			}
    
    			return undefined;
    		}
    
    		var isFunction = jQuery.isFunction( value );
    
    		return this.each(function( i ) {
    			var self = jQuery(this), val;
    
    			if ( this.nodeType !== 1 ) {
    				return;
    			}
    
    			if ( isFunction ) {
    				val = value.call( this, i, self.val() );
    			} else {
    				val = value;
    			}
    
    			// Treat null/undefined as ""; convert numbers to string
    			if ( val == null ) {
    				val = "";
    			} else if ( typeof val === "number" ) {
    				val += "";
    			} else if ( jQuery.isArray( val ) ) {
    				val = jQuery.map(val, function ( value ) {
    					return value == null ? "" : value + "";
    				});
    			}
    
    			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];
    
    			// If set returns undefined, fall back to normal setting
    			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
    				this.value = val;
    			}
    		});
    	}
    });
    
    jQuery.extend({
    	valHooks: {
    		option: {
    			get: function( elem ) {
    				// attributes.value is undefined in Blackberry 4.7 but
    				// uses .value. See #6932
    				var val = elem.attributes.value;
    				return !val || val.specified ? elem.value : elem.text;
    			}
    		},
    		select: {
    			get: function( elem ) {
    				var value,
    					index = elem.selectedIndex,
    					values = [],
    					options = elem.options,
    					one = elem.type === "select-one";
    
    				// Nothing was selected
    				if ( index < 0 ) {
    					return null;
    				}
    
    				// Loop through all the selected options
    				for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
    					var option = options[ i ];
    
    					// Don't return options that are disabled or in a disabled optgroup
    					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
    							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {
    
    						// Get the specific value for the option
    						value = jQuery( option ).val();
    
    						// We don't need an array for one selects
    						if ( one ) {
    							return value;
    						}
    
    						// Multi-Selects return an array
    						values.push( value );
    					}
    				}
    
    				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
    				if ( one && !values.length && options.length ) {
    					return jQuery( options[ index ] ).val();
    				}
    
    				return values;
    			},
    
    			set: function( elem, value ) {
    				var values = jQuery.makeArray( value );
    
    				jQuery(elem).find("option").each(function() {
    					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
    				});
    
    				if ( !values.length ) {
    					elem.selectedIndex = -1;
    				}
    				return values;
    			}
    		}
    	},
    
    	attrFn: {
    		val: true,
    		css: true,
    		html: true,
    		text: true,
    		data: true,
    		width: true,
    		height: true,
    		offset: true
    	},
    	
    	attrFix: {
    		// Always normalize to ensure hook usage
    		tabindex: "tabIndex"
    	},
    	
    	attr: function( elem, name, value, pass ) {
    		var nType = elem.nodeType;
    		
    		// don't get/set attributes on text, comment and attribute nodes
    		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
    			return undefined;
    		}
    
    		if ( pass && name in jQuery.attrFn ) {
    			return jQuery( elem )[ name ]( value );
    		}
    
    		// Fallback to prop when attributes are not supported
    		if ( !("getAttribute" in elem) ) {
    			return jQuery.prop( elem, name, value );
    		}
    
    		var ret, hooks,
    			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
    
    		// Normalize the name if needed
    		if ( notxml ) {
    			name = jQuery.attrFix[ name ] || name;
    
    			hooks = jQuery.attrHooks[ name ];
    
    			if ( !hooks ) {
    				// Use boolHook for boolean attributes
    				if ( rboolean.test( name ) ) {
    
    					hooks = boolHook;
    
    				// Use formHook for forms and if the name contains certain characters
    				} else if ( formHook && name !== "className" &&
    					(jQuery.nodeName( elem, "form" ) || rinvalidChar.test( name )) ) {
    
    					hooks = formHook;
    				}
    			}
    		}
    
    		if ( value !== undefined ) {
    
    			if ( value === null ) {
    				jQuery.removeAttr( elem, name );
    				return undefined;
    
    			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
    				return ret;
    
    			} else {
    				elem.setAttribute( name, "" + value );
    				return value;
    			}
    
    		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
    			return ret;
    
    		} else {
    
    			ret = elem.getAttribute( name );
    
    			// Non-existent attributes return null, we normalize to undefined
    			return ret === null ?
    				undefined :
    				ret;
    		}
    	},
    
    	removeAttr: function( elem, name ) {
    		var propName;
    		if ( elem.nodeType === 1 ) {
    			name = jQuery.attrFix[ name ] || name;
    		
    			if ( jQuery.support.getSetAttribute ) {
    				// Use removeAttribute in browsers that support it
    				elem.removeAttribute( name );
    			} else {
    				jQuery.attr( elem, name, "" );
    				elem.removeAttributeNode( elem.getAttributeNode( name ) );
    			}
    
    			// Set corresponding property to false for boolean attributes
    			if ( rboolean.test( name ) && (propName = jQuery.propFix[ name ] || name) in elem ) {
    				elem[ propName ] = false;
    			}
    		}
    	},
    
    	attrHooks: {
    		type: {
    			set: function( elem, value ) {
    				// We can't allow the type property to be changed (since it causes problems in IE)
    				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
    					jQuery.error( "type property can't be changed" );
    				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
    					// Setting the type on a radio button after the value resets the value in IE6-9
    					// Reset value to it's default in case type is set after value
    					// This is for element creation
    					var val = elem.value;
    					elem.setAttribute( "type", value );
    					if ( val ) {
    						elem.value = val;
    					}
    					return value;
    				}
    			}
    		},
    		tabIndex: {
    			get: function( elem ) {
    				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
    				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
    				var attributeNode = elem.getAttributeNode("tabIndex");
    
    				return attributeNode && attributeNode.specified ?
    					parseInt( attributeNode.value, 10 ) :
    					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
    						0 :
    						undefined;
    			}
    		},
    		// Use the value property for back compat
    		// Use the formHook for button elements in IE6/7 (#1954)
    		value: {
    			get: function( elem, name ) {
    				if ( formHook && jQuery.nodeName( elem, "button" ) ) {
    					return formHook.get( elem, name );
    				}
    				return name in elem ?
    					elem.value :
    					null;
    			},
    			set: function( elem, value, name ) {
    				if ( formHook && jQuery.nodeName( elem, "button" ) ) {
    					return formHook.set( elem, value, name );
    				}
    				// Does not return so that setAttribute is also used
    				elem.value = value;
    			}
    		}
    	},
    
    	propFix: {
    		tabindex: "tabIndex",
    		readonly: "readOnly",
    		"for": "htmlFor",
    		"class": "className",
    		maxlength: "maxLength",
    		cellspacing: "cellSpacing",
    		cellpadding: "cellPadding",
    		rowspan: "rowSpan",
    		colspan: "colSpan",
    		usemap: "useMap",
    		frameborder: "frameBorder",
    		contenteditable: "contentEditable"
    	},
    	
    	prop: function( elem, name, value ) {
    		var nType = elem.nodeType;
    
    		// don't get/set properties on text, comment and attribute nodes
    		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
    			return undefined;
    		}
    
    		var ret, hooks,
    			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
    
    		if ( notxml ) {
    			// Fix name and attach hooks
    			name = jQuery.propFix[ name ] || name;
    			hooks = jQuery.propHooks[ name ];
    		}
    
    		if ( value !== undefined ) {
    			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
    				return ret;
    
    			} else {
    				return (elem[ name ] = value);
    			}
    
    		} else {
    			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== undefined ) {
    				return ret;
    
    			} else {
    				return elem[ name ];
    			}
    		}
    	},
    	
    	propHooks: {}
    });
    
    // Hook for boolean attributes
    boolHook = {
    	get: function( elem, name ) {
    		// Align boolean attributes with corresponding properties
    		return jQuery.prop( elem, name ) ?
    			name.toLowerCase() :
    			undefined;
    	},
    	set: function( elem, value, name ) {
    		var propName;
    		if ( value === false ) {
    			// Remove boolean attributes when set to false
    			jQuery.removeAttr( elem, name );
    		} else {
    			// value is true since we know at this point it's type boolean and not false
    			// Set boolean attributes to the same name and set the DOM property
    			propName = jQuery.propFix[ name ] || name;
    			if ( propName in elem ) {
    				// Only set the IDL specifically if it already exists on the element
    				elem[ propName ] = true;
    			}
    
    			elem.setAttribute( name, name.toLowerCase() );
    		}
    		return name;
    	}
    };
    
    // IE6/7 do not support getting/setting some attributes with get/setAttribute
    if ( !jQuery.support.getSetAttribute ) {
    
    	// propFix is more comprehensive and contains all fixes
    	jQuery.attrFix = jQuery.propFix;
    	
    	// Use this for any attribute on a form in IE6/7
    	formHook = jQuery.attrHooks.name = jQuery.attrHooks.title = jQuery.valHooks.button = {
    		get: function( elem, name ) {
    			var ret;
    			ret = elem.getAttributeNode( name );
    			// Return undefined if nodeValue is empty string
    			return ret && ret.nodeValue !== "" ?
    				ret.nodeValue :
    				undefined;
    		},
    		set: function( elem, value, name ) {
    			// Check form objects in IE (multiple bugs related)
    			// Only use nodeValue if the attribute node exists on the form
    			var ret = elem.getAttributeNode( name );
    			if ( ret ) {
    				ret.nodeValue = value;
    				return value;
    			}
    		}
    	};
    
    	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
    	// This is for removals
    	jQuery.each([ "width", "height" ], function( i, name ) {
    		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
    			set: function( elem, value ) {
    				if ( value === "" ) {
    					elem.setAttribute( name, "auto" );
    					return value;
    				}
    			}
    		});
    	});
    }
    
    
    // Some attributes require a special call on IE
    if ( !jQuery.support.hrefNormalized ) {
    	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
    		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
    			get: function( elem ) {
    				var ret = elem.getAttribute( name, 2 );
    				return ret === null ? undefined : ret;
    			}
    		});
    	});
    }
    
    if ( !jQuery.support.style ) {
    	jQuery.attrHooks.style = {
    		get: function( elem ) {
    			// Return undefined in the case of empty string
    			// Normalize to lowercase since IE uppercases css property names
    			return elem.style.cssText.toLowerCase() || undefined;
    		},
    		set: function( elem, value ) {
    			return (elem.style.cssText = "" + value);
    		}
    	};
    }
    
    // Safari mis-reports the default selected property of an option
    // Accessing the parent's selectedIndex property fixes it
    if ( !jQuery.support.optSelected ) {
    	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
    		get: function( elem ) {
    			var parent = elem.parentNode;
    
    			if ( parent ) {
    				parent.selectedIndex;
    
    				// Make sure that it also works with optgroups, see #5701
    				if ( parent.parentNode ) {
    					parent.parentNode.selectedIndex;
    				}
    			}
    		}
    	});
    }
    
    // Radios and checkboxes getter/setter
    if ( !jQuery.support.checkOn ) {
    	jQuery.each([ "radio", "checkbox" ], function() {
    		jQuery.valHooks[ this ] = {
    			get: function( elem ) {
    				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
    				return elem.getAttribute("value") === null ? "on" : elem.value;
    			}
    		};
    	});
    }
    jQuery.each([ "radio", "checkbox" ], function() {
    	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
    		set: function( elem, value ) {
    			if ( jQuery.isArray( value ) ) {
    				return (elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0);
    			}
    		}
    	});
    });
    
    
    
    
    var rnamespaces = /\.(.*)$/,
    	rformElems = /^(?:textarea|input|select)$/i,
    	rperiod = /\./g,
    	rspaces = / /g,
    	rescape = /[^\w\s.|`]/g,
    	fcleanup = function( nm ) {
    		return nm.replace(rescape, "\\$&");
    	};
    
    /*
     * A number of helper functions used for managing events.
     * Many of the ideas behind this code originated from
     * Dean Edwards' addEvent library.
     */
    jQuery.event = {
    
    	// Bind an event to an element
    	// Original by Dean Edwards
    	add: function( elem, types, handler, data ) {
    		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
    			return;
    		}
    
    		if ( handler === false ) {
    			handler = returnFalse;
    		} else if ( !handler ) {
    			// Fixes bug #7229. Fix recommended by jdalton
    			return;
    		}
    
    		var handleObjIn, handleObj;
    
    		if ( handler.handler ) {
    			handleObjIn = handler;
    			handler = handleObjIn.handler;
    		}
    
    		// Make sure that the function being executed has a unique ID
    		if ( !handler.guid ) {
    			handler.guid = jQuery.guid++;
    		}
    
    		// Init the element's event structure
    		var elemData = jQuery._data( elem );
    
    		// If no elemData is found then we must be trying to bind to one of the
    		// banned noData elements
    		if ( !elemData ) {
    			return;
    		}
    
    		var events = elemData.events,
    			eventHandle = elemData.handle;
    
    		if ( !events ) {
    			elemData.events = events = {};
    		}
    
    		if ( !eventHandle ) {
    			elemData.handle = eventHandle = function( e ) {
    				// Discard the second event of a jQuery.event.trigger() and
    				// when an event is called after a page has unloaded
    				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
    					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
    					undefined;
    			};
    		}
    
    		// Add elem as a property of the handle function
    		// This is to prevent a memory leak with non-native events in IE.
    		eventHandle.elem = elem;
    
    		// Handle multiple events separated by a space
    		// jQuery(...).bind("mouseover mouseout", fn);
    		types = types.split(" ");
    
    		var type, i = 0, namespaces;
    
    		while ( (type = types[ i++ ]) ) {
    			handleObj = handleObjIn ?
    				jQuery.extend({}, handleObjIn) :
    				{ handler: handler, data: data };
    
    			// Namespaced event handlers
    			if ( type.indexOf(".") > -1 ) {
    				namespaces = type.split(".");
    				type = namespaces.shift();
    				handleObj.namespace = namespaces.slice(0).sort().join(".");
    
    			} else {
    				namespaces = [];
    				handleObj.namespace = "";
    			}
    
    			handleObj.type = type;
    			if ( !handleObj.guid ) {
    				handleObj.guid = handler.guid;
    			}
    
    			// Get the current list of functions bound to this event
    			var handlers = events[ type ],
    				special = jQuery.event.special[ type ] || {};
    
    			// Init the event handler queue
    			if ( !handlers ) {
    				handlers = events[ type ] = [];
    
    				// Check for a special event handler
    				// Only use addEventListener/attachEvent if the special
    				// events handler returns false
    				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
    					// Bind the global event handler to the element
    					if ( elem.addEventListener ) {
    						elem.addEventListener( type, eventHandle, false );
    
    					} else if ( elem.attachEvent ) {
    						elem.attachEvent( "on" + type, eventHandle );
    					}
    				}
    			}
    
    			if ( special.add ) {
    				special.add.call( elem, handleObj );
    
    				if ( !handleObj.handler.guid ) {
    					handleObj.handler.guid = handler.guid;
    				}
    			}
    
    			// Add the function to the element's handler list
    			handlers.push( handleObj );
    
    			// Keep track of which events have been used, for event optimization
    			jQuery.event.global[ type ] = true;
    		}
    
    		// Nullify elem to prevent memory leaks in IE
    		elem = null;
    	},
    
    	global: {},
    
    	// Detach an event or set of events from an element
    	remove: function( elem, types, handler, pos ) {
    		// don't do events on text and comment nodes
    		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
    			return;
    		}
    
    		if ( handler === false ) {
    			handler = returnFalse;
    		}
    
    		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
    			elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
    			events = elemData && elemData.events;
    
    		if ( !elemData || !events ) {
    			return;
    		}
    
    		// types is actually an event object here
    		if ( types && types.type ) {
    			handler = types.handler;
    			types = types.type;
    		}
    
    		// Unbind all events for the element
    		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
    			types = types || "";
    
    			for ( type in events ) {
    				jQuery.event.remove( elem, type + types );
    			}
    
    			return;
    		}
    
    		// Handle multiple events separated by a space
    		// jQuery(...).unbind("mouseover mouseout", fn);
    		types = types.split(" ");
    
    		while ( (type = types[ i++ ]) ) {
    			origType = type;
    			handleObj = null;
    			all = type.indexOf(".") < 0;
    			namespaces = [];
    
    			if ( !all ) {
    				// Namespaced event handlers
    				namespaces = type.split(".");
    				type = namespaces.shift();
    
    				namespace = new RegExp("(^|\\.)" +
    					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
    			}
    
    			eventType = events[ type ];
    
    			if ( !eventType ) {
    				continue;
    			}
    
    			if ( !handler ) {
    				for ( j = 0; j < eventType.length; j++ ) {
    					handleObj = eventType[ j ];
    
    					if ( all || namespace.test( handleObj.namespace ) ) {
    						jQuery.event.remove( elem, origType, handleObj.handler, j );
    						eventType.splice( j--, 1 );
    					}
    				}
    
    				continue;
    			}
    
    			special = jQuery.event.special[ type ] || {};
    
    			for ( j = pos || 0; j < eventType.length; j++ ) {
    				handleObj = eventType[ j ];
    
    				if ( handler.guid === handleObj.guid ) {
    					// remove the given handler for the given type
    					if ( all || namespace.test( handleObj.namespace ) ) {
    						if ( pos == null ) {
    							eventType.splice( j--, 1 );
    						}
    
    						if ( special.remove ) {
    							special.remove.call( elem, handleObj );
    						}
    					}
    
    					if ( pos != null ) {
    						break;
    					}
    				}
    			}
    
    			// remove generic event handler if no more handlers exist
    			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
    				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
    					jQuery.removeEvent( elem, type, elemData.handle );
    				}
    
    				ret = null;
    				delete events[ type ];
    			}
    		}
    
    		// Remove the expando if it's no longer used
    		if ( jQuery.isEmptyObject( events ) ) {
    			var handle = elemData.handle;
    			if ( handle ) {
    				handle.elem = null;
    			}
    
    			delete elemData.events;
    			delete elemData.handle;
    
    			if ( jQuery.isEmptyObject( elemData ) ) {
    				jQuery.removeData( elem, undefined, true );
    			}
    		}
    	},
    	
    	// Events that are safe to short-circuit if no handlers are attached.
    	// Native DOM events should not be added, they may have inline handlers.
    	customEvent: {
    		"getData": true,
    		"setData": true,
    		"changeData": true
    	},
    
    	trigger: function( event, data, elem, onlyHandlers ) {
    		// Event object or event type
    		var type = event.type || event,
    			namespaces = [],
    			exclusive;
    
    		if ( type.indexOf("!") >= 0 ) {
    			// Exclusive events trigger only for the exact event (no namespaces)
    			type = type.slice(0, -1);
    			exclusive = true;
    		}
    
    		if ( type.indexOf(".") >= 0 ) {
    			// Namespaced trigger; create a regexp to match event type in handle()
    			namespaces = type.split(".");
    			type = namespaces.shift();
    			namespaces.sort();
    		}
    
    		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
    			// No jQuery handlers for this event type, and it can't have inline handlers
    			return;
    		}
    
    		// Caller can pass in an Event, Object, or just an event type string
    		event = typeof event === "object" ?
    			// jQuery.Event object
    			event[ jQuery.expando ] ? event :
    			// Object literal
    			new jQuery.Event( type, event ) :
    			// Just the event type (string)
    			new jQuery.Event( type );
    
    		event.type = type;
    		event.exclusive = exclusive;
    		event.namespace = namespaces.join(".");
    		event.namespace_re = new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)");
    		
    		// triggerHandler() and global events don't bubble or run the default action
    		if ( onlyHandlers || !elem ) {
    			event.preventDefault();
    			event.stopPropagation();
    		}
    
    		// Handle a global trigger
    		if ( !elem ) {
    			// TODO: Stop taunting the data cache; remove global events and always attach to document
    			jQuery.each( jQuery.cache, function() {
    				// internalKey variable is just used to make it easier to find
    				// and potentially change this stuff later; currently it just
    				// points to jQuery.expando
    				var internalKey = jQuery.expando,
    					internalCache = this[ internalKey ];
    				if ( internalCache && internalCache.events && internalCache.events[ type ] ) {
    					jQuery.event.trigger( event, data, internalCache.handle.elem );
    				}
    			});
    			return;
    		}
    
    		// Don't do events on text and comment nodes
    		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
    			return;
    		}
    
    		// Clean up the event in case it is being reused
    		event.result = undefined;
    		event.target = elem;
    
    		// Clone any incoming data and prepend the event, creating the handler arg list
    		data = data != null ? jQuery.makeArray( data ) : [];
    		data.unshift( event );
    
    		var cur = elem,
    			// IE doesn't like method names with a colon (#3533, #8272)
    			ontype = type.indexOf(":") < 0 ? "on" + type : "";
    
    		// Fire event on the current element, then bubble up the DOM tree
    		do {
    			var handle = jQuery._data( cur, "handle" );
    
    			event.currentTarget = cur;
    			if ( handle ) {
    				handle.apply( cur, data );
    			}
    
    			// Trigger an inline bound script
    			if ( ontype && jQuery.acceptData( cur ) && cur[ ontype ] && cur[ ontype ].apply( cur, data ) === false ) {
    				event.result = false;
    				event.preventDefault();
    			}
    
    			// Bubble up to document, then to window
    			cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;
    		} while ( cur && !event.isPropagationStopped() );
    
    		// If nobody prevented the default action, do it now
    		if ( !event.isDefaultPrevented() ) {
    			var old,
    				special = jQuery.event.special[ type ] || {};
    
    			if ( (!special._default || special._default.call( elem.ownerDocument, event ) === false) &&
    				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {
    
    				// Call a native DOM method on the target with the same name name as the event.
    				// Can't use an .isFunction)() check here because IE6/7 fails that test.
    				// IE<9 dies on focus to hidden element (#1486), may want to revisit a try/catch.
    				try {
    					if ( ontype && elem[ type ] ) {
    						// Don't re-trigger an onFOO event when we call its FOO() method
    						old = elem[ ontype ];
    
    						if ( old ) {
    							elem[ ontype ] = null;
    						}
    
    						jQuery.event.triggered = type;
    						elem[ type ]();
    					}
    				} catch ( ieError ) {}
    
    				if ( old ) {
    					elem[ ontype ] = old;
    				}
    
    				jQuery.event.triggered = undefined;
    			}
    		}
    		
    		return event.result;
    	},
    
    	handle: function( event ) {
    		event = jQuery.event.fix( event || window.event );
    		// Snapshot the handlers list since a called handler may add/remove events.
    		var handlers = ((jQuery._data( this, "events" ) || {})[ event.type ] || []).slice(0),
    			run_all = !event.exclusive && !event.namespace,
    			args = Array.prototype.slice.call( arguments, 0 );
    
    		// Use the fix-ed Event rather than the (read-only) native event
    		args[0] = event;
    		event.currentTarget = this;
    
    		for ( var j = 0, l = handlers.length; j < l; j++ ) {
    			var handleObj = handlers[ j ];
    
    			// Triggered event must 1) be non-exclusive and have no namespace, or
    			// 2) have namespace(s) a subset or equal to those in the bound event.
    			if ( run_all || event.namespace_re.test( handleObj.namespace ) ) {
    				// Pass in a reference to the handler function itself
    				// So that we can later remove it
    				event.handler = handleObj.handler;
    				event.data = handleObj.data;
    				event.handleObj = handleObj;
    
    				var ret = handleObj.handler.apply( this, args );
    
    				if ( ret !== undefined ) {
    					event.result = ret;
    					if ( ret === false ) {
    						event.preventDefault();
    						event.stopPropagation();
    					}
    				}
    
    				if ( event.isImmediatePropagationStopped() ) {
    					break;
    				}
    			}
    		}
    		return event.result;
    	},
    
    	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
    
    	fix: function( event ) {
    		if ( event[ jQuery.expando ] ) {
    			return event;
    		}
    
    		// store a copy of the original event object
    		// and "clone" to set read-only properties
    		var originalEvent = event;
    		event = jQuery.Event( originalEvent );
    
    		for ( var i = this.props.length, prop; i; ) {
    			prop = this.props[ --i ];
    			event[ prop ] = originalEvent[ prop ];
    		}
    
    		// Fix target property, if necessary
    		if ( !event.target ) {
    			// Fixes #1925 where srcElement might not be defined either
    			event.target = event.srcElement || document;
    		}
    
    		// check if target is a textnode (safari)
    		if ( event.target.nodeType === 3 ) {
    			event.target = event.target.parentNode;
    		}
    
    		// Add relatedTarget, if necessary
    		if ( !event.relatedTarget && event.fromElement ) {
    			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
    		}
    
    		// Calculate pageX/Y if missing and clientX/Y available
    		if ( event.pageX == null && event.clientX != null ) {
    			var eventDocument = event.target.ownerDocument || document,
    				doc = eventDocument.documentElement,
    				body = eventDocument.body;
    
    			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
    			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
    		}
    
    		// Add which for key events
    		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
    			event.which = event.charCode != null ? event.charCode : event.keyCode;
    		}
    
    		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
    		if ( !event.metaKey && event.ctrlKey ) {
    			event.metaKey = event.ctrlKey;
    		}
    
    		// Add which for click: 1 === left; 2 === middle; 3 === right
    		// Note: button is not normalized, so don't use it
    		if ( !event.which && event.button !== undefined ) {
    			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
    		}
    
    		return event;
    	},
    
    	// Deprecated, use jQuery.guid instead
    	guid: 1E8,
    
    	// Deprecated, use jQuery.proxy instead
    	proxy: jQuery.proxy,
    
    	special: {
    		ready: {
    			// Make sure the ready event is setup
    			setup: jQuery.bindReady,
    			teardown: jQuery.noop
    		},
    
    		live: {
    			add: function( handleObj ) {
    				jQuery.event.add( this,
    					liveConvert( handleObj.origType, handleObj.selector ),
    					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) );
    			},
    
    			remove: function( handleObj ) {
    				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
    			}
    		},
    
    		beforeunload: {
    			setup: function( data, namespaces, eventHandle ) {
    				// We only want to do this special case on windows
    				if ( jQuery.isWindow( this ) ) {
    					this.onbeforeunload = eventHandle;
    				}
    			},
    
    			teardown: function( namespaces, eventHandle ) {
    				if ( this.onbeforeunload === eventHandle ) {
    					this.onbeforeunload = null;
    				}
    			}
    		}
    	}
    };
    
    jQuery.removeEvent = document.removeEventListener ?
    	function( elem, type, handle ) {
    		if ( elem.removeEventListener ) {
    			elem.removeEventListener( type, handle, false );
    		}
    	} :
    	function( elem, type, handle ) {
    		if ( elem.detachEvent ) {
    			elem.detachEvent( "on" + type, handle );
    		}
    	};
    
    jQuery.Event = function( src, props ) {
    	// Allow instantiation without the 'new' keyword
    	if ( !this.preventDefault ) {
    		return new jQuery.Event( src, props );
    	}
    
    	// Event object
    	if ( src && src.type ) {
    		this.originalEvent = src;
    		this.type = src.type;
    
    		// Events bubbling up the document may have been marked as prevented
    		// by a handler lower down the tree; reflect the correct value.
    		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
    			src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
    
    	// Event type
    	} else {
    		this.type = src;
    	}
    
    	// Put explicitly provided properties onto the event object
    	if ( props ) {
    		jQuery.extend( this, props );
    	}
    
    	// timeStamp is buggy for some events on Firefox(#3843)
    	// So we won't rely on the native value
    	this.timeStamp = jQuery.now();
    
    	// Mark it as fixed
    	this[ jQuery.expando ] = true;
    };
    
    function returnFalse() {
    	return false;
    }
    function returnTrue() {
    	return true;
    }
    
    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
    	preventDefault: function() {
    		this.isDefaultPrevented = returnTrue;
    
    		var e = this.originalEvent;
    		if ( !e ) {
    			return;
    		}
    
    		// if preventDefault exists run it on the original event
    		if ( e.preventDefault ) {
    			e.preventDefault();
    
    		// otherwise set the returnValue property of the original event to false (IE)
    		} else {
    			e.returnValue = false;
    		}
    	},
    	stopPropagation: function() {
    		this.isPropagationStopped = returnTrue;
    
    		var e = this.originalEvent;
    		if ( !e ) {
    			return;
    		}
    		// if stopPropagation exists run it on the original event
    		if ( e.stopPropagation ) {
    			e.stopPropagation();
    		}
    		// otherwise set the cancelBubble property of the original event to true (IE)
    		e.cancelBubble = true;
    	},
    	stopImmediatePropagation: function() {
    		this.isImmediatePropagationStopped = returnTrue;
    		this.stopPropagation();
    	},
    	isDefaultPrevented: returnFalse,
    	isPropagationStopped: returnFalse,
    	isImmediatePropagationStopped: returnFalse
    };
    
    // Checks if an event happened on an element within another element
    // Used in jQuery.event.special.mouseenter and mouseleave handlers
    var withinElement = function( event ) {
    
    	// Check if mouse(over|out) are still within the same parent element
    	var related = event.relatedTarget,
    		inside = false,
    		eventType = event.type;
    
    	event.type = event.data;
    
    	if ( related !== this ) {
    
    		if ( related ) {
    			inside = jQuery.contains( this, related );
    		}
    
    		if ( !inside ) {
    
    			jQuery.event.handle.apply( this, arguments );
    
    			event.type = eventType;
    		}
    	}
    },
    
    // In case of event delegation, we only need to rename the event.type,
    // liveHandler will take care of the rest.
    delegate = function( event ) {
    	event.type = event.data;
    	jQuery.event.handle.apply( this, arguments );
    };
    
    // Create mouseenter and mouseleave events
    jQuery.each({
    	mouseenter: "mouseover",
    	mouseleave: "mouseout"
    }, function( orig, fix ) {
    	jQuery.event.special[ orig ] = {
    		setup: function( data ) {
    			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
    		},
    		teardown: function( data ) {
    			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
    		}
    	};
    });
    
    // submit delegation
    if ( !jQuery.support.submitBubbles ) {
    
    	jQuery.event.special.submit = {
    		setup: function( data, namespaces ) {
    			if ( !jQuery.nodeName( this, "form" ) ) {
    				jQuery.event.add(this, "click.specialSubmit", function( e ) {
    					var elem = e.target,
    						type = elem.type;
    
    					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
    						trigger( "submit", this, arguments );
    					}
    				});
    
    				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
    					var elem = e.target,
    						type = elem.type;
    
    					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
    						trigger( "submit", this, arguments );
    					}
    				});
    
    			} else {
    				return false;
    			}
    		},
    
    		teardown: function( namespaces ) {
    			jQuery.event.remove( this, ".specialSubmit" );
    		}
    	};
    
    }
    
    // change delegation, happens here so we have bind.
    if ( !jQuery.support.changeBubbles ) {
    
    	var changeFilters,
    
    	getVal = function( elem ) {
    		var type = elem.type, val = elem.value;
    
    		if ( type === "radio" || type === "checkbox" ) {
    			val = elem.checked;
    
    		} else if ( type === "select-multiple" ) {
    			val = elem.selectedIndex > -1 ?
    				jQuery.map( elem.options, function( elem ) {
    					return elem.selected;
    				}).join("-") :
    				"";
    
    		} else if ( jQuery.nodeName( elem, "select" ) ) {
    			val = elem.selectedIndex;
    		}
    
    		return val;
    	},
    
    	testChange = function testChange( e ) {
    		var elem = e.target, data, val;
    
    		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
    			return;
    		}
    
    		data = jQuery._data( elem, "_change_data" );
    		val = getVal(elem);
    
    		// the current data will be also retrieved by beforeactivate
    		if ( e.type !== "focusout" || elem.type !== "radio" ) {
    			jQuery._data( elem, "_change_data", val );
    		}
    
    		if ( data === undefined || val === data ) {
    			return;
    		}
    
    		if ( data != null || val ) {
    			e.type = "change";
    			e.liveFired = undefined;
    			jQuery.event.trigger( e, arguments[1], elem );
    		}
    	};
    
    	jQuery.event.special.change = {
    		filters: {
    			focusout: testChange,
    
    			beforedeactivate: testChange,
    
    			click: function( e ) {
    				var elem = e.target, type = jQuery.nodeName( elem, "input" ) ? elem.type : "";
    
    				if ( type === "radio" || type === "checkbox" || jQuery.nodeName( elem, "select" ) ) {
    					testChange.call( this, e );
    				}
    			},
    
    			// Change has to be called before submit
    			// Keydown will be called before keypress, which is used in submit-event delegation
    			keydown: function( e ) {
    				var elem = e.target, type = jQuery.nodeName( elem, "input" ) ? elem.type : "";
    
    				if ( (e.keyCode === 13 && !jQuery.nodeName( elem, "textarea" ) ) ||
    					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
    					type === "select-multiple" ) {
    					testChange.call( this, e );
    				}
    			},
    
    			// Beforeactivate happens also before the previous element is blurred
    			// with this event you can't trigger a change event, but you can store
    			// information
    			beforeactivate: function( e ) {
    				var elem = e.target;
    				jQuery._data( elem, "_change_data", getVal(elem) );
    			}
    		},
    
    		setup: function( data, namespaces ) {
    			if ( this.type === "file" ) {
    				return false;
    			}
    
    			for ( var type in changeFilters ) {
    				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
    			}
    
    			return rformElems.test( this.nodeName );
    		},
    
    		teardown: function( namespaces ) {
    			jQuery.event.remove( this, ".specialChange" );
    
    			return rformElems.test( this.nodeName );
    		}
    	};
    
    	changeFilters = jQuery.event.special.change.filters;
    
    	// Handle when the input is .focus()'d
    	changeFilters.focus = changeFilters.beforeactivate;
    }
    
    function trigger( type, elem, args ) {
    	// Piggyback on a donor event to simulate a different one.
    	// Fake originalEvent to avoid donor's stopPropagation, but if the
    	// simulated event prevents default then we do the same on the donor.
    	// Don't pass args or remember liveFired; they apply to the donor event.
    	var event = jQuery.extend( {}, args[ 0 ] );
    	event.type = type;
    	event.originalEvent = {};
    	event.liveFired = undefined;
    	jQuery.event.handle.call( elem, event );
    	if ( event.isDefaultPrevented() ) {
    		args[ 0 ].preventDefault();
    	}
    }
    
    // Create "bubbling" focus and blur events
    if ( !jQuery.support.focusinBubbles ) {
    	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
    
    		// Attach a single capturing handler while someone wants focusin/focusout
    		var attaches = 0;
    
    		jQuery.event.special[ fix ] = {
    			setup: function() {
    				if ( attaches++ === 0 ) {
    					document.addEventListener( orig, handler, true );
    				}
    			},
    			teardown: function() {
    				if ( --attaches === 0 ) {
    					document.removeEventListener( orig, handler, true );
    				}
    			}
    		};
    
    		function handler( donor ) {
    			// Donor event is always a native one; fix it and switch its type.
    			// Let focusin/out handler cancel the donor focus/blur event.
    			var e = jQuery.event.fix( donor );
    			e.type = fix;
    			e.originalEvent = {};
    			jQuery.event.trigger( e, null, e.target );
    			if ( e.isDefaultPrevented() ) {
    				donor.preventDefault();
    			}
    		}
    	});
    }
    
    jQuery.each(["bind", "one"], function( i, name ) {
    	jQuery.fn[ name ] = function( type, data, fn ) {
    		var handler;
    
    		// Handle object literals
    		if ( typeof type === "object" ) {
    			for ( var key in type ) {
    				this[ name ](key, data, type[key], fn);
    			}
    			return this;
    		}
    
    		if ( arguments.length === 2 || data === false ) {
    			fn = data;
    			data = undefined;
    		}
    
    		if ( name === "one" ) {
    			handler = function( event ) {
    				jQuery( this ).unbind( event, handler );
    				return fn.apply( this, arguments );
    			};
    			handler.guid = fn.guid || jQuery.guid++;
    		} else {
    			handler = fn;
    		}
    
    		if ( type === "unload" && name !== "one" ) {
    			this.one( type, data, fn );
    
    		} else {
    			for ( var i = 0, l = this.length; i < l; i++ ) {
    				jQuery.event.add( this[i], type, handler, data );
    			}
    		}
    
    		return this;
    	};
    });
    
    jQuery.fn.extend({
    	unbind: function( type, fn ) {
    		// Handle object literals
    		if ( typeof type === "object" && !type.preventDefault ) {
    			for ( var key in type ) {
    				this.unbind(key, type[key]);
    			}
    
    		} else {
    			for ( var i = 0, l = this.length; i < l; i++ ) {
    				jQuery.event.remove( this[i], type, fn );
    			}
    		}
    
    		return this;
    	},
    
    	delegate: function( selector, types, data, fn ) {
    		return this.live( types, data, fn, selector );
    	},
    
    	undelegate: function( selector, types, fn ) {
    		if ( arguments.length === 0 ) {
    			return this.unbind( "live" );
    
    		} else {
    			return this.die( types, null, fn, selector );
    		}
    	},
    
    	trigger: function( type, data ) {
    		return this.each(function() {
    			jQuery.event.trigger( type, data, this );
    		});
    	},
    
    	triggerHandler: function( type, data ) {
    		if ( this[0] ) {
    			return jQuery.event.trigger( type, data, this[0], true );
    		}
    	},
    
    	toggle: function( fn ) {
    		// Save reference to arguments for access in closure
    		var args = arguments,
    			guid = fn.guid || jQuery.guid++,
    			i = 0,
    			toggler = function( event ) {
    				// Figure out which function to execute
    				var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
    				jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );
    
    				// Make sure that clicks stop
    				event.preventDefault();
    
    				// and execute the function
    				return args[ lastToggle ].apply( this, arguments ) || false;
    			};
    
    		// link all the functions, so any of them can unbind this click handler
    		toggler.guid = guid;
    		while ( i < args.length ) {
    			args[ i++ ].guid = guid;
    		}
    
    		return this.click( toggler );
    	},
    
    	hover: function( fnOver, fnOut ) {
    		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    	}
    });
    
    var liveMap = {
    	focus: "focusin",
    	blur: "focusout",
    	mouseenter: "mouseover",
    	mouseleave: "mouseout"
    };
    
    jQuery.each(["live", "die"], function( i, name ) {
    	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
    		var type, i = 0, match, namespaces, preType,
    			selector = origSelector || this.selector,
    			context = origSelector ? this : jQuery( this.context );
    
    		if ( typeof types === "object" && !types.preventDefault ) {
    			for ( var key in types ) {
    				context[ name ]( key, data, types[key], selector );
    			}
    
    			return this;
    		}
    
    		if ( name === "die" && !types &&
    					origSelector && origSelector.charAt(0) === "." ) {
    
    			context.unbind( origSelector );
    
    			return this;
    		}
    
    		if ( data === false || jQuery.isFunction( data ) ) {
    			fn = data || returnFalse;
    			data = undefined;
    		}
    
    		types = (types || "").split(" ");
    
    		while ( (type = types[ i++ ]) != null ) {
    			match = rnamespaces.exec( type );
    			namespaces = "";
    
    			if ( match )  {
    				namespaces = match[0];
    				type = type.replace( rnamespaces, "" );
    			}
    
    			if ( type === "hover" ) {
    				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
    				continue;
    			}
    
    			preType = type;
    
    			if ( liveMap[ type ] ) {
    				types.push( liveMap[ type ] + namespaces );
    				type = type + namespaces;
    
    			} else {
    				type = (liveMap[ type ] || type) + namespaces;
    			}
    
    			if ( name === "live" ) {
    				// bind live handler
    				for ( var j = 0, l = context.length; j < l; j++ ) {
    					jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
    						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
    				}
    
    			} else {
    				// unbind live handler
    				context.unbind( "live." + liveConvert( type, selector ), fn );
    			}
    		}
    
    		return this;
    	};
    });
    
    function liveHandler( event ) {
    	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
    		elems = [],
    		selectors = [],
    		events = jQuery._data( this, "events" );
    
    	// Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)
    	if ( event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click" ) {
    		return;
    	}
    
    	if ( event.namespace ) {
    		namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
    	}
    
    	event.liveFired = this;
    
    	var live = events.live.slice(0);
    
    	for ( j = 0; j < live.length; j++ ) {
    		handleObj = live[j];
    
    		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
    			selectors.push( handleObj.selector );
    
    		} else {
    			live.splice( j--, 1 );
    		}
    	}
    
    	match = jQuery( event.target ).closest( selectors, event.currentTarget );
    
    	for ( i = 0, l = match.length; i < l; i++ ) {
    		close = match[i];
    
    		for ( j = 0; j < live.length; j++ ) {
    			handleObj = live[j];
    
    			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) && !close.elem.disabled ) {
    				elem = close.elem;
    				related = null;
    
    				// Those two events require additional checking
    				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
    					event.type = handleObj.preType;
    					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
    
    					// Make sure not to accidentally match a child element with the same selector
    					if ( related && jQuery.contains( elem, related ) ) {
    						related = elem;
    					}
    				}
    
    				if ( !related || related !== elem ) {
    					elems.push({ elem: elem, handleObj: handleObj, level: close.level });
    				}
    			}
    		}
    	}
    
    	for ( i = 0, l = elems.length; i < l; i++ ) {
    		match = elems[i];
    
    		if ( maxLevel && match.level > maxLevel ) {
    			break;
    		}
    
    		event.currentTarget = match.elem;
    		event.data = match.handleObj.data;
    		event.handleObj = match.handleObj;
    
    		ret = match.handleObj.origHandler.apply( match.elem, arguments );
    
    		if ( ret === false || event.isPropagationStopped() ) {
    			maxLevel = match.level;
    
    			if ( ret === false ) {
    				stop = false;
    			}
    			if ( event.isImmediatePropagationStopped() ) {
    				break;
    			}
    		}
    	}
    
    	return stop;
    }
    
    function liveConvert( type, selector ) {
    	return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspaces, "&");
    }
    
    jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
    	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {
    
    	// Handle event binding
    	jQuery.fn[ name ] = function( data, fn ) {
    		if ( fn == null ) {
    			fn = data;
    			data = null;
    		}
    
    		return arguments.length > 0 ?
    			this.bind( name, data, fn ) :
    			this.trigger( name );
    	};
    
    	if ( jQuery.attrFn ) {
    		jQuery.attrFn[ name ] = true;
    	}
    });
    
    
    
    /*!
     * Sizzle CSS Selector Engine
     *  Copyright 2011, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */
    (function(){
    
    var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
    	done = 0,
    	toString = Object.prototype.toString,
    	hasDuplicate = false,
    	baseHasDuplicate = true,
    	rBackslash = /\\/g,
    	rNonWord = /\W/;
    
    // Here we check if the JavaScript engine is using some sort of
    // optimization where it does not always call our comparision
    // function. If that is the case, discard the hasDuplicate value.
    //   Thus far that includes Google Chrome.
    [0, 0].sort(function() {
    	baseHasDuplicate = false;
    	return 0;
    });
    
    var Sizzle = function( selector, context, results, seed ) {
    	results = results || [];
    	context = context || document;
    
    	var origContext = context;
    
    	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
    		return [];
    	}
    	
    	if ( !selector || typeof selector !== "string" ) {
    		return results;
    	}
    
    	var m, set, checkSet, extra, ret, cur, pop, i,
    		prune = true,
    		contextXML = Sizzle.isXML( context ),
    		parts = [],
    		soFar = selector;
    	
    	// Reset the position of the chunker regexp (start from head)
    	do {
    		chunker.exec( "" );
    		m = chunker.exec( soFar );
    
    		if ( m ) {
    			soFar = m[3];
    		
    			parts.push( m[1] );
    		
    			if ( m[2] ) {
    				extra = m[3];
    				break;
    			}
    		}
    	} while ( m );
    
    	if ( parts.length > 1 && origPOS.exec( selector ) ) {
    
    		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
    			set = posProcess( parts[0] + parts[1], context );
    
    		} else {
    			set = Expr.relative[ parts[0] ] ?
    				[ context ] :
    				Sizzle( parts.shift(), context );
    
    			while ( parts.length ) {
    				selector = parts.shift();
    
    				if ( Expr.relative[ selector ] ) {
    					selector += parts.shift();
    				}
    				
    				set = posProcess( selector, set );
    			}
    		}
    
    	} else {
    		// Take a shortcut and set the context if the root selector is an ID
    		// (but not if it'll be faster if the inner selector is an ID)
    		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
    				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
    
    			ret = Sizzle.find( parts.shift(), context, contextXML );
    			context = ret.expr ?
    				Sizzle.filter( ret.expr, ret.set )[0] :
    				ret.set[0];
    		}
    
    		if ( context ) {
    			ret = seed ?
    				{ expr: parts.pop(), set: makeArray(seed) } :
    				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
    
    			set = ret.expr ?
    				Sizzle.filter( ret.expr, ret.set ) :
    				ret.set;
    
    			if ( parts.length > 0 ) {
    				checkSet = makeArray( set );
    
    			} else {
    				prune = false;
    			}
    
    			while ( parts.length ) {
    				cur = parts.pop();
    				pop = cur;
    
    				if ( !Expr.relative[ cur ] ) {
    					cur = "";
    				} else {
    					pop = parts.pop();
    				}
    
    				if ( pop == null ) {
    					pop = context;
    				}
    
    				Expr.relative[ cur ]( checkSet, pop, contextXML );
    			}
    
    		} else {
    			checkSet = parts = [];
    		}
    	}
    
    	if ( !checkSet ) {
    		checkSet = set;
    	}
    
    	if ( !checkSet ) {
    		Sizzle.error( cur || selector );
    	}
    
    	if ( toString.call(checkSet) === "[object Array]" ) {
    		if ( !prune ) {
    			results.push.apply( results, checkSet );
    
    		} else if ( context && context.nodeType === 1 ) {
    			for ( i = 0; checkSet[i] != null; i++ ) {
    				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
    					results.push( set[i] );
    				}
    			}
    
    		} else {
    			for ( i = 0; checkSet[i] != null; i++ ) {
    				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
    					results.push( set[i] );
    				}
    			}
    		}
    
    	} else {
    		makeArray( checkSet, results );
    	}
    
    	if ( extra ) {
    		Sizzle( extra, origContext, results, seed );
    		Sizzle.uniqueSort( results );
    	}
    
    	return results;
    };
    
    Sizzle.uniqueSort = function( results ) {
    	if ( sortOrder ) {
    		hasDuplicate = baseHasDuplicate;
    		results.sort( sortOrder );
    
    		if ( hasDuplicate ) {
    			for ( var i = 1; i < results.length; i++ ) {
    				if ( results[i] === results[ i - 1 ] ) {
    					results.splice( i--, 1 );
    				}
    			}
    		}
    	}
    
    	return results;
    };
    
    Sizzle.matches = function( expr, set ) {
    	return Sizzle( expr, null, null, set );
    };
    
    Sizzle.matchesSelector = function( node, expr ) {
    	return Sizzle( expr, null, null, [node] ).length > 0;
    };
    
    Sizzle.find = function( expr, context, isXML ) {
    	var set;
    
    	if ( !expr ) {
    		return [];
    	}
    
    	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
    		var match,
    			type = Expr.order[i];
    		
    		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
    			var left = match[1];
    			match.splice( 1, 1 );
    
    			if ( left.substr( left.length - 1 ) !== "\\" ) {
    				match[1] = (match[1] || "").replace( rBackslash, "" );
    				set = Expr.find[ type ]( match, context, isXML );
    
    				if ( set != null ) {
    					expr = expr.replace( Expr.match[ type ], "" );
    					break;
    				}
    			}
    		}
    	}
    
    	if ( !set ) {
    		set = typeof context.getElementsByTagName !== "undefined" ?
    			context.getElementsByTagName( "*" ) :
    			[];
    	}
    
    	return { set: set, expr: expr };
    };
    
    Sizzle.filter = function( expr, set, inplace, not ) {
    	var match, anyFound,
    		old = expr,
    		result = [],
    		curLoop = set,
    		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );
    
    	while ( expr && set.length ) {
    		for ( var type in Expr.filter ) {
    			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
    				var found, item,
    					filter = Expr.filter[ type ],
    					left = match[1];
    
    				anyFound = false;
    
    				match.splice(1,1);
    
    				if ( left.substr( left.length - 1 ) === "\\" ) {
    					continue;
    				}
    
    				if ( curLoop === result ) {
    					result = [];
    				}
    
    				if ( Expr.preFilter[ type ] ) {
    					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );
    
    					if ( !match ) {
    						anyFound = found = true;
    
    					} else if ( match === true ) {
    						continue;
    					}
    				}
    
    				if ( match ) {
    					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
    						if ( item ) {
    							found = filter( item, match, i, curLoop );
    							var pass = not ^ !!found;
    
    							if ( inplace && found != null ) {
    								if ( pass ) {
    									anyFound = true;
    
    								} else {
    									curLoop[i] = false;
    								}
    
    							} else if ( pass ) {
    								result.push( item );
    								anyFound = true;
    							}
    						}
    					}
    				}
    
    				if ( found !== undefined ) {
    					if ( !inplace ) {
    						curLoop = result;
    					}
    
    					expr = expr.replace( Expr.match[ type ], "" );
    
    					if ( !anyFound ) {
    						return [];
    					}
    
    					break;
    				}
    			}
    		}
    
    		// Improper expression
    		if ( expr === old ) {
    			if ( anyFound == null ) {
    				Sizzle.error( expr );
    
    			} else {
    				break;
    			}
    		}
    
    		old = expr;
    	}
    
    	return curLoop;
    };
    
    Sizzle.error = function( msg ) {
    	throw "Syntax error, unrecognized expression: " + msg;
    };
    
    var Expr = Sizzle.selectors = {
    	order: [ "ID", "NAME", "TAG" ],
    
    	match: {
    		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
    		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
    		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
    		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
    		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
    		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
    		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
    		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
    	},
    
    	leftMatch: {},
    
    	attrMap: {
    		"class": "className",
    		"for": "htmlFor"
    	},
    
    	attrHandle: {
    		href: function( elem ) {
    			return elem.getAttribute( "href" );
    		},
    		type: function( elem ) {
    			return elem.getAttribute( "type" );
    		}
    	},
    
    	relative: {
    		"+": function(checkSet, part){
    			var isPartStr = typeof part === "string",
    				isTag = isPartStr && !rNonWord.test( part ),
    				isPartStrNotTag = isPartStr && !isTag;
    
    			if ( isTag ) {
    				part = part.toLowerCase();
    			}
    
    			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
    				if ( (elem = checkSet[i]) ) {
    					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}
    
    					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
    						elem || false :
    						elem === part;
    				}
    			}
    
    			if ( isPartStrNotTag ) {
    				Sizzle.filter( part, checkSet, true );
    			}
    		},
    
    		">": function( checkSet, part ) {
    			var elem,
    				isPartStr = typeof part === "string",
    				i = 0,
    				l = checkSet.length;
    
    			if ( isPartStr && !rNonWord.test( part ) ) {
    				part = part.toLowerCase();
    
    				for ( ; i < l; i++ ) {
    					elem = checkSet[i];
    
    					if ( elem ) {
    						var parent = elem.parentNode;
    						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
    					}
    				}
    
    			} else {
    				for ( ; i < l; i++ ) {
    					elem = checkSet[i];
    
    					if ( elem ) {
    						checkSet[i] = isPartStr ?
    							elem.parentNode :
    							elem.parentNode === part;
    					}
    				}
    
    				if ( isPartStr ) {
    					Sizzle.filter( part, checkSet, true );
    				}
    			}
    		},
    
    		"": function(checkSet, part, isXML){
    			var nodeCheck,
    				doneName = done++,
    				checkFn = dirCheck;
    
    			if ( typeof part === "string" && !rNonWord.test( part ) ) {
    				part = part.toLowerCase();
    				nodeCheck = part;
    				checkFn = dirNodeCheck;
    			}
    
    			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
    		},
    
    		"~": function( checkSet, part, isXML ) {
    			var nodeCheck,
    				doneName = done++,
    				checkFn = dirCheck;
    
    			if ( typeof part === "string" && !rNonWord.test( part ) ) {
    				part = part.toLowerCase();
    				nodeCheck = part;
    				checkFn = dirNodeCheck;
    			}
    
    			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
    		}
    	},
    
    	find: {
    		ID: function( match, context, isXML ) {
    			if ( typeof context.getElementById !== "undefined" && !isXML ) {
    				var m = context.getElementById(match[1]);
    				// Check parentNode to catch when Blackberry 4.6 returns
    				// nodes that are no longer in the document #6963
    				return m && m.parentNode ? [m] : [];
    			}
    		},
    
    		NAME: function( match, context ) {
    			if ( typeof context.getElementsByName !== "undefined" ) {
    				var ret = [],
    					results = context.getElementsByName( match[1] );
    
    				for ( var i = 0, l = results.length; i < l; i++ ) {
    					if ( results[i].getAttribute("name") === match[1] ) {
    						ret.push( results[i] );
    					}
    				}
    
    				return ret.length === 0 ? null : ret;
    			}
    		},
    
    		TAG: function( match, context ) {
    			if ( typeof context.getElementsByTagName !== "undefined" ) {
    				return context.getElementsByTagName( match[1] );
    			}
    		}
    	},
    	preFilter: {
    		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
    			match = " " + match[1].replace( rBackslash, "" ) + " ";
    
    			if ( isXML ) {
    				return match;
    			}
    
    			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
    				if ( elem ) {
    					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
    						if ( !inplace ) {
    							result.push( elem );
    						}
    
    					} else if ( inplace ) {
    						curLoop[i] = false;
    					}
    				}
    			}
    
    			return false;
    		},
    
    		ID: function( match ) {
    			return match[1].replace( rBackslash, "" );
    		},
    
    		TAG: function( match, curLoop ) {
    			return match[1].replace( rBackslash, "" ).toLowerCase();
    		},
    
    		CHILD: function( match ) {
    			if ( match[1] === "nth" ) {
    				if ( !match[2] ) {
    					Sizzle.error( match[0] );
    				}
    
    				match[2] = match[2].replace(/^\+|\s*/g, '');
    
    				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
    				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
    					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
    					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);
    
    				// calculate the numbers (first)n+(last) including if they are negative
    				match[2] = (test[1] + (test[2] || 1)) - 0;
    				match[3] = test[3] - 0;
    			}
    			else if ( match[2] ) {
    				Sizzle.error( match[0] );
    			}
    
    			// TODO: Move to normal caching system
    			match[0] = done++;
    
    			return match;
    		},
    
    		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
    			var name = match[1] = match[1].replace( rBackslash, "" );
    			
    			if ( !isXML && Expr.attrMap[name] ) {
    				match[1] = Expr.attrMap[name];
    			}
    
    			// Handle if an un-quoted value was used
    			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );
    
    			if ( match[2] === "~=" ) {
    				match[4] = " " + match[4] + " ";
    			}
    
    			return match;
    		},
    
    		PSEUDO: function( match, curLoop, inplace, result, not ) {
    			if ( match[1] === "not" ) {
    				// If we're dealing with a complex expression, or a simple one
    				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
    					match[3] = Sizzle(match[3], null, null, curLoop);
    
    				} else {
    					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
    
    					if ( !inplace ) {
    						result.push.apply( result, ret );
    					}
    
    					return false;
    				}
    
    			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
    				return true;
    			}
    			
    			return match;
    		},
    
    		POS: function( match ) {
    			match.unshift( true );
    
    			return match;
    		}
    	},
    	
    	filters: {
    		enabled: function( elem ) {
    			return elem.disabled === false && elem.type !== "hidden";
    		},
    
    		disabled: function( elem ) {
    			return elem.disabled === true;
    		},
    
    		checked: function( elem ) {
    			return elem.checked === true;
    		},
    		
    		selected: function( elem ) {
    			// Accessing this property makes selected-by-default
    			// options in Safari work properly
    			if ( elem.parentNode ) {
    				elem.parentNode.selectedIndex;
    			}
    			
    			return elem.selected === true;
    		},
    
    		parent: function( elem ) {
    			return !!elem.firstChild;
    		},
    
    		empty: function( elem ) {
    			return !elem.firstChild;
    		},
    
    		has: function( elem, i, match ) {
    			return !!Sizzle( match[3], elem ).length;
    		},
    
    		header: function( elem ) {
    			return (/h\d/i).test( elem.nodeName );
    		},
    
    		text: function( elem ) {
    			var attr = elem.getAttribute( "type" ), type = elem.type;
    			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
    			// use getAttribute instead to test this case
    			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
    		},
    
    		radio: function( elem ) {
    			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
    		},
    
    		checkbox: function( elem ) {
    			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
    		},
    
    		file: function( elem ) {
    			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
    		},
    
    		password: function( elem ) {
    			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
    		},
    
    		submit: function( elem ) {
    			var name = elem.nodeName.toLowerCase();
    			return (name === "input" || name === "button") && "submit" === elem.type;
    		},
    
    		image: function( elem ) {
    			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
    		},
    
    		reset: function( elem ) {
    			var name = elem.nodeName.toLowerCase();
    			return (name === "input" || name === "button") && "reset" === elem.type;
    		},
    
    		button: function( elem ) {
    			var name = elem.nodeName.toLowerCase();
    			return name === "input" && "button" === elem.type || name === "button";
    		},
    
    		input: function( elem ) {
    			return (/input|select|textarea|button/i).test( elem.nodeName );
    		},
    
    		focus: function( elem ) {
    			return elem === elem.ownerDocument.activeElement;
    		}
    	},
    	setFilters: {
    		first: function( elem, i ) {
    			return i === 0;
    		},
    
    		last: function( elem, i, match, array ) {
    			return i === array.length - 1;
    		},
    
    		even: function( elem, i ) {
    			return i % 2 === 0;
    		},
    
    		odd: function( elem, i ) {
    			return i % 2 === 1;
    		},
    
    		lt: function( elem, i, match ) {
    			return i < match[3] - 0;
    		},
    
    		gt: function( elem, i, match ) {
    			return i > match[3] - 0;
    		},
    
    		nth: function( elem, i, match ) {
    			return match[3] - 0 === i;
    		},
    
    		eq: function( elem, i, match ) {
    			return match[3] - 0 === i;
    		}
    	},
    	filter: {
    		PSEUDO: function( elem, match, i, array ) {
    			var name = match[1],
    				filter = Expr.filters[ name ];
    
    			if ( filter ) {
    				return filter( elem, i, match, array );
    
    			} else if ( name === "contains" ) {
    				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;
    
    			} else if ( name === "not" ) {
    				var not = match[3];
    
    				for ( var j = 0, l = not.length; j < l; j++ ) {
    					if ( not[j] === elem ) {
    						return false;
    					}
    				}
    
    				return true;
    
    			} else {
    				Sizzle.error( name );
    			}
    		},
    
    		CHILD: function( elem, match ) {
    			var type = match[1],
    				node = elem;
    
    			switch ( type ) {
    				case "only":
    				case "first":
    					while ( (node = node.previousSibling) )	 {
    						if ( node.nodeType === 1 ) { 
    							return false; 
    						}
    					}
    
    					if ( type === "first" ) { 
    						return true; 
    					}
    
    					node = elem;
    
    				case "last":
    					while ( (node = node.nextSibling) )	 {
    						if ( node.nodeType === 1 ) { 
    							return false; 
    						}
    					}
    
    					return true;
    
    				case "nth":
    					var first = match[2],
    						last = match[3];
    
    					if ( first === 1 && last === 0 ) {
    						return true;
    					}
    					
    					var doneName = match[0],
    						parent = elem.parentNode;
    	
    					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
    						var count = 0;
    						
    						for ( node = parent.firstChild; node; node = node.nextSibling ) {
    							if ( node.nodeType === 1 ) {
    								node.nodeIndex = ++count;
    							}
    						} 
    
    						parent.sizcache = doneName;
    					}
    					
    					var diff = elem.nodeIndex - last;
    
    					if ( first === 0 ) {
    						return diff === 0;
    
    					} else {
    						return ( diff % first === 0 && diff / first >= 0 );
    					}
    			}
    		},
    
    		ID: function( elem, match ) {
    			return elem.nodeType === 1 && elem.getAttribute("id") === match;
    		},
    
    		TAG: function( elem, match ) {
    			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
    		},
    		
    		CLASS: function( elem, match ) {
    			return (" " + (elem.className || elem.getAttribute("class")) + " ")
    				.indexOf( match ) > -1;
    		},
    
    		ATTR: function( elem, match ) {
    			var name = match[1],
    				result = Expr.attrHandle[ name ] ?
    					Expr.attrHandle[ name ]( elem ) :
    					elem[ name ] != null ?
    						elem[ name ] :
    						elem.getAttribute( name ),
    				value = result + "",
    				type = match[2],
    				check = match[4];
    
    			return result == null ?
    				type === "!=" :
    				type === "=" ?
    				value === check :
    				type === "*=" ?
    				value.indexOf(check) >= 0 :
    				type === "~=" ?
    				(" " + value + " ").indexOf(check) >= 0 :
    				!check ?
    				value && result !== false :
    				type === "!=" ?
    				value !== check :
    				type === "^=" ?
    				value.indexOf(check) === 0 :
    				type === "$=" ?
    				value.substr(value.length - check.length) === check :
    				type === "|=" ?
    				value === check || value.substr(0, check.length + 1) === check + "-" :
    				false;
    		},
    
    		POS: function( elem, match, i, array ) {
    			var name = match[2],
    				filter = Expr.setFilters[ name ];
    
    			if ( filter ) {
    				return filter( elem, i, match, array );
    			}
    		}
    	}
    };
    
    var origPOS = Expr.match.POS,
    	fescape = function(all, num){
    		return "\\" + (num - 0 + 1);
    	};
    
    for ( var type in Expr.match ) {
    	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
    	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
    }
    
    var makeArray = function( array, results ) {
    	array = Array.prototype.slice.call( array, 0 );
    
    	if ( results ) {
    		results.push.apply( results, array );
    		return results;
    	}
    	
    	return array;
    };
    
    // Perform a simple check to determine if the browser is capable of
    // converting a NodeList to an array using builtin methods.
    // Also verifies that the returned array holds DOM nodes
    // (which is not the case in the Blackberry browser)
    try {
    	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
    
    // Provide a fallback method if it does not work
    } catch( e ) {
    	makeArray = function( array, results ) {
    		var i = 0,
    			ret = results || [];
    
    		if ( toString.call(array) === "[object Array]" ) {
    			Array.prototype.push.apply( ret, array );
    
    		} else {
    			if ( typeof array.length === "number" ) {
    				for ( var l = array.length; i < l; i++ ) {
    					ret.push( array[i] );
    				}
    
    			} else {
    				for ( ; array[i]; i++ ) {
    					ret.push( array[i] );
    				}
    			}
    		}
    
    		return ret;
    	};
    }
    
    var sortOrder, siblingCheck;
    
    if ( document.documentElement.compareDocumentPosition ) {
    	sortOrder = function( a, b ) {
    		if ( a === b ) {
    			hasDuplicate = true;
    			return 0;
    		}
    
    		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
    			return a.compareDocumentPosition ? -1 : 1;
    		}
    
    		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
    	};
    
    } else {
    	sortOrder = function( a, b ) {
    		// The nodes are identical, we can exit early
    		if ( a === b ) {
    			hasDuplicate = true;
    			return 0;
    
    		// Fallback to using sourceIndex (in IE) if it's available on both nodes
    		} else if ( a.sourceIndex && b.sourceIndex ) {
    			return a.sourceIndex - b.sourceIndex;
    		}
    
    		var al, bl,
    			ap = [],
    			bp = [],
    			aup = a.parentNode,
    			bup = b.parentNode,
    			cur = aup;
    
    		// If the nodes are siblings (or identical) we can do a quick check
    		if ( aup === bup ) {
    			return siblingCheck( a, b );
    
    		// If no parents were found then the nodes are disconnected
    		} else if ( !aup ) {
    			return -1;
    
    		} else if ( !bup ) {
    			return 1;
    		}
    
    		// Otherwise they're somewhere else in the tree so we need
    		// to build up a full list of the parentNodes for comparison
    		while ( cur ) {
    			ap.unshift( cur );
    			cur = cur.parentNode;
    		}
    
    		cur = bup;
    
    		while ( cur ) {
    			bp.unshift( cur );
    			cur = cur.parentNode;
    		}
    
    		al = ap.length;
    		bl = bp.length;
    
    		// Start walking down the tree looking for a discrepancy
    		for ( var i = 0; i < al && i < bl; i++ ) {
    			if ( ap[i] !== bp[i] ) {
    				return siblingCheck( ap[i], bp[i] );
    			}
    		}
    
    		// We ended someplace up the tree so do a sibling check
    		return i === al ?
    			siblingCheck( a, bp[i], -1 ) :
    			siblingCheck( ap[i], b, 1 );
    	};
    
    	siblingCheck = function( a, b, ret ) {
    		if ( a === b ) {
    			return ret;
    		}
    
    		var cur = a.nextSibling;
    
    		while ( cur ) {
    			if ( cur === b ) {
    				return -1;
    			}
    
    			cur = cur.nextSibling;
    		}
    
    		return 1;
    	};
    }
    
    // Utility function for retreiving the text value of an array of DOM nodes
    Sizzle.getText = function( elems ) {
    	var ret = "", elem;
    
    	for ( var i = 0; elems[i]; i++ ) {
    		elem = elems[i];
    
    		// Get the text from text nodes and CDATA nodes
    		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
    			ret += elem.nodeValue;
    
    		// Traverse everything else, except comment nodes
    		} else if ( elem.nodeType !== 8 ) {
    			ret += Sizzle.getText( elem.childNodes );
    		}
    	}
    
    	return ret;
    };
    
    // Check to see if the browser returns elements by name when
    // querying by getElementById (and provide a workaround)
    (function(){
    	// We're going to inject a fake input element with a specified name
    	var form = document.createElement("div"),
    		id = "script" + (new Date()).getTime(),
    		root = document.documentElement;
    
    	form.innerHTML = "<a name='" + id + "'/>";
    
    	// Inject it into the root element, check its status, and remove it quickly
    	root.insertBefore( form, root.firstChild );
    
    	// The workaround has to do additional checks after a getElementById
    	// Which slows things down for other browsers (hence the branching)
    	if ( document.getElementById( id ) ) {
    		Expr.find.ID = function( match, context, isXML ) {
    			if ( typeof context.getElementById !== "undefined" && !isXML ) {
    				var m = context.getElementById(match[1]);
    
    				return m ?
    					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
    						[m] :
    						undefined :
    					[];
    			}
    		};
    
    		Expr.filter.ID = function( elem, match ) {
    			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
    
    			return elem.nodeType === 1 && node && node.nodeValue === match;
    		};
    	}
    
    	root.removeChild( form );
    
    	// release memory in IE
    	root = form = null;
    })();
    
    (function(){
    	// Check to see if the browser returns only elements
    	// when doing getElementsByTagName("*")
    
    	// Create a fake element
    	var div = document.createElement("div");
    	div.appendChild( document.createComment("") );
    
    	// Make sure no comments are found
    	if ( div.getElementsByTagName("*").length > 0 ) {
    		Expr.find.TAG = function( match, context ) {
    			var results = context.getElementsByTagName( match[1] );
    
    			// Filter out possible comments
    			if ( match[1] === "*" ) {
    				var tmp = [];
    
    				for ( var i = 0; results[i]; i++ ) {
    					if ( results[i].nodeType === 1 ) {
    						tmp.push( results[i] );
    					}
    				}
    
    				results = tmp;
    			}
    
    			return results;
    		};
    	}
    
    	// Check to see if an attribute returns normalized href attributes
    	div.innerHTML = "<a href='#'></a>";
    
    	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
    			div.firstChild.getAttribute("href") !== "#" ) {
    
    		Expr.attrHandle.href = function( elem ) {
    			return elem.getAttribute( "href", 2 );
    		};
    	}
    
    	// release memory in IE
    	div = null;
    })();
    
    if ( document.querySelectorAll ) {
    	(function(){
    		var oldSizzle = Sizzle,
    			div = document.createElement("div"),
    			id = "__sizzle__";
    
    		div.innerHTML = "<p class='TEST'></p>";
    
    		// Safari can't handle uppercase or unicode characters when
    		// in quirks mode.
    		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
    			return;
    		}
    	
    		Sizzle = function( query, context, extra, seed ) {
    			context = context || document;
    
    			// Only use querySelectorAll on non-XML documents
    			// (ID selectors don't work in non-HTML documents)
    			if ( !seed && !Sizzle.isXML(context) ) {
    				// See if we find a selector to speed up
    				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
    				
    				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
    					// Speed-up: Sizzle("TAG")
    					if ( match[1] ) {
    						return makeArray( context.getElementsByTagName( query ), extra );
    					
    					// Speed-up: Sizzle(".CLASS")
    					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
    						return makeArray( context.getElementsByClassName( match[2] ), extra );
    					}
    				}
    				
    				if ( context.nodeType === 9 ) {
    					// Speed-up: Sizzle("body")
    					// The body element only exists once, optimize finding it
    					if ( query === "body" && context.body ) {
    						return makeArray( [ context.body ], extra );
    						
    					// Speed-up: Sizzle("#ID")
    					} else if ( match && match[3] ) {
    						var elem = context.getElementById( match[3] );
    
    						// Check parentNode to catch when Blackberry 4.6 returns
    						// nodes that are no longer in the document #6963
    						if ( elem && elem.parentNode ) {
    							// Handle the case where IE and Opera return items
    							// by name instead of ID
    							if ( elem.id === match[3] ) {
    								return makeArray( [ elem ], extra );
    							}
    							
    						} else {
    							return makeArray( [], extra );
    						}
    					}
    					
    					try {
    						return makeArray( context.querySelectorAll(query), extra );
    					} catch(qsaError) {}
    
    				// qSA works strangely on Element-rooted queries
    				// We can work around this by specifying an extra ID on the root
    				// and working up from there (Thanks to Andrew Dupont for the technique)
    				// IE 8 doesn't work on object elements
    				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
    					var oldContext = context,
    						old = context.getAttribute( "id" ),
    						nid = old || id,
    						hasParent = context.parentNode,
    						relativeHierarchySelector = /^\s*[+~]/.test( query );
    
    					if ( !old ) {
    						context.setAttribute( "id", nid );
    					} else {
    						nid = nid.replace( /'/g, "\\$&" );
    					}
    					if ( relativeHierarchySelector && hasParent ) {
    						context = context.parentNode;
    					}
    
    					try {
    						if ( !relativeHierarchySelector || hasParent ) {
    							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
    						}
    
    					} catch(pseudoError) {
    					} finally {
    						if ( !old ) {
    							oldContext.removeAttribute( "id" );
    						}
    					}
    				}
    			}
    		
    			return oldSizzle(query, context, extra, seed);
    		};
    
    		for ( var prop in oldSizzle ) {
    			Sizzle[ prop ] = oldSizzle[ prop ];
    		}
    
    		// release memory in IE
    		div = null;
    	})();
    }
    
    (function(){
    	var html = document.documentElement,
    		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
    
    	if ( matches ) {
    		// Check to see if it's possible to do matchesSelector
    		// on a disconnected node (IE 9 fails this)
    		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
    			pseudoWorks = false;
    
    		try {
    			// This should fail with an exception
    			// Gecko does not error, returns false instead
    			matches.call( document.documentElement, "[test!='']:sizzle" );
    	
    		} catch( pseudoError ) {
    			pseudoWorks = true;
    		}
    
    		Sizzle.matchesSelector = function( node, expr ) {
    			// Make sure that attribute selectors are quoted
    			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
    
    			if ( !Sizzle.isXML( node ) ) {
    				try { 
    					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
    						var ret = matches.call( node, expr );
    
    						// IE 9's matchesSelector returns false on disconnected nodes
    						if ( ret || !disconnectedMatch ||
    								// As well, disconnected nodes are said to be in a document
    								// fragment in IE 9, so check for that
    								node.document && node.document.nodeType !== 11 ) {
    							return ret;
    						}
    					}
    				} catch(e) {}
    			}
    
    			return Sizzle(expr, null, null, [node]).length > 0;
    		};
    	}
    })();
    
    (function(){
    	var div = document.createElement("div");
    
    	div.innerHTML = "<div class='test e'></div><div class='test'></div>";
    
    	// Opera can't find a second classname (in 9.6)
    	// Also, make sure that getElementsByClassName actually exists
    	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
    		return;
    	}
    
    	// Safari caches class attributes, doesn't catch changes (in 3.2)
    	div.lastChild.className = "e";
    
    	if ( div.getElementsByClassName("e").length === 1 ) {
    		return;
    	}
    	
    	Expr.order.splice(1, 0, "CLASS");
    	Expr.find.CLASS = function( match, context, isXML ) {
    		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
    			return context.getElementsByClassName(match[1]);
    		}
    	};
    
    	// release memory in IE
    	div = null;
    })();
    
    function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
    	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
    		var elem = checkSet[i];
    
    		if ( elem ) {
    			var match = false;
    
    			elem = elem[dir];
    
    			while ( elem ) {
    				if ( elem.sizcache === doneName ) {
    					match = checkSet[elem.sizset];
    					break;
    				}
    
    				if ( elem.nodeType === 1 && !isXML ){
    					elem.sizcache = doneName;
    					elem.sizset = i;
    				}
    
    				if ( elem.nodeName.toLowerCase() === cur ) {
    					match = elem;
    					break;
    				}
    
    				elem = elem[dir];
    			}
    
    			checkSet[i] = match;
    		}
    	}
    }
    
    function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
    	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
    		var elem = checkSet[i];
    
    		if ( elem ) {
    			var match = false;
    			
    			elem = elem[dir];
    
    			while ( elem ) {
    				if ( elem.sizcache === doneName ) {
    					match = checkSet[elem.sizset];
    					break;
    				}
    
    				if ( elem.nodeType === 1 ) {
    					if ( !isXML ) {
    						elem.sizcache = doneName;
    						elem.sizset = i;
    					}
    
    					if ( typeof cur !== "string" ) {
    						if ( elem === cur ) {
    							match = true;
    							break;
    						}
    
    					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
    						match = elem;
    						break;
    					}
    				}
    
    				elem = elem[dir];
    			}
    
    			checkSet[i] = match;
    		}
    	}
    }
    
    if ( document.documentElement.contains ) {
    	Sizzle.contains = function( a, b ) {
    		return a !== b && (a.contains ? a.contains(b) : true);
    	};
    
    } else if ( document.documentElement.compareDocumentPosition ) {
    	Sizzle.contains = function( a, b ) {
    		return !!(a.compareDocumentPosition(b) & 16);
    	};
    
    } else {
    	Sizzle.contains = function() {
    		return false;
    	};
    }
    
    Sizzle.isXML = function( elem ) {
    	// documentElement is verified for cases where it doesn't yet exist
    	// (such as loading iframes in IE - #4833) 
    	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
    
    	return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    
    var posProcess = function( selector, context ) {
    	var match,
    		tmpSet = [],
    		later = "",
    		root = context.nodeType ? [context] : context;
    
    	// Position selectors must be done after the filter
    	// And so must :not(positional) so we move all PSEUDOs to the end
    	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
    		later += match[0];
    		selector = selector.replace( Expr.match.PSEUDO, "" );
    	}
    
    	selector = Expr.relative[selector] ? selector + "*" : selector;
    
    	for ( var i = 0, l = root.length; i < l; i++ ) {
    		Sizzle( selector, root[i], tmpSet );
    	}
    
    	return Sizzle.filter( later, tmpSet );
    };
    
    // EXPOSE
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.filters;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    
    
    })();
    
    
    var runtil = /Until$/,
    	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
    	// Note: This RegExp should be improved, or likely pulled from Sizzle
    	rmultiselector = /,/,
    	isSimple = /^.[^:#\[\.,]*$/,
    	slice = Array.prototype.slice,
    	POS = jQuery.expr.match.POS,
    	// methods guaranteed to produce a unique set when starting from a unique set
    	guaranteedUnique = {
    		children: true,
    		contents: true,
    		next: true,
    		prev: true
    	};
    
    jQuery.fn.extend({
    	find: function( selector ) {
    		var self = this,
    			i, l;
    
    		if ( typeof selector !== "string" ) {
    			return jQuery( selector ).filter(function() {
    				for ( i = 0, l = self.length; i < l; i++ ) {
    					if ( jQuery.contains( self[ i ], this ) ) {
    						return true;
    					}
    				}
    			});
    		}
    
    		var ret = this.pushStack( "", "find", selector ),
    			length, n, r;
    
    		for ( i = 0, l = this.length; i < l; i++ ) {
    			length = ret.length;
    			jQuery.find( selector, this[i], ret );
    
    			if ( i > 0 ) {
    				// Make sure that the results are unique
    				for ( n = length; n < ret.length; n++ ) {
    					for ( r = 0; r < length; r++ ) {
    						if ( ret[r] === ret[n] ) {
    							ret.splice(n--, 1);
    							break;
    						}
    					}
    				}
    			}
    		}
    
    		return ret;
    	},
    
    	has: function( target ) {
    		var targets = jQuery( target );
    		return this.filter(function() {
    			for ( var i = 0, l = targets.length; i < l; i++ ) {
    				if ( jQuery.contains( this, targets[i] ) ) {
    					return true;
    				}
    			}
    		});
    	},
    
    	not: function( selector ) {
    		return this.pushStack( winnow(this, selector, false), "not", selector);
    	},
    
    	filter: function( selector ) {
    		return this.pushStack( winnow(this, selector, true), "filter", selector );
    	},
    
    	is: function( selector ) {
    		return !!selector && ( typeof selector === "string" ?
    			jQuery.filter( selector, this ).length > 0 :
    			this.filter( selector ).length > 0 );
    	},
    
    	closest: function( selectors, context ) {
    		var ret = [], i, l, cur = this[0];
    		
    		// Array
    		if ( jQuery.isArray( selectors ) ) {
    			var match, selector,
    				matches = {},
    				level = 1;
    
    			if ( cur && selectors.length ) {
    				for ( i = 0, l = selectors.length; i < l; i++ ) {
    					selector = selectors[i];
    
    					if ( !matches[ selector ] ) {
    						matches[ selector ] = POS.test( selector ) ?
    							jQuery( selector, context || this.context ) :
    							selector;
    					}
    				}
    
    				while ( cur && cur.ownerDocument && cur !== context ) {
    					for ( selector in matches ) {
    						match = matches[ selector ];
    
    						if ( match.jquery ? match.index( cur ) > -1 : jQuery( cur ).is( match ) ) {
    							ret.push({ selector: selector, elem: cur, level: level });
    						}
    					}
    
    					cur = cur.parentNode;
    					level++;
    				}
    			}
    
    			return ret;
    		}
    
    		// String
    		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
    				jQuery( selectors, context || this.context ) :
    				0;
    
    		for ( i = 0, l = this.length; i < l; i++ ) {
    			cur = this[i];
    
    			while ( cur ) {
    				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
    					ret.push( cur );
    					break;
    
    				} else {
    					cur = cur.parentNode;
    					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
    						break;
    					}
    				}
    			}
    		}
    
    		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;
    
    		return this.pushStack( ret, "closest", selectors );
    	},
    
    	// Determine the position of an element within
    	// the matched set of elements
    	index: function( elem ) {
    		if ( !elem || typeof elem === "string" ) {
    			return jQuery.inArray( this[0],
    				// If it receives a string, the selector is used
    				// If it receives nothing, the siblings are used
    				elem ? jQuery( elem ) : this.parent().children() );
    		}
    		// Locate the position of the desired element
    		return jQuery.inArray(
    			// If it receives a jQuery object, the first element is used
    			elem.jquery ? elem[0] : elem, this );
    	},
    
    	add: function( selector, context ) {
    		var set = typeof selector === "string" ?
    				jQuery( selector, context ) :
    				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
    			all = jQuery.merge( this.get(), set );
    
    		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
    			all :
    			jQuery.unique( all ) );
    	},
    
    	andSelf: function() {
    		return this.add( this.prevObject );
    	}
    });
    
    // A painfully simple check to see if an element is disconnected
    // from a document (should be improved, where feasible).
    function isDisconnected( node ) {
    	return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    
    jQuery.each({
    	parent: function( elem ) {
    		var parent = elem.parentNode;
    		return parent && parent.nodeType !== 11 ? parent : null;
    	},
    	parents: function( elem ) {
    		return jQuery.dir( elem, "parentNode" );
    	},
    	parentsUntil: function( elem, i, until ) {
    		return jQuery.dir( elem, "parentNode", until );
    	},
    	next: function( elem ) {
    		return jQuery.nth( elem, 2, "nextSibling" );
    	},
    	prev: function( elem ) {
    		return jQuery.nth( elem, 2, "previousSibling" );
    	},
    	nextAll: function( elem ) {
    		return jQuery.dir( elem, "nextSibling" );
    	},
    	prevAll: function( elem ) {
    		return jQuery.dir( elem, "previousSibling" );
    	},
    	nextUntil: function( elem, i, until ) {
    		return jQuery.dir( elem, "nextSibling", until );
    	},
    	prevUntil: function( elem, i, until ) {
    		return jQuery.dir( elem, "previousSibling", until );
    	},
    	siblings: function( elem ) {
    		return jQuery.sibling( elem.parentNode.firstChild, elem );
    	},
    	children: function( elem ) {
    		return jQuery.sibling( elem.firstChild );
    	},
    	contents: function( elem ) {
    		return jQuery.nodeName( elem, "iframe" ) ?
    			elem.contentDocument || elem.contentWindow.document :
    			jQuery.makeArray( elem.childNodes );
    	}
    }, function( name, fn ) {
    	jQuery.fn[ name ] = function( until, selector ) {
    		var ret = jQuery.map( this, fn, until ),
    			// The variable 'args' was introduced in
    			// https://github.com/jquery/jquery/commit/52a0238
    			// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.
    			// http://code.google.com/p/v8/issues/detail?id=1050
    			args = slice.call(arguments);
    
    		if ( !runtil.test( name ) ) {
    			selector = until;
    		}
    
    		if ( selector && typeof selector === "string" ) {
    			ret = jQuery.filter( selector, ret );
    		}
    
    		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;
    
    		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
    			ret = ret.reverse();
    		}
    
    		return this.pushStack( ret, name, args.join(",") );
    	};
    });
    
    jQuery.extend({
    	filter: function( expr, elems, not ) {
    		if ( not ) {
    			expr = ":not(" + expr + ")";
    		}
    
    		return elems.length === 1 ?
    			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
    			jQuery.find.matches(expr, elems);
    	},
    
    	dir: function( elem, dir, until ) {
    		var matched = [],
    			cur = elem[ dir ];
    
    		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
    			if ( cur.nodeType === 1 ) {
    				matched.push( cur );
    			}
    			cur = cur[dir];
    		}
    		return matched;
    	},
    
    	nth: function( cur, result, dir, elem ) {
    		result = result || 1;
    		var num = 0;
    
    		for ( ; cur; cur = cur[dir] ) {
    			if ( cur.nodeType === 1 && ++num === result ) {
    				break;
    			}
    		}
    
    		return cur;
    	},
    
    	sibling: function( n, elem ) {
    		var r = [];
    
    		for ( ; n; n = n.nextSibling ) {
    			if ( n.nodeType === 1 && n !== elem ) {
    				r.push( n );
    			}
    		}
    
    		return r;
    	}
    });
    
    // Implement the identical functionality for filter and not
    function winnow( elements, qualifier, keep ) {
    
    	// Can't pass null or undefined to indexOf in Firefox 4
    	// Set to 0 to skip string check
    	qualifier = qualifier || 0;
    
    	if ( jQuery.isFunction( qualifier ) ) {
    		return jQuery.grep(elements, function( elem, i ) {
    			var retVal = !!qualifier.call( elem, i, elem );
    			return retVal === keep;
    		});
    
    	} else if ( qualifier.nodeType ) {
    		return jQuery.grep(elements, function( elem, i ) {
    			return (elem === qualifier) === keep;
    		});
    
    	} else if ( typeof qualifier === "string" ) {
    		var filtered = jQuery.grep(elements, function( elem ) {
    			return elem.nodeType === 1;
    		});
    
    		if ( isSimple.test( qualifier ) ) {
    			return jQuery.filter(qualifier, filtered, !keep);
    		} else {
    			qualifier = jQuery.filter( qualifier, filtered );
    		}
    	}
    
    	return jQuery.grep(elements, function( elem, i ) {
    		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
    	});
    }
    
    
    
    
    var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
    	rleadingWhitespace = /^\s+/,
    	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    	rtagName = /<([\w:]+)/,
    	rtbody = /<tbody/i,
    	rhtml = /<|&#?\w+;/,
    	rnocache = /<(?:script|object|embed|option|style)/i,
    	// checked="checked" or checked
    	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    	rscriptType = /\/(java|ecma)script/i,
    	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
    	wrapMap = {
    		option: [ 1, "<select multiple='multiple'>", "</select>" ],
    		legend: [ 1, "<fieldset>", "</fieldset>" ],
    		thead: [ 1, "<table>", "</table>" ],
    		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
    		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
    		area: [ 1, "<map>", "</map>" ],
    		_default: [ 0, "", "" ]
    	};
    
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    
    // IE can't serialize <link> and <script> tags normally
    if ( !jQuery.support.htmlSerialize ) {
    	wrapMap._default = [ 1, "div<div>", "</div>" ];
    }
    
    jQuery.fn.extend({
    	text: function( text ) {
    		if ( jQuery.isFunction(text) ) {
    			return this.each(function(i) {
    				var self = jQuery( this );
    
    				self.text( text.call(this, i, self.text()) );
    			});
    		}
    
    		if ( typeof text !== "object" && text !== undefined ) {
    			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
    		}
    
    		return jQuery.text( this );
    	},
    
    	wrapAll: function( html ) {
    		if ( jQuery.isFunction( html ) ) {
    			return this.each(function(i) {
    				jQuery(this).wrapAll( html.call(this, i) );
    			});
    		}
    
    		if ( this[0] ) {
    			// The elements to wrap the target around
    			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);
    
    			if ( this[0].parentNode ) {
    				wrap.insertBefore( this[0] );
    			}
    
    			wrap.map(function() {
    				var elem = this;
    
    				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
    					elem = elem.firstChild;
    				}
    
    				return elem;
    			}).append( this );
    		}
    
    		return this;
    	},
    
    	wrapInner: function( html ) {
    		if ( jQuery.isFunction( html ) ) {
    			return this.each(function(i) {
    				jQuery(this).wrapInner( html.call(this, i) );
    			});
    		}
    
    		return this.each(function() {
    			var self = jQuery( this ),
    				contents = self.contents();
    
    			if ( contents.length ) {
    				contents.wrapAll( html );
    
    			} else {
    				self.append( html );
    			}
    		});
    	},
    
    	wrap: function( html ) {
    		return this.each(function() {
    			jQuery( this ).wrapAll( html );
    		});
    	},
    
    	unwrap: function() {
    		return this.parent().each(function() {
    			if ( !jQuery.nodeName( this, "body" ) ) {
    				jQuery( this ).replaceWith( this.childNodes );
    			}
    		}).end();
    	},
    
    	append: function() {
    		return this.domManip(arguments, true, function( elem ) {
    			if ( this.nodeType === 1 ) {
    				this.appendChild( elem );
    			}
    		});
    	},
    
    	prepend: function() {
    		return this.domManip(arguments, true, function( elem ) {
    			if ( this.nodeType === 1 ) {
    				this.insertBefore( elem, this.firstChild );
    			}
    		});
    	},
    
    	before: function() {
    		if ( this[0] && this[0].parentNode ) {
    			return this.domManip(arguments, false, function( elem ) {
    				this.parentNode.insertBefore( elem, this );
    			});
    		} else if ( arguments.length ) {
    			var set = jQuery(arguments[0]);
    			set.push.apply( set, this.toArray() );
    			return this.pushStack( set, "before", arguments );
    		}
    	},
    
    	after: function() {
    		if ( this[0] && this[0].parentNode ) {
    			return this.domManip(arguments, false, function( elem ) {
    				this.parentNode.insertBefore( elem, this.nextSibling );
    			});
    		} else if ( arguments.length ) {
    			var set = this.pushStack( this, "after", arguments );
    			set.push.apply( set, jQuery(arguments[0]).toArray() );
    			return set;
    		}
    	},
    
    	// keepData is for internal use only--do not document
    	remove: function( selector, keepData ) {
    		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
    			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
    				if ( !keepData && elem.nodeType === 1 ) {
    					jQuery.cleanData( elem.getElementsByTagName("*") );
    					jQuery.cleanData( [ elem ] );
    				}
    
    				if ( elem.parentNode ) {
    					elem.parentNode.removeChild( elem );
    				}
    			}
    		}
    
    		return this;
    	},
    
    	empty: function() {
    		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
    			// Remove element nodes and prevent memory leaks
    			if ( elem.nodeType === 1 ) {
    				jQuery.cleanData( elem.getElementsByTagName("*") );
    			}
    
    			// Remove any remaining nodes
    			while ( elem.firstChild ) {
    				elem.removeChild( elem.firstChild );
    			}
    		}
    
    		return this;
    	},
    
    	clone: function( dataAndEvents, deepDataAndEvents ) {
    		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
    
    		return this.map( function () {
    			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    		});
    	},
    
    	html: function( value ) {
    		if ( value === undefined ) {
    			return this[0] && this[0].nodeType === 1 ?
    				this[0].innerHTML.replace(rinlinejQuery, "") :
    				null;
    
    		// See if we can take a shortcut and just use innerHTML
    		} else if ( typeof value === "string" && !rnocache.test( value ) &&
    			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
    			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {
    
    			value = value.replace(rxhtmlTag, "<$1></$2>");
    
    			try {
    				for ( var i = 0, l = this.length; i < l; i++ ) {
    					// Remove element nodes and prevent memory leaks
    					if ( this[i].nodeType === 1 ) {
    						jQuery.cleanData( this[i].getElementsByTagName("*") );
    						this[i].innerHTML = value;
    					}
    				}
    
    			// If using innerHTML throws an exception, use the fallback method
    			} catch(e) {
    				this.empty().append( value );
    			}
    
    		} else if ( jQuery.isFunction( value ) ) {
    			this.each(function(i){
    				var self = jQuery( this );
    
    				self.html( value.call(this, i, self.html()) );
    			});
    
    		} else {
    			this.empty().append( value );
    		}
    
    		return this;
    	},
    
    	replaceWith: function( value ) {
    		if ( this[0] && this[0].parentNode ) {
    			// Make sure that the elements are removed from the DOM before they are inserted
    			// this can help fix replacing a parent with child elements
    			if ( jQuery.isFunction( value ) ) {
    				return this.each(function(i) {
    					var self = jQuery(this), old = self.html();
    					self.replaceWith( value.call( this, i, old ) );
    				});
    			}
    
    			if ( typeof value !== "string" ) {
    				value = jQuery( value ).detach();
    			}
    
    			return this.each(function() {
    				var next = this.nextSibling,
    					parent = this.parentNode;
    
    				jQuery( this ).remove();
    
    				if ( next ) {
    					jQuery(next).before( value );
    				} else {
    					jQuery(parent).append( value );
    				}
    			});
    		} else {
    			return this.length ?
    				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
    				this;
    		}
    	},
    
    	detach: function( selector ) {
    		return this.remove( selector, true );
    	},
    
    	domManip: function( args, table, callback ) {
    		var results, first, fragment, parent,
    			value = args[0],
    			scripts = [];
    
    		// We can't cloneNode fragments that contain checked, in WebKit
    		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
    			return this.each(function() {
    				jQuery(this).domManip( args, table, callback, true );
    			});
    		}
    
    		if ( jQuery.isFunction(value) ) {
    			return this.each(function(i) {
    				var self = jQuery(this);
    				args[0] = value.call(this, i, table ? self.html() : undefined);
    				self.domManip( args, table, callback );
    			});
    		}
    
    		if ( this[0] ) {
    			parent = value && value.parentNode;
    
    			// If we're in a fragment, just use that instead of building a new one
    			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
    				results = { fragment: parent };
    
    			} else {
    				results = jQuery.buildFragment( args, this, scripts );
    			}
    
    			fragment = results.fragment;
    
    			if ( fragment.childNodes.length === 1 ) {
    				first = fragment = fragment.firstChild;
    			} else {
    				first = fragment.firstChild;
    			}
    
    			if ( first ) {
    				table = table && jQuery.nodeName( first, "tr" );
    
    				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
    					callback.call(
    						table ?
    							root(this[i], first) :
    							this[i],
    						// Make sure that we do not leak memory by inadvertently discarding
    						// the original fragment (which might have attached data) instead of
    						// using it; in addition, use the original fragment object for the last
    						// item instead of first because it can end up being emptied incorrectly
    						// in certain situations (Bug #8070).
    						// Fragments from the fragment cache must always be cloned and never used
    						// in place.
    						results.cacheable || (l > 1 && i < lastIndex) ?
    							jQuery.clone( fragment, true, true ) :
    							fragment
    					);
    				}
    			}
    
    			if ( scripts.length ) {
    				jQuery.each( scripts, evalScript );
    			}
    		}
    
    		return this;
    	}
    });
    
    function root( elem, cur ) {
    	return jQuery.nodeName(elem, "table") ?
    		(elem.getElementsByTagName("tbody")[0] ||
    		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
    		elem;
    }
    
    function cloneCopyEvent( src, dest ) {
    
    	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
    		return;
    	}
    
    	var internalKey = jQuery.expando,
    		oldData = jQuery.data( src ),
    		curData = jQuery.data( dest, oldData );
    
    	// Switch to use the internal data object, if it exists, for the next
    	// stage of data copying
    	if ( (oldData = oldData[ internalKey ]) ) {
    		var events = oldData.events;
    				curData = curData[ internalKey ] = jQuery.extend({}, oldData);
    
    		if ( events ) {
    			delete curData.handle;
    			curData.events = {};
    
    			for ( var type in events ) {
    				for ( var i = 0, l = events[ type ].length; i < l; i++ ) {
    					jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
    				}
    			}
    		}
    	}
    }
    
    function cloneFixAttributes( src, dest ) {
    	var nodeName;
    
    	// We do not need to do anything for non-Elements
    	if ( dest.nodeType !== 1 ) {
    		return;
    	}
    
    	// clearAttributes removes the attributes, which we don't want,
    	// but also removes the attachEvent events, which we *do* want
    	if ( dest.clearAttributes ) {
    		dest.clearAttributes();
    	}
    
    	// mergeAttributes, in contrast, only merges back on the
    	// original attributes, not the events
    	if ( dest.mergeAttributes ) {
    		dest.mergeAttributes( src );
    	}
    
    	nodeName = dest.nodeName.toLowerCase();
    
    	// IE6-8 fail to clone children inside object elements that use
    	// the proprietary classid attribute value (rather than the type
    	// attribute) to identify the type of content to display
    	if ( nodeName === "object" ) {
    		dest.outerHTML = src.outerHTML;
    
    	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
    		// IE6-8 fails to persist the checked state of a cloned checkbox
    		// or radio button. Worse, IE6-7 fail to give the cloned element
    		// a checked appearance if the defaultChecked value isn't also set
    		if ( src.checked ) {
    			dest.defaultChecked = dest.checked = src.checked;
    		}
    
    		// IE6-7 get confused and end up setting the value of a cloned
    		// checkbox/radio button to an empty string instead of "on"
    		if ( dest.value !== src.value ) {
    			dest.value = src.value;
    		}
    
    	// IE6-8 fails to return the selected option to the default selected
    	// state when cloning options
    	} else if ( nodeName === "option" ) {
    		dest.selected = src.defaultSelected;
    
    	// IE6-8 fails to set the defaultValue to the correct value when
    	// cloning other types of input fields
    	} else if ( nodeName === "input" || nodeName === "textarea" ) {
    		dest.defaultValue = src.defaultValue;
    	}
    
    	// Event data gets referenced instead of copied if the expando
    	// gets copied too
    	dest.removeAttribute( jQuery.expando );
    }
    
    jQuery.buildFragment = function( args, nodes, scripts ) {
    	var fragment, cacheable, cacheresults, doc;
    
      // nodes may contain either an explicit document object,
      // a jQuery collection or context object.
      // If nodes[0] contains a valid object to assign to doc
      if ( nodes && nodes[0] ) {
        doc = nodes[0].ownerDocument || nodes[0];
      }
    
      // Ensure that an attr object doesn't incorrectly stand in as a document object
    	// Chrome and Firefox seem to allow this to occur and will throw exception
    	// Fixes #8950
    	if ( !doc.createDocumentFragment ) {
    		doc = document;
    	}
    
    	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
    	// Cloning options loses the selected state, so don't cache them
    	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
    	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
    	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
    		args[0].charAt(0) === "<" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {
    
    		cacheable = true;
    
    		cacheresults = jQuery.fragments[ args[0] ];
    		if ( cacheresults && cacheresults !== 1 ) {
    			fragment = cacheresults;
    		}
    	}
    
    	if ( !fragment ) {
    		fragment = doc.createDocumentFragment();
    		jQuery.clean( args, doc, fragment, scripts );
    	}
    
    	if ( cacheable ) {
    		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
    	}
    
    	return { fragment: fragment, cacheable: cacheable };
    };
    
    jQuery.fragments = {};
    
    jQuery.each({
    	appendTo: "append",
    	prependTo: "prepend",
    	insertBefore: "before",
    	insertAfter: "after",
    	replaceAll: "replaceWith"
    }, function( name, original ) {
    	jQuery.fn[ name ] = function( selector ) {
    		var ret = [],
    			insert = jQuery( selector ),
    			parent = this.length === 1 && this[0].parentNode;
    
    		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
    			insert[ original ]( this[0] );
    			return this;
    
    		} else {
    			for ( var i = 0, l = insert.length; i < l; i++ ) {
    				var elems = (i > 0 ? this.clone(true) : this).get();
    				jQuery( insert[i] )[ original ]( elems );
    				ret = ret.concat( elems );
    			}
    
    			return this.pushStack( ret, name, insert.selector );
    		}
    	};
    });
    
    function getAll( elem ) {
    	if ( "getElementsByTagName" in elem ) {
    		return elem.getElementsByTagName( "*" );
    
    	} else if ( "querySelectorAll" in elem ) {
    		return elem.querySelectorAll( "*" );
    
    	} else {
    		return [];
    	}
    }
    
    // Used in clean, fixes the defaultChecked property
    function fixDefaultChecked( elem ) {
    	if ( elem.type === "checkbox" || elem.type === "radio" ) {
    		elem.defaultChecked = elem.checked;
    	}
    }
    // Finds all inputs and passes them to fixDefaultChecked
    function findInputs( elem ) {
    	if ( jQuery.nodeName( elem, "input" ) ) {
    		fixDefaultChecked( elem );
    	} else if ( "getElementsByTagName" in elem ) {
    		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
    	}
    }
    
    jQuery.extend({
    	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    		var clone = elem.cloneNode(true),
    				srcElements,
    				destElements,
    				i;
    
    		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
    				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
    			// IE copies events bound via attachEvent when using cloneNode.
    			// Calling detachEvent on the clone will also remove the events
    			// from the original. In order to get around this, we use some
    			// proprietary methods to clear the events. Thanks to MooTools
    			// guys for this hotness.
    
    			cloneFixAttributes( elem, clone );
    
    			// Using Sizzle here is crazy slow, so we use getElementsByTagName
    			// instead
    			srcElements = getAll( elem );
    			destElements = getAll( clone );
    
    			// Weird iteration because IE will replace the length property
    			// with an element if you are cloning the body and one of the
    			// elements on the page has a name or id of "length"
    			for ( i = 0; srcElements[i]; ++i ) {
    				cloneFixAttributes( srcElements[i], destElements[i] );
    			}
    		}
    
    		// Copy the events from the original to the clone
    		if ( dataAndEvents ) {
    			cloneCopyEvent( elem, clone );
    
    			if ( deepDataAndEvents ) {
    				srcElements = getAll( elem );
    				destElements = getAll( clone );
    
    				for ( i = 0; srcElements[i]; ++i ) {
    					cloneCopyEvent( srcElements[i], destElements[i] );
    				}
    			}
    		}
    
    		srcElements = destElements = null;
    
    		// Return the cloned set
    		return clone;
    	},
    
    	clean: function( elems, context, fragment, scripts ) {
    		var checkScriptType;
    
    		context = context || document;
    
    		// !context.createElement fails in IE with an error but returns typeof 'object'
    		if ( typeof context.createElement === "undefined" ) {
    			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
    		}
    
    		var ret = [], j;
    
    		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
    			if ( typeof elem === "number" ) {
    				elem += "";
    			}
    
    			if ( !elem ) {
    				continue;
    			}
    
    			// Convert html string into DOM nodes
    			if ( typeof elem === "string" ) {
    				if ( !rhtml.test( elem ) ) {
    					elem = context.createTextNode( elem );
    				} else {
    					// Fix "XHTML"-style tags in all browsers
    					elem = elem.replace(rxhtmlTag, "<$1></$2>");
    
    					// Trim whitespace, otherwise indexOf won't work as expected
    					var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
    						wrap = wrapMap[ tag ] || wrapMap._default,
    						depth = wrap[0],
    						div = context.createElement("div");
    
    					// Go to html and back, then peel off extra wrappers
    					div.innerHTML = wrap[1] + elem + wrap[2];
    
    					// Move to the right depth
    					while ( depth-- ) {
    						div = div.lastChild;
    					}
    
    					// Remove IE's autoinserted <tbody> from table fragments
    					if ( !jQuery.support.tbody ) {
    
    						// String was a <table>, *may* have spurious <tbody>
    						var hasBody = rtbody.test(elem),
    							tbody = tag === "table" && !hasBody ?
    								div.firstChild && div.firstChild.childNodes :
    
    								// String was a bare <thead> or <tfoot>
    								wrap[1] === "<table>" && !hasBody ?
    									div.childNodes :
    									[];
    
    						for ( j = tbody.length - 1; j >= 0 ; --j ) {
    							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
    								tbody[ j ].parentNode.removeChild( tbody[ j ] );
    							}
    						}
    					}
    
    					// IE completely kills leading whitespace when innerHTML is used
    					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
    						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
    					}
    
    					elem = div.childNodes;
    				}
    			}
    
    			// Resets defaultChecked for any radios and checkboxes
    			// about to be appended to the DOM in IE 6/7 (#8060)
    			var len;
    			if ( !jQuery.support.appendChecked ) {
    				if ( elem[0] && typeof (len = elem.length) === "number" ) {
    					for ( j = 0; j < len; j++ ) {
    						findInputs( elem[j] );
    					}
    				} else {
    					findInputs( elem );
    				}
    			}
    
    			if ( elem.nodeType ) {
    				ret.push( elem );
    			} else {
    				ret = jQuery.merge( ret, elem );
    			}
    		}
    
    		if ( fragment ) {
    			checkScriptType = function( elem ) {
    				return !elem.type || rscriptType.test( elem.type );
    			};
    			for ( i = 0; ret[i]; i++ ) {
    				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
    					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
    
    				} else {
    					if ( ret[i].nodeType === 1 ) {
    						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );
    
    						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
    					}
    					fragment.appendChild( ret[i] );
    				}
    			}
    		}
    
    		return ret;
    	},
    
    	cleanData: function( elems ) {
    		var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,
    			deleteExpando = jQuery.support.deleteExpando;
    
    		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
    			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
    				continue;
    			}
    
    			id = elem[ jQuery.expando ];
    
    			if ( id ) {
    				data = cache[ id ] && cache[ id ][ internalKey ];
    
    				if ( data && data.events ) {
    					for ( var type in data.events ) {
    						if ( special[ type ] ) {
    							jQuery.event.remove( elem, type );
    
    						// This is a shortcut to avoid jQuery.event.remove's overhead
    						} else {
    							jQuery.removeEvent( elem, type, data.handle );
    						}
    					}
    
    					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
    					if ( data.handle ) {
    						data.handle.elem = null;
    					}
    				}
    
    				if ( deleteExpando ) {
    					delete elem[ jQuery.expando ];
    
    				} else if ( elem.removeAttribute ) {
    					elem.removeAttribute( jQuery.expando );
    				}
    
    				delete cache[ id ];
    			}
    		}
    	}
    });
    
    function evalScript( i, elem ) {
    	if ( elem.src ) {
    		jQuery.ajax({
    			url: elem.src,
    			async: false,
    			dataType: "script"
    		});
    	} else {
    		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
    	}
    
    	if ( elem.parentNode ) {
    		elem.parentNode.removeChild( elem );
    	}
    }
    
    
    
    var ralpha = /alpha\([^)]*\)/i,
    	ropacity = /opacity=([^)]*)/,
    	// fixed for IE9, see #8346
    	rupper = /([A-Z]|^ms)/g,
    	rnumpx = /^-?\d+(?:px)?$/i,
    	rnum = /^-?\d/,
    	rrelNum = /^[+\-]=/,
    	rrelNumFilter = /[^+\-\.\de]+/g,
    
    	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    	cssWidth = [ "Left", "Right" ],
    	cssHeight = [ "Top", "Bottom" ],
    	curCSS,
    
    	getComputedStyle,
    	currentStyle;
    
    jQuery.fn.css = function( name, value ) {
    	// Setting 'undefined' is a no-op
    	if ( arguments.length === 2 && value === undefined ) {
    		return this;
    	}
    
    	return jQuery.access( this, name, value, true, function( elem, name, value ) {
    		return value !== undefined ?
    			jQuery.style( elem, name, value ) :
    			jQuery.css( elem, name );
    	});
    };
    
    jQuery.extend({
    	// Add in style property hooks for overriding the default
    	// behavior of getting and setting a style property
    	cssHooks: {
    		opacity: {
    			get: function( elem, computed ) {
    				if ( computed ) {
    					// We should always get a number back from opacity
    					var ret = curCSS( elem, "opacity", "opacity" );
    					return ret === "" ? "1" : ret;
    
    				} else {
    					return elem.style.opacity;
    				}
    			}
    		}
    	},
    
    	// Exclude the following css properties to add px
    	cssNumber: {
    		"fillOpacity": true,
    		"fontWeight": true,
    		"lineHeight": true,
    		"opacity": true,
    		"orphans": true,
    		"widows": true,
    		"zIndex": true,
    		"zoom": true
    	},
    
    	// Add in properties whose names you wish to fix before
    	// setting or getting the value
    	cssProps: {
    		// normalize float css property
    		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    	},
    
    	// Get and set the style property on a DOM Node
    	style: function( elem, name, value, extra ) {
    		// Don't set styles on text and comment nodes
    		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
    			return;
    		}
    
    		// Make sure that we're working with the right name
    		var ret, type, origName = jQuery.camelCase( name ),
    			style = elem.style, hooks = jQuery.cssHooks[ origName ];
    
    		name = jQuery.cssProps[ origName ] || origName;
    
    		// Check if we're setting a value
    		if ( value !== undefined ) {
    			type = typeof value;
    
    			// Make sure that NaN and null values aren't set. See: #7116
    			if ( type === "number" && isNaN( value ) || value == null ) {
    				return;
    			}
    
    			// convert relative number strings (+= or -=) to relative numbers. #7345
    			if ( type === "string" && rrelNum.test( value ) ) {
    				value = +value.replace( rrelNumFilter, "" ) + parseFloat( jQuery.css( elem, name ) );
    				// Fixes bug #9237
    				type = "number";
    			}
    
    			// If a number was passed in, add 'px' to the (except for certain CSS properties)
    			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
    				value += "px";
    			}
    
    			// If a hook was provided, use that value, otherwise just set the specified value
    			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
    				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
    				// Fixes bug #5509
    				try {
    					style[ name ] = value;
    				} catch(e) {}
    			}
    
    		} else {
    			// If a hook was provided get the non-computed value from there
    			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
    				return ret;
    			}
    
    			// Otherwise just get the value from the style object
    			return style[ name ];
    		}
    	},
    
    	css: function( elem, name, extra ) {
    		var ret, hooks;
    
    		// Make sure that we're working with the right name
    		name = jQuery.camelCase( name );
    		hooks = jQuery.cssHooks[ name ];
    		name = jQuery.cssProps[ name ] || name;
    
    		// cssFloat needs a special treatment
    		if ( name === "cssFloat" ) {
    			name = "float";
    		}
    
    		// If a hook was provided get the computed value from there
    		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
    			return ret;
    
    		// Otherwise, if a way to get the computed value exists, use that
    		} else if ( curCSS ) {
    			return curCSS( elem, name );
    		}
    	},
    
    	// A method for quickly swapping in/out CSS properties to get correct calculations
    	swap: function( elem, options, callback ) {
    		var old = {};
    
    		// Remember the old values, and insert the new ones
    		for ( var name in options ) {
    			old[ name ] = elem.style[ name ];
    			elem.style[ name ] = options[ name ];
    		}
    
    		callback.call( elem );
    
    		// Revert the old values
    		for ( name in options ) {
    			elem.style[ name ] = old[ name ];
    		}
    	}
    });
    
    // DEPRECATED, Use jQuery.css() instead
    jQuery.curCSS = jQuery.css;
    
    jQuery.each(["height", "width"], function( i, name ) {
    	jQuery.cssHooks[ name ] = {
    		get: function( elem, computed, extra ) {
    			var val;
    
    			if ( computed ) {
    				if ( elem.offsetWidth !== 0 ) {
    					return getWH( elem, name, extra );
    				} else {
    					jQuery.swap( elem, cssShow, function() {
    						val = getWH( elem, name, extra );
    					});
    				}
    
    				return val;
    			}
    		},
    
    		set: function( elem, value ) {
    			if ( rnumpx.test( value ) ) {
    				// ignore negative width and height values #1599
    				value = parseFloat( value );
    
    				if ( value >= 0 ) {
    					return value + "px";
    				}
    
    			} else {
    				return value;
    			}
    		}
    	};
    });
    
    if ( !jQuery.support.opacity ) {
    	jQuery.cssHooks.opacity = {
    		get: function( elem, computed ) {
    			// IE uses filters for opacity
    			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
    				( parseFloat( RegExp.$1 ) / 100 ) + "" :
    				computed ? "1" : "";
    		},
    
    		set: function( elem, value ) {
    			var style = elem.style,
    				currentStyle = elem.currentStyle;
    
    			// IE has trouble with opacity if it does not have layout
    			// Force it by setting the zoom level
    			style.zoom = 1;
    
    			// Set the alpha filter to set the opacity
    			var opacity = jQuery.isNaN( value ) ?
    				"" :
    				"alpha(opacity=" + value * 100 + ")",
    				filter = currentStyle && currentStyle.filter || style.filter || "";
    
    			style.filter = ralpha.test( filter ) ?
    				filter.replace( ralpha, opacity ) :
    				filter + " " + opacity;
    		}
    	};
    }
    
    jQuery(function() {
    	// This hook cannot be added until DOM ready because the support test
    	// for it is not run until after DOM ready
    	if ( !jQuery.support.reliableMarginRight ) {
    		jQuery.cssHooks.marginRight = {
    			get: function( elem, computed ) {
    				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
    				// Work around by temporarily setting element display to inline-block
    				var ret;
    				jQuery.swap( elem, { "display": "inline-block" }, function() {
    					if ( computed ) {
    						ret = curCSS( elem, "margin-right", "marginRight" );
    					} else {
    						ret = elem.style.marginRight;
    					}
    				});
    				return ret;
    			}
    		};
    	}
    });
    
    if ( document.defaultView && document.defaultView.getComputedStyle ) {
    	getComputedStyle = function( elem, name ) {
    		var ret, defaultView, computedStyle;
    
    		name = name.replace( rupper, "-$1" ).toLowerCase();
    
    		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
    			return undefined;
    		}
    
    		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
    			ret = computedStyle.getPropertyValue( name );
    			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
    				ret = jQuery.style( elem, name );
    			}
    		}
    
    		return ret;
    	};
    }
    
    if ( document.documentElement.currentStyle ) {
    	currentStyle = function( elem, name ) {
    		var left,
    			ret = elem.currentStyle && elem.currentStyle[ name ],
    			rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],
    			style = elem.style;
    
    		// From the awesome hack by Dean Edwards
    		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
    
    		// If we're not dealing with a regular pixel number
    		// but a number that has a weird ending, we need to convert it to pixels
    		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
    			// Remember the original values
    			left = style.left;
    
    			// Put in the new values to get a computed value out
    			if ( rsLeft ) {
    				elem.runtimeStyle.left = elem.currentStyle.left;
    			}
    			style.left = name === "fontSize" ? "1em" : (ret || 0);
    			ret = style.pixelLeft + "px";
    
    			// Revert the changed values
    			style.left = left;
    			if ( rsLeft ) {
    				elem.runtimeStyle.left = rsLeft;
    			}
    		}
    
    		return ret === "" ? "auto" : ret;
    	};
    }
    
    curCSS = getComputedStyle || currentStyle;
    
    function getWH( elem, name, extra ) {
    
    	// Start with offset property
    	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
    		which = name === "width" ? cssWidth : cssHeight;
    
    	if ( val > 0 ) {
    		if ( extra !== "border" ) {
    			jQuery.each( which, function() {
    				if ( !extra ) {
    					val -= parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
    				}
    				if ( extra === "margin" ) {
    					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
    				} else {
    					val -= parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
    				}
    			});
    		}
    
    		return val + "px";
    	}
    
    	// Fall back to computed then uncomputed css if necessary
    	val = curCSS( elem, name, name );
    	if ( val < 0 || val == null ) {
    		val = elem.style[ name ] || 0;
    	}
    	// Normalize "", auto, and prepare for extra
    	val = parseFloat( val ) || 0;
    
    	// Add padding, border, margin
    	if ( extra ) {
    		jQuery.each( which, function() {
    			val += parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
    			if ( extra !== "padding" ) {
    				val += parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
    			}
    			if ( extra === "margin" ) {
    				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
    			}
    		});
    	}
    
    	return val + "px";
    }
    
    if ( jQuery.expr && jQuery.expr.filters ) {
    	jQuery.expr.filters.hidden = function( elem ) {
    		var width = elem.offsetWidth,
    			height = elem.offsetHeight;
    
    		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
    	};
    
    	jQuery.expr.filters.visible = function( elem ) {
    		return !jQuery.expr.filters.hidden( elem );
    	};
    }
    
    
    
    
    var r20 = /%20/g,
    	rbracket = /\[\]$/,
    	rCRLF = /\r?\n/g,
    	rhash = /#.*$/,
    	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
    	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    	// #7653, #8125, #8152: local protocol detection
    	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
    	rnoContent = /^(?:GET|HEAD)$/,
    	rprotocol = /^\/\//,
    	rquery = /\?/,
    	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    	rselectTextarea = /^(?:select|textarea)/i,
    	rspacesAjax = /\s+/,
    	rts = /([?&])_=[^&]*/,
    	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
    
    	// Keep a copy of the old load method
    	_load = jQuery.fn.load,
    
    	/* Prefilters
    	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
    	 * 2) These are called:
    	 *    - BEFORE asking for a transport
    	 *    - AFTER param serialization (s.data is a string if s.processData is true)
    	 * 3) key is the dataType
    	 * 4) the catchall symbol "*" can be used
    	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
    	 */
    	prefilters = {},
    
    	/* Transports bindings
    	 * 1) key is the dataType
    	 * 2) the catchall symbol "*" can be used
    	 * 3) selection will start with transport dataType and THEN go to "*" if needed
    	 */
    	transports = {},
    
    	// Document location
    	ajaxLocation,
    
    	// Document location segments
    	ajaxLocParts;
    
    // #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
    	ajaxLocation = location.href;
    } catch( e ) {
    	// Use the href attribute of an A element
    	// since IE will modify it given document.location
    	ajaxLocation = document.createElement( "a" );
    	ajaxLocation.href = "";
    	ajaxLocation = ajaxLocation.href;
    }
    
    // Segment location into parts
    ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
    
    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {
    
    	// dataTypeExpression is optional and defaults to "*"
    	return function( dataTypeExpression, func ) {
    
    		if ( typeof dataTypeExpression !== "string" ) {
    			func = dataTypeExpression;
    			dataTypeExpression = "*";
    		}
    
    		if ( jQuery.isFunction( func ) ) {
    			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
    				i = 0,
    				length = dataTypes.length,
    				dataType,
    				list,
    				placeBefore;
    
    			// For each dataType in the dataTypeExpression
    			for(; i < length; i++ ) {
    				dataType = dataTypes[ i ];
    				// We control if we're asked to add before
    				// any existing element
    				placeBefore = /^\+/.test( dataType );
    				if ( placeBefore ) {
    					dataType = dataType.substr( 1 ) || "*";
    				}
    				list = structure[ dataType ] = structure[ dataType ] || [];
    				// then we add to the structure accordingly
    				list[ placeBefore ? "unshift" : "push" ]( func );
    			}
    		}
    	};
    }
    
    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
    		dataType /* internal */, inspected /* internal */ ) {
    
    	dataType = dataType || options.dataTypes[ 0 ];
    	inspected = inspected || {};
    
    	inspected[ dataType ] = true;
    
    	var list = structure[ dataType ],
    		i = 0,
    		length = list ? list.length : 0,
    		executeOnly = ( structure === prefilters ),
    		selection;
    
    	for(; i < length && ( executeOnly || !selection ); i++ ) {
    		selection = list[ i ]( options, originalOptions, jqXHR );
    		// If we got redirected to another dataType
    		// we try there if executing only and not done already
    		if ( typeof selection === "string" ) {
    			if ( !executeOnly || inspected[ selection ] ) {
    				selection = undefined;
    			} else {
    				options.dataTypes.unshift( selection );
    				selection = inspectPrefiltersOrTransports(
    						structure, options, originalOptions, jqXHR, selection, inspected );
    			}
    		}
    	}
    	// If we're only executing or nothing was selected
    	// we try the catchall dataType if not done already
    	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
    		selection = inspectPrefiltersOrTransports(
    				structure, options, originalOptions, jqXHR, "*", inspected );
    	}
    	// unnecessary when only executing (prefilters)
    	// but it'll be ignored by the caller in that case
    	return selection;
    }
    
    jQuery.fn.extend({
    	load: function( url, params, callback ) {
    		if ( typeof url !== "string" && _load ) {
    			return _load.apply( this, arguments );
    
    		// Don't do a request if no elements are being requested
    		} else if ( !this.length ) {
    			return this;
    		}
    
    		var off = url.indexOf( " " );
    		if ( off >= 0 ) {
    			var selector = url.slice( off, url.length );
    			url = url.slice( 0, off );
    		}
    
    		// Default to a GET request
    		var type = "GET";
    
    		// If the second parameter was provided
    		if ( params ) {
    			// If it's a function
    			if ( jQuery.isFunction( params ) ) {
    				// We assume that it's the callback
    				callback = params;
    				params = undefined;
    
    			// Otherwise, build a param string
    			} else if ( typeof params === "object" ) {
    				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
    				type = "POST";
    			}
    		}
    
    		var self = this;
    
    		// Request the remote document
    		jQuery.ajax({
    			url: url,
    			type: type,
    			dataType: "html",
    			data: params,
    			// Complete callback (responseText is used internally)
    			complete: function( jqXHR, status, responseText ) {
    				// Store the response as specified by the jqXHR object
    				responseText = jqXHR.responseText;
    				// If successful, inject the HTML into all the matched elements
    				if ( jqXHR.isResolved() ) {
    					// #4825: Get the actual response in case
    					// a dataFilter is present in ajaxSettings
    					jqXHR.done(function( r ) {
    						responseText = r;
    					});
    					// See if a selector was specified
    					self.html( selector ?
    						// Create a dummy div to hold the results
    						jQuery("<div>")
    							// inject the contents of the document in, removing the scripts
    							// to avoid any 'Permission Denied' errors in IE
    							.append(responseText.replace(rscript, ""))
    
    							// Locate the specified elements
    							.find(selector) :
    
    						// If not, just inject the full result
    						responseText );
    				}
    
    				if ( callback ) {
    					self.each( callback, [ responseText, status, jqXHR ] );
    				}
    			}
    		});
    
    		return this;
    	},
    
    	serialize: function() {
    		return jQuery.param( this.serializeArray() );
    	},
    
    	serializeArray: function() {
    		return this.map(function(){
    			return this.elements ? jQuery.makeArray( this.elements ) : this;
    		})
    		.filter(function(){
    			return this.name && !this.disabled &&
    				( this.checked || rselectTextarea.test( this.nodeName ) ||
    					rinput.test( this.type ) );
    		})
    		.map(function( i, elem ){
    			var val = jQuery( this ).val();
    
    			return val == null ?
    				null :
    				jQuery.isArray( val ) ?
    					jQuery.map( val, function( val, i ){
    						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    					}) :
    					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    		}).get();
    	}
    });
    
    // Attach a bunch of functions for handling common AJAX events
    jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
    	jQuery.fn[ o ] = function( f ){
    		return this.bind( o, f );
    	};
    });
    
    jQuery.each( [ "get", "post" ], function( i, method ) {
    	jQuery[ method ] = function( url, data, callback, type ) {
    		// shift arguments if data argument was omitted
    		if ( jQuery.isFunction( data ) ) {
    			type = type || callback;
    			callback = data;
    			data = undefined;
    		}
    
    		return jQuery.ajax({
    			type: method,
    			url: url,
    			data: data,
    			success: callback,
    			dataType: type
    		});
    	};
    });
    
    jQuery.extend({
    
    	getScript: function( url, callback ) {
    		return jQuery.get( url, undefined, callback, "script" );
    	},
    
    	getJSON: function( url, data, callback ) {
    		return jQuery.get( url, data, callback, "json" );
    	},
    
    	// Creates a full fledged settings object into target
    	// with both ajaxSettings and settings fields.
    	// If target is omitted, writes into ajaxSettings.
    	ajaxSetup: function ( target, settings ) {
    		if ( !settings ) {
    			// Only one parameter, we extend ajaxSettings
    			settings = target;
    			target = jQuery.extend( true, jQuery.ajaxSettings, settings );
    		} else {
    			// target was provided, we extend into it
    			jQuery.extend( true, target, jQuery.ajaxSettings, settings );
    		}
    		// Flatten fields we don't want deep extended
    		for( var field in { context: 1, url: 1 } ) {
    			if ( field in settings ) {
    				target[ field ] = settings[ field ];
    			} else if( field in jQuery.ajaxSettings ) {
    				target[ field ] = jQuery.ajaxSettings[ field ];
    			}
    		}
    		return target;
    	},
    
    	ajaxSettings: {
    		url: ajaxLocation,
    		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
    		global: true,
    		type: "GET",
    		contentType: "application/x-www-form-urlencoded",
    		processData: true,
    		async: true,
    		/*
    		timeout: 0,
    		data: null,
    		dataType: null,
    		username: null,
    		password: null,
    		cache: null,
    		traditional: false,
    		headers: {},
    		*/
    
    		accepts: {
    			xml: "application/xml, text/xml",
    			html: "text/html",
    			text: "text/plain",
    			json: "application/json, text/javascript",
    			"*": "*/*"
    		},
    
    		contents: {
    			xml: /xml/,
    			html: /html/,
    			json: /json/
    		},
    
    		responseFields: {
    			xml: "responseXML",
    			text: "responseText"
    		},
    
    		// List of data converters
    		// 1) key format is "source_type destination_type" (a single space in-between)
    		// 2) the catchall symbol "*" can be used for source_type
    		converters: {
    
    			// Convert anything to text
    			"* text": window.String,
    
    			// Text to html (true = no transformation)
    			"text html": true,
    
    			// Evaluate text as a json expression
    			"text json": jQuery.parseJSON,
    
    			// Parse text as xml
    			"text xml": jQuery.parseXML
    		}
    	},
    
    	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
    	ajaxTransport: addToPrefiltersOrTransports( transports ),
    
    	// Main method
    	ajax: function( url, options ) {
    
    		// If url is an object, simulate pre-1.5 signature
    		if ( typeof url === "object" ) {
    			options = url;
    			url = undefined;
    		}
    
    		// Force options to be an object
    		options = options || {};
    
    		var // Create the final options object
    			s = jQuery.ajaxSetup( {}, options ),
    			// Callbacks context
    			callbackContext = s.context || s,
    			// Context for global events
    			// It's the callbackContext if one was provided in the options
    			// and if it's a DOM node or a jQuery collection
    			globalEventContext = callbackContext !== s &&
    				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
    						jQuery( callbackContext ) : jQuery.event,
    			// Deferreds
    			deferred = jQuery.Deferred(),
    			completeDeferred = jQuery._Deferred(),
    			// Status-dependent callbacks
    			statusCode = s.statusCode || {},
    			// ifModified key
    			ifModifiedKey,
    			// Headers (they are sent all at once)
    			requestHeaders = {},
    			requestHeadersNames = {},
    			// Response headers
    			responseHeadersString,
    			responseHeaders,
    			// transport
    			transport,
    			// timeout handle
    			timeoutTimer,
    			// Cross-domain detection vars
    			parts,
    			// The jqXHR state
    			state = 0,
    			// To know if global events are to be dispatched
    			fireGlobals,
    			// Loop variable
    			i,
    			// Fake xhr
    			jqXHR = {
    
    				readyState: 0,
    
    				// Caches the header
    				setRequestHeader: function( name, value ) {
    					if ( !state ) {
    						var lname = name.toLowerCase();
    						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
    						requestHeaders[ name ] = value;
    					}
    					return this;
    				},
    
    				// Raw string
    				getAllResponseHeaders: function() {
    					return state === 2 ? responseHeadersString : null;
    				},
    
    				// Builds headers hashtable if needed
    				getResponseHeader: function( key ) {
    					var match;
    					if ( state === 2 ) {
    						if ( !responseHeaders ) {
    							responseHeaders = {};
    							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
    								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
    							}
    						}
    						match = responseHeaders[ key.toLowerCase() ];
    					}
    					return match === undefined ? null : match;
    				},
    
    				// Overrides response content-type header
    				overrideMimeType: function( type ) {
    					if ( !state ) {
    						s.mimeType = type;
    					}
    					return this;
    				},
    
    				// Cancel the request
    				abort: function( statusText ) {
    					statusText = statusText || "abort";
    					if ( transport ) {
    						transport.abort( statusText );
    					}
    					done( 0, statusText );
    					return this;
    				}
    			};
    
    		// Callback for when everything is done
    		// It is defined here because jslint complains if it is declared
    		// at the end of the function (which would be more logical and readable)
    		function done( status, statusText, responses, headers ) {
    
    			// Called once
    			if ( state === 2 ) {
    				return;
    			}
    
    			// State is "done" now
    			state = 2;
    
    			// Clear timeout if it exists
    			if ( timeoutTimer ) {
    				clearTimeout( timeoutTimer );
    			}
    
    			// Dereference transport for early garbage collection
    			// (no matter how long the jqXHR object will be used)
    			transport = undefined;
    
    			// Cache response headers
    			responseHeadersString = headers || "";
    
    			// Set readyState
    			jqXHR.readyState = status ? 4 : 0;
    
    			var isSuccess,
    				success,
    				error,
    				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
    				lastModified,
    				etag;
    
    			// If successful, handle type chaining
    			if ( status >= 200 && status < 300 || status === 304 ) {
    
    				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    				if ( s.ifModified ) {
    
    					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
    						jQuery.lastModified[ ifModifiedKey ] = lastModified;
    					}
    					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
    						jQuery.etag[ ifModifiedKey ] = etag;
    					}
    				}
    
    				// If not modified
    				if ( status === 304 ) {
    
    					statusText = "notmodified";
    					isSuccess = true;
    
    				// If we have data
    				} else {
    
    					try {
    						success = ajaxConvert( s, response );
    						statusText = "success";
    						isSuccess = true;
    					} catch(e) {
    						// We have a parsererror
    						statusText = "parsererror";
    						error = e;
    					}
    				}
    			} else {
    				// We extract error from statusText
    				// then normalize statusText and status for non-aborts
    				error = statusText;
    				if( !statusText || status ) {
    					statusText = "error";
    					if ( status < 0 ) {
    						status = 0;
    					}
    				}
    			}
    
    			// Set data for the fake xhr object
    			jqXHR.status = status;
    			jqXHR.statusText = statusText;
    
    			// Success/Error
    			if ( isSuccess ) {
    				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
    			} else {
    				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
    			}
    
    			// Status-dependent callbacks
    			jqXHR.statusCode( statusCode );
    			statusCode = undefined;
    
    			if ( fireGlobals ) {
    				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
    						[ jqXHR, s, isSuccess ? success : error ] );
    			}
    
    			// Complete
    			completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );
    
    			if ( fireGlobals ) {
    				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s] );
    				// Handle the global AJAX counter
    				if ( !( --jQuery.active ) ) {
    					jQuery.event.trigger( "ajaxStop" );
    				}
    			}
    		}
    
    		// Attach deferreds
    		deferred.promise( jqXHR );
    		jqXHR.success = jqXHR.done;
    		jqXHR.error = jqXHR.fail;
    		jqXHR.complete = completeDeferred.done;
    
    		// Status-dependent callbacks
    		jqXHR.statusCode = function( map ) {
    			if ( map ) {
    				var tmp;
    				if ( state < 2 ) {
    					for( tmp in map ) {
    						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
    					}
    				} else {
    					tmp = map[ jqXHR.status ];
    					jqXHR.then( tmp, tmp );
    				}
    			}
    			return this;
    		};
    
    		// Remove hash character (#7531: and string promotion)
    		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
    		// We also use the url parameter if available
    		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
    
    		// Extract dataTypes list
    		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );
    
    		// Determine if a cross-domain request is in order
    		if ( s.crossDomain == null ) {
    			parts = rurl.exec( s.url.toLowerCase() );
    			s.crossDomain = !!( parts &&
    				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
    					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
    						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
    			);
    		}
    
    		// Convert data if not already a string
    		if ( s.data && s.processData && typeof s.data !== "string" ) {
    			s.data = jQuery.param( s.data, s.traditional );
    		}
    
    		// Apply prefilters
    		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
    
    		// If request was aborted inside a prefiler, stop there
    		if ( state === 2 ) {
    			return false;
    		}
    
    		// We can fire global events as of now if asked to
    		fireGlobals = s.global;
    
    		// Uppercase the type
    		s.type = s.type.toUpperCase();
    
    		// Determine if request has content
    		s.hasContent = !rnoContent.test( s.type );
    
    		// Watch for a new set of requests
    		if ( fireGlobals && jQuery.active++ === 0 ) {
    			jQuery.event.trigger( "ajaxStart" );
    		}
    
    		// More options handling for requests with no content
    		if ( !s.hasContent ) {
    
    			// If data is available, append data to url
    			if ( s.data ) {
    				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
    			}
    
    			// Get ifModifiedKey before adding the anti-cache parameter
    			ifModifiedKey = s.url;
    
    			// Add anti-cache in url if needed
    			if ( s.cache === false ) {
    
    				var ts = jQuery.now(),
    					// try replacing _= if it is there
    					ret = s.url.replace( rts, "$1_=" + ts );
    
    				// if nothing was replaced, add timestamp to the end
    				s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
    			}
    		}
    
    		// Set the correct header, if data is being sent
    		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
    			jqXHR.setRequestHeader( "Content-Type", s.contentType );
    		}
    
    		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    		if ( s.ifModified ) {
    			ifModifiedKey = ifModifiedKey || s.url;
    			if ( jQuery.lastModified[ ifModifiedKey ] ) {
    				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
    			}
    			if ( jQuery.etag[ ifModifiedKey ] ) {
    				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
    			}
    		}
    
    		// Set the Accepts header for the server, depending on the dataType
    		jqXHR.setRequestHeader(
    			"Accept",
    			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
    				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
    				s.accepts[ "*" ]
    		);
    
    		// Check for headers option
    		for ( i in s.headers ) {
    			jqXHR.setRequestHeader( i, s.headers[ i ] );
    		}
    
    		// Allow custom headers/mimetypes and early abort
    		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
    				// Abort if not done already
    				jqXHR.abort();
    				return false;
    
    		}
    
    		// Install callbacks on deferreds
    		for ( i in { success: 1, error: 1, complete: 1 } ) {
    			jqXHR[ i ]( s[ i ] );
    		}
    
    		// Get transport
    		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
    
    		// If no transport, we auto-abort
    		if ( !transport ) {
    			done( -1, "No Transport" );
    		} else {
    			jqXHR.readyState = 1;
    			// Send global event
    			if ( fireGlobals ) {
    				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
    			}
    			// Timeout
    			if ( s.async && s.timeout > 0 ) {
    				timeoutTimer = setTimeout( function(){
    					jqXHR.abort( "timeout" );
    				}, s.timeout );
    			}
    
    			try {
    				state = 1;
    				transport.send( requestHeaders, done );
    			} catch (e) {
    				// Propagate exception as error if not done
    				if ( status < 2 ) {
    					done( -1, e );
    				// Simply rethrow otherwise
    				} else {
    					jQuery.error( e );
    				}
    			}
    		}
    
    		return jqXHR;
    	},
    
    	// Serialize an array of form elements or a set of
    	// key/values into a query string
    	param: function( a, traditional ) {
    		var s = [],
    			add = function( key, value ) {
    				// If value is a function, invoke it and return its value
    				value = jQuery.isFunction( value ) ? value() : value;
    				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    			};
    
    		// Set traditional to true for jQuery <= 1.3.2 behavior.
    		if ( traditional === undefined ) {
    			traditional = jQuery.ajaxSettings.traditional;
    		}
    
    		// If an array was passed in, assume that it is an array of form elements.
    		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
    			// Serialize the form elements
    			jQuery.each( a, function() {
    				add( this.name, this.value );
    			});
    
    		} else {
    			// If traditional, encode the "old" way (the way 1.3.2 or older
    			// did it), otherwise encode params recursively.
    			for ( var prefix in a ) {
    				buildParams( prefix, a[ prefix ], traditional, add );
    			}
    		}
    
    		// Return the resulting serialization
    		return s.join( "&" ).replace( r20, "+" );
    	}
    });
    
    function buildParams( prefix, obj, traditional, add ) {
    	if ( jQuery.isArray( obj ) ) {
    		// Serialize array item.
    		jQuery.each( obj, function( i, v ) {
    			if ( traditional || rbracket.test( prefix ) ) {
    				// Treat each array item as a scalar.
    				add( prefix, v );
    
    			} else {
    				// If array item is non-scalar (array or object), encode its
    				// numeric index to resolve deserialization ambiguity issues.
    				// Note that rack (as of 1.0.0) can't currently deserialize
    				// nested arrays properly, and attempting to do so may cause
    				// a server error. Possible fixes are to modify rack's
    				// deserialization algorithm or to provide an option or flag
    				// to force array serialization to be shallow.
    				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
    			}
    		});
    
    	} else if ( !traditional && obj != null && typeof obj === "object" ) {
    		// Serialize object item.
    		for ( var name in obj ) {
    			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    		}
    
    	} else {
    		// Serialize scalar item.
    		add( prefix, obj );
    	}
    }
    
    // This is still on the jQuery object... for now
    // Want to move this to jQuery.ajax some day
    jQuery.extend({
    
    	// Counter for holding the number of active queries
    	active: 0,
    
    	// Last-Modified header cache for next request
    	lastModified: {},
    	etag: {}
    
    });
    
    /* Handles responses to an ajax request:
     * - sets all responseXXX fields accordingly
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {
    
    	var contents = s.contents,
    		dataTypes = s.dataTypes,
    		responseFields = s.responseFields,
    		ct,
    		type,
    		finalDataType,
    		firstDataType;
    
    	// Fill responseXXX fields
    	for( type in responseFields ) {
    		if ( type in responses ) {
    			jqXHR[ responseFields[type] ] = responses[ type ];
    		}
    	}
    
    	// Remove auto dataType and get content-type in the process
    	while( dataTypes[ 0 ] === "*" ) {
    		dataTypes.shift();
    		if ( ct === undefined ) {
    			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
    		}
    	}
    
    	// Check if we're dealing with a known content-type
    	if ( ct ) {
    		for ( type in contents ) {
    			if ( contents[ type ] && contents[ type ].test( ct ) ) {
    				dataTypes.unshift( type );
    				break;
    			}
    		}
    	}
    
    	// Check to see if we have a response for the expected dataType
    	if ( dataTypes[ 0 ] in responses ) {
    		finalDataType = dataTypes[ 0 ];
    	} else {
    		// Try convertible dataTypes
    		for ( type in responses ) {
    			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
    				finalDataType = type;
    				break;
    			}
    			if ( !firstDataType ) {
    				firstDataType = type;
    			}
    		}
    		// Or just use first one
    		finalDataType = finalDataType || firstDataType;
    	}
    
    	// If we found a dataType
    	// We add the dataType to the list if needed
    	// and return the corresponding response
    	if ( finalDataType ) {
    		if ( finalDataType !== dataTypes[ 0 ] ) {
    			dataTypes.unshift( finalDataType );
    		}
    		return responses[ finalDataType ];
    	}
    }
    
    // Chain conversions given the request and the original response
    function ajaxConvert( s, response ) {
    
    	// Apply the dataFilter if provided
    	if ( s.dataFilter ) {
    		response = s.dataFilter( response, s.dataType );
    	}
    
    	var dataTypes = s.dataTypes,
    		converters = {},
    		i,
    		key,
    		length = dataTypes.length,
    		tmp,
    		// Current and previous dataTypes
    		current = dataTypes[ 0 ],
    		prev,
    		// Conversion expression
    		conversion,
    		// Conversion function
    		conv,
    		// Conversion functions (transitive conversion)
    		conv1,
    		conv2;
    
    	// For each dataType in the chain
    	for( i = 1; i < length; i++ ) {
    
    		// Create converters map
    		// with lowercased keys
    		if ( i === 1 ) {
    			for( key in s.converters ) {
    				if( typeof key === "string" ) {
    					converters[ key.toLowerCase() ] = s.converters[ key ];
    				}
    			}
    		}
    
    		// Get the dataTypes
    		prev = current;
    		current = dataTypes[ i ];
    
    		// If current is auto dataType, update it to prev
    		if( current === "*" ) {
    			current = prev;
    		// If no auto and dataTypes are actually different
    		} else if ( prev !== "*" && prev !== current ) {
    
    			// Get the converter
    			conversion = prev + " " + current;
    			conv = converters[ conversion ] || converters[ "* " + current ];
    
    			// If there is no direct converter, search transitively
    			if ( !conv ) {
    				conv2 = undefined;
    				for( conv1 in converters ) {
    					tmp = conv1.split( " " );
    					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
    						conv2 = converters[ tmp[1] + " " + current ];
    						if ( conv2 ) {
    							conv1 = converters[ conv1 ];
    							if ( conv1 === true ) {
    								conv = conv2;
    							} else if ( conv2 === true ) {
    								conv = conv1;
    							}
    							break;
    						}
    					}
    				}
    			}
    			// If we found no converter, dispatch an error
    			if ( !( conv || conv2 ) ) {
    				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
    			}
    			// If found converter is not an equivalence
    			if ( conv !== true ) {
    				// Convert with 1 or 2 converters accordingly
    				response = conv ? conv( response ) : conv2( conv1(response) );
    			}
    		}
    	}
    	return response;
    }
    
    
    
    
    var jsc = jQuery.now(),
    	jsre = /(\=)\?(&|$)|\?\?/i;
    
    // Default jsonp settings
    jQuery.ajaxSetup({
    	jsonp: "callback",
    	jsonpCallback: function() {
    		return jQuery.expando + "_" + ( jsc++ );
    	}
    });
    
    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
    
    	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
    		( typeof s.data === "string" );
    
    	if ( s.dataTypes[ 0 ] === "jsonp" ||
    		s.jsonp !== false && ( jsre.test( s.url ) ||
    				inspectData && jsre.test( s.data ) ) ) {
    
    		var responseContainer,
    			jsonpCallback = s.jsonpCallback =
    				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
    			previous = window[ jsonpCallback ],
    			url = s.url,
    			data = s.data,
    			replace = "$1" + jsonpCallback + "$2";
    
    		if ( s.jsonp !== false ) {
    			url = url.replace( jsre, replace );
    			if ( s.url === url ) {
    				if ( inspectData ) {
    					data = data.replace( jsre, replace );
    				}
    				if ( s.data === data ) {
    					// Add callback manually
    					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
    				}
    			}
    		}
    
    		s.url = url;
    		s.data = data;
    
    		// Install callback
    		window[ jsonpCallback ] = function( response ) {
    			responseContainer = [ response ];
    		};
    
    		// Clean-up function
    		jqXHR.always(function() {
    			// Set callback back to previous value
    			window[ jsonpCallback ] = previous;
    			// Call if it was a function and we have a response
    			if ( responseContainer && jQuery.isFunction( previous ) ) {
    				window[ jsonpCallback ]( responseContainer[ 0 ] );
    			}
    		});
    
    		// Use data converter to retrieve json after script execution
    		s.converters["script json"] = function() {
    			if ( !responseContainer ) {
    				jQuery.error( jsonpCallback + " was not called" );
    			}
    			return responseContainer[ 0 ];
    		};
    
    		// force json dataType
    		s.dataTypes[ 0 ] = "json";
    
    		// Delegate to script
    		return "script";
    	}
    });
    
    
    
    
    // Install script dataType
    jQuery.ajaxSetup({
    	accepts: {
    		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    	},
    	contents: {
    		script: /javascript|ecmascript/
    	},
    	converters: {
    		"text script": function( text ) {
    			jQuery.globalEval( text );
    			return text;
    		}
    	}
    });
    
    // Handle cache's special case and global
    jQuery.ajaxPrefilter( "script", function( s ) {
    	if ( s.cache === undefined ) {
    		s.cache = false;
    	}
    	if ( s.crossDomain ) {
    		s.type = "GET";
    		s.global = false;
    	}
    });
    
    // Bind script tag hack transport
    jQuery.ajaxTransport( "script", function(s) {
    
    	// This transport only deals with cross domain requests
    	if ( s.crossDomain ) {
    
    		var script,
    			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;
    
    		return {
    
    			send: function( _, callback ) {
    
    				script = document.createElement( "script" );
    
    				script.async = "async";
    
    				if ( s.scriptCharset ) {
    					script.charset = s.scriptCharset;
    				}
    
    				script.src = s.url;
    
    				// Attach handlers for all browsers
    				script.onload = script.onreadystatechange = function( _, isAbort ) {
    
    					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {
    
    						// Handle memory leak in IE
    						script.onload = script.onreadystatechange = null;
    
    						// Remove the script
    						if ( head && script.parentNode ) {
    							head.removeChild( script );
    						}
    
    						// Dereference the script
    						script = undefined;
    
    						// Callback if not abort
    						if ( !isAbort ) {
    							callback( 200, "success" );
    						}
    					}
    				};
    				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    				// This arises when a base node is used (#2709 and #4378).
    				head.insertBefore( script, head.firstChild );
    			},
    
    			abort: function() {
    				if ( script ) {
    					script.onload( 0, 1 );
    				}
    			}
    		};
    	}
    });
    
    
    
    
    var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
    	xhrOnUnloadAbort = window.ActiveXObject ? function() {
    		// Abort all pending requests
    		for ( var key in xhrCallbacks ) {
    			xhrCallbacks[ key ]( 0, 1 );
    		}
    	} : false,
    	xhrId = 0,
    	xhrCallbacks;
    
    // Functions to create xhrs
    function createStandardXHR() {
    	try {
    		return new window.XMLHttpRequest();
    	} catch( e ) {}
    }
    
    function createActiveXHR() {
    	try {
    		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
    	} catch( e ) {}
    }
    
    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject ?
    	/* Microsoft failed to properly
    	 * implement the XMLHttpRequest in IE7 (can't request local files),
    	 * so we use the ActiveXObject when it is available
    	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
    	 * we need a fallback.
    	 */
    	function() {
    		return !this.isLocal && createStandardXHR() || createActiveXHR();
    	} :
    	// For all other browsers, use the standard XMLHttpRequest object
    	createStandardXHR;
    
    // Determine support properties
    (function( xhr ) {
    	jQuery.extend( jQuery.support, {
    		ajax: !!xhr,
    		cors: !!xhr && ( "withCredentials" in xhr )
    	});
    })( jQuery.ajaxSettings.xhr() );
    
    // Create transport if the browser can provide an xhr
    if ( jQuery.support.ajax ) {
    
    	jQuery.ajaxTransport(function( s ) {
    		// Cross domain only allowed if supported through XMLHttpRequest
    		if ( !s.crossDomain || jQuery.support.cors ) {
    
    			var callback;
    
    			return {
    				send: function( headers, complete ) {
    
    					// Get a new xhr
    					var xhr = s.xhr(),
    						handle,
    						i;
    
    					// Open the socket
    					// Passing null username, generates a login popup on Opera (#2865)
    					if ( s.username ) {
    						xhr.open( s.type, s.url, s.async, s.username, s.password );
    					} else {
    						xhr.open( s.type, s.url, s.async );
    					}
    
    					// Apply custom fields if provided
    					if ( s.xhrFields ) {
    						for ( i in s.xhrFields ) {
    							xhr[ i ] = s.xhrFields[ i ];
    						}
    					}
    
    					// Override mime type if needed
    					if ( s.mimeType && xhr.overrideMimeType ) {
    						xhr.overrideMimeType( s.mimeType );
    					}
    
    					// X-Requested-With header
    					// For cross-domain requests, seeing as conditions for a preflight are
    					// akin to a jigsaw puzzle, we simply never set it to be sure.
    					// (it can always be set on a per-request basis or even using ajaxSetup)
    					// For same-domain requests, won't change header if already provided.
    					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
    						headers[ "X-Requested-With" ] = "XMLHttpRequest";
    					}
    
    					// Need an extra try/catch for cross domain requests in Firefox 3
    					try {
    						for ( i in headers ) {
    							xhr.setRequestHeader( i, headers[ i ] );
    						}
    					} catch( _ ) {}
    
    					// Do send the request
    					// This may raise an exception which is actually
    					// handled in jQuery.ajax (so no try/catch here)
    					xhr.send( ( s.hasContent && s.data ) || null );
    
    					// Listener
    					callback = function( _, isAbort ) {
    
    						var status,
    							statusText,
    							responseHeaders,
    							responses,
    							xml;
    
    						// Firefox throws exceptions when accessing properties
    						// of an xhr when a network error occured
    						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
    						try {
    
    							// Was never called and is aborted or complete
    							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
    
    								// Only called once
    								callback = undefined;
    
    								// Do not keep as active anymore
    								if ( handle ) {
    									xhr.onreadystatechange = jQuery.noop;
    									if ( xhrOnUnloadAbort ) {
    										delete xhrCallbacks[ handle ];
    									}
    								}
    
    								// If it's an abort
    								if ( isAbort ) {
    									// Abort it manually if needed
    									if ( xhr.readyState !== 4 ) {
    										xhr.abort();
    									}
    								} else {
    									status = xhr.status;
    									responseHeaders = xhr.getAllResponseHeaders();
    									responses = {};
    									xml = xhr.responseXML;
    
    									// Construct response list
    									if ( xml && xml.documentElement /* #4958 */ ) {
    										responses.xml = xml;
    									}
    									responses.text = xhr.responseText;
    
    									// Firefox throws an exception when accessing
    									// statusText for faulty cross-domain requests
    									try {
    										statusText = xhr.statusText;
    									} catch( e ) {
    										// We normalize with Webkit giving an empty statusText
    										statusText = "";
    									}
    
    									// Filter status for non standard behaviors
    
    									// If the request is local and we have data: assume a success
    									// (success with no data won't get notified, that's the best we
    									// can do given current implementations)
    									if ( !status && s.isLocal && !s.crossDomain ) {
    										status = responses.text ? 200 : 404;
    									// IE - #1450: sometimes returns 1223 when it should be 204
    									} else if ( status === 1223 ) {
    										status = 204;
    									}
    								}
    							}
    						} catch( firefoxAccessException ) {
    							if ( !isAbort ) {
    								complete( -1, firefoxAccessException );
    							}
    						}
    
    						// Call complete if needed
    						if ( responses ) {
    							complete( status, statusText, responses, responseHeaders );
    						}
    					};
    
    					// if we're in sync mode or it's in cache
    					// and has been retrieved directly (IE6 & IE7)
    					// we need to manually fire the callback
    					if ( !s.async || xhr.readyState === 4 ) {
    						callback();
    					} else {
    						handle = ++xhrId;
    						if ( xhrOnUnloadAbort ) {
    							// Create the active xhrs callbacks list if needed
    							// and attach the unload handler
    							if ( !xhrCallbacks ) {
    								xhrCallbacks = {};
    								jQuery( window ).unload( xhrOnUnloadAbort );
    							}
    							// Add to list of active xhrs callbacks
    							xhrCallbacks[ handle ] = callback;
    						}
    						xhr.onreadystatechange = callback;
    					}
    				},
    
    				abort: function() {
    					if ( callback ) {
    						callback(0,1);
    					}
    				}
    			};
    		}
    	});
    }
    
    
    
    
    var elemdisplay = {},
    	iframe, iframeDoc,
    	rfxtypes = /^(?:toggle|show|hide)$/,
    	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
    	timerId,
    	fxAttrs = [
    		// height animations
    		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
    		// width animations
    		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
    		// opacity animations
    		[ "opacity" ]
    	],
    	fxNow,
    	requestAnimationFrame = window.webkitRequestAnimationFrame ||
    		window.mozRequestAnimationFrame ||
    		window.oRequestAnimationFrame;
    
    jQuery.fn.extend({
    	show: function( speed, easing, callback ) {
    		var elem, display;
    
    		if ( speed || speed === 0 ) {
    			return this.animate( genFx("show", 3), speed, easing, callback);
    
    		} else {
    			for ( var i = 0, j = this.length; i < j; i++ ) {
    				elem = this[i];
    
    				if ( elem.style ) {
    					display = elem.style.display;
    
    					// Reset the inline display of this element to learn if it is
    					// being hidden by cascaded rules or not
    					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
    						display = elem.style.display = "";
    					}
    
    					// Set elements which have been overridden with display: none
    					// in a stylesheet to whatever the default browser style is
    					// for such an element
    					if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
    						jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
    					}
    				}
    			}
    
    			// Set the display of most of the elements in a second loop
    			// to avoid the constant reflow
    			for ( i = 0; i < j; i++ ) {
    				elem = this[i];
    
    				if ( elem.style ) {
    					display = elem.style.display;
    
    					if ( display === "" || display === "none" ) {
    						elem.style.display = jQuery._data(elem, "olddisplay") || "";
    					}
    				}
    			}
    
    			return this;
    		}
    	},
    
    	hide: function( speed, easing, callback ) {
    		if ( speed || speed === 0 ) {
    			return this.animate( genFx("hide", 3), speed, easing, callback);
    
    		} else {
    			for ( var i = 0, j = this.length; i < j; i++ ) {
    				if ( this[i].style ) {
    					var display = jQuery.css( this[i], "display" );
    
    					if ( display !== "none" && !jQuery._data( this[i], "olddisplay" ) ) {
    						jQuery._data( this[i], "olddisplay", display );
    					}
    				}
    			}
    
    			// Set the display of the elements in a second loop
    			// to avoid the constant reflow
    			for ( i = 0; i < j; i++ ) {
    				if ( this[i].style ) {
    					this[i].style.display = "none";
    				}
    			}
    
    			return this;
    		}
    	},
    
    	// Save the old toggle function
    	_toggle: jQuery.fn.toggle,
    
    	toggle: function( fn, fn2, callback ) {
    		var bool = typeof fn === "boolean";
    
    		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
    			this._toggle.apply( this, arguments );
    
    		} else if ( fn == null || bool ) {
    			this.each(function() {
    				var state = bool ? fn : jQuery(this).is(":hidden");
    				jQuery(this)[ state ? "show" : "hide" ]();
    			});
    
    		} else {
    			this.animate(genFx("toggle", 3), fn, fn2, callback);
    		}
    
    		return this;
    	},
    
    	fadeTo: function( speed, to, easing, callback ) {
    		return this.filter(":hidden").css("opacity", 0).show().end()
    					.animate({opacity: to}, speed, easing, callback);
    	},
    
    	animate: function( prop, speed, easing, callback ) {
    		var optall = jQuery.speed(speed, easing, callback);
    
    		if ( jQuery.isEmptyObject( prop ) ) {
    			return this.each( optall.complete, [ false ] );
    		}
    
    		// Do not change referenced properties as per-property easing will be lost
    		prop = jQuery.extend( {}, prop );
    
    		return this[ optall.queue === false ? "each" : "queue" ](function() {
    			// XXX 'this' does not always have a nodeName when running the
    			// test suite
    
    			if ( optall.queue === false ) {
    				jQuery._mark( this );
    			}
    
    			var opt = jQuery.extend( {}, optall ),
    				isElement = this.nodeType === 1,
    				hidden = isElement && jQuery(this).is(":hidden"),
    				name, val, p,
    				display, e,
    				parts, start, end, unit;
    
    			// will store per property easing and be used to determine when an animation is complete
    			opt.animatedProperties = {};
    
    			for ( p in prop ) {
    
    				// property name normalization
    				name = jQuery.camelCase( p );
    				if ( p !== name ) {
    					prop[ name ] = prop[ p ];
    					delete prop[ p ];
    				}
    
    				val = prop[ name ];
    
    				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
    				if ( jQuery.isArray( val ) ) {
    					opt.animatedProperties[ name ] = val[ 1 ];
    					val = prop[ name ] = val[ 0 ];
    				} else {
    					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
    				}
    
    				if ( val === "hide" && hidden || val === "show" && !hidden ) {
    					return opt.complete.call( this );
    				}
    
    				if ( isElement && ( name === "height" || name === "width" ) ) {
    					// Make sure that nothing sneaks out
    					// Record all 3 overflow attributes because IE does not
    					// change the overflow attribute when overflowX and
    					// overflowY are set to the same value
    					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];
    
    					// Set display property to inline-block for height/width
    					// animations on inline elements that are having width/height
    					// animated
    					if ( jQuery.css( this, "display" ) === "inline" &&
    							jQuery.css( this, "float" ) === "none" ) {
    						if ( !jQuery.support.inlineBlockNeedsLayout ) {
    							this.style.display = "inline-block";
    
    						} else {
    							display = defaultDisplay( this.nodeName );
    
    							// inline-level elements accept inline-block;
    							// block-level elements need to be inline with layout
    							if ( display === "inline" ) {
    								this.style.display = "inline-block";
    
    							} else {
    								this.style.display = "inline";
    								this.style.zoom = 1;
    							}
    						}
    					}
    				}
    			}
    
    			if ( opt.overflow != null ) {
    				this.style.overflow = "hidden";
    			}
    
    			for ( p in prop ) {
    				e = new jQuery.fx( this, opt, p );
    				val = prop[ p ];
    
    				if ( rfxtypes.test(val) ) {
    					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]();
    
    				} else {
    					parts = rfxnum.exec( val );
    					start = e.cur();
    
    					if ( parts ) {
    						end = parseFloat( parts[2] );
    						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );
    
    						// We need to compute starting value
    						if ( unit !== "px" ) {
    							jQuery.style( this, p, (end || 1) + unit);
    							start = ((end || 1) / e.cur()) * start;
    							jQuery.style( this, p, start + unit);
    						}
    
    						// If a +=/-= token was provided, we're doing a relative animation
    						if ( parts[1] ) {
    							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
    						}
    
    						e.custom( start, end, unit );
    
    					} else {
    						e.custom( start, val, "" );
    					}
    				}
    			}
    
    			// For JS strict compliance
    			return true;
    		});
    	},
    
    	stop: function( clearQueue, gotoEnd ) {
    		if ( clearQueue ) {
    			this.queue([]);
    		}
    
    		this.each(function() {
    			var timers = jQuery.timers,
    				i = timers.length;
    			// clear marker counters if we know they won't be
    			if ( !gotoEnd ) {
    				jQuery._unmark( true, this );
    			}
    			while ( i-- ) {
    				if ( timers[i].elem === this ) {
    					if (gotoEnd) {
    						// force the next step to be the last
    						timers[i](true);
    					}
    
    					timers.splice(i, 1);
    				}
    			}
    		});
    
    		// start the next in the queue if the last step wasn't forced
    		if ( !gotoEnd ) {
    			this.dequeue();
    		}
    
    		return this;
    	}
    
    });
    
    // Animations created synchronously will run synchronously
    function createFxNow() {
    	setTimeout( clearFxNow, 0 );
    	return ( fxNow = jQuery.now() );
    }
    
    function clearFxNow() {
    	fxNow = undefined;
    }
    
    // Generate parameters to create a standard animation
    function genFx( type, num ) {
    	var obj = {};
    
    	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
    		obj[ this ] = type;
    	});
    
    	return obj;
    }
    
    // Generate shortcuts for custom animations
    jQuery.each({
    	slideDown: genFx("show", 1),
    	slideUp: genFx("hide", 1),
    	slideToggle: genFx("toggle", 1),
    	fadeIn: { opacity: "show" },
    	fadeOut: { opacity: "hide" },
    	fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
    	jQuery.fn[ name ] = function( speed, easing, callback ) {
    		return this.animate( props, speed, easing, callback );
    	};
    });
    
    jQuery.extend({
    	speed: function( speed, easing, fn ) {
    		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
    			complete: fn || !fn && easing ||
    				jQuery.isFunction( speed ) && speed,
    			duration: speed,
    			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    		};
    
    		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
    			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    
    		// Queueing
    		opt.old = opt.complete;
    		opt.complete = function( noUnmark ) {
    			if ( jQuery.isFunction( opt.old ) ) {
    				opt.old.call( this );
    			}
    
    			if ( opt.queue !== false ) {
    				jQuery.dequeue( this );
    			} else if ( noUnmark !== false ) {
    				jQuery._unmark( this );
    			}
    		};
    
    		return opt;
    	},
    
    	easing: {
    		linear: function( p, n, firstNum, diff ) {
    			return firstNum + diff * p;
    		},
    		swing: function( p, n, firstNum, diff ) {
    			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
    		}
    	},
    
    	timers: [],
    
    	fx: function( elem, options, prop ) {
    		this.options = options;
    		this.elem = elem;
    		this.prop = prop;
    
    		options.orig = options.orig || {};
    	}
    
    });
    
    jQuery.fx.prototype = {
    	// Simple function for setting a style value
    	update: function() {
    		if ( this.options.step ) {
    			this.options.step.call( this.elem, this.now, this );
    		}
    
    		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
    	},
    
    	// Get the current size
    	cur: function() {
    		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
    			return this.elem[ this.prop ];
    		}
    
    		var parsed,
    			r = jQuery.css( this.elem, this.prop );
    		// Empty strings, null, undefined and "auto" are converted to 0,
    		// complex values such as "rotate(1rad)" are returned as is,
    		// simple values such as "10px" are parsed to Float.
    		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
    	},
    
    	// Start an animation from one number to another
    	custom: function( from, to, unit ) {
    		var self = this,
    			fx = jQuery.fx,
    			raf;
    
    		this.startTime = fxNow || createFxNow();
    		this.start = from;
    		this.end = to;
    		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );
    		this.now = this.start;
    		this.pos = this.state = 0;
    
    		function t( gotoEnd ) {
    			return self.step(gotoEnd);
    		}
    
    		t.elem = this.elem;
    
    		if ( t() && jQuery.timers.push(t) && !timerId ) {
    			// Use requestAnimationFrame instead of setInterval if available
    			if ( requestAnimationFrame ) {
    				timerId = true;
    				raf = function() {
    					// When timerId gets set to null at any point, this stops
    					if ( timerId ) {
    						requestAnimationFrame( raf );
    						fx.tick();
    					}
    				};
    				requestAnimationFrame( raf );
    			} else {
    				timerId = setInterval( fx.tick, fx.interval );
    			}
    		}
    	},
    
    	// Simple 'show' function
    	show: function() {
    		// Remember where we started, so that we can go back to it later
    		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
    		this.options.show = true;
    
    		// Begin the animation
    		// Make sure that we start at a small width/height to avoid any
    		// flash of content
    		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
    
    		// Start by showing the element
    		jQuery( this.elem ).show();
    	},
    
    	// Simple 'hide' function
    	hide: function() {
    		// Remember where we started, so that we can go back to it later
    		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
    		this.options.hide = true;
    
    		// Begin the animation
    		this.custom(this.cur(), 0);
    	},
    
    	// Each step of an animation
    	step: function( gotoEnd ) {
    		var t = fxNow || createFxNow(),
    			done = true,
    			elem = this.elem,
    			options = this.options,
    			i, n;
    
    		if ( gotoEnd || t >= options.duration + this.startTime ) {
    			this.now = this.end;
    			this.pos = this.state = 1;
    			this.update();
    
    			options.animatedProperties[ this.prop ] = true;
    
    			for ( i in options.animatedProperties ) {
    				if ( options.animatedProperties[i] !== true ) {
    					done = false;
    				}
    			}
    
    			if ( done ) {
    				// Reset the overflow
    				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
    
    					jQuery.each( [ "", "X", "Y" ], function (index, value) {
    						elem.style[ "overflow" + value ] = options.overflow[index];
    					});
    				}
    
    				// Hide the element if the "hide" operation was done
    				if ( options.hide ) {
    					jQuery(elem).hide();
    				}
    
    				// Reset the properties, if the item has been hidden or shown
    				if ( options.hide || options.show ) {
    					for ( var p in options.animatedProperties ) {
    						jQuery.style( elem, p, options.orig[p] );
    					}
    				}
    
    				// Execute the complete function
    				options.complete.call( elem );
    			}
    
    			return false;
    
    		} else {
    			// classical easing cannot be used with an Infinity duration
    			if ( options.duration == Infinity ) {
    				this.now = t;
    			} else {
    				n = t - this.startTime;
    				this.state = n / options.duration;
    
    				// Perform the easing function, defaults to swing
    				this.pos = jQuery.easing[ options.animatedProperties[ this.prop ] ]( this.state, n, 0, 1, options.duration );
    				this.now = this.start + ((this.end - this.start) * this.pos);
    			}
    			// Perform the next step of the animation
    			this.update();
    		}
    
    		return true;
    	}
    };
    
    jQuery.extend( jQuery.fx, {
    	tick: function() {
    		for ( var timers = jQuery.timers, i = 0 ; i < timers.length ; ++i ) {
    			if ( !timers[i]() ) {
    				timers.splice(i--, 1);
    			}
    		}
    
    		if ( !timers.length ) {
    			jQuery.fx.stop();
    		}
    	},
    
    	interval: 13,
    
    	stop: function() {
    		clearInterval( timerId );
    		timerId = null;
    	},
    
    	speeds: {
    		slow: 600,
    		fast: 200,
    		// Default speed
    		_default: 400
    	},
    
    	step: {
    		opacity: function( fx ) {
    			jQuery.style( fx.elem, "opacity", fx.now );
    		},
    
    		_default: function( fx ) {
    			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
    				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
    			} else {
    				fx.elem[ fx.prop ] = fx.now;
    			}
    		}
    	}
    });
    
    if ( jQuery.expr && jQuery.expr.filters ) {
    	jQuery.expr.filters.animated = function( elem ) {
    		return jQuery.grep(jQuery.timers, function( fn ) {
    			return elem === fn.elem;
    		}).length;
    	};
    }
    
    // Try to restore the default display value of an element
    function defaultDisplay( nodeName ) {
    
    	if ( !elemdisplay[ nodeName ] ) {
    
    		var body = document.body,
    			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
    			display = elem.css( "display" );
    
    		elem.remove();
    
    		// If the simple way fails,
    		// get element's real default display by attaching it to a temp iframe
    		if ( display === "none" || display === "" ) {
    			// No iframe to use yet, so create it
    			if ( !iframe ) {
    				iframe = document.createElement( "iframe" );
    				iframe.frameBorder = iframe.width = iframe.height = 0;
    			}
    
    			body.appendChild( iframe );
    
    			// Create a cacheable copy of the iframe document on first call.
    			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
    			// document to it; WebKit & Firefox won't allow reusing the iframe document.
    			if ( !iframeDoc || !iframe.createElement ) {
    				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
    				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
    				iframeDoc.close();
    			}
    
    			elem = iframeDoc.createElement( nodeName );
    
    			iframeDoc.body.appendChild( elem );
    
    			display = jQuery.css( elem, "display" );
    
    			body.removeChild( iframe );
    		}
    
    		// Store the correct default display
    		elemdisplay[ nodeName ] = display;
    	}
    
    	return elemdisplay[ nodeName ];
    }
    
    
    
    
    var rtable = /^t(?:able|d|h)$/i,
    	rroot = /^(?:body|html)$/i;
    
    if ( "getBoundingClientRect" in document.documentElement ) {
    	jQuery.fn.offset = function( options ) {
    		var elem = this[0], box;
    
    		if ( options ) {
    			return this.each(function( i ) {
    				jQuery.offset.setOffset( this, options, i );
    			});
    		}
    
    		if ( !elem || !elem.ownerDocument ) {
    			return null;
    		}
    
    		if ( elem === elem.ownerDocument.body ) {
    			return jQuery.offset.bodyOffset( elem );
    		}
    
    		try {
    			box = elem.getBoundingClientRect();
    		} catch(e) {}
    
    		var doc = elem.ownerDocument,
    			docElem = doc.documentElement;
    
    		// Make sure we're not dealing with a disconnected DOM node
    		if ( !box || !jQuery.contains( docElem, elem ) ) {
    			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
    		}
    
    		var body = doc.body,
    			win = getWindow(doc),
    			clientTop  = docElem.clientTop  || body.clientTop  || 0,
    			clientLeft = docElem.clientLeft || body.clientLeft || 0,
    			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
    			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
    			top  = box.top  + scrollTop  - clientTop,
    			left = box.left + scrollLeft - clientLeft;
    
    		return { top: top, left: left };
    	};
    
    } else {
    	jQuery.fn.offset = function( options ) {
    		var elem = this[0];
    
    		if ( options ) {
    			return this.each(function( i ) {
    				jQuery.offset.setOffset( this, options, i );
    			});
    		}
    
    		if ( !elem || !elem.ownerDocument ) {
    			return null;
    		}
    
    		if ( elem === elem.ownerDocument.body ) {
    			return jQuery.offset.bodyOffset( elem );
    		}
    
    		jQuery.offset.initialize();
    
    		var computedStyle,
    			offsetParent = elem.offsetParent,
    			prevOffsetParent = elem,
    			doc = elem.ownerDocument,
    			docElem = doc.documentElement,
    			body = doc.body,
    			defaultView = doc.defaultView,
    			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
    			top = elem.offsetTop,
    			left = elem.offsetLeft;
    
    		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
    			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
    				break;
    			}
    
    			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
    			top  -= elem.scrollTop;
    			left -= elem.scrollLeft;
    
    			if ( elem === offsetParent ) {
    				top  += elem.offsetTop;
    				left += elem.offsetLeft;
    
    				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
    					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
    					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
    				}
    
    				prevOffsetParent = offsetParent;
    				offsetParent = elem.offsetParent;
    			}
    
    			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
    				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
    				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
    			}
    
    			prevComputedStyle = computedStyle;
    		}
    
    		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
    			top  += body.offsetTop;
    			left += body.offsetLeft;
    		}
    
    		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
    			top  += Math.max( docElem.scrollTop, body.scrollTop );
    			left += Math.max( docElem.scrollLeft, body.scrollLeft );
    		}
    
    		return { top: top, left: left };
    	};
    }
    
    jQuery.offset = {
    	initialize: function() {
    		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
    			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
    
    		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );
    
    		container.innerHTML = html;
    		body.insertBefore( container, body.firstChild );
    		innerDiv = container.firstChild;
    		checkDiv = innerDiv.firstChild;
    		td = innerDiv.nextSibling.firstChild.firstChild;
    
    		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
    		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
    
    		checkDiv.style.position = "fixed";
    		checkDiv.style.top = "20px";
    
    		// safari subtracts parent border width here which is 5px
    		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
    		checkDiv.style.position = checkDiv.style.top = "";
    
    		innerDiv.style.overflow = "hidden";
    		innerDiv.style.position = "relative";
    
    		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
    
    		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
    
    		body.removeChild( container );
    		jQuery.offset.initialize = jQuery.noop;
    	},
    
    	bodyOffset: function( body ) {
    		var top = body.offsetTop,
    			left = body.offsetLeft;
    
    		jQuery.offset.initialize();
    
    		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
    			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
    			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
    		}
    
    		return { top: top, left: left };
    	},
    
    	setOffset: function( elem, options, i ) {
    		var position = jQuery.css( elem, "position" );
    
    		// set position first, in-case top/left are set even on static elem
    		if ( position === "static" ) {
    			elem.style.position = "relative";
    		}
    
    		var curElem = jQuery( elem ),
    			curOffset = curElem.offset(),
    			curCSSTop = jQuery.css( elem, "top" ),
    			curCSSLeft = jQuery.css( elem, "left" ),
    			calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
    			props = {}, curPosition = {}, curTop, curLeft;
    
    		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
    		if ( calculatePosition ) {
    			curPosition = curElem.position();
    			curTop = curPosition.top;
    			curLeft = curPosition.left;
    		} else {
    			curTop = parseFloat( curCSSTop ) || 0;
    			curLeft = parseFloat( curCSSLeft ) || 0;
    		}
    
    		if ( jQuery.isFunction( options ) ) {
    			options = options.call( elem, i, curOffset );
    		}
    
    		if (options.top != null) {
    			props.top = (options.top - curOffset.top) + curTop;
    		}
    		if (options.left != null) {
    			props.left = (options.left - curOffset.left) + curLeft;
    		}
    
    		if ( "using" in options ) {
    			options.using.call( elem, props );
    		} else {
    			curElem.css( props );
    		}
    	}
    };
    
    
    jQuery.fn.extend({
    	position: function() {
    		if ( !this[0] ) {
    			return null;
    		}
    
    		var elem = this[0],
    
    		// Get *real* offsetParent
    		offsetParent = this.offsetParent(),
    
    		// Get correct offsets
    		offset       = this.offset(),
    		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();
    
    		// Subtract element margins
    		// note: when an element has margin: auto the offsetLeft and marginLeft
    		// are the same in Safari causing offset.left to incorrectly be 0
    		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
    		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;
    
    		// Add offsetParent borders
    		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
    		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;
    
    		// Subtract the two offsets
    		return {
    			top:  offset.top  - parentOffset.top,
    			left: offset.left - parentOffset.left
    		};
    	},
    
    	offsetParent: function() {
    		return this.map(function() {
    			var offsetParent = this.offsetParent || document.body;
    			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
    				offsetParent = offsetParent.offsetParent;
    			}
    			return offsetParent;
    		});
    	}
    });
    
    
    // Create scrollLeft and scrollTop methods
    jQuery.each( ["Left", "Top"], function( i, name ) {
    	var method = "scroll" + name;
    
    	jQuery.fn[ method ] = function( val ) {
    		var elem, win;
    
    		if ( val === undefined ) {
    			elem = this[ 0 ];
    
    			if ( !elem ) {
    				return null;
    			}
    
    			win = getWindow( elem );
    
    			// Return the scroll offset
    			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
    				jQuery.support.boxModel && win.document.documentElement[ method ] ||
    					win.document.body[ method ] :
    				elem[ method ];
    		}
    
    		// Set the scroll offset
    		return this.each(function() {
    			win = getWindow( this );
    
    			if ( win ) {
    				win.scrollTo(
    					!i ? val : jQuery( win ).scrollLeft(),
    					 i ? val : jQuery( win ).scrollTop()
    				);
    
    			} else {
    				this[ method ] = val;
    			}
    		});
    	};
    });
    
    function getWindow( elem ) {
    	return jQuery.isWindow( elem ) ?
    		elem :
    		elem.nodeType === 9 ?
    			elem.defaultView || elem.parentWindow :
    			false;
    }
    
    
    
    
    // Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
    jQuery.each([ "Height", "Width" ], function( i, name ) {
    
    	var type = name.toLowerCase();
    
    	// innerHeight and innerWidth
    	jQuery.fn[ "inner" + name ] = function() {
    		var elem = this[0];
    		return elem && elem.style ?
    			parseFloat( jQuery.css( elem, type, "padding" ) ) :
    			null;
    	};
    
    	// outerHeight and outerWidth
    	jQuery.fn[ "outer" + name ] = function( margin ) {
    		var elem = this[0];
    		return elem && elem.style ?
    			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
    			null;
    	};
    
    	jQuery.fn[ type ] = function( size ) {
    		// Get window width or height
    		var elem = this[0];
    		if ( !elem ) {
    			return size == null ? null : this;
    		}
    
    		if ( jQuery.isFunction( size ) ) {
    			return this.each(function( i ) {
    				var self = jQuery( this );
    				self[ type ]( size.call( this, i, self[ type ]() ) );
    			});
    		}
    
    		if ( jQuery.isWindow( elem ) ) {
    			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
    			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
    			var docElemProp = elem.document.documentElement[ "client" + name ];
    			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
    				elem.document.body[ "client" + name ] || docElemProp;
    
    		// Get document width or height
    		} else if ( elem.nodeType === 9 ) {
    			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
    			return Math.max(
    				elem.documentElement["client" + name],
    				elem.body["scroll" + name], elem.documentElement["scroll" + name],
    				elem.body["offset" + name], elem.documentElement["offset" + name]
    			);
    
    		// Get or set width or height on the element
    		} else if ( size === undefined ) {
    			var orig = jQuery.css( elem, type ),
    				ret = parseFloat( orig );
    
    			return jQuery.isNaN( ret ) ? orig : ret;
    
    		// Set the width or height on the element (default to pixels if value is unitless)
    		} else {
    			return this.css( type, typeof size === "string" ? size : size + "px" );
    		}
    	};
    
    });
    
    
    // Expose jQuery to the global object
    window.jQuery = window.$ = jQuery;
    })(window);
    
    /*
     * jQuery Hotkeys Plugin
     * Copyright 2010, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     *
     * Based upon the plugin by Tzury Bar Yochay:
     * http://github.com/tzuryby/hotkeys
     *
     * Original idea by:
     * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
    */
    
    (function(jQuery){
    
    	jQuery.hotkeys = {
    		version: "0.8",
    
    		specialKeys: {
    			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
    			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
    			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
    			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
    			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
    			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
    			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
    		},
    
    		shiftNums: {
    			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
    			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
    			".": ">",  "/": "?",  "\\": "|"
    		}
    	};
    
    	function keyHandler( handleObj ) {
    		// Only care when a possible input has been specified
    		if ( typeof handleObj.data !== "string" ) {
    			return;
    		}
    
    		var origHandler = handleObj.handler,
    			keys = handleObj.data.toLowerCase().split(" ");
    
    		handleObj.handler = function( event ) {
    			// Don't fire in text-accepting inputs that we didn't directly bind to
    			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
    				 event.target.type === "text") ) {
    				return;
    			}
    
    			// Keypress represents characters, not special keys
    			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
    				character = String.fromCharCode( event.which ).toLowerCase(),
    				key, modif = "", possible = {};
    
    			// check combinations (alt|ctrl|shift+anything)
    			if ( event.altKey && special !== "alt" ) {
    				modif += "alt+";
    			}
    
    			if ( event.ctrlKey && special !== "ctrl" ) {
    				modif += "ctrl+";
    			}
    
    			// TODO: Need to make sure this works consistently across platforms
    			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
    				modif += "meta+";
    			}
    
    			if ( event.shiftKey && special !== "shift" ) {
    				modif += "shift+";
    			}
    
    			if ( special ) {
    				possible[ modif + special ] = true;
    
    			} else {
    				possible[ modif + character ] = true;
    				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;
    
    				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
    				if ( modif === "shift+" ) {
    					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
    				}
    			}
    
    			for ( var i = 0, l = keys.length; i < l; i++ ) {
    				if ( possible[ keys[i] ] ) {
    					return origHandler.apply( this, arguments );
    				}
    			}
    		};
    	}
    
    	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
    		jQuery.event.special[ this ] = { add: keyHandler };
    	});
    
    })( jQuery );
    
    //     Underscore.js 1.1.6
    //     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
    //     Underscore is freely distributable under the MIT license.
    //     Portions of Underscore are inspired or borrowed from Prototype,
    //     Oliver Steele's Functional, and John Resig's Micro-Templating.
    //     For all details and documentation:
    //     http://documentcloud.github.com/underscore
    (function() {
    
        // Baseline setup
        // --------------
        // Establish the root object, `window` in the browser, or `global` on the server.
        var root = this;
    
        // Save the previous value of the `_` variable.
        var previousUnderscore = root._;
    
        // Establish the object that gets returned to break out of a loop iteration.
        var breaker = {};
    
        // Save bytes in the minified (but not gzipped) version:
        var ArrayProto = Array.prototype,
            ObjProto = Object.prototype,
            FuncProto = Function.prototype;
    
        // Create quick reference variables for speed access to core prototypes.
        var slice = ArrayProto.slice,
            unshift = ArrayProto.unshift,
            toString = ObjProto.toString,
            hasOwnProperty = ObjProto.hasOwnProperty;
    
        // All **ECMAScript 5** native function implementations that we hope to use
        // are declared here.
        var
        nativeForEach = ArrayProto.forEach,
            nativeMap = ArrayProto.map,
            nativeReduce = ArrayProto.reduce,
            nativeReduceRight = ArrayProto.reduceRight,
            nativeFilter = ArrayProto.filter,
            nativeEvery = ArrayProto.every,
            nativeSome = ArrayProto.some,
            nativeIndexOf = ArrayProto.indexOf,
            nativeLastIndexOf = ArrayProto.lastIndexOf,
            nativeIsArray = Array.isArray,
            nativeKeys = Object.keys,
            nativeBind = FuncProto.bind;
    
        // Create a safe reference to the Underscore object for use below.
        var _ = function(obj) {
            return new wrapper(obj);
        };
    
        // Export the Underscore object for **CommonJS**, with backwards-compatibility
        // for the old `require()` API. If we're not in CommonJS, add `_` to the
        // global object.
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = _;
            _._ = _;
        } else {
            root._ = _;
        }
    
        // Current version.
        _.VERSION = '1.1.6';
    
        // Collection Functions
        // --------------------
        // The cornerstone, an `each` implementation, aka `forEach`.
        // Handles objects implementing `forEach`, arrays, and raw objects.
        // Delegates to **ECMAScript 5**'s native `forEach` if available.
        var each = _.each = _.forEach = function(obj, iterator, context) {
            if (obj == null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (_.isNumber(obj.length)) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === breaker) return;
                }
            } else {
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === breaker) return;
                    }
                }
            }
        };
    
        // Return the results of applying the iterator to each element.
        // Delegates to **ECMAScript 5**'s native `map` if available.
        _.map = function(obj, iterator, context) {
            var results = [];
            if (obj == null) return results;
            if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
            each(obj, function(value, index, list) {
                results[results.length] = iterator.call(context, value, index, list);
            });
            return results;
        };
    
        // **Reduce** builds up a single result from a list of values, aka `inject`,
        // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
        _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
            var initial = memo !== void 0;
            if (obj == null) obj = [];
            if (nativeReduce && obj.reduce === nativeReduce) {
                if (context) iterator = _.bind(iterator, context);
                return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
            }
            each(obj, function(value, index, list) {
                if (!initial && index === 0) {
                    memo = value;
                    initial = true;
                } else {
                    memo = iterator.call(context, memo, value, index, list);
                }
            });
            if (!initial) throw new TypeError("Reduce of empty array with no initial value");
            return memo;
        };
    
        // The right-associative version of reduce, also known as `foldr`.
        // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
        _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
            if (obj == null) obj = [];
            if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
                if (context) iterator = _.bind(iterator, context);
                return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
            }
            var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
            return _.reduce(reversed, iterator, memo, context);
        };
    
        // Return the first value which passes a truth test. Aliased as `detect`.
        _.find = _.detect = function(obj, iterator, context) {
            var result;
            any(obj, function(value, index, list) {
                if (iterator.call(context, value, index, list)) {
                    result = value;
                    return true;
                }
            });
            return result;
        };
    
        // Return all the elements that pass a truth test.
        // Delegates to **ECMAScript 5**'s native `filter` if available.
        // Aliased as `select`.
        _.filter = _.select = function(obj, iterator, context) {
            var results = [];
            if (obj == null) return results;
            if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
            each(obj, function(value, index, list) {
                if (iterator.call(context, value, index, list)) results[results.length] = value;
            });
            return results;
        };
    
        // Return all the elements for which a truth test fails.
        _.reject = function(obj, iterator, context) {
            var results = [];
            if (obj == null) return results;
            each(obj, function(value, index, list) {
                if (!iterator.call(context, value, index, list)) results[results.length] = value;
            });
            return results;
        };
    
        // Determine whether all of the elements match a truth test.
        // Delegates to **ECMAScript 5**'s native `every` if available.
        // Aliased as `all`.
        _.every = _.all = function(obj, iterator, context) {
            var result = true;
            if (obj == null) return result;
            if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
            each(obj, function(value, index, list) {
                if (!(result = result && iterator.call(context, value, index, list))) return breaker;
            });
            return result;
        };
    
        // Determine if at least one element in the object matches a truth test.
        // Delegates to **ECMAScript 5**'s native `some` if available.
        // Aliased as `any`.
        var any = _.some = _.any = function(obj, iterator, context) {
            iterator || (iterator = _.identity);
            var result = false;
            if (obj == null) return result;
            if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
            each(obj, function(value, index, list) {
                if (result = iterator.call(context, value, index, list)) return breaker;
            });
            return result;
        };
    
        // Determine if a given value is included in the array or object using `===`.
        // Aliased as `contains`.
        _.include = _.contains = function(obj, target) {
            var found = false;
            if (obj == null) return found;
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
            any(obj, function(value) {
                if (found = value === target) return true;
            });
            return found;
        };
    
        // Invoke a method (with arguments) on every item in a collection.
        _.invoke = function(obj, method) {
            var args = slice.call(arguments, 2);
            return _.map(obj, function(value) {
                return (method.call ? method || value : value[method]).apply(value, args);
            });
        };
    
        // Convenience version of a common use case of `map`: fetching a property.
        _.pluck = function(obj, key) {
            return _.map(obj, function(value) {
                return value[key];
            });
        };
    
        // Return the maximum element or (element-based computation).
        _.max = function(obj, iterator, context) {
            if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
            var result = {
                computed: -Infinity
            };
            each(obj, function(value, index, list) {
                var computed = iterator ? iterator.call(context, value, index, list) : value;
                computed >= result.computed && (result = {
                    value: value,
                    computed: computed
                });
            });
            return result.value;
        };
    
        // Return the minimum element (or element-based computation).
        _.min = function(obj, iterator, context) {
            if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
            var result = {
                computed: Infinity
            };
            each(obj, function(value, index, list) {
                var computed = iterator ? iterator.call(context, value, index, list) : value;
                computed < result.computed && (result = {
                    value: value,
                    computed: computed
                });
            });
            return result.value;
        };
    
        // Sort the object's values by a criterion produced by an iterator.
        _.sortBy = function(obj, iterator, context) {
            return _.pluck(_.map(obj, function(value, index, list) {
                return {
                    value: value,
                    criteria: iterator.call(context, value, index, list)
                };
            }).sort(function(left, right) {
                var a = left.criteria,
                    b = right.criteria;
                return a < b ? -1 : a > b ? 1 : 0;
            }), 'value');
        };
    
        // Use a comparator function to figure out at what index an object should
        // be inserted so as to maintain order. Uses binary search.
        _.sortedIndex = function(array, obj, iterator) {
            iterator || (iterator = _.identity);
            var low = 0,
                high = array.length;
            while (low < high) {
                var mid = (low + high) >> 1;
                iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
            }
            return low;
        };
    
        // Safely convert anything iterable into a real, live array.
        _.toArray = function(iterable) {
            if (!iterable) return [];
            if (iterable.toArray) return iterable.toArray();
            if (_.isArray(iterable)) return iterable;
            if (_.isArguments(iterable)) return slice.call(iterable);
            return _.values(iterable);
        };
    
        // Return the number of elements in an object.
        _.size = function(obj) {
            return _.toArray(obj).length;
        };
    
        // Array Functions
        // ---------------
        // Get the first element of an array. Passing **n** will return the first N
        // values in the array. Aliased as `head`. The **guard** check allows it to work
        // with `_.map`.
        _.first = _.head = function(array, n, guard) {
            return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
        };
    
        // Returns everything but the first entry of the array. Aliased as `tail`.
        // Especially useful on the arguments object. Passing an **index** will return
        // the rest of the values in the array from that index onward. The **guard**
        // check allows it to work with `_.map`.
        _.rest = _.tail = function(array, index, guard) {
            return slice.call(array, (index == null) || guard ? 1 : index);
        };
    
        // Get the last element of an array.
        _.last = function(array) {
            return array[array.length - 1];
        };
    
        // Trim out all falsy values from an array.
        _.compact = function(array) {
            return _.filter(array, function(value) {
                return !!value;
            });
        };
    
        // Return a completely flattened version of an array.
        _.flatten = function(array) {
            return _.reduce(array, function(memo, value) {
                if (_.isArray(value)) return memo.concat(_.flatten(value));
                memo[memo.length] = value;
                return memo;
            }, []);
        };
    
        // Return a version of the array that does not contain the specified value(s).
        _.without = function(array) {
            var values = slice.call(arguments, 1);
            return _.filter(array, function(value) {
                return !_.include(values, value);
            });
        };
    
        // Produce a duplicate-free version of the array. If the array has already
        // been sorted, you have the option of using a faster algorithm.
        // Aliased as `unique`.
        _.uniq = _.unique = function(array, isSorted) {
            return _.reduce(array, function(memo, el, i) {
                if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
                return memo;
            }, []);
        };
    
        // Produce an array that contains every item shared between all the
        // passed-in arrays.
        _.intersect = function(array) {
            var rest = slice.call(arguments, 1);
            return _.filter(_.uniq(array), function(item) {
                return _.every(rest, function(other) {
                    return _.indexOf(other, item) >= 0;
                });
            });
        };
    
        // Zip together multiple lists into a single array -- elements that share
        // an index go together.
        _.zip = function() {
            var args = slice.call(arguments);
            var length = _.max(_.pluck(args, 'length'));
            var results = new Array(length);
            for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
            return results;
        };
    
        // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
        // we need this function. Return the position of the first occurrence of an
        // item in an array, or -1 if the item is not included in the array.
        // Delegates to **ECMAScript 5**'s native `indexOf` if available.
        // If the array is large and already in sort order, pass `true`
        // for **isSorted** to use binary search.
        _.indexOf = function(array, item, isSorted) {
            if (array == null) return -1;
            var i, l;
            if (isSorted) {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
            if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
            for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
            return -1;
        };
    
    
        // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
        _.lastIndexOf = function(array, item) {
            if (array == null) return -1;
            if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
            var i = array.length;
            while (i--) if (array[i] === item) return i;
            return -1;
        };
    
        // Generate an integer Array containing an arithmetic progression. A port of
        // the native Python `range()` function. See
        // [the Python documentation](http://docs.python.org/library/functions.html#range).
        _.range = function(start, stop, step) {
            if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
            }
            step = arguments[2] || 1;
    
            var len = Math.max(Math.ceil((stop - start) / step), 0);
            var idx = 0;
            var range = new Array(len);
    
            while (idx < len) {
                range[idx++] = start;
                start += step;
            }
    
            return range;
        };
    
        // Function (ahem) Functions
        // ------------------
        // Create a function bound to a given object (assigning `this`, and arguments,
        // optionally). Binding with arguments is also known as `curry`.
        // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
        // We check for `func.bind` first, to fail fast when `func` is undefined.
        _.bind = function(func, obj) {
            if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
            var args = slice.call(arguments, 2);
            return function() {
                return func.apply(obj, args.concat(slice.call(arguments)));
            };
        };
    
        // Bind all of an object's methods to that object. Useful for ensuring that
        // all callbacks defined on an object belong to it.
        _.bindAll = function(obj) {
            var funcs = slice.call(arguments, 1);
            if (funcs.length == 0) funcs = _.functions(obj);
            each(funcs, function(f) {
                obj[f] = _.bind(obj[f], obj);
            });
            return obj;
        };
    
        // Memoize an expensive function by storing its results.
        _.memoize = function(func, hasher) {
            var memo = {};
            hasher || (hasher = _.identity);
            return function() {
                var key = hasher.apply(this, arguments);
                return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
            };
        };
    
        // Delays a function for the given number of milliseconds, and then calls
        // it with the arguments supplied.
        _.delay = function(func, wait) {
            var args = slice.call(arguments, 2);
            return setTimeout(function() {
                return func.apply(func, args);
            }, wait);
        };
    
        // Defers a function, scheduling it to run after the current call stack has
        // cleared.
        _.defer = function(func) {
            return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
        };
    
        // Internal function used to implement `_.throttle` and `_.debounce`.
        var limit = function(func, wait, debounce) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var throttler = function() {
                    timeout = null;
                    func.apply(context, args);
                };
                if (debounce) clearTimeout(timeout);
                if (debounce || !timeout) timeout = setTimeout(throttler, wait);
            };
        };
    
        // Returns a function, that, when invoked, will only be triggered at most once
        // during a given window of time.
        _.throttle = function(func, wait) {
            return limit(func, wait, false);
        };
    
        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds.
        _.debounce = function(func, wait) {
            return limit(func, wait, true);
        };
    
        // Returns a function that will be executed at most one time, no matter how
        // often you call it. Useful for lazy initialization.
        _.once = function(func) {
            var ran = false,
                memo;
            return function() {
                if (ran) return memo;
                ran = true;
                return memo = func.apply(this, arguments);
            };
        };
    
        // Returns the first function passed as an argument to the second,
        // allowing you to adjust arguments, run code before and after, and
        // conditionally execute the original function.
        _.wrap = function(func, wrapper) {
            return function() {
                var args = [func].concat(slice.call(arguments));
                return wrapper.apply(this, args);
            };
        };
    
        // Returns a function that is the composition of a list of functions, each
        // consuming the return value of the function that follows.
        _.compose = function() {
            var funcs = slice.call(arguments);
            return function() {
                var args = slice.call(arguments);
                for (var i = funcs.length - 1; i >= 0; i--) {
                    args = [funcs[i].apply(this, args)];
                }
                return args[0];
            };
        };
    
        // Returns a function that will only be executed after being called N times.
        _.after = function(times, func) {
            return function() {
                if (--times < 1) {
                    return func.apply(this, arguments);
                }
            };
        };
    
    
        // Object Functions
        // ----------------
        // Retrieve the names of an object's properties.
        // Delegates to **ECMAScript 5**'s native `Object.keys`
        _.keys = nativeKeys ||
        function(obj) {
            if (obj !== Object(obj)) throw new TypeError('Invalid object');
            var keys = [];
            for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
            return keys;
        };
    
        // Retrieve the values of an object's properties.
        _.values = function(obj) {
            return _.map(obj, _.identity);
        };
    
        // Return a sorted list of the function names available on the object.
        // Aliased as `methods`
        _.functions = _.methods = function(obj) {
            return _.filter(_.keys(obj), function(key) {
                return _.isFunction(obj[key]);
            }).sort();
        };
    
        // Extend a given object with all the properties in passed-in object(s).
        _.extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0) obj[prop] = source[prop];
                }
            });
            return obj;
        };
    
        // Fill in a given object with default properties.
        _.defaults = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (obj[prop] == null) obj[prop] = source[prop];
                }
            });
            return obj;
        };
    
        // Create a (shallow-cloned) duplicate of an object.
        _.clone = function(obj) {
            return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
        };
    
        // Invokes interceptor with the obj, and then returns obj.
        // The primary purpose of this method is to "tap into" a method chain, in
        // order to perform operations on intermediate results within the chain.
        _.tap = function(obj, interceptor) {
            interceptor(obj);
            return obj;
        };
    
        // Perform a deep comparison to check if two objects are equal.
        _.isEqual = function(a, b) {
            // Check object identity.
            if (a === b) return true;
            // Different types?
            var atype = typeof(a),
                btype = typeof(b);
            if (atype != btype) return false;
            // Basic equality test (watch out for coercions).
            if (a == b) return true;
            // One is falsy and the other truthy.
            if ((!a && b) || (a && !b)) return false;
            // Unwrap any wrapped objects.
            if (a._chain) a = a._wrapped;
            if (b._chain) b = b._wrapped;
            // One of them implements an isEqual()?
            if (a.isEqual) return a.isEqual(b);
            // Check dates' integer values.
            if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
            // Both are NaN?
            if (_.isNaN(a) && _.isNaN(b)) return false;
            // Compare regular expressions.
            if (_.isRegExp(a) && _.isRegExp(b)) return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
            // If a is not an object by this point, we can't handle it.
            if (atype !== 'object') return false;
            // Check for different array lengths before comparing contents.
            if (a.length && (a.length !== b.length)) return false;
            // Nothing else worked, deep compare the contents.
            var aKeys = _.keys(a),
                bKeys = _.keys(b);
            // Different object sizes?
            if (aKeys.length != bKeys.length) return false;
            // Recursive comparison of contents.
            for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
            return true;
        };
    
        // Is a given array or object empty?
        _.isEmpty = function(obj) {
            if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
            for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
            return true;
        };
    
        // Is a given value a DOM element?
        _.isElement = function(obj) {
            return !!(obj && obj.nodeType == 1);
        };
    
        // Is a given value an array?
        // Delegates to ECMA5's native Array.isArray
        _.isArray = nativeIsArray ||
        function(obj) {
            return toString.call(obj) === '[object Array]';
        };
    
        // Is a given variable an arguments object?
        _.isArguments = function(obj) {
            return !!(obj && hasOwnProperty.call(obj, 'callee'));
        };
    
        // Is a given value a function?
        _.isFunction = function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        };
    
        // Is a given value a string?
        _.isString = function(obj) {
            return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
        };
    
        // Is a given value a number?
        _.isNumber = function(obj) {
            return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
        };
    
        // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
        // that does not equal itself.
        _.isNaN = function(obj) {
            return obj !== obj;
        };
    
        // Is a given value a boolean?
        _.isBoolean = function(obj) {
            return obj === true || obj === false;
        };
    
        // Is a given value a date?
        _.isDate = function(obj) {
            return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
        };
    
        // Is the given value a regular expression?
        _.isRegExp = function(obj) {
            return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
        };
    
        // Is a given value equal to null?
        _.isNull = function(obj) {
            return obj === null;
        };
    
        // Is a given variable undefined?
        _.isUndefined = function(obj) {
            return obj === void 0;
        };
    
        // Utility Functions
        // -----------------
        // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
        // previous owner. Returns a reference to the Underscore object.
        _.noConflict = function() {
            root._ = previousUnderscore;
            return this;
        };
    
        // Keep the identity function around for default iterators.
        _.identity = function(value) {
            return value;
        };
    
        // Run a function **n** times.
        _.times = function(n, iterator, context) {
            for (var i = 0; i < n; i++) iterator.call(context, i);
        };
    
        // Add your own custom functions to the Underscore object, ensuring that
        // they're correctly added to the OOP wrapper as well.
        _.mixin = function(obj) {
            each(_.functions(obj), function(name) {
                addToWrapper(name, _[name] = obj[name]);
            });
        };
    
        // Generate a unique integer id (unique within the entire client session).
        // Useful for temporary DOM ids.
        var idCounter = 0;
        _.uniqueId = function(prefix) {
            var id = idCounter++;
            return prefix ? prefix + id : id;
        };
    
        // By default, Underscore uses ERB-style template delimiters, change the
        // following template settings to use alternative delimiters.
        _.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g
        };
    
        // JavaScript micro-templating, similar to John Resig's implementation.
        // Underscore templating handles arbitrary delimiters, preserves whitespace,
        // and correctly escapes quotes within interpolated code.
        _.template = function(str, data) {
            var c = _.templateSettings;
            var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(c.interpolate, function(match, code) {
                return "'," + code.replace(/\\'/g, "'") + ",'";
            }).replace(c.evaluate || null, function(match, code) {
                return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
            }).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
            var func = new Function('obj', tmpl);
            return data ? func(data) : func;
        };
    
        // The OOP Wrapper
        // ---------------
        // If Underscore is called as a function, it returns a wrapped object that
        // can be used OO-style. This wrapper holds altered versions of all the
        // underscore functions. Wrapped objects may be chained.
        var wrapper = function(obj) {
            this._wrapped = obj;
        };
    
        // Expose `wrapper.prototype` as `_.prototype`
        _.prototype = wrapper.prototype;
    
        // Helper function to continue chaining intermediate results.
        var result = function(obj, chain) {
            return chain ? _(obj).chain() : obj;
        };
    
        // A method to easily add functions to the OOP wrapper.
        var addToWrapper = function(name, func) {
            wrapper.prototype[name] = function() {
                var args = slice.call(arguments);
                unshift.call(args, this._wrapped);
                return result(func.apply(_, args), this._chain);
            };
        };
    
        // Add all of the Underscore functions to the wrapper object.
        _.mixin(_);
    
        // Add all mutator Array functions to the wrapper.
        each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
            var method = ArrayProto[name];
            wrapper.prototype[name] = function() {
                method.apply(this._wrapped, arguments);
                return result(this._wrapped, this._chain);
            };
        });
    
        // Add all accessor Array functions to the wrapper.
        each(['concat', 'join', 'slice'], function(name) {
            var method = ArrayProto[name];
            wrapper.prototype[name] = function() {
                return result(method.apply(this._wrapped, arguments), this._chain);
            };
        });
    
        // Start chaining a wrapped Underscore object.
        wrapper.prototype.chain = function() {
            this._chain = true;
            return this;
        };
    
        // Extracts the result from a wrapped and chained object.
        wrapper.prototype.value = function() {
            return this._wrapped;
        };
    
    })();
    var Base=function(){if(arguments.length)this==window?Base.prototype.extend.call(arguments[0],arguments.callee.prototype):this.extend(arguments[0])};Base.version="1.0.2"; Base.prototype={extend:function(b,d){var g=Base.prototype.extend;if(arguments.length==2){var e=this[b],h=this.constructor?this.constructor.prototype:null;if(e instanceof Function&&d instanceof Function&&e.valueOf()!=d.valueOf()&&/\bbase\b/.test(d)){var a=d;d=function(){var k=this.base,l=this;this.base=e;this.baseClass=h;var m=a.apply(this,arguments);this.base=k;this.baseClass=l;return m};d.valueOf=function(){return a};d.toString=function(){return String(a)}}return this[b]=d}else if(b){var i={toSource:null}, c=["toString","valueOf"];if(Base._prototyping)c[2]="constructor";for(var j=0;f=c[j];j++)b[f]!=i[f]&&g.call(this,f,b[f]);for(var f in b)i[f]||g.call(this,f,b[f])}return this},base:function(){}}; Base.extend=function(b,d){var g=Base.prototype.extend;b||(b={});Base._prototyping=true;var e=new this;g.call(e,b);var h=e.constructor;e.constructor=this;delete Base._prototyping;var a=function(){Base._prototyping||h.apply(this,arguments);this.constructor=a};a.prototype=e;a.extend=this.extend;a.implement=this.implement;a.create=this.create;a.getClassName=this.getClassName;a.toString=function(){return String(h)};a.isInstance=function(c){return typeof c!="undefined"&&c!==null&&c.constructor&&c.constructor.__ancestors&& c.constructor.__ancestors[a.getClassName()]};g.call(a,d);b=h?a:e;b.init instanceof Function&&b.init();if(!a.__ancestors){a.__ancestors={};a.__ancestors[a.getClassName()]=true;var i=function(c){if(c.prototype&&c.prototype.constructor&&c.prototype.constructor.getClassName){a.__ancestors[c.prototype.constructor.getClassName()]=true;i(c.prototype.constructor)}};i(a)}if(a.getClassName)b.className=a.getClassName();return b};Base.implement=function(b){if(b instanceof Function)b=b.prototype;this.prototype.extend(b)}; Base.create=function(){};Base.getClassName=function(){return"Base"};Base.isInstance=function(){};
    /*
      Machine.js
      by mary rose cook
      http://github.com/maryrosecook/machinejs
    
      Make behaviour trees in JavaScript.
      See index.html for an example.
    
      Uses Base.js by Dean Edwards.  Thanks, Dean.
    */
    
    /*
      The tree generator.  Instantiate and then call generateTree(),
      passing the JSON definition of the tree and the object the tree controls.
    */
    var Machine = Base.extend({
        constructor: function() { },
    
        // makes behaviour tree from passed json and returns the root node
        generateTree: function(treeJson, actor) {
            return this.read(treeJson, null, actor);
        },
    
        // reads in all nodes in passed json, constructing a tree of nodes as it goes
        read: function(subTreeJson, parent, actor) {
            var node = null;
            if(subTreeJson.pointer == true)
                node = new Pointer(subTreeJson.identifier, subTreeJson.test, subTreeJson.strategy, parent, actor);
            else
                node = new State(subTreeJson.identifier, subTreeJson.test, subTreeJson.strategy, parent, actor);
    
            node.report = subTreeJson.report;
    
            for(var i in subTreeJson.children)
                node.children[node.children.length] = this.read(subTreeJson.children[i], node, actor);
    
            return node;
        },
    }, {
    	getClassName: function() { return "Machine"; }
    
    });
    
    /*
      The object for nodes in the tree.
    */
    var Node = Base.extend({
        identifier: null,
        test: null,
        strategy: null,
        parent: null,
        children: null,
        actor: null,
        report: null,
    
        constructor: function(identifier, test, strategy, parent, actor) {
            this.identifier = identifier;
            this.test = test;
            this.strategy = strategy;
            this.parent = parent;
            this.actor = actor;
            this.children = [];
        },
    
        // a tick of the clock.  Called every time
        tick: function() {
            if(this.isAction()) // run an actual action
                this.run();
    
            var potentialNextState = this.nextState();
            if(potentialNextState !== null)
                return potentialNextState.transition();
            else if(this.can()) // no child state, try and stay in this one
                return this;
            else // can't stay in this one, so back up the tree
                return this.nearestAncestor().transition();
        },
    
        // gets next state that would be moved to from current state
        nextState: function() {
            var strategy = this.strategy;
            if(strategy === undefined)
                strategy = this.getNearestAncestorStrategy();
    
            if(strategy !== undefined)
                return this[strategy].call(this);
            else
                return null;
        },
    
        // finds closest ancestor that has a strategy and returns that strategy
        getNearestAncestorStrategy: function() {
            if(this.parent !== null)
            {
                if(this.parent.strategy !== null)
                    return this.parent.strategy;
                else
                    return this.parent.getNearestAncestorStrategy();
            }
            // return undefined
        },
    
        isTransition: function() { return this.children.length > 0 || this instanceof Pointer; },
        isAction: function() { return !this.isTransition(); },
    
        // returns true if actor allowed to enter this state
        can: function() {
            var functionName = this.test; // can specify custom test function name
            if(functionName === undefined) // no override so go with default function name
                functionName = "can" + this.identifier[0].toUpperCase() + this.identifier.substring(1, this.identifier.length);
    
            if(this.actor[functionName] !== undefined)
                return this.actor[functionName].call(this.actor);
            else // no canX() function defined - assume can
                return true;
        },
    
        // returns nearest ancestor that can run
        nearestAncestor: function() {
            if(this.parent !== null)
            {
                if(this.parent.can())
                    return this.parent;
                else
                    return this.parent.nearestAncestor();
            }
    
            return null;
        },
    
        // returns first child that can run
        prioritised: function() {
            return this.nextRunnable(this.children);
        },
    
        // gets next runnable node in passed list
        nextRunnable: function(nodes) {
            for(var i in nodes)
                if(nodes[i].can())
                    return nodes[i];
    
            return null;
        },
    
        // runs all runnable children in order, then kicks up to children's closest runnable ancestor
        sequential: function() {
            var nextState = null;
            if(this.isAction()) // want to get next runnable child or go back up to grandparent
            {
                var foundThis = false;
                for(var i in this.parent.children)
                {
                    var sibling = this.parent.children[i];
                    if(this.identifier == sibling.identifier)
                        foundThis = true;
                    else if(foundThis && sibling.can())
                        return sibling;
                }
            }
            else // at a sequential parent so try to run first runnable child
            {
                var firstRunnableChild = this.nextRunnable(this.children);
                if(firstRunnableChild !== null)
                    return firstRunnableChild;
            }
    
            return this.nearestAncestor(); // no more runnable children in the sequence so return first runnable ancestor
        },
    
        // returns first namesake forebear encountered when going directly up tree
        nearestNamesakeAncestor: function(identifier) {
            if(this.parent === null)
                return null;
            else if(this.parent.identifier == identifier)
                return this.parent;
            else
                return this.parent.nearestNamesakeAncestor(identifier);
        },
    }, {
    	getClassName: function() { return "Node"; },
    
    });
    
    
    /*
      A normal state in the tree.
    */
    var State = Node.extend({
        transition: function() {
            return this;
        },
    
        // run the behaviour associated with this state
        run: function() {
            this.actor[this.identifier].call(this.actor); // run the action
        },
    }, {
    	getClassName: function() { return "State"; }
    
    });
    
    /*
      A pointer state in the tree.  Directs the actor to a synonymous state
      further up the tree.  Which synonymous state the actor transitions to
      is dependent on the pointer's strategy.
    */
    var Pointer = Node.extend({
        // transition out of this state using the state's strategy
        transition: function() {
            return this[this.strategy].call(this);
        },
    
        // a strategy that moves to the first synonymous ancestor
        hereditory: function() {
            return this.nearestNamesakeAncestor(this.identifier);
        },
    }, {
    	getClassName: function() { return "Pointer"; }
    });
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    /** @license
     * SoundManager 2: JavaScript Sound for the Web
     * ----------------------------------------------
     * http://schillmania.com/projects/soundmanager2/
     *
     * Copyright (c) 2007, Scott Schiller. All rights reserved.
     * Code provided under the BSD License:
     * http://schillmania.com/projects/soundmanager2/license.txt
     *
     * V2.97a.20110424
     */
    
    /*jslint white: false, onevar: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, regexp: false, newcap: true, immed: true */
    /*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio */
    
    (function(window) {
    
    var soundManager = null;
    
    function SoundManager(smURL, smID) {
    
      this.flashVersion = 8;             // version of flash to require, either 8 or 9. Some API features require Flash 9.
      this.debugMode = false;             // enable debugging output (div#soundmanager-debug, OR console if available+configured)
      this.debugFlash = false;           // enable debugging output inside SWF, troubleshoot Flash/browser issues
      this.useConsole = false;            // use firebug/safari console.log()-type debug console if available
      this.consoleOnly = true;          // if console is being used, do not create/write to #soundmanager-debug
      this.waitForWindowLoad = false;    // force SM2 to wait for window.onload() before trying to call soundManager.onload()
      this.nullURL = 'about:blank';      // path to "null" (empty) MP3 file, used to unload sounds (Flash 8 only)
      this.allowPolling = true;          // allow flash to poll for status update (required for whileplaying() events, peak, sound spectrum functions to work.)
      this.useFastPolling = false;       // uses lower flash timer interval for higher callback frequency, best combined with useHighPerformance
      this.useMovieStar = true;          // enable support for Flash 9.0r115+ (codename "MovieStar") MPEG4 audio formats (AAC, M4V, FLV, MOV etc.)
      this.bgColor = '#ffffff';          // movie (.swf) background color, eg. '#000000'
      this.useHighPerformance = false;   // position:fixed flash movie can help increase js/flash speed, minimize lag
      this.flashPollingInterval = null;  // msec for polling interval. Defaults to 50 unless useFastPolling = true.
      this.flashLoadTimeout = 1000;      // msec to wait for flash movie to load before failing (0 = infinity)
      this.wmode = null;                 // string: flash rendering mode - null, transparent, opaque (last two allow layering of HTML on top)
      this.allowScriptAccess = 'always'; // for scripting the SWF (object/embed property), either 'always' or 'sameDomain'
      this.useFlashBlock = false;        // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
      this.useHTML5Audio = false;        // Beta feature: Use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (no MP3/MP4.) Ideally, transparent vs. Flash API where possible.
      this.html5Test = /^probably$/i;    // HTML5 Audio().canPlayType() test. /^(probably|maybe)$/i if you want to be more liberal/risky.
      this.useGlobalHTML5Audio = true;   // (experimental) if true, re-use single HTML5 audio object across all sounds. Enabled by default on mobile devices/iOS.
      this.requireFlash = false;         // (experimental) if true, prevents "HTML5-only" mode when flash present. Allows flash to handle RTMP/serverURL, but HTML5 for other cases
    
      this.audioFormats = {
        // determines HTML5 support, flash requirements
        // eg. if MP3 or MP4 required, Flash fallback is used if HTML5 can't play it
        // shotgun approach to MIME testing due to browser variance
        'mp3': {
          'type': ['audio/mpeg; codecs="mp3"','audio/mpeg','audio/mp3','audio/MPA','audio/mpa-robust'],
          'required': true
        },
        'mp4': {
          'related': ['aac','m4a'], // additional formats under the MP4 container
          'type': ['audio/mp4; codecs="mp4a.40.2"','audio/aac','audio/x-m4a','audio/MP4A-LATM','audio/mpeg4-generic'],
          'required': true
        },
        'ogg': {
          'type': ['audio/ogg; codecs=vorbis'],
          'required': false
        },
        'wav': {
          'type': ['audio/wav; codecs="1"','audio/wav','audio/wave','audio/x-wav'],
          'required': false
        }
      };
    
      this.defaultOptions = {
        'autoLoad': false,             // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
        'stream': true,                // allows playing before entire file has loaded (recommended)
        'autoPlay': false,             // enable playing of file as soon as possible (much faster if "stream" is true)
        'loops': 1,                    // how many times to repeat the sound (position will wrap around to 0, setPosition() will break out of loop when >0)
        'onid3': null,                 // callback function for "ID3 data is added/available"
        'onload': null,                // callback function for "load finished"
        'whileloading': null,          // callback function for "download progress update" (X of Y bytes received)
        'onplay': null,                // callback for "play" start
        'onpause': null,               // callback for "pause"
        'onresume': null,              // callback for "resume" (pause toggle)
        'whileplaying': null,          // callback during play (position update)
        'onstop': null,                // callback for "user stop"
        'onfailure': null,             // callback function for when playing fails
        'onfinish': null,              // callback function for "sound finished playing"
        'onbeforefinish': null,        // callback for "before sound finished playing (at [time])"
        'onbeforefinishtime': 5000,    // offset (milliseconds) before end of sound to trigger beforefinish (eg. 1000 msec = 1 second)
        'onbeforefinishcomplete': null,// function to call when said sound finishes playing
        'onjustbeforefinish': null,    // callback for [n] msec before end of current sound
        'onjustbeforefinishtime': 200, // [n] - if not using, set to 0 (or null handler) and event will not fire.
        'multiShot': true,             // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
        'multiShotEvents': false,      // fire multiple sound events (currently onfinish() only) when multiShot is enabled
        'position': null,              // offset (milliseconds) to seek to within loaded sound data.
        'pan': 0,                      // "pan" settings, left-to-right, -100 to 100
        'type': null,                  // MIME-like hint for file pattern / canPlay() tests, eg. audio/mp3
        'usePolicyFile': false,        // enable crossdomain.xml request for audio on remote domains (for ID3/waveform access)
        'volume': 100                  // self-explanatory. 0-100, the latter being the max.
      };
    
      this.flash9Options = {      // flash 9-only options, merged into defaultOptions if flash 9 is being used
        'isMovieStar': null,      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
        'usePeakData': false,     // enable left/right channel peak (level) data
        'useWaveformData': false, // enable sound spectrum (raw waveform data) - WARNING: CPU-INTENSIVE: may set CPUs on fire.
        'useEQData': false,       // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
        'onbufferchange': null,   // callback for "isBuffering" property change
        'ondataerror': null       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
      };
    
      this.movieStarOptions = { // flash 9.0r115+ MPEG4 audio options, merged into defaultOptions if flash 9+movieStar mode is enabled
        'bufferTime': 3,        // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try increasing.)
        'serverURL': null,      // rtmp: FMS or FMIS server to connect to, required when requesting media via RTMP or one of its variants
        'onconnect': null,      // rtmp: callback for connection to flash media server
        'duration': null        // rtmp: song duration (msec)
      };
    
      this.version = null;
      this.versionNumber = 'V2.97a.20110424';
      this.movieURL = null;
      this.url = (smURL || null);
      this.altURL = null;
      this.swfLoaded = false;
      this.enabled = false;
      this.o = null;
      this.movieID = 'sm2-container';
      this.id = (smID || 'sm2movie');
      this.swfCSS = {
        'swfBox': 'sm2-object-box',
        'swfDefault': 'movieContainer',
        'swfError': 'swf_error', // SWF loaded, but SM2 couldn't start (other error)
        'swfTimedout': 'swf_timedout',
        'swfLoaded': 'swf_loaded',
        'swfUnblocked': 'swf_unblocked', // or loaded OK
        'sm2Debug': 'sm2_debug',
        'highPerf': 'high_performance',
        'flashDebug': 'flash_debug'
      };
      this.oMC = null;
      this.sounds = {};
      this.soundIDs = [];
      this.muted = false;
      this.debugID = 'soundmanager-debug';
      this.debugURLParam = /([#?&])debug=1/i;
      this.specialWmodeCase = false;
      this.didFlashBlock = false;
    
      this.filePattern = null;
      this.filePatterns = {
        'flash8': /\.mp3(\?.*)?$/i,
        'flash9': /\.mp3(\?.*)?$/i
      };
    
      this.baseMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // mp3
      this.netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // mp3, mp4, aac etc.
      this.netStreamTypes = ['aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'mp4v', '3gp', '3g2']; // Flash v9.0r115+ "moviestar" formats
      this.netStreamPattern = new RegExp('\\.(' + this.netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
      this.mimePattern = this.baseMimeTypes;
    
      this.features = {
        'buffering': false,
        'peakData': false,
        'waveformData': false,
        'eqData': false,
        'movieStar': false
      };
    
      this.sandbox = {
        // <d>
        'type': null,
        'types': {
          'remote': 'remote (domain-based) rules',
          'localWithFile': 'local with file access (no internet access)',
          'localWithNetwork': 'local with network (internet access only, no local access)',
          'localTrusted': 'local, trusted (local+internet access)'
        },
        'description': null,
        'noRemote': null,
        'noLocal': null
        // </d>
      };
    
      this.hasHTML5 = null; // switch for handling logic
      this.html5 = { // stores canPlayType() results, etc. treat as read-only.
        // mp3: boolean
        // mp4: boolean
        'usingFlash': null // set if/when flash fallback is needed
      };
      this.ignoreFlash = false; // used for special cases (eg. iPad/iPhone/palm OS?)
    
      // --- private SM2 internals ---
    
      var SMSound,
      _s = this, _sm = 'soundManager', _smc = _sm+'::', _h5 = 'HTML5::', _id, _ua = navigator.userAgent, _win = window, _wl = _win.location.href.toString(), _fV = this.flashVersion, _doc = document, _doNothing, _init, _on_queue = [], _debugOpen = true, _debugTS, _didAppend = false, _appendSuccess = false, _didInit = false, _disabled = false, _windowLoaded = false, _wDS, _wdCount = 0, _initComplete, _mixin, _addOnEvent, _processOnEvents, _initUserOnload, _go, _delayWaitForEI, _waitForEI, _setVersionInfo, _handleFocus, _beginInit, _strings, _initMovie, _dcLoaded, _didDCLoaded, _getDocument, _createMovie, _die, _setPolling, _debugLevels = ['log', 'info', 'warn', 'error'], _defaultFlashVersion = 8, _disableObject, _failSafely, _normalizeMovieURL, _oRemoved = null, _oRemovedHTML = null, _str, _flashBlockHandler, _getSWFCSS, _toggleDebug, _loopFix, _policyFix, _complain, _idCheck, _waitingForEI = false, _initPending = false, _smTimer, _onTimer, _startTimer, _stopTimer, _needsFlash = null, _featureCheck, _html5OK, _html5Only = false, _html5CanPlay, _html5Ext,  _dcIE, _testHTML5, _event, _slice = Array.prototype.slice, _useGlobalHTML5Audio = false, _hasFlash, _detectFlash, _badSafariFix,
      _is_pre = _ua.match(/pre\//i), _is_iDevice = _ua.match(/(ipad|iphone|ipod)/i), _isMobile = (_ua.match(/mobile/i) || _is_pre || _is_iDevice), _isIE = _ua.match(/msie/i), _isWebkit = _ua.match(/webkit/i), _isSafari = (_ua.match(/safari/i) && !_ua.match(/chrome/i)), _isOpera = (_ua.match(/opera/i)), 
      _isBadSafari = (!_wl.match(/usehtml5audio/i) && !_wl.match(/sm2\-ignorebadua/i) && _isSafari && _ua.match(/OS X 10_6_([3-9])/i)), // Safari 4 and 5 occasionally fail to load/play HTML5 audio on Snow Leopard due to bug(s) in QuickTime X and/or other underlying frameworks. :/ Known Apple "radar" bug. https://bugs.webkit.org/show_bug.cgi?id=32159
      _hasConsole = (typeof console !== 'undefined' && typeof console.log !== 'undefined'), _isFocused = (typeof _doc.hasFocus !== 'undefined'?_doc.hasFocus():null), _tryInitOnFocus = (typeof _doc.hasFocus === 'undefined' && _isSafari), _okToDisable = !_tryInitOnFocus;
    
      this._use_maybe = (_wl.match(/sm2\-useHTML5Maybe\=1/i)); // temporary feature: #sm2-useHTML5Maybe=1 forces loose canPlay() check
      this._overHTTP = (_doc.location?_doc.location.protocol.match(/http/i):null);
      this._http = (!this._overHTTP ? 'http:' : '');
      this.useAltURL = !this._overHTTP; // use altURL if not "online"
      this._global_a = null;
    
      if (_is_iDevice || _is_pre) {
        // during HTML5 beta period (off by default), may as well force it on Apple + Palm, flash support unlikely
        _s.useHTML5Audio = true;
        _s.ignoreFlash = true;
        if (_s.useGlobalHTML5Audio) {
          _useGlobalHTML5Audio = true;
        }
      }
    
      if (_is_pre || this._use_maybe) {
        // less-strict canPlayType() checking option
        _s.html5Test = /^(probably|maybe)$/i;
      }
    
      // Temporary feature: allow force of HTML5 via URL: #sm2-usehtml5audio=0 or 1
      // <d>
      (function(){
        var a = '#sm2-usehtml5audio=', l = _wl, b = null;
        if (l.indexOf(a) !== -1) {
          b = (l.charAt(l.indexOf(a)+a.length) === '1');
          if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
            console.log((b?'Enabling ':'Disabling ')+'useHTML5Audio via URL parameter');
          }
          _s.useHTML5Audio = b;
        }
      }());
      // </d>
    
      // --- public API methods ---
    
      this.ok = function() {
        return (_needsFlash?(_didInit && !_disabled):(_s.useHTML5Audio && _s.hasHTML5));
      };
    
      this.supported = this.ok; // legacy
    
      this.getMovie = function(smID) {
        return _isIE?_win[smID]:(_isSafari?_id(smID) || _doc[smID]:_id(smID));
      };
    
      this.createSound = function(oOptions) {
        var _cs = _sm+'.createSound(): ',
        thisOptions = null, oSound = null, _tO = null;
        if (!_didInit || !_s.ok()) {
          _complain(_cs + _str(!_didInit?'notReady':'notOK'));
          return false;
        }
        if (arguments.length === 2) {
          // function overloading in JS! :) ..assume simple createSound(id,url) use case
          oOptions = {
            'id': arguments[0],
            'url': arguments[1]
          };
        }
        thisOptions = _mixin(oOptions); // inherit from defaultOptions
        _tO = thisOptions; // alias
        // <d>
        if (_tO.id.toString().charAt(0).match(/^[0-9]$/)) {
          _s._wD(_cs + _str('badID', _tO.id), 2);
        }
        _s._wD(_cs + _tO.id + ' (' + _tO.url + ')', 1);
        // </d>
        if (_idCheck(_tO.id, true)) {
          _s._wD(_cs + _tO.id + ' exists', 1);
          return _s.sounds[_tO.id];
        }
    
        function make() {
          thisOptions = _loopFix(thisOptions);
          _s.sounds[_tO.id] = new SMSound(_tO);
          _s.soundIDs.push(_tO.id);
          return _s.sounds[_tO.id];
        }
    
        if (_html5OK(_tO)) {
          oSound = make();
          _s._wD('Loading sound '+_tO.id+' via HTML5');
          oSound._setup_html5(_tO);
        } else {
          if (_fV > 8 && _s.useMovieStar) {
            if (_tO.isMovieStar === null) {
              _tO.isMovieStar = ((_tO.serverURL || (_tO.type?_tO.type.match(_s.netStreamPattern):false)||_tO.url.match(_s.netStreamPattern))?true:false);
            }
            if (_tO.isMovieStar) {
              _s._wD(_cs + 'using MovieStar handling');
            }
            if (_tO.isMovieStar) {
              if (_tO.usePeakData) {
                _wDS('noPeak');
                _tO.usePeakData = false;
              }
              if (_tO.loops > 1) {
                _wDS('noNSLoop');
              }
            }
          }
          _tO = _policyFix(_tO, _cs);
          oSound = make();
          if (_fV === 8) {
            _s.o._createSound(_tO.id, _tO.onjustbeforefinishtime, _tO.loops||1, _tO.usePolicyFile);
          } else {
            _s.o._createSound(_tO.id, _tO.url, _tO.onjustbeforefinishtime, _tO.usePeakData, _tO.useWaveformData, _tO.useEQData, _tO.isMovieStar, (_tO.isMovieStar?_tO.bufferTime:false), _tO.loops||1, _tO.serverURL, _tO.duration||null, _tO.autoPlay, true, _tO.autoLoad, _tO.usePolicyFile);
            if (!_tO.serverURL) {
              // We are connected immediately
              oSound.connected = true;
              if (_tO.onconnect) {
                _tO.onconnect.apply(oSound);
              }
            }
          }
    
          if ((_tO.autoLoad || _tO.autoPlay) && !_tO.serverURL) {
            oSound.load(_tO); // call load for non-rtmp streams
          }
        }
    
        if (_tO.autoPlay && !_tO.serverURL) { // rtmp will play in onconnect
          oSound.play();
        }
        return oSound;
      };
    
      this.destroySound = function(sID, _bFromSound) {
        // explicitly destroy a sound before normal page unload, etc.
        if (!_idCheck(sID)) {
          return false;
        }
        var oS = _s.sounds[sID], i;
        oS._iO = {}; // Disable all callbacks while the sound is being destroyed
        oS.stop();
        oS.unload();
        for (i = 0; i < _s.soundIDs.length; i++) {
          if (_s.soundIDs[i] === sID) {
            _s.soundIDs.splice(i, 1);
            break;
          }
        }
        if (!_bFromSound) {
          // ignore if being called from SMSound instance
          oS.destruct(true);
        }
        oS = null;
        delete _s.sounds[sID];
        return true;
      };
    
      this.load = function(sID, oOptions) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].load(oOptions);
      };
    
      this.unload = function(sID) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].unload();
      };
    
      this.play = function(sID, oOptions) {
        var fN = _sm+'.play(): ';
        if (!_didInit || !_s.ok()) {
          _complain(fN + _str(!_didInit?'notReady':'notOK'));
          return false;
        }
        if (!_idCheck(sID)) {
          if (!(oOptions instanceof Object)) {
            oOptions = {
              url: oOptions
            }; // overloading use case: play('mySound','/path/to/some.mp3');
          }
          if (oOptions && oOptions.url) {
            // overloading use case, create+play: .play('someID',{url:'/path/to.mp3'});
            _s._wD(fN + 'attempting to create "' + sID + '"', 1);
            oOptions.id = sID;
            return _s.createSound(oOptions).play();
          } else {
            return false;
          }
        }
        return _s.sounds[sID].play(oOptions);
      };
    
      this.start = this.play; // just for convenience
    
      this.setPosition = function(sID, nMsecOffset) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].setPosition(nMsecOffset);
      };
    
      this.stop = function(sID) {
        if (!_idCheck(sID)) {
          return false;
        }
        _s._wD(_sm+'.stop(' + sID + ')', 1);
        return _s.sounds[sID].stop();
      };
    
      this.stopAll = function() {
        _s._wD(_sm+'.stopAll()', 1);
        for (var oSound in _s.sounds) {
          if (_s.sounds[oSound] instanceof SMSound) {
            _s.sounds[oSound].stop(); // apply only to sound objects
          }
        }
      };
    
      this.pause = function(sID) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].pause();
      };
    
      this.pauseAll = function() {
        for (var i = _s.soundIDs.length; i--;) {
          _s.sounds[_s.soundIDs[i]].pause();
        }
      };
    
      this.resume = function(sID) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].resume();
      };
    
      this.resumeAll = function() {
        for (var i = _s.soundIDs.length; i--;) {
          _s.sounds[_s.soundIDs[i]].resume();
        }
      };
    
      this.togglePause = function(sID) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].togglePause();
      };
    
      this.setPan = function(sID, nPan) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].setPan(nPan);
      };
    
      this.setVolume = function(sID, nVol) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].setVolume(nVol);
      };
    
      this.mute = function(sID) {
        var fN = _sm+'.mute(): ',
        i = 0;
        if (typeof sID !== 'string') {
          sID = null;
        }
        if (!sID) {
          _s._wD(fN + 'Muting all sounds');
          for (i = _s.soundIDs.length; i--;) {
            _s.sounds[_s.soundIDs[i]].mute();
          }
          _s.muted = true;
        } else {
          if (!_idCheck(sID)) {
            return false;
          }
          _s._wD(fN + 'Muting "' + sID + '"');
          return _s.sounds[sID].mute();
        }
        return true;
      };
    
      this.muteAll = function() {
        _s.mute();
      };
    
      this.unmute = function(sID) {
        var fN = _sm+'.unmute(): ', i;
        if (typeof sID !== 'string') {
          sID = null;
        }
        if (!sID) {
          _s._wD(fN + 'Unmuting all sounds');
          for (i = _s.soundIDs.length; i--;) {
            _s.sounds[_s.soundIDs[i]].unmute();
          }
          _s.muted = false;
        } else {
          if (!_idCheck(sID)) {
            return false;
          }
          _s._wD(fN + 'Unmuting "' + sID + '"');
          return _s.sounds[sID].unmute();
        }
        return true;
      };
    
      this.unmuteAll = function() {
        _s.unmute();
      };
    
      this.toggleMute = function(sID) {
        if (!_idCheck(sID)) {
          return false;
        }
        return _s.sounds[sID].toggleMute();
      };
    
      this.getMemoryUse = function() {
        if (_fV === 8) {
          return 0;
        }
        if (_s.o) {
          return parseInt(_s.o._getMemoryUse(), 10);
        }
      };
    
      this.disable = function(bNoDisable) {
        // destroy all functions
        if (typeof bNoDisable === 'undefined') {
          bNoDisable = false;
        }
        if (_disabled) {
          return false;
        }
        _disabled = true;
        _wDS('shutdown', 1);
        for (var i = _s.soundIDs.length; i--;) {
          _disableObject(_s.sounds[_s.soundIDs[i]]);
        }
        _initComplete(bNoDisable); // fire "complete", despite fail
        _event.remove(_win, 'load', _initUserOnload);
        return true;
      };
    
      this.canPlayMIME = function(sMIME) {
        var result;
        if (_s.hasHTML5) {
          result = _html5CanPlay({type:sMIME});
        }
        if (!_needsFlash || result) {
          // no flash, or OK
          return result;
        } else {
          return (sMIME?(sMIME.match(_s.mimePattern)?true:false):null);
        }
      };
    
      this.canPlayURL = function(sURL) {
        var result;
        if (_s.hasHTML5) {
          result = _html5CanPlay(sURL);
        }
        if (!_needsFlash || result) {
          // no flash, or OK
          return result;
        } else {
          return (sURL?(sURL.match(_s.filePattern)?true:false):null);
        }
      };
    
      this.canPlayLink = function(oLink) {
        if (typeof oLink.type !== 'undefined' && oLink.type) {
          if (_s.canPlayMIME(oLink.type)) {
            return true;
          }
        }
        return _s.canPlayURL(oLink.href);
      };
    
      this.getSoundById = function(sID, suppressDebug) {
        if (!sID) {
          throw new Error(_sm+'.getSoundById(): sID is null/undefined');
        }
        var result = _s.sounds[sID];
        if (!result && !suppressDebug) {
          _s._wD('"' + sID + '" is an invalid sound ID.', 2);
        }
        return result;
      };
    
      this.onready = function(oMethod, oScope) {
        var sType = 'onready';
        if (oMethod && oMethod instanceof Function) {
          if (_didInit) {
            _wDS('queue', sType);
          }
          if (!oScope) {
            oScope = _win;
          }
          _addOnEvent(sType, oMethod, oScope);
          _processOnEvents();
          return true;
        } else {
          throw _str('needFunction', sType);
        }
      };
    
      this.ontimeout = function(oMethod, oScope) {
        var sType = 'ontimeout';
        if (oMethod && oMethod instanceof Function) {
          if (_didInit) {
            _wDS('queue');
          }
          if (!oScope) {
            oScope = _win;
          }
          _addOnEvent(sType, oMethod, oScope);
          _processOnEvents({type:sType});
          return true;
        } else {
          throw _str('needFunction', sType);
        }
      };
    
      this.getMoviePercent = function() {
        return (_s.o && typeof _s.o.PercentLoaded !== 'undefined'?_s.o.PercentLoaded():null);
      };
    
      this._writeDebug = function(sText, sType, bTimestamp) {
        // pseudo-private console.log()-style output
        // <d>
        var sDID = 'soundmanager-debug', o, oItem, sMethod;
        if (!_s.debugMode) {
          return false;
        }
        if (typeof bTimestamp !== 'undefined' && bTimestamp) {
          sText = sText + ' | ' + new Date().getTime();
        }
        if (_hasConsole && _s.useConsole) {
          sMethod = _debugLevels[sType];
          if (typeof console[sMethod] !== 'undefined') {
            console[sMethod](sText);
          } else {
            console.log(sText);
          }
          if (_s.useConsoleOnly) {
            return true;
          }
        }
        try {
          o = _id(sDID);
          if (!o) {
            return false;
          }
          oItem = _doc.createElement('div');
          if (++_wdCount % 2 === 0) {
            oItem.className = 'sm2-alt';
          }
          if (typeof sType === 'undefined') {
            sType = 0;
          } else {
            sType = parseInt(sType, 10);
          }
          oItem.appendChild(_doc.createTextNode(sText));
          if (sType) {
            if (sType >= 2) {
              oItem.style.fontWeight = 'bold';
            }
            if (sType === 3) {
              oItem.style.color = '#ff3333';
            }
          }
          // o.appendChild(oItem); // top-to-bottom
          o.insertBefore(oItem, o.firstChild); // bottom-to-top
        } catch(e) {
          // oh well
        }
        o = null;
        // </d>
        return true;
      };
      this._wD = this._writeDebug; // alias
    
      this._debug = function() {
        // <d>
        _wDS('currentObj', 1);
        for (var i = 0, j = _s.soundIDs.length; i < j; i++) {
          _s.sounds[_s.soundIDs[i]]._debug();
        }
        // </d>
      };
    
      this.reboot = function() {
        // attempt to reset and init SM2
        _s._wD(_sm+'.reboot()');
        if (_s.soundIDs.length) {
          _s._wD('Destroying ' + _s.soundIDs.length + ' SMSound objects...');
        }
        var i, j;
        for (i = _s.soundIDs.length; i--;) {
          _s.sounds[_s.soundIDs[i]].destruct();
        }
        // trash ze flash
        try {
          if (_isIE) {
            _oRemovedHTML = _s.o.innerHTML;
          }
          _oRemoved = _s.o.parentNode.removeChild(_s.o);
          _s._wD('Flash movie removed.');
        } catch(e) {
          // uh-oh.
          _wDS('badRemove', 2);
        }
        // actually, force recreate of movie.
        _oRemovedHTML = _oRemoved = null;
        _s.enabled = _didInit = _waitingForEI = _initPending = _didAppend = _appendSuccess = _disabled = _s.swfLoaded = false;
        _s.soundIDs = _s.sounds = [];
        _s.o = null;
        for (i in _on_queue) {
          if (_on_queue.hasOwnProperty(i)) {
            for (j = _on_queue[i].length; j--;) {
              _on_queue[i][j].fired = false;
            }
          }
        }
        _s._wD(_sm + ': Rebooting...');
        _win.setTimeout(function() {
          _s.beginDelayedInit();
        }, 20);
      };
    
      this.destruct = function() {
        _s._wD(_sm+'.destruct()');
        _s.disable(true);
      };
    
      this.beginDelayedInit = function() {
        // _s._wD(_sm+'.beginDelayedInit()');
        _windowLoaded = true;
       _dcLoaded();
        setTimeout(_beginInit, 20);
        _delayWaitForEI();
      };
    
    
      // Wrap html5 event handlers so we don't call them on destroyed sounds
      function _html5_event(oFn) {
        return function(e) {
          if (!this._t || !this._t._a) {
            if (this._t && this._t.sID) {
              _s._wD(_h5+'ignoring '+e.type+': '+this._t.sID);
            } else {
              _s._wD(_h5+'ignoring '+e.type);
            }
            return null;
          } else {
            return oFn.call(this, e);
          }
        };
      }
    
      this._html5_events = {
    
        // HTML5 event-name-to-handler map
        abort: _html5_event(function(e) {
          _s._wD(_h5+'abort: '+this._t.sID);
        }),
    
        // enough has loaded to play
        canplay: _html5_event(function(e) {
          _s._wD(_h5+'canplay: '+this._t.sID+', '+this._t.url);
          this._t._onbufferchange(0);
          var position1K = (!isNaN(this._t.position)?this._t.position/1000:null);
          // set the position if position was set before the sound loaded
          this._t._html5_canplay = true;
          if (this._t.position && this.currentTime !== position1K) {
            _s._wD(_h5+'canplay: setting position to '+position1K+'');
            try {
              this.currentTime = position1K;
            } catch(ee) {
              _s._wD(_h5+'setting position failed: '+ee.message, 2);
            }
          }
        }),
    
        load: _html5_event(function(e) {
          if (!this._t.loaded) {
            this._t._onbufferchange(0);
            // should be 1, and the same
            this._t._whileloading(this._t.bytesTotal, this._t.bytesTotal, this._t._get_html5_duration());
            this._t._onload(true);
          }
        }),
    
        emptied: _html5_event(function(e) {
          _s._wD(_h5+'emptied: '+this._t.sID);
        }),
    
        ended: _html5_event(function(e) {
          _s._wD(_h5+'ended: '+this._t.sID);
          this._t._onfinish();
        }),
    
        error: _html5_event(function(e) {
          _s._wD(_h5+'error: '+this.error.code);
          // call load with error state?
          this._t._onload(false);
        }),
    
        loadeddata: _html5_event(function(e) {
          _s._wD(_h5+'loadeddata: '+this._t.sID);
        }),
    
        loadedmetadata: _html5_event(function(e) {
          _s._wD(_h5+'loadedmetadata: '+this._t.sID);
        }),
    
        loadstart: _html5_event(function(e) {
          _s._wD(_h5+'loadstart: '+this._t.sID);
          // assume buffering at first
          this._t._onbufferchange(1);
        }),
    
        play: _html5_event(function(e) {
          _s._wD(_h5+'play: '+this._t.sID+', '+this._t.url);
          // once play starts, no buffering
          this._t._onbufferchange(0);
        }),
    
        // TODO: verify if this is actually implemented anywhere yet.
        playing: _html5_event(function(e) {
          _s._wD(_h5+'playing: '+this._t.sID+', '+this._t.url);
          // once play starts, no buffering
          this._t._onbufferchange(0);
        }),
    
        progress: _html5_event(function(e) {
    
          if (this._t.loaded) {
            return false;
          }
    
          var i, j, str, loadSum = 0, buffered = 0,
              isProgress = (e.type === 'progress'),
              ranges = e.target.buffered,
              loaded = (e.loaded||0), // firefox 3.6 implements e.loaded/total (bytes)
              total = (e.total||1);
    
          if (ranges && ranges.length) {
    
            // if loaded is 0, try TimeRanges implementation as % of load
            // https://developer.mozilla.org/en/DOM/TimeRanges
            for (i=ranges.length; i--;) {
              buffered = (ranges.end(i) - ranges.start(i));
            }
    
            // linear case, buffer sum; does not account for seeking and HTTP partials / byte ranges
            loaded = buffered/e.target.duration;
    
            // <d>
            if (isProgress && ranges.length > 1) {
              str = [];
              j = ranges.length;
              for (i=0; i<j; i++) {
                str.push(e.target.buffered.start(i) +'-'+ e.target.buffered.end(i));
              }
              _s._wD(_h5+'progress: timeRanges: '+str.join(', '));
            }
            // </d>
    
            if (isProgress && !isNaN(loaded)) {
              _s._wD(_h5+'progress: '+this._t.sID+': ' + Math.floor(loaded*100)+'% loaded');
            }
    
          }
    
          if (!isNaN(loaded)) {
    
            this._t._onbufferchange(0); // if progress, likely not buffering
            this._t._whileloading(loaded, total, this._t._get_html5_duration());
    
            if (loaded && total && loaded === total) {
              // in case "onload" doesn't fire (eg. gecko 1.9.2)
              _s._html5_events.load.call(this, e);
            }
    
          }
    
        }),
    
        ratechange: _html5_event(function(e) {
          _s._wD(_h5+'ratechange: '+this._t.sID);
        }),
    
        suspend: _html5_event(function(e) {
          // download paused/stopped, may have finished (eg. onload)
          _s._wD(_h5+'suspend: '+this._t.sID);
          _s._html5_events.progress.call(this, e);
        }),
    
        stalled: _html5_event(function(e) {
          _s._wD(_h5+'stalled: '+this._t.sID);
        }),
    
        timeupdate: _html5_event(function(e) {
          this._t._onTimer();
        }),
    
        waiting: _html5_event(function(e) { // see also: seeking
          _s._wD(_h5+'waiting: '+this._t.sID);
          // playback faster than download rate, etc.
          this._t._onbufferchange(1);
        })
    
      };
    
      // --- SMSound (sound object) instance ---
    
      SMSound = function(oOptions) {
        var _t = this, _resetProperties, _stop_html5_timer, _start_html5_timer;
        this.sID = oOptions.id;
        this.url = oOptions.url;
        this.options = _mixin(oOptions);
        this.instanceOptions = this.options; // per-play-instance-specific options
        this._iO = this.instanceOptions; // short alias
        // assign property defaults
        this.pan = this.options.pan;
        this.volume = this.options.volume;
        this._lastURL = null;
        this.isHTML5 = false;
        this._a = null;
    
        // --- public methods ---
    
        this.id3 = {};
    
        this._debug = function() {
          // <d>
          // pseudo-private console.log()-style output
          if (_s.debugMode) {
            var stuff = null, msg = [], sF, sfBracket, maxLength = 64;
            for (stuff in _t.options) {
              if (_t.options[stuff] !== null) {
                if (_t.options[stuff] instanceof Function) {
                  // handle functions specially
                  sF = _t.options[stuff].toString();
                  sF = sF.replace(/\s\s+/g, ' '); // normalize spaces
                  sfBracket = sF.indexOf('{');
                  msg.push(' ' + stuff + ': {' + sF.substr(sfBracket + 1, (Math.min(Math.max(sF.indexOf('\n') - 1, maxLength), maxLength))).replace(/\n/g, '') + '... }');
                } else {
                  msg.push(' ' + stuff + ': ' + _t.options[stuff]);
                }
              }
            }
            _s._wD('SMSound() merged options: {\n' + msg.join(', \n') + '\n}');
          }
          // </d>
        };
    
        this._debug();
    
        this.load = function(oOptions) {
          var oS = null;
          if (typeof oOptions !== 'undefined') {
            _t._iO = _mixin(oOptions, _t.options);
            _t.instanceOptions = _t._iO;
          } else {
            oOptions = _t.options;
            _t._iO = oOptions;
            _t.instanceOptions = _t._iO;
            if (_t._lastURL && _t._lastURL !== _t.url) {
              _wDS('manURL');
              _t._iO.url = _t.url;
              _t.url = null;
            }
          }
          if (!_t._iO.url) {
            _t._iO.url = _t.url;
          }
          _s._wD('SMSound.load(): ' + _t._iO.url, 1);
          if (_t._iO.url === _t.url && _t.readyState !== 0 && _t.readyState !== 2) {
            _wDS('onURL', 1);
            return _t;
          }
          _t._lastURL = _t.url;
          _t.loaded = false;
          _t.readyState = 1;
          _t.playState = 0;
          if (_html5OK(_t._iO)) {
            oS = _t._setup_html5(_t._iO);
            if (!oS._called_load) {
              _s._wD(_h5+'load: '+_t.sID);
              oS.load();
              oS._called_load = true;
              if (_t._iO.autoPlay) {
                _t.play();
              }
            } else {
              _s._wD('HTML5 ignoring request to load again: '+_t.sID);
            }
          } else {
            try {
              _t.isHTML5 = false;
              _t._iO = _policyFix(_loopFix(_t._iO));
              if (_fV === 8) {
                _s.o._load(_t.sID, _t._iO.url, _t._iO.stream, _t._iO.autoPlay, (_t._iO.whileloading?1:0), _t._iO.loops||1, _t._iO.usePolicyFile);
              } else {
                _s.o._load(_t.sID, _t._iO.url, _t._iO.stream?true:false, _t._iO.autoPlay?true:false, _t._iO.loops||1, _t._iO.autoLoad?true:false, _t._iO.usePolicyFile);
              }
            } catch(e) {
              _wDS('smError', 2);
              _debugTS('onload', false);
              _die();
            }
          }
          return _t;
        };
    
        this.unload = function() {
          // Flash 8/AS2 can't "close" a stream - fake it by loading an empty MP3
          // Flash 9/AS3: Close stream, preventing further load
          if (_t.readyState !== 0) {
            _s._wD('SMSound.unload(): "' + _t.sID + '"');
            if (!_t.isHTML5) {
              if (_fV === 8) {
                _s.o._unload(_t.sID, _s.nullURL);
              } else {
                _s.o._unload(_t.sID);
              }
            } else {
              _stop_html5_timer();
              if (_t._a) {
                // abort()-style method here, stop loading? (doesn't exist?)
                _t._a.pause();
    // if (!_useGlobalHTML5Audio || (_useGlobalHTML5Audio && _t.playState)) { // if global audio, only unload if actively playing
                _t._a.src = ''; // https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
    // }
              }
            }
            // reset load/status flags
            _resetProperties();
          }
          return _t;
        };
    
        this.destruct = function(_bFromSM) {
          _s._wD('SMSound.destruct(): "' + _t.sID + '"');
          if (!_t.isHTML5) {
            // kill sound within Flash
            // Disable the onfailure handler
            _t._iO.onfailure = null;
            _s.o._destroySound(_t.sID);
          } else {
            _stop_html5_timer();
            if (_t._a) {
              // abort()-style method here, stop loading? (doesn't exist?)
              _t._a.pause();
              _t._a.src = ''; // https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
              if (!_useGlobalHTML5Audio) {
                _t._remove_html5_events();
              }
            }
          }
          if (!_bFromSM) {
            _s.destroySound(_t.sID, true); // ensure deletion from controller
          }
        };
    
        this.play = function(oOptions, _updatePlayState) {
          var fN = 'SMSound.play(): ', allowMulti;
          _updatePlayState = _updatePlayState === undefined ? true : _updatePlayState; // default true
          if (!oOptions) {
            oOptions = {};
          }
          _t._iO = _mixin(oOptions, _t._iO);
          _t._iO = _mixin(_t._iO, _t.options);
          _t.instanceOptions = _t._iO;
          if (_t._iO.serverURL) {
            if (!_t.connected) {
              if (!_t.getAutoPlay()) {
                _s._wD(fN+' Netstream not connected yet - setting autoPlay');
                _t.setAutoPlay(true);
              }
              return _t; // play will be called in _onconnect()
            }
          }
          if (_html5OK(_t._iO)) {
            _t._setup_html5(_t._iO);
            _start_html5_timer();
          }
          if (_t.playState === 1 && !_t.paused) {
            allowMulti = _t._iO.multiShot;
            if (!allowMulti) {
              _s._wD(fN + '"' + _t.sID + '" already playing (one-shot)', 1);
              return _t;
            } else {
              _s._wD(fN + '"' + _t.sID + '" already playing (multi-shot)', 1);
              if (_t.isHTML5) {
                // TODO: BUG?
                _t.setPosition(_t._iO.position);
              }
            }
          }
          if (!_t.loaded) {
            if (_t.readyState === 0) {
              _s._wD(fN + 'Attempting to load "' + _t.sID + '"', 1);
              // try to get this sound playing ASAP
              if (!_t.isHTML5) {
                _t._iO.autoPlay = true; // assign directly because setAutoPlay() increments the instanceCount
                _t.load(_t._iO);
              } else {
                _t.load(_t._iO);
                // _t.readyState = 1; // redundant
              }
            } else if (_t.readyState === 2) {
              _s._wD(fN + 'Could not load "' + _t.sID + '" - exiting', 2);
              return _t;
            } else {
              _s._wD(fN + '"' + _t.sID + '" is loading - attempting to play..', 1);
            }
          } else {
            _s._wD(fN + '"' + _t.sID + '"');
          }
          // Streams will pause when their buffer is full if they are being loaded.
          // In this case paused is true, but the song hasn't started playing yet. If
          // we just call resume() the onplay() callback will never be called.  So
          // only call resume() if the position is > 0.
          // Another reason is because options like volume won't have been applied yet.
          if (_t.paused && _t.position && _t.position > 0) { // https://gist.github.com/37b17df75cc4d7a90bf6
            _s._wD(fN + '"' + _t.sID + '" is resuming from paused state',1);
            _t.resume();
          } else {
            _s._wD(fN+'"'+ _t.sID+'" is starting to play');
            _t.playState = 1;
            _t.paused = false;
            if (!_t.instanceCount || _t._iO.multiShotEvents || (_fV > 8 && !_t.isHTML5 && !_t.getAutoPlay())) {
              _t.instanceCount++;
            }
            _t.position = (typeof _t._iO.position !== 'undefined' && !isNaN(_t._iO.position)?_t._iO.position:0);
            if (!_t.isHTML5) {
              _t._iO = _policyFix(_loopFix(_t._iO));
            }
            if (_t._iO.onplay && _updatePlayState) {
              _t._iO.onplay.apply(_t);
              _t._onplay_called = true;
            }
            _t.setVolume(_t._iO.volume, true);
            _t.setPan(_t._iO.pan, true);
            if (!_t.isHTML5) {
              _s.o._start(_t.sID, _t._iO.loops || 1, (_fV === 9?_t.position:_t.position / 1000));
            } else {
              _start_html5_timer();
              _t._setup_html5().play();
            }
          }
          return _t;
        };
    
        this.start = this.play; // just for convenience
    
        this.stop = function(bAll) {
          if (_t.playState === 1) {
            _t._onbufferchange(0);
            _t.resetOnPosition(0);
            if (!_t.isHTML5) {
              _t.playState = 0;
            }
            _t.paused = false;
            if (_t._iO.onstop) {
              _t._iO.onstop.apply(_t);
            }
            if (!_t.isHTML5) {
              _s.o._stop(_t.sID, bAll);
              // hack for netStream: just unload
              if (_t._iO.serverURL) {
                _t.unload();
              }
            } else {
              if (_t._a) {
                _t.setPosition(0); // act like Flash, though
                _t._a.pause(); // html5 has no stop()
                _t.playState = 0;
                _t._onTimer(); // and update UI
                _stop_html5_timer();
                _t.unload();
              }
            }
            _t.instanceCount = 0;
            _t._iO = {};
          }
          return _t;
        };
    
        this.setAutoPlay = function(autoPlay) {
          _s._wD('sound '+_t.sID+' turned autoplay ' + (autoPlay ? 'on' : 'off'));
          _t._iO.autoPlay = autoPlay;
          if (_t.isHTML5) {
            if (_t._a && autoPlay) {
              _t.play(); // HTML5 onload isn't reliable
            }
          } else {
            _s.o._setAutoPlay(_t.sID, autoPlay);
          }
          if (autoPlay) {
            // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)
            if (!_t.instanceCount && _t.readyState === 1) {
              _t.instanceCount++;
              _s._wD('sound '+_t.sID+' incremented instance count to '+_t.instanceCount);
            }
          }
        };
    
        this.getAutoPlay = function() {
          return _t._iO.autoPlay;
        };
    
        this.setPosition = function(nMsecOffset, bNoDebug) {
          if (nMsecOffset === undefined) {
            nMsecOffset = 0;
          }
          // Use the duration from the instance options, if we don't have a track duration yet.
          var original_pos, position, position1K, offset = (_t.isHTML5 ? Math.max(nMsecOffset,0) : Math.min(_t.duration || _t._iO.duration, Math.max(nMsecOffset, 0))); // position >= 0 and <= current available (loaded) duration
          original_pos = _t.position;
          _t.position = offset;
          position1K = _t.position/1000;
          _t.resetOnPosition(_t.position);
          _t._iO.position = offset;
          if (!_t.isHTML5) {
            position = _fV === 9 ? _t.position : position1K;
            if (_t.readyState && _t.readyState !== 2) {
              _s.o._setPosition(_t.sID, position, (_t.paused || !_t.playState)); // if paused or not playing, will not resume (by playing)
            }
          } else if (_t._a) {
            // Set the position in the canplay handler if the sound is not ready yet
            if (_t._html5_canplay) {
              if (_t._a.currentTime !== position1K) {
                // Only set the position if we need to.
                // DOM/JS errors/exceptions to watch out for:
                // if seek is beyond (loaded?) position, "DOM exception 11"
                // "INDEX_SIZE_ERR": DOM exception 1
                _s._wD('setPosition('+position1K+'): setting position');
                try {
                  _t._a.currentTime = position1K;
                } catch(e) {
                  _s._wD('setPosition('+position1K+'): setting position failed: '+e.message, 2);
                }
              }
            } else {
              _s._wD('setPosition('+position1K+'): delaying, sound not ready');
            }
          }
          if (_t.isHTML5) {
            if (_t.paused) { // if paused, refresh UI right away
              _t._onTimer(true); // force update
            }
          }
          return _t;
        };
    
        this.pause = function(bCallFlash) {
          if (_t.paused || (_t.playState === 0 && _t.readyState !== 1)) {
            return _t;
          }
          _s._wD('SMSound.pause()');
          _t.paused = true;
          if (!_t.isHTML5) {
            if (bCallFlash || bCallFlash === undefined) {
              _s.o._pause(_t.sID);
            }
          } else {
            _t._setup_html5().pause();
            _stop_html5_timer();
          }
          if (_t._iO.onpause) {
            _t._iO.onpause.apply(_t);
          }
          return _t;
        };
    
        // When auto-loaded streams pause on buffer full they have a playState of 0.
        // We need to make sure that the playState is set to 1 when these streams "resume".
        //
        // When a paused stream is resumed, we need to trigger the onplay() callback if it
        // hasn't been called already.  In this case since the sound is being played for the
        // first time, I think it's more appropriate to call onplay() rather than onresume().
        this.resume = function() {
          if (!_t.paused) {
            return _t;
          }
          _s._wD('SMSound.resume()');
          _t.paused = false;
          _t.playState = 1;
          if (!_t.isHTML5) {
            if (_t._iO.isMovieStar) {
              // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.
              _t.setPosition(_t.position);
            }
            _s.o._pause(_t.sID); // flash method is toggle-based (pause/resume)
          } else {
            _t._setup_html5().play();
            _start_html5_timer();
          }
          if (!_t._onplay_called && _t._iO.onplay) {
            _t._iO.onplay.apply(_t);
            _t._onplay_called = true;
          } else if (_t._iO.onresume) {
            _t._iO.onresume.apply(_t);
          }
          return _t;
        };
    
        this.togglePause = function() {
          _s._wD('SMSound.togglePause()');
          if (_t.playState === 0) {
            _t.play({
              position: (_fV === 9 && !_t.isHTML5 ? _t.position:_t.position / 1000)
            });
            return _t;
          }
          if (_t.paused) {
            _t.resume();
          } else {
            _t.pause();
          }
          return _t;
        };
    
        this.setPan = function(nPan, bInstanceOnly) {
          if (typeof nPan === 'undefined') {
            nPan = 0;
          }
          if (typeof bInstanceOnly === 'undefined') {
            bInstanceOnly = false;
          }
          if (!_t.isHTML5) {
            _s.o._setPan(_t.sID, nPan);
          } // else { no HTML5 pan? }
          _t._iO.pan = nPan;
          if (!bInstanceOnly) {
            _t.pan = nPan;
            _t.options.pan = nPan;
          }
          return _t;
        };
    
        this.setVolume = function(nVol, bInstanceOnly) {
          if (typeof nVol === 'undefined') {
            nVol = 100;
          }
          if (typeof bInstanceOnly === 'undefined') {
            bInstanceOnly = false;
          }
          if (!_t.isHTML5) {
            _s.o._setVolume(_t.sID, (_s.muted && !_t.muted) || _t.muted?0:nVol);
          } else if (_t._a) {
            _t._a.volume = Math.max(0, Math.min(1, nVol/100)); // valid range: 0-1
          }
          _t._iO.volume = nVol;
          if (!bInstanceOnly) {
            _t.volume = nVol;
            _t.options.volume = nVol;
          }
          return _t;
        };
    
        this.mute = function() {
          _t.muted = true;
          if (!_t.isHTML5) {
            _s.o._setVolume(_t.sID, 0);
          } else if (_t._a) {
            _t._a.muted = true;
          }
          return _t;
        };
    
        this.unmute = function() {
          _t.muted = false;
          var hasIO = typeof _t._iO.volume !== 'undefined';
          if (!_t.isHTML5) {
            _s.o._setVolume(_t.sID, hasIO?_t._iO.volume:_t.options.volume);
          } else if (_t._a) {
            _t._a.muted = false;
          }
          return _t;
        };
    
        this.toggleMute = function() {
          return (_t.muted?_t.unmute():_t.mute());
        };
    
        this.onposition = function(nPosition, oMethod, oScope) {
          // TODO: allow for ranges, too? eg. (nPosition instanceof Array)
          _t._onPositionItems.push({
            position: nPosition,
            method: oMethod,
            scope: (typeof oScope !== 'undefined'?oScope:_t),
            fired: false
          });
          return _t;
        };
    
        this.processOnPosition = function() {
          var i, item, j = _t._onPositionItems.length;
          if (!j || !_t.playState || _t._onPositionFired >= j) {
            return false;
          }
          for (i=j; i--;) {
            item = _t._onPositionItems[i];
            if (!item.fired && _t.position >= item.position) {
              item.method.apply(item.scope,[item.position]);
              item.fired = true;
              _s._onPositionFired++;
            }
          }
          return true;
        };
    
        this.resetOnPosition = function(nPosition) {
          // reset "fired" for items interested in this position
          var i, item, j = _t._onPositionItems.length;
          if (!j) {
            return false;
          }
          for (i=j; i--;) {
            item = _t._onPositionItems[i];
            if (item.fired && nPosition <= item.position) {
              item.fired = false;
              _s._onPositionFired--;
            }
          }
          return true;
        };
    
        // pseudo-private soundManager reference
    
        this._onTimer = function(bForce) {
          // HTML5-only _whileplaying() etc.
          var time, x = {};
          if (_t._hasTimer || bForce) {
            if (_t._a && (bForce || ((_t.playState > 0 || _t.readyState === 1) && !_t.paused))) { // TODO: May not need to track readyState (1 = loading)
              _t.duration = _t._get_html5_duration();
              _t.durationEstimate = _t.duration;
              time = _t._a.currentTime?_t._a.currentTime*1000:0;
              _t._whileplaying(time,x,x,x,x);
              return true;
            } else {
             _s._wD('_onTimer: Warn for "'+_t.sID+'": '+(!_t._a?'Could not find element. ':'')+(_t.playState === 0?'playState bad, 0?':'playState = '+_t.playState+', OK'));
              return false;
            }
          }
        };
    
        // --- private internals ---
    
        this._get_html5_duration = function() {
          var d = (_t._a ? _t._a.duration*1000 : (_t._iO ? _t._iO.duration : undefined));
          return (d && !isNaN(d) && d !== Infinity ? d : (_t._iO ? _t._iO.duration : null));
        };
    
        _start_html5_timer = function() {
          if (_t.isHTML5) {
            _startTimer(_t);
          }
        };
    
        _stop_html5_timer = function() {
          if (_t.isHTML5) {
            _stopTimer(_t);
          }
        };
    
        _resetProperties = function(bLoaded) {
          _t._onPositionItems = [];
          _t._onPositionFired = 0;
          _t._hasTimer = null;
          _t._onplay_called = false;
          _t._a = null;
          _t._html5_canplay = false;
          _t.bytesLoaded = null;
          _t.bytesTotal = null;
          _t.position = null;
          _t.duration = (_t._iO && _t._iO.duration?_t._iO.duration:null);
          _t.durationEstimate = null;
          _t.failures = 0;
          _t.loaded = false;
          _t.playState = 0;
          _t.paused = false;
          _t.readyState = 0; // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success
          _t.muted = false;
          _t.didBeforeFinish = false;
          _t.didJustBeforeFinish = false;
          _t.isBuffering = false;
          _t.instanceOptions = {};
          _t.instanceCount = 0;
          _t.peakData = {
            left: 0,
            right: 0
          };
          _t.waveformData = {
            left: [],
            right: []
          };
          _t.eqData = []; // legacy: 1D array
          _t.eqData.left = [];
          _t.eqData.right = [];
        };
    
        _resetProperties();
    
        // pseudo-private methods used by soundManager
    
        this._setup_html5 = function(oOptions) {
          var _iO = _mixin(_t._iO, oOptions), d = decodeURI,
              _a = _useGlobalHTML5Audio ? _s._global_a : _t._a,
              _dURL = d(_iO.url),
              _oldIO = (_a && _a._t ? _a._t.instanceOptions : null);
          if (_a) {
            if (_a._t && _oldIO.url === _iO.url && (!_t._lastURL || (_t._lastURL === _oldIO.url))) {
              return _a; // same url, ignore request
            }
            _s._wD('setting new URL on existing object: ' + _dURL + (_t._lastURL ? ', old URL: ' + _t._lastURL : ''));
            /*
             * "First things first, I, Poppa.." (reset the previous state of the old sound, if playing)
             * Fixes case with devices that can only play one sound at a time
             * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state
             */
            if (_useGlobalHTML5Audio && _a._t && _a._t.playState && _iO.url !== _oldIO.url) {
              _a._t.stop();
            }
            _resetProperties(); // new URL, so reset load/playstate and so on
            _a.src = _iO.url;
            _t.url = _iO.url;
            _t._lastURL = _iO.url;
            _a._called_load = false;
          } else {
            _s._wD('creating HTML5 Audio() element with URL: '+_dURL);
            _a = new Audio(_iO.url);
            _a._called_load = false;
            if (_useGlobalHTML5Audio) {
              _s._global_a = _a;
            }
          }
          _t.isHTML5 = true;
          _t._a = _a; // store a ref on the track
          _a._t = _t; // store a ref on the audio
          _t._add_html5_events();
          _a.loop = (_iO.loops>1?'loop':'');
          if (_iO.autoLoad || _iO.autoPlay) {
            _a.autobuffer = 'auto'; // early HTML5 implementation (non-standard)
            _a.preload = 'auto'; // standard
            _t.load();
            _a._called_load = true;
          } else {
            _a.autobuffer = false; // early HTML5 implementation (non-standard)
            _a.preload = 'none'; // standard
          }
          _a.loop = (_iO.loops>1?'loop':''); // boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop
          return _a;
        };
    
        // related private methods
    
        this._add_html5_events = function() {
          if (_t._a._added_events) {
            return false;
          }
    
          var f;
    
          function add(oEvt, oFn, bCapture) {
            return _t._a ? _t._a.addEventListener(oEvt, oFn, bCapture||false) : null;
          }
    
          _s._wD(_h5+'adding event listeners: '+_t.sID);
          _t._a._added_events = true;
    
          for (f in _s._html5_events) {
            if (_s._html5_events.hasOwnProperty(f)) {
              add(f, _s._html5_events[f]);
            }
          }
    
          return true;
        };
    
        // Keep this externally accessible
        this._remove_html5_events = function() {
          // Remove event listeners
          function remove(oEvt, oFn, bCapture) {
            return (_t._a ? _t._a.removeEventListener(oEvt, oFn, bCapture||false) : null);
          }
          _s._wD(_h5+'removing event listeners: '+_t.sID);
          _t._a._added_events = false;
    
          for (var f in _s._html5_events) {
            if (_s._html5_events.hasOwnProperty(f)) {
              remove(f, _s._html5_events[f]);
            }
          }
        };
    
        // --- "private" methods called by Flash ---
    
        this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {
          _t.bytesLoaded = nBytesLoaded;
          _t.bytesTotal = nBytesTotal;
          _t.duration = Math.floor(nDuration);
          _t.bufferLength = nBufferLength;
          if (!_t._iO.isMovieStar) {
            if (_t._iO.duration) {
              // use options, if specified and larger
              _t.durationEstimate = (_t.duration > _t._iO.duration) ? _t.duration : _t._iO.duration;
            } else {
              _t.durationEstimate = parseInt((_t.bytesTotal / _t.bytesLoaded) * _t.duration, 10);
            }
            if (_t.durationEstimate === undefined) {
              _t.durationEstimate = _t.duration;
            }
            if (_t.readyState !== 3 && _t._iO.whileloading) {
              _t._iO.whileloading.apply(_t);
            }
          } else {
            _t.durationEstimate = _t.duration;
            if (_t.readyState !== 3 && _t._iO.whileloading) {
              _t._iO.whileloading.apply(_t);
            }
          }
        };
    
        this._onid3 = function(oID3PropNames, oID3Data) {
          // oID3PropNames: string array (names)
          // ID3Data: string array (data)
          _s._wD('SMSound._onid3(): "' + this.sID + '" ID3 data received.');
          var oData = [], i, j;
          for (i = 0, j = oID3PropNames.length; i < j; i++) {
            oData[oID3PropNames[i]] = oID3Data[i];
          }
          _t.id3 = _mixin(_t.id3, oData);
          if (_t._iO.onid3) {
            _t._iO.onid3.apply(_t);
          }
        };
    
        this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {
          if (isNaN(nPosition) || nPosition === null) {
            return false; // flash safety net
          }
          if (_t.playState === 0 && nPosition > 0) {
            // invalid position edge case for end/stop
            nPosition = 0;
          }
          _t.position = nPosition;
          _t.processOnPosition();
          if (_fV > 8 && !_t.isHTML5) {
            if (_t._iO.usePeakData && typeof oPeakData !== 'undefined' && oPeakData) {
              _t.peakData = {
                left: oPeakData.leftPeak,
                right: oPeakData.rightPeak
              };
            }
            if (_t._iO.useWaveformData && typeof oWaveformDataLeft !== 'undefined' && oWaveformDataLeft) {
              _t.waveformData = {
                left: oWaveformDataLeft.split(','),
                right: oWaveformDataRight.split(',')
              };
            }
            if (_t._iO.useEQData) {
              if (typeof oEQData !== 'undefined' && oEQData && oEQData.leftEQ) {
                var eqLeft = oEQData.leftEQ.split(',');
                _t.eqData = eqLeft;
                _t.eqData.left = eqLeft;
                if (typeof oEQData.rightEQ !== 'undefined' && oEQData.rightEQ) {
                  _t.eqData.right = oEQData.rightEQ.split(',');
                }
              }
            }
          }
          if (_t.playState === 1) {
            // special case/hack: ensure buffering is false if loading from cache (and not yet started)
            if (!_t.isHTML5 && _s.flashVersion === 8 && !_t.position && _t.isBuffering) {
              _t._onbufferchange(0);
            }
            if (_t._iO.whileplaying) {
              _t._iO.whileplaying.apply(_t); // flash may call after actual finish
            }
            if ((_t.loaded || (!_t.loaded && _t._iO.isMovieStar)) && _t._iO.onbeforefinish && _t._iO.onbeforefinishtime && !_t.didBeforeFinish && _t.duration - _t.position <= _t._iO.onbeforefinishtime) {
              _t._onbeforefinish();
            }
          }
          return true;
        };
    
        // Only applies to RTMP
        this._onconnect = function(bSuccess) {
          var fN = 'SMSound._onconnect(): ';
          bSuccess = (bSuccess === 1);
          _s._wD(fN+'"'+_t.sID+'"'+(bSuccess?' connected.':' failed to connect? - '+_t.url), (bSuccess?1:2));
          _t.connected = bSuccess;
          if (bSuccess) {
            _t.failures = 0;
            if (_idCheck(_t.sID)) {
              if (_t.getAutoPlay()) {
                _t.play(undefined, _t.getAutoPlay()); // only update the play state if auto playing
              } else if (_t._iO.autoLoad) {
                _t.load();
              }
            }
            if (_t._iO.onconnect) {
              _t._iO.onconnect.apply(_t,[bSuccess]);
            }
          }
        };
    
        this._onload = function(nSuccess) {
          var fN = 'SMSound._onload(): ', loadOK = (nSuccess?true:false);
          _s._wD(fN + '"' + _t.sID + '"' + (loadOK?' loaded.':' failed to load? - ' + _t.url), (loadOK?1:2));
          // <d>
          if (!loadOK && !_t.isHTML5) {
            if (_s.sandbox.noRemote === true) {
              _s._wD(fN + _str('noNet'), 1);
            }
            if (_s.sandbox.noLocal === true) {
              _s._wD(fN + _str('noLocal'), 1);
            }
          }
          // </d>
          _t.loaded = loadOK;
          _t.readyState = loadOK?3:2;
          _t._onbufferchange(0);
          if (_t._iO.onload) {
            _t._iO.onload.apply(_t, [loadOK]);
          }
          return true;
        };
    
        // fire onfailure() only once at most
        // at this point we just recreate failed sounds rather than trying to reconnect.
        this._onfailure = function(msg, level, code) {
          _t.failures++;
          _s._wD('SMSound._onfailure(): "'+_t.sID+'" count '+_t.failures);
          if (_t._iO.onfailure && _t.failures === 1) {
            _t._iO.onfailure(_t, msg, level, code);
          } else {
            _s._wD('SMSound._onfailure(): ignoring');
          }
        };
    
        this._onbeforefinish = function() {
          if (!_t.didBeforeFinish) {
            _t.didBeforeFinish = true;
            if (_t._iO.onbeforefinish) {
              _s._wD('SMSound._onbeforefinish(): "' + _t.sID + '"');
              _t._iO.onbeforefinish.apply(_t);
            }
          }
        };
    
        this._onjustbeforefinish = function(msOffset) {
          if (!_t.didJustBeforeFinish) {
            _t.didJustBeforeFinish = true;
            if (_t._iO.onjustbeforefinish) {
              _s._wD('SMSound._onjustbeforefinish(): "' + _t.sID + '"');
              _t._iO.onjustbeforefinish.apply(_t);
            }
          }
        };
    
        this._onfinish = function() {
          // _s._wD('SMSound._onfinish(): "' + _t.sID + '" got instanceCount '+_t.instanceCount);
          var _io_onfinish = _t._iO.onfinish; // store local copy before it gets trashed..
          _t._onbufferchange(0);
          _t.resetOnPosition(0);
          if (_t._iO.onbeforefinishcomplete) {
            _t._iO.onbeforefinishcomplete.apply(_t);
          }
          // reset some state items
          _t.didBeforeFinish = false;
          _t.didJustBeforeFinish = false;
          if (_t.instanceCount) {
            _t.instanceCount--;
            if (!_t.instanceCount) {
              // reset instance options
              _t.playState = 0;
              _t.paused = false;
              _t.instanceCount = 0;
              _t.instanceOptions = {};
              _t._iO = {};
              _stop_html5_timer();
            }
            if (!_t.instanceCount || _t._iO.multiShotEvents) {
              // fire onfinish for last, or every instance
              if (_io_onfinish) {
                _s._wD('SMSound._onfinish(): "' + _t.sID + '"');
                _io_onfinish.apply(_t);
              }
            }
          }
        };
    
        this._onbufferchange = function(nIsBuffering) {
          var fN = 'SMSound._onbufferchange()';
          if (_t.playState === 0) {
            // ignore if not playing
            return false;
          }
          if ((nIsBuffering && _t.isBuffering) || (!nIsBuffering && !_t.isBuffering)) {
            return false;
          }
          _t.isBuffering = (nIsBuffering === 1);
          if (_t._iO.onbufferchange) {
            _s._wD(fN + ': ' + nIsBuffering);
            _t._iO.onbufferchange.apply(_t);
          }
          return true;
        };
    
        this._ondataerror = function(sError) {
          // flash 9 wave/eq data handler
          if (_t.playState > 0) { // hack: called at start, and end from flash at/after onfinish()
            _s._wD('SMSound._ondataerror(): ' + sError);
            if (_t._iO.ondataerror) {
              _t._iO.ondataerror.apply(_t);
            }
          }
        };
    
      }; // SMSound()
    
      // --- private SM2 internals ---
    
      _getDocument = function() {
        return (_doc.body?_doc.body:(_doc._docElement?_doc.documentElement:_doc.getElementsByTagName('div')[0]));
      };
    
      _id = function(sID) {
        return _doc.getElementById(sID);
      };
    
      _mixin = function(oMain, oAdd) {
        // non-destructive merge
        var o1 = {}, i, o2, o;
        for (i in oMain) { // clone c1
          if (oMain.hasOwnProperty(i)) {
            o1[i] = oMain[i];
          }
        }
        o2 = (typeof oAdd === 'undefined'?_s.defaultOptions:oAdd);
        for (o in o2) {
          if (o2.hasOwnProperty(o) && typeof o1[o] === 'undefined') {
            o1[o] = o2[o];
          }
        }
        return o1;
      };
    
      _event = (function() {
    
        var old = (_win.attachEvent),
        evt = {
          add: (old?'attachEvent':'addEventListener'),
          remove: (old?'detachEvent':'removeEventListener')
        };
    
        function getArgs(oArgs) {
          var args = _slice.call(oArgs), len = args.length;
          if (old) {
            args[1] = 'on' + args[1]; // prefix
            if (len > 3) {
              args.pop(); // no capture
            }
          } else if (len === 3) {
            args.push(false);
          }
          return args;
        }
    
        function apply(args, sType) {
          var element = args.shift(),
              method = [evt[sType]];
          if (old) {
            element[method](args[0], args[1]);
          } else {
            element[method].apply(element, args);
          }
        }
    
        function add() {
          apply(getArgs(arguments), 'add');
        }
    
        function remove() {
          apply(getArgs(arguments), 'remove');
        }
    
        return {
          'add': add,
          'remove': remove
        };
    
      }());
    
      _html5OK = function(iO) {
        return (!iO.serverURL && (iO.type?_html5CanPlay({type:iO.type}):_html5CanPlay(iO.url)||_html5Only)); // Use type, if specified. If HTML5-only mode, no other options, so just give 'er
      };
    
      _html5CanPlay = function(sURL) {
        // try to find MIME, test and return truthiness
        if (!_s.useHTML5Audio || !_s.hasHTML5) {
          return false;
        }
        var result, mime, offset, fileExt, item, aF = _s.audioFormats;
        if (!_html5Ext) {
          _html5Ext = [];
          for (item in aF) {
            if (aF.hasOwnProperty(item)) {
              _html5Ext.push(item);
              if (aF[item].related) {
                _html5Ext = _html5Ext.concat(aF[item].related);
              }
            }
          }
          _html5Ext = new RegExp('\\.('+_html5Ext.join('|')+')','i');
        }
        mime = (typeof sURL.type !== 'undefined'?sURL.type:null);
        fileExt = (typeof sURL === 'string'?sURL.toLowerCase().match(_html5Ext):null); // TODO: Strip URL queries, etc.
        if (!fileExt || !fileExt.length) {
          if (!mime) {
            return false;
          } else {
            // audio/mp3 -> mp3, result should be known
            offset = mime.indexOf(';');
            fileExt = (offset !== -1?mime.substr(0,offset):mime).substr(6); // strip "audio/X; codecs.."
          }
        } else {
          fileExt = fileExt[0].substr(1); // "mp3", for example
        }
        if (fileExt && typeof _s.html5[fileExt] !== 'undefined') {
          // result known
          return _s.html5[fileExt];
        } else {
          if (!mime) {
            if (fileExt && _s.html5[fileExt]) {
              return _s.html5[fileExt];
            } else {
              // best-case guess, audio/whatever-dot-filename-format-you're-playing
              mime = 'audio/'+fileExt;
            }
          }
          result = _s.html5.canPlayType(mime);
          _s.html5[fileExt] = result;
          // _s._wD('canPlayType, found result: '+result);
          return result;
        }
      };
    
      _testHTML5 = function() {
        if (!_s.useHTML5Audio || typeof Audio === 'undefined') {
          return false;
        }
        // double-whammy: Opera 9.64 throws WRONG_ARGUMENTS_ERR if no parameter passed to Audio(), and Webkit + iOS happily tries to load "null" as a URL. :/
        var a = (typeof Audio !== 'undefined' ? (_isOpera ? new Audio(null) : new Audio()) : null), item, support = {}, aF, i, _hasFlash = _detectFlash();
        function _cp(m) {
          var canPlay, i, j, isOK = false;
          if (!a || typeof a.canPlayType !== 'function') {
            return false;
          }
          if (m instanceof Array) {
            // iterate through all mime types, return any successes
            for (i=0, j=m.length; i<j && !isOK; i++) {
              if (_s.html5[m[i]] || a.canPlayType(m[i]).match(_s.html5Test)) {
                isOK = true;
                _s.html5[m[i]] = true;
              }
            }
            return isOK;
          } else {
            canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
            return (canPlay && (canPlay.match(_s.html5Test)?true:false));
          }
        }
        // test all registered formats + codecs
        aF = _s.audioFormats;
        for (item in aF) {
          if (aF.hasOwnProperty(item)) {
            support[item] = _cp(aF[item].type);
            // assign result to related formats, too
            if (aF[item] && aF[item].related) {
              for (i=aF[item].related.length; i--;) {
                _s.html5[aF[item].related[i]] = support[item];
              }
            }
          }
        }
        support.canPlayType = (a?_cp:null);
        _s.html5 = _mixin(_s.html5, support);
        return true;
      };
    
      _strings = {
        // <d>
        notReady: 'Not loaded yet - wait for soundManager.onload()/onready()',
        notOK: 'Audio support is not available.',
        appXHTML: _smc + 'createMovie(): appendChild/innerHTML set failed. May be app/xhtml+xml DOM-related.',
        spcWmode: _smc + 'createMovie(): Removing wmode, preventing known SWF loading issue(s)',
        swf404: _sm + ': Verify that %s is a valid path.',
        tryDebug: 'Try ' + _sm + '.debugFlash = true for more security details (output goes to SWF.)',
        checkSWF: 'See SWF output for more debug info.',
        localFail: _sm + ': Non-HTTP page (' + _doc.location.protocol + ' URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
        waitFocus: _sm + ': Special case: Waiting for focus-related event..',
        waitImpatient: _sm + ': Getting impatient, still waiting for Flash%s...',
        waitForever: _sm + ': Waiting indefinitely for Flash (will recover if unblocked)...',
        needFunction: _sm + ': Function object expected for %s',
        badID: 'Warning: Sound ID "%s" should be a string, starting with a non-numeric character',
        noMS: 'MovieStar mode not enabled. Exiting.',
        currentObj: '--- ' + _sm + '._debug(): Current sound objects ---',
        waitEI: _smc + 'initMovie(): Waiting for ExternalInterface call from Flash..',
        waitOnload: _sm + ': Waiting for window.onload()',
        docLoaded: _sm + ': Document already loaded',
        onload: _smc + 'initComplete(): calling soundManager.onload()',
        onloadOK: _sm + '.onload() complete',
        init: '-- ' + _smc + 'init() --',
        didInit: _smc + 'init(): Already called?',
        flashJS: _sm + ': Attempting to call Flash from JS..',
        noPolling: _sm + ': Polling (whileloading()/whileplaying() support) is disabled.',
        secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
        badRemove: 'Warning: Failed to remove flash movie.',
        noPeak: 'Warning: peakData features unsupported for movieStar formats',
        shutdown: _sm + '.disable(): Shutting down',
        queue: _sm + ': Queueing %s handler',
        smFail: _sm + ': Failed to initialise.',
        smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
        fbTimeout: 'No flash response, applying .'+_s.swfCSS.swfTimedout+' CSS..',
        fbLoaded: 'Flash loaded',
        fbHandler: _smc+'flashBlockHandler()',
        manURL: 'SMSound.load(): Using manually-assigned URL',
        onURL: _sm + '.load(): current URL already assigned.',
        badFV: _sm + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
        as2loop: 'Note: Setting stream:false so looping can work (flash 8 limitation)',
        noNSLoop: 'Note: Looping not implemented for MovieStar formats',
        needfl9: 'Note: Switching to flash 9, required for MP4 formats.',
        mfTimeout: 'Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case',
        mfOn: 'mobileFlash::enabling on-screen flash repositioning',
        policy: 'Enabling usePolicyFile for data access'
        // </d>
      };
    
      _str = function() { // o [,items to replace]
        // <d>
        var args = _slice.call(arguments), // real array, please
        o = args.shift(), // first arg
        str = (_strings && _strings[o]?_strings[o]:''), i, j;
        if (str && args && args.length) {
          for (i = 0, j = args.length; i < j; i++) {
            str = str.replace('%s', args[i]);
          }
        }
        return str;
        // </d>
      };
    
      _loopFix = function(sOpt) {
        // flash 8 requires stream = false for looping to work
        if (_fV === 8 && sOpt.loops > 1 && sOpt.stream) {
          _wDS('as2loop');
          sOpt.stream = false;
        }
        return sOpt;
      };
    
      _policyFix = function(sOpt, sPre) {
        if (sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
          _s._wD((sPre?sPre+':':'') + _str('policy'));
          sOpt.usePolicyFile = true;
        }
        return sOpt;
      };
    
      _complain = function(sMsg) {
        if (typeof console !== 'undefined' && typeof console.warn !== 'undefined') {
          console.warn(sMsg);
        } else {
          _s._wD(sMsg);
        }
      };
    
      _doNothing = function() {
        return false;
      };
    
      _disableObject = function(o) {
        for (var oProp in o) {
          if (o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
            o[oProp] = _doNothing;
          }
        }
        oProp = null;
      };
    
      _failSafely = function(bNoDisable) {
        // general failure exception handler
        if (typeof bNoDisable === 'undefined') {
          bNoDisable = false;
        }
        if (_disabled || bNoDisable) {
          _wDS('smFail', 2);
          _s.disable(bNoDisable);
        }
      };
    
      _normalizeMovieURL = function(smURL) {
        var urlParams = null;
        if (smURL) {
          if (smURL.match(/\.swf(\?.*)?$/i)) {
            urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
            if (urlParams) {
              return smURL; // assume user knows what they're doing
            }
          } else if (smURL.lastIndexOf('/') !== smURL.length - 1) {
            smURL = smURL + '/';
          }
        }
        return (smURL && smURL.lastIndexOf('/') !== - 1?smURL.substr(0, smURL.lastIndexOf('/') + 1):'./') + _s.movieURL;
      };
    
      _setVersionInfo = function() {
        if (_fV !== 8 && _fV !== 9) {
          _s._wD(_str('badFV', _fV, _defaultFlashVersion));
          _s.flashVersion = _defaultFlashVersion;
        }
        var isDebug = (_s.debugMode || _s.debugFlash?'_debug.swf':'.swf'); // debug flash movie, if applicable
        if (_s.useHTML5Audio && !_html5Only && _s.audioFormats.mp4.required && _s.flashVersion < 9) {
          _s._wD(_str('needfl9'));
          _s.flashVersion = 9;
        }
        _fV = _s.flashVersion; // short-hand for internal use
        _s.version = _s.versionNumber + (_html5Only?' (HTML5-only mode)':(_fV === 9?' (AS3/Flash 9)':' (AS2/Flash 8)'));
        // set up default options
        if (_fV > 8) {
          _s.defaultOptions = _mixin(_s.defaultOptions, _s.flash9Options);
          _s.features.buffering = true;
        }
        if (_fV > 8 && _s.useMovieStar) {
          // flash 9+ support for movieStar formats as well as MP3
          _s.defaultOptions = _mixin(_s.defaultOptions, _s.movieStarOptions);
          _s.filePatterns.flash9 = new RegExp('\\.(mp3|' + _s.netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
          _s.mimePattern = _s.netStreamMimeTypes;
          _s.features.movieStar = true;
        } else {
          _s.useMovieStar = false;
          _s.features.movieStar = false;
        }
        _s.filePattern = _s.filePatterns[(_fV !== 8?'flash9':'flash8')];
        _s.movieURL = (_fV === 8?'soundmanager2.swf':'soundmanager2_flash9.swf').replace('.swf',isDebug);
        _s.features.peakData = _s.features.waveformData = _s.features.eqData = (_fV > 8);
      };
    
      _setPolling = function(bPolling, bHighPerformance) {
        if (!_s.o || !_s.allowPolling) {
          return false;
        }
        _s.o._setPolling(bPolling, bHighPerformance);
      };
    
      function _initDebug() {
        if (_s.debugURLParam.test(_wl)) {
          _s.debugMode = true; // allow force of debug mode via URL
        }
        // <d>
        if (_id(_s.debugID)) {
          return false;
        }
        var oD, oDebug, oTarget, oToggle, tmp;
        if (_s.debugMode && !_id(_s.debugID) && ((!_hasConsole || !_s.useConsole) || (_s.useConsole && _hasConsole && !_s.consoleOnly))) {
          oD = _doc.createElement('div');
          oD.id = _s.debugID + '-toggle';
          oToggle = {
            'position': 'fixed',
            'bottom': '0px',
            'right': '0px',
            'width': '1.2em',
            'height': '1.2em',
            'lineHeight': '1.2em',
            'margin': '2px',
            'textAlign': 'center',
            'border': '1px solid #999',
            'cursor': 'pointer',
            'background': '#fff',
            'color': '#333',
            'zIndex': 10001
          };
          oD.appendChild(_doc.createTextNode('-'));
          oD.onclick = _toggleDebug;
          oD.title = 'Toggle SM2 debug console';
          if (_ua.match(/msie 6/i)) {
            oD.style.position = 'absolute';
            oD.style.cursor = 'hand';
          }
          for (tmp in oToggle) {
            if (oToggle.hasOwnProperty(tmp)) {
              oD.style[tmp] = oToggle[tmp];
            }
          }
          oDebug = _doc.createElement('div');
          oDebug.id = _s.debugID;
          oDebug.style.display = (_s.debugMode?'block':'none');
          if (_s.debugMode && !_id(oD.id)) {
            try {
              oTarget = _getDocument();
              oTarget.appendChild(oD);
            } catch(e2) {
              throw new Error(_str('appXHTML'));
            }
            oTarget.appendChild(oDebug);
          }
        }
        oTarget = null;
        // </d>
      }
    
      _createMovie = function(smID, smURL) {
    
        var specialCase = null,
        remoteURL = (smURL?smURL:_s.url),
        localURL = (_s.altURL?_s.altURL:remoteURL),
        oEmbed, oMovie, oTarget = _getDocument(), tmp, movieHTML, oEl, extraClass = _getSWFCSS(), s, x, sClass, side = '100%', isRTL = null, html = _doc.getElementsByTagName('html')[0];
        isRTL = (html && html.dir && html.dir.match(/rtl/i));
        smID = (typeof smID === 'undefined'?_s.id:smID);
    
        if (_didAppend && _appendSuccess) {
          return false; // ignore if already succeeded
        }
    
        function _initMsg() {
          _s._wD('-- SoundManager 2 ' + _s.version + (!_html5Only && _s.useHTML5Audio?(_s.hasHTML5?' + HTML5 audio':', no HTML5 audio support'):'') + (!_html5Only ? (_s.useMovieStar?', MovieStar mode':'') + (_s.useHighPerformance?', high performance mode, ':', ') + (( _s.flashPollingInterval ? 'custom (' + _s.flashPollingInterval + 'ms)' : (_s.useFastPolling?'fast':'normal')) + ' polling') + (_s.wmode?', wmode: ' + _s.wmode:'') + (_s.debugFlash?', flash debug mode':'') + (_s.useFlashBlock?', flashBlock mode':'') : '') + ' --', 1);
        }
    
        if (_html5Only) {
          _setVersionInfo();
          _initMsg();
          _s.oMC = _id(_s.movieID);
          _init();
          // prevent multiple init attempts
          _didAppend = true;
          _appendSuccess = true;
          return false;
        }
    
        _didAppend = true;
    
        // safety check for legacy (change to Flash 9 URL)
        _setVersionInfo();
        _s.url = _normalizeMovieURL(_s._overHTTP?remoteURL:localURL);
        smURL = _s.url;
    
        _s.wmode = (!_s.wmode && _s.useHighPerformance && !_s.useMovieStar?'transparent':_s.wmode);
    
        if (_s.wmode !== null && (_ua.match(/msie 8/i) || (!_isIE && !_s.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
          _s.specialWmodeCase = true;
          // extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
          // does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
          // wmode breaks IE 8 on Vista + Win7 too in some cases, as of Jan.2011 (?)
          _wDS('spcWmode');
          _s.wmode = null;
        }
    
        oEmbed = {
          'name': smID,
          'id': smID,
          'src': smURL,
          'width': side,
          'height': side,
          'quality': 'high',
          'allowScriptAccess': _s.allowScriptAccess,
          'bgcolor': _s.bgColor,
          'pluginspage': _s._http+'//www.macromedia.com/go/getflashplayer',
          'type': 'application/x-shockwave-flash',
          'wmode': _s.wmode,
          'hasPriority': 'true' // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
        };
    
        if (_s.debugFlash) {
          oEmbed.FlashVars = 'debug=1';
        }
    
        if (!_s.wmode) {
          delete oEmbed.wmode; // don't write empty attribute
        }
    
        if (_isIE) {
          // IE is "special".
          oMovie = _doc.createElement('div');
          movieHTML = '<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+_s._http+'//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' + oEmbed.width + '" height="' + oEmbed.height + '"><param name="movie" value="' + smURL + '" /><param name="AllowScriptAccess" value="' + _s.allowScriptAccess + '" /><param name="quality" value="' + oEmbed.quality + '" />' + (_s.wmode?'<param name="wmode" value="' + _s.wmode + '" /> ':'') + '<param name="bgcolor" value="' + _s.bgColor + '" />' + (_s.debugFlash?'<param name="FlashVars" value="' + oEmbed.FlashVars + '" />':'') + '</object>';
        } else {
          oMovie = _doc.createElement('embed');
          for (tmp in oEmbed) {
            if (oEmbed.hasOwnProperty(tmp)) {
              oMovie.setAttribute(tmp, oEmbed[tmp]);
            }
          }
        }
    
        _initDebug();
        extraClass = _getSWFCSS();
        oTarget = _getDocument();
    
        if (oTarget) {
          _s.oMC = _id(_s.movieID)?_id(_s.movieID):_doc.createElement('div');
          if (!_s.oMC.id) {
            _s.oMC.id = _s.movieID;
            _s.oMC.className = _s.swfCSS.swfDefault + ' ' + extraClass;
            // "hide" flash movie
            s = null;
            oEl = null;
            if (!_s.useFlashBlock) {
              if (_s.useHighPerformance) {
                s = {
                  'position': 'fixed',
                  'width': '8px',
                  'height': '8px',
                  // >= 6px for flash to run fast, >= 8px to start up under Firefox/win32 in some cases. odd? yes.
                  'bottom': '0px',
                  'left': '0px',
                  'overflow': 'hidden'
                };
              } else {
                s = {
                  'position': 'absolute',
                  'width': '6px',
                  'height': '6px',
                  'top': '-9999px',
                  'left': '-9999px'
                };
                if (isRTL) {
                  s.left = Math.abs(parseInt(s.left,10))+'px';
                }
              }
            }
            if (_isWebkit) {
              _s.oMC.style.zIndex = 10000; // soundcloud-reported render/crash fix, safari 5
            }
            if (!_s.debugFlash) {
              for (x in s) {
                if (s.hasOwnProperty(x)) {
                  _s.oMC.style[x] = s[x];
                }
              }
            }
            try {
              if (!_isIE) {
                _s.oMC.appendChild(oMovie);
              }
              oTarget.appendChild(_s.oMC);
              if (_isIE) {
                oEl = _s.oMC.appendChild(_doc.createElement('div'));
                oEl.className = _s.swfCSS.swfBox;
                oEl.innerHTML = movieHTML;
              }
              _appendSuccess = true;
            } catch(e) {
              throw new Error(_str('appXHTML'));
            }
          } else {
            // it's already in the document.
            sClass = _s.oMC.className;
            _s.oMC.className = (sClass?sClass+' ':_s.swfCSS.swfDefault) + (extraClass?' '+extraClass:'');
            _s.oMC.appendChild(oMovie);
            if (_isIE) {
              oEl = _s.oMC.appendChild(_doc.createElement('div'));
              oEl.className = _s.swfCSS.swfBox;
              oEl.innerHTML = movieHTML;
            }
            _appendSuccess = true;
          }
        }
    
        if (specialCase) {
          _s._wD(specialCase);
        }
    
        _initMsg();
        _s._wD(_smc+'createMovie(): Trying to load ' + smURL + (!_s._overHTTP && _s.altURL?' (alternate URL)':''), 1);
    
        return true;
      };
    
      _idCheck = this.getSoundById;
    
      _initMovie = function() {
        if (_html5Only) {
          _createMovie();
          return false;
        }
        // attempt to get, or create, movie
        if (_s.o) {
          return false; // may already exist
        }
        _s.o = _s.getMovie(_s.id); // inline markup
        if (!_s.o) {
          if (!_oRemoved) {
            // try to create
            _createMovie(_s.id, _s.url);
          } else {
            // try to re-append removed movie after reboot()
            if (!_isIE) {
              _s.oMC.appendChild(_oRemoved);
            } else {
              _s.oMC.innerHTML = _oRemovedHTML;
            }
            _oRemoved = null;
            _didAppend = true;
          }
          _s.o = _s.getMovie(_s.id);
        }
        if (_s.o) {
          _s._wD(_smc+'initMovie(): Got '+_s.o.nodeName+' element ('+(_didAppend?'created via JS':'static HTML')+')');
          _wDS('waitEI');
        }
        if (_s.oninitmovie instanceof Function) {
          setTimeout(_s.oninitmovie, 1);
        }
        return true;
      };
    
      _go = function(sURL) {
        // where it all begins.
        if (sURL) {
          _s.url = sURL;
        }
        _initMovie();
      };
    
      _delayWaitForEI = function() {
        setTimeout(_waitForEI, 500);
      };
    
      _waitForEI = function() {
        if (_waitingForEI) {
          return false;
        }
        _waitingForEI = true;
        _event.remove(_win, 'load', _delayWaitForEI);
        if (_tryInitOnFocus && !_isFocused) {
          _wDS('waitFocus');
          return false;
        }
        var p;
        if (!_didInit) {
          p = _s.getMoviePercent();
          _s._wD(_str('waitImpatient', (p === 100?' (SWF loaded)':(p > 0?' (SWF ' + p + '% loaded)':''))));
        }
        setTimeout(function() {
          p = _s.getMoviePercent();
          if (!_didInit) {
            _s._wD(_sm + ': No Flash response within expected time.\nLikely causes: ' + (p === 0?'Loading ' + _s.movieURL + ' may have failed (and/or Flash ' + _fV + '+ not present?), ':'') + 'Flash blocked or JS-Flash security error.' + (_s.debugFlash?' ' + _str('checkSWF'):''), 2);
            if (!_s._overHTTP && p) {
              _wDS('localFail', 2);
              if (!_s.debugFlash) {
                _wDS('tryDebug', 2);
              }
            }
            if (p === 0) {
              // if 0 (not null), probably a 404.
              _s._wD(_str('swf404', _s.url));
            }
            _debugTS('flashtojs', false, ': Timed out' + _s._overHTTP?' (Check flash security or flash blockers)':' (No plugin/missing SWF?)');
          }
          // give up / time-out, depending
          if (!_didInit && _okToDisable) {
            if (p === null) {
              // SWF failed. Maybe blocked.
              if (_s.useFlashBlock || _s.flashLoadTimeout === 0) {
                if (_s.useFlashBlock) {
                  _flashBlockHandler();
                }
                _wDS('waitForever');
              } else {
                // old SM2 behaviour, simply fail
                _failSafely(true);
              }
            } else {
              // flash loaded? Shouldn't be a blocking issue, then.
              if (_s.flashLoadTimeout === 0) {
                 _wDS('waitForever');
              } else {
                _failSafely(true);
              }
            }
          }
        }, _s.flashLoadTimeout);
      };
    
      _go = function(sURL) {
        // where it all begins.
        if (sURL) {
          _s.url = sURL;
        }
        _initMovie();
      };
    
      // <d>
      _wDS = function(o, errorLevel) {
        if (!o) {
          return '';
        } else {
          return _s._wD(_str(o), errorLevel);
        }
      };
    
      if (_wl.indexOf('debug=alert') + 1 && _s.debugMode) {
        _s._wD = function(sText) {window.alert(sText);};
      }
    
      _toggleDebug = function() {
        var o = _id(_s.debugID),
        oT = _id(_s.debugID + '-toggle');
        if (!o) {
          return false;
        }
        if (_debugOpen) {
          // minimize
          oT.innerHTML = '+';
          o.style.display = 'none';
        } else {
          oT.innerHTML = '-';
          o.style.display = 'block';
        }
        _debugOpen = !_debugOpen;
      };
    
      _debugTS = function(sEventType, bSuccess, sMessage) {
        // troubleshooter debug hooks
        if (typeof sm2Debugger !== 'undefined') {
          try {
            sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
          } catch(e) {
            // oh well
          }
        }
        return true;
      };
      // </d>
    
      _getSWFCSS = function() {
        var css = [];
        if (_s.debugMode) {
          css.push(_s.swfCSS.sm2Debug);
        }
        if (_s.debugFlash) {
          css.push(_s.swfCSS.flashDebug);
        }
        if (_s.useHighPerformance) {
          css.push(_s.swfCSS.highPerf);
        }
        return css.join(' ');
      };
    
      _flashBlockHandler = function() {
        // *possible* flash block situation.
        var name = _str('fbHandler'), p = _s.getMoviePercent(), css = _s.swfCSS;
        if (!_s.ok()) {
          if (_needsFlash) {
            // make the movie more visible, so user can fix
            _s.oMC.className = _getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null?css.swfTimedout:css.swfError);
            _s._wD(name+': '+_str('fbTimeout')+(p?' ('+_str('fbLoaded')+')':''));
          }
          _s.didFlashBlock = true;
          _processOnEvents({type:'ontimeout',ignoreInit:true}); // fire onready(), complain lightly
          if (_s.onerror instanceof Function) {
            _s.onerror.apply(_win);
          }
        } else {
          // SM2 loaded OK (or recovered)
          if (_s.didFlashBlock) {
            _s._wD(name+': Unblocked');
          }
          if (_s.oMC) {
            _s.oMC.className = [_getSWFCSS(), css.swfDefault, css.swfLoaded + (_s.didFlashBlock?' '+css.swfUnblocked:'')].join(' ');
          }
        }
      };
    
      _handleFocus = function() {
        function cleanup() {
          _event.remove(_win, 'focus', _handleFocus);
          _event.remove(_win, 'load', _handleFocus);
        }
        if (_isFocused || !_tryInitOnFocus) {
          cleanup();
          return true;
        }
        _okToDisable = true;
        _isFocused = true;
        _s._wD(_smc+'handleFocus()');
        if (_isSafari && _tryInitOnFocus) {
          // giant Safari 3.1 hack - assume mousemove = focus given lack of focus event
          _event.remove(_win, 'mousemove', _handleFocus);
        }
        // allow init to restart
        _waitingForEI = false;
        cleanup();
        return true;
      };
    
      _initComplete = function(bNoDisable) {
        if (_didInit) {
          return false;
        }
        if (_html5Only) {
          // all good.
          _s._wD('-- SoundManager 2: loaded --');
          _didInit = true;
          _processOnEvents();
          _initUserOnload();
          return true;
        }
        var sClass = _s.oMC.className,
        wasTimeout = (_s.useFlashBlock && _s.flashLoadTimeout && !_s.getMoviePercent());
        if (!wasTimeout) {
          _didInit = true;
        }
        _s._wD('-- SoundManager 2 ' + (_disabled?'failed to load':'loaded') + ' (' + (_disabled?'security/load error':'OK') + ') --', 1);
        if (_disabled || bNoDisable) {
          if (_s.useFlashBlock) {
            _s.oMC.className = _getSWFCSS() + ' ' + (_s.getMoviePercent() === null?_s.swfCSS.swfTimedout:_s.swfCSS.swfError);
          }
          _processOnEvents({type:'ontimeout'});
          _debugTS('onload', false);
          if (_s.onerror instanceof Function) {
            _s.onerror.apply(_win);
          }
          return false;
        } else {
          _debugTS('onload', true);
        }
        _event.add(_win, 'unload', _doNothing); // prevent browser from showing cached state via back button, because flash will be dead
        if (_s.waitForWindowLoad && !_windowLoaded) {
          _wDS('waitOnload');
          _event.add(_win, 'load', _initUserOnload);
          return false;
        } else {
          if (_s.waitForWindowLoad && _windowLoaded) {
            _wDS('docLoaded');
          }
          _initUserOnload();
        }
        return true;
      };
    
      _addOnEvent = function(sType, oMethod, oScope) {
        if (typeof _on_queue[sType] === 'undefined') {
          _on_queue[sType] = [];
        }
        _on_queue[sType].push({
          'method': oMethod,
          'scope': (oScope || null),
          'fired': false
        });
      };
    
      _processOnEvents = function(oOptions) {
        if (!oOptions) { // assume onready, if unspecified
          oOptions = {
            type: 'onready'
          };
        }
        if (!_didInit && oOptions && !oOptions.ignoreInit) {
          // not ready yet.
          return false;
        }
        var status = {
          success: (oOptions && oOptions.ignoreInit?_s.ok():!_disabled)
        },
        srcQueue = (oOptions && oOptions.type?_on_queue[oOptions.type]||[]:[]), // queue specified by type, or none
        queue = [], i, j,
        canRetry = (_needsFlash && _s.useFlashBlock && !_s.ok());
        for (i = 0; i < srcQueue.length; i++) {
          if (srcQueue[i].fired !== true) {
            queue.push(srcQueue[i]);
          }
        }
        if (queue.length) {
          _s._wD(_sm + ': Firing ' + queue.length + ' '+oOptions.type+'() item' + (queue.length === 1?'':'s'));
          for (i = 0, j = queue.length; i < j; i++) {
            if (queue[i].scope) {
              queue[i].method.apply(queue[i].scope, [status]);
            } else {
              queue[i].method(status);
            }
            if (!canRetry) { // flashblock case doesn't count here
              queue[i].fired = true;
            }
          }
        }
        return true;
      };
    
      _initUserOnload = function() {
        _win.setTimeout(function() {
          if (_s.useFlashBlock) {
            _flashBlockHandler();
          }
          _processOnEvents();
          // call user-defined "onload", scoped to window
          if (_s.onload instanceof Function) {
            _wDS('onload', 1);
            _s.onload.apply(_win);
            _wDS('onloadOK', 1);
          }
          if (_s.waitForWindowLoad) {
            _event.add(_win, 'load', _initUserOnload);
          }
        },1);
      };
    
      _detectFlash = function() {
    
        // hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau - http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt
    
        if (_hasFlash !== undefined) {
          // this work has already been done.
          return _hasFlash;
        }
    
        var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = _win.ActiveXObject;
    
        if (nP && nP.length) {
    
          type = 'application/x-shockwave-flash';
          types = n.mimeTypes;
          if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
            hasPlugin = true;
          }
    
        } else if (typeof AX !== 'undefined') {
    
          try {
            obj = new AX('ShockwaveFlash.ShockwaveFlash');
          } catch(e) {
            // oh well
          }
          hasPlugin = (!!obj);
    
        }
    
        _hasFlash = hasPlugin;
    
        return hasPlugin;
    
      };
    
      _featureCheck = function() {
        var needsFlash, item,
        isSpecial = (_ua.match(/iphone os (1|2|3_0|3_1)/i)?true:false); // iPhone <= 3.1 has broken HTML5 audio(), but firmware 3.2 (iPad) + iOS4 works.
        if (isSpecial) {
          _s.hasHTML5 = false; // has Audio(), but is broken; let it load links directly.
          _html5Only = true; // ignore flash case, however
          if (_s.oMC) {
            _s.oMC.style.display = 'none';
          }
          return false;
        }
        if (_s.useHTML5Audio) {
          if (!_s.html5 || !_s.html5.canPlayType) {
            _s._wD('SoundManager: No HTML5 Audio() support detected.');
            _s.hasHTML5 = false;
            return true;
          } else {
            _s.hasHTML5 = true;
          }
          if (_isBadSafari) {
            _s._wD(_smc+'Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - '+(!_hasFlash?' would use flash fallback for MP3/MP4, but none detected.':'will use flash fallback for MP3/MP4, if available'),1);
            if (_detectFlash()) {
              return true;
            }
          }
        } else {
          // flash required.
          return true;
        }
        for (item in _s.audioFormats) {
          if (_s.audioFormats.hasOwnProperty(item) && _s.audioFormats[item].required && !_s.html5.canPlayType(_s.audioFormats[item].type)) {
            // may need flash for this format?
            needsFlash = true;
          }
        }
        // sanity check..
        if (_s.ignoreFlash) {
          needsFlash = false;
        }
        _html5Only = (_s.useHTML5Audio && _s.hasHTML5 && !needsFlash && !_s.requireFlash);
        return (_detectFlash() && needsFlash);
      };
    
      _init = function() {
        var item, tests = [];
        _wDS('init');
    
        // called after onload()
        if (_didInit) {
          _wDS('didInit');
          return false;
        }
    
        function _cleanup() {
          _event.remove(_win, 'load', _s.beginDelayedInit);
        }
    
        if (_s.hasHTML5) {
          for (item in _s.audioFormats) {
            if (_s.audioFormats.hasOwnProperty(item)) {
              tests.push(item+': '+_s.html5[item]);
            }
          }
          _s._wD('-- SoundManager 2: HTML5 support tests ('+_s.html5Test+'): '+tests.join(', ')+' --',1);
        }
    
        if (_html5Only) {
          if (!_didInit) {
            // we don't need no steenking flash!
            _cleanup();
            _s.enabled = true;
            _initComplete();
          }
          return true;
        }
    
        // flash path
        _initMovie();
        try {
          _wDS('flashJS');
          _s.o._externalInterfaceTest(false); // attempt to talk to Flash
          if (!_s.allowPolling) {
            _wDS('noPolling', 1);
          } else {
            _setPolling(true, _s.flashPollingInterval ? _s.flashPollingInterval : (_s.useFastPolling ? 10 : 50));
          }
          if (!_s.debugMode) {
            _s.o._disableDebug();
          }
          _s.enabled = true;
          _debugTS('jstoflash', true);
        } catch(e) {
          _s._wD('js/flash exception: ' + e.toString());
          _debugTS('jstoflash', false);
          _failSafely(true); // don't disable, for reboot()
          _initComplete();
          return false;
        }
        _initComplete();
        // event cleanup
        _cleanup();
        return true;
      };
    
      _beginInit = function() {
        if (_initPending) {
          return false;
        }
        _createMovie();
        _initMovie();
        _initPending = true;
        return true;
      };
    
      _dcLoaded = function() {
        if (_didDCLoaded) {
          return false;
        }
        _didDCLoaded = true;
        _initDebug();
        if (!_s.useHTML5Audio) {
          if (!_detectFlash()) {
            _s._wD('SoundManager: No Flash detected, trying HTML5');
            _s.useHTML5Audio = true;
          }
        }
        _testHTML5();
        _s.html5.usingFlash = _featureCheck();
        _needsFlash = _s.html5.usingFlash;
        _didDCLoaded = true;
        if (_doc.removeEventListener) {
          _doc.removeEventListener('DOMContentLoaded', _dcLoaded, false);
        }
        _go();
        return true;
      };
    
      _startTimer = function(oSound) {
        if (!oSound._hasTimer) {
          oSound._hasTimer = true;
        }
      };
    
      _stopTimer = function(oSound) {
        if (oSound._hasTimer) {
          oSound._hasTimer = false;
        }
      };
    
      _die = function() {
        if (_s.onerror instanceof Function) {
          _s.onerror();
        }
        _s.disable();
      };
    
      _badSafariFix = function() {
        // special case: "bad" Safari can fall back to flash for MP3/MP4
        if (!_isBadSafari || !_detectFlash()) {
          return false; // doesn't apply
        }
        var aF = _s.audioFormats, i, item;
        for (item in aF) {
          if (aF.hasOwnProperty(item)) {
            // special case: "bad" Safari can fall back to flash for MP3/MP4
            if (item === 'mp3' || item === 'mp4') {
              _s._wD(_sm+': Using flash fallback for '+item+' format');
              _s.html5[item] = false;
              // assign result to related formats, too
              if (aF[item] && aF[item].related) {
                for (i = aF[item].related.length; i--;) {
                  _s.html5[aF[item].related[i]] = false;
                }
              }
            }
          }
        }
      };
    
      // pseudo-private methods called by Flash
    
      this._setSandboxType = function(sandboxType) {
        // <d>
        var sb = _s.sandbox;
        sb.type = sandboxType;
        sb.description = sb.types[(typeof sb.types[sandboxType] !== 'undefined'?sandboxType:'unknown')];
        _s._wD('Flash security sandbox type: ' + sb.type);
        if (sb.type === 'localWithFile') {
          sb.noRemote = true;
          sb.noLocal = false;
          _wDS('secNote', 2);
        } else if (sb.type === 'localWithNetwork') {
          sb.noRemote = false;
          sb.noLocal = true;
        } else if (sb.type === 'localTrusted') {
          sb.noRemote = false;
          sb.noLocal = false;
        }
        // </d>
      };
    
      this._externalInterfaceOK = function(flashDate) {
        // flash callback confirming flash loaded, EI working etc.
        // flashDate = approx. timing/delay info for JS/flash bridge
        if (_s.swfLoaded) {
          return false;
        }
        var eiTime = new Date().getTime();
        _s._wD(_smc+'externalInterfaceOK()' + (flashDate?' (~' + (eiTime - flashDate) + ' ms)':''));
        _debugTS('swf', true);
        _debugTS('flashtojs', true);
        _s.swfLoaded = true;
        _tryInitOnFocus = false;
        if (_isBadSafari) {
          _badSafariFix();
        }
        if (_isIE) {
          // IE needs a timeout OR delay until window.onload - may need TODO: investigating
          setTimeout(_init, 100);
        } else {
          _init();
        }
      };
    
      _dcIE = function() {
        if (_doc.readyState === 'complete') {
          _dcLoaded();
          _doc.detachEvent('onreadystatechange', _dcIE);
        }
        return true;
      };
    
      // focus and window load, init
      if (!_s.hasHTML5 || _needsFlash) {
        // only applies to Flash mode
        _event.add(_win, 'focus', _handleFocus);
        _event.add(_win, 'load', _handleFocus);
        _event.add(_win, 'load', _delayWaitForEI);
        if (_isSafari && _tryInitOnFocus) {
          _event.add(_win, 'mousemove', _handleFocus); // massive Safari focus hack
        }
      }
    
      if (_doc.addEventListener) {
        _doc.addEventListener('DOMContentLoaded', _dcLoaded, false);
      } else if (_doc.attachEvent) {
        _doc.attachEvent('onreadystatechange', _dcIE);
      } else {
        // no add/attachevent support - safe to assume no JS -> Flash either
        _debugTS('onload', false);
        _die();
      }
    
      if (_doc.readyState === 'complete') {
        setTimeout(_dcLoaded,100);
      }
    
    } // SoundManager()
    
    // SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
    if (typeof SM2_DEFER === 'undefined' || !SM2_DEFER) {
      soundManager = new SoundManager();
    }
    
    // public interfaces
    window.SoundManager = SoundManager; // constructor
    window.soundManager = soundManager; // public API, flash callbacks etc
    
    }(window));
    
    // JS Finite State Machine
    // 
    // A simple finite state machine library for code flow and transition control.
    // 
    // https://github.com/jhund/js-finite-state-machine
    // Copyright (c)2011 Jo Hund, ClearCove Software Inc.
    // Based originally on FSM by Anthony Blackshaw <ant@getme.co.uk> (www.getme.co.uk) Copyright (c)2008
    
    // Initializes a new state machine.
    // Usage: var fsm = new FSM("initial", { d1: "foo", d2: "bar" });
    // 
    // param [String] initial_state the initial state of the state machine
    // param [Object, optional] data data specific to this state machine. Is available as this.data in
    //   callbacks
    
    
    function FSM(initial_state, data) {
        this.state_transitions = {};
        this.state_transitions_from_any_state = {};
        this.default_transition = null;
        this.current_state = initial_state;
        this.data = data;
        this.debug = true; // set to true to turn on console output for debugging (see function "send_event")
    };
    
    
    // Specify a "specific" transition for given events and current_states.
    // 
    // param [String, Array<String>] events the event(s) that trigger the transition.
    // param [String, Array<String>] current_states the state(s) that respond to the given event
    // param [Function, null] callback the callback will be called before the transition happens
    // param [String] next_state the state after the transition
    FSM.prototype.add_transition = function(events, current_states, callback, next_state) {
        if (typeof(events) === 'string') {
            events = [events];
        }
        if (typeof(current_states) === 'string') {
            current_states = [current_states];
        }
        for (var i = 0; i < events.length; i++) {
            for (var j = 0; j < current_states.length; j++) {
                if (!next_state) {
                    next_state = current_states[j];
                } // stay in state if no next_state given
                this.state_transitions[[events[i], current_states[j]]] = [callback, next_state];
            }
        }
    };
    
    
    // Specify a "from any state" transition. This is applied if no specific transition is
    // found for the current_state and event given
    // 
    // param [String, Array<String>] events the event(s) that trigger the transition.
    // param [Function, null] callback the callback will be called before the transition happens
    // param [String] next_state the state after the transition
    FSM.prototype.add_transition_from_any_state = function(events, callback, next_state) {
        if (typeof(events) === 'string') {
            events = [events];
        }
        for (var i = 0; i < events.length; i++) {
            this.state_transitions_from_any_state[events[i]] = [callback, next_state];
        }
    };
    
    
    // Specify a "default" transition. This is applied if no other matching transition is
    // found for the current_state and given event
    // 
    // param [Function, null] callback the callback(s) will be called before the transition happens
    // param [String] next_state the state after the transition
    FSM.prototype.set_default_transition = function(callback, next_state) {
        this.default_transition = [callback, next_state];
    };
    
    
    // Get the transition for the current_state and event given.
    // Based on the current state and the event given, the state machine applies the first matching
    // transition in the following order:
    // * "specific" (for given current_state and event)
    // * "from any state" (for given event)
    // * "default" (if no matching transitions are found by now)
    //
    // param [String] event the event
    // param [String] state the state
    // return [Transition] the matching transition. [Callback, NextState]
    FSM.prototype.get_transition = function(event, state) {
        var r;
        r = this.state_transitions[[event, state]] || // first try "specific"
        this.state_transitions_from_any_state[event] || // then try "from any state"
        this.default_transition // lastly try default transition
        if (r) {
            // return [callback, new_state] tuple. Stay in current_state if no next_state given
            return [r[0], r[1] || this.current_state]
        } else {
            throw Error("Transition is undefined: (" + event + ", " + state + ")");
        }
    };
    
    
    // Send an event to the state machine to trigger a transition.
    // 
    // param [String] event the event to send to the state machine
    // param [Object, optional] event_data data specific for this event. Available as event_data in
    //   callback
    FSM.prototype.send_event = function(event, event_data) {
        var result = this.get_transition(event, this.current_state),
            current_state = this.current_state,
            new_state, callback, debug_msg;
        new_state = result[1];
        callback = result[0];
    
        if (this.debug && window.console && window.console.log) {
            debug_msg = [];
            if (this.data.name) {
                debug_msg.push(this.data.name + ': ');
            } else {
                debug_msg.push('FSM: ');
            }
            debug_msg.push(event + ': ');
            debug_msg.push(current_state + ' -> ' + new_state);
            if (event_data) {
                debug_msg.push('; with event data');
            }
            if (callback) {
                debug_msg.push('; with callback');
            }
            window.console.log(debug_msg.join(''));
        };
    
        this.current_state = new_state;
        this.action = callback;
        if (callback) {
            callback.call(this, event_data); // call callback in state_machine context
        }
    
    };
    
    (function() {
      var root;
      root = typeof global !== "undefined" && global !== null ? global : window;
      root.root = root;
      root.asset_path = '/mantra/';
      root.Mantra = {};
      root.EBF = {};
      root.$em = null;
      root.$logger = null;
      root.$audio_manager = null;
    }).call(this);
    
    (function() {
      var AssetManager;
      var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
      AssetManager = (function() {
        function AssetManager() {
          this.AssetManager = __bind(this.AssetManager, this);
        }
        AssetManager.successCount = 0;
        AssetManager.errorCount = 0;
        AssetManager.cache = {};
        AssetManager.downloadQueue = [];
        AssetManager.soundsQueue = [];
        AssetManager.images = {};
        AssetManager.asset_lookup = {};
        AssetManager.queueImage = function(id, path) {
          return this.downloadQueue.push({
            id: id,
            path: path
          });
        };
        AssetManager.queueSound = function(id, path) {
          return this.soundsQueue.push({
            id: id,
            path: path
          });
        };
        AssetManager.totalAssets = function() {
          return this.downloadQueue.length + this.soundsQueue.length;
        };
        AssetManager.numFinished = function() {
          return this.successCount + this.errorCount;
        };
        AssetManager.getProgress = function() {
          if (this.totalAssets() === 0) {
            return '0';
          } else {
            return ((this.numFinished() / this.totalAssets()) * 100).toString().slice(0, 4);
          }
        };
        AssetManager.isDone = function() {
          return this.totalAssets() === (this.successCount + this.errorCount);
        };
        AssetManager.downloadAll = function(callback) {
          var i, image, _ref, _results;
          if (this.downloadQueue.length === 0 && this.soundsQueue.length === 0) {
            callback();
          }
          this.downloadSounds(callback);
          _results = [];
          for (i = 0, _ref = this.downloadQueue.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
            image = this.downloadQueue[i];
            this.img = new Image();
            this.img.addEventListener('load', __bind(function() {
              this.successCount += 1;
              if (this.isDone()) {
                return callback();
              }
            }, this));
            this.img.addEventListener('error', __bind(function() {
              this.errorCount += 1;
              if (this.isDone()) {
                return callback();
              }
            }, this));
            this.img.src = image.path;
            this.cache[image.path] = this.img;
            _results.push(this.asset_lookup[image.id] = this.cache[image.path]);
          }
          return _results;
        };
        AssetManager.getImage = function(id) {
          return this.asset_lookup[id];
        };
        AssetManager.getSound = function(id) {
          return this.asset_lookup[id];
        };
        AssetManager.getBackgroundSong = function(id) {
          return this.asset_lookup[id];
        };
        AssetManager.playSound = function(id) {
          return this.asset_lookup[id].play();
        };
        AssetManager.downloadSounds = function(callback) {
          if (!soundManager) {
            return;
          }
          soundManager.onready(__bind(function() {
            var sound, _i, _len, _ref, _results;
            $logger.sound.info('SoundManager ready');
            _ref = this.soundsQueue;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              sound = _ref[_i];
              _results.push(this.downloadSound(sound.id, sound.path, callback));
            }
            return _results;
          }, this));
          return soundManager.ontimeout(function() {
            return $logger.sound.error('SM2 did not start');
          });
        };
        AssetManager.downloadSound = function(id, path, callback) {
          var manager;
          manager = this;
          this.cache[path] = soundManager.createSound({
            id: id,
            autoLoad: true,
            url: path,
            onload: function() {
              $logger.assets.info(this.url + ("" + this.url + " is loaded"));
              manager.successCount += 1;
              if (manager.isDone()) {
                return callback();
              }
            }
          });
          this.cache[path].restart = function() {
            $logger.sound.info("Restarting '" + this.sID + "'");
            this.stop();
            this.setPosition(0);
            return this.play();
          };
          return this.asset_lookup[id] = this.cache[path];
        };
        AssetManager.configureSoundManager = function(asset_path) {
          soundManager.url = asset_path;
          soundManager.flashVersion = 9;
          soundManager.debugFlash = false;
          soundManager.debugMode = false;
          return soundManager.defaultOptions.volume = 15;
        };
        return AssetManager;
      })();
      root.AssetManager = AssetManager;
    }).call(this);
    
    (function() {
      var root;
      root = typeof global !== "undefined" && global !== null ? global : window;
      root.root = root;
      root.asset_path = '/mantra/';
      root.Mantra = {};
      root.EBF = {};
      root.$em = null;
      root.$logger = null;
      root.$audio_manager = null;
    }).call(this);
    
    (function() {
      var EntitySet;
      var __slice = Array.prototype.slice;
      EntitySet = (function() {
        function EntitySet() {
          var entities, game;
          game = arguments[0], entities = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          this.game = game;
          this.entities = entities;
          this.visible = true;
          this.paused = false;
        }
        EntitySet.prototype.add = function() {
          var entity, new_entities, _i, _len, _results;
          new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          _results = [];
          for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
            entity = new_entities[_i];
            _results.push(this.entities.push(entity));
          }
          return _results;
        };
        EntitySet.prototype.update = function() {
          var entity, _i, _len, _ref, _results;
          if (!this.paused) {
            _ref = this.entities;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entity = _ref[_i];
              _results.push(entity.update());
            }
            return _results;
          }
        };
        EntitySet.prototype.draw = function(context) {
          var entity, _i, _len, _ref, _results;
          if (this.visible) {
            _ref = this.entities;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entity = _ref[_i];
              _results.push(entity.draw(context));
            }
            return _results;
          }
        };
        EntitySet.prototype.pause = function() {
          return this.paused = true;
        };
        EntitySet.prototype.unpause = function() {
          return this.paused = false;
        };
        EntitySet.prototype.hide = function() {
          return this.visible = false;
        };
        EntitySet.prototype.show = function() {
          return this.visible = true;
        };
        EntitySet.prototype.cull = function() {
          var i, _ref, _results;
          if (this.entities.length) {
            _results = [];
            for (i = _ref = this.entities.length - 1; _ref <= 0 ? i < 0 : i > 0; _ref <= 0 ? i++ : i--) {
              if (this.entities[i].remove_from_world) {
                _results.push(this.entities.splice(i, 1));
              }
            }
            return _results;
          }
        };
        return EntitySet;
      })();
      root.EntitySet = EntitySet;
    }).call(this);
    
    (function() {
      var GameLauncher;
      var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
      GameLauncher = (function() {
        function GameLauncher(game_name, canvas) {
          this.canvas = canvas;
          this.game = new game_name({
            canvas: this.canvas
          });
        }
        GameLauncher.prototype.init = function(assets) {
          var id, path, root_asset_path, _ref, _ref2, _ref3, _ref4, _ref5, _results;
          if (assets == null) {
            assets = this.game.assets;
          }
          console.log('Queueing up assets to load...');
                if ((_ref = assets.images) != null) {
            _ref;
          } else {
            assets.images = [];
          };
                if ((_ref2 = assets.sounds) != null) {
            _ref2;
          } else {
            assets.sounds = [];
          };
          this.configureEngine();
          console.log('Initializing game...');
          $logger.assets.debug("# assets: " + assets.images.length);
          Mantra.KeyManager.capture_keypresses(this.game);
          this.game.init();
          root_asset_path = assets.root_path;
          _ref3 = assets.images;
          for (id in _ref3) {
            path = _ref3[id];
            this.addImage(id, "" + root_asset_path + "images/" + path);
          }
          _ref4 = assets.sounds;
          for (id in _ref4) {
            path = _ref4[id];
            this.addSound(id, "" + root_asset_path + "audio/" + path);
          }
          _ref5 = assets.music;
          _results = [];
          for (id in _ref5) {
            path = _ref5[id];
            _results.push(this.addSound(id, "" + root_asset_path + "audio/" + path));
          }
          return _results;
        };
        GameLauncher.prototype.configureEngine = function() {
          root.$em = Mantra.EventManager.instance();
          root.$logger = Mantra.Logger.instance();
          root.$audio_manager = Mantra.AudioManager.instance();
          $logger.subsystems('global', 'sound', 'assets', 'input', 'game');
          return this.game.configureEngine();
        };
        GameLauncher.prototype.launch = function() {
          return AssetManager.downloadAll((__bind(function() {
            return this.start();
          }, this)));
        };
        GameLauncher.prototype.start = function() {
          console.log('Assets loaded. Launching game...');
          console.log(this.game.state.current_state);
          if (this.game.state.current_state === 'initialized') {
            return this.game.start();
          }
        };
        GameLauncher.prototype.addImage = function(id, name) {
          return AssetManager.queueImage(id, "" + root.asset_path + name);
        };
        GameLauncher.prototype.addSound = function(id, name) {
          return AssetManager.queueSound(id, "" + root.asset_path + name);
        };
        GameLauncher.launchInto = function(game_klass, canvas) {
          this.launcher = new GameLauncher(game_klass, canvas);
          this.launcher.init();
          this.launcher.launch();
          return this.launcher;
        };
        GameLauncher.launch = function(game_klass) {
          return this.launchInto(game_klass);
        };
        return GameLauncher;
      })();
      root.GameLauncher = GameLauncher;
    }).call(this);
    
    (function() {
      Mantra.Geometry = (function() {
        function Geometry() {}
        Geometry.withinCircle = function(circle, point, options) {
          var circle_radius, distance_squared, radii_squared;
          if (options == null) {
            options = {};
          }
          _.defaults(options, {
            buffer: 0
          });
          circle_radius = circle.radius + options.buffer;
          distance_squared = ((circle.x - point.x) * (circle.x - point.x)) + ((circle.y - point.y) * (circle.y - point.y));
          radii_squared = (circle_radius + point.radius) * (circle_radius + point.radius);
          return distance_squared < radii_squared;
        };
        return Geometry;
      })();
    }).call(this);
    
    (function() {
      var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
      Mantra.KeyManager = (function() {
        function KeyManager() {}
        KeyManager.capture_keypresses = function(game, steal) {
          this.game = game;
          if (steal == null) {
            steal = 'basic';
          }
          window.keydown = {};
          return $(__bind(function() {
            $(document).bind('keydown', __bind(function(event) {
              keydown[this.keyName(event)] = true;
              return this.hasMod(event) || !steal;
            }, this));
            return $(document).bind('keyup', __bind(function(event) {
              var key, key_name;
              key = String.fromCharCode(event.which);
              key_name = this.keyName(event);
              keydown[key_name] = false;
              $logger.input.debug("Key pressed: '" + key + "' (" + key_name + ")");
              if (this.game) {
                this.game.onKey(key);
              }
              return this.hasMod(event) || !steal;
            }, this));
          }, this));
        };
        KeyManager.keyName = function(event) {
          return $.hotkeys.specialKeys[event.which] || String.fromCharCode(event.which).toLowerCase();
        };
        KeyManager.hasMod = function(event) {
          return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        };
        return KeyManager;
      })();
    }).call(this);
    
    (function() {
      var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
      Mantra.Logger = (function() {
        Logger.instance = function() {
          var _ref;
          return (_ref = this.singleton) != null ? _ref : this.singleton = new Mantra.Logger;
        };
        Logger.level_map = {
          debug: 4,
          info: 3,
          warn: 2,
          error: 1,
          off: 0
        };
        function Logger(log_levels) {
          this.log_levels = log_levels != null ? log_levels : {};
          null;
        }
        Logger.prototype.subsystems = function() {
          var subsystems, system, _i, _len, _results;
          subsystems = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          _results = [];
          for (_i = 0, _len = subsystems.length; _i < _len; _i++) {
            system = subsystems[_i];
            _results.push(this.registerSubsystem(system));
          }
          return _results;
        };
        Logger.prototype.registerSubsystem = function(name) {
          return this[name] = {
            debug: __bind(function(message) {
              if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['debug']) {
                return this.log("[" + name + "] " + message);
              }
            }, this),
            info: __bind(function(message) {
              if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['info']) {
                return this.log("[" + name + "] " + message);
              }
            }, this),
            warn: __bind(function(message) {
              if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['warn']) {
                return this.log("[" + name + "] " + message);
              }
            }, this),
            error: __bind(function(message) {
              if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['error']) {
                return this.log("[" + name + "] " + message);
              }
            }, this)
          };
        };
        Logger.prototype.log = function(message) {
          return console.log(message);
        };
        Logger.prototype.levels = function(log_levels) {
          this.log_levels = log_levels;
          return null;
        };
        return Logger;
      })();
    }).call(this);
    
    (function() {
      var Sprite;
      Sprite = (function() {
        function Sprite() {}
        Sprite.rotateAndCache = function(image, angle) {
          var offscreenCanvas, offscreenCtx, size;
          offscreenCanvas = document.createElement('canvas');
          size = Math.max(image.width, image.height);
          offscreenCanvas.width = size;
          offscreenCanvas.height = size;
          offscreenCtx = offscreenCanvas.getContext('2d');
          offscreenCtx.translate(size / 2, size / 2);
          offscreenCtx.rotate(angle + Math.PI / 2);
          offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
          return offscreenCanvas;
        };
        return Sprite;
      })();
      root.Sprite = Sprite;
    }).call(this);
    
    (function() {
      Mantra.Timer = (function() {
        function Timer() {
          this.time_passed = 0;
          this.max_step = 0.05;
          this.last_timestamp = 0;
        }
        Timer.prototype.tick = function() {
          var current_timestamp, time_delta, walled_time_delta;
          current_timestamp = Date.now();
          time_delta = (current_timestamp - this.last_timestamp) / 1000;
          walled_time_delta = Math.min(time_delta, this.max_step);
          this.last_timestamp = current_timestamp;
          this.time_passed += walled_time_delta;
          return walled_time_delta;
        };
        Timer.after = function(obj, options) {
          var timer;
          if (options == null) {
            options = {};
          }
          timer = new Mantra.Timer();
          obj.addTimer(timer);
          if (options.milliseconds != null) {
            options.seconds = options.milliseconds / 1000;
          }
          return function() {
            return timer.time_passed > options.seconds;
          };
        };
        return Timer;
      })();
    }).call(this);
    
    
    (function() {
      Mantra.Entity = (function() {
        function Entity(game, coords) {
          var _ref;
          this.game = game;
          if (coords == null) {
            coords = {
              x: 0,
              y: 0
            };
          }
          _ref = [coords.x, coords.y], this.x = _ref[0], this.y = _ref[1];
          this.remove_from_world = false;
          this.screen = null;
          this.timers = [];
        }
        Entity.prototype.update = function() {};
        Entity.prototype.draw = function() {
          return null;
        };
        Entity.prototype.cull = function() {
          return null;
        };
        Entity.prototype.addTimer = function(timer) {
          return this.timers.push(timer);
        };
        Entity.prototype.outsideScreen = function() {
          if (this.game.center_coordinates) {
            return this.x > this.game.halfSurfaceWidth || this.x < -this.game.halfSurfaceWidth || this.y > this.game.halfSurfaceHeight || this.y < -this.game.halfSurfaceHeight;
          } else {
            return this.x > this.game.canvas.width || this.x < -this.game.canvas.width || this.y > this.game.canvas.height || this.y < -this.game.canvas.height;
          }
        };
        Entity.prototype.listen = function(type, callback) {
          return Mantra.EventManager.instance.listen(type, this, callback);
        };
        Entity.prototype.s_coords = function() {
          return "" + (this.x.toString().slice(0, 6)) + ", " + (this.y.toString().slice(0, 6));
        };
        Entity.prototype.drawSpriteCentered = function(context) {
          var x, y;
          if (this.sprite == null) {
            return;
          }
          x = this.x - this.sprite.width / 2;
          y = this.y - this.sprite.height / 2;
          return context.drawImage(this.sprite, x, y);
        };
        Entity.prototype.setCoords = function(coords) {
          this.x = coords.x;
          return this.y = coords.y;
        };
        return Entity;
      })();
    }).call(this);
    
    (function() {
      var SpriteEntity;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      SpriteEntity = (function() {
        __extends(SpriteEntity, Mantra.Entity);
        function SpriteEntity(game, sprite, coords) {
          this.game = game;
          this.sprite = sprite;
          if (coords == null) {
            coords = {
              x: 0,
              y: 0
            };
          }
          this.setCoords(coords);
          this.remove_from_world = false;
        }
        SpriteEntity.prototype.draw = function(context) {
          if (this.game.showOutlines && this.radius) {
            context.beginPath();
            context.strokeStyle = 'green';
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.stroke();
            return context.closePath();
          }
        };
        SpriteEntity.prototype.drawSpriteCenteredRotated = function(context) {
          context.save();
          context.translate(this.x, this.y);
          context.rotate(this.angle + Math.PI / 2);
          context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
          return context.restore();
        };
        return SpriteEntity;
      })();
      root.SpriteEntity = SpriteEntity;
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Mantra.MapEntity = (function() {
        __extends(MapEntity, Mantra.Entity);
        function MapEntity(game, options) {
          var _ref;
          this.options = options;
          _ref = [options.x, options.y, options.w, options.h, options.style], this.x = _ref[0], this.y = _ref[1], this.w = _ref[2], this.h = _ref[3], this.style = _ref[4];
          MapEntity.__super__.constructor.call(this, game, {
            x: this.x,
            y: this.y
          });
        }
        MapEntity.prototype.draw = function(context) {
          Mantra.Canvas.rectangle(context, {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            style: this.style || 'rgba(173, 216, 230, 1.0)'
          });
          Mantra.Canvas.rectangle(context, {
            x: this.x + 1,
            y: this.y + 1,
            w: this.w - 2,
            h: this.h - 2,
            style: 'rgba(0, 0, 0, 0.5)',
            hollow: true,
            borderWidth: 2
          });
          return Mantra.Canvas.rectangle(context, {
            x: this.x + 5,
            y: this.y + 5,
            w: this.w - 10,
            h: this.h - 10,
            hollow: true,
            borderWidth: 2
          });
        };
        MapEntity.prototype.setCoords = function(coords) {
          this.x = coords.x;
          return this.y = coords.y;
        };
        return MapEntity;
      })();
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      }, __slice = Array.prototype.slice;
      Mantra.Screen = (function() {
        __extends(Screen, EntitySet);
        Screen.presets = {
          'intro': {
            panes: function(options) {
              var intro_ui_pane;
              intro_ui_pane = new Mantra.UIPane(this.game);
              intro_ui_pane.addTextItem({
                color: 'orange',
                x: 'centered',
                y: 'centered',
                text: function() {
                  return (typeof options.text === 'function' ? options.text.call(this.game) : options.text) || 'Click to start!';
                }
              });
              return [intro_ui_pane];
            },
            onUpdate: function() {
              if (this.click) {
                return this.showScreen('game');
              }
            }
          },
          'loading': {
            panes: function(options) {
              var ui_pane;
              ui_pane = new Mantra.UIPane(this.game);
              ui_pane.addTextItem({
                color: 'orange',
                x: 'centered',
                y: 'centered',
                text: function() {
                  return "Loading... " + (AssetManager.getProgress()) + "%";
                }
              });
              return [ui_pane];
            },
            onUpdate: function() {
              if (this.state.current_state !== 'initialized' && AssetManager.isDone()) {
                return this.showScreen('intro');
              }
            }
          },
          'pause': {
            panes: function(options) {
              var ui_pane;
              ui_pane = new Mantra.UIPane(this.game);
              ui_pane.addTextItem({
                color: 'white',
                x: 'centered',
                y: 'centered',
                text: function() {
                  return ':: paused ::';
                }
              });
              return [ui_pane];
            },
            on_keys: {
              P: function() {
                this.game.showScreen(this.options.gameScreen || 'game');
                if (this.game.bg_song) {
                  return this.game.bg_song.resume();
                }
              }
            }
          }
        };
        function Screen(game, name, options) {
          var pane, preset, _i, _len, _ref;
          this.game = game;
          this.name = name;
          this.options = options != null ? options : {};
          this.key_map = {};
          Screen.__super__.constructor.call(this, this.game);
          if (this.options.preset && (preset = Mantra.Screen.presets[this.options.preset])) {
            if (preset.panes) {
              _ref = preset.panes.apply(this, [this.options]);
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                pane = _ref[_i];
                this.add(pane);
              }
            }
            if (preset.onUpdate) {
              this.onUpdate = preset.onUpdate;
            }
            if (preset.on_keys) {
              this.addKeyMappings(preset.on_keys);
            }
          }
          if (this.options.elements) {
            this.add.apply(this, this.options.elements.call(this.game));
          }
          if (this.options.update) {
            this.onUpdate = this.options.update;
          }
          if (this.options.on_keys) {
            this.addKeyMappings(this.options.on_keys);
          }
        }
        Screen.prototype.add = function() {
          var entity, new_entities, _i, _len;
          new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
            entity = new_entities[_i];
            entity.screen = this;
          }
          return Screen.__super__.add.apply(this, new_entities);
        };
        Screen.prototype.update = function() {
          if (this.onUpdate && !this.paused) {
            this.onUpdate.call(this.game);
          }
          return Screen.__super__.update.call(this);
        };
        Screen.prototype.turnOff = function() {
          this.hide();
          return this.pause();
        };
        Screen.prototype.turnOn = function() {
          if (this.been_shown) {
            this.onResume();
          } else {
            this.been_shown = true;
            this.onStart();
          }
          this.show();
          return this.unpause();
        };
        Screen.prototype.onStart = function() {
          return null;
        };
        Screen.prototype.onResume = function() {
          return null;
        };
        Screen.prototype.addKeyMappings = function(key_mappings) {
          return _.extend(this.key_map, key_mappings);
        };
        Screen.prototype.onKey = function(key) {
          if (this.key_map[key]) {
            return this.key_map[key].apply(this);
          }
        };
        return Screen;
      })();
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Mantra.CustomDrawEntity = (function() {
        __extends(CustomDrawEntity, SpriteEntity);
        function CustomDrawEntity(game, position) {
          CustomDrawEntity.__super__.constructor.call(this, game, null, position);
        }
        return CustomDrawEntity;
      })();
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      }, __slice = Array.prototype.slice;
      Mantra.UIPane = (function() {
        __extends(UIPane, EntitySet);
        function UIPane(game, options) {
          this.game = game;
          this.options = options != null ? options : {};
          UIPane.__super__.constructor.apply(this, [this.game].concat(__slice.call(this.options.entities || [])));
          this.pane = true;
        }
        UIPane.prototype.addElement = function(draw_func) {
          var entity;
          entity = new Mantra.Entity(this.game);
          entity.draw = function(context) {
            return draw_func.apply(this, [context]);
          };
          return this.add(entity);
        };
        UIPane.prototype.addText = function(text_draw) {
          return this.addElement(function(context) {
            context.fillStyle = 'red';
            context.font = 'bold 2em Arial';
            return text_draw();
          });
        };
        UIPane.prototype.addTextItem = function(text_item) {
          return this.addElement(function(context) {
            var text;
            context.fillStyle = text_item.color || 'red';
            context.font = text_item.font || 'bold 2em Arial';
            text = text_item.text.apply(this);
            if (text_item.x === 'centered' && !this.game.center_coordinates) {
              text_item.x = this.game.canvas.width / 2 - Math.round(context.measureText(text).width) / 2;
            }
            if (text_item.x === 'centered' && this.game.center_coordinates) {
              text_item.x = -Math.round(context.measureText(text).width) / 2;
            }
            if (text_item.y === 'centered' && !this.game.center_coordinates) {
              text_item.y = this.game.canvas.height / 2;
            }
            if (text_item.y === 'centered' && this.game.center_coordinates) {
              text_item.y = -8;
            }
            return context.fillText(text, text_item.x, text_item.y);
          });
        };
        return UIPane;
      })();
    }).call(this);
    
    
    (function() {
      var Level;
      Level = (function() {
        function Level() {
          var _ref;
          _ref = [null, null], this.map_tiles = _ref[0], this.starting_entities = _ref[1];
        }
        return Level;
      })();
    }).call(this);
    
    (function() {
      var LevelManager;
      LevelManager = (function() {
        function LevelManager() {}
        return LevelManager;
      })();
    }).call(this);
    
    (function() {
      Mantra.Map = (function() {
        function Map(options) {
          this.options = options;
          this.map_width = this.options.map_width;
          this.map_height = this.options.map_height;
          this.tile_width = this.options.tile_width;
          this.tile_height = this.options.tile_height;
          this.translations = this.options.translations;
          this.map_data = this.options.data;
          if (typeof this.map_data === 'string') {
            this.map_data = this.map_data.replace(/\n/g, '').trim().split('');
          }
        }
        Map.prototype.objectMap = function() {
          return this.object_map || (this.object_map = this.generateObjectMap());
        };
        Map.prototype.generateObjectMap = function() {
          var i, object_map, tile, _i, _len, _ref;
          i = 0;
          object_map = [];
          _ref = this.map_data;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tile = _ref[_i];
            if (this.translations[tile] !== null) {
              object_map.push({
                x: i % this.map_width * this.tile_width,
                y: Math.floor(i / this.map_width) * this.tile_height,
                obj: this.translations[tile]
              });
            }
            i++;
          }
          return object_map;
        };
        Map.prototype.presenceLookup = function() {
          return this.presence_map || (this.presence_map = this.generatePresenceLookup());
        };
        Map.prototype.generatePresenceLookup = function() {
          var datum, i, lookup, x, y, _i, _len, _ref;
          i = 0;
          lookup = {};
          _ref = this.map_data;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            datum = _ref[_i];
            x = i % this.map_width;
            y = Math.floor(i / this.map_width);
            if (this.tileIsSolid(datum)) {
              lookup["" + x + "|" + y] = true;
            }
            i++;
          }
          return lookup;
        };
        Map.prototype.tileIsSolid = function(tile) {
          var _ref;
          return !!((_ref = this.translations[tile]) != null ? _ref.solid : void 0);
        };
        Map.prototype.tileCollision = function(obj) {
          return Mantra.Map.tileCollision(obj, this, this.presenceLookup());
        };
        Map.tileCollision = function(obj, map_def, presence_map) {
          var approximation, bottom_tile, left_tile, right_tile, t, tolerance, top_tile, _ref, _ref2, _ref3, _step, _step2;
          _ref = [false, false, false, false], obj.touchedup = _ref[0], obj.toucheddown = _ref[1], obj.touchedleft = _ref[2], obj.touchedright = _ref[3];
                if (typeof data !== "undefined" && data !== null) {
            data;
          } else {
            data = {};
          };
          tolerance = data.tolerance || 6;
          approximation = data.approximation || 10;
          for (t = tolerance, _ref2 = obj.colw - tolerance, _step = approximation; tolerance <= _ref2 ? t <= _ref2 : t >= _ref2; t += _step) {
            bottom_tile = this.getTileInMap(presence_map, obj.x + obj.colx + t, obj.y + obj.coly + obj.colh - 1, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
            top_tile = this.getTileInMap(presence_map, obj.x + obj.colx + t, obj.y + obj.coly, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
            if (bottom_tile) {
              obj.toucheddown = true;
            }
            if (top_tile) {
              obj.touchedup = true;
            }
          }
          for (t = tolerance, _ref3 = obj.colh - tolerance, _step2 = approximation; tolerance <= _ref3 ? t <= _ref3 : t >= _ref3; t += _step2) {
            left_tile = this.getTileInMap(presence_map, obj.x + obj.colx, obj.y + obj.coly + t, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
            right_tile = this.getTileInMap(presence_map, obj.x + obj.colx + obj.colw - 1, obj.y + obj.coly + t, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
            if (left_tile) {
              obj.touchedleft = true;
            }
            if (right_tile) {
              obj.touchedright = true;
            }
          }
          if (obj.touchedup) {
            obj.y = this.yPixelToTile(map_def.tile_height, obj.y + obj.coly) - obj.coly;
          }
          if (obj.toucheddown) {
            obj.y = this.yPixelToTile(map_def.tile_height, obj.y + obj.coly + obj.colh, 0) - obj.coly - obj.colh;
          }
          if (obj.touchedleft) {
            obj.x = this.xPixelToTile(map_def.tile_width, obj.x + obj.colx, 1) - obj.colx;
          }
          if (obj.touchedright) {
            return obj.x = this.xPixelToTile(map_def.tile_width, obj.x + obj.colx + obj.colw - 1, 0) - obj.colx - obj.colw;
          }
        };
        Map.getTileInMap = function(presence_map, x, y, tile_width, tile_height, map_width, map_height) {
          var tile_x, tile_y;
          tile_x = (Math.floor(x / tile_width)) - 1;
          tile_y = (Math.floor(y / tile_height)) - 1;
          if (presence_map["" + tile_x + "|" + tile_y]) {
            return 'solid';
          }
          return null;
        };
        Map.yPixelToTile = function(tile_height, y, gap) {
          if (gap == null) {
            gap = 1;
          }
          return (Math.floor(y / tile_height) + gap) * tile_height;
        };
        Map.xPixelToTile = function(tile_width, x, gap) {
          if (gap == null) {
            gap = 1;
          }
          return (Math.floor(x / tile_width) + gap) * tile_width;
        };
        return Map;
      })();
    }).call(this);
    
    
    (function() {
      Mantra.Canvas = (function() {
        function Canvas() {}
        Canvas.create_canvas = function() {
          return this.j_createCanvas().prependTo('body').get(0);
        };
        Canvas.j_createCanvas = function() {
          return $('<canvas>').attr({
            id: 'game_surface',
            width: '800',
            height: '600'
          }).css({
            'background-color': 'black',
            margin: '0px auto',
            display: 'block'
          });
        };
        Canvas.circle = function(context, params) {
          context.fillStyle = params.style;
          context.beginPath();
          context.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
          context.closePath();
          return context.fill();
        };
        Canvas.rectangle = function(context, params) {
          context.fillStyle = params.style;
          context.strokeStyle = params.style;
          context.lineWidth = params.borderWidth || 1;
          if (params.hollow) {
            return context.strokeRect(params.x, params.y, params.w, params.h);
          } else {
            return context.fillRect(params.x, params.y, params.w, params.h);
          }
        };
        return Canvas;
      })();
    }).call(this);
    
    (function() {
      Mantra.AudioManager = (function() {
        AudioManager.instance = function() {
          var _ref;
          return (_ref = this.singleton) != null ? _ref : this.singleton = new Mantra.AudioManager;
        };
        function AudioManager() {
          this.muted = false;
        }
        AudioManager.prototype.toggle_mute = function() {
          if (this.muted) {
            $logger.log('unmuting');
          } else {
            $logger.log('muting');
          }
          return this.muted = !this.muted;
        };
        return AudioManager;
      })();
    }).call(this);
    
    (function() {
      Mantra.EventManager = (function() {
        function EventManager() {
          this.types = {
            'alien::spawn': []
          };
          this.queues = [[], []];
          this.current_queue = this.queues[0];
        }
        EventManager.prototype.listen = function(type, obj, callback) {
          var _base, _ref;
          return ((_ref = (_base = this.types)[type]) != null ? _ref : _base[type] = []).push({
            listener: obj,
            callback: callback
          });
        };
        EventManager.prototype.signal = function(type, data) {
          return this.current_queue.push({
            type: type,
            data: data
          });
        };
        EventManager.prototype.sendSignals = function() {
          var signal, _i, _len, _ref, _results;
          _ref = this.current_queue;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            signal = _ref[_i];
            _results.push(trigger(signal.type, signal.data));
          }
          return _results;
        };
        EventManager.prototype.trigger = function(type, data) {
          var callback, _base, _i, _len, _ref, _ref2, _results;
          _ref2 = ((_ref = (_base = this.types)[type]) != null ? _ref : _base[type] = []);
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            callback = _ref2[_i];
            _results.push(callback.callback.apply(callback.listener, [data]));
          }
          return _results;
        };
        EventManager.instance = function() {
          var _ref;
          return (_ref = this.singleton) != null ? _ref : this.singleton = new Mantra.EventManager;
        };
        return EventManager;
      })();
    }).call(this);
    
    (function() {
      var Bullet;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Bullet = (function() {
        __extends(Bullet, Mantra.Entity);
        function Bullet(game, options) {
          Bullet.__super__.constructor.call(this, game);
          if (options != null) {
            this.setOptions(options);
          }
        }
        Bullet.prototype.setOptions = function(options) {
          var _ref, _ref2, _ref3, _ref4;
          _ref = [options.x, options.y], this.x = _ref[0], this.y = _ref[1];
          this.angle = options.angle;
          this.speed = (_ref2 = options.speed) != null ? _ref2 : options.speed = 250;
          this.radial_distance = (_ref3 = options.radial_distance) != null ? _ref3 : options.radial_distance = 95;
          this.explodesAt = options.explodesAt;
          if (options.explode != null) {
            this.explode = options.explode;
          }
          _.defaults(options, {
            explodeWhen: function() {
              return Math.abs(this.x) >= Math.abs(this.explodesAt.x) || Math.abs(this.y) >= Math.abs(this.explodesAt.y);
            }
          });
          this.explodeWhen = options.explodeWhen;
          return this.auto_cull = (_ref4 = options.auto_cull) != null ? _ref4 : options.auto_cull = false;
        };
        Bullet.prototype.update = function() {
          if (this.auto_cull && this.outsideScreen()) {
            return this.remove_from_world = true;
          }
          if (this.explodeWhen()) {
            return this.explode();
          }
          this.move();
          return Bullet.__super__.update.call(this);
        };
        Bullet.prototype.move = function() {
          this.x = this.radial_distance * Math.cos(this.angle);
          this.y = this.radial_distance * Math.sin(this.angle);
          return this.radial_distance += this.speed * this.game.clock_tick;
        };
        Bullet.prototype.explode = function() {
          return this.remove_from_world = true;
        };
        return Bullet;
      })();
      root.Bullet = Bullet;
    }).call(this);
    
    (function() {
      var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
      Mantra.Game = (function() {
        function Game(options) {
          var definition, screen_name, _ref, _ref2, _ref3;
          this.options = options;
          this.gameLoop = __bind(this.gameLoop, this);
                if ((_ref = this.canvas) != null) {
            _ref;
          } else {
            this.canvas = this.options.canvas || Mantra.Canvas.create_canvas();
          };
          this.context = this.canvas.getContext('2d');
          this.entities = [];
          this.timer = new Mantra.Timer;
          this.screens = {};
          this.key_map = {};
          _.defaults(this.options, {
            assets: {
              images: []
            },
            screens: {
              loading: 'preset'
            },
            center_coordinates: false,
            process_game_over: function() {
              return null;
            }
          });
          if (this.options.center_coordinates) {
            this.center_coordinates = true;
          }
          this.state = new FSM('initialized', {
            name: 'initialized'
          });
          this.state.add_transition('start', 'initialized', null, 'started');
          this.state.add_transition('lose', 'started', (__bind(function() {
            return this.options.process_game_over.call(this);
          }, this)), 'game_lost');
          this.state.add_transition('restart', ['started', 'game_won', 'game_lost'], null, 'started');
          _ref2 = [null, null, null, null], this.surfaceWidth = _ref2[0], this.surfaceHeight = _ref2[1], this.halfSurfaceWidth = _ref2[2], this.halfSurfaceHeight = _ref2[3];
          _ref3 = this.options.screens;
          for (screen_name in _ref3) {
            definition = _ref3[screen_name];
            if (typeof definition === 'string' && definition === 'preset') {
              definition = {
                preset: screen_name
              };
            }
            this.defineScreen(screen_name, definition);
          }
          if (this.options.on_keypress) {
            this.key_map = this.options.on_keypress;
          }
          if (this.options.assets) {
            this.assets(this.options.assets);
          }
        }
        Game.prototype.assets = function(assets) {
          this.assets = assets;
          return null;
        };
        Game.prototype.init = function() {
          this.surfaceWidth = this.canvas.width;
          this.surfaceHeight = this.canvas.height;
          this.halfSurfaceWidth = this.surfaceWidth / 2;
          this.halfSurfaceHeight = this.surfaceHeight / 2;
          this.startGameLoop({
            on_screen: 'loading'
          });
          return this.startInput();
        };
        Game.prototype.start = function() {
          this.showScreen(this.currentScreen);
          this.state.send_event('start');
          return $logger.game.info('Game started');
        };
        Game.prototype.addEntity = function() {
          var entity, new_entities, _i, _len, _results;
          new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          _results = [];
          for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
            entity = new_entities[_i];
            _results.push(this.entities.push(entity));
          }
          return _results;
        };
        Game.prototype.translateToCenter = function() {
          return this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        };
        Game.prototype.update = function() {
          var entity, i, _i, _j, _len, _len2, _ref, _ref2, _ref3, _results;
          if (this.entities.length) {
            _ref = this.entities;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entity = _ref[_i];
              if (!entity.remove_from_world) {
                entity.update();
              }
            }
            _ref2 = this.entities;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              entity = _ref2[_j];
              entity.cull();
            }
            _results = [];
            for (i = _ref3 = this.entities.length - 1; _ref3 <= 0 ? i < 0 : i > 0; _ref3 <= 0 ? i++ : i--) {
              if (this.entities[i].remove_from_world) {
                _results.push(this.entities.splice(i, 1));
              }
            }
            return _results;
          }
        };
        Game.prototype.draw = function(callback) {
          var entity, _i, _len, _ref;
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.context.save();
          if (this.center_coordinates) {
            this.translateToCenter();
          }
          _ref = this.entities;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            entity = _ref[_i];
            entity.draw(this.context);
          }
          if (callback) {
            callback(this);
          }
          return this.context.restore();
        };
        Game.prototype.loop = function() {
          this.clock_tick = this.timer.tick();
          this.update();
          this.draw();
          return this.click = null;
        };
        Game.prototype.startGameLoop = function(options) {
          if (options == null) {
            options = {};
          }
          if (this.screens[options.on_screen]) {
            this.showScreen(options.on_screen);
          }
          return this.gameLoop();
        };
        Game.prototype.gameLoop = function() {
          this.loop();
          return requestAnimFrame(this.gameLoop, this.canvas);
        };
        Game.prototype.onKey = function(key) {
          if (this.key_map[key]) {
            this.key_map[key]();
          }
          if (this.currentScreen) {
            return this.currentScreen.onKey(key);
          }
        };
        Game.prototype.showScreen = function(screen) {
          var name, skreen, _ref;
          if (typeof screen === 'string') {
            screen = this.screens[screen];
          }
          $logger.game.info("Showing screen '" + screen.name + "'");
          _ref = this.screens;
          for (name in _ref) {
            skreen = _ref[name];
            skreen.turnOff();
          }
          screen.turnOn();
          return this.currentScreen = screen;
        };
        Game.prototype.startInput = function() {
          var getXandY;
          getXandY = __bind(function(e) {
            var x, y;
            x = e.clientX - this.canvas.getBoundingClientRect().left;
            if (this.center_coordinates) {
              x -= this.canvas.width / 2;
            }
            y = e.clientY - this.canvas.getBoundingClientRect().top;
            if (this.center_coordinates) {
              y -= this.canvas.height / 2;
            }
            return {
              x: x,
              y: y
            };
          }, this);
          this.canvas.addEventListener('click', __bind(function(e) {
            this.click = getXandY(e);
            e.stopPropagation();
            return e.preventDefault();
          }, this), false);
          return this.canvas.addEventListener('mousemove', __bind(function(e) {
            return this.mouse = getXandY(e);
          }, this), false);
        };
        Game.prototype.defineScreen = function(name, definition) {
          var screen;
          if (definition == null) {
            definition = {};
          }
          screen = new Mantra.Screen(this, name, definition);
          this.screens[screen.name] = screen;
          return this.addEntity(screen);
        };
        return Game;
      })();
    }).call(this);
    
    (function() {
      Mantra.Controls = {
        moveByKeys: function() {
          if (keydown.left) {
            this.x -= this.speed;
          }
          if (keydown.right) {
            this.x += this.speed;
          }
          if (keydown.up) {
            this.y -= this.speed;
          }
          if (keydown.down) {
            return this.y += this.speed;
          }
        }
      };
    }).call(this);
    
    (function() {
      AssetManager.configureSoundManager(root.asset_path);
    }).call(this);
    
    
    (function() {
      var EightByFive;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      }, __slice = Array.prototype.slice;
      EightByFive = (function() {
        __extends(EightByFive, Mantra.Game);
        function EightByFive(options) {
          this.options = options != null ? options : {};
          this.player_name = 'Player 1';
          EightByFive.__super__.constructor.call(this, _.defaults(this.options, {
            assets: {
              sounds: {
                'bullet_shot': 'games/8by5/audio/simple_shot.mp3'
              }
            },
            screens: {
              loading: 'preset',
              pause: 'preset',
              intro: {
                preset: 'intro',
                text: function() {
                  return "" + this.player_name + ", click anywhere to start!";
                }
              },
              game: {
                elements: function() {
                  var ent, map_enities, _i, _len, _ref;
                  this.defender = new Mantra.Defender(this);
                  this.defender.setCoords({
                    x: 332,
                    y: 182
                  });
                  this.map = this.loadMap();
                  map_enities = [];
                  _ref = this.map.objectMap();
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    ent = _ref[_i];
                    map_enities.push(new Mantra.MapEntity(this, {
                      x: ent.x,
                      y: ent.y,
                      w: 32,
                      h: 32,
                      style: ent.obj.color
                    }));
                  }
                  return [this.defender].concat(__slice.call(map_enities));
                },
                on_keys: {
                  P: function() {
                    return this.game.showScreen('pause');
                  }
                }
              }
            }
          }));
        }
        EightByFive.prototype.loadMap = function() {
          return new Mantra.Map({
            map_width: 22,
            map_height: 20,
            tile_width: 32,
            tile_height: 32,
            translations: {
              'o': {
                solid: true,
                color: 'orange'
              },
              'r': {
                solid: false,
                color: 'red'
              },
              'x': {
                solid: true
              },
              ' ': null
            },
            data: 'xxxxxxxxxxxxxxxxxxxxxx\nx    x x             x\nx      x             x\nx      xxxx       xxxx\nx  x   x    r        x\nx      x      o      x\nx  o                 x\nx            x x     x\nx            xxx     x\nx      xx            x\nx      xx            x\nx      xx o     oo   x\nx      xx            x\nx      xx     xxxxxxxx\nx                    x\nx      xx r          x\nx      xx      or    x\nxxxxxxxxxxxxxxxxxxxxxx'
          });
        };
        EightByFive.prototype.configureEngine = function() {
          return $logger.levels({
            global: 'debug',
            sound: 'warn',
            assets: 'info',
            input: 'info',
            game: 'info'
          });
        };
        return EightByFive;
      })();
      root.EightByFive = EightByFive;
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Mantra.Defender = (function() {
        __extends(Defender, Mantra.Entity);
        function Defender(game, radius) {
          var _ref, _ref2;
          this.radius = radius != null ? radius : 16;
          Defender.__super__.constructor.call(this, game, null, 0);
          this.speed = 5;
          _ref = [16, 16], this.colx = _ref[0], this.coly = _ref[1];
          _ref2 = [32, 32], this.colw = _ref2[0], this.colh = _ref2[1];
        }
        Defender.prototype.update = function() {
          Mantra.Controls.moveByKeys.call(this);
          if (this.game.click) {
            this.shoot();
          }
          return this.game.map.tileCollision(this);
        };
        Defender.prototype.draw = function(context) {
          Mantra.Canvas.circle(context, {
            x: this.x,
            y: this.y,
            radius: this.radius,
            style: 'rgba(100, 200, 20, .8)'
          });
          if (this.game.draw_collision_boxes) {
            return Mantra.Canvas.rectangle(context, {
              x: this.x - this.colx,
              y: this.y - this.coly,
              w: this.radius * 2,
              h: this.radius * 2,
              hollow: true,
              style: 'white'
            });
          }
        };
        Defender.prototype.setCoords = function(coords) {
          this.x = coords.x;
          return this.y = coords.y;
        };
        Defender.prototype.shoot = function() {
          this.game.screens.game.add(new EBF.DefenderBullet(this.game, {
            x: this.x,
            y: this.y,
            angle: Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x),
            radial_offset: this.radius + 3
          }));
          return AssetManager.playSound('bullet_shot');
        };
        return Defender;
      })();
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      EBF.DefenderBullet = (function() {
        __extends(DefenderBullet, Bullet);
        function DefenderBullet(game, options) {
          this.options = options;
          DefenderBullet.__super__.constructor.call(this, game);
          this.setOptions({
            radial_distance: 0,
            angle: this.options.angle,
            speed: 200,
            explodeWhen: Mantra.Timer.after(this, {
              milliseconds: 1250
            })
          });
          _.defaults(this.options, {
            size: 4
          });
          this.shotFrom = {
            x: this.options.x,
            y: this.options.y
          };
          this.firedAt = Date.now();
          this.radial_offset = this.options.radial_offset;
        }
        DefenderBullet.prototype.draw = function(context) {
          Mantra.Canvas.rectangle(context, {
            x: this.x,
            y: this.y,
            w: this.options.size,
            h: this.options.size,
            style: 'rgba(240, 240, 240, 1)'
          });
          Mantra.Canvas.rectangle(context, {
            x: this.x + 1,
            y: this.y - 1,
            w: 2,
            h: 2,
            style: 'white'
          });
          Mantra.Canvas.rectangle(context, {
            x: this.x + 1,
            y: this.y + this.options.size / 2 + 1,
            w: 2,
            h: 2,
            style: 'white'
          });
          Mantra.Canvas.rectangle(context, {
            x: this.x + this.options.size / 2 + 2,
            y: this.y + 1,
            w: 1,
            h: 2,
            style: 'white'
          });
          return Mantra.Canvas.rectangle(context, {
            x: this.x - 1,
            y: this.y + 1,
            w: 1,
            h: 2,
            style: 'white'
          });
        };
        DefenderBullet.prototype.move = function() {
          var starting_distance;
          starting_distance = this.radial_offset + this.radial_distance;
          this.x = this.shotFrom.x + (starting_distance * Math.cos(this.angle));
          this.y = this.shotFrom.y + (starting_distance * Math.sin(this.angle));
          return this.radial_distance += this.speed * this.game.clock_tick;
        };
        return DefenderBullet;
      })();
    }).call(this);
    
    (function() {
      var EightByFive;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      }, __slice = Array.prototype.slice;
      EightByFive = (function() {
        __extends(EightByFive, Mantra.Game);
        function EightByFive(options) {
          this.options = options != null ? options : {};
          this.player_name = 'Player 1';
          EightByFive.__super__.constructor.call(this, _.defaults(this.options, {
            assets: {
              sounds: {
                'bullet_shot': 'games/8by5/audio/simple_shot.mp3'
              }
            },
            screens: {
              loading: 'preset',
              pause: 'preset',
              intro: {
                preset: 'intro',
                text: function() {
                  return "" + this.player_name + ", click anywhere to start!";
                }
              },
              game: {
                elements: function() {
                  var ent, map_enities, _i, _len, _ref;
                  this.defender = new Mantra.Defender(this);
                  this.defender.setCoords({
                    x: 332,
                    y: 182
                  });
                  this.map = this.loadMap();
                  map_enities = [];
                  _ref = this.map.objectMap();
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    ent = _ref[_i];
                    map_enities.push(new Mantra.MapEntity(this, {
                      x: ent.x,
                      y: ent.y,
                      w: 32,
                      h: 32,
                      style: ent.obj.color
                    }));
                  }
                  return [this.defender].concat(__slice.call(map_enities));
                },
                on_keys: {
                  P: function() {
                    return this.game.showScreen('pause');
                  }
                }
              }
            }
          }));
        }
        EightByFive.prototype.loadMap = function() {
          return new Mantra.Map({
            map_width: 22,
            map_height: 20,
            tile_width: 32,
            tile_height: 32,
            translations: {
              'o': {
                solid: true,
                color: 'orange'
              },
              'r': {
                solid: false,
                color: 'red'
              },
              'x': {
                solid: true
              },
              ' ': null
            },
            data: 'xxxxxxxxxxxxxxxxxxxxxx\nx    x x             x\nx      x             x\nx      xxxx       xxxx\nx  x   x    r        x\nx      x      o      x\nx  o                 x\nx            x x     x\nx            xxx     x\nx      xx            x\nx      xx            x\nx      xx o     oo   x\nx      xx            x\nx      xx     xxxxxxxx\nx                    x\nx      xx r          x\nx      xx      or    x\nxxxxxxxxxxxxxxxxxxxxxx'
          });
        };
        EightByFive.prototype.configureEngine = function() {
          return $logger.levels({
            global: 'debug',
            sound: 'warn',
            assets: 'info',
            input: 'info',
            game: 'info'
          });
        };
        return EightByFive;
      })();
      root.EightByFive = EightByFive;
    }).call(this);
    
    (function() {
      var EvilAliens;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
      EvilAliens = (function() {
        __extends(EvilAliens, Mantra.Game);
        function EvilAliens(options) {
          this.options = options != null ? options : {};
          this.image_path = "" + root.asset_path + "games/evil_aliens/images/";
          this.audio_path = "" + root.asset_path + "games/evil_aliens/audio/";
          EvilAliens.__super__.constructor.call(this, _.defaults(this.options, {
            center_coordinates: true,
            on_keypress: {
              M: function() {
                return $audio_manager.toggle_mute();
              }
            },
            process_game_over: __bind(function() {
              this.showScreen('game_lost');
              return this.bg_song.stop();
            }, this),
            screens: {
              loading: 'preset',
              pause: 'preset',
              intro: {
                preset: 'intro',
                text: 'Defend Earth from the alien invasion!'
              }
            },
            assets: {
              root_path: 'games/evil_aliens/',
              images: {
                'earth': 'earth.png',
                'alien': 'alien.png',
                'sentry': 'sentry.png',
                'bullet': 'bullet-single.png',
                'explosion': 'explosion.png',
                'alien_explosion': 'alien-explosion.png'
              },
              sounds: {
                'alien-boom': 'alien_boom.mp3',
                'bullet-boom': 'bullet_boom.mp3',
                's_bullet': 'bullet.mp3'
              },
              music: {
                'chaos': "countdown_to_chaos.mp3"
              }
            }
          }));
          this.resetStats();
        }
        EvilAliens.prototype.guiPane = function() {
          this.ui_pane = new Mantra.UIPane(this);
          this.ui_pane.addTextItem({
            x: this.canvas.width / 2 - 150,
            y: this.canvas.height / 2 - 25,
            text: function() {
              return "Health: " + this.game.lives;
            }
          });
          this.ui_pane.addTextItem({
            color: 'orange',
            x: -this.canvas.width / 2 + 25,
            y: this.canvas.height / 2 - 25,
            text: function() {
              return "Score: " + this.game.score;
            }
          });
          return this.ui_pane;
        };
        EvilAliens.prototype.start = function() {
          this.defineScreen('game', {
            init_on_start: true,
            elements: function() {
              this.background = new Mantra.Background(this, {
                x: -this.canvas.width / 2,
                y: -this.canvas.height / 2
              });
              this.sentry = new Sentry(this);
              this.earth = new Earth(this);
              this.mothership = new Mothership(this);
              this.bg_song = AssetManager.getBackgroundSong('chaos');
              this.game_widget = new GameWidget(this, {
                x: 100,
                y: -100
              });
              return [this.background, this.sentry, this.earth, this.mothership, this.guiPane(), this.game_widget];
            },
            on_keys: {
              P: function() {
                this.showScreen('pause');
                return this.bg_song.pause();
              }
            },
            on_start: function() {
              return this.bg_song.play();
            }
          });
          this.defineScreen('game_lost', {
            elements: function() {
              var intro_ui_pane;
              intro_ui_pane = new Mantra.UIPane(this);
              intro_ui_pane.addTextItem({
                color: 'red',
                x: 'centered',
                y: 0,
                text: __bind(function() {
                  return "Game over!\nYour score was " + this.score + ".\nClick to restart.";
                }, this)
              });
              return [intro_ui_pane];
            },
            update: function() {
              if (this.click) {
                this.restart();
                this.bg_song.restart();
                return this.showScreen('game');
              }
            }
          });
          $em.listen('alien::death', this, function(data) {
            $logger.game.info("Alien killed at " + (data.alien.s_coords()));
            return this.score += 10;
          });
          $em.listen('alien::hit_planet', this, function(date) {
            this.lives -= 1;
            if (this.lives === 0) {
              return this.state.send_event('lose');
            }
          });
          return EvilAliens.__super__.start.call(this);
        };
        EvilAliens.prototype.restart = function() {
          var ent, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
          this.state.send_event('restart');
          _ref = this.getAliens();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ent = _ref[_i];
            ent.remove_from_world = true;
          }
          _ref2 = this.getBullets();
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            ent = _ref2[_j];
            ent.remove_from_world = true;
          }
          _ref3 = this.getBulletExplosions();
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            ent = _ref3[_k];
            ent.remove_from_world = true;
          }
          return this.resetStats();
        };
        EvilAliens.prototype.resetStats = function() {
          this.lives = 10;
          return this.score = 0;
        };
        EvilAliens.prototype.getAliens = function() {
          var ent, _i, _len, _ref, _results;
          _ref = this.screens.game.entities;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ent = _ref[_i];
            if (ent instanceof Alien) {
              _results.push(ent);
            }
          }
          return _results;
        };
        EvilAliens.prototype.getBullets = function() {
          var ent, _i, _len, _ref, _results;
          _ref = this.screens.game.entities;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ent = _ref[_i];
            if (ent instanceof EarthBullet) {
              _results.push(ent);
            }
          }
          return _results;
        };
        EvilAliens.prototype.getBulletExplosions = function() {
          var ent, _i, _len, _ref, _results;
          _ref = this.screens.game.entities;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ent = _ref[_i];
            if (ent instanceof BulletExplosion) {
              _results.push(ent);
            }
          }
          return _results;
        };
        EvilAliens.prototype.configureEngine = function() {
          return $logger.levels({
            global: 'debug',
            sound: 'warn',
            assets: 'warn',
            input: 'warn',
            game: 'info'
          });
        };
        return EvilAliens;
      })();
      root.EvilAliens = EvilAliens;
    }).call(this);
    
    (function() {
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Mantra.Background = (function() {
        __extends(Background, Mantra.CustomDrawEntity);
        function Background(game, position) {
          var big, i;
          this.game = game;
                if (position != null) {
            position;
          } else {
            position = {
              x: 0,
              y: 0
            };
          };
          Background.__super__.constructor.call(this, this.game, position);
          this.coords = (function() {
            var _results;
            _results = [];
            for (i = 0; i <= 50; i++) {
              big = !(i % 4);
              _results.push({
                x: Math.random() * this.game.canvas.width,
                y: Math.random() * this.game.canvas.height,
                w: (big ? 3 : 2),
                h: (big ? 3 : 2)
              });
            }
            return _results;
          }).call(this);
        }
        Background.prototype.draw = function(context) {
          var coord_set, _i, _len, _ref, _results;
          context.fillStyle = 'white';
          _ref = this.coords;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            coord_set = _ref[_i];
            _results.push(context.fillRect(this.x + coord_set.x, this.y + coord_set.y, coord_set.w, coord_set.h));
          }
          return _results;
        };
        return Background;
      })();
    }).call(this);
    
    (function() {
      var Alien;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Alien = (function() {
        __extends(Alien, SpriteEntity);
        function Alien(game, radial_distance, angle) {
          this.radial_distance = radial_distance;
          this.angle = angle;
          Alien.__super__.constructor.call(this, game, Sprite.rotateAndCache(AssetManager.getImage('alien'), this.angle));
          this.radius = this.sprite.height / 2;
          this.speed = 150;
          this.setCoords();
        }
        Alien.prototype.update = function() {
          this.setCoords();
          this.radial_distance -= this.speed * this.game.clock_tick;
          if (this.hitPlanet()) {
            this.remove_from_world = true;
            $em.trigger('alien::hit_planet', {
              alien: this
            });
          }
          return Alien.__super__.update.call(this);
        };
        Alien.prototype.draw = function(context) {
          this.drawSpriteCentered(context);
          return Alien.__super__.draw.call(this, context);
        };
        Alien.prototype.setCoords = function() {
          this.x = this.radial_distance * Math.cos(this.angle);
          return this.y = this.radial_distance * Math.sin(this.angle);
        };
        Alien.prototype.explode = function() {
          this.remove_from_world = true;
          this.game.screens.game.add(new AlienExplosion(this.game, this.x, this.y));
          AssetManager.getSound('alien-boom').play();
          return $em.trigger('alien::death', {
            alien: this
          });
        };
        Alien.prototype.hitPlanet = function() {
          var distance_squared, radii_squared;
          distance_squared = (this.x * this.x) + (this.y * this.y);
          radii_squared = (this.radius + this.game.earth.radius) * (this.radius + this.game.earth.radius);
          return distance_squared < radii_squared;
        };
        return Alien;
      })();
      root.Alien = Alien;
    }).call(this);
    
    (function() {
      var AlienExplosion;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      AlienExplosion = (function() {
        __extends(AlienExplosion, SpriteEntity);
        function AlienExplosion(game, x, y) {
          AlienExplosion.__super__.constructor.call(this, game, null, {
            x: x,
            y: y
          });
          this.animation = new Mantra.Animation(AssetManager.getImage('alien_explosion'), 69, 0.1);
          this.radius = this.animation.frameWidth / 2;
        }
        AlienExplosion.prototype.update = function() {
          AlienExplosion.__super__.update.call(this);
          if (this.animation.isDone()) {
            return this.remove_from_world = true;
          }
        };
        AlienExplosion.prototype.draw = function(context) {
          this.animation.drawFrame(this.game.clock_tick, context, this.x, this.y);
          return AlienExplosion.__super__.draw.call(this, context);
        };
        return AlienExplosion;
      })();
      root.AlienExplosion = AlienExplosion;
    }).call(this);
    
    (function() {
      Mantra.Animation = (function() {
        function Animation(spriteSheet, frameWidth, frameDuration, loop) {
          this.spriteSheet = spriteSheet;
          this.frameWidth = frameWidth;
          this.frameDuration = frameDuration;
          this.loop = loop;
          this.frameHeight = this.spriteSheet.height;
          this.totalTime = (this.spriteSheet.width / this.frameWidth) * this.frameDuration;
          this.elapsedTime = 0;
        }
        Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
          var index, locX, locY;
                if (scaleBy != null) {
            scaleBy;
          } else {
            scaleBy = 1;
          };
          this.elapsedTime += tick;
          if (this.loop) {
            if (this.isDone()) {
              this.elapsedTime = 0;
            }
          } else if (this.isDone()) {
            return;
          }
          index = this.currentFrame();
          locX = x - (this.frameWidth / 2) * scaleBy;
          locY = y - (this.frameHeight / 2) * scaleBy;
          return ctx.drawImage(this.spriteSheet, index * this.frameWidth, 0, this.frameWidth, this.frameHeight, locX, locY, this.frameWidth * scaleBy, this.frameHeight * scaleBy);
        };
        Animation.prototype.currentFrame = function() {
          return Math.floor(this.elapsedTime / this.frameDuration);
        };
        Animation.prototype.isDone = function() {
          return this.elapsedTime >= this.totalTime;
        };
        return Animation;
      })();
    }).call(this);
    
    (function() {
      var BulletExplosion;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      BulletExplosion = (function() {
        __extends(BulletExplosion, SpriteEntity);
        function BulletExplosion(game, x, y) {
          BulletExplosion.__super__.constructor.call(this, game, null, {
            x: x,
            y: y
          });
          this.animation = new Mantra.Animation(AssetManager.getImage('explosion'), 34, 0.1);
          this.radius = this.animation.frameWidth / 2;
        }
        BulletExplosion.prototype.update = function() {
          var alien, _i, _len, _ref, _results;
          BulletExplosion.__super__.update.call(this);
          if (this.animation.isDone()) {
            return this.remove_from_world = true;
          }
          this.radius = this.animation.frameWidth / 2 * this.scaleFactor();
          _ref = this.game.getAliens();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            alien = _ref[_i];
            if (this.isCaughtInExplosion(alien)) {
              _results.push(alien.explode());
            }
          }
          return _results;
        };
        BulletExplosion.prototype.scaleFactor = function() {
          return 1 + (this.animation.currentFrame() / 3);
        };
        BulletExplosion.prototype.draw = function(context) {
          this.animation.drawFrame(this.game.clock_tick, context, this.x, this.y, this.scaleFactor());
          return BulletExplosion.__super__.draw.call(this, context);
        };
        BulletExplosion.prototype.isCaughtInExplosion = function(alien) {
          return Mantra.Geometry.withinCircle(this, alien);
        };
        return BulletExplosion;
      })();
      root.BulletExplosion = BulletExplosion;
    }).call(this);
    
    (function() {
      var Earth;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Earth = (function() {
        __extends(Earth, SpriteEntity);
        function Earth(game) {
          Earth.__super__.constructor.call(this, game, AssetManager.getImage('earth'));
          this.radius = 67;
        }
        Earth.prototype.draw = function(context) {
          context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
          return Earth.__super__.draw.call(this, context);
        };
        return Earth;
      })();
      root.Earth = Earth;
    }).call(this);
    
    (function() {
      var EarthBullet;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      EarthBullet = (function() {
        __extends(EarthBullet, Bullet);
        function EarthBullet(game, x, y, angle, explodesAt) {
          this.angle = angle;
          this.explodesAt = explodesAt;
          EarthBullet.__super__.constructor.call(this, game, {
            radial_distance: 95,
            angle: this.angle,
            explodesAt: explodesAt,
            speed: 250
          });
          this.sprite = Sprite.rotateAndCache(AssetManager.getImage('bullet'), this.angle);
        }
        EarthBullet.prototype.draw = function(context) {
          this.drawSpriteCentered(context);
          return EarthBullet.__super__.draw.call(this, context);
        };
        EarthBullet.prototype.explode = function() {
          AssetManager.getSound('bullet-boom').play();
          this.game.screens.game.add(new BulletExplosion(this.game, this.explodesAt.x, this.explodesAt.y));
          return EarthBullet.__super__.explode.call(this);
        };
        EarthBullet.prototype.draw = function(context) {
          this.drawSpriteCentered(context);
          return EarthBullet.__super__.draw.call(this, context);
        };
        return EarthBullet;
      })();
      root.EarthBullet = EarthBullet;
    }).call(this);
    
    (function() {
      var GameWidget;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      GameWidget = (function() {
        __extends(GameWidget, SpriteEntity);
        function GameWidget(game, coords, radius) {
          this.radius = radius != null ? radius : 30;
          GameWidget.__super__.constructor.call(this, game, null, 0);
          this.speed = 5;
          this.setCoords(coords);
        }
        GameWidget.prototype.update = function() {
          var alien, _i, _len, _ref;
          if (keydown.left) {
            this.x -= this.speed;
          }
          if (keydown.right) {
            this.x += this.speed;
          }
          if (keydown.up) {
            this.y -= this.speed;
          }
          if (keydown.down) {
            this.y += this.speed;
          }
          _ref = this.game.getAliens();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            alien = _ref[_i];
            if (this.isCaughtInField(alien)) {
              alien.explode();
            }
          }
          return GameWidget.__super__.update.call(this);
        };
        GameWidget.prototype.draw = function(context) {
          context.fillStyle = "rgba(200, 255, 255, 0.9)";
          context.beginPath();
          context.arc(this.x, this.y, 30, 0, Math.PI * 2, true);
          context.closePath();
          context.fill();
          return GameWidget.__super__.draw.call(this, context);
        };
        GameWidget.prototype.isCaughtInField = function(alien) {
          var distance_squared, radii_squared;
          distance_squared = ((this.x - alien.x) * (this.x - alien.x)) + ((this.y - alien.y) * (this.y - alien.y));
          radii_squared = (this.radius + alien.radius) * (this.radius + alien.radius);
          return distance_squared < radii_squared;
        };
        GameWidget.prototype.setCoords = function(coords) {
          this.x = coords.x;
          return this.y = coords.y;
        };
        return GameWidget;
      })();
      root.GameWidget = GameWidget;
    }).call(this);
    
    (function() {
      var Mothership;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Mothership = (function() {
        __extends(Mothership, SpriteEntity);
        function Mothership(game) {
          var machine;
          this.game = game;
          Mothership.__super__.constructor.call(this, this.game);
          machine = new Machine();
          this.state = machine.generateTree({
            identifier: 'idle',
            strategy: 'sequential',
            children: [
              {
                identifier: 'move'
              }, {
                identifier: 'spawn',
                strategy: 'sequential',
                children: [
                  {
                    identifier: 'spawnOne'
                  }, {
                    identifier: 'spawnMultiple'
                  }
                ]
              }
            ]
          }, this);
          this.spawn_delay = 1.5;
        }
        Mothership.prototype.draw = function() {
          return null;
        };
        Mothership.prototype.update = function() {
          return this.state = this.state.tick();
        };
        Mothership.prototype.idle = function() {
          return null;
        };
        Mothership.prototype.move = function() {};
        Mothership.prototype.canMove = function() {
          return true;
        };
        Mothership.prototype.canSpawn = function() {
          return !this.last_alien_addded_at || (this.game.timer.time_passed - this.last_alien_addded_at) > this.spawn_delay;
        };
        Mothership.prototype.spawnOne = function() {
          $logger.game.info('Spawning one');
          return this.spawnAlien(Math.random() * Math.PI * 180);
        };
        Mothership.prototype.spawnMultiple = function() {
          $logger.game.info('Spawning multiple');
          this.spawnAlien(Math.random() * Math.PI * 180);
          return this.spawnAlien(Math.random() * Math.PI * 180);
        };
        Mothership.prototype.spawnAlien = function(angle) {
          var new_alien;
          new_alien = new Alien(this.game, this.game.canvas.width / 2 + 20, angle);
          this.game.screens.game.add(new_alien);
          this.last_alien_addded_at = this.game.timer.time_passed;
          return $logger.game.info("Alien spawn: " + new_alien.radial_distance + "km @ " + new_alien.angle);
        };
        return Mothership;
      })();
      root.Mothership = Mothership;
    }).call(this);
    
    (function() {
      var Sentry;
      var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
      };
      Sentry = (function() {
        __extends(Sentry, SpriteEntity);
        function Sentry(game) {
          this.distanceFromEarthCenter = 85;
          Sentry.__super__.constructor.call(this, game, AssetManager.getImage('sentry'), {
            x: 0,
            y: this.distanceFromEarthCenter
          });
          this.radius = this.sprite.width / 2;
          this.angle = 0;
        }
        Sentry.prototype.update = function() {
          if (this.game.mouse) {
            this.angle = Math.atan2(this.game.mouse.y, this.game.mouse.x);
            if (this.angle < 0) {
              this.angle += Math.PI * 2;
            }
            this.x = Math.cos(this.angle) * this.distanceFromEarthCenter;
            this.y = Math.sin(this.angle) * this.distanceFromEarthCenter;
          }
          if (this.game.click && !Mantra.Geometry.withinCircle(this.game.earth, {
            x: this.game.click.x,
            y: this.game.click.y,
            radius: 1
          }, {
            buffer: 20
          })) {
            this.shoot();
          }
          return Sentry.__super__.update.call(this);
        };
        Sentry.prototype.draw = function(context) {
          context.save();
          context.translate(this.x, this.y);
          context.rotate(this.angle + Math.PI / 2);
          context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
          context.restore();
          return Sentry.__super__.draw.call(this, context);
        };
        Sentry.prototype.shoot = function() {
          this.game.screens.game.add(new EarthBullet(this.game, this.x, this.y, this.angle, this.game.click));
          return AssetManager.getSound('s_bullet').play();
        };
        return Sentry;
      })();
      root.Sentry = Sentry;
    }).call(this);
    
    
    return typeof mantra_all != 'undefined' ? mantra_all : undefined;
}));