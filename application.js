/*!
 * jQuery JavaScript Library v2.1.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:10Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
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
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
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
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
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
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
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

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
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
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

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
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) );

	// #11217 - WebKit loses check when the name is after the checked attribute
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				// Support: Android < 4.0
				src.defaultPrevented === undefined &&
				src.getPreventDefault && src.getPreventDefault() ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;" +
			"-moz-box-sizing:content-box;box-sizing:content-box",
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;" +
		"margin-top:1px";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;" +
			"position:absolute;top:1%";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Use window.getComputedStyle because jsdom on node.js will break without it.
	if ( window.getComputedStyle ) {
		jQuery.extend(support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				// Clean up the div for other support tests.
				div.innerHTML = "";

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Support: Chrome, Safari
				// Setting style to blank string required to delete "style: x !important;"
				style[ name ] = "";
				style[ name ] = value;
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

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		// Get default display if display is currently "none"
		if ( display === "none" ) {
			display = defaultDisplay( elem.nodeName );
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

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
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

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

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

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

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
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

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
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

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

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
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

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
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

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
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
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
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
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
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
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
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
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

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
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

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
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
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
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

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);


/**
Provides the global namespace for SDK framework classes.  Provides convenience
methods for app management.
@module AP
@static
 */

(function() {
  var AP,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  AP = (function() {
    function AP() {}


    /**
    Name of the active application.
    @property activeAppName
    @type String
     */

    AP.activeAppName = null;


    /**
    Namespace for authentication/authorization classes.
    @property auth
    @type Object
     */

    AP.auth = {};


    /**
    Namespace for general utility classes.
    @property utility
    	@type Object
     */

    AP.utility = {};


    /**
    Namespace for SDK model superclasses.
    @property model
    	@type Object
     */

    AP.model = {};


    /**
    Namespace for SDK collection superclasses.
    @property collection
    	@type Object
     */

    AP.collection = {};


    /**
    Namespace for model relationship classes.
    @property relationship
    	@type Object
     */

    AP.relationship = {};


    /**
    Namespace for apps.  In most cases only one app is present.
    @property apps
    	@type Object
     */

    AP.apps = {};


    /**
    Base URL for all XHR requests.
    @property baseUrl
    	@type String
     */

    AP.baseUrl = null;


    /**
    Enables mock server in all applications.  SinonJS is required if
    `useMockServer` is `true`.
    @property useMockServer
    	@type Boolean
     */

    AP.useMockServer = false;


    /**
    Enables offline caching of successful `GET` requests.
    @property useOfflineCache
    	@type Boolean
     */

    AP.useOfflineCache = true;


    /**
    Offline cache storage capacity in bytes.
    @property offlineStorageCapacity
    @type Number
     */

    AP.offlineStorageCapacity = 4 * 1024 * 1024;


    /**
    Registers an app class with a given name.  The name may be used later
    for look-up.  Registering an app with a duplicate name replaces any
    existing app.
    @method registerApp
    @param {AP.Application} app the application class
    @param {String} name the name of the application
     */

    AP.registerApp = function(app, name) {
      if (app && name) {
        return this.apps[name] = app;
      }
    };


    /**
    Returns an app class registered under the given name.
    @method getApp
    @param {String} name the name of the application to look up
    @return {AP.Application} the application class
     */

    AP.getApp = function(name) {
      return this.apps[name];
    };


    /**
    Returns the currently active app, if any.
    @method getActiveApp
    @return {AP.Application} the active application class, if any.
     */

    AP.getActiveApp = function() {
      return AP.getApp(this.activeAppName);
    };

    return AP;

  })();

  window.AP = AP;


  /**
  Utility singleton for encoding and decoding Base64 strings.
  @module AP
  @submodule utility
  @class Base64
  @static
  @private
   */

  AP.utility.Base64 = (function() {
    function Base64() {}


    /**
    @property _keyStr
    @type String
    @static
    @private
     */

    Base64._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';


    /**
    Encodes an input string to Base64.
    @method encode
    @static
    @param {String} input the string to be Base64-encoded
    @return {String} a Base64-encoded string
     */

    Base64.encode = function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      return output;
    };


    /**
    Decodes an input string from Base64.
    @method decode
    @static
    @param {String} input the string to be Base64-decoded
    @return {String} a string decoded from Base64
     */

    Base64.decode = function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    };


    /**
    @private
    @method _utf8_encode
    @static
     */

    Base64._utf8_encode = function(string) {
      var c, n, utftext;
      string = string.replace(/\r\n/g, '\n');
      utftext = '';
      n = 0;
      while (n < string.length) {
        c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        n++;
      }
      return utftext;
    };


    /**
    @private
    @method _utf8_decode
    @static
     */

    Base64._utf8_decode = function(utftext) {
      var c, c1, c2, c3, i, string;
      string = '';
      i = 0;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    };

    return Base64;

  })();


  /**
  Simplifies interaction with browser cookies.
  @module AP
  @submodule utility
  @class Cookie
  @static
   */

  AP.utility.Cookie = (function() {
    function Cookie() {}


    /**
    @method getFromCookieStorage
    @static
    @return {String} a copy of the raw cookie string
     */

    Cookie.getFromCookieStorage = function() {
      return document.cookie.toString();
    };


    /**
    Saves cookie to document cookies.
    @method saveToCookieStorage
    @static
    @param {String} cookie a formatted cookie-string to save to document cookies
     */

    Cookie.saveToCookieStorage = function(cookie) {
      return document.cookie = cookie;
    };


    /**
    Formats an expiration date for a cookie string.
    @method formatCookieStorageDate
    @static
    @param {Integer/Date} expiration number of days from today after which to
    expire cookie *or* a JavaScript `Date` of the absolute expiration date.
     */

    Cookie.formatCookieStorageDate = function(expiration) {
      var d;
      if (_.isNumber(expiration)) {
        d = new Date();
        d.setTime(d.getTime() + (expiration * 86400000));
        expiration = d;
      }
      if (_.isDate(expiration)) {
        return expiration.toGMTString();
      }
    };


    /**
    Builds a formatted cookie-string for saving to `document.cookies`.
    @method buildCookieStorageString
    @static
    @param {String} n name of cookie
    @param {String} v value of cookie
    @param {Integer/Date} expiration optional number of days from today after
    which to expire cookie *or* a JavaScript `Date` of the absolute
    expiration date.
     */

    Cookie.buildCookieStorageString = function(n, v, expiration) {
      var e;
      e = '';
      if (expiration) {
        e = '; expires=' + this.formatCookieStorageDate(expiration);
      }
      return n + '=' + v + e + '; path=/';
    };


    /**
    Saves a cookie to `document.cookies`.
    @method set
    @static
    @param {String} n name of cookie
    @param {String} v value of cookie
    @param {Integer/Date} expiration optional number of days from today after
    which to expire cookie *or* a JavaScript `Date` of the absolute
    expiration date.
     */

    Cookie.set = function(n, v, expiration) {
      var cookie;
      cookie = this.buildCookieStorageString(n, v, expiration);
      return this.saveToCookieStorage(cookie);
    };


    /**
    Returns a cookie with name `n` from underlaying cookie
    storage, `document.cookie`.
    @method get
    @static
    @param {String} n name of cookie
    @return {String} the cookie value, if any
     */

    Cookie.get = function(n) {
      var c, ca, i, match;
      ca = this.getFromCookieStorage().split(';');
      match = n + '=';
      c = '';
      i = 0;
      while (i < ca.length) {
        c = ca[i].replace(/^\s*/, '');
        if (c.indexOf(match) === 0) {
          return c.substring(match.length, c.length);
        }
        i++;
      }
      return null;
    };


    /**
    Deletes a cookie with name `n` from underlaying cookie storage.
    @method del
    @static
    @param {String} n name of cookie
     */

    Cookie.del = function(n) {
      return this.set(n, '', -1);
    };

    return Cookie;

  })();


  /**
  Utility singleton for working with URLs and paths.
  @module AP
  @submodule utility
  @class Url
  @static
  @private
   */

  AP.utility.Url = (function() {
    function Url() {}


    /**
    @method parseUrl
    @static
    @param {String} url the URL to parse
    @return {Object} the bits and pieces of a URL as key/value pairs
     */

    Url.parseUrl = function(url) {
      var matches, path;
      path = {
        urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
        getLocation: function(url) {
          var hash, uri;
          uri = url ? this.parseUrl(url) : location;
          hash = this.parseUrl(url || location.href).hash;
          hash = hash === '#' ? '' : hash;
          return uri.protocol + '//' + uri.host + uri.pathname + uri.search + hash;
        }
      };
      if ($.type(url) === 'object') {
        return url;
      }
      matches = path.urlParseRE.exec(url || '') || [];
      return {
        href: matches[0] || '',
        hrefNoHash: matches[1] || '',
        hrefNoSearch: matches[2] || '',
        domain: matches[3] || '',
        protocol: matches[4] || '',
        doubleSlash: matches[5] || '',
        authority: matches[6] || '',
        username: matches[8] || '',
        password: matches[9] || '',
        host: matches[10] || '',
        hostname: matches[11] || '',
        port: matches[12] || '',
        pathname: matches[13] || '',
        directory: matches[14] || '',
        filename: matches[15] || '',
        search: matches[16] || '',
        hash: matches[17] || ''
      };
    };

    return Url;

  })();


  /**
  Mock server instances are used by the test framework to intercept XHR requests
  and simulate the functionality of an API backend, entirely offline.  A mock
  server handles all requests matching collections within the application within
  which it is instantiated.
  
  To enable a mock server in an application, simply enable the global
  `useMockServer` flag:
  @example
      AP.useMockServer = true
  
  @module AP
  @submodule utility
  @class MockServer
   */

  AP.utility.MockServer = (function() {

    /**
    @module AP
    @submodule utility
    @submodule MockServer
    @class Collections
    @static
     */
    MockServer.Collections = (function() {
      function Collections() {}


      /**
      Number of model instances with which to prepopulate a collection
      instantiated via `AP.utility.MockServer.Collections.createCollectionInstanceFor`.
      @property instancesPerCollection
      @type Number
      @static
       */

      Collections.instancesPerCollection = 3;


      /**
      Generates an `AP.collection.Collection` collection instance from the given
      collection class.  The instance is prepopulated with a number of model
      instances appropriate to the collection, the number of which is defined
      by {@link #instancesPerCollection}.
      @method createCollectionInstanceFor
      @static
      @param {AP.collection.Collection} collectionClass a class object
      @return {AP.collection.Collection} prepopulated collection instance
       */

      Collections.createCollectionInstanceFor = function(collectionClass) {
        var collection, instances;
        collection = new collectionClass;
        instances = this.createInstancesFor(collectionClass.prototype.model);
        collection.add(instances);
        return collection;
      };


      /**
      Generates a number of `AP.model.Model` model instances from the given model
      class.  The number generated
      @method createInstancesFor
      @static
      @param {AP.model.Model} modelClass a class object
      @return {AP.model.Model[]} array of model instances
       */

      Collections.createInstancesFor = function(modelClass) {
        var idAttribute, instance, num, _i, _ref, _results;
        _results = [];
        for (num = _i = 0, _ref = this.instancesPerCollection; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
          instance = this.createInstanceFor(modelClass, num);
          idAttribute = modelClass.prototype.idAttribute;
          instance.set(idAttribute, "" + modelClass.name + "-" + num);
          _results.push(instance);
        }
        return _results;
      };


      /**
      Generates a single `AP.model.Model` model instance from the given model
      class, prepopulated with random field data
      via {@link AP.utility.MockServer.Models.generateRandomInstanceDataFor}.
      @method createInstanceFor
      @static
      @param {AP.model.Model} modelClass a class object
      @return {AP.model.Model} a model instance
       */

      Collections.createInstanceFor = function(modelClass) {
        var instanceData;
        instanceData = AP.utility.MockServer.Models.generateRandomInstanceDataFor(modelClass);
        return new modelClass(instanceData);
      };

      return Collections;

    })();


    /**
    @module AP
    @submodule utility
    @submodule MockServer
    @class Models
    @static
     */

    MockServer.Models = (function() {
      function Models() {}


      /**
      Generates random field data for a model class based on that class'
      field definitions.
      @method generateRandomInstanceDataFor
      @static
      @param {AP.model.Model} modelClass a class object
      @return {Object} key/value hash of field names and randomly generated values
      appropriate for use in instantiating the model class
       */

      Models.generateRandomInstanceDataFor = function(modelClass) {
        return _.object(_.map(modelClass.prototype.fieldDefinitions, (function(_this) {
          return function(fieldDef) {
            var name, value;
            name = fieldDef.name;
            value = _this.generateRandomFieldDataFor(fieldDef);
            return [name, value];
          };
        })(this)));
      };


      /**
      Generates random field data for a model class based on that class'
      field definitions.
      @method generateRandomFieldDataFor
      @static
      @param {AP.model.Model} fieldDef a class object
      @return {Object} key/value hash of field names and randomly generated values
      appropriate for use in instantiating the model class
       */

      Models.generateRandomFieldDataFor = function(fieldDef) {
        switch (fieldDef.type) {
          case 'string':
            return _.uniqueId("" + fieldDef.name + "_");
          case 'boolean':
            return (Math.random() * 100) < 50;
          case 'integer':
            return _.random(0, 1000000000);
          case 'float':
            return Math.random() * 1000000000;
          case 'date':
          case 'time':
            return (new Date()).toISOString();
          case 'array':
            return [_.random(0, 1000000000), _.random(0, 1000000000), _.random(0, 1000000000)];
          case 'hash':
            return {
              "field1": _.uniqueId('field1'),
              "field2": _.uniqueId('field2'),
              "field3": _.uniqueId('field3')
            };
        }
      };

      return Models;

    })();


    /**
    The application class with which this mock server as instantiated.
    See {@link #initialize}.
    @property application
    @type AP.Application
     */

    MockServer.prototype.application = null;


    /**
    A sinon fake server instance, automatically instantiated.  The sinon fake
    server intercepts XHR requests and handles the low-level request/response
    cycle.  See [Sinon.JS](http://sinonjs.org) for more information.
    @private
    @property server
    @type sinon.fakeServer
     */

    MockServer.prototype.server = null;


    /**
    The collections property is an internal datastore used by the mock server to
    simulate a database.  The collections property is a collection (database) of
    collections (tables) with additional metadata for ease of use.
    @private
    @property collections
    @type Backbone.Collection
     */

    MockServer.prototype.collections = null;

    function MockServer() {
      this.initialize.apply(this, arguments);
    }


    /**
    Constructs a mock server instance.
    @method initialize
    @param {AP.Application} application an application class to which this
    mock server applies
     */

    MockServer.prototype.initialize = function(application) {
      this.application = application;
      this.server = sinon.fakeServer.create();
      this.server.autoRespond = true;
      this.collections = new Backbone.Collection;
      return this.initResponses();
    };


    /**
    Initializes XHR request interceptors via sinon for requests originating from
    any collection within the application.
    @method initResponses
     */

    MockServer.prototype.initResponses = function() {
      var responseUrls;
      responseUrls = [];
      return _.each(this.application.collections, (function(_this) {
        return function(collectionClass) {
          var url, urlWithQueryString;
          url = _this.getEndpointUrlFor(collectionClass);
          urlWithQueryString = _this.getEndpointRegexWithQueryStringFor(collectionClass);
          _this.server.respondWith('GET', urlWithQueryString, function(xhr) {
            return _this.handleRequest(xhr, collectionClass);
          });
          if (_.indexOf(responseUrls, url) < 0) {
            responseUrls.push(url);
            url = _this.getEndpointRegexFor(collectionClass);
            _this.server.respondWith('POST', url, function(xhr) {
              return _this.handleRequest(xhr, collectionClass);
            });
            _this.server.respondWith('PUT', url, function(xhr) {
              return _this.handleRequest(xhr, collectionClass);
            });
            return _this.server.respondWith('DELETE', url, function(xhr) {
              return _this.handleRequest(xhr, collectionClass);
            });
          }
        };
      })(this));
    };


    /**
    Returns the API endpoint URL associated with a given collection class.
    @method getEndpointUrlFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {String} the API enpoint URL for the collection class
     */

    MockServer.prototype.getEndpointUrlFor = function(collectionClass) {
      return collectionClass.prototype.apiEndpoint;
    };


    /**
    Returns a regular expression used to match URLs for the given
    collection class.
    @method getEndpointRegexFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {RegExp} a regular expression matching the API endpoint URL of the
    collection class
     */

    MockServer.prototype.getEndpointRegexFor = function(collectionClass) {
      return new RegExp(("" + (this.getEndpointUrlFor(collectionClass).replace('.json', ''))).replace('.', '\\.'));
    };


    /**
    Returns a regular expression used to match URLs for the given
    collection class with respect for URL query parameters matching the collection
    class' `extraParams`.
    @method getEndpointRegexWithQueryStringFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {RegExp} a regular expression matching the API endpoint URL of the
    collection class with respect for `extraParams` as query parameters
     */

    MockServer.prototype.getEndpointRegexWithQueryStringFor = function(collectionClass) {
      return new RegExp(("" + (this.getEndpointUrlFor(collectionClass)) + "?" + ($.param(collectionClass.prototype.extraParams))).replace('?', '\\?').replace('&', '\\&').replace('.', '\\.'));
    };


    /**
    Gets the previously instantiated collection matching the given colleciton
    class, if one exists in the internal datastore, otherwise instantiates one.
    @method getOrCreateCollectionInstanceFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {AP.collection.Collection} a collection instance from the datastore
     */

    MockServer.prototype.getOrCreateCollectionInstanceFor = function(collectionClass) {
      var collection, name;
      name = collectionClass.prototype.model.name;
      collection = this.collections.findWhere({
        name: name
      });
      if (!collection) {
        collection = AP.utility.MockServer.Collections.createCollectionInstanceFor(collectionClass);
        this.collections.add({
          id: collectionClass.prototype.collectionId,
          name: name,
          instance: collection
        });
      }
      return (collection != null ? collection.get('instance') : void 0) || collection;
    };


    /**
    Resets internal datastore.
    This is useful when tests require consistent datastore behavior across runs.
    @method resetDatastore
     */

    MockServer.prototype.resetDatastore = function() {
      return this.collections.reset([]);
    };


    /**
    Parses query parameters out of URL, if any, and transforms them according to
    the given collection class' query fields, if any.
    See `AP.collection.ScopeCollection`.
    @method parseQuery
    @param {AP.collection.Collection} collectionClass a collection class
    @return {Object} query parameters parsed from a URL with respect to the given
    collection class' query fields
     */

    MockServer.prototype.parseQuery = function(url, collectionClass) {
      var modelClass, parsed, query, queryFields;
      modelClass = collectionClass.prototype.model;
      queryFields = collectionClass.prototype.queryFields;
      parsed = _.map(url.split('?')[1].split('&'), function(bits) {
        bits = bits.split('=');
        return [decodeURIComponent(bits[0]), decodeURIComponent(bits[1])];
      });
      query = _.filter(parsed, function(pair) {
        return pair[0].indexOf('query') === 0;
      });
      if (query.length) {
        query = _.map(query, function(pair) {
          var key, value;
          key = pair[0].replace(/query\[(.*)\]/, '$1');
          value = pair[1];
          return [key, value];
        });
        query = _.map(query, function(pair) {
          var queryField;
          queryField = _.findWhere(queryFields, {
            paramName: pair[0]
          });
          if (queryField) {
            pair[0] = queryField.fieldName;
          }
          return pair;
        });
        query = _.map(query, (function(_this) {
          return function(pair) {
            var key, value;
            key = pair[0];
            value = _this.castValue(modelClass, key, pair[1]);
            return [key, value];
          };
        })(this));
        return _.object(query);
      } else {
        return null;
      }
    };


    /**
    @method castValue
    @param {AP.model.Model} modelClass a model class
    @param {String} fieldName name of field in `modelClass`
    @param {String} fieldValue uncast value of field
     */

    MockServer.prototype.castValue = function(modelClass, fieldName, fieldValue) {
      var fieldDef;
      fieldDef = _.findWhere(modelClass.prototype.fieldDefinitions, {
        name: fieldName
      });
      switch (fieldDef.type) {
        case 'integer':
          return parseInt(fieldValue, 10);
        case 'float':
          return parseFloat(fieldValue);
        default:
          return fieldValue;
      }
    };


    /**
    Delegates an intercepted XHR request to the appropriate method, depending on
    the request method.  `GET`, `POST`, and `PUT` are supported at this time, but
    `DELETE` is not.
    @method handleRequest
    @param {AP.collection.Collection} collectionClass a collection class
    @return {Object} query parameters parsed from a URL with respect to the given
    collection class' query fields
     */

    MockServer.prototype.handleRequest = function(xhr, collectionClass) {
      switch (xhr.method.toLowerCase()) {
        case 'get':
          return this.handleGetRequest(xhr, collectionClass);
        case 'post':
          return this.handlePostRequest(xhr, collectionClass);
        case 'put':
          return this.handlePutRequest(xhr, collectionClass);
        case 'delete':
          return this.handleDeleteRequest(xhr, collectionClass);
      }
    };


    /**
    Handles an intercepted XHR `GET` request for the given collection class.  If
    no query is passed, all model instances in the appropriate collection are
    serialized to JSON and returned via a mock XHR `200` response.
    
    If a query is passed, only matching models are returned.
    
    @method handleGetRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
     */

    MockServer.prototype.handleGetRequest = function(xhr, collectionClass) {
      var collectionInstance, query, responseBody, results;
      query = this.parseQuery(xhr.url, collectionClass);
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      if (query) {
        results = collectionInstance.where(query);
      }
      responseBody = JSON.stringify(results || collectionInstance.toJSON());
      return xhr.respond(200, {
        "Content-Type": "application/json"
      }, responseBody);
    };


    /**
    Handles an intercepted XHR `POST` request for the given collection class.  The
    passed request body must be valid JSON.  It is parsed and used to instantiate
    a new model instance of the appropriate type using a randomly generated ID.
    The new model instance is added to the internal datastore and will be returned
    by future requests to the collection.  The resulting model instances is JSON
    serialized and returned via a mock XHR `201` response.
    @method handlePostRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
     */

    MockServer.prototype.handlePostRequest = function(xhr, collectionClass) {
      var collectionInstance, data, idFieldDef, instance, model, responseBody;
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      model = collectionInstance.model;
      data = JSON.parse(xhr.requestBody);
      instance = new model(data);
      idFieldDef = _.findWhere(instance.fieldDefinitions, {
        name: model.prototype.idAttribute
      });
      instance.set(model.prototype.idAttribute, AP.utility.MockServer.Models.generateRandomFieldDataFor(idFieldDef));
      collectionInstance.add(instance);
      responseBody = JSON.stringify(instance.toJSON());
      return xhr.respond(201, {
        "Content-Type": "application/json"
      }, responseBody);
    };


    /**
    Handles an intercepted XHR `PUT` request for the given collection class.  The
    passed request body must be valid JSON and must contain an ID attribute.
    It is parsed and used to update an existing model instance of the appropriate
    type within the datastore.
    
    If the requested instance exists, it is JSON  serialized and returned via a
    mock XHR `200` response.
    
    If the requested instance does not exist, a mock XHR `404` response is sent.
    
    @method handlePutRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
     */

    MockServer.prototype.handlePutRequest = function(xhr, collectionClass) {
      var collectionInstance, data, id, idAttribute, instance, model, responseBody, whereClause;
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      model = collectionInstance.model;
      data = JSON.parse(xhr.requestBody);
      id = xhr.url.split('/').reverse()[0].replace('.json', '');
      idAttribute = model.prototype.idAttribute;
      whereClause = {};
      whereClause[idAttribute] = this.castValue(model, idAttribute, id);
      instance = collectionInstance.findWhere(whereClause);
      if (instance) {
        instance.set(data);
        responseBody = JSON.stringify(instance.toJSON());
        return xhr.respond(200, {
          "Content-Type": "application/json"
        }, responseBody);
      } else {
        return xhr.respond(404);
      }
    };


    /**
    Handles an intercepted XHR `DELETE` request for the given collection class.
    The passed request body must be valid JSON and must contain an ID attribute.
    It is parsed and used to remove an existing model instance from the datastore.
    
    If the requested instance exists, an empty XHR `204` response is returned.
    
    If the requested instance does not exist, a mock XHR `404` response is sent.
    
    @method handleDeleteRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
     */

    MockServer.prototype.handleDeleteRequest = function(xhr, collectionClass) {
      var collectionInstance, id, idAttribute, instance, model, responseBody, whereClause;
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      model = collectionInstance.model;
      id = xhr.url.split('/').reverse()[0].replace('.json', '');
      idAttribute = model.prototype.idAttribute;
      whereClause = {};
      whereClause[idAttribute] = this.castValue(model, idAttribute, id);
      instance = collectionInstance.findWhere(whereClause);
      if (instance) {
        collectionInstance.remove(instance);
        responseBody = '';
        return xhr.respond(204, {
          "Content-Type": "application/json"
        }, responseBody);
      } else {
        return xhr.respond(404);
      }
    };

    return MockServer;

  })();


  /**
  Provides an extensible facility for validating arbitrary data.  While validator
  is used primarily by {@link AP.model.Model}, it may be used to
  validate any data object.
  
  Subclass validator to implement additional validation types.  Built-in
  validation types include:
  
  - `required`:  field must have a non-null value
  - `type`:  field type is consistent with the type specified in `is`
  
  Example usage:
  @example
      validator = new AP.utility.Validator();
      validator.data = {
        name: 'John Doe',
        age: 46
      };
      validator.validations = [{
        field: 'name',
        validate: 'required'
      }, {
        field: 'age',
        validate: 'type',
        is: 'integer'
      }];
  
      validator.validate();
      // true
      validator.data.age = null;
      validator.validate();
      // true
      // age is not required:  although "null" is not an integer, it is valid
      // because the type validator ignores null values.
      
      validator.data.name = '';
      validator.validate();
      // false
  
  @module AP
  @submodule utility
  @class Validator
   */

  AP.utility.Validator = (function() {

    /**
    Internal errors array.  If the errors array contains any errors then the
    validator is considered to be in an invalid state.
    @private
    @property _errors
    @type Object[]
     */
    Validator.prototype._errors = [];


    /**
    Internal hash of error messages.  Each key is an error type where its value
    is an error message string.
    @private
    @property _errorMessages
    @type Object
     */

    Validator.prototype._errorMessages = {
      required: 'this field is required',
      numericality: 'this field must resemble a number',
      booleanType: 'this field must be a boolean',
      stringType: 'this field must be a string',
      numberType: 'this field must be a number',
      integer: 'this field must be an integer',
      float: 'this field must be a float',
      missingType: 'this field cannot be validated as type {0}'
    };


    /**
    The data object to validate.
    @property data
    @type Object
     */

    Validator.prototype.data = {};


    /**
    A list of validations to apply.  Validations is an array of validation
    configuration objects.  Validation configuration objects must contain at least
    the following members:
    
    - `field`:  a key in the {@link #data} object
    - `validate`:  a string reprenting the validation type
    
    Certain validations may require additional information.  For example, the
    `type` validation requires an `is` member, the data type.
    
    For example:
    @example
        [
          field: 'name'
          validate: 'required'
        ,
          field: 'amount'
          validate: 'numericality'
        ,
          field: 'age'
          validate: 'type'
          is: 'integer'
        ]
    
    @property validations
    @type Object[]
     */

    Validator.prototype.validations = [];

    function Validator(data, validations) {
      this.data = data;
      this.validations = validations;
      this._errors = [];
      this.data = _.clone(this.data);
      this.validations = _.clone(this.validations);
    }


    /**
    Returns true if the validator has no errors.  **Note**:  {@link #validate}
    should be executed before calling `isValid`.  Always returns `true` if
    executed before `validate`.
    @method isValid
    @return {Boolean} `true` if there
     */

    Validator.prototype.isValid = function() {
      return !this.errors().length;
    };


    /**
    Applies the validations specified in {@link #validations} to {@link #data},
    clearing any existing errors first.
    @method validate
    @return {Boolean} the return value of {@link #isValid}.
     */

    Validator.prototype.validate = function() {
      var validation, _i, _len, _ref;
      this._errors = [];
      _ref = this.validations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        validation = _ref[_i];
        if (this[validation.validate]) {
          this[validation.validate](this.data[validation.field], validation);
        }
      }
      return this.isValid();
    };


    /**
    Adds an error of `type` for field `fieldName` to the validator where `type` is
    a key in the internal {@link #_errorMessages error messages hash}.  Additional
    data may be passed as an array via `extra` which is interpolated into the
    error message.
    @method addError
    @param {String} fieldName the field to which the error applies
    @param {String} type the error type, corresponding to a key in the internal
    error messages hash.
    @param {String[]} [extra] optional array of strings to be interpolated into
    the error message
     */

    Validator.prototype.addError = function(fieldName, type, extra) {
      var i, message, value, _i, _len;
      message = this._errorMessages[type] || 'is invalid';
      if (extra) {
        for (i = _i = 0, _len = extra.length; _i < _len; i = ++_i) {
          value = extra[i];
          message = message.replace("{" + i + "}", value);
        }
      }
      return this._errors.push({
        field: fieldName,
        message: message
      });
    };


    /**
    Returns the internal errors array.
    @method errors
    @return {String[]} the internal errors array.
     */

    Validator.prototype.errors = function() {
      return this._errors;
    };


    /**
    Validates that the value is non-null.  If null or undefined, adds an error.
    @method required
    @param value the value to validate
    @param {Object} options a validation configuration object, for example:
        {field: 'title', validate: 'required'}
     */

    Validator.prototype.required = function(value, options) {
      if (value === null || value === void 0) {
        return this.addError(options.field, 'required');
      }
    };


    /**
    Validates that the value looks like a number.  The value is allowed to be
    either a strict string or number type, as long as it looks like a number.
    @method numericality
    @param value the value to valiate as numerical
    @param {Object} options a validation configuration object, for example:
        {field: 'amount', validate: 'numericality'}
     */

    Validator.prototype.numericality = function(value, options) {
      if ((value != null) && !value.toString().match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)) {
        return this.addError(options.field, 'numericality');
      }
    };


    /**
    Validates that the value is of a specified type.  Adds an error if the value
    is not of the specified type.
    @method type
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'string'}
     */

    Validator.prototype.type = function(value, options) {
      var type;
      type = options.is.toLowerCase();
      if (this["" + type + "Type"]) {
        return this["" + type + "Type"](value, options);
      } else {
        return this.addError(options.field, 'missingType', [type]);
      }
    };


    /**
    Validates that `value` is a boolean.  Adds an error if `value` is present but
    not of type boolean.
    @method booleanType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'boolean'}
     */

    Validator.prototype.booleanType = function(value, options) {
      if (((typeof value) !== 'boolean') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'booleanType');
      }
    };


    /**
    Validates that `value` is a string.  Adds an error if `value` is present but
    not of type string.
    @method stringType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'string'}
     */

    Validator.prototype.stringType = function(value, options) {
      if (((typeof value) !== 'string') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'stringType');
      }
    };


    /**
    Validates that `value` is a number.  Adds an error if `value` is present but
    not of type number.
    @method numberType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'number'}
     */

    Validator.prototype.numberType = function(value, options) {
      if (((typeof value) !== 'number') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'numberType');
      }
    };


    /**
    Validates that `value` is a number.  Adds an error if `value` is present but
    not of type number.
    @method floatType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'float'}
     */

    Validator.prototype.floatType = function(value, options) {
      if (((typeof value) !== 'number') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'floatType');
      }
    };


    /**
    Validates that `value` is a whole number.  Adds an error if `value` is present
    but not of a whole number.
    @method integerType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'integer'}
     */

    Validator.prototype.integerType = function(value, options) {
      if (value !== null && value !== void 0) {
        if (!(((typeof value) === 'number') && (value.toString().indexOf('.') === -1))) {
          return this.addError(options.field, 'integerType');
        }
      }
    };


    /**
    **UNIMPLEMENTED***
    Validates that `value` is a data.
    @method dateType
    @beta
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'date'}
     */

    Validator.prototype.dateType = function(value, options) {};


    /**
    **UNIMPLEMENTED***
    Validates that `value` is a time.
    @method timeType
    @beta
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'time'}
     */

    Validator.prototype.timeType = function(value, options) {};

    return Validator;

  })();

  AP.utility.TransientStore = (function() {
    TransientStore.prototype.namespace = 'ap';

    TransientStore.prototype.expiresAfter = 7;

    TransientStore.prototype._data = null;

    function TransientStore(options) {
      if (options == null) {
        options = {};
      }
      this.namespace = (options != null ? options.namespace : void 0) || this.namespace;
      this.expiresAfter = (options != null ? options.expiresAfter : void 0) || this.expiresAfter;
      this._data = {};
    }

    TransientStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      return this._data[qualifiedKey];
    };

    TransientStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      return this._data[qualifiedKey] = value;
    };

    TransientStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      return delete this._data[qualifiedKey];
    };

    TransientStore.prototype.encodeValue = function(value) {
      var encoded;
      encoded = JSON.stringify([value]);
      return AP.utility.Base64.encode(encoded);
    };

    TransientStore.prototype.decodeValue = function(value) {
      var decoded, error;
      if (value) {
        decoded = AP.utility.Base64.decode(value);
      }
      try {
        decoded = JSON.parse(decoded);
      } catch (_error) {
        error = _error;
      }
      return decoded != null ? decoded[0] : void 0;
    };

    TransientStore.prototype.getKeyString = function(key) {
      var strKey;
      strKey = this.encodeValue(key);
      return strKey;
    };

    TransientStore.prototype.getQualifiedKey = function(key) {
      var strKey;
      strKey = this.getKeyString(key);
      return "" + this.namespace + "-" + strKey;
    };

    TransientStore.prototype.getQualifiedExpireKey = function(key) {
      var strKey;
      strKey = this.getKeyString(key);
      return "" + this.namespace + "-expire-" + strKey;
    };

    TransientStore.prototype.getExpirationDate = function(days) {
      var d;
      d = new Date();
      d.setTime(d.getTime() + (days * 86400000));
      return d;
    };

    TransientStore.prototype.get = function(key) {
      var expire, expireKey, qKey, record;
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      record = this.getFromUnderlayingStorage(qKey);
      if (this.getFromUnderlayingStorage(expireKey)) {
        expire = parseInt(this.decodeValue(this.getFromUnderlayingStorage(expireKey)), 10);
      }
      if (_.isNumber(expire) && (expire <= Date.now())) {
        this.remove(key);
        record = this.getFromUnderlayingStorage(qKey);
      }
      return this.decodeValue(record);
    };

    TransientStore.prototype.set = function(key, value, expiresAfter) {
      var expirationDate, expireKey, qKey;
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      expirationDate = this.getExpirationDate(expiresAfter || this.expiresAfter);
      this.setToUnderlayingStorage(qKey, this.encodeValue(value), expirationDate);
      return this.setToUnderlayingStorage(expireKey, this.encodeValue(expirationDate.getTime()), expirationDate);
    };

    TransientStore.prototype.remove = function(key) {
      var expireKey, qKey;
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      this.removeFromUnderlayingStorage(qKey);
      return this.removeFromUnderlayingStorage(expireKey);
    };

    return TransientStore;

  })();

  AP.utility.TransientCookieStore = (function(_super) {
    __extends(TransientCookieStore, _super);

    function TransientCookieStore() {
      return TransientCookieStore.__super__.constructor.apply(this, arguments);
    }

    TransientCookieStore.supported = (function() {
      var actualValue, key, supported, value;
      supported = window.document.cookie != null;
      if (supported) {
        key = _.uniqueId('ap-cookie-support-test');
        value = 'success';
        AP.utility.Cookie.set(key, value);
        actualValue = AP.utility.Cookie.get(key);
        if (value !== actualValue) {
          supported = false;
        }
      }
      return supported;
    })();

    TransientCookieStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      var value;
      value = TransientCookieStore.__super__.getFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientCookieStore.supported) {
        value = AP.utility.Cookie.get(qualifiedKey);
      }
      return value;
    };

    TransientCookieStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      TransientCookieStore.__super__.setToUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientCookieStore.supported) {
        return AP.utility.Cookie.set(qualifiedKey, value, expirationDate);
      }
    };

    TransientCookieStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      TransientCookieStore.__super__.removeFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientCookieStore.supported) {
        return AP.utility.Cookie.del(qualifiedKey);
      }
    };

    return TransientCookieStore;

  })(AP.utility.TransientStore);

  AP.utility.TransientLocalStore = (function(_super) {
    __extends(TransientLocalStore, _super);

    function TransientLocalStore() {
      return TransientLocalStore.__super__.constructor.apply(this, arguments);
    }

    TransientLocalStore.supported = window.localStorage != null;

    TransientLocalStore.prototype.storage = window.localStorage;

    TransientLocalStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      var value;
      value = TransientLocalStore.__super__.getFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientLocalStore.supported) {
        value = this.storage.getItem(qualifiedKey);
      }
      return value;
    };

    TransientLocalStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      TransientLocalStore.__super__.setToUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientLocalStore.supported) {
        return this.storage.setItem(qualifiedKey, value);
      }
    };

    TransientLocalStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      TransientLocalStore.__super__.removeFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientLocalStore.supported) {
        return this.storage.removeItem(qualifiedKey);
      }
    };

    return TransientLocalStore;

  })(AP.utility.TransientStore);

  AP.utility.TransientLargeLocalStore = (function(_super) {
    __extends(TransientLargeLocalStore, _super);

    TransientLargeLocalStore.supported = window.LargeLocalStorage != null;

    TransientLargeLocalStore.prototype.storage = null;

    TransientLargeLocalStore.prototype.storageCapacity = 64 * 1024 * 1024;

    TransientLargeLocalStore.prototype.storageName = 'large-local-storage';

    function TransientLargeLocalStore(options) {
      if (options == null) {
        options = {};
      }
      TransientLargeLocalStore.__super__.constructor.apply(this, arguments);
      this.storageCapacity = (options != null ? options.storageCapacity : void 0) || this.storageCapacity;
      this.storageName = (options != null ? options.storageName : void 0) || this.storageName;
      if (AP.utility.TransientLargeLocalStore.supported) {
        this.storage = new LargeLocalStorage({
          size: this.storageCapacity,
          name: "" + this.namespace + "-" + this.storageName
        });
      }
    }

    TransientLargeLocalStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      if ((this.storage != null) && AP.utility.TransientLargeLocalStore.supported) {
        return this.storage.initialized.then((function(_this) {
          return function() {
            return _this.storage.getContents(qualifiedKey);
          };
        })(this));
      } else {
        return TransientLargeLocalStore.__super__.getFromUnderlayingStorage.apply(this, arguments);
      }
    };

    TransientLargeLocalStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      if ((this.storage != null) && AP.utility.TransientLargeLocalStore.supported) {
        return this.storage.initialized.then((function(_this) {
          return function() {
            return _this.storage.setContents(qualifiedKey, value);
          };
        })(this));
      } else {
        return TransientLargeLocalStore.__super__.setToUnderlayingStorage.apply(this, arguments);
      }
    };

    TransientLargeLocalStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      if ((this.storage != null) && AP.utility.TransientLargeLocalStore.supported) {
        return this.storage.initialized.then((function(_this) {
          return function() {
            return _this.storage.rm(qualifiedKey);
          };
        })(this));
      } else {
        return TransientLargeLocalStore.__super__.removeFromUnderlayingStorage.apply(this, arguments);
      }
    };

    TransientLargeLocalStore.prototype.get = function(key, options) {
      var callback, expireKey, qKey, _ref;
      if (options == null) {
        options = {};
      }
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      callback = function(value) {
        if (value != null) {
          if (_.isFunction(options.success)) {
            return options.success(value);
          }
        } else if (_.isFunction(options.error)) {
          return options.error();
        }
      };
      if ((this.storage != null) && (_.isFunction(options.success || _.isFunction(options.error)))) {
        return (_ref = this.storage) != null ? _ref.initialized.then((function(_this) {
          return function() {
            return _this.getFromUnderlayingStorage(qKey).then(function(record) {
              return _this.getFromUnderlayingStorage(expireKey).then(function(expireRecord) {
                var expire, value;
                if (expireRecord) {
                  expire = +_this.decodeValue(expireRecord);
                }
                if (_.isNumber(expire) && (expire <= Date.now())) {
                  _this.remove(key);
                  record = null;
                }
                value = _this.decodeValue(record);
                return callback(value);
              });
            });
          };
        })(this)) : void 0;
      } else {
        return callback(TransientLargeLocalStore.__super__.get.apply(this, arguments));
      }
    };

    return TransientLargeLocalStore;

  })(AP.utility.TransientStore);

  if (AP.auth == null) {
    AP.auth = {};
  }


  /**
  Provides methods for user authentication and deauthentication.
  
  To login (Coffeescript):
  @example
      AP.auth.Authentication.login
        username: 'johndoe'
        password: 'doe123'
      
      AP.auth.Authentication.isAuthenticated()
       * true
  
  To logout:
  @example
      AP.auth.Authentication.logout()
      
      AP.auth.Authentication.isAuthenticated()
       * false
  
  @module AP
  @submodule auth
  @class Authentication
  @static
   */

  AP.auth.Authentication = (function() {
    function Authentication() {}

    _.extend(Authentication, Backbone.Events);

    $.ajaxSetup({
      complete: _.debounce((function(xhr, result) {
        if (xhr.status === 401 && result === 'error') {
          return Authentication.destroySession();
        }
      }), 150)
    });


    /**
    Stores details about authentication and authorization.
    @property authenticationSettings
    @type Object
     */

    Authentication.authenticationSettings = {

      /**
      The object definition ID of the designated authenticatable object.
      @property authenticationSettings.object_definition_id
      @type String
       */
      object_definition_id: '4520',

      /**
      The name of the field to match for authentication.  Only one value is used
      at this time:  `password`.
      @property authenticationSettings.match_field
      @type String
       */
      match_field: 'password',

      /**
      The name of the field used to find a user.  For example:  `username`.
      @property authenticationSettings.lookup_field
      @type String
       */
      lookup_field: 'username',

      /**
      The name of the field on the object returned after authenticating that
      stores user roles.  The role field is used by `AP.auth.Authorization`.
      @property authenticationSettings.role_field
      @type String
       */
      role_field: 'role',

      /**
      The name of the field on the object returned after authenticating that
      stores the session ID.  For example:  `x-session-id`.
      @property authenticationSettings.session_id_field
      @type String
       */
      session_id_field: 'x_session_id',

      /**
      `true` if authentication uses secure passwords.  Secure passwords should be
      masked in the UI.
      @property authenticationSettings.has_secure_password
      @type Boolean
       */
      has_secure_password: true,

      /**
      `true` if {@link #lookup_field} should be all lowercase.
      @property authenticationSettings.downcase_lookup_field
      @type Boolean
       */
      downcase_lookup_field: true,

      /**
      @property authenticationSettings.authentication_url
      @type String
      URL of login API endpoint.  Login requests must be made to this URL.
       */
      authentication_url: '/auth/password/callback',

      /**
      URL of logout API endpoint.  Logout requests must be made to this URL.
      @property authenticationSettings.deauthentication_url
      @type String
       */
      deauthentication_url: '/auth/signout'
    };


    /**
    Custom header to send/retrieve the session ID when using CORS.
    @private
    @property _authSessionIdHeaderName
    @type String
     */

    Authentication._authSessionIdHeaderName = 'X-Session-Id';


    /**
    Transient storage instance for persisting session data.
    @private
    @property store
    @type AP.utility.TransientStore
     */

    Authentication.store = AP.utility.TransientLocalStore.supported ? new AP.utility.TransientLocalStore({
      namespace: 'ap-auth'
    }) : new AP.utility.TransientCookieStore({
      namespace: 'ap-auth'
    });


    /**
    Executes login request with passed `credentials`.
    @method login
    @static
    @param {Object} credentials the user credentials
     */

    Authentication.login = function(credentials) {
      if (!this.isAuthenticated()) {
        return this.authenticate(credentials);
      }
    };


    /**
    Executes logout request.
    @method logout
    @static
     */

    Authentication.logout = function() {
      if (this.isAuthenticated()) {
        return this.deauthenticate();
      }
    };


    /**
    @method isAuthenticatable
    @static
    @return {Boolean} `true` if authentication is enabled
     */

    Authentication.isAuthenticatable = function() {
      return !!this.authenticationSettings;
    };


    /**
    @method isAuthenticated
    @static
    @return {Boolean} `true` if a user is logged-in
     */

    Authentication.isAuthenticated = function() {
      return !!(this.getAuthSessionData() && this.getAuthSessionId());
    };


    /**
    Performs authentication request with HTTP basic auth.  Upon a successful
    login the user object returned by the API is stored for later use.
    @method authenticate
    @static
    @param {Object} credentials user credentials object, for example:
    `{"username": "johndoe", "password": "doe123"}`.
     */

    Authentication.authenticate = function(credentials) {
      var settings;
      AP = window.AP;
      settings = this.getAuthenticationSettings();
      return $.ajax({
        url: settings.authentication_url,
        type: 'POST',
        dataType: 'json',
        data: credentials,
        beforeSend: (function(_this) {
          return function(request, settings) {
            var bits;
            request.setRequestHeader('Authorization', _this.makeHTTPBasicAuthHeader(credentials));
            if (!AP.useMockServer && AP.baseUrl) {
              bits = AP.utility.Url.parseUrl(settings.url);
              if (!(bits.host && bits.protocol)) {
                return _.extend(settings, {
                  crossDomain: true,
                  url: "" + AP.baseUrl + settings.url,
                  xhrFields: _.extend({}, settings.xhrFields, {
                    withCredentials: true
                  })
                });
              }
            }
          };
        })(this),
        success: (function(_this) {
          return function(response, status, xhr) {
            var sessionId;
            if (response) {
              _this.store.set(_this.getAuthSessionDataKey(), response, 7);
            }
            sessionId = xhr.getResponseHeader(_this.getAuthSessionIdHeaderName());
            if (!sessionId && (settings.session_id_field != null)) {
              sessionId = response != null ? response[settings.session_id_field] : void 0;
            }
            if (sessionId) {
              _this.store.set(_this.getAuthSessionIdKey(), sessionId, 7);
            }
            if (response && sessionId) {

              /**
              @event 'auth:authenticated'
              An authenticated event is triggered after a successful login.
               */
              return _this.trigger('auth:authenticated');
            } else {
              return _this.trigger('auth:error');
            }
          };
        })(this),
        error: (function(_this) {
          return function() {

            /**
            @event 'auth:error'
            An auth error event is triggered if a login or logout fails for
            any reason.
             */
            return _this.trigger('auth:error');
          };
        })(this)
      });
    };


    /**
    Performs deauthentication request.  Upon a successful logout, stored user data
    is removed.
    @method deauthenticate
    @static
     */

    Authentication.deauthenticate = function() {
      var settings;
      AP = window.AP;
      settings = this.getAuthenticationSettings();
      return $.ajax({
        url: settings.deauthentication_url,
        type: 'POST',
        dataType: 'text',
        beforeSend: (function(_this) {
          return function(request, settings) {
            var authSessionId, authSessionIdHeader, bits;
            authSessionIdHeader = _this.getAuthSessionIdHeaderName();
            authSessionId = _this.getAuthSessionId();
            if (authSessionId) {
              request.setRequestHeader(authSessionIdHeader, authSessionId);
            }
            if (!AP.useMockServer && AP.baseUrl) {
              bits = AP.utility.Url.parseUrl(settings.url);
              if (!(bits.host && bits.protocol)) {
                return _.extend(settings, {
                  crossDomain: true,
                  url: "" + AP.baseUrl + settings.url,
                  xhrFields: _.extend({}, settings.xhrFields, {
                    withCredentials: true
                  })
                });
              }
            }
          };
        })(this),
        complete: (function(_this) {
          return function(response) {
            return _this.destroySession();
          };
        })(this)
      });
    };


    /**
    Destroys session by deleting data in auth store.
    @private
    @method destroySession
    @static
     */

    Authentication.destroySession = function() {
      this.store.remove(this.getAuthSessionDataKey());
      this.store.remove(this.getAuthSessionIdKey());

      /**
      @event auth:deauthenticated
      A deauthenticated event is triggered after the session is destroyed.
       */
      return this.trigger('auth:deauthenticated');
    };


    /**
    Returns the name of the custom session ID header.
    @method getAuthSessionIdHeaderName
    @static
     */

    Authentication.getAuthSessionIdHeaderName = function() {
      return this._authSessionIdHeaderName;
    };


    /**
    Builds a base-URL-specific auth key.  Since multiple apps may
    sometimes be served from the same domain, auth keys must include the name
    of the base URL (API server) in the key name for uniqueness.
    @private
    @method getAuthSessionDataKey
    @static
    @return {String} auth store key, unique by base URL
     */

    Authentication.getAuthSessionDataKey = function() {
      var baseName, baseUrl;
      baseName = 'session';
      if (AP.baseUrl) {
        baseUrl = AP.baseUrl.replace(/[^a-zA-Z\-0-9]/g, '');
      }
      if (baseUrl) {
        return "" + baseName + "-" + baseUrl;
      } else {
        return baseName;
      }
    };


    /**
    Builds a key name from `getAuthSessionDataKey` with `-session-id` appended.
    @private
    @static
    @method getAuthSessionIdKey
    @return {String} auth session ID key name
     */

    Authentication.getAuthSessionIdKey = function() {
      return "" + (this.getAuthSessionDataKey()) + "-id";
    };


    /**
    Returns the auth session data (a user) from auth store if logged in.
    @method getAuthSessionData
    @static
    @return {Object/null} the authenticated user object
     */

    Authentication.getAuthSessionData = function() {
      return this.store.get(this.getAuthSessionDataKey());
    };


    /**
    Returns the lookup field value (username) of the currently logged-in user.
    @return {Object/null} the authenticated user's lookup field value (username)
     */

    Authentication.getUsername = function() {
      var credentials, settings;
      settings = this.getAuthenticationSettings();
      credentials = this.getAuthSessionData();
      return credentials != null ? credentials[settings != null ? settings.lookup_field : void 0] : void 0;
    };


    /**
    Returns the role(s) of the currently logged-in user.
    @return {Object/null} the authenticated user's role(s)
     */

    Authentication.getUserRole = function() {
      var credentials, settings;
      settings = this.getAuthenticationSettings();
      credentials = this.getAuthSessionData();
      return credentials != null ? credentials[settings != null ? settings.role_field : void 0] : void 0;
    };


    /**
    Returns the auth ID from auth store.
    @private
    @static
    @method getAuthSessionId
    @return {String/null} the current session ID
     */

    Authentication.getAuthSessionId = function() {
      var data;
      return data = this.store.get(this.getAuthSessionIdKey());
    };


    /**
    @private
    @static
    @method getAuthenticationSettings
    @return {Object/null} the authenticatable object if one is specified.
    Otherwise null.
     */

    Authentication.getAuthenticationSettings = function() {
      return this.authenticationSettings || null;
    };


    /**
    @private
    @static
    @method getAuthenticatableObject
    @return {Object/null} the model specified as the authenticatable object if one
    is specified.  Otherwise null.
     */

    Authentication.getAuthenticatableObject = function() {
      var _ref;
      return window.AP.getActiveApp().getModel((_ref = this.getAuthenticationSettings()) != null ? _ref.object_definition_id : void 0);
    };


    /**
    Builds a Base64-encoded HTTP basic auth header for use in an
    authentication request.
    @private
    @static
    @method makeHTTPBasicAuthHeader
    @param {Object} credentials the user credentials
    @return {String} Base-64 encoded HTTP basic auth header with user credentials
     */

    Authentication.makeHTTPBasicAuthHeader = function(credentials) {
      var lookup, match, settings;
      settings = this.getAuthenticationSettings();
      lookup = credentials[settings.lookup_field];
      match = credentials[settings.match_field];
      return "Basic " + (AP.utility.Base64.encode([lookup, match].join(':')));
    };

    return Authentication;

  })();

  if (AP.auth == null) {
    AP.auth = {};
  }


  /**
  Authorizes arbitrary objects against the currently logged-in user (see
  `AP.auth.Authentication`).  Any object may be made permission-based by adding
  an auth rules field.  If the currently logged-in user has _any role_ specified
  in the rules array, it is considered authorized.
  
  Example arbitrary permission-based object (Coffeescript):
  @example
      myObject1 =
        member1: 'foo'
        rules: [{roles: 'manager'}, {roles: 'admin'}]
       * authorized if logged-in user has _either_ `manager` _or_ `admin` roles
      
      myObject2 =
        member: 'bar'
        rules: [{roles: 'manager,admin'}]
       * authorized if logged-in user has both `manager` and `admin` roles
  
  Example usage (Coffeescript):
  @example
      AP.auth.Authorization.isAuthorized(myObject1.rules)
      AP.auth.Authorization.isAuthorized(myObject2.rules)
  
  @module AP
  @submodule auth
  @class Authorization
  @static
   */

  AP.auth.Authorization = (function() {
    function Authorization() {}


    /**
    @method isAuthorized
    @static
    @param {String} rules array of rule objects
    @return {Boolean} `true` if logged-in user has any role in at least one
    rule _or_ there are no rules
     */

    Authorization.isAuthorized = function(rules) {
      if ((rules == null) || rules.length === 0) {
        return true;
      }
      return this._passesAnyRule(rules);
    };


    /**
    @private
    @method _passesAnyRule
    @static
    @param {String} rules array of rule objects
    @return {Boolean} `true` if logged-in user has any role in at least
    one rule
     */

    Authorization._passesAnyRule = function(rules) {
      var rule, _i, _len;
      for (_i = 0, _len = rules.length; _i < _len; _i++) {
        rule = rules[_i];
        if (this._passesRule(rule)) {
          return true;
        }
      }
      return false;
    };


    /**
    @private
    @method _passesRule
    @static
    @param {String} rule rule object
    @return {Boolean} `true` if logged-in user has any roles in rule object or
    rule has no roles specified
     */

    Authorization._passesRule = function(rule) {
      return this._ruleHasNoRoles(rule) || this._hasAnyRole(rule.roles);
    };


    /**
    @private
    @static
    @method _ruleHasNoRoles
    @param {String} rule rule object
    @return {Boolean} `true` if rule has no `roles` field
     */

    Authorization._ruleHasNoRoles = function(rule) {
      return !rule.hasOwnProperty('roles');
    };


    /**
    @private
    @static
    @method _hasAnyRole
    @param {String} roles_string string containing comma-separated role names
    @return {Boolean} `true` if logged-in user has any role in the roles string
     */

    Authorization._hasAnyRole = function(roles_string) {
      var role, user_roles, _i, _len, _ref;
      user_roles = this._getRoles();
      _ref = roles_string.split(',');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        role = _ref[_i];
        if (user_roles.indexOf($.trim(role)) >= 0) {
          return true;
        }
      }
      if (!roles_string && AP.auth.Authentication.isAuthenticated()) {
        return true;
      }
      return false;
    };


    /**
    @private
    @static
    @method _getRoles
    @return {String[]} array of roles for the currently logged-in user.  Returns
    an empty array if no user is logged in.
     */

    Authorization._getRoles = function() {
      var authSettings, data, roles, rolesField;
      authSettings = AP.auth.Authentication.getAuthenticationSettings();
      rolesField = authSettings.role_field;
      data = AP.auth.Authentication.getUserRole();
      roles = data != null ? data.split(',') : [];
      roles.map(function(x) {
        return $.trim(x);
      });
      return roles;
    };

    return Authorization;

  })();


  /**
  Base model class.  In addition to the standard methods provided by the
  [BackboneJS model class](http://backbonejs.org/#Model), this base model
  implements full validations support.
  
  This model should be subclassed, not used directly.  For example (Coffeescript):
  @example
      class Person extends AP.model.Model
        @modelId: 'person'
        name: 'Person'
        urlRoot: '/person/'
        fieldDefinitions: [
          name: 'name'
          type: 'string'
        ,
          name: 'age'
          type: 'integer'
        ]
        validations: [
          field: 'name'
          validate: 'type'
          is: 'string'
        ,
          field: 'name'
          validate: 'required'
        ,
          field: 'age'
          validate: 'type'
          is: 'integer'
        ]
  
  For full model usage documentation,
  refer to [Backbone JS](http://backbonejs.org/#Model).
  
  @module AP
  @submodule model
  @class Model 
  @extends Backbone.Model
   */

  AP.model.Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }


    /**
    An internal reference to initialized relationship instances for this
    model instance.
    @property _relationships
    @type AP.relationship.Relationship[]
    @private
     */

    Model.prototype._relationships = null;


    /**
    An internal reference to the validator instance used by the model instance.
    @property _validator
    @type AP.utility.Validator
    @private
     */

    Model.prototype._validator = null;


    /**
    An array of validation configurations.  For more information about
    validations, refer to
    the {@link AP.utility.Validator Validator documentation}.
    @property validations
    @type Object[]
     */

    Model.prototype.validations = [];

    Model.prototype.initialize = function() {
      this.initializeRelationships();
      this.initializeValidations();
      return this.on('sync', (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.constructor.trigger) != null ? _ref.apply(_this.constructor, ['sync'].concat(_.toArray(arguments))) : void 0;
        };
      })(this));
    };

    Model.prototype.initializeRelationships = function() {
      this._relationships = [];
      return _.each(this.relationshipDefinitions, (function(_this) {
        return function(definition) {
          var relationship;
          relationship = new AP.relationship[definition.type](_this, definition);
          return _this._relationships.push(relationship);
        };
      })(this));
    };

    Model.prototype.initializeValidations = function() {
      this.validations = _.clone(this.validations);
      return this._validator = new AP.utility.Validator;
    };


    /**
    Retrieves the initialized relationship instance of the given name.
    @method getRelationship
    @param {String} name the name of the relationship
    @return {AP.relationship.Relationship} matching relationship instance
     */

    Model.prototype.getRelationship = function(name) {
      return _.where(this._relationships, {
        name: name
      })[0];
    };


    /**
    Performs a `fetch` on the specified relationship.
    @method fetchRelated
    @param {String} name the name of the relationship
    @param {Function} callback called when fetching completes
     */

    Model.prototype.fetchRelated = function(name, callback) {
      var _ref;
      return (_ref = this.getRelationship(name)) != null ? _ref.fetch(callback) : void 0;
    };


    /**
    Appends `.json` to the end of the default URL.
    @method url
    @return {String} the URL for this model instance
     */

    Model.prototype.url = function() {
      return "" + Model.__super__.url.apply(this, arguments) + ".json";
    };


    /**
    Simple proxy to the model's underlaying `fetch` method inherited
    from Backbone JS `Model`.
    @method reload
     */

    Model.prototype.reload = function() {
      return this.fetch.apply(this, arguments);
    };


    /**
    Simple override of the built-in Backbone.js `destroy` method to enable
    `before_delete` event handlers.
    @method destroy
     */

    Model.prototype.destroy = function() {

      /**
      @event 'before_delete'
      Triggered on a model instance immediately before being destroyed.
       */
      this.trigger('before_delete');
      return Model.__super__.destroy.apply(this, arguments);
    };


    /**
    Simple proxy to the model's underlaying `destroy` method inherited
    from Backbone JS `Model`.
    @method delete
     */

    Model.prototype["delete"] = function() {
      return this.destroy.apply(this, arguments);
    };


    /**
    Simple override of the built-in Backbone.js `set` method to enable
    `before_change` event handlers.
    @method set
     */

    Model.prototype.set = function(key, val, options) {
      var attrs;
      if (options == null) {
        options = {};
      }
      if (_.isObject(key)) {
        attrs = key;
        options = val || {};
      } else {
        attrs = {};
        attrs[key] = val;
      }
      if (attrs) {

        /**
        @event 'before_change'
        Triggered on a model instance immediately before being changed.
         */
        this.trigger('before_change', this, attrs);
      }
      return Model.__super__.set.apply(this, arguments);
    };


    /**
    Simple override of the built-in Backbone.js `save` method to enable
    `before_save` event handlers.
    @method save
     */

    Model.prototype.save = function() {

      /**
      @event 'before_save'
      Triggered on a model instance immediately before being saved.
       */
      this.trigger('before_save');
      return Model.__super__.save.apply(this, arguments);
    };


    /**
    Validates the model instance and returns any errors reported by the instance's
    validator instance.
    @method errors
    @return {String[]} the errors array reported by the validator
    instance's {@link AP.utility.Validator#errors errors method}.
     */

    Model.prototype.errors = function() {
      this.validate();
      return this._validator.errors();
    };


    /**
    Validates the model instance and returns `true` if the instance is valid,
    otherwise `false`.
    @method isValid
    @return {Boolean} the value reported by the validator
    instance's {@link AP.utility.Validator#isValid isValid method}.
     */

    Model.prototype.isValid = function() {
      this.validate();
      return this._validator.isValid();
    };


    /**
    Copies the instance data (or optional `values` argument) and the instance
    validations into the {@link #_validator validator instance}.  Returns
    `undefined` if values are valid, otherwise returns
    an {@link #errors errors array}.
    @method validate
    @param {Object} values optional hash of field name/value pairs to validate 
    against this instance's validations.  Pass `values` to validate arbitrary
    data instead of instance data.
    @return {String[]/undefined} if valid, returns `undefined` as expected by
    the underlaying [Backbone JS model class](http://backbonejs.org/#Model).
    If invalid, returns the {@link #errors errors array}.
     */

    Model.prototype.validate = function(values) {
      this._validator.data = _.extend({}, values || this.attributes);
      this._validator.validations = this.validations.slice();
      if (this._validator.validate()) {
        return void 0;
      } else {
        return this._validator.errors();
      }
    };


    /**
    Recurses into nested models and calls toJSON.
    @method toJSON
    @return {Object} JSON representation of this model instance
     */

    Model.prototype.toJSON = function() {
      var json, key, value;
      json = Model.__super__.toJSON.apply(this, arguments);
      for (key in json) {
        value = json[key];
        if (_.isFunction(value != null ? value.toJSON : void 0)) {
          json[key] = value.toJSON();
        }
      }
      return json;
    };

    return Model;

  })(Backbone.Model);


  /**
  Base relationship class.  Provides attributes and simple initialization common
  to all relationships.  This class should not be used directly but subclassed.
  
  Three relationship types are provided for convience.  Please refer to the
  relationship documentation pages for more information:
  
  - {@link AP.relationship.BelongsTo BelongsTo}
  - {@link AP.relationship.HasMany HasMany}
  - {@link AP.relationship.HasOne HasOne}
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class Relationship
  @extends Backbone.Events
   */

  AP.relationship.Relationship = (function() {
    _.extend(Relationship.prototype, Backbone.Events);


    /**
    The owning model instance of this relationship.
    @property owner
    @type AP.model.Model
     */

    Relationship.prototype.owner = null;


    /**
    The field name for this relationship.  A relationship inserts a field into the
    owner model instance with a default value of {@link #getDefault}.
    The field name is preferably a variant of {@link #foreignKey}.  For instance,
    if `foreignKey` is `user_id`, then `name` should be `user` (or `users` for
    has-many relationships).
    @property name
    @type String
     */

    Relationship.prototype.name = null;


    /**
    Field name where the value of the relationship may be found.  In belongs-to
    relationships, `foreignKey` is found on the owner model instance.  In has-many
    and has-one relationships, `foreignKey` is found on the target model
    instance(s).  See {@link #model}.
    @property foreignKey
    @type String
     */

    Relationship.prototype.foreignKey = null;


    /**
    A string representing the class name of a model or a proper model class.  The
    model class is the target for this relationship.  Related instances must be of
    this model.
    @property model
    @type String/AP.model.Model
     */

    Relationship.prototype.model = null;


    /**
    A string representing the class name of a collection or a proper collection
    class.  The collection class is used by this relationship to store the related
    instance(s).  On initialization of this relationship, the collection is
    instantiated and this property becomes a reference to that instance.
    @property collection
    @type String/AP.collection.Collection
     */

    Relationship.prototype.collection = null;

    function Relationship() {
      this.initialize.apply(this, arguments);
    }

    Relationship.prototype.initialize = function(owner, options) {
      var _base;
      this.options = options != null ? options : {};
      this.app = typeof (_base = window.AP).getActiveApp === "function" ? _base.getActiveApp() : void 0;
      this.owner = owner || this.owner;
      this.name = this.options.name || this.name;
      this.foreignKey = this.options.foreignKey || this.foreignKey;
      this.initializeModel();
      this.initializeCollection();
      this.initializeDefault();
      return this.initializeEvents();
    };

    Relationship.prototype.initializeModel = function() {
      var _ref;
      this.model = this.options.model || this.model;
      return this.model = ((_ref = this.app) != null ? _ref.getModel(this.model) : void 0) || this.model;
    };

    Relationship.prototype.initializeCollection = function() {
      var _ref;
      this.collection = this.options.collection || this.collection;
      return this.collection = new (((_ref = this.app) != null ? _ref.getCollection(this.collection) : void 0) || this.collection);
    };

    Relationship.prototype.initializeEvents = function() {
      this.listenTo(this.collection, 'add', this.onCollectionAdd);
      this.listenTo(this.collection, 'remove', this.onCollectionRemove);
      this.listenTo(this.collection, 'sync', this.onCollectionSync);
      return this.listenTo(this.collection, 'change', this.onRelatedChange);
    };

    Relationship.prototype.initializeDefault = function() {
      return this.owner.set(this.name, this.getDefault(), {
        silent: true
      });
    };


    /**
    Handles the addition of instances into {@link #collection}.  Subclasses should
    implement this method if necessary.
    @method onCollectionAdd
    @param {AP.model.Model} record a model instance added to the collection
     */

    Relationship.prototype.onCollectionAdd = function(record) {};


    /**
    Handles the addition of instances into {@link #collection}.  Subclasses should
    implement this method if necessary.
    @method onCollectionRemove
    @param {AP.model.Model} record a model instance added to the collection
     */

    Relationship.prototype.onCollectionRemove = function(record) {};


    /**
    Called whenever {@link #collection} is synced with the server.  Subclasses
    should implement this method if necessary.
    @method onCollectionSync
     */

    Relationship.prototype.onCollectionSync = function() {};


    /**
    Called whenever an instance in {@link #collection} is changed.  By default,
    this method triggers a change event on the owner's {@link #name} field, the
    field generated by the relationship.
    @method onRelatedChange
     */

    Relationship.prototype.onRelatedChange = function() {
      return this.owner.trigger("change:" + this.name);
    };


    /**
    Returns a default value for the generated {@link #name} field on
    {@link #owner}.  The generated field is created using the default value as
    soon as the relationship is initialized.
    @method getDefault
    @return {Object} default value for generated field on owner
     */

    Relationship.prototype.getDefault = function() {
      return null;
    };


    /**
    Returns a hash of parameters passed to the {@link #collection} `query` method.
    @method getQuery
    @return {Object} parameters passed to collection's query method
     */

    Relationship.prototype.getQuery = function() {
      return {};
    };


    /**
    Query the underlaying {@link #collection} and execute `callback` upon success.
    The fetch method gets the model instance(s) for this relationship from the
    server.  Depending on the relationship type, the value of the {@link #name}
    field may be a single model instance or the {@link #collection} itself.  No
    default implementation of this method is provided.  Subclasses should provide
    an implementation.
    @method fetch
    @param {Function} callback function to execute upon fetch success.
     */

    Relationship.prototype.fetch = function(callback) {
      return null;
    };

    return Relationship;

  })();


  /**
  A belongs-to relationship is one where the owner model instance is related to
  no more than one other model instance.  In this scheme, the relationship
  information is stored in a foreign key on the owner model.  The related instance
  is stored in a generated field {@link #name} once fetched.
  
  For example, if the foreign key is `user_id` and the relationship name is `user`
  then the related instance may be obtained by calling:
  @example
      ownerInstance.get('user')
      // set related instance
      ownerInstance.set('user', userInstance)
      // or set foreign key
      ownerInstance.set('user_id', 4)
      // setting the foreign key directly will null the related instance:
      ownerInstance.get('user') == null // evaluates to true
  
  A has-one relationship is similar, except the relationship information is stored
  in a foreign key on the target model, not the owner.  See
  {@link AP.relationship.HasOne} for more information about has-one relationships.
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class BelongsTo
  @extends AP.relationship.Relationship
   */

  AP.relationship.BelongsTo = (function(_super) {
    __extends(BelongsTo, _super);

    function BelongsTo() {
      return BelongsTo.__super__.constructor.apply(this, arguments);
    }

    BelongsTo.prototype.initialize = function() {
      BelongsTo.__super__.initialize.apply(this, arguments);
      this.listenTo(this.owner, "change:" + this.foreignKey, this.onForeignKeyChange);
      return this.listenTo(this.owner, "change:" + this.name, this.onFieldForRelatedInstanceChange);
    };


    /**
    Sets the {@link #name} generated field on the owner model to the first model
    instance in the collection after syncing.
    @method onCollectionSync
     */

    BelongsTo.prototype.onCollectionSync = function() {
      return this.owner.set(this.name, this.collection.first());
    };


    /**
    Called whenever the owner instance's {@link #foreignKey} field is changed.
    If the foreign key is different than the related instance in the generated
    {@link #name} field, the {@link #name} field is set to null.  To obtain the
    related instance, the relationship must be fetched again.
    @method onForeignKeyChange
     */

    BelongsTo.prototype.onForeignKeyChange = function() {
      var _ref;
      if (this.owner.get(this.foreignKey) !== ((_ref = this.owner.get(this.name)) != null ? _ref.get(this.model.prototype.idAttribute) : void 0)) {
        return this.owner.set(this.name, null);
      }
    };


    /**
    Called whenever the owner instance's {@link #name} field is changed.  If the
    ID of the related instance is different than the value of {@link #foreignKey},
    the foreign key field is updated with the related instance's ID.
    @method onFieldForRelatedInstanceChange
     */

    BelongsTo.prototype.onFieldForRelatedInstanceChange = function() {
      var relatedId, _ref;
      relatedId = (_ref = this.owner.get(this.name)) != null ? _ref.get(this.model.prototype.idAttribute) : void 0;
      if (relatedId && (this.owner.get(this.foreignKey) !== relatedId)) {
        return this.owner.set(this.foreignKey, relatedId);
      }
    };


    /**
    Returns a query used to obtain the related instance from the server.
    @method getQuery
    @return {Object} parameters used to query server for the related instance
     */

    BelongsTo.prototype.getQuery = function() {
      var query;
      query = BelongsTo.__super__.getQuery.apply(this, arguments);
      query[this.model.prototype.idAttribute] = this.owner.get(this.foreignKey);
      return query;
    };


    /**
    Querys the server for related instances.
    @method fetch
    @param {Function} callback function executed upon query success; called with
    one argument:  the related instance (if any)
     */

    BelongsTo.prototype.fetch = function(callback) {
      return this.collection.query(this.getQuery(), {
        reset: true,
        success: (function(_this) {
          return function() {
            if (_.isFunction(callback)) {
              return callback(_this.owner, _this.collection.first());
            }
          };
        })(this)
      });
    };

    return BelongsTo;

  })(AP.relationship.Relationship);


  /**
  A has-many relationship is one where the owner model instance is related to
  any number of related instances.  In this scheme, the relationship
  information is stored in a foreign key on the related instance(s).  The related
  instances are stored in the {@link #collection} on a generated field
  {@link #name} once fetched.
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class HasMany
  @extends AP.relationship.Relationship
   */

  AP.relationship.HasMany = (function(_super) {
    __extends(HasMany, _super);

    function HasMany() {
      return HasMany.__super__.constructor.apply(this, arguments);
    }

    HasMany.prototype.initialize = function() {
      HasMany.__super__.initialize.apply(this, arguments);
      this.listenTo(this.collection, "reset", this.onCollectionReset);
      return this.listenTo(this.collection, "change:" + this.foreignKey, this.onRelatedInstanceForeignKeyChange);
    };


    /**
    Sets the {@link #foreignKey} of the related instance to the ID of the owner
    instance when added to the collection.  Triggers a change event on the
    generated relationship field {@link #name}.
    @method onCollectionAdd
    @param {Object} record the added model instance
     */

    HasMany.prototype.onCollectionAdd = function(record) {
      record.set(this.foreignKey, this.owner.get(this.owner.idAttribute));
      return this.owner.trigger("change:" + this.name);
    };


    /**
    Unset the {@link #foreignKey} of the related instance when removed from
    the collection.  Triggers a change event on the generated relationship
    field {@link #name}.
    @method onCollectionRemove
    @param {Object} record the removed model instance
     */

    HasMany.prototype.onCollectionRemove = function(record) {
      if (record.get(this.foreignKey) === this.owner.get(this.owner.idAttribute)) {
        record.set(this.foreignKey, null);
      }
      return this.owner.trigger("change:" + this.name);
    };


    /**
    Triggers a change event on the generated relationship field {@link #name} when
    the collection is reset.  See {@link #filterCollection}.
    @method onCollectionReset
     */

    HasMany.prototype.onCollectionReset = function() {
      return this.owner.trigger("change:" + this.name);
    };


    /**
    Calls {@link #filterCollection} whenever the foreign key field of a related
    instance is changed.
    @method onRelatedInstanceForeignKeyChange
     */

    HasMany.prototype.onRelatedInstanceForeignKeyChange = function() {
      return this.filterCollection();
    };


    /**
    Removes any stale related instances from the collection.  Stale instances are
    instances with foreign keys that no longer refer to the owner instance.
    See {@link #onCollectionReset}.
    @method filterCollection
     */

    HasMany.prototype.filterCollection = function() {
      var filtered, whereClause;
      whereClause = {};
      whereClause[this.foreignKey] = this.owner.get(this.owner.idAttribute);
      filtered = this.collection.where(whereClause);
      return this.collection.reset(filtered, {
        reset: true
      });
    };


    /**
    Returns the default value of the generated field {@link #name}.  For many-to-
    many relationships, the value is always the {@link #collection} instance.
    @method getDefault
    @return {AP.collection.Collection} the collection instance declared
    by {@link #collection}.
     */

    HasMany.prototype.getDefault = function() {
      return this.collection;
    };


    /**
    Returns a query used to obtain the related instances from the server.
    @method getQuery
    @return {Object} parameters used to query server for the related instances
     */

    HasMany.prototype.getQuery = function() {
      var query;
      query = HasMany.__super__.getQuery.apply(this, arguments);
      query[this.foreignKey] = this.owner.get(this.owner.idAttribute);
      return query;
    };


    /**
    Querys the server for related instances.
    @method fetch
    @param {Function} callback function executed upon query success; called with
    one argument:  the collection of related instances
     */

    HasMany.prototype.fetch = function(callback) {
      return this.collection.query(this.getQuery(), {
        reset: true,
        success: (function(_this) {
          return function() {
            if (_.isFunction(callback)) {
              return callback(_this.owner, _this.collection);
            }
          };
        })(this)
      });
    };

    return HasMany;

  })(AP.relationship.Relationship);


  /**
  A has-one relationship is simlar to a {@link AP.relationship.BelongsTo}
  relationship except that the relationship information is stored in foreign key
  fields on the related instances instead of on owner instances.
  
  In implementation, a has-one relationship functions like has-many, except that
  the value of the generated {@link #name} field is a related
  {@link #model model instance} instead of a collection.
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class HasOne
  @extends AP.relationship.HasMany
   */

  AP.relationship.HasOne = (function(_super) {
    __extends(HasOne, _super);

    function HasOne() {
      return HasOne.__super__.constructor.apply(this, arguments);
    }

    HasOne.prototype.initializeEvents = function() {
      this.listenTo(this.collection, "change:" + this.foreignKey, this.onForeignKeyChange);
      this.listenTo(this.owner, "change:" + this.name, this.onFieldForRelatedInstanceChange);
      return HasOne.__super__.initializeEvents.apply(this, arguments);
    };


    /**
    Sets the {@link #name} generated field on the owner model to the first model
    instance in the collection after syncing.
    @method onCollectionSync
     */

    HasOne.prototype.onCollectionSync = function() {
      return this.owner.set(this.name, this.collection.first());
    };


    /**
    Called whenever the related instance's {@link #foreignKey} field is changed.
    If the foreign key of the related instance referes to a different owner, then
    the {@link #name} field is set to null.  To obtain the related instance after
    the field is nulled, the relationship must be fetched again.
    @method onForeignKeyChange
     */

    HasOne.prototype.onForeignKeyChange = function() {
      var related;
      related = this.owner.get(this.name);
      if (related && (related.get(this.foreignKey) !== this.owner.get(this.owner.idAttribute))) {
        return this.owner.set(this.name, null);
      }
    };


    /**
    Called whenever the owner instance's {@link #name} field is changed.  If the
    foreign key of the new related instance is different than the ID of the owner,
    the foreign key field of the related instance is set to the ID of the owner.
    @method onFieldForRelatedInstanceChange
     */

    HasOne.prototype.onFieldForRelatedInstanceChange = function() {
      var ownerId, related;
      related = this.owner.get(this.name);
      ownerId = this.owner.get(this.owner.idAttribute);
      if (related && (related.get(this.foreignKey) !== ownerId)) {
        return related.set(this.foreignKey, ownerId);
      }
    };


    /**
    The default value for a has-one relationship is null like belongs-to.
    @method getDefault
    @return {Object} null
     */

    HasOne.prototype.getDefault = function() {
      return null;
    };


    /**
    Querys the server for related instances.
    @method fetch
    @param {Function} callback function executed upon query success; called with
    one argument:  the related instance (if any)
     */

    HasOne.prototype.fetch = function(callback) {
      return this.collection.query(this.getQuery(), {
        reset: true,
        success: (function(_this) {
          return function() {
            if (_.isFunction(callback)) {
              return callback(_this.owner, _this.collection.first());
            }
          };
        })(this)
      });
    };

    return HasOne;

  })(AP.relationship.HasMany);


  /**
  Base collection class.  In addition to the standard methods provided by the
  [Backbone JS collection class](http://backbonejs.org/#Collection), this base
  collection implements paginaton and query parameter mapping.
  
  This class should be subclassed, not used directly.  For example (Coffeescript):
  @example
      class People extends AP.collection.Collection
        @collectionId: 'people'
        model: Person
        apiEndpoint: '/person/'
        extraParams:
          format: 'json'
  
  For full collection usage documentation,
  refer to [Backbone JS](http://backbonejs.org/#Collection).
  
  @module AP
  @submodule collection
  @class Collection
  @extends Backbone.Collection
   */

  AP.collection.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }


    /**
    Name/value pairs appended to URL of requests to server.  For example, extra
    parameters `{format: 'json'}` is passed to server as:  `/url/?format=json`.
    @property extraParams
    @type Object
     */

    Collection.prototype.extraParams = {};

    Collection.prototype.initialize = function() {
      return this.extraParams = _.clone(this.extraParams || {});
    };


    /**
    Returns the URL for this collection.  By default this is the value of the
    `apiEndpoint` member of the collection.
    @method url
    @return {String} URL of this collection
     */

    Collection.prototype.url = function() {
      return this.apiEndpoint;
    };


    /**
    Copies keys in object to keys of the format `query[key_name]`  in a new
    object, where `key_name` is the original key.  Returns a new object leaving
    the original intact.  For example, an input object `{foo: 'bar'}` would
    result in an output object `{query[foo]: 'bar'}`.
    @method mapQueryParams
    @param {Object} data name/value pairs to map to query-format
    @return {Object} a new object with mapped keys
     */

    Collection.prototype.mapQueryParams = function(data) {
      var key, query, value;
      query = {};
      for (key in data) {
        value = data[key];
        if (value) {
          query["query[" + key + "]"] = value;
        }
      }
      return query;
    };


    /**
    Fetches objects from the collection instance's URL.  Calls the underlaying
    [Backbone Collection.fetch method](http://backbonejs.org/#Collection-fetch).
    Note:  data from the collection's optional {@link #extraParams} is passed
    through the URL of every request.
    @method fetch
    @param {Object} options optional request data
    @param {Object} options.data optional request parameters are passed through
    request URL as-is
    @param {Object} options.query optional query parameters are passed through
    request URL after being transformed by {@link #mapQuerParams}.
    @param args... optional additional arguments passed-through to underlaying
    [Backbone Collection.fetch method](http://backbonejs.org/#Collection-fetch).
     */

    Collection.prototype.fetch = function() {
      var args, options, query;
      options = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (options == null) {
        options = {};
      }
      if (options != null ? options.query : void 0) {
        query = this.mapQueryParams(options.query);
      }
      options.data = _.extend({}, this.extraParams, options.data, query);
      return Backbone.Collection.prototype.fetch.apply(this, [options].concat(args));
    };


    /**
    Convenience method calls {@link #fetch} passing `query` as query parameters.
    @method query
    @param {Object} query name/value pairs passed to {@link #fetch} as query data
     */

    Collection.prototype.query = function(query, options) {
      return this.fetch(_.extend({
        query: query
      }, options));
    };

    return Collection;

  })(Backbone.Collection);


  /**
  Similar to `AP.collection.Collection` except that query data are
  optionally mapped to alternative parameter names.  Specify query fields when
  request parameters have different names than model fields.
  
  For example (Coffeescript):
  @example
      class PeopleScope extends AP.collection.ScopeCollection
        @collectionId: 'people_scope'
        model: Person
        apiEndpoint: '/person/'
        extraParams:
          scope: 'scoped'
        queryFields: [
          fieldName: 'name'
          paramName: 'person_name'
        ]
  
  @module AP
  @submodule collection
  @class ScopeCollection
  @extends AP.collection.Collection
   */

  AP.collection.ScopeCollection = (function(_super) {
    __extends(ScopeCollection, _super);

    function ScopeCollection() {
      return ScopeCollection.__super__.constructor.apply(this, arguments);
    }


    /**
    Copies `data` to new object and replaces keys which match any `queryFields`
    mapping configurations with the alternative parameter name.  For example,
    with `queryFields` `[{fieldName: 'name', paramName: 'person_name'}] and
    input object `{name: 'John', age: 35}`, output object
    is `{person_name: 'John', age: 35}`.
    @method mapQueryFieldKeys
    @param {Object} data name/value pairs to map
    @return {Object} a new object with mapped keys
     */

    ScopeCollection.prototype.mapQueryFieldKeys = function(data) {
      'Maps key names in data to equivalent param names in @queryFields if\nany match.  On match, original key names are not retained.  Returns a new\nobject leaving original intact.';
      var key, mapped, mappedKey, paramName, value;
      mapped = {};
      for (key in data) {
        value = data[key];
        paramName = (_.find(this.queryFields, function(field) {
          return field.fieldName === key;
        }) || {}).paramName;
        mappedKey = paramName || key;
        if (value) {
          mapped[mappedKey] = value;
        }
      }
      return mapped;
    };


    /**
    Fetches objects from the collection instance's URL.  All arguments are passed-
    through to {@link AP.collection.Collection#fetch}, except for `options.query`
    which is transformed first by {@link #mapQueryFieldKeys}.
    @method fetch
    @param {Object} options optional request data
    @param {Object} options.query optional query parameters are passed through
    request URL after being transformed by {@link #mapQuerParams}
    @param args... optional additional arguments passed-through
    to {@link AP.collection.Collection#fetch}
     */

    ScopeCollection.prototype.fetch = function() {
      var args, options, query;
      options = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (options == null) {
        options = {};
      }
      if (options != null ? options.query : void 0) {
        query = this.mapQueryFieldKeys(options.query);
      }
      if (query) {
        options.query = query;
      }
      return AP.collection.Collection.prototype.fetch.apply(this, [options].concat(args));
    };

    return ScopeCollection;

  })(AP.collection.Collection);


  /**
  Unlike a normal `AP.collection.Collection`, aggregate collections expect a
  simple integer-only response from the server.  Aggregate collections are always
  zero-length (they have no members).  They have an extra member `value`.
  @module AP
  @submodule collection
  @class AggregateCollection
  @extends AP.collection.ScopeCollection
   */

  AP.collection.AggregateCollection = (function(_super) {
    __extends(AggregateCollection, _super);

    function AggregateCollection() {
      return AggregateCollection.__super__.constructor.apply(this, arguments);
    }


    /**
    The value last returned by this collection's URL.
    @property value
    @type Number
     */

    AggregateCollection.prototype.value = null;


    /**
    @method valueOf
    @return {Number} the value of {@link #value}
     */

    AggregateCollection.prototype.valueOf = function() {
      return this.value;
    };


    /**
    Called automatically whenever {@link AP.collection.Collection#fetch} returns.
    The response is parsed as an integer and stored in {@link #value}.  `parse`
    ignores any other data returned by the server.
    @method parse
    @param {String} response the value returned by the server
     */

    AggregateCollection.prototype.parse = function(response) {
      this.value = parseInt(response, 10);
      return [];
    };

    return AggregateCollection;

  })(AP.collection.ScopeCollection);


  /**
  Provides convenience methods common to apps.  Generally, apps are
  namespaces not intended for instantiation.
  
  All apps should inherit from this class and execute setup.  It is important to
  execute setup before adding members.
  
  For example (Coffeescript):
  @example
      class AppClass extends AP.Application
        @setup()
  
  @module AP
  @class Application
  @static
   */

  AP.Application = (function() {
    function Application() {}


    /**
    Adds static members to the class:
    
    - `name`
    - `description`
    - `models`
    - `collections`
    
    It is important to execute setup before adding members.
    @method setup
    @static
     */

    Application.setup = function() {
      this.name = this.name || '';
      this.description = this.description || '';
      this.models = {};
      this.collections = {};
      return this.mockServer = null;
    };


    /**
    @method init
    @static
     */

    Application.init = function() {
      AP = window.AP;
      if (AP.useMockServer) {
        this.mockServer = new AP.utility.MockServer(this);
      }
      if (AP.useOfflineCache) {
        this.initOfflineCache();
      }
      return this.initAjaxSetup();
    };


    /**
    @method initOfflineCache
    @static
     */

    Application.initOfflineCache = function() {
      AP = window.AP;
      AP.offlineDataStore = new AP.utility.TransientLargeLocalStore({
        storageName: 'ap-offline-data-store',
        storageCapacity: AP.offlineStorageCapacity
      });
      Backbone._sync = Backbone.sync;
      return Backbone.sync = function(method, obj, options) {
        var cacheKey, data, oldError, oldSuccess, url, user;
        url = options.url || _.result(obj, 'url');
        if (url && method === 'read') {
          data = options.data || JSON.stringify(options.attrs || (obj != null ? obj.toJSON(options) : void 0));
          oldSuccess = options.success;
          oldError = options.error;
          user = null;
          if (AP.auth.Authentication.isAuthenticated()) {
            user = {
              username: AP.auth.Authentication.getUsername(),
              role: AP.auth.Authentication.getUserRole()
            };
          }
          cacheKey = [AP.baseUrl, url, data, user];
          options.success = (function(_this) {
            return function(response) {
              AP.offlineDataStore.set(cacheKey, response);
              return oldSuccess.apply(_this, arguments);
            };
          })(this);
          options.error = (function(_this) {
            return function(xhr) {
              var status;
              status = +xhr.status;
              if (status < 400 || status >= 500) {
                return AP.offlineDataStore.get(cacheKey, {
                  success: function(cached) {
                    return oldSuccess.apply(_this, [cached]);
                  },
                  error: function() {
                    return oldError.apply(_this, arguments);
                  }
                });
              } else {
                return oldError.apply(_this, arguments);
              }
            };
          })(this);
        }
        return Backbone._sync.apply(this, arguments);
      };
    };


    /**
    @method initAjaxSetup
    @static
     */

    Application.initAjaxSetup = function() {
      return $.ajaxSetup({
        beforeSend: function(request, settings) {
          var authSessionId, authSessionIdHeader, bits;
          AP = window.AP;
          authSessionIdHeader = AP.auth.Authentication.getAuthSessionIdHeaderName();
          authSessionId = AP.auth.Authentication.getAuthSessionId();
          if (authSessionId) {
            request.setRequestHeader(authSessionIdHeader, authSessionId);
          }
          if (!AP.useMockServer && AP.baseUrl) {
            bits = AP.utility.Url.parseUrl(settings.url);
            if (!(bits.host && bits.protocol)) {
              return _.extend(settings, {
                crossDomain: true,
                url: "" + AP.baseUrl + settings.url,
                xhrFields: _.extend({}, settings.xhrFields, {
                  withCredentials: true
                })
              });
            }
          }
        }
      });
    };


    /**
    @method proxy
    @static
     */

    Application.proxy = function(fn) {
      return (function(_this) {
        return function() {
          return fn.apply(_this, arguments);
        };
      })(this);
    };


    /**
    Returns a model class for this application by name or model ID.
    @method getModel
    @static
    @param {String} str the name or ID of a model
    @return {AP.model.Model} a model class
     */

    Application.getModel = function(str) {
      return _.find(this.models, function(val, key) {
        return key === str || val.modelId === str || val.name === str;
      });
    };


    /**
    Returns a collection class for this application by name or collection ID.
    @param {String} str the name or ID of a collection
    @return {AP.collection.Collection} a collection class
    @method getCollection
    @static
     */

    Application.getCollection = function(str) {
      return _.find(this.collections, function(val, key) {
        return key === str || val.collectionId === str || val.name === str;
      });
    };

    return Application;

  })();


  /**
  Simple namespace class for this application.
  
  Example application look-up:
  @example
      app = AP.getApp('LoyaltyRtrSdk')
  
  Example model and collection look-ups:
  @example
      modelClass = app.getModel('modelName')
      collectionClass = app.getCollection('collectionName')
  
  @class LoyaltyRtrSdk
  @extends AP.Application
  @static
   */

  window.LoyaltyRtrSdk = (function(_super) {
    __extends(LoyaltyRtrSdk, _super);

    function LoyaltyRtrSdk() {
      return LoyaltyRtrSdk.__super__.constructor.apply(this, arguments);
    }

    LoyaltyRtrSdk.setup();


    /**
    Application name.
    @static
    @property name
    @type String
     */

    LoyaltyRtrSdk.name = 'LoyaltyRtrSdk';


    /**
    Application description.
    @static
    @property description
    @type String
     */

    LoyaltyRtrSdk.description = 'MasterCard Loyalty RTR';

    LoyaltyRtrSdk.init = function() {
      window.AP.activeAppName = 'LoyaltyRtr';
      return LoyaltyRtrSdk.__super__.constructor.init.apply(this, arguments);
    };

    return LoyaltyRtrSdk;

  })(AP.Application);


  /*
  Registers the app with the global {@link AP AP namespace}.
   */

  AP.registerApp(LoyaltyRtrSdk, 'LoyaltyRtr');


  /**
  AppConfiguration model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class AppConfiguration
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.AppConfiguration = (function(_super) {
    __extends(AppConfiguration, _super);

    function AppConfiguration() {
      return AppConfiguration.__super__.constructor.apply(this, arguments);
    }

    _.extend(AppConfiguration, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    AppConfiguration.modelId = '4524';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    AppConfiguration.prototype.name = 'AppConfiguration';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    AppConfiguration.prototype.urlRoot = '/api/v3/app_configurations';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    AppConfiguration.prototype.fieldDefinitions = [
      {
        id: 39672,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39674,
        name: 'colors',
        label: 'colors',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39673,
        name: 'strings',
        label: 'strings',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    AppConfiguration.prototype.nonAutoKeyFields = ['colors', 'strings'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    AppConfiguration.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    AppConfiguration.prototype.validations = [];

    return AppConfiguration;

  })(AP.model.Model);


  /**
  Audit model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Audit
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.Audit = (function(_super) {
    __extends(Audit, _super);

    function Audit() {
      return Audit.__super__.constructor.apply(this, arguments);
    }

    _.extend(Audit, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    Audit.modelId = '4523';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    Audit.prototype.name = 'Audit';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    Audit.prototype.urlRoot = '/api/v3/audits';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    Audit.prototype.fieldDefinitions = [
      {
        id: 39665,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39669,
        name: 'action_desc',
        label: 'action_desc',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39668,
        name: 'after_values',
        label: 'after_values',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39667,
        name: 'before_values',
        label: 'before_values',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39666,
        name: 'object_name',
        label: 'object_name',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39671,
        name: 'performed_at',
        label: 'performed_at',
        type: 'time',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40125,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39670,
        name: 'user_id',
        label: 'user_id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    Audit.prototype.nonAutoKeyFields = ['action_desc', 'after_values', 'before_values', 'object_name', 'performed_at', 'program_level_id', 'user_id'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    Audit.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    Audit.prototype.validations = [];

    return Audit;

  })(AP.model.Model);


  /**
  Bank model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Bank
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.Bank = (function(_super) {
    __extends(Bank, _super);

    function Bank() {
      return Bank.__super__.constructor.apply(this, arguments);
    }

    _.extend(Bank, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    Bank.modelId = '4515';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    Bank.prototype.name = 'Bank';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    Bank.prototype.urlRoot = '/api/v3/banks';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    Bank.prototype.fieldDefinitions = [
      {
        id: 39526,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39562,
        name: 'android_url',
        label: 'android_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 40012,
        name: 'contact_info',
        label: 'contact_info',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40484,
        name: 'default_currency',
        label: 'default_currency',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39567,
        name: 'icon',
        label: 'icon',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39559,
        name: 'image_url',
        label: 'image_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39561,
        name: 'ios_url',
        label: 'ios_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 40141,
        name: 'is_active',
        label: 'is_active',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40011,
        name: 'loading_image_url',
        label: 'loading_image_url',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39560,
        name: 'mobile_site_url',
        label: 'mobile_site_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39558,
        name: 'name',
        label: 'name',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40131,
        name: 'program_data_language_code',
        label: 'program_data_language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40130,
        name: 'program_language_code',
        label: 'program_language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39557,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39565,
        name: 'tc_last_update_on',
        label: 'tc_last_update_on',
        type: 'date',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39564,
        name: 'tc_summary',
        label: 'tc_summary',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39563,
        name: 'tc_url',
        label: 'tc_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    Bank.prototype.nonAutoKeyFields = ['android_url', 'contact_info', 'default_currency', 'icon', 'image_url', 'ios_url', 'is_active', 'loading_image_url', 'mobile_site_url', 'name', 'program_data_language_code', 'program_language_code', 'program_level_id', 'tc_last_update_on', 'tc_summary', 'tc_url'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    Bank.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    Bank.prototype.validations = [];

    return Bank;

  })(AP.model.Model);


  /**
  BankFaq model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class BankFaq
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.BankFaq = (function(_super) {
    __extends(BankFaq, _super);

    function BankFaq() {
      return BankFaq.__super__.constructor.apply(this, arguments);
    }

    _.extend(BankFaq, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    BankFaq.modelId = '4518';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    BankFaq.prototype.name = 'BankFaq';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    BankFaq.prototype.urlRoot = '/api/v3/bank_faqs';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    BankFaq.prototype.fieldDefinitions = [
      {
        id: 39529,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39576,
        name: 'answer',
        label: 'answer',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40482,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39653,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39575,
        name: 'question',
        label: 'question',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39577,
        name: 'url',
        label: 'url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    BankFaq.prototype.nonAutoKeyFields = ['answer', 'language_code', 'program_level_id', 'question', 'url'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    BankFaq.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    BankFaq.prototype.validations = [];

    return BankFaq;

  })(AP.model.Model);


  /**
  BankOffer model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class BankOffer
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.BankOffer = (function(_super) {
    __extends(BankOffer, _super);

    function BankOffer() {
      return BankOffer.__super__.constructor.apply(this, arguments);
    }

    _.extend(BankOffer, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    BankOffer.modelId = '4516';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    BankOffer.prototype.name = 'BankOffer';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    BankOffer.prototype.urlRoot = '/api/v3/bank_offers';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    BankOffer.prototype.fieldDefinitions = [
      {
        id: 39527,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39652,
        name: 'base_conversion_factor',
        label: 'base_conversion_factor',
        type: 'float',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39648,
        name: 'category',
        label: 'category',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39569,
        name: 'end_date',
        label: 'end_date',
        type: 'date',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39570,
        name: 'image',
        label: 'image',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 40129,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39571,
        name: 'line_one',
        label: 'line_one',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39968,
        name: 'line_three',
        label: 'line_three',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39967,
        name: 'line_two',
        label: 'line_two',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39966,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39655,
        name: 'promo_conversion_rate',
        label: 'promo_conversion_rate',
        type: 'float',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39568,
        name: 'start_date',
        label: 'start_date',
        type: 'date',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    BankOffer.prototype.nonAutoKeyFields = ['base_conversion_factor', 'category', 'end_date', 'image', 'language_code', 'line_one', 'line_three', 'line_two', 'program_level_id', 'promo_conversion_rate', 'start_date'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    BankOffer.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    BankOffer.prototype.validations = [];

    return BankOffer;

  })(AP.model.Model);


  /**
  BankRanac model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class BankRanac
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.BankRanac = (function(_super) {
    __extends(BankRanac, _super);

    function BankRanac() {
      return BankRanac.__super__.constructor.apply(this, arguments);
    }

    _.extend(BankRanac, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    BankRanac.modelId = '4568';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    BankRanac.prototype.name = 'BankRanac';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    BankRanac.prototype.urlRoot = '/api/v3/bank_ranacs';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    BankRanac.prototype.fieldDefinitions = [
      {
        id: 40136,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40140,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40139,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41573,
        name: 'push_notifications_enabled',
        label: 'push_notifications_enabled',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40138,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40717,
        name: 'temp_ban_number',
        label: 'temp_ban_number',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    BankRanac.prototype.nonAutoKeyFields = ['language_code', 'program_level_id', 'push_notifications_enabled', 'ranac', 'temp_ban_number'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    BankRanac.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    BankRanac.prototype.validations = [];

    return BankRanac;

  })(AP.model.Model);


  /**
  ColorSwatch model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class ColorSwatch
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.ColorSwatch = (function(_super) {
    __extends(ColorSwatch, _super);

    function ColorSwatch() {
      return ColorSwatch.__super__.constructor.apply(this, arguments);
    }

    _.extend(ColorSwatch, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    ColorSwatch.modelId = '4525';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    ColorSwatch.prototype.name = 'ColorSwatch';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    ColorSwatch.prototype.urlRoot = '/api/v3/color_swatches';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    ColorSwatch.prototype.fieldDefinitions = [
      {
        id: 39675,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39677,
        name: 'color_argb',
        label: 'color_argb',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39678,
        name: 'color_id',
        label: 'color_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39679,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    ColorSwatch.prototype.nonAutoKeyFields = ['color_argb', 'color_id', 'program_level_id'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    ColorSwatch.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    ColorSwatch.prototype.validations = [];

    return ColorSwatch;

  })(AP.model.Model);


  /**
  LanguageCode model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class LanguageCode
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.LanguageCode = (function(_super) {
    __extends(LanguageCode, _super);

    function LanguageCode() {
      return LanguageCode.__super__.constructor.apply(this, arguments);
    }

    _.extend(LanguageCode, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    LanguageCode.modelId = '4569';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    LanguageCode.prototype.name = 'LanguageCode';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    LanguageCode.prototype.urlRoot = '/api/v3/language_codes';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    LanguageCode.prototype.fieldDefinitions = [
      {
        id: 40142,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40143,
        name: 'code',
        label: 'code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40451,
        name: 'readable_string',
        label: 'readable_string',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    LanguageCode.prototype.nonAutoKeyFields = ['code', 'readable_string'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    LanguageCode.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    LanguageCode.prototype.validations = [];

    return LanguageCode;

  })(AP.model.Model);


  /**
  LanguageString model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class LanguageString
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.LanguageString = (function(_super) {
    __extends(LanguageString, _super);

    function LanguageString() {
      return LanguageString.__super__.constructor.apply(this, arguments);
    }

    _.extend(LanguageString, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    LanguageString.modelId = '4519';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    LanguageString.prototype.name = 'LanguageString';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    LanguageString.prototype.urlRoot = '/api/v3/language_strings';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    LanguageString.prototype.fieldDefinitions = [
      {
        id: 39530,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39663,
        name: 'fallback',
        label: 'fallback',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39662,
        name: 'global',
        label: 'global',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39660,
        name: 'label_id',
        label: 'label_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39659,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39661,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39664,
        name: 'value',
        label: 'value',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    LanguageString.prototype.nonAutoKeyFields = ['fallback', 'global', 'label_id', 'language_code', 'program_level_id', 'value'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    LanguageString.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    LanguageString.prototype.validations = [];

    return LanguageString;

  })(AP.model.Model);


  /**
  LocalUserStorage model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class LocalUserStorage
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.LocalUserStorage = (function(_super) {
    __extends(LocalUserStorage, _super);

    function LocalUserStorage() {
      return LocalUserStorage.__super__.constructor.apply(this, arguments);
    }

    _.extend(LocalUserStorage, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    LocalUserStorage.modelId = '4558';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    LocalUserStorage.prototype.name = 'LocalUserStorage';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    LocalUserStorage.prototype.urlRoot = '/api/v3/local_user_storages';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    LocalUserStorage.prototype.fieldDefinitions = [
      {
        id: 40009,
        name: 'id',
        label: 'id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41938,
        name: 'current_last_four',
        label: 'current_last_four',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41939,
        name: 'current_program_level_id',
        label: 'current_program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40010,
        name: 'ranacs',
        label: 'ranacs',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41937,
        name: 'terms_agreed_on',
        label: 'terms_agreed_on',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    LocalUserStorage.prototype.nonAutoKeyFields = ['current_last_four', 'current_program_level_id', 'ranacs', 'terms_agreed_on'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    LocalUserStorage.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    LocalUserStorage.prototype.validations = [];

    return LocalUserStorage;

  })(AP.model.Model);


  /**
  Message model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Message
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.Message = (function(_super) {
    __extends(Message, _super);

    function Message() {
      return Message.__super__.constructor.apply(this, arguments);
    }

    _.extend(Message, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    Message.modelId = '4557';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    Message.prototype.name = 'Message';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    Message.prototype.urlRoot = '/api/v3/messages';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    Message.prototype.fieldDefinitions = [
      {
        id: 40005,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40124,
        name: 'body',
        label: 'body',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40135,
        name: 'category',
        label: 'category',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40122,
        name: 'created_on',
        label: 'created_on',
        type: 'time',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40006,
        name: 'is_read',
        label: 'is_read',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40483,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40123,
        name: 'last_four_digits',
        label: 'last_four_digits',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40121,
        name: 'points_available',
        label: 'points_available',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40628,
        name: 'points_earned',
        label: 'points_earned',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40008,
        name: 'points_redeemed',
        label: 'points_redeemed',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40134,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40007,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    Message.prototype.nonAutoKeyFields = ['body', 'category', 'created_on', 'is_read', 'language_code', 'last_four_digits', 'points_available', 'points_earned', 'points_redeemed', 'program_level_id', 'ranac'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    Message.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    Message.prototype.validations = [];

    return Message;

  })(AP.model.Model);


  /**
  Rtr model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Rtr
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.Rtr = (function(_super) {
    __extends(Rtr, _super);

    function Rtr() {
      return Rtr.__super__.constructor.apply(this, arguments);
    }

    _.extend(Rtr, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    Rtr.modelId = '4517';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    Rtr.prototype.name = 'Rtr';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    Rtr.prototype.urlRoot = '/api/v3/rtrs';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    Rtr.prototype.fieldDefinitions = [
      {
        id: 39528,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39553,
        name: 'base_conversion_factor',
        label: 'base_conversion_factor',
        type: 'float',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39550,
        name: 'cardholder_threshold',
        label: 'cardholder_threshold',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39547,
        name: 'communication_preference',
        label: 'communication_preference',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39970,
        name: 'current_cashback_card',
        label: 'current_cashback_card',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39548,
        name: 'current_cash_card_last_four',
        label: 'current_cash_card_last_four',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39549,
        name: 'email_address',
        label: 'email_address',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39552,
        name: 'issuer_lower_bound',
        label: 'issuer_lower_bound',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39551,
        name: 'issuer_upper_bound',
        label: 'issuer_upper_bound',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39555,
        name: 'next_transaction_only',
        label: 'next_transaction_only',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39654,
        name: 'notification_preference',
        label: 'notification_preference',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39546,
        name: 'opt_in_preference',
        label: 'opt_in_preference',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39556,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39545,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: true,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39554,
        name: 'redeemable_point_balance',
        label: 'redeemable_point_balance',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    Rtr.prototype.nonAutoKeyFields = ['base_conversion_factor', 'cardholder_threshold', 'communication_preference', 'current_cashback_card', 'current_cash_card_last_four', 'email_address', 'issuer_lower_bound', 'issuer_upper_bound', 'next_transaction_only', 'notification_preference', 'opt_in_preference', 'program_level_id', 'ranac', 'redeemable_point_balance'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    Rtr.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    Rtr.prototype.validations = [
      {
        field: 'ranac',
        validate: 'required'
      }
    ];

    return Rtr;

  })(AP.model.Model);


  /**
  User model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class User
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.User = (function(_super) {
    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    _.extend(User, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    User.modelId = '4520';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    User.prototype.name = 'User';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    User.prototype.urlRoot = '/api/v3/users';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    User.prototype.fieldDefinitions = [
      {
        id: 39531,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39714,
        name: 'answer',
        label: 'answer',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39712,
        name: 'ban',
        label: 'ban',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41197,
        name: 'ldap_id',
        label: 'ldap_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39533,
        name: 'password',
        label: 'password',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39536,
        name: 'password_confirmation',
        label: 'password_confirmation',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39537,
        name: 'password_digest',
        label: 'password_digest',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39713,
        name: 'question_code',
        label: 'question_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39715,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39534,
        name: 'role',
        label: 'role',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39532,
        name: 'username',
        label: 'username',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39535,
        name: 'x_session_id',
        label: 'x_session_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    User.prototype.nonAutoKeyFields = ['answer', 'ban', 'ldap_id', 'password', 'password_confirmation', 'password_digest', 'question_code', 'ranac', 'role', 'username', 'x_session_id'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    User.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    User.prototype.validations = [];

    return User;

  })(AP.model.Model);


  /**
  ValidateCustomer model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class ValidateCustomer
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.ValidateCustomer = (function(_super) {
    __extends(ValidateCustomer, _super);

    function ValidateCustomer() {
      return ValidateCustomer.__super__.constructor.apply(this, arguments);
    }

    _.extend(ValidateCustomer, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    ValidateCustomer.modelId = '4653';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    ValidateCustomer.prototype.name = 'ValidateCustomer';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    ValidateCustomer.prototype.urlRoot = '/api/v3/validate_customers';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    ValidateCustomer.prototype.fieldDefinitions = [
      {
        id: 41189,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41195,
        name: 'ban',
        label: 'ban',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41198,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41190,
        name: 'valid_cust_birthdate',
        label: 'valid_cust_birthdate',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41194,
        name: 'valid_cust_generic_identifier_txt',
        label: 'valid_cust_generic_identifier_txt',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41192,
        name: 'valid_cust_mothers_maiden_name',
        label: 'valid_cust_mothers_maiden_name',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41193,
        name: 'valid_cust_postal_code',
        label: 'valid_cust_postal_code',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 41191,
        name: 'valid_cust_ssn_last_four',
        label: 'valid_cust_ssn_last_four',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    ValidateCustomer.prototype.nonAutoKeyFields = ['ban', 'ranac', 'valid_cust_birthdate', 'valid_cust_generic_identifier_txt', 'valid_cust_mothers_maiden_name', 'valid_cust_postal_code', 'valid_cust_ssn_last_four'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    ValidateCustomer.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    ValidateCustomer.prototype.validations = [];

    return ValidateCustomer;

  })(AP.model.Model);


  /**
  ValidationQuestion model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class ValidationQuestion
  @extends AP.model.Model
   */

  LoyaltyRtrSdk.models.ValidationQuestion = (function(_super) {
    __extends(ValidationQuestion, _super);

    function ValidationQuestion() {
      return ValidationQuestion.__super__.constructor.apply(this, arguments);
    }

    _.extend(ValidationQuestion, Backbone.Events);


    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
     */

    ValidationQuestion.modelId = '4514';


    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
     */

    ValidationQuestion.prototype.name = 'ValidationQuestion';


    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
     */

    ValidationQuestion.prototype.urlRoot = '/api/v3/validation_questions';


    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
     */

    ValidationQuestion.prototype.fieldDefinitions = [
      {
        id: 39525,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39538,
        name: 'ban',
        label: 'ban',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39540,
        name: 'question_code',
        label: 'question_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39539,
        name: 'question_text',
        label: 'question_text',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];


    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
     */

    ValidationQuestion.prototype.nonAutoKeyFields = ['ban', 'question_code', 'question_text'];


    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
     */

    ValidationQuestion.prototype.relationshipDefinitions = [];


    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
     */

    ValidationQuestion.prototype.validations = [];

    return ValidationQuestion;

  })(AP.model.Model);


  /**
  AppConfigurationAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.AppConfigurationAll = (function(_super) {
    __extends(AppConfigurationAll, _super);

    function AppConfigurationAll() {
      return AppConfigurationAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AppConfigurationAll.collectionId = '21632';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AppConfigurationAll.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AppConfigurationAll.prototype.apiEndpoint = '/api/v3/app_configurations.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AppConfigurationAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AppConfigurationAll.prototype.queryFields = [];

    return AppConfigurationAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  AppConfigurationCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.AppConfigurationCount = (function(_super) {
    __extends(AppConfigurationCount, _super);

    function AppConfigurationCount() {
      return AppConfigurationCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AppConfigurationCount.collectionId = '21634';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AppConfigurationCount.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AppConfigurationCount.prototype.apiEndpoint = '/api/v3/app_configurations.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AppConfigurationCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AppConfigurationCount.prototype.queryFields = [];

    return AppConfigurationCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  AppConfigurationCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.AppConfigurationCountExactMatch = (function(_super) {
    __extends(AppConfigurationCountExactMatch, _super);

    function AppConfigurationCountExactMatch() {
      return AppConfigurationCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AppConfigurationCountExactMatch.collectionId = '21635';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AppConfigurationCountExactMatch.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AppConfigurationCountExactMatch.prototype.apiEndpoint = '/api/v3/app_configurations.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AppConfigurationCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AppConfigurationCountExactMatch.prototype.queryFields = [];

    return AppConfigurationCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  AppConfigurationExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.AppConfigurationExactMatch = (function(_super) {
    __extends(AppConfigurationExactMatch, _super);

    function AppConfigurationExactMatch() {
      return AppConfigurationExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AppConfigurationExactMatch.collectionId = '21633';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AppConfigurationExactMatch.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AppConfigurationExactMatch.prototype.apiEndpoint = '/api/v3/app_configurations.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AppConfigurationExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AppConfigurationExactMatch.prototype.queryFields = [];

    return AppConfigurationExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  AppConfigurationGetLanguageSettingsis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationGetLanguageSettings
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.AppConfigurationGetLanguageSettings = (function(_super) {
    __extends(AppConfigurationGetLanguageSettings, _super);

    function AppConfigurationGetLanguageSettings() {
      return AppConfigurationGetLanguageSettings.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AppConfigurationGetLanguageSettings.collectionId = '21636';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AppConfigurationGetLanguageSettings.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AppConfigurationGetLanguageSettings.prototype.apiEndpoint = '/api/v3/app_configurations.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AppConfigurationGetLanguageSettings.prototype.extraParams = {
      scope: 'get_language_settings'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AppConfigurationGetLanguageSettings.prototype.queryFields = [];

    return AppConfigurationGetLanguageSettings;

  })(AP.collection.ScopeCollection);


  /**
  AuditAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.AuditAll = (function(_super) {
    __extends(AuditAll, _super);

    function AuditAll() {
      return AuditAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AuditAll.collectionId = '21628';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AuditAll.prototype.model = LoyaltyRtrSdk.models.Audit;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AuditAll.prototype.apiEndpoint = '/api/v3/audits.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AuditAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AuditAll.prototype.queryFields = [];

    return AuditAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  AuditCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.AuditCount = (function(_super) {
    __extends(AuditCount, _super);

    function AuditCount() {
      return AuditCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AuditCount.collectionId = '21630';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AuditCount.prototype.model = LoyaltyRtrSdk.models.Audit;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AuditCount.prototype.apiEndpoint = '/api/v3/audits.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AuditCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AuditCount.prototype.queryFields = [];

    return AuditCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  AuditCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.AuditCountExactMatch = (function(_super) {
    __extends(AuditCountExactMatch, _super);

    function AuditCountExactMatch() {
      return AuditCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AuditCountExactMatch.collectionId = '21631';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AuditCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Audit;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AuditCountExactMatch.prototype.apiEndpoint = '/api/v3/audits.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AuditCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AuditCountExactMatch.prototype.queryFields = [];

    return AuditCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  AuditExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.AuditExactMatch = (function(_super) {
    __extends(AuditExactMatch, _super);

    function AuditExactMatch() {
      return AuditExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    AuditExactMatch.collectionId = '21629';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    AuditExactMatch.prototype.model = LoyaltyRtrSdk.models.Audit;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    AuditExactMatch.prototype.apiEndpoint = '/api/v3/audits.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    AuditExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    AuditExactMatch.prototype.queryFields = [];

    return AuditExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  BankAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankAll = (function(_super) {
    __extends(BankAll, _super);

    function BankAll() {
      return BankAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankAll.collectionId = '21588';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankAll.prototype.model = LoyaltyRtrSdk.models.Bank;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankAll.prototype.apiEndpoint = '/api/v3/banks.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankAll.prototype.queryFields = [];

    return BankAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  BankCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankCount = (function(_super) {
    __extends(BankCount, _super);

    function BankCount() {
      return BankCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankCount.collectionId = '21590';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankCount.prototype.model = LoyaltyRtrSdk.models.Bank;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankCount.prototype.apiEndpoint = '/api/v3/banks.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankCount.prototype.queryFields = [];

    return BankCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  BankCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankCountExactMatch = (function(_super) {
    __extends(BankCountExactMatch, _super);

    function BankCountExactMatch() {
      return BankCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankCountExactMatch.collectionId = '21591';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Bank;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankCountExactMatch.prototype.apiEndpoint = '/api/v3/banks.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankCountExactMatch.prototype.queryFields = [];

    return BankCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  BankExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankExactMatch = (function(_super) {
    __extends(BankExactMatch, _super);

    function BankExactMatch() {
      return BankExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankExactMatch.collectionId = '21589';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankExactMatch.prototype.model = LoyaltyRtrSdk.models.Bank;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankExactMatch.prototype.apiEndpoint = '/api/v3/banks.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankExactMatch.prototype.queryFields = [];

    return BankExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  BankFaqAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankFaqAll = (function(_super) {
    __extends(BankFaqAll, _super);

    function BankFaqAll() {
      return BankFaqAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankFaqAll.collectionId = '21600';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankFaqAll.prototype.model = LoyaltyRtrSdk.models.BankFaq;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankFaqAll.prototype.apiEndpoint = '/api/v3/bank_faqs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankFaqAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankFaqAll.prototype.queryFields = [];

    return BankFaqAll;

  })(AP.collection.ScopeCollection);


  /**
  BankFaqByProgramLevelIdis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqByProgramLevelId
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankFaqByProgramLevelId = (function(_super) {
    __extends(BankFaqByProgramLevelId, _super);

    function BankFaqByProgramLevelId() {
      return BankFaqByProgramLevelId.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankFaqByProgramLevelId.collectionId = '22009';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankFaqByProgramLevelId.prototype.model = LoyaltyRtrSdk.models.BankFaq;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankFaqByProgramLevelId.prototype.apiEndpoint = '/api/v3/bank_faqs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankFaqByProgramLevelId.prototype.extraParams = {
      scope: 'by_program_level_id'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankFaqByProgramLevelId.prototype.queryFields = [
      {
        fieldName: 'program_level_id',
        paramName: 'program_level_id'
      }
    ];

    return BankFaqByProgramLevelId;

  })(AP.collection.ScopeCollection);

  null;


  /**
  BankFaqCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankFaqCount = (function(_super) {
    __extends(BankFaqCount, _super);

    function BankFaqCount() {
      return BankFaqCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankFaqCount.collectionId = '21602';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankFaqCount.prototype.model = LoyaltyRtrSdk.models.BankFaq;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankFaqCount.prototype.apiEndpoint = '/api/v3/bank_faqs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankFaqCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankFaqCount.prototype.queryFields = [];

    return BankFaqCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  BankFaqCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankFaqCountExactMatch = (function(_super) {
    __extends(BankFaqCountExactMatch, _super);

    function BankFaqCountExactMatch() {
      return BankFaqCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankFaqCountExactMatch.collectionId = '21603';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankFaqCountExactMatch.prototype.model = LoyaltyRtrSdk.models.BankFaq;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankFaqCountExactMatch.prototype.apiEndpoint = '/api/v3/bank_faqs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankFaqCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankFaqCountExactMatch.prototype.queryFields = [];

    return BankFaqCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  BankFaqExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankFaqExactMatch = (function(_super) {
    __extends(BankFaqExactMatch, _super);

    function BankFaqExactMatch() {
      return BankFaqExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankFaqExactMatch.collectionId = '21601';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankFaqExactMatch.prototype.model = LoyaltyRtrSdk.models.BankFaq;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankFaqExactMatch.prototype.apiEndpoint = '/api/v3/bank_faqs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankFaqExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankFaqExactMatch.prototype.queryFields = [];

    return BankFaqExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  BankFaqGetBankRanacis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqGetBankRanac
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankFaqGetBankRanac = (function(_super) {
    __extends(BankFaqGetBankRanac, _super);

    function BankFaqGetBankRanac() {
      return BankFaqGetBankRanac.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankFaqGetBankRanac.collectionId = '21850';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankFaqGetBankRanac.prototype.model = LoyaltyRtrSdk.models.BankFaq;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankFaqGetBankRanac.prototype.apiEndpoint = '/api/v3/bank_faqs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankFaqGetBankRanac.prototype.extraParams = {
      scope: 'get_bank_ranac'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankFaqGetBankRanac.prototype.queryFields = [
      {
        fieldName: 'program_level_id',
        paramName: 'program_level_id'
      }
    ];

    return BankFaqGetBankRanac;

  })(AP.collection.ScopeCollection);


  /**
  BankGetBankInformationis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankGetBankInformation
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankGetBankInformation = (function(_super) {
    __extends(BankGetBankInformation, _super);

    function BankGetBankInformation() {
      return BankGetBankInformation.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankGetBankInformation.collectionId = '21780';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankGetBankInformation.prototype.model = LoyaltyRtrSdk.models.Bank;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankGetBankInformation.prototype.apiEndpoint = '/api/v3/banks.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankGetBankInformation.prototype.extraParams = {
      scope: 'get_bank_information'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankGetBankInformation.prototype.queryFields = [
      {
        fieldName: 'program_level_id',
        paramName: 'program_level_id'
      }
    ];

    return BankGetBankInformation;

  })(AP.collection.ScopeCollection);


  /**
  BankOfferActiveBankOffersis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferActiveBankOffers
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankOfferActiveBankOffers = (function(_super) {
    __extends(BankOfferActiveBankOffers, _super);

    function BankOfferActiveBankOffers() {
      return BankOfferActiveBankOffers.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankOfferActiveBankOffers.collectionId = '21781';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankOfferActiveBankOffers.prototype.model = LoyaltyRtrSdk.models.BankOffer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankOfferActiveBankOffers.prototype.apiEndpoint = '/api/v3/bank_offers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankOfferActiveBankOffers.prototype.extraParams = {
      scope: 'active_bank_offers'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankOfferActiveBankOffers.prototype.queryFields = [];

    return BankOfferActiveBankOffers;

  })(AP.collection.ScopeCollection);


  /**
  BankOfferAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankOfferAll = (function(_super) {
    __extends(BankOfferAll, _super);

    function BankOfferAll() {
      return BankOfferAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankOfferAll.collectionId = '21592';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankOfferAll.prototype.model = LoyaltyRtrSdk.models.BankOffer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankOfferAll.prototype.apiEndpoint = '/api/v3/bank_offers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankOfferAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankOfferAll.prototype.queryFields = [];

    return BankOfferAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  BankOfferCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankOfferCount = (function(_super) {
    __extends(BankOfferCount, _super);

    function BankOfferCount() {
      return BankOfferCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankOfferCount.collectionId = '21594';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankOfferCount.prototype.model = LoyaltyRtrSdk.models.BankOffer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankOfferCount.prototype.apiEndpoint = '/api/v3/bank_offers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankOfferCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankOfferCount.prototype.queryFields = [];

    return BankOfferCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  BankOfferCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankOfferCountExactMatch = (function(_super) {
    __extends(BankOfferCountExactMatch, _super);

    function BankOfferCountExactMatch() {
      return BankOfferCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankOfferCountExactMatch.collectionId = '21595';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankOfferCountExactMatch.prototype.model = LoyaltyRtrSdk.models.BankOffer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankOfferCountExactMatch.prototype.apiEndpoint = '/api/v3/bank_offers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankOfferCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankOfferCountExactMatch.prototype.queryFields = [];

    return BankOfferCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  BankOfferExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankOfferExactMatch = (function(_super) {
    __extends(BankOfferExactMatch, _super);

    function BankOfferExactMatch() {
      return BankOfferExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankOfferExactMatch.collectionId = '21593';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankOfferExactMatch.prototype.model = LoyaltyRtrSdk.models.BankOffer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankOfferExactMatch.prototype.apiEndpoint = '/api/v3/bank_offers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankOfferExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankOfferExactMatch.prototype.queryFields = [];

    return BankOfferExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  BankRanacAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankRanacAll = (function(_super) {
    __extends(BankRanacAll, _super);

    function BankRanacAll() {
      return BankRanacAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankRanacAll.collectionId = '21846';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankRanacAll.prototype.model = LoyaltyRtrSdk.models.BankRanac;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankRanacAll.prototype.apiEndpoint = '/api/v3/bank_ranacs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankRanacAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankRanacAll.prototype.queryFields = [];

    return BankRanacAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  BankRanacCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankRanacCount = (function(_super) {
    __extends(BankRanacCount, _super);

    function BankRanacCount() {
      return BankRanacCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankRanacCount.collectionId = '21848';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankRanacCount.prototype.model = LoyaltyRtrSdk.models.BankRanac;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankRanacCount.prototype.apiEndpoint = '/api/v3/bank_ranacs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankRanacCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankRanacCount.prototype.queryFields = [];

    return BankRanacCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  BankRanacCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.BankRanacCountExactMatch = (function(_super) {
    __extends(BankRanacCountExactMatch, _super);

    function BankRanacCountExactMatch() {
      return BankRanacCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankRanacCountExactMatch.collectionId = '21849';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankRanacCountExactMatch.prototype.model = LoyaltyRtrSdk.models.BankRanac;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankRanacCountExactMatch.prototype.apiEndpoint = '/api/v3/bank_ranacs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankRanacCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankRanacCountExactMatch.prototype.queryFields = [];

    return BankRanacCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  BankRanacExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankRanacExactMatch = (function(_super) {
    __extends(BankRanacExactMatch, _super);

    function BankRanacExactMatch() {
      return BankRanacExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankRanacExactMatch.collectionId = '21847';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankRanacExactMatch.prototype.model = LoyaltyRtrSdk.models.BankRanac;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankRanacExactMatch.prototype.apiEndpoint = '/api/v3/bank_ranacs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankRanacExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankRanacExactMatch.prototype.queryFields = [];

    return BankRanacExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  BankShowParticipatingBankNamesis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankShowParticipatingBankNames
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.BankShowParticipatingBankNames = (function(_super) {
    __extends(BankShowParticipatingBankNames, _super);

    function BankShowParticipatingBankNames() {
      return BankShowParticipatingBankNames.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    BankShowParticipatingBankNames.collectionId = '21851';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    BankShowParticipatingBankNames.prototype.model = LoyaltyRtrSdk.models.Bank;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    BankShowParticipatingBankNames.prototype.apiEndpoint = '/api/v3/banks.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    BankShowParticipatingBankNames.prototype.extraParams = {
      scope: 'show_participating_bank_names'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    BankShowParticipatingBankNames.prototype.queryFields = [
      {
        fieldName: 'is_active',
        paramName: 'is_active'
      }
    ];

    return BankShowParticipatingBankNames;

  })(AP.collection.ScopeCollection);


  /**
  ColorSwatchAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ColorSwatchAll = (function(_super) {
    __extends(ColorSwatchAll, _super);

    function ColorSwatchAll() {
      return ColorSwatchAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ColorSwatchAll.collectionId = '21637';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ColorSwatchAll.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ColorSwatchAll.prototype.apiEndpoint = '/api/v3/color_swatches.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ColorSwatchAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ColorSwatchAll.prototype.queryFields = [];

    return ColorSwatchAll;

  })(AP.collection.ScopeCollection);


  /**
  ColorSwatchByProgramLevelIdis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchByProgramLevelId
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ColorSwatchByProgramLevelId = (function(_super) {
    __extends(ColorSwatchByProgramLevelId, _super);

    function ColorSwatchByProgramLevelId() {
      return ColorSwatchByProgramLevelId.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ColorSwatchByProgramLevelId.collectionId = '22010';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ColorSwatchByProgramLevelId.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ColorSwatchByProgramLevelId.prototype.apiEndpoint = '/api/v3/color_swatches.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ColorSwatchByProgramLevelId.prototype.extraParams = {
      scope: 'by_program_level_id'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ColorSwatchByProgramLevelId.prototype.queryFields = [
      {
        fieldName: 'id',
        paramName: 'id'
      }
    ];

    return ColorSwatchByProgramLevelId;

  })(AP.collection.ScopeCollection);

  null;


  /**
  ColorSwatchCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.ColorSwatchCount = (function(_super) {
    __extends(ColorSwatchCount, _super);

    function ColorSwatchCount() {
      return ColorSwatchCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ColorSwatchCount.collectionId = '21639';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ColorSwatchCount.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ColorSwatchCount.prototype.apiEndpoint = '/api/v3/color_swatches.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ColorSwatchCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ColorSwatchCount.prototype.queryFields = [];

    return ColorSwatchCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  ColorSwatchCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.ColorSwatchCountExactMatch = (function(_super) {
    __extends(ColorSwatchCountExactMatch, _super);

    function ColorSwatchCountExactMatch() {
      return ColorSwatchCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ColorSwatchCountExactMatch.collectionId = '21640';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ColorSwatchCountExactMatch.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ColorSwatchCountExactMatch.prototype.apiEndpoint = '/api/v3/color_swatches.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ColorSwatchCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ColorSwatchCountExactMatch.prototype.queryFields = [];

    return ColorSwatchCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  ColorSwatchExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ColorSwatchExactMatch = (function(_super) {
    __extends(ColorSwatchExactMatch, _super);

    function ColorSwatchExactMatch() {
      return ColorSwatchExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ColorSwatchExactMatch.collectionId = '21638';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ColorSwatchExactMatch.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ColorSwatchExactMatch.prototype.apiEndpoint = '/api/v3/color_swatches.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ColorSwatchExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ColorSwatchExactMatch.prototype.queryFields = [];

    return ColorSwatchExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  LanguageCodeAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LanguageCodeAll = (function(_super) {
    __extends(LanguageCodeAll, _super);

    function LanguageCodeAll() {
      return LanguageCodeAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageCodeAll.collectionId = '21852';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageCodeAll.prototype.model = LoyaltyRtrSdk.models.LanguageCode;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageCodeAll.prototype.apiEndpoint = '/api/v3/language_codes.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageCodeAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageCodeAll.prototype.queryFields = [];

    return LanguageCodeAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  LanguageCodeCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.LanguageCodeCount = (function(_super) {
    __extends(LanguageCodeCount, _super);

    function LanguageCodeCount() {
      return LanguageCodeCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageCodeCount.collectionId = '21854';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageCodeCount.prototype.model = LoyaltyRtrSdk.models.LanguageCode;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageCodeCount.prototype.apiEndpoint = '/api/v3/language_codes.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageCodeCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageCodeCount.prototype.queryFields = [];

    return LanguageCodeCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  LanguageCodeCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.LanguageCodeCountExactMatch = (function(_super) {
    __extends(LanguageCodeCountExactMatch, _super);

    function LanguageCodeCountExactMatch() {
      return LanguageCodeCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageCodeCountExactMatch.collectionId = '21855';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageCodeCountExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageCode;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageCodeCountExactMatch.prototype.apiEndpoint = '/api/v3/language_codes.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageCodeCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageCodeCountExactMatch.prototype.queryFields = [];

    return LanguageCodeCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  LanguageCodeExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LanguageCodeExactMatch = (function(_super) {
    __extends(LanguageCodeExactMatch, _super);

    function LanguageCodeExactMatch() {
      return LanguageCodeExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageCodeExactMatch.collectionId = '21853';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageCodeExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageCode;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageCodeExactMatch.prototype.apiEndpoint = '/api/v3/language_codes.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageCodeExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageCodeExactMatch.prototype.queryFields = [];

    return LanguageCodeExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  LanguageStringAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LanguageStringAll = (function(_super) {
    __extends(LanguageStringAll, _super);

    function LanguageStringAll() {
      return LanguageStringAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageStringAll.collectionId = '21604';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageStringAll.prototype.model = LoyaltyRtrSdk.models.LanguageString;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageStringAll.prototype.apiEndpoint = '/api/v3/language_strings.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageStringAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageStringAll.prototype.queryFields = [];

    return LanguageStringAll;

  })(AP.collection.ScopeCollection);


  /**
  LanguageStringByProgramLevelIdis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringByProgramLevelId
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LanguageStringByProgramLevelId = (function(_super) {
    __extends(LanguageStringByProgramLevelId, _super);

    function LanguageStringByProgramLevelId() {
      return LanguageStringByProgramLevelId.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageStringByProgramLevelId.collectionId = '22011';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageStringByProgramLevelId.prototype.model = LoyaltyRtrSdk.models.LanguageString;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageStringByProgramLevelId.prototype.apiEndpoint = '/api/v3/language_strings.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageStringByProgramLevelId.prototype.extraParams = {
      scope: 'by_program_level_id'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageStringByProgramLevelId.prototype.queryFields = [
      {
        fieldName: 'id',
        paramName: 'id'
      }
    ];

    return LanguageStringByProgramLevelId;

  })(AP.collection.ScopeCollection);

  null;


  /**
  LanguageStringCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.LanguageStringCount = (function(_super) {
    __extends(LanguageStringCount, _super);

    function LanguageStringCount() {
      return LanguageStringCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageStringCount.collectionId = '21606';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageStringCount.prototype.model = LoyaltyRtrSdk.models.LanguageString;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageStringCount.prototype.apiEndpoint = '/api/v3/language_strings.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageStringCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageStringCount.prototype.queryFields = [];

    return LanguageStringCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  LanguageStringCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.LanguageStringCountExactMatch = (function(_super) {
    __extends(LanguageStringCountExactMatch, _super);

    function LanguageStringCountExactMatch() {
      return LanguageStringCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageStringCountExactMatch.collectionId = '21607';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageStringCountExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageString;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageStringCountExactMatch.prototype.apiEndpoint = '/api/v3/language_strings.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageStringCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageStringCountExactMatch.prototype.queryFields = [];

    return LanguageStringCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  LanguageStringExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LanguageStringExactMatch = (function(_super) {
    __extends(LanguageStringExactMatch, _super);

    function LanguageStringExactMatch() {
      return LanguageStringExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LanguageStringExactMatch.collectionId = '21605';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LanguageStringExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageString;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LanguageStringExactMatch.prototype.apiEndpoint = '/api/v3/language_strings.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LanguageStringExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LanguageStringExactMatch.prototype.queryFields = [];

    return LanguageStringExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  LocalUserStorageAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LocalUserStorageAll = (function(_super) {
    __extends(LocalUserStorageAll, _super);

    function LocalUserStorageAll() {
      return LocalUserStorageAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LocalUserStorageAll.collectionId = '21793';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LocalUserStorageAll.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LocalUserStorageAll.prototype.apiEndpoint = '/api/v3/local_user_storages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LocalUserStorageAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LocalUserStorageAll.prototype.queryFields = [];

    return LocalUserStorageAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  LocalUserStorageCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.LocalUserStorageCount = (function(_super) {
    __extends(LocalUserStorageCount, _super);

    function LocalUserStorageCount() {
      return LocalUserStorageCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LocalUserStorageCount.collectionId = '21795';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LocalUserStorageCount.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LocalUserStorageCount.prototype.apiEndpoint = '/api/v3/local_user_storages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LocalUserStorageCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LocalUserStorageCount.prototype.queryFields = [];

    return LocalUserStorageCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  LocalUserStorageCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.LocalUserStorageCountExactMatch = (function(_super) {
    __extends(LocalUserStorageCountExactMatch, _super);

    function LocalUserStorageCountExactMatch() {
      return LocalUserStorageCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LocalUserStorageCountExactMatch.collectionId = '21796';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LocalUserStorageCountExactMatch.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LocalUserStorageCountExactMatch.prototype.apiEndpoint = '/api/v3/local_user_storages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LocalUserStorageCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LocalUserStorageCountExactMatch.prototype.queryFields = [];

    return LocalUserStorageCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  LocalUserStorageExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.LocalUserStorageExactMatch = (function(_super) {
    __extends(LocalUserStorageExactMatch, _super);

    function LocalUserStorageExactMatch() {
      return LocalUserStorageExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    LocalUserStorageExactMatch.collectionId = '21794';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    LocalUserStorageExactMatch.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    LocalUserStorageExactMatch.prototype.apiEndpoint = '/api/v3/local_user_storages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    LocalUserStorageExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    LocalUserStorageExactMatch.prototype.queryFields = [];

    return LocalUserStorageExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  MessageAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.MessageAll = (function(_super) {
    __extends(MessageAll, _super);

    function MessageAll() {
      return MessageAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    MessageAll.collectionId = '21789';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    MessageAll.prototype.model = LoyaltyRtrSdk.models.Message;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    MessageAll.prototype.apiEndpoint = '/api/v3/messages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    MessageAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    MessageAll.prototype.queryFields = [];

    return MessageAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  MessageCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.MessageCount = (function(_super) {
    __extends(MessageCount, _super);

    function MessageCount() {
      return MessageCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    MessageCount.collectionId = '21791';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    MessageCount.prototype.model = LoyaltyRtrSdk.models.Message;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    MessageCount.prototype.apiEndpoint = '/api/v3/messages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    MessageCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    MessageCount.prototype.queryFields = [];

    return MessageCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  MessageCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.MessageCountExactMatch = (function(_super) {
    __extends(MessageCountExactMatch, _super);

    function MessageCountExactMatch() {
      return MessageCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    MessageCountExactMatch.collectionId = '21792';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    MessageCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Message;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    MessageCountExactMatch.prototype.apiEndpoint = '/api/v3/messages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    MessageCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    MessageCountExactMatch.prototype.queryFields = [];

    return MessageCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  MessageExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.MessageExactMatch = (function(_super) {
    __extends(MessageExactMatch, _super);

    function MessageExactMatch() {
      return MessageExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    MessageExactMatch.collectionId = '21790';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    MessageExactMatch.prototype.model = LoyaltyRtrSdk.models.Message;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    MessageExactMatch.prototype.apiEndpoint = '/api/v3/messages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    MessageExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    MessageExactMatch.prototype.queryFields = [];

    return MessageExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  MessageGetMyMessagesis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageGetMyMessages
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.MessageGetMyMessages = (function(_super) {
    __extends(MessageGetMyMessages, _super);

    function MessageGetMyMessages() {
      return MessageGetMyMessages.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    MessageGetMyMessages.collectionId = '21845';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    MessageGetMyMessages.prototype.model = LoyaltyRtrSdk.models.Message;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    MessageGetMyMessages.prototype.apiEndpoint = '/api/v3/messages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    MessageGetMyMessages.prototype.extraParams = {
      scope: 'get_my_messages'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    MessageGetMyMessages.prototype.queryFields = [
      {
        fieldName: 'ranac',
        paramName: 'ranac'
      }
    ];

    return MessageGetMyMessages;

  })(AP.collection.ScopeCollection);


  /**
  MessageReadMyMessagesis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageReadMyMessages
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.MessageReadMyMessages = (function(_super) {
    __extends(MessageReadMyMessages, _super);

    function MessageReadMyMessages() {
      return MessageReadMyMessages.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    MessageReadMyMessages.collectionId = '22197';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    MessageReadMyMessages.prototype.model = LoyaltyRtrSdk.models.Message;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    MessageReadMyMessages.prototype.apiEndpoint = '/api/v3/messages.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    MessageReadMyMessages.prototype.extraParams = {
      scope: 'read_my_messages'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    MessageReadMyMessages.prototype.queryFields = [];

    return MessageReadMyMessages;

  })(AP.collection.ScopeCollection);


  /**
  RtrAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.RtrAll = (function(_super) {
    __extends(RtrAll, _super);

    function RtrAll() {
      return RtrAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    RtrAll.collectionId = '21596';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    RtrAll.prototype.model = LoyaltyRtrSdk.models.Rtr;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    RtrAll.prototype.apiEndpoint = '/api/v3/rtrs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    RtrAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    RtrAll.prototype.queryFields = [];

    return RtrAll;

  })(AP.collection.ScopeCollection);


  /**
  RtrByRanacis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrByRanac
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.RtrByRanac = (function(_super) {
    __extends(RtrByRanac, _super);

    function RtrByRanac() {
      return RtrByRanac.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    RtrByRanac.collectionId = '21779';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    RtrByRanac.prototype.model = LoyaltyRtrSdk.models.Rtr;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    RtrByRanac.prototype.apiEndpoint = '/api/v3/rtrs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    RtrByRanac.prototype.extraParams = {
      scope: 'by_ranac'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    RtrByRanac.prototype.queryFields = [
      {
        fieldName: 'ranac',
        paramName: 'ranac'
      }
    ];

    return RtrByRanac;

  })(AP.collection.ScopeCollection);

  null;


  /**
  RtrCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.RtrCount = (function(_super) {
    __extends(RtrCount, _super);

    function RtrCount() {
      return RtrCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    RtrCount.collectionId = '21598';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    RtrCount.prototype.model = LoyaltyRtrSdk.models.Rtr;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    RtrCount.prototype.apiEndpoint = '/api/v3/rtrs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    RtrCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    RtrCount.prototype.queryFields = [];

    return RtrCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  RtrCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.RtrCountExactMatch = (function(_super) {
    __extends(RtrCountExactMatch, _super);

    function RtrCountExactMatch() {
      return RtrCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    RtrCountExactMatch.collectionId = '21599';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    RtrCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Rtr;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    RtrCountExactMatch.prototype.apiEndpoint = '/api/v3/rtrs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    RtrCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    RtrCountExactMatch.prototype.queryFields = [];

    return RtrCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  RtrExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.RtrExactMatch = (function(_super) {
    __extends(RtrExactMatch, _super);

    function RtrExactMatch() {
      return RtrExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    RtrExactMatch.collectionId = '21597';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    RtrExactMatch.prototype.model = LoyaltyRtrSdk.models.Rtr;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    RtrExactMatch.prototype.apiEndpoint = '/api/v3/rtrs.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    RtrExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    RtrExactMatch.prototype.queryFields = [];

    return RtrExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  UserAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.UserAll = (function(_super) {
    __extends(UserAll, _super);

    function UserAll() {
      return UserAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    UserAll.collectionId = '21608';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    UserAll.prototype.model = LoyaltyRtrSdk.models.User;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    UserAll.prototype.apiEndpoint = '/api/v3/users.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    UserAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    UserAll.prototype.queryFields = [];

    return UserAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  UserCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.UserCount = (function(_super) {
    __extends(UserCount, _super);

    function UserCount() {
      return UserCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    UserCount.collectionId = '21610';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    UserCount.prototype.model = LoyaltyRtrSdk.models.User;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    UserCount.prototype.apiEndpoint = '/api/v3/users.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    UserCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    UserCount.prototype.queryFields = [];

    return UserCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  UserCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.UserCountExactMatch = (function(_super) {
    __extends(UserCountExactMatch, _super);

    function UserCountExactMatch() {
      return UserCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    UserCountExactMatch.collectionId = '21611';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    UserCountExactMatch.prototype.model = LoyaltyRtrSdk.models.User;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    UserCountExactMatch.prototype.apiEndpoint = '/api/v3/users.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    UserCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    UserCountExactMatch.prototype.queryFields = [];

    return UserCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  UserExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.UserExactMatch = (function(_super) {
    __extends(UserExactMatch, _super);

    function UserExactMatch() {
      return UserExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    UserExactMatch.collectionId = '21609';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    UserExactMatch.prototype.model = LoyaltyRtrSdk.models.User;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    UserExactMatch.prototype.apiEndpoint = '/api/v3/users.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    UserExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    UserExactMatch.prototype.queryFields = [];

    return UserExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  ValidateCustomerAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidateCustomerAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ValidateCustomerAll = (function(_super) {
    __extends(ValidateCustomerAll, _super);

    function ValidateCustomerAll() {
      return ValidateCustomerAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidateCustomerAll.collectionId = '22238';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidateCustomerAll.prototype.model = LoyaltyRtrSdk.models.ValidateCustomer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidateCustomerAll.prototype.apiEndpoint = '/api/v3/validate_customers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidateCustomerAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidateCustomerAll.prototype.queryFields = [];

    return ValidateCustomerAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  ValidateCustomerCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidateCustomerCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.ValidateCustomerCount = (function(_super) {
    __extends(ValidateCustomerCount, _super);

    function ValidateCustomerCount() {
      return ValidateCustomerCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidateCustomerCount.collectionId = '22240';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidateCustomerCount.prototype.model = LoyaltyRtrSdk.models.ValidateCustomer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidateCustomerCount.prototype.apiEndpoint = '/api/v3/validate_customers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidateCustomerCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidateCustomerCount.prototype.queryFields = [];

    return ValidateCustomerCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  ValidateCustomerCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidateCustomerCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.ValidateCustomerCountExactMatch = (function(_super) {
    __extends(ValidateCustomerCountExactMatch, _super);

    function ValidateCustomerCountExactMatch() {
      return ValidateCustomerCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidateCustomerCountExactMatch.collectionId = '22241';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidateCustomerCountExactMatch.prototype.model = LoyaltyRtrSdk.models.ValidateCustomer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidateCustomerCountExactMatch.prototype.apiEndpoint = '/api/v3/validate_customers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidateCustomerCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidateCustomerCountExactMatch.prototype.queryFields = [];

    return ValidateCustomerCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  ValidateCustomerExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidateCustomerExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ValidateCustomerExactMatch = (function(_super) {
    __extends(ValidateCustomerExactMatch, _super);

    function ValidateCustomerExactMatch() {
      return ValidateCustomerExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidateCustomerExactMatch.collectionId = '22239';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidateCustomerExactMatch.prototype.model = LoyaltyRtrSdk.models.ValidateCustomer;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidateCustomerExactMatch.prototype.apiEndpoint = '/api/v3/validate_customers.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidateCustomerExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidateCustomerExactMatch.prototype.queryFields = [];

    return ValidateCustomerExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  ValidationQuestionAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidationQuestionAll
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ValidationQuestionAll = (function(_super) {
    __extends(ValidationQuestionAll, _super);

    function ValidationQuestionAll() {
      return ValidationQuestionAll.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidationQuestionAll.collectionId = '21584';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidationQuestionAll.prototype.model = LoyaltyRtrSdk.models.ValidationQuestion;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidationQuestionAll.prototype.apiEndpoint = '/api/v3/validation_questions.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidationQuestionAll.prototype.extraParams = {
      scope: 'all'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidationQuestionAll.prototype.queryFields = [];

    return ValidationQuestionAll;

  })(AP.collection.ScopeCollection);

  null;


  /**
  ValidationQuestionCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidationQuestionCount
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.ValidationQuestionCount = (function(_super) {
    __extends(ValidationQuestionCount, _super);

    function ValidationQuestionCount() {
      return ValidationQuestionCount.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidationQuestionCount.collectionId = '21586';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidationQuestionCount.prototype.model = LoyaltyRtrSdk.models.ValidationQuestion;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidationQuestionCount.prototype.apiEndpoint = '/api/v3/validation_questions.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidationQuestionCount.prototype.extraParams = {
      scope: 'count'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidationQuestionCount.prototype.queryFields = [];

    return ValidationQuestionCount;

  })(AP.collection.AggregateCollection);

  null;


  /**
  ValidationQuestionCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidationQuestionCountExactMatch
  @extends AP.collection.AggregateCollection
   */

  LoyaltyRtrSdk.collections.ValidationQuestionCountExactMatch = (function(_super) {
    __extends(ValidationQuestionCountExactMatch, _super);

    function ValidationQuestionCountExactMatch() {
      return ValidationQuestionCountExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidationQuestionCountExactMatch.collectionId = '21587';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidationQuestionCountExactMatch.prototype.model = LoyaltyRtrSdk.models.ValidationQuestion;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidationQuestionCountExactMatch.prototype.apiEndpoint = '/api/v3/validation_questions.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidationQuestionCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidationQuestionCountExactMatch.prototype.queryFields = [];

    return ValidationQuestionCountExactMatch;

  })(AP.collection.AggregateCollection);


  /**
  ValidationQuestionExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidationQuestionExactMatch
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ValidationQuestionExactMatch = (function(_super) {
    __extends(ValidationQuestionExactMatch, _super);

    function ValidationQuestionExactMatch() {
      return ValidationQuestionExactMatch.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidationQuestionExactMatch.collectionId = '21585';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidationQuestionExactMatch.prototype.model = LoyaltyRtrSdk.models.ValidationQuestion;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidationQuestionExactMatch.prototype.apiEndpoint = '/api/v3/validation_questions.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidationQuestionExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidationQuestionExactMatch.prototype.queryFields = [];

    return ValidationQuestionExactMatch;

  })(AP.collection.ScopeCollection);


  /**
  ValidationQuestionGetQuestionsByBanis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ValidationQuestionGetQuestionsByBan
  @extends AP.collection.ScopeCollection
   */

  LoyaltyRtrSdk.collections.ValidationQuestionGetQuestionsByBan = (function(_super) {
    __extends(ValidationQuestionGetQuestionsByBan, _super);

    function ValidationQuestionGetQuestionsByBan() {
      return ValidationQuestionGetQuestionsByBan.__super__.constructor.apply(this, arguments);
    }


    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
     */

    ValidationQuestionGetQuestionsByBan.collectionId = '21778';


    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
     */

    ValidationQuestionGetQuestionsByBan.prototype.model = LoyaltyRtrSdk.models.ValidationQuestion;


    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
     */

    ValidationQuestionGetQuestionsByBan.prototype.apiEndpoint = '/api/v3/validation_questions.json';


    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
     */

    ValidationQuestionGetQuestionsByBan.prototype.extraParams = {
      scope: 'get_questions_by_ban'
    };


    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
     */

    ValidationQuestionGetQuestionsByBan.prototype.queryFields = [
      {
        fieldName: 'ban',
        paramName: 'ban'
      }
    ];

    return ValidationQuestionGetQuestionsByBan;

  })(AP.collection.ScopeCollection);

  LoyaltyRtrSdk.ExampleCustomClass = (function() {
    ExampleCustomClass.prototype.message = null;

    function ExampleCustomClass() {
      this.message = 'This is a custom class.';
    }

    ExampleCustomClass.prototype.getMessage = function() {
      return this.message;
    };

    return ExampleCustomClass;

  })();

}).call(this);

(function() {
  var AP,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP
  @singleton
  Provides the global namespace for SDK framework classes.  Provides convenience
  methods for app management.
   */

  AP = (function(_super) {
    __extends(AP, _super);

    function AP() {
      return AP.__super__.constructor.apply(this, arguments);
    }


    /**
    @static
    @property {Object} router
    Namespace for router classes.
     */

    AP.router = {};


    /**
    @static
    @property {Object} router
    Namespace for environment classes.
     */

    AP.environment = {
      component: {}
    };


    /**
    @static
    @property {Object} view
    Namespace for view classes.
     */

    AP.view = {
      component: {}
    };


    /**
    @static
    @property {Object} controller
    Namespace for controller classes.
     */

    AP.controller = {
      component: {}
    };


    /**
    @static
    @property {Object} profile
    Namespace for profile classes.
     */

    AP.profile = {
      component: {}
    };


    /**
    @static
    Returns a view class by name within this application and within the default
    AP views.
    @param {String} str the name of a view class
    @return {AP.view.View} a view class
     */

    AP.getView = function(str) {
      if (str) {
        return _.find(AP.view.component, function(val, key) {
          return key === str;
        }) || _.find(AP.view, function(val, key) {
          return key === str;
        }) || AP.getClass(str);
      }
    };


    /**
    @static
    Returns a value identified by a fully-qualified string name.  Uses
    `eval` internally.
    @param {String} qName the fully-qualified name of an object or class object
    @return an object or class object
     */

    AP.getClass = function(qName) {
      var e;
      try {
        return eval(qName);
      } catch (_error) {
        e = _error;
      }
    };


    /**
    Defers execution of a function for a number of milliseconds.
    @param {Number} ms milliseconds to wait
    @param {Function} fn function to execute
    @param {Object} scope optional scope with which to execute function
     */

    AP.defer = function(ms, fn, scope) {
      return setTimeout(((function(_this) {
        return function() {
          return fn.apply(scope);
        };
      })(this)), ms);
    };


    /**
    Returns a formatted date from a date string.
    @param {String} dateString a date string
    @return {String} formatted date string
     */

    AP.formatDate = function(dateString) {
      return new Date(dateString).toString('MMMM d, yyyy');
    };


    /**
    Returns a formatted time from a date string.
    @param {String} dateString a date string
    @return {String} formatted time string
     */

    AP.formatTime = function(dateString) {
      var hour, match, suffix;
      match = dateString != null ? dateString.match(/T(\d{2}):(\d{2})/) : void 0;
      if (((match != null ? match[1] : void 0) != null) && ((match != null ? match[2] : void 0) != null)) {
        hour = parseInt(match[1], 10);
        suffix = 'am';
        if (hour > 12) {
          hour = hour - 12;
          suffix = 'pm';
        }
        return "" + hour + ":" + match[2] + suffix;
      } else {
        return '';
      }
    };


    /**
    Returns a formatted date/time from a date string.
    @param {String} dateString a date string
    @return {String} formatted date/time string
     */

    AP.formatDateTime = function(dateString) {
      return "" + (this.formatDate(dateString)) + " at " + (this.formatTime(dateString));
    };

    return AP;

  })(window.AP);

  window.AP = AP;

}).call(this);

(function() {
  AP.profile.Profile = (function() {
    function Profile() {}

    Profile.name = function() {
      return null;
    };

    Profile.isActive = function() {
      return false;
    };

    Profile.toString = function() {
      return this.name;
    };

    Profile.is = function(profileName) {
      var _ref;
      return !!((_ref = AP.profile.component[profileName]) != null ? _ref.isActive() : void 0);
    };

    return Profile;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.profile.component.Phone
  @extends AP.profile.Profile
  @singleton
   */

  AP.profile.component.Phone = (function(_super) {
    __extends(Phone, _super);

    function Phone() {
      return Phone.__super__.constructor.apply(this, arguments);
    }

    Phone.isActive = function() {
      var ua;
      ua = navigator.userAgent;
      return !!ua.match(/(iPhone|iPod)/) || !!ua.match(/Android/);
    };

    return Phone;

  })(AP.profile.Profile);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.router.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '': 'root',
      'home': 'root',
      'login': 'loginPage',
      'logout': 'signOut',
      'programs': 'programs',
      'program/new': 'newProgram',
      'program/edit/:program_id/:record_id': 'editProgram',
      'program-settings/:program_id': 'programsettings',
      'program-offer/new/:program_id': 'newOffer',
      'program-offer/edit/:program_id/:record_id': 'editOffer',
      'language-settings/:id': 'languagesettings',
      'language-settings/edit/:program_id/:id': 'editlanguagesettings',
      'language-settings/new/:program_id': 'newlanguagesettings',
      'faq-settings/:program_id': 'faqsettings',
      'faq/new/:program_id': 'newFaq',
      'faq/edit/:program_id/:record_id': 'editFaq',
      'color-settings/:program_id': 'colorsettings',
      'color-settings/edit/:program_id/:record_id': 'editcolorsettings',
      'color-settings/new/:program_id': 'newcolorsettings',
      'messages': 'messages',
      'message/new': 'newmessage'
    };

    Router.prototype.root = function() {
      this.removeExisting('LoginPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.navigate('programs', {
          trigger: true
        });
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.loginPage = function() {
      this.removeExisting('LoginPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.navigate('home', {
          trigger: true
        });
      } else {
        return AP.Viewport.showItemByClass('LoginPage');
      }
    };

    Router.prototype.signOut = function() {
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.auth.Authentication.logout()({
          complete: function() {
            return this.navigate('login', {
              trigger: true
            });
          }
        });
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.newProgram = function(id) {
      this.removeExisting('ProgramForm');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('ProgramForm', {
          bankId: id
        });
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.programs = function() {
      this.removeExisting('ProgramPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('ProgramPage');
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.editProgram = function(program_id, record_id) {
      this.removeExisting('ProgramForm');
      return this.getProgram(record_id, (function(_this) {
        return function(record) {
          if (record) {
            return AP.Viewport.showItemByClass('ProgramForm', {
              record: record,
              programId: program_id,
              recordId: record_id
            });
          } else {
            return _this.navigate('programs', {
              trigger: true
            });
          }
        };
      })(this));
    };

    Router.prototype.getProgram = function(id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.BankExactMatch;
      return collection.query({
        id: id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.programsettings = function(program_id) {
      this.removeExisting('ProgramSettingsPage');
      return this.getProgramSettingsBank(program_id, (function(_this) {
        return function(record) {
          if (record) {
            return AP.Viewport.showItemByClass('ProgramSettingsPage', {
              record: record,
              programId: program_id
            });
          } else {
            return _this.navigate('programs', {
              trigger: true
            });
          }
        };
      })(this));
    };

    Router.prototype.getProgramSettingsBank = function(program_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.BankExactMatch;
      return collection.query({
        program_level_id: program_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.getProgramSettingsRtr = function(program_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.RtrExactMatch;
      return collection.query({
        program_level_id: program_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.newOffer = function(program_id) {
      this.removeExisting('ActiveOffersForm');
      return this.getProgramSettingsBank(program_id, (function(_this) {
        return function(record) {
          if (AP.auth.Authentication.isAuthenticated()) {
            if (record) {
              return AP.Viewport.showItemByClass('ActiveOffersForm', {
                record: record,
                programId: program_id
              });
            }
          } else {
            return _this.navigate('signout', {
              trigger: true
            });
          }
        };
      })(this));
    };

    Router.prototype.editOffer = function(program_id, record_id) {
      this.removeExisting('ActiveOffersForm');
      return this.getExistingOffer(record_id, (function(_this) {
        return function(record) {
          if (record) {
            return AP.Viewport.showItemByClass('ActiveOffersForm', {
              record: record,
              programId: program_id,
              recordId: record_id
            });
          } else {
            return _this.navigate('home', {
              trigger: true
            });
          }
        };
      })(this));
    };

    Router.prototype.getExistingOffer = function(id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.BankOfferExactMatch;
      return collection.query({
        id: id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.newlanguagesettings = function(program_id) {
      this.removeExisting('LanguageSettingsForm');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('LanguageSettingsForm', {
          programId: program_id
        });
      } else {
        return this.navigate('signout', {
          trigger: true
        });
      }
    };

    Router.prototype.languagesettings = function(program_id) {
      this.removeExisting('LanguageSettingsPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.getLanguageSettingsRecordByProgramID(program_id, (function(_this) {
          return function(record) {
            if (record) {
              return AP.Viewport.showItemByClass('LanguageSettingsPage', {
                programId: program_id,
                record: record
              });
            } else {
              return console.debug('no record exists');
            }
          };
        })(this));
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.editlanguagesettings = function(program_id, record_id) {
      this.removeExisting('LanguageSettingsForm');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.getLanguageSettingsRecordByRecordID(record_id, (function(_this) {
          return function(record) {
            if (record) {
              return AP.Viewport.showItemByClass('LanguageSettingsForm', {
                record: record,
                programId: program_id,
                recordId: record_id
              });
            } else {
              return _this.navigate('#color-settings/' + program_id, {
                trigger: true
              });
            }
          };
        })(this));
      } else {
        return this.navigate('logout', {
          trigger: true
        });
      }
    };

    Router.prototype.getLanguageSettingsRecordByProgramID = function(program_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.LanguageStringExactMatch;
      return collection.query({
        program_level_id: program_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.getLanguageSettingsRecordByRecordID = function(record_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.LanguageStringExactMatch;
      return collection.query({
        id: record_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.newcolorsettings = function(program_id) {
      this.removeExisting('ColorSettingsForm');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('ColorSettingsForm', {
          programId: program_id
        });
      } else {
        return this.navigate('signout', {
          trigger: true
        });
      }
    };

    Router.prototype.colorsettings = function(program_id) {
      this.removeExisting('ColorSettingsPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.getColorSettingsRecordByProgramID(program_id, (function(_this) {
          return function(record) {
            if (record) {
              return AP.Viewport.showItemByClass('ColorSettingsPage', {
                programId: program_id,
                record: record
              });
            } else {
              return console.debug('no record exists');
            }
          };
        })(this));
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.editcolorsettings = function(program_id, record_id) {
      this.removeExisting('ColorSettingsPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.getColorSettingsRecordByRecordID(record_id, (function(_this) {
          return function(record) {
            if (record) {
              return AP.Viewport.showItemByClass('ColorSettingsForm', {
                record: record,
                programId: program_id,
                recordId: record_id
              });
            } else {
              return _this.navigate('#color-settings/' + program_id, {
                trigger: true
              });
            }
          };
        })(this));
      } else {
        return this.navigate('logout');
      }
    };

    Router.prototype.getColorSettingsRecordByProgramID = function(program_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.ColorSwatchExactMatch;
      return collection.query({
        program_level_id: program_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.getColorSettingsRecordByRecordID = function(record_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.ColorSwatchExactMatch;
      return collection.query({
        id: record_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.newFaq = function(program_id) {
      this.removeExisting('FaqForm');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('FaqForm', {
          programId: program_id
        });
      } else {
        return this.navigate('home', {
          trigger: true
        });
      }
    };

    Router.prototype.faqsettings = function(program_id) {
      this.removeExisting('FaqPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return this.getFaqRecordByProgramID(program_id, (function(_this) {
          return function(record) {
            if (record) {
              return AP.Viewport.showItemByClass('FaqPage', {
                programId: program_id,
                record: record
              });
            } else {
              return console.debug('no record exists');
            }
          };
        })(this));
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.editFaq = function(program_id, record_id) {
      this.removeExisting('FaqForm');
      return this.getFaq(record_id, (function(_this) {
        return function(record) {
          if (record) {
            return AP.Viewport.showItemByClass('FaqForm', {
              record: record,
              recordId: record_id,
              programId: program_id
            });
          } else {
            return _this.navigate('home', {
              trigger: true
            });
          }
        };
      })(this));
    };

    Router.prototype.getFaqRecordByProgramID = function(program_id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.BankFaqExactMatch;
      return collection.query({
        program_level_id: program_id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.getFaq = function(id, callback) {
      var collection;
      collection = new LoyaltyRtrSdk.collections.BankFaqExactMatch;
      return collection.query({
        id: id
      }, {
        complete: function() {
          return callback(collection.first());
        }
      });
    };

    Router.prototype.messages = function() {
      this.removeExisting('MessagesPage');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('MessagesPage');
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.newmessage = function() {
      this.removeExisting('MessagesForm');
      if (AP.auth.Authentication.isAuthenticated()) {
        return AP.Viewport.showItemByClass('MessagesForm');
      } else {
        return this.navigate('login', {
          trigger: true
        });
      }
    };

    Router.prototype.removeExisting = function(klass) {
      var existingPage;
      existingPage = AP.Viewport.getItemByClass(klass);
      if (existingPage) {
        return AP.Viewport.remove(existingPage);
      }
    };

    return Router;

  })(Backbone.Router);

}).call(this);

(function() {
  AP.environment.Environment = (function() {
    function Environment() {}

    Environment.title = function() {
      return null;
    };

    Environment.active = function() {
      return null;
    };

    Environment.activate = function(title) {
      var environments;
      if (_.isString(title)) {
        environments = _.map(AP.environment.component, function(value, key) {
          return value;
        });
        this.active = _.find(environments, function(env) {
          return env.title === title;
        });
      } else if (_.isObject(title && title(instanceOf(this)))) {
        this.active = title;
      }
      AP.baseUrl = this.active.baseUrl;
      AP.googleAnalyticsId = this.active.googleAnalyticsId;
      return this.active;
    };

    return Environment;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.environment.component.Dev = (function(_super) {
    __extends(Dev, _super);

    function Dev() {
      return Dev.__super__.constructor.apply(this, arguments);
    }

    Dev.title = 'dev';

    Dev.baseUrl = '';

    Dev.googleAnalyticsId = 'UA-44077611-4';

    return Dev;

  })(AP.environment.Environment);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.environment.component.Local = (function(_super) {
    __extends(Local, _super);

    function Local() {
      return Local.__super__.constructor.apply(this, arguments);
    }

    Local.title = 'local';

    Local.baseUrl = '';

    return Local;

  })(AP.environment.Environment);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.environment.component.LocalDev = (function(_super) {
    __extends(LocalDev, _super);

    function LocalDev() {
      return LocalDev.__super__.constructor.apply(this, arguments);
    }

    LocalDev.title = 'localdev';

    LocalDev.baseUrl = 'https://damp-depths-9632.herokuapp.com';

    return LocalDev;

  })(AP.environment.Environment);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.environment.component.Production = (function(_super) {
    __extends(Production, _super);

    function Production() {
      return Production.__super__.constructor.apply(this, arguments);
    }

    Production.title = 'production';

    Production.baseUrl = '';

    Production.googleAnalyticsId = 'UA-44077611-3';

    return Production;

  })(AP.environment.Environment);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.environment.component.Staging = (function(_super) {
    __extends(Staging, _super);

    function Staging() {
      return Staging.__super__.constructor.apply(this, arguments);
    }

    Staging.title = 'staging';

    Staging.baseUrl = '';

    Staging.googleAnalyticsId = 'UA-44077611-2';

    return Staging;

  })(AP.environment.Environment);

}).call(this);

(function() {
  null;


  /**
  @class AP.controller.Controller
  
  Base controller class.  Provides basic DOM event handling features.  Controllers
  are intended to handle user interaction with views or other functionality not
  already provided by views.
  
  Controllers are intended for instantiation, but only once.  Each controller
  class is instantiated by `AP.controller.component.Main` once and only once.
  Therefore, controllers should be stateless and view-agnostic, meaning that a
  controller instance must handle events for any view of appropriate type.  For
  example, `AP.controller.component.List` handles item selection events on any
  list at any time.
  
  See example below:
  
      class AP.controller.component.List extends AP.controller.Controller
        events: [
           * selector, event name, controller method
          ['.ap-list', 'select', 'onItemSelect']
        ]
  
        onItemSelect: (e, view, record) ->
           * do something
   */

  AP.controller.Controller = (function() {
    _.extend(Controller.prototype, Backbone.Events);


    /**
    @property {Array}
    Array of DOM event handler configurations.  For example:
    
        [
          ['.ap-list', 'select', 'onItemSelect']
        ]
     */

    Controller.prototype.events = null;

    function Controller() {
      this.initialize.apply(this, arguments);
    }


    /**
    Called on instantiation of a controller instance.  The default initializer
    attaches DOM event handlers specified in
     */

    Controller.prototype.initialize = function() {
      var eventSet, _i, _len, _ref, _results;
      this.events = this.events || [];
      _ref = this.events;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        eventSet = _ref[_i];
        _results.push(this.bindDomEvent(eventSet));
      }
      return _results;
    };


    /**
    Binds delegated event specified in `eventSet`.  Event sets are 
    @param {Array} eventSet event configuration array of three strings in the
    format:  `['selector', 'event name', 'method name']`.
     */

    Controller.prototype.bindDomEvent = function(eventSet) {
      return $('body').delegate(eventSet[0], eventSet[1], (function(_this) {
        return function() {
          return _this[eventSet[2]].apply(_this, arguments);
        };
      })(this));
    };

    return Controller;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.controller.component.Authentication
  @extends AP.controller.Controller
  
  Handles events related to authentication.  On any auth change event, the app
  is reloaded.  On authentication error, a message is shown to the user.
   */

  AP.controller.component.Authentication = (function(_super) {
    __extends(Authentication, _super);

    function Authentication() {
      return Authentication.__super__.constructor.apply(this, arguments);
    }

    Authentication.prototype.initialize = function() {
      Authentication.__super__.initialize.apply(this, arguments);
      this.listenTo(AP.auth.Authentication, 'auth:authenticated', this.onAuthChange);
      this.listenTo(AP.auth.Authentication, 'auth:deauthenticated', this.onAuthChange);
      return this.listenTo(AP.auth.Authentication, 'auth:error', this.onAuthError);
    };


    /**
    Reloads app on any auth change event.
     */

    Authentication.prototype.onAuthChange = function() {
      return window.location.reload();
    };


    /**
    Displays a message to the user when an authentication error occurs.
     */

    Authentication.prototype.onAuthError = function() {
      var page;
      page = AP.Viewport.add(new AP.view.Page({
        pageTitle: 'Login Error',
        backButton: true,
        items: [
          new AP.view.View({
            tagName: 'p',
            className: 'ap-text-center',
            content: 'Your login request was not accepted.  Please try again.'
          })
        ]
      }));
      return page.show();
    };

    return Authentication;

  })(AP.controller.Controller);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.controller.component.Main = (function(_super) {
    __extends(Main, _super);

    function Main() {
      return Main.__super__.constructor.apply(this, arguments);
    }

    Main.prototype.initialize = function() {
      Main.__super__.initialize.apply(this, arguments);
      this.initializeSettings();
      new AP.controller.component.Authentication;
      AP.Viewport = new AP.view.Viewport();
      AP.router = new AP.router.Router;
      return Backbone.history.start();
    };


    /**
    Configures UnderscoreJS templating to use `{{x}}` django-style template tags.
     */

    Main.prototype.initializeSettings = function() {
      return _.templateSettings = _.extend({}, _.templateSettings, {
        escape: /\{%-([\s\S]+?)%\}/g,
        evaluate: /\{%([\s\S]+?)%\}/g,
        interpolate: /\{\{(.+?)\}\}/g
      });
    };

    return Main;

  })(AP.controller.Controller);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.View
  @extends Backbone.View
  
  Base view class provides all of the standard methods and functionality in the
  [BackboneJS View class](http://backbonejs.org/#View), as well as many additional
  conveniences.  The base view may be subclassed or instantiated directly.
   */

  AP.view.View = (function(_super) {
    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }


    /**
    @property {String}
    Class or classes added to this view's DOM element.
     */

    View.prototype.className = 'ap-view';


    /**
    @property {String}
    An UnderscoreJS template string.  For example, `{{ variable }}`.  Learn more
    about [UnderscoreJS templates](http://underscorejs.org/#template).
    
    **Note**:  template syntax resembles Mustache and Django, differing from the
    default ERB-style template syntax used in UnderscoreJS.
    
    - `{{ interpolation }}`
    - `{%- escape %}`
    - `{% evaluate %}`
     */

    View.prototype.template = null;


    /**
    @property {Array}
    An optional array of view instances, or the names of view classes, that are
    children of this view.
     */

    View.prototype.items = null;


    /**
    @property {AP.view.View}
    A reference to the parent view instance that contains this view as an item.
    `parent` is automatically set on initialization and when adding or removing
    and item.
     */

    View.prototype.parent = null;


    /**
    @property {AP.model.Model}
    An optional model instance containing data used to render this
    view's template.
     */

    View.prototype.record = null;


    /**
    @property {Object}
    An optional hash of arbitrary data used to render this view's template.
     */

    View.prototype.data = null;


    /**
    @property {Boolean/undefined} removed
    Is this view instance removed from the view hierarchy?  Should be undefined if
    view instance is not removed.
     */


    /**
    @property {Array}
    An optional array of authorization rules controlling this view's visibility.
    See {@link AP.auth.Authorization} for more information.
     */

    View.prototype.rules = null;


    /**
    @property {Object}
    Object of event and selectors/event handler method names, in the [format
    required by BackboneJS](http://backbonejs.org/#View).
     */

    View.prototype.events = {};


    /**
    @property {String} sizesVisible
    Bootstrap size names on which and only on which this view is visible.
    Allowable values are: `xs`, `sm`, `md` and `lg`.
    See "responsive classes":
    {@link http://getbootstrap.com/css/#responsive-utilities}.
    
    For example:
    
        sizesVisible: 'sm'  # view becomes visible only on small-sized displays
     */

    View.prototype.sizesVisible = [];


    /**
    @property {Array} sizesHidden
    Array of Bootstrap size names on which this view is hidden.  Allowable
    values are: `xs`, `sm`, `md` and `lg`.
    See "responsive classes":
    {@link http://getbootstrap.com/css/#responsive-utilities}.
    
    For example:
    
        sizesHidden: ['xs', 'sm'] # view is visible only on medium-sized displays and up
     */

    View.prototype.sizesHidden = [];


    /**
    @private
    The newest version of underscore changes the meaning of "bindAll", so this is
    provided for compatibility.
     */

    View.prototype.bindAll = function(obj) {
      var funcs;
      funcs = Array.prototype.slice.call(arguments, 1);
      if (funcs.length === 0) {
        funcs = _.functions(obj);
      }
      _.each(funcs, function(f) {
        return obj[f] = _.bind(obj[f], obj);
      });
      return obj;
    };


    /**
    Binds DOM events, assigns any items passed through `options`, and renders
    the element.
    @param {Object} defaults optional configuration object
    @param {Object} defaults.events optional hash of events and event handler
    method names
    @param {Array} defaults.items optional array of view instances or view class
    names to initialize as children of this view
    @param {Array} defaults.rules optional array of authorization rules
     */

    View.prototype.initialize = function(defaults) {
      var key, value, _ref, _ref1, _ref2, _ref3, _ref4;
      this.defaults = defaults != null ? defaults : {};
      View.__super__.initialize.apply(this, arguments);
      this.events = _.extend({}, (_ref = this.constructor.__super__) != null ? _ref.events : void 0, (_ref1 = this.constructor.__super__) != null ? (_ref2 = _ref1.constructor) != null ? (_ref3 = _ref2.__super__) != null ? _ref3.events : void 0 : void 0 : void 0, this.events, this.defaults.events);
      this.bindAll(this);
      _ref4 = this.defaults;
      for (key in _ref4) {
        value = _ref4[key];
        this[key] = value;
      }
      this.items = this.defaults.items || this.items || [];
      this.rules = this.defaults.rules || this.rules || [];
      this.initializeItems();
      this.render();
      if (this.getRecord()) {
        this.listenTo(this.getRecord(), 'change', this.render);
      }
      this.listenTo(AP.auth.Authentication, 'auth:authenticated', this.doAuthVisibility);
      return this.listenTo(AP.auth.Authentication, 'auth:deauthenticated', this.doAuthVisibility);
    };


    /**
    Instantiates views that were passed as strings, since items may be view
    instances or fully-qualified names of view classes.  Called only once on
    initialization.
     */

    View.prototype.initializeItems = function() {
      var instance, item, newItems, _i, _len, _ref;
      newItems = [];
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        instance = this.initializeItem(item);
        newItems.push(instance);
      }
      return this.items = newItems;
    };


    /**
    Attemps to instantiate an item, if not already instantiated.  `item` may be
    a view class, a view name, or a view configuration object.
    @return {Object} instantiated view item
     */

    View.prototype.initializeItem = function(item, options) {
      var app, view;
      if (_.isObject(item) && item instanceof AP.view.View) {
        item.parent = this;
        return item;
      } else {
        app = AP.getActiveApp();
        if (_.isString(item) || _.isFunction(item)) {
          view = item;
          options = _.extend({
            parent: this
          }, options);
        } else if (_.isObject(item) && (item.name != null) && !(item instanceof AP.view.View)) {
          view = item.name;
          options = _.extend({
            parent: this
          }, item, options);
        }
        return new (app.getView(view))(options);
      }
    };


    /**
    @return {Object} an object with one item `user`, a hash of auth session data
     */

    View.prototype.getAuthData = function() {
      return {
        user: AP.auth.Authentication.getAuthSessionData() || {}
      };
    };


    /**
    @return {Function} compiles the {@link #template} string and returns a
    template function
     */

    View.prototype.getTemplate = function() {
      if (this.template) {
        return _.template(this.template || '');
      }
    };


    /**
    @return {Object} munged object data of all attributes of ancestor views,
    beginning with the parent backwards, and this view.  If this view or an
    ancestor contains a `record` attribute, this object is guaranteed to
    contain it.
     */

    View.prototype.getObjectData = function() {
      var _ref;
      return _.extend({}, (_ref = this.parent) != null ? _ref.getObjectData() : void 0, this, {
        record: this.getRecord()
      });
    };


    /**
    @return {Object} munged JSON object data of all attributes of ancestor views'
    `record` and this view's `record`.
     */

    View.prototype.getRecordData = function() {
      var _ref, _ref1;
      return _.extend({}, (_ref = this.parent) != null ? _ref.getRecordData() : void 0, (_ref1 = this.record) != null ? _ref1.toJSON() : void 0);
    };


    /**
    @return {Object} the nearest view's `attr` attribute, if any, beginning with
    this view backwards via parent.
     */

    View.prototype.getAttribute = function(attr) {
      var _ref;
      return this[attr] || ((_ref = this.parent) != null ? _ref.getAttribute(attr) : void 0);
    };


    /**
    @return {Object} the nearest view's `record` attribute, if any, beginning with
    this view backwards via parent.
     */

    View.prototype.getRecord = function() {
      return this.getAttribute('record');
    };


    /**
    @return {Object} munged object data used to render templates, in the following
    order of priority from highest to lowest:
    
    1. {@link #getRecordData}
    2. {@link #data}
    3. {@link #getAuthData}
    4. {@link #getObjectData}
     */

    View.prototype.getData = function() {
      return _.extend({}, this.getObjectData(), this.getAuthData(), this.data, this.getRecordData());
    };


    /**
    Renders the view into the `el` property.  View instances in the
    `items` property are appended to this view's element immediately following. If
    authorization rules are specified on this view, they are applied after
    rendering.
     */

    View.prototype.render = function() {
      var item, size, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (this.hidden) {
        this.hide();
      }
      this.$el.data('view', this);
      _ref = this.sizesVisible;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        size = _ref[_i];
        this.$el.addClass("visible-" + size);
      }
      _ref1 = this.sizesHidden;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        size = _ref1[_j];
        this.$el.addClass("hidden-" + size);
      }
      if (this.extraClassName) {
        this.$el.addClass(this.extraClassName);
      }
      this.$el.html(this.toHtml());
      _ref2 = this.items;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        item = _ref2[_k];
        this.append(item.el);
      }
      this.doAuthVisibility();
      this.$el.trigger('render');
      return this;
    };


    /**
    @return {String} rendered {@link #template} using data {@link #getData}
     */

    View.prototype.toHtml = function() {
      var template;
      template = this.getTemplate();
      if (template && _.isFunction(template)) {
        return template(this.getData());
      } else if (template) {
        return template;
      } else {
        return '';
      }
    };


    /**
    Renders an attribute of this view instance or its parents as a template.
    Useful when the view template must render an attribute which itself may be
    a template string.
    @param {String} attr an attribute name in {@link #getObjectData} to compile
    and render as a template, using data {@link #getData}.
    @return {String} a rendered template string
     */

    View.prototype.renderAttr = function(attr) {
      var allData, objectData, tags, templateString;
      objectData = this.getObjectData();
      allData = this.getData();
      templateString = objectData[attr] || '';

      /*
      Parse the template string in the specified attribute `attr` for template tags
      that refer to relationships (generally any template tag containing a dot
      refers to a relationship:  e.g. `{{ user.name }}`).  If relationship tags are
      found, a temporary value is provided and the relationship is loaded.  Views
      must listen to a record's change event to be notified when the relationship
      is loaded.
      
      TODO:  there is probably a more efficient way of handling this... perhaps
      by precompiling templates for attributes?
       */
      tags = _.compact(templateString.match(_.templateSettings.interpolate)) || [];
      _.each(tags, function(tag) {
        var relationshipName, stripped, _ref;
        stripped = tag.replace(/{{\s?|\s?}}/g, '');
        if (stripped.indexOf('.') > 0) {
          relationshipName = _.first(stripped.split('.'));
          if (allData && relationshipName && !allData[relationshipName]) {
            if ((_ref = allData.record) != null) {
              _ref.fetchRelated(relationshipName);
            }
            return allData[relationshipName] = {};
          }
        }
      });
      return _.template(templateString)(allData);
    };


    /**
    Shows view if it is not marked as hidden _and_ the current user is
    authorized to view it.  Hides view if it is marked as hidden _or_ the
    current user is _not authorized_ to view it.
     */

    View.prototype.doAuthVisibility = function() {
      if (!this.isRemoved()) {
        if (!this.hidden && this.isAuthorized()) {
          return this._show();
        } else {
          return this._hide();
        }
      }
    };


    /**
    @return {Boolean} `true` if this view instance is authorized, based on
    its `rules`
     */

    View.prototype.isAuthorized = function() {
      return AP.auth.Authorization.isAuthorized(this.rules);
    };


    /**
    @private
    Shows the view's element.
     */

    View.prototype._show = function() {
      return this.$el.show();
    };


    /**
    Shows the view's element (if authorized) and marks view as not hidden
     */

    View.prototype.show = function() {
      this.hidden = false;
      this._show();
      return this.doAuthVisibility();
    };


    /**
    @private
    Hides the view's element.
     */

    View.prototype._hide = function() {
      return this.$el.hide();
    };


    /**
    Hides the view's element (if authorized) and marks view as hidden
     */

    View.prototype.hide = function() {
      this.hidden = true;
      return this._hide();
    };


    /**
    Hides all child items.
     */

    View.prototype.hideAll = function() {
      var item, _i, _len, _ref, _results;
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(item.hide());
      }
      return _results;
    };


    /**
    @private
    Appends an element to this view's element.
    @param {Element} el the element to append to this view's element
     */

    View.prototype.append = function(el) {
      return this.$el.append(el);
    };


    /**
    Adds a view instance to the view's `items` and returns the added instance.
    @param {String/Object/AP.view.View} view a view name, a view configuration
    object, or a view instance to add to this view
    @return {AP.view.View/undefined} the added instance or `undefined` if the view
    was not added
     */

    View.prototype.add = function(view, options) {
      if (!_.contains(this.items, view)) {
        view = this.initializeItem(view, options);
        this.items.push(view);
        this.append(view.el);
        delete view.removed;
        this.doAuthVisibility();

        /**
        @event itemAdd
        @param {AP.view.View} this the view to which the item was added
        @param {AP.view.View} view the added view
         */
        this.trigger('itemAdd', this, view);

        /**
        @event add
        @param {AP.view.View} added the added view
        @param {AP.view.View} parent the parent of the added view
         */
        view.trigger('add', view, this);
        return view;
      }
    };


    /**
    Removes a view instance from the view's `items` and returns the instance.
    @param {AP.view.View} view a view instance to remove to this view
    @return {AP.view.View/undefined} the removed instance or `undefined` if the
    view was not removed
     */

    View.prototype.remove = function(view) {
      if (_.contains(this.items, view)) {
        this.items = _.without(this.items, view);
        view.$el.remove();
        view.parent = null;
        view.removed = true;

        /**
        @event itemRemove
        @param {AP.view.View} this the view from which the item was removed
        @param {AP.view.View} view the removed view
         */
        this.trigger('itemRemove', this, view);

        /**
        @event remove
        @param {AP.view.View} removed the removed view
        @param {AP.view.View} parent the parent of the removed view
         */
        view.trigger('remove', view, this);
        return view;
      }
    };


    /**
    @return {Boolean} `true` if this view instance or any ancestor is removed.
     */

    View.prototype.isRemoved = function() {
      var data;
      data = this.getObjectData();
      return !!data.removed;
    };


    /**
    Returns a view in `items that is an instance of `c` view class.
    @param {AP.view.View} c a view class or fully-qualified name of a view class
    @return {AP.view.View} an instance of a view class
     */

    View.prototype.getItemByClass = function(c) {
      if (_.isString(c)) {
        c = AP.getView(c);
        return c && _.find(this.items, function(item) {
          return item instanceof c;
        });
      } else {
        console.debug('the else statement is being used');
        return _.find(this.items, function(item) {
          return (item === c) || (_.isFunction(c) && (item instanceof c));
        });
      }
    };


    /**
    Finds and shows an item in view of class `c`.  Instantiates a new view
    if no such item is found.  Useful when only one page of a type should be
    instantiated at a time or when a view class lookup is cumbersome.
    @param {AP.view.View} c a view class or fully-qualified name of a view class
    @param {Object} options optional configuration object passed if new instance
    is created
    @return {AP.view.View} an instance of the found or created view class
     */

    View.prototype.showItemByClass = function(c, options) {
      var view;
      view = c instanceof AP.view.View ? c : this.getItemByClass(c) || c;
      view = this.add(view, options) || view;
      if (view != null) {
        view.show();
      }
      return view;
    };

    return View;

  })(Backbone.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.Page
   */

  AP.view.Page = (function(_super) {
    __extends(Page, _super);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.className = 'ap-page';

    Page.prototype.title = 'Page';

    Page.prototype.backButton = false;

    Page.prototype.backButtonText = 'Back';

    Page.prototype.backButtonHref = '#';

    Page.prototype.previousPage = '';

    Page.prototype.template = '<!-- navigation -->\n<div class="ap-nav navbar">\n  <div class="navbar-inner">\n    <!-- nav list -->\n      <ul class="nav">\n          <li>\n            <div id="brandingPanel" class="col-xs-6 col-sm-3"><a href="#home">MasterCard Real Time Rewards</a></div>\n            <div class="col-xs-12 col-sm-9">\n              <h1>MasterCard Real Time Rewards</h1>\n              <h2 class="sub-header">Application Manager</h2>\n            </div>\n          </li>\n      </ul>\n      <div class="mcHeader">\n        <div class="container">\n          <div class="col-sm-12">\n            <ul class="nav nav-pills">\n              <li><a href="#programs">Programs</a></li>\n              <li><a href="#messages">Messaging</a></li>\n              <li class="pull-right"><a href="#logout">sign-out</a></li>\n            </ul>\n          </div>\n         \n        </div>\n    </div>\n  </div>\n</div>\n\n<!-- container -->\n<div class="container"></div>\n<!-- footer -->\n<div class="footer"></div>';

    Page.prototype.events = {
      'click .ap-back': 'onBackAction'
    };

    Page.prototype.initialize = function() {
      if (!this.previousPage) {
        this.previousPage = AP.Viewport.getCurrentItem();
      }
      return Page.__super__.initialize.apply(this, arguments);
    };

    Page.prototype.onBackAction = function(e) {
      e.preventDefault();
      return this.goBack();
    };

    Page.prototype.getTitle = function() {
      var template;
      if (this.title) {
        template = _.template(this.title || '');
      }
      if (template && _.isFunction(template)) {
        return template(this.getData());
      } else if (template) {
        return template;
      } else {
        return '';
      }
    };

    Page.prototype.render = function() {
      this.renderedTitle = this.getTitle();
      Page.__super__.render.apply(this, arguments);
      this.$el.addClass('ap-page');
      return this;
    };


    /**
    Appends the element to this view's inner container element.
    @param {Element} el the element to append to this view's inner container
     */

    Page.prototype.append = function(el) {
      return this.$el.find('> .container:last').append(el);
    };


    /**
    Hides all items in viewport, then shows this page's element.
     */

    Page.prototype.show = function() {
      AP.Viewport.hideAll();
      AP.Viewport.setCurrentItem(this);
      if (this.renderedTitle) {
        $('title').text("" + this.renderedTitle);
      }
      return Page.__super__.show.apply(this, arguments);
    };


    /**
    Shows the view of class name `previousPage` in the viewport and destroys this
    view after a short delay.
     */

    Page.prototype.goBack = function() {
      if (this.previousPage) {
        if (_.isString(this.previousPage)) {
          AP.Viewport.showItemByClass(AP.view[this.previousPage]);
        } else if (this.previousPage instanceof AP.view.Page) {
          this.previousPage.show();
        }
        return AP.Viewport.remove(this);
      }
    };

    return Page;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.NavPage = (function(_super) {
    __extends(NavPage, _super);

    function NavPage() {
      return NavPage.__super__.constructor.apply(this, arguments);
    }

    NavPage.prototype.className = 'ap-navpage';

    NavPage.prototype.events = {
      'click .ap-nav a': 'onNavAction'
    };

    NavPage.prototype.active = 'Home';

    NavPage.prototype.navItems = [
      {
        name: 'Home'
      }, {
        name: 'Test'
      }
    ];

    NavPage.prototype.template = '<!-- navigation -->\n<div class="ap-nav navbar navbar-default">\n  <div class="navbar-header">\n    <!-- nav toggle -->\n    <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse" type="button">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    <!-- brand -->\n    <div class="navbar-brand">BootstrapApp</div>\n  </div>\n  <!-- nav list -->\n  <div class="collapse navbar-collapse">\n    <ul class="nav navbar-nav">\n      {% _.each(navItems, function (item) { %}\n        <li data-name="{%- item.name %}"{% if (active == item.name) { %} class="active"{% } %}>\n          <a href="#">{%- item.name %}</a>\n        </li>\n      {% }); %}\n    </ul>\n  </div>\n</div>\n\n<!-- main page -->\n<div class="container"></div>';

    NavPage.prototype.onNavAction = function(e) {
      var text;
      e.preventDefault();
      text = $(e.currentTarget).text();
      return this.$el.trigger('navigate', text);
    };

    NavPage.prototype.doAuthVisibility = function() {
      var item, itemEl, _i, _len, _ref, _results;
      NavPage.__super__.doAuthVisibility.apply(this, arguments);
      _ref = this.navItems;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        itemEl = this.$el.find("li[data-name=\"" + item.name + "\"]");
        if (AP.auth.Authorization.isAuthorized(item.rules)) {
          _results.push(itemEl.show());
        } else {
          _results.push(itemEl.hide());
        }
      }
      return _results;
    };

    return NavPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.Panel = (function(_super) {
    __extends(Panel, _super);

    function Panel() {
      return Panel.__super__.constructor.apply(this, arguments);
    }

    Panel.prototype.className = 'ap-panel panel';

    Panel.prototype.header = 'Panel';

    Panel.prototype.ui = 'default';

    Panel.prototype.collapsed = true;

    Panel.prototype.template = '<div class="panel-heading">\n  <h4 class="panel-title">\n    <a class="{% if (collapsed) { %}collapsed{% } %}" data-toggle="collapse" data-parent="#{{ parent.id }}" href="#{{ panelBodyId }}">\n      {{ header }}\n    </a>\n  </h4>\n</div>\n<div id="{{ panelBodyId }}" class="panel-collapse collapse{% if (!collapsed) { %} in{% } %}">\n  <div class="panel-body"></div>\n</div>';

    Panel.prototype.initialize = function() {
      this.panelBodyId = _.uniqueId('panel-body-');
      Panel.__super__.initialize.apply(this, arguments);
      return this.$el.addClass("panel-" + this.ui);
    };

    Panel.prototype.append = function(el) {
      return this.$el.find('.panel-body').append(el);
    };

    return Panel;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.PanelGroup = (function(_super) {
    __extends(PanelGroup, _super);

    PanelGroup.prototype.className = 'ap-panel-group panel-group';

    function PanelGroup() {
      if (!this.id) {
        this.id = _.uniqueId('panel-');
      }
      PanelGroup.__super__.constructor.apply(this, arguments);
    }

    return PanelGroup;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.Button = (function(_super) {
    __extends(Button, _super);

    function Button() {
      return Button.__super__.constructor.apply(this, arguments);
    }

    Button.prototype.className = 'ap-button btn';

    Button.prototype.id = '';

    Button.prototype.tagName = 'a';

    Button.prototype.attributes = {
      href: '#'
    };

    Button.prototype.text = '';

    Button.prototype.ui = 'default';

    Button.prototype.size = null;

    Button.prototype.pullRight = false;

    Button.prototype.template = '{{ text }}';

    Button.prototype.events = {
      'click': 'onClick',
      'action': 'onAction'
    };

    Button.prototype.disabled = false;

    Button.prototype.preventDefaultClickAction = true;

    Button.prototype.onClick = function(e) {
      if (this.preventDefaultClickAction || this.disabled) {
        e.preventDefault();
      }
      return this.fireAction();
    };

    Button.prototype.fireAction = _.debounce((function() {
      if (!this.disabled) {
        return this.$el.trigger('action', this);
      }
    }), 300, true);

    Button.prototype.render = function() {
      Button.__super__.render.apply(this, arguments);
      this.$el.attr('id', this.id);
      if (this.ui) {
        this.$el.addClass("btn-" + this.ui);
      }
      if (this.size) {
        this.$el.addClass("btn-" + this.size);
      }
      if (this.pullRight) {
        this.$el.addClass('pull-right');
      }
      return this;
    };

    Button.prototype.onAction = function(e) {};

    Button.prototype.disable = function() {
      this.disabled = true;
      return this.$el.addClass('btn-disable');
    };

    Button.prototype.enable = function() {
      this.disabled = false;
      return this.$el.removeClass('btn-disable');
    };

    return Button;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.Content
  @extends AP.view.View
  
  A generic content container.  URLs, phone numbers, and email addresses may
  optionally be linked automatically when `hyperlinkContent` is `true`.
   */

  AP.view.Content = (function(_super) {
    __extends(Content, _super);

    function Content() {
      return Content.__super__.constructor.apply(this, arguments);
    }


    /**
    @inheritdoc
     */

    Content.prototype.className = 'ap-content';


    /**
    @property {String}
    Renders `content`, treating it as a template.
     */

    Content.prototype.template = '{{ renderAttr("content") }}';


    /**
    @property {String}
    Content to render.  `content` may contain template tags and/or HTML content.
     */

    Content.prototype.content = null;


    /**
    @property {Boolean}
    Automatically render links for URLs, phone numbers, and email addresses.  Use
    only for non-HTML content.
     */

    Content.prototype.hyperlinkContent = false;


    /**
    @inheritdoc
     */

    Content.prototype.toHtml = function() {
      var html;
      html = Content.__super__.toHtml.apply(this, arguments);
      if (this.hyperlinkContent) {
        html = html.replace(/((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i, '<a href="$&" target="_blank">$&</a>');
        html = html.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i, '<a href="mailto:$&">$&</a>');
        html = html.replace(/\+?[\d]?[\s\.-]?\(?[\d]{3}\)?([\s\.-]?)[\d|\w]{3}\1[\d|\w]{4}/i, function(match) {
          var letters, phone, qstep;
          phone = match.toLowerCase().replace(/\/|-|\./g, '');
          letters = 'abc def ghi jkl mno pqrstuv wxyz';
          qstep = 4;
          phone = phone.replace(/[a-z]/g, function(letter) {
            return Math.floor(letters.indexOf(letter) / qstep) + 2;
          });
          return "<a href=\"tel:" + phone + "\">" + match + "</a>";
        });
      }
      return html;
    };

    return Content;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.Table = (function(_super) {
    __extends(Table, _super);

    function Table() {
      return Table.__super__.constructor.apply(this, arguments);
    }

    Table.prototype.className = 'ap-table table';

    Table.prototype.tagName = 'table';

    Table.prototype.bordered = false;

    Table.prototype.striped = false;

    Table.prototype.head = null;

    Table.prototype.template = '{% if (head) { %}<thead></thead>{% } %}\n<tbody></tbody>';

    Table.prototype.append = function(el) {
      return this.$el.find('> tbody').append(el);
    };

    Table.prototype.render = function() {
      Table.__super__.render.apply(this, arguments);
      if (this.head) {
        this.$el.find('thead').append(this.head.$el);
      }
      if (this.bordered) {
        this.$el.addClass('table-bordered');
      }
      if (this.striped) {
        this.$el.addClass('table-striped');
      }
      return this;
    };

    Table.prototype.removeAllRows = function() {
      var item, _i, _len, _ref, _results;
      _ref = _.filter(this.items, function(item) {
        return item instanceof AP.view.TableRow;
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(this.remove(item));
      }
      return _results;
    };

    return Table;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.TableRow = (function(_super) {
    __extends(TableRow, _super);

    function TableRow() {
      return TableRow.__super__.constructor.apply(this, arguments);
    }

    TableRow.prototype.className = 'ap-tablerow';

    TableRow.prototype.tagName = 'tr';

    TableRow.prototype.initialize = function() {
      TableRow.__super__.initialize.apply(this, arguments);
      if (this.record) {
        return this.record.on('savesuccess', (function(_this) {
          return function() {
            return _this.render();
          };
        })(this));
      }
    };

    TableRow.prototype.render = function() {
      TableRow.__super__.render.apply(this, arguments);
      if (this.record) {
        this.$el.data('record', this.record);
        this.$el.attr('data-id', this.record.get('id'));
      }
      return this;
    };

    return TableRow;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.DataTable = (function(_super) {
    __extends(DataTable, _super);

    function DataTable() {
      return DataTable.__super__.constructor.apply(this, arguments);
    }

    DataTable.prototype.className = 'ap-datatable table';

    DataTable.prototype.tagName = 'table';

    DataTable.prototype.bordered = false;

    DataTable.prototype.striped = false;

    DataTable.prototype.head = null;

    DataTable.prototype.collection = null;

    DataTable.prototype.defaultCollection = null;

    DataTable.prototype.defaultQuery = null;

    DataTable.prototype.itemTpl = null;

    DataTable.prototype.selectRules = null;

    DataTable.prototype.template = '{% if (head) { %}<thead></thead>{% } %}\n<tbody></tbody>';

    DataTable.prototype.events = {
      'click tr[data-id]': 'onRowAction'
    };

    DataTable.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      DataTable.__super__.initialize.apply(this, arguments);
      if (options.collection || this.collection) {
        this.setCollection(options.collection || this.collection, options.query || this.query, true);
      }
      AP.auth.Authentication.on('auth:deauthenticated', (function(_this) {
        return function() {
          return _this.removeAllRows();
        };
      })(this));
      return AP.auth.Authentication.on('auth:authenticated', (function(_this) {
        return function() {
          if (_this.collection) {
            return _this.collection.fetch();
          }
        };
      })(this));
    };

    DataTable.prototype.clearQuery = function() {
      return this.query = null;
    };

    DataTable.prototype.setQuery = function(query) {
      return this.query = query;
    };

    DataTable.prototype.setCollection = function(collection, query, defaultSettings) {
      if (this.collection instanceof Backbone.Collection) {
        this.stopListening(this.collection);
      }
      collection = LoyaltyRtrSdk.getCollection(collection) || collection;
      this.collection = !(collection instanceof AP.collection.Collection) ? new collection() : collection;
      if (query) {
        this.setQuery(query);
      }
      if (this.collection instanceof Backbone.Collection) {
        this.listenTo(this.collection, 'sync', this.onCollectionReset);
        this.listenTo(this.collection, 'deletesuccess', this.onCollectionReset);
        this.removeAllRows();
        this.fetch();
      }
      if (defaultSettings) {
        this.defaultCollection = this.collection;
        return this.defaultQuery = this.query;
      }
    };

    DataTable.prototype.revertCollection = function() {
      this.setCollection(this.defaultCollection, this.defaultQuery);
      return this.fetch();
    };

    DataTable.prototype.fetch = function() {
      if (this.query) {
        return this.collection.query(this.query);
      } else {
        return this.collection.fetch();
      }
    };

    DataTable.prototype.onCollectionReset = function() {
      var _ref;
      if (this.collection) {
        this.removeAllRows();
        return (_ref = this.collection) != null ? _ref.each((function(_this) {
          return function(record) {
            return _this.add(new AP.view.TableRow({
              template: _this.itemTpl,
              record: record
            }));
          };
        })(this)) : void 0;
      }
    };

    DataTable.prototype.onRowAction = function(e) {
      var record, rowEl;
      rowEl = $(e.currentTarget);
      if (rowEl) {
        record = rowEl.data('record');
      }
      if (AP.auth.Authorization.isAuthorized(this.selectRules)) {
        return this.$el.trigger('select', record, this);
      }
    };

    DataTable.prototype.append = function(el) {
      return this.$el.find('> tbody').append(el);
    };

    DataTable.prototype.render = function() {
      DataTable.__super__.render.apply(this, arguments);
      if (this.head) {
        this.$el.find('thead').append(this.head.$el);
      }
      if (this.bordered) {
        this.$el.addClass('table-bordered');
      }
      if (this.striped) {
        this.$el.addClass('table-striped');
      }
      return this;
    };

    DataTable.prototype.removeAllRows = function() {
      var item, _i, _len, _ref, _results;
      _ref = _.filter(this.items, function(item) {
        return item instanceof AP.view.TableRow;
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(this.remove(item));
      }
      return _results;
    };

    return DataTable;

  })(AP.view.Table);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.DataViewItem
  @extends AP.view.View
  
  Data view item is a simple view for displaying a single record.  Typically, data
  view items are instantiated by {@link AP.view.DataView} or one of
  its subclasses.
   */

  AP.view.DataViewItem = (function(_super) {
    __extends(DataViewItem, _super);

    function DataViewItem() {
      return DataViewItem.__super__.constructor.apply(this, arguments);
    }


    /**
    @inheritdoc
     */

    DataViewItem.prototype.className = 'ap-dataviewitem';


    /**
    @inheritdoc
     */

    DataViewItem.prototype.initialize = function() {
      DataViewItem.__super__.initialize.apply(this, arguments);
      if (this.record) {
        return this.listenTo(this.record, 'savesuccess', this.render);
      }
    };


    /**
    Adds `record` and `data-id` jQuery data to this view's `el`.  Useful for
    getting the record from a DOM event handler.
     */

    DataViewItem.prototype.render = function() {
      DataViewItem.__super__.render.apply(this, arguments);
      if (this.record) {
        this.$el.data('record', this.record);
        this.$el.attr('data-id', this.record.get('id'));
      }
      return this;
    };

    return DataViewItem;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.DataView
  @extends AP.view.View
  
  Data view is intended for the display of data from an
  {@link AP.collection.Collection} collection instance.  Models in the collection
  are displayed using a {@link AP.view.DataViewItem} view or one of
  its subclasses.
   */

  AP.view.DataView = (function(_super) {
    __extends(DataView, _super);

    function DataView() {
      return DataView.__super__.constructor.apply(this, arguments);
    }


    /**
    @inheritdoc
     */

    DataView.prototype.className = 'ap-dataview';


    /**
    @property {String/AP.collection.Collection}
    Collection instance, class, or the name of a collection class in the
    active app.
     */

    DataView.prototype.collection = null;


    /**
    @property {Object}
    Optional hash of query parameters with which to query `collection`.
    
    Note that if no `query` is set, newly initialized data views inherit queries
    from the first ancestor with a `query` attribute.  To initialize a data view
    strictly without one, set `query` to an empty object `{}`.
     */

    DataView.prototype.query = null;


    /**
    @private
    @property {AP.collection.Collection}
    A reference to the first collection instance used by this data view.  Used by
    `revertCollection`, since the collection instance may be changed during the
    lifetime of the data view.
     */

    DataView.prototype.defaultCollection = null;


    /**
    @private
    @property {Object}
    A reference to the first query used by this data view.  Used by
    `revertCollection`, since the collection instance may be changed during the
    lifetime of the data view.
     */

    DataView.prototype.defaultQuery = null;


    /**
    @property {String}
    The template string passed as the `template` attribute to
    {@link AP.view.DataViewItem} instances or one of its subclasses.
     */

    DataView.prototype.itemTpl = null;


    /**
    @property {Object}
    Optional options object passed to {@link AP.view.DataViewItem} or one of its
    subclasses for instantiation.
     */

    DataView.prototype.itemOptions = null;


    /**
    @private
    @property {AP.view.View}
    Message view instance to display when `collection` contains no items.
     */

    DataView.prototype.noDataMessage = null;


    /**
    @property {Boolean}
    Paginate this data view instance, showing only `perPage` instances at a time?
     */

    DataView.prototype.paginate = false;


    /**
    @property {Number}
    Page of collection up to which to display.  By default, data view displays all
    items _up to_ and including those in `page`.
     */

    DataView.prototype.page = 1;


    /**
    @property {Number}
    Number of items per page.
     */

    DataView.prototype.perPage = 0;


    /**
    @property {String}
    Query parameter name for `collection` limit.
     */

    DataView.prototype.limitParam = 'limit';


    /**
    @property {String}
    Optional template for this data view.  Override in subclasses as necessary.
     */

    DataView.prototype.template = '';


    /**
    Initializes this data view instance.
    @inheritdoc
     */

    DataView.prototype.initialize = function() {
      DataView.__super__.initialize.apply(this, arguments);
      this.noDataMessage = new AP.view.Content({
        className: 'ap-content ap-no-data-message',
        content: 'No data available.',
        hidden: true,
        parent: this
      });
      this.appendExtra(this.noDataMessage.el);
      this.initializeCollection();
      this.listenTo(AP.auth.Authentication, 'auth:authenticated', this.fetch);
      return this.listenTo(AP.auth.Authentication, 'auth:deauthenticated', this.removeAll);
    };


    /**
    Instantiates `collection` if collection was specified as a class or name.
     */

    DataView.prototype.initializeCollection = function() {
      if (this.collection) {
        return this.setCollection(this.collection, this.query, true);
      } else {
        return this.noDataMessage.show();
      }
    };


    /**
    Used to append extra elements that are not proper children of the data view.
    For example, the no-data message is appended in this manner because it is not
    a data view item.
    @param {Element} el HTML element to be appended
     */

    DataView.prototype.appendExtra = function(el) {
      return this.append(el);
    };


    /**
    Optionally override to prepare a collection programmatically.  Useful when
    specifying `collection` is insufficient.
     */

    DataView.prototype.getCollection = function() {
      return null;
    };


    /**
    Unsets the current query used by `collection`.
     */

    DataView.prototype.clearQuery = function() {
      return this.query = null;
    };


    /**
    Sets the query to the specified key/value hash.
    @param {Object} query a key/value hash of query parameters
     */

    DataView.prototype.setQuery = function(query) {
      return this.query = query;
    };


    /**
    Sets `collection` and `query` to the specified values, removing any existing,
    if necessary.  Optionally pass `true` for `defaultSettings` to specify
    that the passed collection and query are default and should be used when
    calling `revertCollection`.
    @param {String/Backbone.Collection} collection collection class, class name or
    collection instance
    @param {Object} query optional key/value hash of query parameters
    @param {Boolean} defaultSettings if `true` then the specified collection and
    query are defaults and should be used when calling `revertCollection`
     */

    DataView.prototype.setCollection = function(collection, query, defaultSettings) {
      if (this.collection instanceof Backbone.Collection) {
        this.stopListening(this.collection);
      }
      collection = this.getCollection(collection) || collection;
      this.collection = !(!_.isFunction(collection) && collection instanceof AP.collection.Collection) && !(collection instanceof Backbone.Collection) ? new collection() : collection;
      this.clearQuery();
      if (query) {
        this.setQuery(query);
      }
      this.page = 1;
      if (this.collection instanceof Backbone.Collection) {
        this.listenTo(this.collection, 'sync', this.onCollectionReset);
        this.listenTo(this.collection, 'deletesuccess', this.onCollectionReset);
        this.removeAll();
        if (!this.collection.length) {
          this.fetch();
        } else {
          this.reset();
        }
      }
      if (defaultSettings) {
        this.defaultCollection = this.collection;
        return this.defaultQuery = this.query;
      }
    };


    /**
    Returns options used to initialize new data view item instances.
    @param {AP.model.Model} record record instance for the data view item
    @return {Object} options for instantiating a data view item
     */

    DataView.prototype.getItemOptions = function(record) {
      var options;
      options = {
        parent: this,
        record: record
      };
      if (this.itemTpl) {
        options.template = this.itemTpl;
      }
      return _.extend(options, this.itemOptions);
    };


    /**
    Returns the data view item class.  Override to specify a different data
    view item class.
    @return {AP.view.DataViewItem} data view item class or one of its subclasses
     */

    DataView.prototype.getItemClass = function() {
      return AP.view.DataViewItem;
    };


    /**
    Instantiates a new data view item using the given record instance.
    @param {AP.model.Model} record record instance with which to instantiate the
    data view item
    @return {AP.view.DataViewItem} data view item instance
     */

    DataView.prototype.getNewItem = function(record) {
      return new (this.getItemClass())(this.getItemOptions(record));
    };

    DataView.prototype.onCollectionReset = function() {
      return this.reset();
    };


    /**
    Removes all data view items and instantiates and appends a new set using
    records from the current collection.  If the collection has no items, the
    no-data message is shown.
     */

    DataView.prototype.reset = function() {
      var _ref, _ref1;
      this.removeAll();
      if (this.collection && this.collection.length) {
        this.noDataMessage.hide();
        if ((_ref = this.collection) != null) {
          _ref.each((function(_this) {
            return function(record) {
              return _this.add(_this.getNewItem(record));
            };
          })(this));
        }
      } else {
        this.noDataMessage.show();
      }
      this.trigger('datareset');
      if ((_ref1 = this.collection) != null ? _ref1.length : void 0) {
        return this.collection.previousLength = this.collection.length;
      }
    };


    /**
    Sets `collection` and `query` to the defaults, if any.  Immediately fetches
    records.  See {@link #setCollection} for more information on defaults.
     */

    DataView.prototype.revertCollection = function() {
      this.setCollection(this.defaultCollection, this.defaultQuery);
      return this.fetch();
    };


    /**
    Returns a key/value hash of pagination query parameters for the current page.
    By default the `limit` parameter is returned.  Override as necessary.
    @return {Object} key/value hash of pagination query parameters with which to
    pass to the server.
     */

    DataView.prototype.getPaginationParams = function() {
      var params;
      params = {};
      if (this.paginate && this.perPage) {
        params[this.limitParam] = this.page * this.perPage;
      }
      return params;
    };


    /**
    Fetches records from the server via the current collection instance, passing
    the pagination parameters.  If `query` is specified, the collection's `query`
    method is called with the query, instead of `fetch`.  Queries are inherited.
    See {@link #query} for more information.
     */

    DataView.prototype.fetch = function() {
      var query;
      query = this.getAttribute('query');
      if (!this.isRemoved() && this.isAuthorized()) {
        if (query) {
          return this.collection.query(query, {
            data: this.getPaginationParams()
          });
        } else {
          return this.collection.fetch({
            data: this.getPaginationParams()
          });
        }
      }
    };


    /**
    Removes all children from this data view.
     */

    DataView.prototype.removeAll = function() {
      var item, _i, _len, _ref, _results;
      _ref = this.items.slice();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(this.remove(item));
      }
      return _results;
    };

    return DataView;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.Form
   */

  AP.view.Form = (function(_super) {
    __extends(Form, _super);

    function Form() {
      return Form.__super__.constructor.apply(this, arguments);
    }

    Form.prototype.className = 'ap-form';

    Form.prototype.tagName = 'form';

    Form.prototype.ui = null;

    Form.prototype.events = {
      'change .datetime-date-field, .datetime-time-field': 'onDateTimeChange',
      submit: 'onSubmit'
    };

    Form.prototype.onSubmit = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.fireSave();
    };

    Form.prototype.fireSave = _.debounce((function() {

      /**
      @event 'save'
      Triggered whenever the form is submitted successfully.
       */
      this.save();
      return this.$el.trigger('save');
    }), 750, true);

    Form.prototype.submit = function() {
      return this.$el.submit();
    };

    Form.prototype.onDateTimeChange = function(e) {
      var date, datetime, forField, time;
      forField = $(e.currentTarget).attr('data-for');
      date = $(".datetime-date-field[data-for=" + forField + "]").val();
      time = $(".datetime-time-field[data-for=" + forField + "]").val();
      datetime = "" + date + "T" + time;
      return $("[name=" + forField + "]").val(datetime);
    };

    Form.prototype.render = function() {
      Form.__super__.render.apply(this, arguments);
      if (this.ui) {
        this.$el.addClass("form-" + this.ui);
      }
      return this;
    };

    Form.prototype.reset = function() {
      return this.$el[0].reset();
    };

    Form.prototype.save = function() {};


    /**
    Gets the values from all form fields.
    @return {Object} a hash of name/value pairs representing form fields
     */

    Form.prototype.getValues = function() {
      var checked, el, item, name, values, _i, _j, _len, _len1, _ref, _ref1;
      values = {};
      _ref = this.$el.serializeArray();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if ($.isArray(values[item.name])) {
          values[item.name].push(item.value);
        } else if (values[item.name]) {
          values[item.name] = [values[item.name], item.value];
        } else {
          values[item.name] = item.value;
        }
      }
      _ref1 = $('[type=checkbox]', this.el).toArray();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        el = _ref1[_j];
        name = $(el).attr('name');
        checked = $(el).is(':checked');
        values[name] = checked;
      }
      return values;
    };


    /**
    Sets form fields to the specified values, where values is a hash
    of name/values.
     */

    Form.prototype.setValues = function(values) {
      var field, name, value, _results;
      _results = [];
      for (name in values) {
        value = values[name];
        field = this.$el.find("[name=" + name + "]");
        if (field.attr('type') === 'checkbox') {
          _results.push(field.attr('checked', value));
        } else {
          _results.push(field.val(value).trigger('change'));
        }
      }
      return _results;
    };

    return Form;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.Fieldset = (function(_super) {
    __extends(Fieldset, _super);

    function Fieldset() {
      return Fieldset.__super__.constructor.apply(this, arguments);
    }

    Fieldset.prototype.className = 'ap-fieldset';

    Fieldset.prototype.tagName = 'fieldset';

    Fieldset.prototype.legend = '';

    Fieldset.prototype.template = '{% if (legend) { %}\n  <h4>{%- legend %}</h4>\n{% } %}';

    return Fieldset;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.Field = (function(_super) {
    __extends(Field, _super);

    function Field() {
      return Field.__super__.constructor.apply(this, arguments);
    }

    Field.prototype.className = 'ap-field';

    Field.prototype.name = '';

    Field.prototype.label = '';

    Field.prototype.type = 'text';

    Field.prototype.value = '';

    Field.prototype.placeholder = '';

    Field.prototype.fieldClass = 'form-control';

    Field.prototype.help = '';

    Field.prototype.span = '';

    Field.prototype.prepend = '';

    Field.prototype.append = '';

    Field.prototype.rows = 6;

    Field.prototype.step = null;

    Field.prototype.min = null;

    Field.prototype.checked = false;

    Field.prototype.required = false;

    Field.prototype.formGroup = false;

    Field.prototype.readonly = false;

    Field.prototype.template = '  \n\n\n  {% if (label && (type !== \'checkbox\')) { %}\n    <!-- label-->\n    <label for="{%- name %}"{% if (formGroup) { %} class="control-label"{% } %}>\n      {%- label %}\n    </label>\n  {% } %}\n  \n\n \n\n  {% if (formGroup) { %}\n    <div class="form-group">\n  {% } %}\n  \n\n\n\n  {% if (prepend) { %}\n  <div class="input-prepend">\n  <span class="add-on">{%- prepend %}</span>\n  {% } %}\n  \n\n\n\n  {% if (append) { %}<div class="input-append">{% } %}\n  \n\n\n\n  {% if (type === \'textarea\') { %}\n  \n\n    <!-- textarea -->\n    <textarea name="{%- name %}" rows="{%- rows %}" {% if (required) { %} required="required"{% } %} {% if (placeholder) { %}placeholder="{%- placeholder %}"{% } %} class="{%- fieldClass %} {% if (readonly) { %} readonly{% } %}">{%- value %}</textarea>\n  \n\n  {% } else if (type === \'checkbox\') { %}\n  \n\n\n    <!-- checkbox -->\n    <label class="checkbox">\n      <input type="{%- type %}" name="{%- name %}" value="true" {% if (required) { %} required="required"{% } %} {% if (checked) { %}checked="checked"{% } %} class="{%- fieldClass %}"/>\n      {%- label %}\n    </label>\n\n\n  {% } else if (type === \'datetime\') { %}\n  \n\n\n\n    <!-- datetime input -->\n    <input type="hidden" name="{%- name %}" value="{%- value %}" />\n    <input type="date" data-for="{%- name %}" value="{% if (value) { %}{%- value.split(\'T\')[0] %}{% } %}"{% if (min) { %} min="{%- min %}"{% } %}{% if (step) { %} step="{%- step %}"{% } %}{% if (required) { %} required="required"{% } %}{% if (placeholder) { %} placeholder="{%- placeholder %}"{% } %} class="datetime-date-field {% if (span) { %}span{%- span %} {% } %}{%- fieldClass %}"/>\n    {% if (value) { %}\n    {% var selectedTime = value.split(\'T\')[1].substring(0, 5) %}\n    {% } %}\n    <select class="datetime-time-field span2" data-for="{%- name %}">\n      <optgroup label="AM">\n        <option value="00:00"{% if (selectedTime === \'00:00\') { %} selected="selected"{% } %}>12:00am</option>\n        <option value="00:30"{% if (selectedTime === \'00:30\') { %} selected="selected"{% } %}>12:30am</option>\n        {% for (i = 1; i < 12; i++) { %}\n        {% if (i.length == 1) { i = \'0\' + 1 } %}\n        <option value="{%- i %}:00"{% if (selectedTime === i + \':00\') { %} selected="selected"{% } %}>{%- i %}:00am</option>\n        <option value="{%- i %}:30"{% if (selectedTime === i + \':30\') { %} selected="selected"{% } %}>{%- i %}:30am</option>\n        {% } %}\n      </optgroup>\n      <optgroup label="PM">\n        <option value="12:00">12:00pm</option>\n        <option value="0120:30">12:30pm</option>\n        {% for (i = 13; i < 24; i++) { %}\n        <option value="{%- i %}:00"{% if (selectedTime === i + \':00\') { %} selected="selected"{% } %}>{%- i - 12 %}:00pm</option>\n        <option value="{%- i %}:30"{% if (selectedTime === i + \':30\') { %} selected="selected"{% } %}>{%- i - 12 %}:30pm</option>\n        {% } %}\n      </optgroup>\n    </select>\n\n\n    {% } else if (type === \'category\') { %}\n       {% if (label ==\'Category\' && name=="category") { %}\n        <select class="form-control" name="{%- name%}">\n          {% if(!value){ %}\n            <option value="Earn">Earn</option>\n            <option value="Burn">Burn</option>\n          {% } else { %}\n            <option value="{%- value %}">{%- value %}</option>\n            <option value="{% if(value == \'Burn\'){ %}Earn{% } else { %}Burn{% } %}">{% if (value == \'Burn\'){ %}Earn{% } else { %}Burn{% } %}</option>\n          {% } %}\n        </select>\n      {% } %}\n\n    {% } else if (type === \'is_active\') { %}\n       {% if (label ==\'Status\' && name=="is_active") { %}\n        <select class="form-control" name="{%- name%}">\n            <option value="true" {%if(value){%}selected="selected"{%}%}>Active</option>\n            <option value="false" {%if(!value){%}selected="selected"{%}%}>Inactive</option>\n        </select>\n      {% } %}\n\n    {% } else if (type === \'default_currency\') { %}\n       {% if (name=="default_currency") { %}\n        <select class="form-control" name="{%- name%}">\n            <option value="en" {%if(value=="en") {%}selected="selected"{%}%}>en</option>\n            <option value="euro" {%if(value=="euro") {%}selected="selected"{%}%}>euro</option>\n            <option value="yuan" {%if(value=="yuan") {%}selected="selected"{%}%}>yuan</option>\n        </select>\n      {% } %}\n\n    {% } else if (type === \'fallback\') { %}\n       {% if (name=="fallback") { %}\n        <select class="form-control" name="{%- name%}">\n            <option value="{%- value %}">{% if (value){ %}true{% } else { %}false{% } %}</option>\n            <option value="{% if(value){ %}false{% } else { %}true{% } %}">{% if (value){ %}false{% } else { %}true{% } %}</option>\n        </select>\n      {% } %}\n\n    {% } else if (type === \'language_code\') { %}\n       {% if (name=="language_code") { %}\n        <select class="form-control" name="{%- name%}">\n            <option value="en" {%if(value=="en") {%}selected="selected"{%}%}>en</option>\n            <option value="zh" {%if(value=="zh") {%}selected="selected"{%}%}>zh</option>\n            <option value="pt" {%if(value=="pt") {%}selected="selected"{%}%}>pt</option>\n        </select>\n      {% } %}\n\n  {% } else { %}\n  \n\n    <!-- input -->\n    <input type="{%- type %}" name="{%- name %}" value="{%- value %}"{% if (min) { %} min="{%- min %}"{% } %}{% if (step) { %} step="{%- step %}"{% } %}{% if (required) { %} required="required"{% } %}{% if (readonly) { %} readonly{% } %} {% if (placeholder) { %} placeholder="{%- placeholder %}"{% } %} class="{% if (span) { %}span{%- span %} {% } %}{%- fieldClass %}"/>\n  {% } %}\n  \n  {% if (prepend) { %}\n  </div>\n  {% } %}\n  \n  {% if (append) { %}\n  <span class="add-on">{%- append %}</span>\n  </div>\n  {% } %}\n\n\n\n  {% if (help) { %}\n    <span class="help-block">{%- help %}</span>\n  {% } %}\n\n\n\n\n  {% if (formGroup) { %}\n\n\n\n\n    </div>\n  {% } %}';

    Field.prototype.render = function() {
      Field.__super__.render.apply(this, arguments);
      if (this.formGroup) {
        this.$el.addClass('form-group');
      }
      return this;
    };

    return Field;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.Option = (function(_super) {
    __extends(Option, _super);

    function Option() {
      return Option.__super__.constructor.apply(this, arguments);
    }

    Option.prototype.className = 'ap-option';

    Option.prototype.tagName = 'option';

    Option.prototype.value = '';

    Option.prototype.text = '';

    Option.prototype.selected = false;

    Option.prototype.template = '{%- text %}';

    Option.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      Option.__super__.initialize.apply(this, arguments);
      if (this.value) {
        this.$el.attr('value', this.value);
      }
      if (this.selected) {
        return this.$el.attr('selected', 'selected');
      }
    };

    return Option;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.SelectField = (function(_super) {
    __extends(SelectField, _super);

    function SelectField() {
      return SelectField.__super__.constructor.apply(this, arguments);
    }

    SelectField.prototype.className = 'ap-field';

    SelectField.prototype.defaultOption = 'Choose One';

    SelectField.prototype.collection = null;

    SelectField.prototype.valueField = 'value';

    SelectField.prototype.textField = null;

    SelectField.prototype.template = '{% if (label) { %}\n  <!-- label-->\n  <label for="{%- name %}"{% if (formGroup) { %} class="control-label"{% } %}>\n    {%- label %}\n  </label>\n{% } %}\n\n{% if (formGroup) { %}\n  <div class="controls">\n{% } %}\n\n<select name="{%- name %}" {% if (required) { %} required="required"{% } %}>\n  {% if (defaultOption) { %}\n    <option value="">{%- defaultOption %}</option>\n  {% } %}\n</select>\n\n{% if (help) { %}\n  <span class="help-block">{%- help %}</span>\n{% } %}\n\n{% if (formGroup) { %}\n  </div>\n{% } %}';

    SelectField.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      SelectField.__super__.initialize.apply(this, arguments);
      if (options.collection || this.collection) {
        this.setCollection(options.collection || this.collection);
      }
      return setTimeout(((function(_this) {
        return function() {
          var selected, selectedIndex;
          if (!_this.collection && _this.value) {
            options = _this.$el.find('option');
            selected = options.filter("[value=" + _this.value + "]");
            selectedIndex = options.index(selected);
            _this.$el.find('select')[0].selectedIndex = selectedIndex;
            if (selectedIndex) {
              return _this.$el.find('select').trigger('change');
            }
          }
        };
      })(this)), 500);
    };

    SelectField.prototype.clearQuery = function() {
      return this.query = null;
    };

    SelectField.prototype.setQuery = function(query) {
      return this.query = query;
    };

    SelectField.prototype.setCollection = function(collection, query) {
      collection = collection;
      this.collection = !(collection instanceof AP.collection.Collection) ? new collection() : collection;
      if (query) {
        this.setQuery(query);
      }
      if (this.collection instanceof AP.collection.Collection) {
        this.collection.on('reset', this.onCollectionReset, this);
        if (this.query) {
          return this.collection.query(this.query);
        } else {
          return this.collection.fetch();
        }
      }
    };

    SelectField.prototype.onCollectionReset = function() {
      var selectedIndex, _ref;
      if (this.collection) {
        selectedIndex = 0;
        this.removeAllOptions();
        if ((_ref = this.collection) != null) {
          _ref.each((function(_this) {
            return function(record, index) {
              var value, _ref1;
              value = _.isFunction(_this.valueField) ? _this.valueField(record) : record.get(_this.valueField);
              _this.add(new AP.view.Option({
                text: _.isFunction(_this.textField) ? _this.textField(record) : record.get(_this.textField),
                value: value
              }));
              if (value && ((value != null ? value.valueOf().toString() : void 0) === ((_ref1 = _this.value) != null ? _ref1.valueOf().toString() : void 0))) {
                return selectedIndex = index + 1;
              }
            };
          })(this));
        }
        if (!this.alreadyLoaded) {
          this.alreadyLoaded = true;
          this.$el.find('select')[0].selectedIndex = selectedIndex;
          if (selectedIndex) {
            return this.$el.find('select').trigger('change');
          }
        }
      }
    };

    SelectField.prototype.append = function(el) {
      return this.$el.find('select').append(el);
    };

    SelectField.prototype.removeAllOptions = function() {
      var item, _i, _len, _ref, _results;
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item instanceof AP.view.Option) {
          _results.push(this.remove(item));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return SelectField;

  })(AP.view.Field);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.ModelForm = (function(_super) {
    __extends(ModelForm, _super);

    function ModelForm() {
      return ModelForm.__super__.constructor.apply(this, arguments);
    }

    ModelForm.prototype.className = 'ap-form ap-modelform';

    ModelForm.prototype.ui = null;

    ModelForm.prototype.programId = null;

    ModelForm.prototype.recordId = null;

    ModelForm.prototype.collection = null;

    ModelForm.prototype.model = null;

    ModelForm.prototype.formFields = null;

    ModelForm.prototype.showIdField = false;

    ModelForm.prototype.thisTestField = true;

    ModelForm.prototype.showCancelButton = false;

    ModelForm.prototype.showDeleteButton = null;

    ModelForm.prototype.fieldTypes = {
      language_code: 'language_code',
      fallback: 'fallback',
      default_currency: 'default_currency',
      is_active: 'is_active',
      category: 'category',
      boolean: 'checkbox',
      integer: 'number',
      float: 'number',
      string: 'text',
      date: 'date',
      time: 'datetime',
      password: 'text',
      textarea: 'textarea'
    };

    ModelForm.prototype.fieldTypesByNameContains = {
      phone: 'tel',
      password: 'password'
    };

    ModelForm.prototype.events = {
      'click #delete-btn': 'onDeleteButtonAction',
      submit: 'onSubmit',
      "delete": 'onDelete'
    };

    ModelForm.prototype.initialize = function(options) {
      var buttons;
      if (options == null) {
        options = {};
      }
      ModelForm.__super__.initialize.apply(this, arguments);
      this.addFormFields();
      buttons = [
        new AP.view.Button({
          tagName: 'button',
          ui: 'primary',
          text: 'Save',
          preventDefaultClickAction: false
        })
      ];
      if (this.showCancelButton) {
        buttons.push(new AP.view.Button({
          className: 'ap-button ap-cancel btn',
          text: 'Cancel'
        }));
      }
      if (this.record && this.showDeleteButton) {
        buttons.push(new AP.view.Button({
          className: 'btn pull-right',
          id: 'delete-btn',
          ui: 'danger',
          text: 'Delete'
        }));
      }
      return this.add(new AP.view.View({
        className: 'form-actions',
        items: buttons
      }));
    };

    ModelForm.prototype.getFieldDefs = function() {
      var config, field, fieldDefs, model, name, _ref, _ref1, _ref2, _ref3;
      model = this.model || ((_ref = this.record) != null ? (_ref1 = _ref.collection) != null ? _ref1.model : void 0 : void 0);
      if (!this.formFields) {
        if (model) {
          fieldDefs = model.prototype.fieldDefinitions;
        }
      } else {
        fieldDefs = [];
        _ref2 = this.formFields;
        for (name in _ref2) {
          config = _ref2[name];
          field = _.extend({}, (_ref3 = _.where(model.prototype.fieldDefinitions, {
            name: name
          })) != null ? _ref3[0] : void 0, config);
          fieldDefs.push(field);
        }
      }
      return fieldDefs;
    };

    ModelForm.prototype.addFormFields = function() {
      var field, fieldDefs, fieldType, fields, item, itemType;
      fieldDefs = this.getFieldDefs();
      if (fieldDefs) {
        return fields = (function() {
          var _i, _len, _ref, _ref1, _ref2, _results;
          _results = [];
          for (_i = 0, _len = fieldDefs.length; _i < _len; _i++) {
            field = fieldDefs[_i];
            if (!(field.name === 'id' && !this.showIdField)) {
              if (field.name === 'program_level_id' && this.programId) {
                _results.push(this.add(new AP.view.Field({
                  label: field.label,
                  name: field.name,
                  value: this.programId,
                  readonly: 'true',
                  hidden: field.hidden
                })));
              } else {
                fieldType = this.fieldTypes[field.type];
                _ref = this.fieldTypesByNameContains;
                for (item in _ref) {
                  itemType = _ref[item];
                  if (field.name.toString().toLowerCase().indexOf(item) > -1) {
                    fieldType = itemType;
                  }
                }
                _results.push(this.add(new AP.view.Field({
                  type: fieldType,
                  label: field.label + (field.required ? '*' : ''),
                  name: field.name,
                  value: (_ref1 = this.record) != null ? _ref1.get(field.name) : void 0,
                  required: field.required,
                  checked: field.type === 'boolean' ? (_ref2 = this.record) != null ? _ref2.get(field.name) : void 0 : void 0,
                  step: field.type === 'float' ? 0.0000001 : void 0,
                  min: field.type === 'float' || field.type === 'integer' ? -100000000 : void 0,
                  span: field.span,
                  prepend: field.prepend,
                  append: field.append,
                  formGroup: true,
                  help: field.help,
                  readonly: field.readonly
                })));
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }).call(this);
      }
    };

    ModelForm.prototype.castValues = function(values) {
      var castValues, fieldDefs, key, type, value, _ref;
      castValues = {};
      fieldDefs = this.getFieldDefs();
      for (key in values) {
        value = values[key];
        type = (_ref = _.where(fieldDefs, {
          name: key
        })[0]) != null ? _ref.type : void 0;
        castValues[key] = null;
        if (value) {
          switch (type) {
            case 'float':
              castValues[key] = parseFloat(value.toString());
              if (_.isNaN(castValues[key])) {
                castValues[key] = value.toString();
              }
              break;
            case 'integer':
              castValues[key] = parseInt(value.toString(), 10);
              if (_.isNaN(castValues[key])) {
                castValues[key] = value.toString();
              }
              break;
            case 'string':
              castValues[key] = value.toString();
              break;
            case 'boolean':
              castValues[key] = value.toString() === 'on' || value.toString() === 'true';
              break;
            default:
              castValues[key] = value;
          }
        }
      }
      return castValues;
    };

    ModelForm.prototype.setValues = function(record) {
      var castValues, id, values;
      values = this.getValues();
      castValues = this.castValues(values);
      if (record) {
        id = record.id;
        record.clear();
        if (id) {
          castValues.id = id;
        }
        return record.set(castValues, {
          silent: true
        });
      }
    };

    ModelForm.prototype.save = function() {
      var options, record;
      record = this.record;
      if (!record && this.model) {
        record = new this.model();
      }
      if (this.setValues(record)) {
        if (record.isValid()) {
          options = {
            success: (function(_this) {
              return function() {
                var _ref;
                _this.$el.trigger('savesuccess', record);
                record.trigger('savesuccess');
                return (_ref = _this.collection) != null ? _ref.trigger('reset') : void 0;
              };
            })(this),
            error: (function(_this) {
              return function(record, response) {
                return _this.$el.trigger('savefailure', [record, response]);
              };
            })(this)
          };
          if (this.collection && (record != null ? record.isNew() : void 0)) {
            return this.collection.create(record, options);
          } else {
            return record.save(null, options);
          }
        } else {
          this.$el.trigger('savefailure', record);
          return record.set(record.previousAttributes, {
            silent: true
          });
        }
      } else {
        return this.$el.trigger('savefailure', record);
      }
    };

    ModelForm.prototype.onDeleteButtonAction = function(e) {
      e.preventDefault();
      return this.$el.trigger('delete');
    };

    ModelForm.prototype.onDelete = function() {
      var record;
      record = this.record;
      if (record) {
        return record.destroy({
          success: (function(_this) {
            return function() {
              var _ref;
              _this.$el.trigger('deletesuccess', record);
              record.trigger('deletesuccess');
              return (_ref = _this.collection) != null ? _ref.trigger('deletesuccess') : void 0;
            };
          })(this),
          error: (function(_this) {
            return function() {
              return _this.$el.trigger('deletefailure', recordz);
            };
          })(this)
        });
      }
    };

    return ModelForm;

  })(AP.view.Form);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.ModelFormPage = (function(_super) {
    __extends(ModelFormPage, _super);

    function ModelFormPage() {
      return ModelFormPage.__super__.constructor.apply(this, arguments);
    }

    ModelFormPage.prototype.className = 'ap-modelformpage';

    ModelFormPage.prototype.title = 'Form';

    ModelFormPage.prototype.collection = null;

    ModelFormPage.prototype.formFields = null;

    ModelFormPage.prototype.programId = null;

    ModelFormPage.prototype.recordId = null;

    ModelFormPage.prototype.showCancelButton = false;

    ModelFormPage.prototype.showDeleteButton = false;

    ModelFormPage.prototype.events = {
      'click .ap-back': 'onBackAction',
      'click .ap-cancel': 'onBackAction',
      'savesuccess': 'onSaveSuccess',
      'deletesuccess': 'onDeleteSuccess',
      'savefailure': 'onSaveFailure'
    };

    ModelFormPage.prototype.initialize = function() {
      ModelFormPage.__super__.initialize.apply(this, arguments);
      return this.add(new AP.view.ModelForm({
        programId: this.programId,
        recordId: this.recordId,
        collection: this.collection,
        model: this.model,
        record: this.record,
        formFields: this.formFields,
        showCancelButton: this.showCancelButton,
        showDeleteButton: this.showDeleteButton
      }));
    };

    ModelFormPage.prototype.onSaveSuccess = function() {
      return this.goBack();
    };

    ModelFormPage.prototype.onDeleteSuccess = function() {
      return this.goBack();
    };

    ModelFormPage.prototype.onSaveFailure = function(e, record, response) {
      var data, messagePage, _ref;
      if ((response != null ? response.responseText : void 0) && ((_ref = JSON.parse(response.responseText)) != null ? _ref.errors : void 0)) {
        messagePage = new AP.view.MessagePage({
          title: 'We could not complete this request',
          message: JSON.parse(response.responseText).errors[0][0],
          backButton: false,
          items: [
            new AP.view.View({
              tagName: 'hr'
            }), new AP.view.Button({
              text: 'Dismiss',
              onAction: (function(_this) {
                return function() {
                  return messagePage.goBack();
                };
              })(this)
            })
          ]
        });
      } else if (!record.isValid()) {
        data = _.extend({
          formFields: this.formFields
        }, record.errors()[0]);
        messagePage = new AP.view.MessagePage({
          title: 'Invalid',
          data: data,
          message: '<strong>{%- (formFields && formFields[field]) || field %}</strong>:  {%- message %}',
          backButton: false,
          items: [
            new AP.view.View({
              tagName: 'hr'
            }), new AP.view.Button({
              text: 'Dismiss',
              onAction: (function(_this) {
                return function() {
                  return messagePage.goBack();
                };
              })(this)
            })
          ]
        });
      } else {
        messagePage = new AP.view.MessagePage({
          title: 'We could not complete this request',
          message: 'Sorry, something\'s gone wrong.  It could be on our end.  Just to be safe, check your Internet connection and try again.',
          backButton: false,
          items: [
            new AP.view.View({
              tagName: 'hr'
            }), new AP.view.Button({
              text: 'Dismiss',
              onAction: (function(_this) {
                return function() {
                  return messagePage.goBack();
                };
              })(this)
            })
          ]
        });
      }
      AP.Viewport.add(messagePage);
      return messagePage.show();
    };

    return ModelFormPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.RecordTable = (function(_super) {
    __extends(RecordTable, _super);

    function RecordTable() {
      return RecordTable.__super__.constructor.apply(this, arguments);
    }

    RecordTable.prototype.className = 'ap-recordtable table';

    RecordTable.prototype.striped = true;

    RecordTable.prototype.template = '{% if (head) { %}<thead></thead>{% } %}\n<tbody>\n  {% _.each(getFields(), function (field, key) { %}\n    <tr>\n      <td>{%- field.label %}</td>\n      {% if (field.type == \'boolean\') { %}\n        <td>{% if (record.get(field.name)) { %}<i class="icon-ok"></i>{% } else { %}{% } %}</td>\n      {% } else if (field.type == \'time\') { %}\n        <td>{%- AP.formatDateTime(record.get(field.name))  %}</td>\n      {% } else { %}\n        <td>{%- record.get(field.name) %}</td>\n      {% } %}\n    </tr>\n  {% }) %}\n</tbody>';

    RecordTable.prototype.initialize = function() {
      RecordTable.__super__.initialize.apply(this, arguments);
      return this.record.on('savesuccess', (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
    };

    RecordTable.prototype.getFields = function() {
      var config, field, fieldDefs, model, name, _ref, _ref1, _ref2, _ref3;
      model = this.model || ((_ref = this.record) != null ? (_ref1 = _ref.collection) != null ? _ref1.model : void 0 : void 0);
      if (!this.formFields) {
        if (model) {
          fieldDefs = model.prototype.fieldDefinitions;
        }
      } else {
        fieldDefs = [];
        _ref2 = this.formFields;
        for (name in _ref2) {
          config = _ref2[name];
          field = _.extend({
            name: name
          }, (_ref3 = _.where(model.prototype.fieldDefinitions, {
            name: name
          })) != null ? _ref3[0] : void 0, config);
          field.name = field.name.replace(/_id/, '');
          fieldDefs.push(field);
        }
      }
      return fieldDefs;
    };

    return RecordTable;

  })(AP.view.Table);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.RecordTablePage = (function(_super) {
    __extends(RecordTablePage, _super);

    function RecordTablePage() {
      return RecordTablePage.__super__.constructor.apply(this, arguments);
    }

    RecordTablePage.prototype.className = 'ap-recordtablepage';

    RecordTablePage.prototype.title = '';

    RecordTablePage.prototype.formFields = null;

    RecordTablePage.prototype.backButton = true;

    RecordTablePage.prototype.showEditButton = true;

    RecordTablePage.prototype.editButtonRules = null;

    RecordTablePage.prototype.initialize = function() {
      var headerItems;
      RecordTablePage.__super__.initialize.apply(this, arguments);
      this.record.on('deletesuccess', (function(_this) {
        return function() {
          return _this.goBack();
        };
      })(this));
      headerItems = [
        new AP.view.View({
          className: 'pull-left',
          tagName: 'h1',
          title: this.title,
          template: '<h2>{%- title %}</h2>'
        })
      ];
      if (this.showEditButton) {
        headerItems.push(new AP.view.Button({
          text: "Edit " + this.title,
          id: 'edit-btn',
          pullRight: true,
          rules: this.editButtonRules
        }));
      }
      this.add(new AP.view.View({
        className: 'page-header',
        items: headerItems
      }));
      return this.add(new AP.view.RecordTable({
        record: this.record,
        formFields: this.formFields
      }));
    };

    return RecordTablePage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.MessagePage = (function(_super) {
    __extends(MessagePage, _super);

    function MessagePage() {
      return MessagePage.__super__.constructor.apply(this, arguments);
    }

    MessagePage.prototype.className = 'ap-messagepage';

    MessagePage.prototype.backButton = true;

    MessagePage.prototype.title = 'Message';

    MessagePage.prototype.message = '';

    MessagePage.prototype.initializeItems = function() {
      var extraItems, items;
      items = MessagePage.__super__.initializeItems.apply(this, arguments);
      extraItems = [];
      if (this.message) {
        extraItems.push(new AP.view.View({
          template: "<div class=\"page-header\"><h2>" + this.title + "</h2></div>",
          record: this.record,
          data: this.data
        }));
        extraItems.push(new AP.view.View({
          template: this.message,
          record: this.record,
          data: this.data
        }));
      }
      return this.items = extraItems.concat(items);
    };

    return MessagePage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  null;


  /**
  @class AP.view.Viewport
  @alternateClassName AP.Viewport
  @singleton
  A view instance for the current viewport, the `body` element.
   */

  AP.view.Viewport = (function(_super) {
    __extends(Viewport, _super);

    function Viewport() {
      return Viewport.__super__.constructor.apply(this, arguments);
    }

    Viewport.prototype._currentItem = null;


    /**
    @property
    The viewport's element is always the document body.
     */

    Viewport.prototype.el = 'body';


    /**
    Hides every item in the viewport's items.
     */

    Viewport.prototype.hideAll = function() {
      var item, _i, _len, _ref, _results;
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(item.hide());
      }
      return _results;
    };

    Viewport.prototype.showItemByClass = function() {
      var view;
      view = Viewport.__super__.showItemByClass.apply(this, arguments);
      this._currentItem = view;
      return view;
    };

    Viewport.prototype.getCurrentItem = function() {
      return this._currentItem;
    };

    Viewport.prototype.setCurrentItem = function(page) {
      return this._currentItem = page;
    };

    return Viewport;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ActiveOffers = (function(_super) {
    __extends(ActiveOffers, _super);

    function ActiveOffers() {
      return ActiveOffers.__super__.constructor.apply(this, arguments);
    }

    ActiveOffers.prototype.recordName = null;

    ActiveOffers.prototype.programId = null;

    ActiveOffers.prototype.initializeItems = function() {
      console.debug(this.recordName);
      return this.add(new AP.view.DataTable({
        className: 'table',
        collection: 'BankOfferExactMatch',
        query: {
          program_level_id: this.programId
        },
        striped: true,
        head: new AP.view.TableRow({
          template: '<th class="col-sm-1 hidden-xs">Action</th>\n<th class="col-sm-1 hidden-xs">ID</th>\n<th class="col-sm-1 col-xs-2">Category</th>\n<th class="col-sm-1 col-xs-2">Start Date</th>\n<th class="col-sm-1 col-xs-2">End Date</th>\n<th class="col-sm-2 col-xs-2">Line One</th>\n<th class="col-sm-2 col-xs-2">Line Two</th>\n<th class="col-sm-2 col-xs-2">Line Three</th>\n<th class="hidden-xs col-sm-1">Offer Image URL</th>\n<th class="col-sm-1 hidden-xs">Promo Conversion Rate</th>'
        }),
        itemTpl: '<td class="hidden-xs"><a href="#program-offer/edit/{%- program_level_id %}/{%- id%}">edit</a></td>\n<td>{%- id %}</td>\n<td>{%- category %}</td>\n<td>{%- start_date %}</td>\n<td>{%- end_date %}</td>\n<td>{%- line_one %}</td>\n<td>{%- line_two %}</td>\n<td>{%- line_three %}</td>\n<td class="hidden-xs"><img width="200" src="{%- image %}"></td>\n<td class="hidden-xs">{%- promo_conversion_rate %}</td>'
      }));
    };

    return ActiveOffers;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ActiveOffersForm = (function(_super) {
    __extends(ActiveOffersForm, _super);

    function ActiveOffersForm() {
      return ActiveOffersForm.__super__.constructor.apply(this, arguments);
    }

    ActiveOffersForm.prototype.className = '';

    ActiveOffersForm.prototype.programId = null;

    ActiveOffersForm.prototype.recordId = null;

    ActiveOffersForm.prototype.record = null;

    ActiveOffersForm.prototype.showCancelButton = true;

    ActiveOffersForm.prototype.showDeleteButton = true;

    ActiveOffersForm.prototype.initializeItems = function() {
      ActiveOffersForm.__super__.initializeItems.apply(this, arguments);
      console.debug(this.recordId);
      this.add(new AP.view.View({
        programId: this.programId,
        record: this.record,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>\n  {% if(recordId){ %}  \n  <li>Edit Existing Offer</li>\n  {% } else { %} \n  <li>Add New Offer</li>\n  {% } %}\n</ol>'
      }));
      if (this.recordId) {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Edit Existing Offer</h3>'
        }));
      } else {
        this.add(new AP.view.View({
          record: this.record,
          template: '<h3 class="sub-header">Add New Offer \n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      }
      return this.add(new AP.view.component.Modal({
        record: this.record
      }));
    };

    ActiveOffersForm.prototype.formFields = {
      program_level_id: {
        label: 'Program Level ID',
        name: 'program_level_id',
        type: 'string',
        required: true,
        readonly: true,
        hidden: true
      },
      category: {
        label: 'Category',
        name: 'category',
        type: 'category'
      },
      start_date: {
        label: 'Start Date',
        name: 'start_date',
        type: 'date'
      },
      end_date: {
        label: 'End Date',
        name: 'end_date',
        type: 'date'
      },
      line_one: {
        label: 'Line One',
        name: 'line_one',
        type: 'string'
      },
      line_two: {
        label: 'Line Two',
        name: 'line_two',
        type: 'string'
      },
      line_three: {
        label: 'Line Three',
        name: 'line_three',
        type: 'string'
      },
      image: {
        label: 'Offer Image URL',
        name: 'image',
        type: 'string'
      },
      promo_conversion_rate: {
        label: 'Promo Conversion Rate',
        name: 'promo_conversion_rate',
        type: 'float',
        readonly: true
      }
    };

    ActiveOffersForm.prototype.onSaveSuccess = function() {
      return $('#saveSuccess').modal();
    };

    ActiveOffersForm.prototype.onDeleteSuccess = function() {
      return $('#deleteSuccess').modal();
    };

    ActiveOffersForm.prototype.onBackAction = function(e) {
      e.preventDefault();
      return this.goBack();
    };

    ActiveOffersForm.prototype.goBack = function(e, record, response) {
      var recordId;
      AP.router.navigate('#program-settings/' + this.programId, {
        trigger: true
      });
      return recordId = null;
    };

    return ActiveOffersForm;

  })(AP.view.ModelFormPage);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.Breadcrumbs = (function(_super) {
    __extends(Breadcrumbs, _super);

    function Breadcrumbs() {
      return Breadcrumbs.__super__.constructor.apply(this, arguments);
    }

    Breadcrumbs.prototype.template = '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  <li><a href="#messages">Messaging</a></li>\n  <li class="pull-right"><a href="#logout">sign-out</a></li>\n</ol>';

    return Breadcrumbs;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ColorSettingsForm = (function(_super) {
    __extends(ColorSettingsForm, _super);

    function ColorSettingsForm() {
      return ColorSettingsForm.__super__.constructor.apply(this, arguments);
    }

    ColorSettingsForm.prototype.className = '';

    ColorSettingsForm.prototype.title = '';

    ColorSettingsForm.prototype.showIdField = true;

    ColorSettingsForm.prototype.record = null;

    ColorSettingsForm.prototype.recordId = null;

    ColorSettingsForm.prototype.programId = null;

    ColorSettingsForm.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;

    ColorSettingsForm.prototype.query = {
      id: ColorSettingsForm.recordId
    };

    ColorSettingsForm.prototype.showCancelButton = true;

    ColorSettingsForm.prototype.showDeleteButton = false;

    ColorSettingsForm.prototype.initializeItems = function() {
      ColorSettingsForm.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        record: this.record,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>\n  <li><a href="#color-settings/{%- programId %}">Color Settings</a></li>\n  {% if(recordId){ %}  \n  <li>Edit Color Settings</li>\n  {% } else { %} \n  <li>Add New Color Settings</li>\n  {% } %}\n</ol>'
      }));
      if (this.recordId) {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Edit Color Settings\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      } else {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Add New Color Settings\n    <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      }
      return this.add(new AP.view.component.Modal({
        record: this.record
      }));
    };

    ColorSettingsForm.prototype.formFields = {
      program_level_id: {
        label: 'Program Level ID',
        name: 'program_level_id',
        type: 'string',
        required: true,
        readonly: true
      },
      color_id: {
        label: 'Color ID',
        name: 'color_id',
        type: 'string',
        required: true
      },
      color_argb: {
        label: 'Color ARGB',
        name: 'color_argb',
        type: 'string',
        required: true,
        help: 'Entry must be in hexidecimal number format, e.g. #12A34B'
      }
    };

    ColorSettingsForm.prototype.onSaveSuccess = function() {
      return $('#saveSuccess').modal();
    };

    ColorSettingsForm.prototype.onBackAction = function(e) {
      e.preventDefault();
      return this.goBack();
    };

    ColorSettingsForm.prototype.goBack = function(e, record, response) {
      return AP.router.navigate('#color-settings/' + this.programId, {
        trigger: true
      });
    };

    return ColorSettingsForm;

  })(AP.view.ModelFormPage);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ColorSettingsPage = (function(_super) {
    __extends(ColorSettingsPage, _super);

    function ColorSettingsPage() {
      return ColorSettingsPage.__super__.constructor.apply(this, arguments);
    }

    ColorSettingsPage.prototype.title = '';

    ColorSettingsPage.prototype.programId = null;

    ColorSettingsPage.prototype.items = [
      {
        name: 'AP.view.View ',
        template: '<h3 class="sub-header">Color Settings</h3>'
      }
    ];

    ColorSettingsPage.prototype.initializeItems = function() {
      ColorSettingsPage.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        record: this.record,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>\n  <li>Color Settings</li>\n</ol>'
      }));
      return this.add(new AP.view.DataTable({
        collection: 'ColorSwatchExactMatch',
        query: {
          program_level_id: this.programId
        },
        striped: true,
        head: new AP.view.TableRow({
          template: '<th>Action</th>\n<!-- th>ID</th -->\n<!-- th>Program Level ID</th -->\n<th>Color ID</th>\n<th>Color #HEX</th>\n<th>Color Swatch</th>'
        }),
        itemTpl: '<td><a href="#color-settings/edit/{%- program_level_id %}/{%- id %}">edit</a></td>\n<!-- td>{%- id %}</td -->\n<!-- td>{%- program_level_id %}</td -->\n<td>{%- color_id %}</td>\n<td>{%- color_argb %}</td>\n<td><div style="border:1px solid #ccc;width:100px;height:20px;background-color:{%- color_argb %};display:block;overflow:hidden;">&nbsp;</div></td>'
      }));
    };

    return ColorSettingsPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.FaqForm = (function(_super) {
    __extends(FaqForm, _super);

    function FaqForm() {
      return FaqForm.__super__.constructor.apply(this, arguments);
    }

    FaqForm.prototype.className = '';

    FaqForm.prototype.title = '';

    FaqForm.prototype.backButton = true;

    FaqForm.prototype.programId = null;

    FaqForm.prototype.recordId = null;

    FaqForm.prototype.model = LoyaltyRtrSdk.models.BankFaq;

    FaqForm.prototype.query = {
      id: FaqForm.recordId
    };

    FaqForm.prototype.showCancelButton = true;

    FaqForm.prototype.showDeleteButton = true;

    FaqForm.prototype.formFields = {
      program_level_id: {
        label: 'Program Level ID',
        name: 'program_level_id',
        type: 'text',
        required: true,
        readonly: true,
        hidden: true
      },
      question: {
        label: 'Question',
        name: 'question',
        type: 'textarea',
        required: true
      },
      answer: {
        label: 'Answer',
        name: 'answer',
        type: 'textarea',
        required: true
      }
    };

    FaqForm.prototype.initializeItems = function() {
      FaqForm.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        record: this.record,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>\n  <li><a href="#faq-settings/{%- programId %}">FAQ Settings</a></li>\n  {% if(recordId){ %}  \n  <li>Edit FAQ &amp; Answer</li>\n  {% } else { %} \n  <li>Add New FAQ &amp; Answer</li>\n  {% } %}\n</ol>'
      }));
      if (this.recordId) {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Edit FAQ &amp; Answer\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      } else {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Add New FAQ &amp; Answer\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      }
      return this.add(new AP.view.component.Modal({
        record: this.record
      }));
    };

    FaqForm.prototype.onSaveSuccess = function() {
      return $('#saveSuccess').modal();
    };

    FaqForm.prototype.onDeleteSuccess = function() {
      return $('#deleteSuccess').modal();
    };

    FaqForm.prototype.onBackAction = function(e) {
      e.preventDefault();
      return this.goBack();
    };

    FaqForm.prototype.goBack = function() {
      return AP.router.navigate('#faq-settings/' + this.programId, {
        trigger: true
      });
    };

    return FaqForm;

  })(AP.view.ModelFormPage);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.FaqPage = (function(_super) {
    __extends(FaqPage, _super);

    function FaqPage() {
      return FaqPage.__super__.constructor.apply(this, arguments);
    }

    FaqPage.prototype.title = '';

    FaqPage.prototype.programId = null;

    FaqPage.prototype.recordId = null;

    FaqPage.prototype.initializeItems = function() {
      FaqPage.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        record: this.record,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>\n  <li>FAQ Settings</li>\n</ol>'
      }));
      this.add(new AP.view.Button({
        id: 'new-faq',
        className: 'btn pull-right',
        text: 'Add New FAQ &amp; Answer',
        ui: 'primary',
        attributes: {
          href: "#faq/new/" + this.programId
        },
        preventDefaultClickAction: false
      }));
      this.add(new AP.view.View({
        template: '<h3 class="sub-header">FAQ Settings</h3>'
      }));
      return this.add(new AP.view.DataTable({
        id: 'bank-faqs',
        collection: 'BankFaqByProgramLevelId',
        query: {
          program_level_id: this.programId
        },
        striped: true,
        head: new AP.view.TableRow({
          template: '<th>Action</th>\n<!-- th>ID</th -->\n<!-- th>Program Level ID</th -->\n<th>Question</th>\n<th>Answer</th>'
        }),
        itemTpl: '<td><a href="#faq/edit/{%- program_level_id %}/{%- id %}">edit</a></td>\n<!-- td>{%- id %}</td -->\n<!-- td>{%- program_level_id %}</td -->\n<td>{%- question %}</td>\n<td>{%- answer %}</td>'
      }));
    };

    return FaqPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.LanguageSettingsForm = (function(_super) {
    __extends(LanguageSettingsForm, _super);

    function LanguageSettingsForm() {
      return LanguageSettingsForm.__super__.constructor.apply(this, arguments);
    }

    LanguageSettingsForm.prototype.className = '';

    LanguageSettingsForm.prototype.title = '';

    LanguageSettingsForm.prototype.showIdField = true;

    LanguageSettingsForm.prototype.recordId = null;

    LanguageSettingsForm.prototype.programId = null;

    LanguageSettingsForm.prototype.model = LoyaltyRtrSdk.models.LanguageString;

    LanguageSettingsForm.prototype.query = {
      id: LanguageSettingsForm.recordId
    };

    LanguageSettingsForm.prototype.showCancelButton = true;

    LanguageSettingsForm.prototype.initializeItems = function() {
      LanguageSettingsForm.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#program-settings/{%- programId %}">Bank Settings</a></li>\n  <li><a href="#language-settings/{%- programId %}">Language Settings</a></li>\n  <li>{% if(recordId){%}Edit{% } else { %}New{% } %} Language Settings</li>\n</ol>'
      }));
      if (this.recordId) {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Edit Language Settings\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      } else {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Add New Language Settings\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      }
      return this.add(new AP.view.component.Modal);
    };

    LanguageSettingsForm.prototype.formFields = {
      program_level_id: {
        label: 'Program Level ID',
        name: 'program_level_id',
        required: true,
        readonly: true,
        hidden: true
      },
      fallback: {
        label: 'Bank Default',
        name: 'fallback',
        type: 'fallback',
        required: true
      },
      label_id: {
        label: 'Label ID',
        name: 'label_id',
        type: 'string',
        required: true
      },
      value: {
        label: 'English Value',
        name: 'value',
        type: 'string',
        required: true
      },
      language_code: {
        label: 'Language Code',
        name: 'language_code',
        type: 'language_code',
        required: true
      }
    };

    LanguageSettingsForm.prototype.onSaveSuccess = function(e, record, response) {
      return $('#saveSuccess').modal();
    };

    LanguageSettingsForm.prototype.onBackAction = function(e) {
      e.preventDefault();
      return this.goBack();
    };

    LanguageSettingsForm.prototype.goBack = function() {
      return AP.router.navigate('#language-settings/' + this.programId, {
        trigger: true
      });
    };

    return LanguageSettingsForm;

  })(AP.view.ModelFormPage);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.LanguageSettingsPage = (function(_super) {
    __extends(LanguageSettingsPage, _super);

    function LanguageSettingsPage() {
      return LanguageSettingsPage.__super__.constructor.apply(this, arguments);
    }

    LanguageSettingsPage.prototype.title = '';

    LanguageSettingsPage.prototype.programId = null;

    LanguageSettingsPage.prototype.initializeItems = function() {
      LanguageSettingsPage.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        template: '<ol class="breadcrumb">\n  <li><a href="#program-settings/{%- programId %}">Bank Settings</a></li>\n  <li>Language Settings</li>\n</ol>'
      }));
      this.add(new AP.view.View({
        programId: this.programId,
        template: '<h3 class="sub-header">Language Settings <a class="btn btn-primary pull-right" href="#language-settings/new/{%- programId %}">Add new Language Setting</a></h3>'
      }));
      return this.add(new AP.view.DataTable({
        id: 'bank-faqs',
        collection: 'LanguageStringExactMatch',
        query: {
          program_level_id: this.programId
        },
        striped: true,
        head: new AP.view.TableRow({
          template: '<th>Action</th>\n<th>Bank Default</th>\n<th class="col-sm-4">Label ID</th>\n<th class="col-sm-4">English Value</th>\n<th class="col-sm-2">Language Code</th>'
        }),
        itemTpl: '<td><a href="#language-settings/edit/{%- program_level_id %}/{%- id %}">edit</td>\n<td>{%- fallback %}</td>\n<td>{%- label_id %}</td>\n<td>{%- value %}</td>\n<td>{%- language_code %}</td>'
      }));
    };

    return LanguageSettingsPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.LoginForm = (function(_super) {
    __extends(LoginForm, _super);

    function LoginForm() {
      return LoginForm.__super__.constructor.apply(this, arguments);
    }

    LoginForm.prototype.initialize = function() {
      return LoginForm.__super__.initialize.apply(this, arguments);
    };

    LoginForm.prototype.template = '<div class="row">\n  <div class="text-center">\n    <h3 class="text-center sub-header">Administrator Login</h3>\n  </div>\n</div>\n<div class="container">\n      <div class="row">\n      <div class="col-md-4 col-md-offset-4">\n              <form accept-charset="UTF-8" role="form">\n                  <div class="form-group">\n                    <label>User Name</label>\n                    <input class="form-control" placeholder="Username" name="username" type="text">\n                  </div>\n                  <div class="form-group">\n                      <label>Password</label>\n                      <input class="form-control" placeholder="Password" name="password" type="password" value="">\n                  </div>\n                  <input class="btn btn-lg btn-primary btn-block" type="submit" value="Login">\n                </form>\n      </div>\n    </div>\n  </div>';

    LoginForm.prototype.save = function() {
      var values;
      values = this.getValues();
      return AP.auth.Authentication.login({
        username: values.username,
        password: values.password
      });
    };

    return LoginForm;

  })(AP.view.Form);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.LoginPage = (function(_super) {
    __extends(LoginPage, _super);

    function LoginPage() {
      return LoginPage.__super__.constructor.apply(this, arguments);
    }

    LoginPage.prototype.className = '';

    LoginPage.prototype.title = '';

    LoginPage.prototype.initialize = function() {
      LoginPage.__super__.initialize.apply(this, arguments);
      return this.add(new AP.view.component.LoginForm);
    };

    return LoginPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.MessagesForm = (function(_super) {
    __extends(MessagesForm, _super);

    function MessagesForm() {
      return MessagesForm.__super__.constructor.apply(this, arguments);
    }

    MessagesForm.prototype.className = '';

    MessagesForm.prototype.title = '';

    MessagesForm.prototype.initializeItems = function() {
      MessagesForm.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        record: this.record,
        recordId: this.recordId,
        template: '<ol class="breadcrumb">\n  <li><a href="#messages">Messages</a></li>\n  <li>Add New Message</li>\n</ol>'
      }));
      return this.add(new AP.view.View({
        template: '<h3 class="sub-header">Add New Message</h3>'
      }));
    };

    MessagesForm.prototype.model = LoyaltyRtrSdk.models.Message;

    MessagesForm.prototype.formFields = {
      ranac: {
        label: 'ranac',
        name: 'ranac',
        type: 'string',
        required: true
      },
      program_level_id: {
        label: 'Program Level ID',
        name: 'program_level_id',
        type: 'string',
        required: true
      },
      points_redeemed: {
        label: 'Points Redeemed',
        name: 'points_redeemed',
        type: 'string',
        required: true
      },
      points_available: {
        label: 'Points Available',
        name: 'points_available',
        type: 'string',
        required: true
      }
    };

    MessagesForm.prototype.goBack = function() {
      return AP.router.navigate('messages', {
        trigger: true
      });
    };

    MessagesForm.prototype.showCancelButton = true;

    MessagesForm.prototype.showDeleteButton = true;

    return MessagesForm;

  })(AP.view.ModelFormPage);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.MessagesPage = (function(_super) {
    __extends(MessagesPage, _super);

    function MessagesPage() {
      return MessagesPage.__super__.constructor.apply(this, arguments);
    }

    MessagesPage.prototype.title = '';

    MessagesPage.prototype.className = 'messages-page';

    MessagesPage.prototype.initializeItems = function() {
      this.add(new AP.view.Button({
        id: 'btn-new-message',
        className: 'btn pull-right',
        text: 'Add New Message',
        ui: 'primary',
        attributes: {
          href: "#message/new"
        },
        preventDefaultClickAction: false
      }));
      this.add(new AP.view.View({
        template: '<h3 class="sub-header">Messages</h3>'
      }));
      return this.add(new AP.view.DataTable({
        collection: 'MessageAll',
        striped: true,
        head: new AP.view.TableRow({
          template: '<th>ID</th>\n<th>Created On</th>\n<th>Message</th>\n<th>Last Four Digits</th>\n<th>Ranac</th>\n<th>Program Level ID</th>\n<th>Points Redeemed</th>\n<th>Points Available</th>'
        }),
        itemTpl: '<td>{%- id %}</td> \n<td>{%- created_on %}</td> \n<td>{%- body %}</td> \n<td>{%- last_four_digits %}</td>\n<td>{%- ranac %}</td> \n<td>{%- program_level_id %}</td> \n<td>{%- points_redeemed %}</td> \n<td>{%- points_available %}</td> '
      }));
    };

    return MessagesPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.Modal = (function(_super) {
    __extends(Modal, _super);

    function Modal() {
      return Modal.__super__.constructor.apply(this, arguments);
    }

    Modal.prototype.initialize = function() {
      return Modal.__super__.initialize.apply(this, arguments);
    };

    Modal.prototype.template = '<!-- Save Modal -->\n<div class="modal fade" id="saveSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4 class="modal-title" id="myModalLabel">Saved Successfully</h4>\n      </div>\n      <div class="modal-body">\n        You changes have been saved.\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">continue editing</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Delete Modal -->\n<div class="modal fade" id="deleteSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h4 class="modal-title" id="myModalLabel">Delete Success</h4>\n      </div>\n      <div class="modal-body">\n        Your entry has been deleted.\n      </div>\n      <div class="modal-footer">\n        <button class="btn btn-primary ap-back pull-right" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>';

    return Modal;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramForm = (function(_super) {
    __extends(ProgramForm, _super);

    function ProgramForm() {
      return ProgramForm.__super__.constructor.apply(this, arguments);
    }

    ProgramForm.prototype.className = '';

    ProgramForm.prototype.title = '';

    ProgramForm.prototype.recordId = null;

    ProgramForm.prototype.programId = null;

    ProgramForm.prototype.model = LoyaltyRtrSdk.models.Bank;

    ProgramForm.prototype.showCancelButton = true;

    ProgramForm.prototype.showDeleteButton = false;

    ProgramForm.prototype.initializeItems = function() {
      ProgramForm.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.View({
        programId: this.programId,
        recordId: this.recordId,
        record: this.record,
        template: '<ol class="breadcrumb">\n  <li><a href="#programs">Programs</a></li>\n  {% if(recordId) { %} \n  <li><a href="#program-settings/{%- programId %}">{%- name %} Settings</a></li> \n  <li>Edit {%- name %} Program</li>\n  {% } else { %}\n  <li>Add New Program</li>\n  {% } %}\n</ol>'
      }));
      if (this.programId) {
        this.add(new AP.view.View({
          record: this.record,
          template: '<h3 class="sub-header">Edit {%- name %} Program\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      } else {
        this.add(new AP.view.View({
          template: '<h3 class="sub-header">Add New Program\n  <a class="btn btn-primary ap-back pull-right">Back</a>\n  </h3>'
        }));
      }
      return this.add(new AP.view.component.Modal({
        record: this.record
      }));
    };

    ProgramForm.prototype.formFields = {
      bank_name: {
        label: 'Bank Name',
        name: 'name',
        type: 'string',
        required: true
      },
      is_active: {
        label: 'Status',
        name: 'is_active',
        type: 'is_active'
      },
      program_level_id: {
        label: 'Program Level ID',
        name: 'program_level_id',
        type: 'string',
        required: true
      },
      offers: {
        label: 'Offers',
        name: 'earn_offer_label',
        type: 'textarea'
      },
      contact_info: {
        label: 'Contact Number',
        name: 'contact_info',
        type: 'string'
      },
      image_url: {
        label: 'Image URL',
        name: 'image_url',
        type: 'string'
      },
      icon: {
        label: 'Icon URL',
        name: 'icon',
        type: 'string'
      },
      tc_url: {
        label: 'Terms & Conditions URL',
        name: 'tc_url',
        type: 'string'
      },
      tc_summary: {
        label: 'Terms & Conditions Summary',
        name: 'tc_summary',
        type: 'string'
      },
      tc_last_updated_on: {
        label: 'Terms & Conditions Summary Last Updated On',
        name: 'tc_last_update_on',
        type: 'date'
      },
      default_currency: {
        label: 'Default Currency',
        name: 'default_currency',
        type: 'default_currency'
      },
      mobile_site_url: {
        label: 'Mobile Site URL',
        name: 'mobile_site_url',
        type: 'text'
      },
      ios_url: {
        label: 'iOS URL',
        name: 'ios_url',
        type: 'text'
      },
      android_url: {
        label: 'Android URL',
        name: 'android_url',
        type: 'text'
      }
    };

    ProgramForm.prototype.onSaveSuccess = function() {
      return $('#saveSuccess').modal();
    };

    ProgramForm.prototype.onBackAction = function(e) {
      e.preventDefault();
      return this.goBack();
    };

    ProgramForm.prototype.goBack = function(e, record, response) {
      return AP.router.navigate('#program-settings/' + this.programId, {
        trigger: true
      });
    };

    return ProgramForm;

  })(AP.view.ModelFormPage);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramNewButton = (function(_super) {
    __extends(ProgramNewButton, _super);

    function ProgramNewButton() {
      return ProgramNewButton.__super__.constructor.apply(this, arguments);
    }

    ProgramNewButton.prototype.className = 'btn pull-right';

    ProgramNewButton.prototype.text = 'Add New Program';

    ProgramNewButton.prototype.ui = 'primary';

    ProgramNewButton.prototype.preventDefaultClickAction = false;

    ProgramNewButton.prototype.attributes = {
      href: '#program/new'
    };

    return ProgramNewButton;

  })(AP.view.Button);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramPage = (function(_super) {
    __extends(ProgramPage, _super);

    function ProgramPage() {
      return ProgramPage.__super__.constructor.apply(this, arguments);
    }

    ProgramPage.prototype.title = '';

    ProgramPage.prototype.initializeItems = function() {
      this.add(new AP.view.View({
        items: ['ProgramSearch', 'ProgramNewButton']
      }));
      return this.add(new AP.view.DataTable({
        collection: 'BankAll',
        striped: true,
        head: new AP.view.TableRow({
          template: '<!--th>ID</th-->\n<th>Status</th>\n<th>Bank Name</th>\n<th>Program Level ID</th>\n<th>Last Updated</th>'
        }),
        itemTpl: '<!--td>{%- id %}</td--> \n<td><span class="label label-{% if (is_active) { %}info{% } else { %}danger {% } %}">{% if (is_active) { %} active{% } else { %}inactive {% } %}</span></td>\n<td><a class="bankName" href="#program-settings/{%- program_level_id %}">{%- name %}</a></td> \n<td>{%- program_level_id %}</td> \n<td>{%- tc_last_update_on %}</td> '
      }));
    };

    return ProgramPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramSearch = (function(_super) {
    __extends(ProgramSearch, _super);

    function ProgramSearch() {
      return ProgramSearch.__super__.constructor.apply(this, arguments);
    }

    ProgramSearch.prototype.className = 'pull-left';

    ProgramSearch.prototype.template = '<form class="navbar-form" role="search">\n        <div class="form-group">\n          <input type="text" class="form-control" placeholder="Search">\n        </div>\n        <button type="submit" class="btn btn-default">Submit</button>\n      </form>';

    return ProgramSearch;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramSettingButtons = (function(_super) {
    __extends(ProgramSettingButtons, _super);

    function ProgramSettingButtons() {
      return ProgramSettingButtons.__super__.constructor.apply(this, arguments);
    }

    ProgramSettingButtons.prototype.className = 'text-center program-setting-buttons';

    ProgramSettingButtons.prototype.initializeItems = function() {
      ProgramSettingButtons.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.Button({
        id: 'language-settings',
        className: 'btn btn-primary btn-lg',
        text: 'Language Settings',
        ui: 'primary',
        attributes: {
          href: "#language-settings/" + this.programId
        },
        preventDefaultClickAction: false
      }));
      this.add(new AP.view.Button({
        id: 'faq-settings',
        className: 'btn btn-primary btn-lg',
        text: 'FAQ Settings',
        ui: 'primary',
        attributes: {
          href: "#faq-settings/" + this.programId
        },
        preventDefaultClickAction: false
      }));
      return this.add(new AP.view.Button({
        id: 'color-settings',
        className: 'btn btn-primary btn-lg',
        text: 'Color Settings',
        ui: 'primary',
        attributes: {
          href: "#color-settings/" + this.programId
        },
        preventDefaultClickAction: false
      }));
    };

    return ProgramSettingButtons;

  })(AP.view.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramSettingsPage = (function(_super) {
    __extends(ProgramSettingsPage, _super);

    function ProgramSettingsPage() {
      return ProgramSettingsPage.__super__.constructor.apply(this, arguments);
    }

    ProgramSettingsPage.prototype.title = '';

    ProgramSettingsPage.prototype.programId = null;

    ProgramSettingsPage.prototype.programName = null;

    ProgramSettingsPage.prototype.items = [
      'ProgramSettingsView', {
        name: 'AP.view.View',
        template: '<h3 class="sub-header">Active Offers <a class="btn btn-primary pull-right" href="#program-offer/new/{%- program_level_id %}">Add a new offer</a></h3>'
      }
    ];

    ProgramSettingsPage.prototype.initializeItems = function() {
      ProgramSettingsPage.__super__.initializeItems.apply(this, arguments);
      this.add(new AP.view.component.ActiveOffers({
        programId: this.programId,
        recordName: this.record.get('name'),
        record: this.record
      }));
      return this.add(new AP.view.component.ProgramSettingButtons({
        programId: this.programId
      }));
    };

    return ProgramSettingsPage;

  })(AP.view.Page);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AP.view.component.ProgramSettingsView = (function(_super) {
    __extends(ProgramSettingsView, _super);

    function ProgramSettingsView() {
      return ProgramSettingsView.__super__.constructor.apply(this, arguments);
    }

    ProgramSettingsView.prototype.className = 'row';

    ProgramSettingsView.prototype.programId = ProgramSettingsView.programId;

    ProgramSettingsView.prototype.record = ProgramSettingsView.record;

    ProgramSettingsView.prototype.template = '      \n  <ol class="breadcrumb">\n    <li><a href="#programs">Programs</a></li>\n    <li>{%- name %} Settings</li>\n  </ol>\n\n\n  <div id="bank-information" class="col-xs-12 col-sm-8">\n      <div class="page-header"><h3>{%- name %} Settings <a class="btn btn-primary pull-right" href="#program/edit/{%- program_level_id %}/{%- id %}">edit</a></h3></div>\n      <div class="col-sm-12 col-lg-6">\n        <ul>\n          <li><label>Bank Name</label><span>{%- name %}</span></li>\n          <li><label>Program Level ID</label><span>{%- program_level_id %}</span></li>\n          <li><label>Contact Number</label>\n            <span>\n              {% if(contact_info) {%}\n                {%- contact_info %}\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          </li>\n          <li><label>Image URL</label>\n            <span>\n              {% if(image_url) {%}\n                <a href="{%- image_url %}" target="_blank">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            <span>\n          </li>\n          <li><label>Splash Page URL</label>\n            <span>\n              {% if(loading_image_url) {%}\n                <a href="{%- loading_image_url %}" target="_blank">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          </li>\n          <li><label>Icon URL</label>\n            <span>\n              {% if(icon) {%}\n                <a href="{%- icon %}" target="_blank">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          </li>\n          <li><label>Terms & Conditions URL</label>\n            <span>\n              {% if(tc_url) {%}\n                <a href="{%- tc_url %}" target="_blank" title="{%- tc_url %}">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          <li><label>Terms &amp; Conditions Summary</label>\n              {% if(tc_summary) {%}\n                <span id="TC-Summary" data-trigger="click hover focus" data-toggle="tooltip" data-delay="1" data-container="bank-information" title="{%- tc_summary %}">Summary</span>\n              {%} else {%}\n                &mdash;\n              {% } %}\n              {% if(tc_last_update_on) {%}\n              <sup>Terms &amp; Conditions Summary Last Updated {%- tc_last_update_on%}</sup>\n              {%} else {} %}\n          </li>\n        </ul>\n      </div> \n      <div class="col-sm-12 col-lg-6">\n        <ul>\n          <li><label>Default Currency</label>\n          <span>\n            {% if(default_currency) {%}\n                {%- default_currency %}\n              {%} else {%}\n                &mdash;\n              {% } %}\n          </span></li>\n          <li><label>Moble Site URL</label>\n            <span>\n              {% if(mobile_site_url) {%}\n                <a href="{%- mobile_site_url %}" target="_blank">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          </li>\n          <li><label>iOS URL</label>\n            <span>\n              {% if(ios_url) {%}\n                <a href="{%- ios_url %}" target="_blank">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          </li>\n          <li><label>Android URL</label>\n            <span>\n              {% if(android_url) {%}\n                <a href="{%- android_url %}" target="_blank">click here to view</a>\n              {%} else {%}\n                &mdash;\n              {% } %}\n            </span>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div id="branding-image" class="col-xs-12 col-sm-4">\n        <div class="text-center">\n          \n          <img src="{%- image_url%}" alt="{%- name %}" name="{%- name %}" width="300" />\n          <br /><br />\n          <div class="col-xs-12">Status: <span class="cols-xs-12 label label-{% if (is_active) { %}info{% } else { %}danger {% } %}">{% if (is_active) { %} active{% } else { %}inactive {% } %}</span></div>\n        </div>\n      </div> \n    <hr class="col-xs-12"/>';

    return ProgramSettingsView;

  })(AP.view.View);

}).call(this);

(function() {
  $(function() {
    LoyaltyRtrSdk.getView = function(str) {
      if (str) {
        return _.find(this.views, function(val, key) {
          var _ref;
          return key === str || ((_ref = val.prototype.id) != null ? _ref.toString() : void 0) === str.toString();
        }) || AP.getView(str);
      }
    };
    LoyaltyRtrSdk.init();
    AP.baseUrl = 'https://damp-taiga-1957.herokuapp.com';
    return new AP.controller.component.Main;
  });

}).call(this);
