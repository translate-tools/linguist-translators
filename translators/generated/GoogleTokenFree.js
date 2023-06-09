var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var axios$4 = {exports: {}};

'use strict';

var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

var bind$3 = /*@__PURE__*/getDefaultExportFromCjs(bind$2);

'use strict';

var bind$1 = bind$2;

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils$8 = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

var utils$9 = /*@__PURE__*/getDefaultExportFromCjs(utils$8);

'use strict';

var utils$7 = utils$8;

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL$1 = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$7.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils$7.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils$7.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils$7.forEach(val, function parseValue(v) {
        if (utils$7.isDate(v)) {
          v = v.toISOString();
        } else if (utils$7.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

var buildURL$2 = /*@__PURE__*/getDefaultExportFromCjs(buildURL$1);

'use strict';

var utils$6 = utils$8;

function InterceptorManager$1() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager$1.prototype.forEach = function forEach(fn) {
  utils$6.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager$1;

var InterceptorManager$2 = /*@__PURE__*/getDefaultExportFromCjs(InterceptorManager_1);

'use strict';

var utils$5 = utils$8;

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils$5.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

var normalizeHeaderName$1 = /*@__PURE__*/getDefaultExportFromCjs(normalizeHeaderName);

'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};

var enhanceError$1 = /*@__PURE__*/getDefaultExportFromCjs(enhanceError);

var createError;
var hasRequiredCreateError;

function requireCreateError () {
	if (hasRequiredCreateError) return createError;
	hasRequiredCreateError = 1;
	'use strict';

	var enhanceError$1 = enhanceError;

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	createError = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError$1(error, config, code, request, response);
	};
	return createError;
}

var settle;
var hasRequiredSettle;

function requireSettle () {
	if (hasRequiredSettle) return settle;
	hasRequiredSettle = 1;
	'use strict';

	var createError = requireCreateError();

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	settle = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};
	return settle;
}

var cookies;
var hasRequiredCookies;

function requireCookies () {
	if (hasRequiredCookies) return cookies;
	hasRequiredCookies = 1;
	'use strict';

	var utils = utils$8;

	cookies = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));

	          if (utils.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }

	          if (utils.isString(path)) {
	            cookie.push('path=' + path);
	          }

	          if (utils.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }

	          if (secure === true) {
	            cookie.push('secure');
	          }

	          document.cookie = cookie.join('; ');
	        },

	        read: function read(name) {
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },

	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);
	return cookies;
}

var isAbsoluteURL;
var hasRequiredIsAbsoluteURL;

function requireIsAbsoluteURL () {
	if (hasRequiredIsAbsoluteURL) return isAbsoluteURL;
	hasRequiredIsAbsoluteURL = 1;
	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	isAbsoluteURL = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};
	return isAbsoluteURL;
}

var combineURLs;
var hasRequiredCombineURLs;

function requireCombineURLs () {
	if (hasRequiredCombineURLs) return combineURLs;
	hasRequiredCombineURLs = 1;
	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	combineURLs = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};
	return combineURLs;
}

var buildFullPath;
var hasRequiredBuildFullPath;

function requireBuildFullPath () {
	if (hasRequiredBuildFullPath) return buildFullPath;
	hasRequiredBuildFullPath = 1;
	'use strict';

	var isAbsoluteURL = requireIsAbsoluteURL();
	var combineURLs = requireCombineURLs();

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 * @returns {string} The combined full path
	 */
	buildFullPath = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	};
	return buildFullPath;
}

var parseHeaders;
var hasRequiredParseHeaders;

function requireParseHeaders () {
	if (hasRequiredParseHeaders) return parseHeaders;
	hasRequiredParseHeaders = 1;
	'use strict';

	var utils = utils$8;

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	parseHeaders = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};
	return parseHeaders;
}

var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;

function requireIsURLSameOrigin () {
	if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
	hasRequiredIsURLSameOrigin = 1;
	'use strict';

	var utils = utils$8;

	isURLSameOrigin = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;

	      /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	      function resolveURL(url) {
	        var href = url;

	        if (msie) {
	        // IE needs attribute set twice to normalize properties
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }

	        urlParsingNode.setAttribute('href', href);

	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }

	      originURL = resolveURL(window.location.href);

	      /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);
	return isURLSameOrigin;
}

var Cancel_1;
var hasRequiredCancel;

function requireCancel () {
	if (hasRequiredCancel) return Cancel_1;
	hasRequiredCancel = 1;
	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	Cancel_1 = Cancel;
	return Cancel_1;
}

var xhr;
var hasRequiredXhr;

function requireXhr () {
	if (hasRequiredXhr) return xhr;
	hasRequiredXhr = 1;
	'use strict';

	var utils = utils$8;
	var settle = requireSettle();
	var cookies = requireCookies();
	var buildURL = buildURL$1;
	var buildFullPath = requireBuildFullPath();
	var parseHeaders = requireParseHeaders();
	var isURLSameOrigin = requireIsURLSameOrigin();
	var createError = requireCreateError();
	var defaults = requireDefaults();
	var Cancel = requireCancel();

	xhr = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	    var responseType = config.responseType;
	    var onCanceled;
	    function done() {
	      if (config.cancelToken) {
	        config.cancelToken.unsubscribe(onCanceled);
	      }

	      if (config.signal) {
	        config.signal.removeEventListener('abort', onCanceled);
	      }
	    }

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    var fullPath = buildFullPath(config.baseURL, config.url);
	    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    function onloadend() {
	      if (!request) {
	        return;
	      }
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
	        request.responseText : request.response;
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(function _resolve(value) {
	        resolve(value);
	        done();
	      }, function _reject(err) {
	        reject(err);
	        done();
	      }, response);

	      // Clean up request
	      request = null;
	    }

	    if ('onloadend' in request) {
	      // Use onloadend if available
	      request.onloadend = onloadend;
	    } else {
	      // Listen for ready state to emulate onloadend
	      request.onreadystatechange = function handleLoad() {
	        if (!request || request.readyState !== 4) {
	          return;
	        }

	        // The request errored out and we didn't get a response, this will be
	        // handled by onerror instead
	        // With one exception: request that using file: protocol, most browsers
	        // will return status as 0 even though it's a successful request
	        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	          return;
	        }
	        // readystate handler is calling before onerror or ontimeout handlers,
	        // so we should call onloadend on the next 'tick'
	        setTimeout(onloadend);
	      };
	    }

	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }

	      reject(createError('Request aborted', config, 'ECONNABORTED', request));

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
	      var transitional = config.transitional || defaults.transitional;
	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }
	      reject(createError(
	        timeoutErrorMessage,
	        config,
	        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (!utils.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    }

	    // Add responseType to request if needed
	    if (responseType && responseType !== 'json') {
	      request.responseType = config.responseType;
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken || config.signal) {
	      // Handle cancellation
	      // eslint-disable-next-line func-names
	      onCanceled = function(cancel) {
	        if (!request) {
	          return;
	        }
	        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
	        request.abort();
	        request = null;
	      };

	      config.cancelToken && config.cancelToken.subscribe(onCanceled);
	      if (config.signal) {
	        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
	      }
	    }

	    if (!requestData) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};
	return xhr;
}

var defaults_1;
var hasRequiredDefaults;

function requireDefaults () {
	if (hasRequiredDefaults) return defaults_1;
	hasRequiredDefaults = 1;
	'use strict';

	var utils = utils$8;
	var normalizeHeaderName$1 = normalizeHeaderName;
	var enhanceError$1 = enhanceError;

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = requireXhr();
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = requireXhr();
	  }
	  return adapter;
	}

	function stringifySafely(rawValue, parser, encoder) {
	  if (utils.isString(rawValue)) {
	    try {
	      (parser || JSON.parse)(rawValue);
	      return utils.trim(rawValue);
	    } catch (e) {
	      if (e.name !== 'SyntaxError') {
	        throw e;
	      }
	    }
	  }

	  return (encoder || JSON.stringify)(rawValue);
	}

	var defaults = {

	  transitional: {
	    silentJSONParsing: true,
	    forcedJSONParsing: true,
	    clarifyTimeoutError: false
	  },

	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName$1(headers, 'Accept');
	    normalizeHeaderName$1(headers, 'Content-Type');

	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
	      setContentTypeIfUnset(headers, 'application/json');
	      return stringifySafely(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    var transitional = this.transitional || defaults.transitional;
	    var silentJSONParsing = transitional && transitional.silentJSONParsing;
	    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
	    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

	    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        if (strictJSONParsing) {
	          if (e.name === 'SyntaxError') {
	            throw enhanceError$1(e, this, 'E_JSON_PARSE');
	          }
	          throw e;
	        }
	      }
	    }

	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,
	  maxBodyLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  },

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    }
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	defaults_1 = defaults;
	return defaults_1;
}

'use strict';

var utils$4 = utils$8;
var defaults$2 = requireDefaults();

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData$1 = function transformData(data, headers, fns) {
  var context = this || defaults$2;
  /*eslint no-param-reassign:0*/
  utils$4.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

var transformData$2 = /*@__PURE__*/getDefaultExportFromCjs(transformData$1);

var isCancel$1;
var hasRequiredIsCancel;

function requireIsCancel () {
	if (hasRequiredIsCancel) return isCancel$1;
	hasRequiredIsCancel = 1;
	'use strict';

	isCancel$1 = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};
	return isCancel$1;
}

'use strict';

var utils$3 = utils$8;
var transformData = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = requireDefaults();
var Cancel = requireCancel();

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils$3.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils$3.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults$1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

var dispatchRequest$2 = /*@__PURE__*/getDefaultExportFromCjs(dispatchRequest$1);

'use strict';

var utils$2 = utils$8;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig$2 = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
      return utils$2.merge(target, source);
    } else if (utils$2.isPlainObject(source)) {
      return utils$2.merge({}, source);
    } else if (utils$2.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils$2.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

var mergeConfig$3 = /*@__PURE__*/getDefaultExportFromCjs(mergeConfig$2);

var data;
var hasRequiredData;

function requireData () {
	if (hasRequiredData) return data;
	hasRequiredData = 1;
	data = {
	  "version": "0.23.0"
	};
	return data;
}

'use strict';

var VERSION = requireData().version;

var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

var validator$1 = {
  assertOptions: assertOptions,
  validators: validators$1
};

var validator$2 = /*@__PURE__*/getDefaultExportFromCjs(validator$1);

'use strict';

var utils$1 = utils$8;
var buildURL = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var validator = validator$1;

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios$1.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig$1(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios$1;

var Axios$2 = /*@__PURE__*/getDefaultExportFromCjs(Axios_1);

var CancelToken_1;
var hasRequiredCancelToken;

function requireCancelToken () {
	if (hasRequiredCancelToken) return CancelToken_1;
	hasRequiredCancelToken = 1;
	'use strict';

	var Cancel = requireCancel();

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;

	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;

	  // eslint-disable-next-line func-names
	  this.promise.then(function(cancel) {
	    if (!token._listeners) return;

	    var i;
	    var l = token._listeners.length;

	    for (i = 0; i < l; i++) {
	      token._listeners[i](cancel);
	    }
	    token._listeners = null;
	  });

	  // eslint-disable-next-line func-names
	  this.promise.then = function(onfulfilled) {
	    var _resolve;
	    // eslint-disable-next-line func-names
	    var promise = new Promise(function(resolve) {
	      token.subscribe(resolve);
	      _resolve = resolve;
	    }).then(onfulfilled);

	    promise.cancel = function reject() {
	      token.unsubscribe(_resolve);
	    };

	    return promise;
	  };

	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Subscribe to the cancel signal
	 */

	CancelToken.prototype.subscribe = function subscribe(listener) {
	  if (this.reason) {
	    listener(this.reason);
	    return;
	  }

	  if (this._listeners) {
	    this._listeners.push(listener);
	  } else {
	    this._listeners = [listener];
	  }
	};

	/**
	 * Unsubscribe from the cancel signal
	 */

	CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
	  if (!this._listeners) {
	    return;
	  }
	  var index = this._listeners.indexOf(listener);
	  if (index !== -1) {
	    this._listeners.splice(index, 1);
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	CancelToken_1 = CancelToken;
	return CancelToken_1;
}

var spread;
var hasRequiredSpread;

function requireSpread () {
	if (hasRequiredSpread) return spread;
	hasRequiredSpread = 1;
	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};
	return spread;
}

var isAxiosError;
var hasRequiredIsAxiosError;

function requireIsAxiosError () {
	if (hasRequiredIsAxiosError) return isAxiosError;
	hasRequiredIsAxiosError = 1;
	'use strict';

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	isAxiosError = function isAxiosError(payload) {
	  return (typeof payload === 'object') && (payload.isAxiosError === true);
	};
	return isAxiosError;
}

var axios_1 = axios$4.exports;

'use strict';

var utils = utils$8;
var bind = bind$2;
var Axios = Axios_1;
var mergeConfig = mergeConfig$2;
var defaults = requireDefaults();

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios$2 = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios$2.Axios = Axios;

// Expose Cancel & CancelToken
axios$2.Cancel = requireCancel();
axios$2.CancelToken = requireCancelToken();
axios$2.isCancel = requireIsCancel();
axios$2.VERSION = requireData().version;

// Expose all/spread
axios$2.all = function all(promises) {
  return Promise.all(promises);
};
axios$2.spread = requireSpread();

// Expose isAxiosError
axios$2.isAxiosError = requireIsAxiosError();

axios$4.exports = axios$2;

// Allow use of default import syntax in TypeScript
var _default = axios$4.exports.default = axios$2;

var axiosExports = axios$4.exports;
var axios$3 = /*@__PURE__*/getDefaultExportFromCjs(axiosExports);

var axios = axiosExports;

var axios$1 = /*@__PURE__*/getDefaultExportFromCjs(axios);

var queryString = {};

'use strict';
var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var index$4 = /*@__PURE__*/getDefaultExportFromCjs(strictUriEncode);

'use strict';
var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp('(' + token + ')|([^%]+?)', 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return [decodeURIComponent(components.join(''))];
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher) || [];

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher) || [];
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

var decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

var index$3 = /*@__PURE__*/getDefaultExportFromCjs(decodeUriComponent);

'use strict';

var splitOnFirst = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

var index$2 = /*@__PURE__*/getDefaultExportFromCjs(splitOnFirst);

'use strict';
var filterObj = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};

var index$1 = /*@__PURE__*/getDefaultExportFromCjs(filterObj);

(function (exports) {
	'use strict';
	const strictUriEncode$1 = strictUriEncode;
	const decodeComponent = decodeUriComponent;
	const splitOnFirst$1 = splitOnFirst;
	const filterObject = filterObj;

	const isNullOrUndefined = value => value === null || value === undefined;

	function encoderForArrayFormat(options) {
		switch (options.arrayFormat) {
			case 'index':
				return key => (result, value) => {
					const index = result.length;

					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, [encode(key, options), '[', index, ']'].join('')];
					}

					return [
						...result,
						[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
					];
				};

			case 'bracket':
				return key => (result, value) => {
					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, [encode(key, options), '[]'].join('')];
					}

					return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
				};

			case 'comma':
			case 'separator':
				return key => (result, value) => {
					if (value === null || value === undefined || value.length === 0) {
						return result;
					}

					if (result.length === 0) {
						return [[encode(key, options), '=', encode(value, options)].join('')];
					}

					return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
				};

			default:
				return key => (result, value) => {
					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, encode(key, options)];
					}

					return [...result, [encode(key, options), '=', encode(value, options)].join('')];
				};
		}
	}

	function parserForArrayFormat(options) {
		let result;

		switch (options.arrayFormat) {
			case 'index':
				return (key, value, accumulator) => {
					result = /\[(\d*)\]$/.exec(key);

					key = key.replace(/\[\d*\]$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					}

					if (accumulator[key] === undefined) {
						accumulator[key] = {};
					}

					accumulator[key][result[1]] = value;
				};

			case 'bracket':
				return (key, value, accumulator) => {
					result = /(\[\])$/.exec(key);
					key = key.replace(/\[\]$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					}

					if (accumulator[key] === undefined) {
						accumulator[key] = [value];
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};

			case 'comma':
			case 'separator':
				return (key, value, accumulator) => {
					const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
					const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
					value = isEncodedArray ? decode(value, options) : value;
					const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
					accumulator[key] = newValue;
				};

			default:
				return (key, value, accumulator) => {
					if (accumulator[key] === undefined) {
						accumulator[key] = value;
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};
		}
	}

	function validateArrayFormatSeparator(value) {
		if (typeof value !== 'string' || value.length !== 1) {
			throw new TypeError('arrayFormatSeparator must be single character string');
		}
	}

	function encode(value, options) {
		if (options.encode) {
			return options.strict ? strictUriEncode$1(value) : encodeURIComponent(value);
		}

		return value;
	}

	function decode(value, options) {
		if (options.decode) {
			return decodeComponent(value);
		}

		return value;
	}

	function keysSorter(input) {
		if (Array.isArray(input)) {
			return input.sort();
		}

		if (typeof input === 'object') {
			return keysSorter(Object.keys(input))
				.sort((a, b) => Number(a) - Number(b))
				.map(key => input[key]);
		}

		return input;
	}

	function removeHash(input) {
		const hashStart = input.indexOf('#');
		if (hashStart !== -1) {
			input = input.slice(0, hashStart);
		}

		return input;
	}

	function getHash(url) {
		let hash = '';
		const hashStart = url.indexOf('#');
		if (hashStart !== -1) {
			hash = url.slice(hashStart);
		}

		return hash;
	}

	function extract(input) {
		input = removeHash(input);
		const queryStart = input.indexOf('?');
		if (queryStart === -1) {
			return '';
		}

		return input.slice(queryStart + 1);
	}

	function parseValue(value, options) {
		if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
			value = Number(value);
		} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
			value = value.toLowerCase() === 'true';
		}

		return value;
	}

	function parse(query, options) {
		options = Object.assign({
			decode: true,
			sort: true,
			arrayFormat: 'none',
			arrayFormatSeparator: ',',
			parseNumbers: false,
			parseBooleans: false
		}, options);

		validateArrayFormatSeparator(options.arrayFormatSeparator);

		const formatter = parserForArrayFormat(options);

		// Create an object with no prototype
		const ret = Object.create(null);

		if (typeof query !== 'string') {
			return ret;
		}

		query = query.trim().replace(/^[?#&]/, '');

		if (!query) {
			return ret;
		}

		for (const param of query.split('&')) {
			if (param === '') {
				continue;
			}

			let [key, value] = splitOnFirst$1(options.decode ? param.replace(/\+/g, ' ') : param, '=');

			// Missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
			formatter(decode(key, options), value, ret);
		}

		for (const key of Object.keys(ret)) {
			const value = ret[key];
			if (typeof value === 'object' && value !== null) {
				for (const k of Object.keys(value)) {
					value[k] = parseValue(value[k], options);
				}
			} else {
				ret[key] = parseValue(value, options);
			}
		}

		if (options.sort === false) {
			return ret;
		}

		return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
			const value = ret[key];
			if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
				// Sort object keys, not values
				result[key] = keysSorter(value);
			} else {
				result[key] = value;
			}

			return result;
		}, Object.create(null));
	}

	exports.extract = extract;
	exports.parse = parse;

	exports.stringify = (object, options) => {
		if (!object) {
			return '';
		}

		options = Object.assign({
			encode: true,
			strict: true,
			arrayFormat: 'none',
			arrayFormatSeparator: ','
		}, options);

		validateArrayFormatSeparator(options.arrayFormatSeparator);

		const shouldFilter = key => (
			(options.skipNull && isNullOrUndefined(object[key])) ||
			(options.skipEmptyString && object[key] === '')
		);

		const formatter = encoderForArrayFormat(options);

		const objectCopy = {};

		for (const key of Object.keys(object)) {
			if (!shouldFilter(key)) {
				objectCopy[key] = object[key];
			}
		}

		const keys = Object.keys(objectCopy);

		if (options.sort !== false) {
			keys.sort(options.sort);
		}

		return keys.map(key => {
			const value = object[key];

			if (value === undefined) {
				return '';
			}

			if (value === null) {
				return encode(key, options);
			}

			if (Array.isArray(value)) {
				return value
					.reduce(formatter(key), [])
					.join('&');
			}

			return encode(key, options) + '=' + encode(value, options);
		}).filter(x => x.length > 0).join('&');
	};

	exports.parseUrl = (url, options) => {
		options = Object.assign({
			decode: true
		}, options);

		const [url_, hash] = splitOnFirst$1(url, '#');

		return Object.assign(
			{
				url: url_.split('?')[0] || '',
				query: parse(extract(url), options)
			},
			options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
		);
	};

	exports.stringifyUrl = (object, options) => {
		options = Object.assign({
			encode: true,
			strict: true
		}, options);

		const url = removeHash(object.url).split('?')[0] || '';
		const queryFromUrl = exports.extract(object.url);
		const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

		const query = Object.assign(parsedQueryFromUrl, object.query);
		let queryString = exports.stringify(query, options);
		if (queryString) {
			queryString = `?${queryString}`;
		}

		let hash = getHash(object.url);
		if (object.fragmentIdentifier) {
			hash = `#${encode(object.fragmentIdentifier, options)}`;
		}

		return `${url}${queryString}${hash}`;
	};

	exports.pick = (input, filter, options) => {
		options = Object.assign({
			parseFragmentIdentifier: true
		}, options);

		const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
		return exports.stringifyUrl({
			url,
			query: filterObject(query, filter),
			fragmentIdentifier
		}, options);
	};

	exports.exclude = (input, filter, options) => {
		const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

		return exports.pick(input, exclusionFilter, options);
	}; 
} (queryString));

var index = /*@__PURE__*/getDefaultExportFromCjs(queryString);

var xpath$1 = {};

/*
 * xpath.js
 *
 * An XPath 1.0 library for JavaScript.
 *
 * Cameron McCormack <cam (at) mcc.id.au>
 *
 * This work is licensed under the MIT License.
 *
 * Revision 20: April 26, 2011
 *   Fixed a typo resulting in FIRST_ORDERED_NODE_TYPE results being wrong,
 *   thanks to <shi_a009 (at) hotmail.com>.
 *
 * Revision 19: November 29, 2005
 *   Nodesets now store their nodes in a height balanced tree, increasing
 *   performance for the common case of selecting nodes in document order,
 *   thanks to Sébastien Cramatte <contact (at) zeninteractif.com>.
 *   AVL tree code adapted from Raimund Neumann <rnova (at) gmx.net>.
 *
 * Revision 18: October 27, 2005
 *   DOM 3 XPath support.  Caveats:
 *     - namespace prefixes aren't resolved in XPathEvaluator.createExpression,
 *       but in XPathExpression.evaluate.
 *     - XPathResult.invalidIteratorState is not implemented.
 *
 * Revision 17: October 25, 2005
 *   Some core XPath function fixes and a patch to avoid crashing certain
 *   versions of MSXML in PathExpr.prototype.getOwnerElement, thanks to
 *   Sébastien Cramatte <contact (at) zeninteractif.com>.
 *
 * Revision 16: September 22, 2005
 *   Workarounds for some IE 5.5 deficiencies.
 *   Fixed problem with prefix node tests on attribute nodes.
 *
 * Revision 15: May 21, 2005
 *   Fixed problem with QName node tests on elements with an xmlns="...".
 *
 * Revision 14: May 19, 2005
 *   Fixed QName node tests on attribute node regression.
 *
 * Revision 13: May 3, 2005
 *   Node tests are case insensitive now if working in an HTML DOM.
 *
 * Revision 12: April 26, 2005
 *   Updated licence.  Slight code changes to enable use of Dean
 *   Edwards' script compression, http://dean.edwards.name/packer/ .
 *
 * Revision 11: April 23, 2005
 *   Fixed bug with 'and' and 'or' operators, fix thanks to
 *   Sandy McArthur <sandy (at) mcarthur.org>.
 *
 * Revision 10: April 15, 2005
 *   Added support for a virtual root node, supposedly helpful for
 *   implementing XForms.  Fixed problem with QName node tests and
 *   the parent axis.
 *
 * Revision 9: March 17, 2005
 *   Namespace resolver tweaked so using the document node as the context
 *   for namespace lookups is equivalent to using the document element.
 *
 * Revision 8: February 13, 2005
 *   Handle implicit declaration of 'xmlns' namespace prefix.
 *   Fixed bug when comparing nodesets.
 *   Instance data can now be associated with a FunctionResolver, and
 *     workaround for MSXML not supporting 'localName' and 'getElementById',
 *     thanks to Grant Gongaware.
 *   Fix a few problems when the context node is the root node.
 *
 * Revision 7: February 11, 2005
 *   Default namespace resolver fix from Grant Gongaware
 *   <grant (at) gongaware.com>.
 *
 * Revision 6: February 10, 2005
 *   Fixed bug in 'number' function.
 *
 * Revision 5: February 9, 2005
 *   Fixed bug where text nodes not getting converted to string values.
 *
 * Revision 4: January 21, 2005
 *   Bug in 'name' function, fix thanks to Bill Edney.
 *   Fixed incorrect processing of namespace nodes.
 *   Fixed NamespaceResolver to resolve 'xml' namespace.
 *   Implemented union '|' operator.
 *
 * Revision 3: January 14, 2005
 *   Fixed bug with nodeset comparisons, bug lexing < and >.
 *
 * Revision 2: October 26, 2004
 *   QName node test namespace handling fixed.  Few other bug fixes.
 *
 * Revision 1: August 13, 2004
 *   Bug fixes from William J. Edney <bedney (at) technicalpursuit.com>.
 *   Added minimal licence.
 *
 * Initial version: June 14, 2004
 */

(function (exports) {
	// non-node wrapper
	var xpath = ('object' === 'undefined') ? {} : exports;

	(function (exports) {
	    "use strict";

	    // functional helpers
	    function curry(func) {
	        var slice = Array.prototype.slice,
	            totalargs = func.length,
	            partial = function (args, fn) {
	                return function () {
	                    return fn.apply(this, args.concat(slice.call(arguments)));
	                }
	            },
	            fn = function () {
	                var args = slice.call(arguments);
	                return (args.length < totalargs) ?
	                    partial(args, fn) :
	                    func.apply(this, slice.apply(arguments, [0, totalargs]));
	            };
	        return fn;
	    }

	    var forEach = function (f, xs) {
	        for (var i = 0; i < xs.length; i += 1) {
	            f(xs[i], i, xs);
	        }
	    };

	    var reduce = function (f, seed, xs) {
	        var acc = seed;

	        forEach(function (x, i) { acc = f(acc, x, i); }, xs);

	        return acc;
	    };

	    var map = function (f, xs) {
	        var mapped = new Array(xs.length);

	        forEach(function (x, i) { mapped[i] = f(x); }, xs);

	        return mapped;
	    };

	    var filter = function (f, xs) {
	        var filtered = [];

	        forEach(function (x, i) { if (f(x, i)) { filtered.push(x); } }, xs);

	        return filtered;
	    };

	    var includes = function (values, value) {
	        for (var i = 0; i < values.length; i += 1) {
	            if (values[i] === value) {
	                return true;
	            }
	        }

	        return false;
	    };

	    function always(value) { return function () { return value; } }

	    function toString(x) { return x.toString(); }
	    var join = function (s, xs) { return xs.join(s); };
	    var wrap = function (pref, suf, str) { return pref + str + suf; };

	    var prototypeConcat = Array.prototype.concat;

	    // .apply() fails above a certain number of arguments - https://github.com/goto100/xpath/pull/98
	    var MAX_ARGUMENT_LENGTH = 32767;

	    function flatten(arr) {
	        var result = [];

	        for (var start = 0; start < arr.length; start += MAX_ARGUMENT_LENGTH) {
	            var chunk = arr.slice(start, start + MAX_ARGUMENT_LENGTH);
	            
	            result = prototypeConcat.apply(result, chunk);
	        }
	        
	        return result;
	    }

	    function assign(target, varArgs) { // .length of function is 2
	        var to = Object(target);

	        for (var index = 1; index < arguments.length; index++) {
	            var nextSource = arguments[index];

	            if (nextSource != null) { // Skip over if undefined or null
	                for (var nextKey in nextSource) {
	                    // Avoid bugs when hasOwnProperty is shadowed
	                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	                        to[nextKey] = nextSource[nextKey];
	                    }
	                }
	            }
	        }

	        return to;
	    }

	    // XPathParser ///////////////////////////////////////////////////////////////

	    XPathParser.prototype = new Object();
	    XPathParser.prototype.constructor = XPathParser;
	    XPathParser.superclass = Object.prototype;

	    function XPathParser() {
	        this.init();
	    }

	    XPathParser.prototype.init = function () {
	        this.reduceActions = [];

	        this.reduceActions[3] = function (rhs) {
	            return new OrOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[5] = function (rhs) {
	            return new AndOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[7] = function (rhs) {
	            return new EqualsOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[8] = function (rhs) {
	            return new NotEqualOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[10] = function (rhs) {
	            return new LessThanOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[11] = function (rhs) {
	            return new GreaterThanOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[12] = function (rhs) {
	            return new LessThanOrEqualOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[13] = function (rhs) {
	            return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[15] = function (rhs) {
	            return new PlusOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[16] = function (rhs) {
	            return new MinusOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[18] = function (rhs) {
	            return new MultiplyOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[19] = function (rhs) {
	            return new DivOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[20] = function (rhs) {
	            return new ModOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[22] = function (rhs) {
	            return new UnaryMinusOperation(rhs[1]);
	        };
	        this.reduceActions[24] = function (rhs) {
	            return new BarOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[25] = function (rhs) {
	            return new PathExpr(undefined, undefined, rhs[0]);
	        };
	        this.reduceActions[27] = function (rhs) {
	            rhs[0].locationPath = rhs[2];
	            return rhs[0];
	        };
	        this.reduceActions[28] = function (rhs) {
	            rhs[0].locationPath = rhs[2];
	            rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
	            return rhs[0];
	        };
	        this.reduceActions[29] = function (rhs) {
	            return new PathExpr(rhs[0], [], undefined);
	        };
	        this.reduceActions[30] = function (rhs) {
	            if (Utilities.instance_of(rhs[0], PathExpr)) {
	                if (rhs[0].filterPredicates == undefined) {
	                    rhs[0].filterPredicates = [];
	                }
	                rhs[0].filterPredicates.push(rhs[1]);
	                return rhs[0];
	            } else {
	                return new PathExpr(rhs[0], [rhs[1]], undefined);
	            }
	        };
	        this.reduceActions[32] = function (rhs) {
	            return rhs[1];
	        };
	        this.reduceActions[33] = function (rhs) {
	            return new XString(rhs[0]);
	        };
	        this.reduceActions[34] = function (rhs) {
	            return new XNumber(rhs[0]);
	        };
	        this.reduceActions[36] = function (rhs) {
	            return new FunctionCall(rhs[0], []);
	        };
	        this.reduceActions[37] = function (rhs) {
	            return new FunctionCall(rhs[0], rhs[2]);
	        };
	        this.reduceActions[38] = function (rhs) {
	            return [rhs[0]];
	        };
	        this.reduceActions[39] = function (rhs) {
	            rhs[2].unshift(rhs[0]);
	            return rhs[2];
	        };
	        this.reduceActions[43] = function (rhs) {
	            return new LocationPath(true, []);
	        };
	        this.reduceActions[44] = function (rhs) {
	            rhs[1].absolute = true;
	            return rhs[1];
	        };
	        this.reduceActions[46] = function (rhs) {
	            return new LocationPath(false, [rhs[0]]);
	        };
	        this.reduceActions[47] = function (rhs) {
	            rhs[0].steps.push(rhs[2]);
	            return rhs[0];
	        };
	        this.reduceActions[49] = function (rhs) {
	            return new Step(rhs[0], rhs[1], []);
	        };
	        this.reduceActions[50] = function (rhs) {
	            return new Step(Step.CHILD, rhs[0], []);
	        };
	        this.reduceActions[51] = function (rhs) {
	            return new Step(rhs[0], rhs[1], rhs[2]);
	        };
	        this.reduceActions[52] = function (rhs) {
	            return new Step(Step.CHILD, rhs[0], rhs[1]);
	        };
	        this.reduceActions[54] = function (rhs) {
	            return [rhs[0]];
	        };
	        this.reduceActions[55] = function (rhs) {
	            rhs[1].unshift(rhs[0]);
	            return rhs[1];
	        };
	        this.reduceActions[56] = function (rhs) {
	            if (rhs[0] == "ancestor") {
	                return Step.ANCESTOR;
	            } else if (rhs[0] == "ancestor-or-self") {
	                return Step.ANCESTORORSELF;
	            } else if (rhs[0] == "attribute") {
	                return Step.ATTRIBUTE;
	            } else if (rhs[0] == "child") {
	                return Step.CHILD;
	            } else if (rhs[0] == "descendant") {
	                return Step.DESCENDANT;
	            } else if (rhs[0] == "descendant-or-self") {
	                return Step.DESCENDANTORSELF;
	            } else if (rhs[0] == "following") {
	                return Step.FOLLOWING;
	            } else if (rhs[0] == "following-sibling") {
	                return Step.FOLLOWINGSIBLING;
	            } else if (rhs[0] == "namespace") {
	                return Step.NAMESPACE;
	            } else if (rhs[0] == "parent") {
	                return Step.PARENT;
	            } else if (rhs[0] == "preceding") {
	                return Step.PRECEDING;
	            } else if (rhs[0] == "preceding-sibling") {
	                return Step.PRECEDINGSIBLING;
	            } else if (rhs[0] == "self") {
	                return Step.SELF;
	            }
	            return -1;
	        };
	        this.reduceActions[57] = function (rhs) {
	            return Step.ATTRIBUTE;
	        };
	        this.reduceActions[59] = function (rhs) {
	            if (rhs[0] == "comment") {
	                return NodeTest.commentTest;
	            } else if (rhs[0] == "text") {
	                return NodeTest.textTest;
	            } else if (rhs[0] == "processing-instruction") {
	                return NodeTest.anyPiTest;
	            } else if (rhs[0] == "node") {
	                return NodeTest.nodeTest;
	            }
	            return new NodeTest(-1, undefined);
	        };
	        this.reduceActions[60] = function (rhs) {
	            return new NodeTest.PITest(rhs[2]);
	        };
	        this.reduceActions[61] = function (rhs) {
	            return rhs[1];
	        };
	        this.reduceActions[63] = function (rhs) {
	            rhs[1].absolute = true;
	            rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
	            return rhs[1];
	        };
	        this.reduceActions[64] = function (rhs) {
	            rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
	            rhs[0].steps.push(rhs[2]);
	            return rhs[0];
	        };
	        this.reduceActions[65] = function (rhs) {
	            return new Step(Step.SELF, NodeTest.nodeTest, []);
	        };
	        this.reduceActions[66] = function (rhs) {
	            return new Step(Step.PARENT, NodeTest.nodeTest, []);
	        };
	        this.reduceActions[67] = function (rhs) {
	            return new VariableReference(rhs[1]);
	        };
	        this.reduceActions[68] = function (rhs) {
	            return NodeTest.nameTestAny;
	        };
	        this.reduceActions[69] = function (rhs) {
	            return new NodeTest.NameTestPrefixAny(rhs[0].split(':')[0]);
	        };
	        this.reduceActions[70] = function (rhs) {
	            return new NodeTest.NameTestQName(rhs[0]);
	        };
	    };

	    XPathParser.actionTable = [
	        " s s        sssssssss    s ss  s  ss",
	        "                 s                  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "                rrrrr               ",
	        " s s        sssssssss    s ss  s  ss",
	        "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
	        " s s        sssssssss    s ss  s  ss",
	        "                            s       ",
	        "                            s       ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "  s                                 ",
	        "                            s       ",
	        " s           s  sssss          s  s ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "a                                   ",
	        "r       s                    rr  r  ",
	        "r      sr                    rr  r  ",
	        "r   s  rr            s       rr  r  ",
	        "r   rssrr            rss     rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrrsss         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrrs  rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r  srrrrrrrr         rrrrrrs rr sr  ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "                sssss               ",
	        "r  rrrrrrrrr         rrrrrrr rr sr  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             s      ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "              s                     ",
	        "                             s      ",
	        "                rrrrr               ",
	        " s s        sssssssss    s sss s  ss",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss      ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s           s  sssss          s  s ",
	        " s           s  sssss          s  s ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        " s           s  sssss          s  s ",
	        " s           s  sssss          s  s ",
	        "r  rrrrrrrrr         rrrrrrr rr sr  ",
	        "r  rrrrrrrrr         rrrrrrr rr sr  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             s      ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             rr     ",
	        "                             s      ",
	        "                             rs     ",
	        "r      sr                    rr  r  ",
	        "r   s  rr            s       rr  r  ",
	        "r   rssrr            rss     rr  r  ",
	        "r   rssrr            rss     rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrrsss         rrrrr   rr  r  ",
	        "r   rrrrrsss         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "                                 r  ",
	        "                                 s  ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        " s s        sssssssss    s ss  s  ss",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             r      "
	    ];

	    XPathParser.actionTableNumber = [
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "                 J                  ",
	        "a  aaaaaaaaa         aaaaaaa aa  a  ",
	        "                YYYYY               ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "                            N       ",
	        "                            O       ",
	        "e  eeeeeeeee         eeeeeee ee ee  ",
	        "f  fffffffff         fffffff ff ff  ",
	        "d  ddddddddd         ddddddd dd dd  ",
	        "B  BBBBBBBBB         BBBBBBB BB BB  ",
	        "A  AAAAAAAAA         AAAAAAA AA AA  ",
	        "  P                                 ",
	        "                            Q       ",
	        " 1           .  +*)('          #  \" ",
	        "b  bbbbbbbbb         bbbbbbb bb  b  ",
	        "                                    ",
	        "!       S                    !!  !  ",
	        "\"      T\"                    \"\"  \"  ",
	        "$   V  $$            U       $$  $  ",
	        "&   &ZY&&            &XW     &&  &  ",
	        ")   )))))            )))\\[   ))  )  ",
	        ".   ....._^]         .....   ..  .  ",
	        "1   11111111         11111   11  1  ",
	        "5   55555555         55555`  55  5  ",
	        "7   77777777         777777  77  7  ",
	        "9   99999999         999999  99  9  ",
	        ":  c::::::::         ::::::b :: a:  ",
	        "I  fIIIIIIII         IIIIIIe II  I  ",
	        "=  =========         ======= == ==  ",
	        "?  ?????????         ??????? ?? ??  ",
	        "C  CCCCCCCCC         CCCCCCC CC CC  ",
	        "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
	        "M   MMMMMMMM         MMMMMM  MM  M  ",
	        "N  NNNNNNNNN         NNNNNNN NN  N  ",
	        "P  PPPPPPPPP         PPPPPPP PP  P  ",
	        "                +*)('               ",
	        "R  RRRRRRRRR         RRRRRRR RR aR  ",
	        "U  UUUUUUUUU         UUUUUUU UU  U  ",
	        "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
	        "c  ccccccccc         ccccccc cc cc  ",
	        "                             j      ",
	        "L  fLLLLLLLL         LLLLLLe LL  L  ",
	        "6   66666666         66666   66  6  ",
	        "              k                     ",
	        "                             l      ",
	        "                XXXXX               ",
	        " 1 0        /.-,+*)('    & %$m #  \"!",
	        "_  f________         ______e __  _  ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('      %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1           .  +*)('          #  \" ",
	        " 1           .  +*)('          #  \" ",
	        ">  >>>>>>>>>         >>>>>>> >> >>  ",
	        " 1           .  +*)('          #  \" ",
	        " 1           .  +*)('          #  \" ",
	        "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
	        "V  VVVVVVVVV         VVVVVVV VV aV  ",
	        "T  TTTTTTTTT         TTTTTTT TT  T  ",
	        "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
	        "                             \x87      ",
	        "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
	        "D  DDDDDDDDD         DDDDDDD DD DD  ",
	        "                             HH     ",
	        "                             \x88      ",
	        "                             F\x89     ",
	        "#      T#                    ##  #  ",
	        "%   V  %%            U       %%  %  ",
	        "'   'ZY''            'XW     ''  '  ",
	        "(   (ZY((            (XW     ((  (  ",
	        "+   +++++            +++\\[   ++  +  ",
	        "*   *****            ***\\[   **  *  ",
	        "-   -----            ---\\[   --  -  ",
	        ",   ,,,,,            ,,,\\[   ,,  ,  ",
	        "0   00000_^]         00000   00  0  ",
	        "/   /////_^]         /////   //  /  ",
	        "2   22222222         22222   22  2  ",
	        "3   33333333         33333   33  3  ",
	        "4   44444444         44444   44  4  ",
	        "8   88888888         888888  88  8  ",
	        "                                 ^  ",
	        "                                 \x8a  ",
	        ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
	        "<  f<<<<<<<<         <<<<<<e <<  <  ",
	        "O  OOOOOOOOO         OOOOOOO OO  O  ",
	        "`  `````````         ``````` ``  `  ",
	        "S  SSSSSSSSS         SSSSSSS SS  S  ",
	        "W  WWWWWWWWW         WWWWWWW WW  W  ",
	        "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
	        "E  EEEEEEEEE         EEEEEEE EE EE  ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
	        "                             G      "
	    ];

	    XPathParser.gotoTable = [
	        "3456789:;<=>?@ AB  CDEFGH IJ ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "L456789:;<=>?@ AB  CDEFGH IJ ",
	        "            M        EFGH IJ ",
	        "       N;<=>?@ AB  CDEFGH IJ ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "            S        EFGH IJ ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "              e              ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                        h  J ",
	        "              i          j   ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "o456789:;<=>?@ ABpqCDEFGH IJ ",
	        "                             ",
	        "  r6789:;<=>?@ AB  CDEFGH IJ ",
	        "   s789:;<=>?@ AB  CDEFGH IJ ",
	        "    t89:;<=>?@ AB  CDEFGH IJ ",
	        "    u89:;<=>?@ AB  CDEFGH IJ ",
	        "     v9:;<=>?@ AB  CDEFGH IJ ",
	        "     w9:;<=>?@ AB  CDEFGH IJ ",
	        "     x9:;<=>?@ AB  CDEFGH IJ ",
	        "     y9:;<=>?@ AB  CDEFGH IJ ",
	        "      z:;<=>?@ AB  CDEFGH IJ ",
	        "      {:;<=>?@ AB  CDEFGH IJ ",
	        "       |;<=>?@ AB  CDEFGH IJ ",
	        "       };<=>?@ AB  CDEFGH IJ ",
	        "       ~;<=>?@ AB  CDEFGH IJ ",
	        "         \x7f=>?@ AB  CDEFGH IJ ",
	        "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
	        "            \x82        EFGH IJ ",
	        "            \x83        EFGH IJ ",
	        "                             ",
	        "                     \x84 GH IJ ",
	        "                     \x85 GH IJ ",
	        "              i          \x86   ",
	        "              i          \x87   ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "o456789:;<=>?@ AB\x8cqCDEFGH IJ ",
	        "                             ",
	        "                             "
	    ];

	    XPathParser.productions = [
	        [1, 1, 2],
	        [2, 1, 3],
	        [3, 1, 4],
	        [3, 3, 3, -9, 4],
	        [4, 1, 5],
	        [4, 3, 4, -8, 5],
	        [5, 1, 6],
	        [5, 3, 5, -22, 6],
	        [5, 3, 5, -5, 6],
	        [6, 1, 7],
	        [6, 3, 6, -23, 7],
	        [6, 3, 6, -24, 7],
	        [6, 3, 6, -6, 7],
	        [6, 3, 6, -7, 7],
	        [7, 1, 8],
	        [7, 3, 7, -25, 8],
	        [7, 3, 7, -26, 8],
	        [8, 1, 9],
	        [8, 3, 8, -12, 9],
	        [8, 3, 8, -11, 9],
	        [8, 3, 8, -10, 9],
	        [9, 1, 10],
	        [9, 2, -26, 9],
	        [10, 1, 11],
	        [10, 3, 10, -27, 11],
	        [11, 1, 12],
	        [11, 1, 13],
	        [11, 3, 13, -28, 14],
	        [11, 3, 13, -4, 14],
	        [13, 1, 15],
	        [13, 2, 13, 16],
	        [15, 1, 17],
	        [15, 3, -29, 2, -30],
	        [15, 1, -15],
	        [15, 1, -16],
	        [15, 1, 18],
	        [18, 3, -13, -29, -30],
	        [18, 4, -13, -29, 19, -30],
	        [19, 1, 20],
	        [19, 3, 20, -31, 19],
	        [20, 1, 2],
	        [12, 1, 14],
	        [12, 1, 21],
	        [21, 1, -28],
	        [21, 2, -28, 14],
	        [21, 1, 22],
	        [14, 1, 23],
	        [14, 3, 14, -28, 23],
	        [14, 1, 24],
	        [23, 2, 25, 26],
	        [23, 1, 26],
	        [23, 3, 25, 26, 27],
	        [23, 2, 26, 27],
	        [23, 1, 28],
	        [27, 1, 16],
	        [27, 2, 16, 27],
	        [25, 2, -14, -3],
	        [25, 1, -32],
	        [26, 1, 29],
	        [26, 3, -20, -29, -30],
	        [26, 4, -21, -29, -15, -30],
	        [16, 3, -33, 30, -34],
	        [30, 1, 2],
	        [22, 2, -4, 14],
	        [24, 3, 14, -4, 23],
	        [28, 1, -35],
	        [28, 1, -2],
	        [17, 2, -36, -18],
	        [29, 1, -17],
	        [29, 1, -19],
	        [29, 1, -18]
	    ];

	    XPathParser.DOUBLEDOT = 2;
	    XPathParser.DOUBLECOLON = 3;
	    XPathParser.DOUBLESLASH = 4;
	    XPathParser.NOTEQUAL = 5;
	    XPathParser.LESSTHANOREQUAL = 6;
	    XPathParser.GREATERTHANOREQUAL = 7;
	    XPathParser.AND = 8;
	    XPathParser.OR = 9;
	    XPathParser.MOD = 10;
	    XPathParser.DIV = 11;
	    XPathParser.MULTIPLYOPERATOR = 12;
	    XPathParser.FUNCTIONNAME = 13;
	    XPathParser.AXISNAME = 14;
	    XPathParser.LITERAL = 15;
	    XPathParser.NUMBER = 16;
	    XPathParser.ASTERISKNAMETEST = 17;
	    XPathParser.QNAME = 18;
	    XPathParser.NCNAMECOLONASTERISK = 19;
	    XPathParser.NODETYPE = 20;
	    XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
	    XPathParser.EQUALS = 22;
	    XPathParser.LESSTHAN = 23;
	    XPathParser.GREATERTHAN = 24;
	    XPathParser.PLUS = 25;
	    XPathParser.MINUS = 26;
	    XPathParser.BAR = 27;
	    XPathParser.SLASH = 28;
	    XPathParser.LEFTPARENTHESIS = 29;
	    XPathParser.RIGHTPARENTHESIS = 30;
	    XPathParser.COMMA = 31;
	    XPathParser.AT = 32;
	    XPathParser.LEFTBRACKET = 33;
	    XPathParser.RIGHTBRACKET = 34;
	    XPathParser.DOT = 35;
	    XPathParser.DOLLAR = 36;

	    XPathParser.prototype.tokenize = function (s1) {
	        var types = [];
	        var values = [];
	        var s = s1 + '\0';

	        var pos = 0;
	        var c = s.charAt(pos++);
	        while (1) {
	            while (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
	                c = s.charAt(pos++);
	            }
	            if (c == '\0' || pos >= s.length) {
	                break;
	            }

	            if (c == '(') {
	                types.push(XPathParser.LEFTPARENTHESIS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == ')') {
	                types.push(XPathParser.RIGHTPARENTHESIS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '[') {
	                types.push(XPathParser.LEFTBRACKET);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == ']') {
	                types.push(XPathParser.RIGHTBRACKET);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '@') {
	                types.push(XPathParser.AT);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == ',') {
	                types.push(XPathParser.COMMA);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '|') {
	                types.push(XPathParser.BAR);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '+') {
	                types.push(XPathParser.PLUS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '-') {
	                types.push(XPathParser.MINUS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '=') {
	                types.push(XPathParser.EQUALS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '$') {
	                types.push(XPathParser.DOLLAR);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == '.') {
	                c = s.charAt(pos++);
	                if (c == '.') {
	                    types.push(XPathParser.DOUBLEDOT);
	                    values.push("..");
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                if (c >= '0' && c <= '9') {
	                    var number = "." + c;
	                    c = s.charAt(pos++);
	                    while (c >= '0' && c <= '9') {
	                        number += c;
	                        c = s.charAt(pos++);
	                    }
	                    types.push(XPathParser.NUMBER);
	                    values.push(number);
	                    continue;
	                }
	                types.push(XPathParser.DOT);
	                values.push('.');
	                continue;
	            }

	            if (c == '\'' || c == '"') {
	                var delimiter = c;
	                var literal = "";
	                while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
	                    literal += c;
	                    pos += 1;
	                }
	                if (c !== delimiter) {
	                    throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
	                }
	                pos += 1;
	                types.push(XPathParser.LITERAL);
	                values.push(literal);
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c >= '0' && c <= '9') {
	                var number = c;
	                c = s.charAt(pos++);
	                while (c >= '0' && c <= '9') {
	                    number += c;
	                    c = s.charAt(pos++);
	                }
	                if (c == '.') {
	                    if (s.charAt(pos) >= '0' && s.charAt(pos) <= '9') {
	                        number += c;
	                        number += s.charAt(pos++);
	                        c = s.charAt(pos++);
	                        while (c >= '0' && c <= '9') {
	                            number += c;
	                            c = s.charAt(pos++);
	                        }
	                    }
	                }
	                types.push(XPathParser.NUMBER);
	                values.push(number);
	                continue;
	            }

	            if (c == '*') {
	                if (types.length > 0) {
	                    var last = types[types.length - 1];
	                    if (last != XPathParser.AT
	                        && last != XPathParser.DOUBLECOLON
	                        && last != XPathParser.LEFTPARENTHESIS
	                        && last != XPathParser.LEFTBRACKET
	                        && last != XPathParser.AND
	                        && last != XPathParser.OR
	                        && last != XPathParser.MOD
	                        && last != XPathParser.DIV
	                        && last != XPathParser.MULTIPLYOPERATOR
	                        && last != XPathParser.SLASH
	                        && last != XPathParser.DOUBLESLASH
	                        && last != XPathParser.BAR
	                        && last != XPathParser.PLUS
	                        && last != XPathParser.MINUS
	                        && last != XPathParser.EQUALS
	                        && last != XPathParser.NOTEQUAL
	                        && last != XPathParser.LESSTHAN
	                        && last != XPathParser.LESSTHANOREQUAL
	                        && last != XPathParser.GREATERTHAN
	                        && last != XPathParser.GREATERTHANOREQUAL) {
	                        types.push(XPathParser.MULTIPLYOPERATOR);
	                        values.push(c);
	                        c = s.charAt(pos++);
	                        continue;
	                    }
	                }
	                types.push(XPathParser.ASTERISKNAMETEST);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == ':') {
	                if (s.charAt(pos) == ':') {
	                    types.push(XPathParser.DOUBLECOLON);
	                    values.push("::");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	            }

	            if (c == '/') {
	                c = s.charAt(pos++);
	                if (c == '/') {
	                    types.push(XPathParser.DOUBLESLASH);
	                    values.push("//");
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                types.push(XPathParser.SLASH);
	                values.push('/');
	                continue;
	            }

	            if (c == '!') {
	                if (s.charAt(pos) == '=') {
	                    types.push(XPathParser.NOTEQUAL);
	                    values.push("!=");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	            }

	            if (c == '<') {
	                if (s.charAt(pos) == '=') {
	                    types.push(XPathParser.LESSTHANOREQUAL);
	                    values.push("<=");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                types.push(XPathParser.LESSTHAN);
	                values.push('<');
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == '>') {
	                if (s.charAt(pos) == '=') {
	                    types.push(XPathParser.GREATERTHANOREQUAL);
	                    values.push(">=");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                types.push(XPathParser.GREATERTHAN);
	                values.push('>');
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == '_' || Utilities.isLetter(c.charCodeAt(0))) {
	                var name = c;
	                c = s.charAt(pos++);
	                while (Utilities.isNCNameChar(c.charCodeAt(0))) {
	                    name += c;
	                    c = s.charAt(pos++);
	                }
	                if (types.length > 0) {
	                    var last = types[types.length - 1];
	                    if (last != XPathParser.AT
	                        && last != XPathParser.DOUBLECOLON
	                        && last != XPathParser.LEFTPARENTHESIS
	                        && last != XPathParser.LEFTBRACKET
	                        && last != XPathParser.AND
	                        && last != XPathParser.OR
	                        && last != XPathParser.MOD
	                        && last != XPathParser.DIV
	                        && last != XPathParser.MULTIPLYOPERATOR
	                        && last != XPathParser.SLASH
	                        && last != XPathParser.DOUBLESLASH
	                        && last != XPathParser.BAR
	                        && last != XPathParser.PLUS
	                        && last != XPathParser.MINUS
	                        && last != XPathParser.EQUALS
	                        && last != XPathParser.NOTEQUAL
	                        && last != XPathParser.LESSTHAN
	                        && last != XPathParser.LESSTHANOREQUAL
	                        && last != XPathParser.GREATERTHAN
	                        && last != XPathParser.GREATERTHANOREQUAL) {
	                        if (name == "and") {
	                            types.push(XPathParser.AND);
	                            values.push(name);
	                            continue;
	                        }
	                        if (name == "or") {
	                            types.push(XPathParser.OR);
	                            values.push(name);
	                            continue;
	                        }
	                        if (name == "mod") {
	                            types.push(XPathParser.MOD);
	                            values.push(name);
	                            continue;
	                        }
	                        if (name == "div") {
	                            types.push(XPathParser.DIV);
	                            values.push(name);
	                            continue;
	                        }
	                    }
	                }
	                if (c == ':') {
	                    if (s.charAt(pos) == '*') {
	                        types.push(XPathParser.NCNAMECOLONASTERISK);
	                        values.push(name + ":*");
	                        pos++;
	                        c = s.charAt(pos++);
	                        continue;
	                    }
	                    if (s.charAt(pos) == '_' || Utilities.isLetter(s.charCodeAt(pos))) {
	                        name += ':';
	                        c = s.charAt(pos++);
	                        while (Utilities.isNCNameChar(c.charCodeAt(0))) {
	                            name += c;
	                            c = s.charAt(pos++);
	                        }
	                        if (c == '(') {
	                            types.push(XPathParser.FUNCTIONNAME);
	                            values.push(name);
	                            continue;
	                        }
	                        types.push(XPathParser.QNAME);
	                        values.push(name);
	                        continue;
	                    }
	                    if (s.charAt(pos) == ':') {
	                        types.push(XPathParser.AXISNAME);
	                        values.push(name);
	                        continue;
	                    }
	                }
	                if (c == '(') {
	                    if (name == "comment" || name == "text" || name == "node") {
	                        types.push(XPathParser.NODETYPE);
	                        values.push(name);
	                        continue;
	                    }
	                    if (name == "processing-instruction") {
	                        if (s.charAt(pos) == ')') {
	                            types.push(XPathParser.NODETYPE);
	                        } else {
	                            types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
	                        }
	                        values.push(name);
	                        continue;
	                    }
	                    types.push(XPathParser.FUNCTIONNAME);
	                    values.push(name);
	                    continue;
	                }
	                types.push(XPathParser.QNAME);
	                values.push(name);
	                continue;
	            }

	            throw new Error("Unexpected character " + c);
	        }
	        types.push(1);
	        values.push("[EOF]");
	        return [types, values];
	    };

	    XPathParser.SHIFT = 's';
	    XPathParser.REDUCE = 'r';
	    XPathParser.ACCEPT = 'a';

	    XPathParser.prototype.parse = function (s) {
	        var types;
	        var values;
	        var res = this.tokenize(s);
	        if (res == undefined) {
	            return undefined;
	        }
	        types = res[0];
	        values = res[1];
	        var tokenPos = 0;
	        var state = [];
	        var tokenType = [];
	        var tokenValue = [];
	        var s;
	        var a;
	        var t;

	        state.push(0);
	        tokenType.push(1);
	        tokenValue.push("_S");

	        a = types[tokenPos];
	        t = values[tokenPos++];
	        while (1) {
	            s = state[state.length - 1];
	            switch (XPathParser.actionTable[s].charAt(a - 1)) {
	                case XPathParser.SHIFT:
	                    tokenType.push(-a);
	                    tokenValue.push(t);
	                    state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
	                    a = types[tokenPos];
	                    t = values[tokenPos++];
	                    break;
	                case XPathParser.REDUCE:
	                    var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
	                    var rhs = [];
	                    for (var i = 0; i < num; i++) {
	                        tokenType.pop();
	                        rhs.unshift(tokenValue.pop());
	                        state.pop();
	                    }
	                    var s_ = state[state.length - 1];
	                    tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
	                    if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == undefined) {
	                        tokenValue.push(rhs[0]);
	                    } else {
	                        tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
	                    }
	                    state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
	                    break;
	                case XPathParser.ACCEPT:
	                    return new XPath(tokenValue.pop());
	                default:
	                    throw new Error("XPath parse error");
	            }
	        }
	    };

	    // XPath /////////////////////////////////////////////////////////////////////

	    XPath.prototype = new Object();
	    XPath.prototype.constructor = XPath;
	    XPath.superclass = Object.prototype;

	    function XPath(e) {
	        this.expression = e;
	    }

	    XPath.prototype.toString = function () {
	        return this.expression.toString();
	    };

	    function setIfUnset(obj, prop, value) {
	        if (!(prop in obj)) {
	            obj[prop] = value;
	        }
	    }

	    XPath.prototype.evaluate = function (c) {
	        c.contextNode = c.expressionContextNode;
	        c.contextSize = 1;
	        c.contextPosition = 1;

	        // [2017-11-25] Removed usage of .implementation.hasFeature() since it does
	        //              not reliably detect HTML DOMs (always returns false in xmldom and true in browsers)
	        if (c.isHtml) {
	            setIfUnset(c, 'caseInsensitive', true);
	            setIfUnset(c, 'allowAnyNamespaceForNoPrefix', true);
	        }

	        setIfUnset(c, 'caseInsensitive', false);

	        return this.expression.evaluate(c);
	    };

	    XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
	    XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";

	    // Expression ////////////////////////////////////////////////////////////////

	    Expression.prototype = new Object();
	    Expression.prototype.constructor = Expression;
	    Expression.superclass = Object.prototype;

	    function Expression() {
	    }

	    Expression.prototype.init = function () {
	    };

	    Expression.prototype.toString = function () {
	        return "<Expression>";
	    };

	    Expression.prototype.evaluate = function (c) {
	        throw new Error("Could not evaluate expression.");
	    };

	    // UnaryOperation ////////////////////////////////////////////////////////////

	    UnaryOperation.prototype = new Expression();
	    UnaryOperation.prototype.constructor = UnaryOperation;
	    UnaryOperation.superclass = Expression.prototype;

	    function UnaryOperation(rhs) {
	        if (arguments.length > 0) {
	            this.init(rhs);
	        }
	    }

	    UnaryOperation.prototype.init = function (rhs) {
	        this.rhs = rhs;
	    };

	    // UnaryMinusOperation ///////////////////////////////////////////////////////

	    UnaryMinusOperation.prototype = new UnaryOperation();
	    UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
	    UnaryMinusOperation.superclass = UnaryOperation.prototype;

	    function UnaryMinusOperation(rhs) {
	        if (arguments.length > 0) {
	            this.init(rhs);
	        }
	    }

	    UnaryMinusOperation.prototype.init = function (rhs) {
	        UnaryMinusOperation.superclass.init.call(this, rhs);
	    };

	    UnaryMinusOperation.prototype.evaluate = function (c) {
	        return this.rhs.evaluate(c).number().negate();
	    };

	    UnaryMinusOperation.prototype.toString = function () {
	        return "-" + this.rhs.toString();
	    };

	    // BinaryOperation ///////////////////////////////////////////////////////////

	    BinaryOperation.prototype = new Expression();
	    BinaryOperation.prototype.constructor = BinaryOperation;
	    BinaryOperation.superclass = Expression.prototype;

	    function BinaryOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    BinaryOperation.prototype.init = function (lhs, rhs) {
	        this.lhs = lhs;
	        this.rhs = rhs;
	    };

	    // OrOperation ///////////////////////////////////////////////////////////////

	    OrOperation.prototype = new BinaryOperation();
	    OrOperation.prototype.constructor = OrOperation;
	    OrOperation.superclass = BinaryOperation.prototype;

	    function OrOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    OrOperation.prototype.init = function (lhs, rhs) {
	        OrOperation.superclass.init.call(this, lhs, rhs);
	    };

	    OrOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
	    };

	    OrOperation.prototype.evaluate = function (c) {
	        var b = this.lhs.evaluate(c).bool();
	        if (b.booleanValue()) {
	            return b;
	        }
	        return this.rhs.evaluate(c).bool();
	    };

	    // AndOperation //////////////////////////////////////////////////////////////

	    AndOperation.prototype = new BinaryOperation();
	    AndOperation.prototype.constructor = AndOperation;
	    AndOperation.superclass = BinaryOperation.prototype;

	    function AndOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    AndOperation.prototype.init = function (lhs, rhs) {
	        AndOperation.superclass.init.call(this, lhs, rhs);
	    };

	    AndOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
	    };

	    AndOperation.prototype.evaluate = function (c) {
	        var b = this.lhs.evaluate(c).bool();
	        if (!b.booleanValue()) {
	            return b;
	        }
	        return this.rhs.evaluate(c).bool();
	    };

	    // EqualsOperation ///////////////////////////////////////////////////////////

	    EqualsOperation.prototype = new BinaryOperation();
	    EqualsOperation.prototype.constructor = EqualsOperation;
	    EqualsOperation.superclass = BinaryOperation.prototype;

	    function EqualsOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    EqualsOperation.prototype.init = function (lhs, rhs) {
	        EqualsOperation.superclass.init.call(this, lhs, rhs);
	    };

	    EqualsOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
	    };

	    EqualsOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
	    };

	    // NotEqualOperation /////////////////////////////////////////////////////////

	    NotEqualOperation.prototype = new BinaryOperation();
	    NotEqualOperation.prototype.constructor = NotEqualOperation;
	    NotEqualOperation.superclass = BinaryOperation.prototype;

	    function NotEqualOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    NotEqualOperation.prototype.init = function (lhs, rhs) {
	        NotEqualOperation.superclass.init.call(this, lhs, rhs);
	    };

	    NotEqualOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
	    };

	    NotEqualOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
	    };

	    // LessThanOperation /////////////////////////////////////////////////////////

	    LessThanOperation.prototype = new BinaryOperation();
	    LessThanOperation.prototype.constructor = LessThanOperation;
	    LessThanOperation.superclass = BinaryOperation.prototype;

	    function LessThanOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    LessThanOperation.prototype.init = function (lhs, rhs) {
	        LessThanOperation.superclass.init.call(this, lhs, rhs);
	    };

	    LessThanOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
	    };

	    LessThanOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
	    };

	    // GreaterThanOperation //////////////////////////////////////////////////////

	    GreaterThanOperation.prototype = new BinaryOperation();
	    GreaterThanOperation.prototype.constructor = GreaterThanOperation;
	    GreaterThanOperation.superclass = BinaryOperation.prototype;

	    function GreaterThanOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    GreaterThanOperation.prototype.init = function (lhs, rhs) {
	        GreaterThanOperation.superclass.init.call(this, lhs, rhs);
	    };

	    GreaterThanOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
	    };

	    GreaterThanOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
	    };

	    // LessThanOrEqualOperation //////////////////////////////////////////////////

	    LessThanOrEqualOperation.prototype = new BinaryOperation();
	    LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
	    LessThanOrEqualOperation.superclass = BinaryOperation.prototype;

	    function LessThanOrEqualOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    LessThanOrEqualOperation.prototype.init = function (lhs, rhs) {
	        LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
	    };

	    LessThanOrEqualOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
	    };

	    LessThanOrEqualOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
	    };

	    // GreaterThanOrEqualOperation ///////////////////////////////////////////////

	    GreaterThanOrEqualOperation.prototype = new BinaryOperation();
	    GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
	    GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;

	    function GreaterThanOrEqualOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    GreaterThanOrEqualOperation.prototype.init = function (lhs, rhs) {
	        GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
	    };

	    GreaterThanOrEqualOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
	    };

	    GreaterThanOrEqualOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
	    };

	    // PlusOperation /////////////////////////////////////////////////////////////

	    PlusOperation.prototype = new BinaryOperation();
	    PlusOperation.prototype.constructor = PlusOperation;
	    PlusOperation.superclass = BinaryOperation.prototype;

	    function PlusOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    PlusOperation.prototype.init = function (lhs, rhs) {
	        PlusOperation.superclass.init.call(this, lhs, rhs);
	    };

	    PlusOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
	    };

	    PlusOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
	    };

	    // MinusOperation ////////////////////////////////////////////////////////////

	    MinusOperation.prototype = new BinaryOperation();
	    MinusOperation.prototype.constructor = MinusOperation;
	    MinusOperation.superclass = BinaryOperation.prototype;

	    function MinusOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    MinusOperation.prototype.init = function (lhs, rhs) {
	        MinusOperation.superclass.init.call(this, lhs, rhs);
	    };

	    MinusOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
	    };

	    MinusOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
	    };

	    // MultiplyOperation /////////////////////////////////////////////////////////

	    MultiplyOperation.prototype = new BinaryOperation();
	    MultiplyOperation.prototype.constructor = MultiplyOperation;
	    MultiplyOperation.superclass = BinaryOperation.prototype;

	    function MultiplyOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    MultiplyOperation.prototype.init = function (lhs, rhs) {
	        MultiplyOperation.superclass.init.call(this, lhs, rhs);
	    };

	    MultiplyOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
	    };

	    MultiplyOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
	    };

	    // DivOperation //////////////////////////////////////////////////////////////

	    DivOperation.prototype = new BinaryOperation();
	    DivOperation.prototype.constructor = DivOperation;
	    DivOperation.superclass = BinaryOperation.prototype;

	    function DivOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    DivOperation.prototype.init = function (lhs, rhs) {
	        DivOperation.superclass.init.call(this, lhs, rhs);
	    };

	    DivOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
	    };

	    DivOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
	    };

	    // ModOperation //////////////////////////////////////////////////////////////

	    ModOperation.prototype = new BinaryOperation();
	    ModOperation.prototype.constructor = ModOperation;
	    ModOperation.superclass = BinaryOperation.prototype;

	    function ModOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    ModOperation.prototype.init = function (lhs, rhs) {
	        ModOperation.superclass.init.call(this, lhs, rhs);
	    };

	    ModOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
	    };

	    ModOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
	    };

	    // BarOperation //////////////////////////////////////////////////////////////

	    BarOperation.prototype = new BinaryOperation();
	    BarOperation.prototype.constructor = BarOperation;
	    BarOperation.superclass = BinaryOperation.prototype;

	    function BarOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    BarOperation.prototype.init = function (lhs, rhs) {
	        BarOperation.superclass.init.call(this, lhs, rhs);
	    };

	    BarOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
	    };

	    BarOperation.prototype.toString = function () {
	        return map(toString, [this.lhs, this.rhs]).join(' | ');
	    };

	    // PathExpr //////////////////////////////////////////////////////////////////

	    PathExpr.prototype = new Expression();
	    PathExpr.prototype.constructor = PathExpr;
	    PathExpr.superclass = Expression.prototype;

	    function PathExpr(filter, filterPreds, locpath) {
	        if (arguments.length > 0) {
	            this.init(filter, filterPreds, locpath);
	        }
	    }

	    PathExpr.prototype.init = function (filter, filterPreds, locpath) {
	        PathExpr.superclass.init.call(this);
	        this.filter = filter;
	        this.filterPredicates = filterPreds;
	        this.locationPath = locpath;
	    };

	    /**
	     * Returns the topmost node of the tree containing node
	     */
	    function findRoot(node) {
	        while (node && node.parentNode) {
	            node = node.parentNode;
	        }

	        return node;
	    }

	    PathExpr.applyPredicates = function (predicates, c, nodes) {
	        if (predicates.length === 0) {
	            return nodes;
	        }

	        var ctx = c.extend({});

	        return reduce(
	            function (inNodes, pred) {
	                ctx.contextSize = inNodes.length;

	                return filter(
	                    function (node, i) {
	                        ctx.contextNode = node;
	                        ctx.contextPosition = i + 1;

	                        return PathExpr.predicateMatches(pred, ctx);
	                    },
	                    inNodes
	                );
	            },
	            nodes,
	            predicates
	        );
	    };

	    PathExpr.getRoot = function (xpc, nodes) {
	        var firstNode = nodes[0];

	        if (firstNode.nodeType === 9 /*Node.DOCUMENT_NODE*/) {
	            return firstNode;
	        }

	        if (xpc.virtualRoot) {
	            return xpc.virtualRoot;
	        }

	        var ownerDoc = firstNode.ownerDocument;

	        if (ownerDoc) {
	            return ownerDoc;
	        }

	        // IE 5.5 doesn't have ownerDocument?
	        var n = firstNode;
	        while (n.parentNode != null) {
	            n = n.parentNode;
	        }
	        return n;
	    };

	    PathExpr.applyStep = function (step, xpc, node) {
	        var self = this;
	        var newNodes = [];
	        xpc.contextNode = node;

	        switch (step.axis) {
	            case Step.ANCESTOR:
	                // look at all the ancestor nodes
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                var m;
	                if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
	                    m = PathExpr.getOwnerElement(xpc.contextNode);
	                } else {
	                    m = xpc.contextNode.parentNode;
	                }
	                while (m != null) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                    if (m === xpc.virtualRoot) {
	                        break;
	                    }
	                    m = m.parentNode;
	                }
	                break;

	            case Step.ANCESTORORSELF:
	                // look at all the ancestor nodes and the current node
	                for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 /*Node.ATTRIBUTE_NODE*/ ? PathExpr.getOwnerElement(m) : m.parentNode) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                    if (m === xpc.virtualRoot) {
	                        break;
	                    }
	                }
	                break;

	            case Step.ATTRIBUTE:
	                // look at the attributes
	                var nnm = xpc.contextNode.attributes;
	                if (nnm != null) {
	                    for (var k = 0; k < nnm.length; k++) {
	                        var m = nnm.item(k);
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                    }
	                }
	                break;

	            case Step.CHILD:
	                // look at all child elements
	                for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                }
	                break;

	            case Step.DESCENDANT:
	                // look at all descendant nodes
	                var st = [xpc.contextNode.firstChild];
	                while (st.length > 0) {
	                    for (var m = st.pop(); m != null;) {
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                }
	                break;

	            case Step.DESCENDANTORSELF:
	                // look at self
	                if (step.nodeTest.matches(xpc.contextNode, xpc)) {
	                    newNodes.push(xpc.contextNode);
	                }
	                // look at all descendant nodes
	                var st = [xpc.contextNode.firstChild];
	                while (st.length > 0) {
	                    for (var m = st.pop(); m != null;) {
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                }
	                break;

	            case Step.FOLLOWING:
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                var st = [];
	                if (xpc.contextNode.firstChild != null) {
	                    st.unshift(xpc.contextNode.firstChild);
	                } else {
	                    st.unshift(xpc.contextNode.nextSibling);
	                }
	                for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != 9 /*Node.DOCUMENT_NODE*/ && m !== xpc.virtualRoot; m = m.parentNode) {
	                    st.unshift(m.nextSibling);
	                }
	                do {
	                    for (var m = st.pop(); m != null;) {
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                } while (st.length > 0);
	                break;

	            case Step.FOLLOWINGSIBLING:
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                }
	                break;

	            case Step.NAMESPACE:
	                var n = {};
	                if (xpc.contextNode.nodeType == 1 /*Node.ELEMENT_NODE*/) {
	                    n["xml"] = XPath.XML_NAMESPACE_URI;
	                    n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
	                    for (var m = xpc.contextNode; m != null && m.nodeType == 1 /*Node.ELEMENT_NODE*/; m = m.parentNode) {
	                        for (var k = 0; k < m.attributes.length; k++) {
	                            var attr = m.attributes.item(k);
	                            var nm = String(attr.name);
	                            if (nm == "xmlns") {
	                                if (n[""] == undefined) {
	                                    n[""] = attr.value;
	                                }
	                            } else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
	                                var pre = nm.substring(6, nm.length);
	                                if (n[pre] == undefined) {
	                                    n[pre] = attr.value;
	                                }
	                            }
	                        }
	                    }
	                    for (var pre in n) {
	                        var nsn = new XPathNamespace(pre, n[pre], xpc.contextNode);
	                        if (step.nodeTest.matches(nsn, xpc)) {
	                            newNodes.push(nsn);
	                        }
	                    }
	                }
	                break;

	            case Step.PARENT:
	                m = null;
	                if (xpc.contextNode !== xpc.virtualRoot) {
	                    if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
	                        m = PathExpr.getOwnerElement(xpc.contextNode);
	                    } else {
	                        m = xpc.contextNode.parentNode;
	                    }
	                }
	                if (m != null && step.nodeTest.matches(m, xpc)) {
	                    newNodes.push(m);
	                }
	                break;

	            case Step.PRECEDING:
	                var st;
	                if (xpc.virtualRoot != null) {
	                    st = [xpc.virtualRoot];
	                } else {
	                    // cannot rely on .ownerDocument because the node may be in a document fragment
	                    st = [findRoot(xpc.contextNode)];
	                }
	                outer: while (st.length > 0) {
	                    for (var m = st.pop(); m != null;) {
	                        if (m == xpc.contextNode) {
	                            break outer;
	                        }
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.unshift(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                }
	                break;

	            case Step.PRECEDINGSIBLING:
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                }
	                break;

	            case Step.SELF:
	                if (step.nodeTest.matches(xpc.contextNode, xpc)) {
	                    newNodes.push(xpc.contextNode);
	                }
	                break;

	            default:
	        }

	        return newNodes;
	    };

	    function applyStepWithPredicates(step, xpc, node) {
	        return PathExpr.applyPredicates(
	            step.predicates,
	            xpc,
	            PathExpr.applyStep(step, xpc, node)
	        );
	    }

	    function applyStepToNodes(context, nodes, step) {
	        return flatten(
	            map(
	                applyStepWithPredicates.bind(null, step, context),
	                nodes
	            )
	        );
	    }

	    PathExpr.applySteps = function (steps, xpc, nodes) {
	        return reduce(
	            applyStepToNodes.bind(null, xpc),
	            nodes,
	            steps
	        );
	    };

	    PathExpr.prototype.applyFilter = function (c, xpc) {
	        if (!this.filter) {
	            return { nodes: [c.contextNode] };
	        }

	        var ns = this.filter.evaluate(c);

	        if (!Utilities.instance_of(ns, XNodeSet)) {
	            if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
	                throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
	            }

	            return { nonNodes: ns };
	        }

	        return {
	            nodes: PathExpr.applyPredicates(this.filterPredicates || [], xpc, ns.toUnsortedArray())
	        };
	    };

	    PathExpr.applyLocationPath = function (locationPath, xpc, nodes) {
	        if (!locationPath) {
	            return nodes;
	        }

	        var startNodes = locationPath.absolute ? [PathExpr.getRoot(xpc, nodes)] : nodes;

	        return PathExpr.applySteps(locationPath.steps, xpc, startNodes);
	    };

	    PathExpr.prototype.evaluate = function (c) {
	        var xpc = assign(new XPathContext(), c);

	        var filterResult = this.applyFilter(c, xpc);

	        if ('nonNodes' in filterResult) {
	            return filterResult.nonNodes;
	        }

	        var ns = new XNodeSet();
	        ns.addArray(PathExpr.applyLocationPath(this.locationPath, xpc, filterResult.nodes));
	        return ns;
	    };

	    PathExpr.predicateMatches = function (pred, c) {
	        var res = pred.evaluate(c);

	        return Utilities.instance_of(res, XNumber)
	            ? c.contextPosition === res.numberValue()
	            : res.booleanValue();
	    };

	    PathExpr.predicateString = function (predicate) {
	        return wrap('[', ']', predicate.toString());
	    };

	    PathExpr.predicatesString = function (predicates) {
	        return join(
	            '',
	            map(PathExpr.predicateString, predicates)
	        );
	    };

	    PathExpr.prototype.toString = function () {
	        if (this.filter != undefined) {
	            var filterStr = toString(this.filter);

	            if (Utilities.instance_of(this.filter, XString)) {
	                return wrap("'", "'", filterStr);
	            }
	            if (this.filterPredicates != undefined && this.filterPredicates.length) {
	                return wrap('(', ')', filterStr) +
	                    PathExpr.predicatesString(this.filterPredicates);
	            }
	            if (this.locationPath != undefined) {
	                return filterStr +
	                    (this.locationPath.absolute ? '' : '/') +
	                    toString(this.locationPath);
	            }

	            return filterStr;
	        }

	        return toString(this.locationPath);
	    };

	    PathExpr.getOwnerElement = function (n) {
	        // DOM 2 has ownerElement
	        if (n.ownerElement) {
	            return n.ownerElement;
	        }
	        // DOM 1 Internet Explorer can use selectSingleNode (ironically)
	        try {
	            if (n.selectSingleNode) {
	                return n.selectSingleNode("..");
	            }
	        } catch (e) {
	        }
	        // Other DOM 1 implementations must use this egregious search
	        var doc = n.nodeType == 9 /*Node.DOCUMENT_NODE*/
	            ? n
	            : n.ownerDocument;
	        var elts = doc.getElementsByTagName("*");
	        for (var i = 0; i < elts.length; i++) {
	            var elt = elts.item(i);
	            var nnm = elt.attributes;
	            for (var j = 0; j < nnm.length; j++) {
	                var an = nnm.item(j);
	                if (an === n) {
	                    return elt;
	                }
	            }
	        }
	        return null;
	    };

	    // LocationPath //////////////////////////////////////////////////////////////

	    LocationPath.prototype = new Object();
	    LocationPath.prototype.constructor = LocationPath;
	    LocationPath.superclass = Object.prototype;

	    function LocationPath(abs, steps) {
	        if (arguments.length > 0) {
	            this.init(abs, steps);
	        }
	    }

	    LocationPath.prototype.init = function (abs, steps) {
	        this.absolute = abs;
	        this.steps = steps;
	    };

	    LocationPath.prototype.toString = function () {
	        return (
	            (this.absolute ? '/' : '') +
	            map(toString, this.steps).join('/')
	        );
	    };

	    // Step //////////////////////////////////////////////////////////////////////

	    Step.prototype = new Object();
	    Step.prototype.constructor = Step;
	    Step.superclass = Object.prototype;

	    function Step(axis, nodetest, preds) {
	        if (arguments.length > 0) {
	            this.init(axis, nodetest, preds);
	        }
	    }

	    Step.prototype.init = function (axis, nodetest, preds) {
	        this.axis = axis;
	        this.nodeTest = nodetest;
	        this.predicates = preds;
	    };

	    Step.prototype.toString = function () {
	        return Step.STEPNAMES[this.axis] +
	            "::" +
	            this.nodeTest.toString() +
	            PathExpr.predicatesString(this.predicates);
	    };


	    Step.ANCESTOR = 0;
	    Step.ANCESTORORSELF = 1;
	    Step.ATTRIBUTE = 2;
	    Step.CHILD = 3;
	    Step.DESCENDANT = 4;
	    Step.DESCENDANTORSELF = 5;
	    Step.FOLLOWING = 6;
	    Step.FOLLOWINGSIBLING = 7;
	    Step.NAMESPACE = 8;
	    Step.PARENT = 9;
	    Step.PRECEDING = 10;
	    Step.PRECEDINGSIBLING = 11;
	    Step.SELF = 12;

	    Step.STEPNAMES = reduce(function (acc, x) { return acc[x[0]] = x[1], acc; }, {}, [
	        [Step.ANCESTOR, 'ancestor'],
	        [Step.ANCESTORORSELF, 'ancestor-or-self'],
	        [Step.ATTRIBUTE, 'attribute'],
	        [Step.CHILD, 'child'],
	        [Step.DESCENDANT, 'descendant'],
	        [Step.DESCENDANTORSELF, 'descendant-or-self'],
	        [Step.FOLLOWING, 'following'],
	        [Step.FOLLOWINGSIBLING, 'following-sibling'],
	        [Step.NAMESPACE, 'namespace'],
	        [Step.PARENT, 'parent'],
	        [Step.PRECEDING, 'preceding'],
	        [Step.PRECEDINGSIBLING, 'preceding-sibling'],
	        [Step.SELF, 'self']
	    ]);

	    // NodeTest //////////////////////////////////////////////////////////////////

	    NodeTest.prototype = new Object();
	    NodeTest.prototype.constructor = NodeTest;
	    NodeTest.superclass = Object.prototype;

	    function NodeTest(type, value) {
	        if (arguments.length > 0) {
	            this.init(type, value);
	        }
	    }

	    NodeTest.prototype.init = function (type, value) {
	        this.type = type;
	        this.value = value;
	    };

	    NodeTest.prototype.toString = function () {
	        return "<unknown nodetest type>";
	    };

	    NodeTest.prototype.matches = function (n, xpc) {
	        console.warn('unknown node test type');
	    };

	    NodeTest.NAMETESTANY = 0;
	    NodeTest.NAMETESTPREFIXANY = 1;
	    NodeTest.NAMETESTQNAME = 2;
	    NodeTest.COMMENT = 3;
	    NodeTest.TEXT = 4;
	    NodeTest.PI = 5;
	    NodeTest.NODE = 6;

	    NodeTest.isNodeType = function (types) {
	        return function (node) {
	            return includes(types, node.nodeType);
	        };
	    };

	    NodeTest.makeNodeTestType = function (type, members, ctor) {
	        var newType = ctor || function () { };

	        newType.prototype = new NodeTest(type);
	        newType.prototype.constructor = newType;

	        assign(newType.prototype, members);

	        return newType;
	    };
	    // create invariant node test for certain node types
	    NodeTest.makeNodeTypeTest = function (type, nodeTypes, stringVal) {
	        return new (NodeTest.makeNodeTestType(type, {
	            matches: NodeTest.isNodeType(nodeTypes),
	            toString: always(stringVal)
	        }))();
	    };

	    NodeTest.hasPrefix = function (node) {
	        return node.prefix || (node.nodeName || node.tagName).indexOf(':') !== -1;
	    };

	    NodeTest.isElementOrAttribute = NodeTest.isNodeType([1, 2]);
	    NodeTest.nameSpaceMatches = function (prefix, xpc, n) {
	        var nNamespace = (n.namespaceURI || '');

	        if (!prefix) {
	            return !nNamespace || (xpc.allowAnyNamespaceForNoPrefix && !NodeTest.hasPrefix(n));
	        }

	        var ns = xpc.namespaceResolver.getNamespace(prefix, xpc.expressionContextNode);

	        if (ns == null) {
	            throw new Error("Cannot resolve QName " + prefix);
	        }

	        return ns === nNamespace;
	    };
	    NodeTest.localNameMatches = function (localName, xpc, n) {
	        var nLocalName = (n.localName || n.nodeName);

	        return xpc.caseInsensitive
	            ? localName.toLowerCase() === nLocalName.toLowerCase()
	            : localName === nLocalName;
	    };

	    NodeTest.NameTestPrefixAny = NodeTest.makeNodeTestType(
	        NodeTest.NAMETESTPREFIXANY,
	        {
	            matches: function (n, xpc) {
	                return NodeTest.isElementOrAttribute(n) &&
	                    NodeTest.nameSpaceMatches(this.prefix, xpc, n);
	            },
	            toString: function () {
	                return this.prefix + ":*";
	            }
	        },
	        function NameTestPrefixAny(prefix) { this.prefix = prefix; }
	    );

	    NodeTest.NameTestQName = NodeTest.makeNodeTestType(
	        NodeTest.NAMETESTQNAME,
	        {
	            matches: function (n, xpc) {
	                return NodeTest.isNodeType([1, 2, XPathNamespace.XPATH_NAMESPACE_NODE])(n) &&
	                    NodeTest.nameSpaceMatches(this.prefix, xpc, n) &&
	                    NodeTest.localNameMatches(this.localName, xpc, n);
	            },
	            toString: function () {
	                return this.name;
	            }
	        },
	        function NameTestQName(name) {
	            var nameParts = name.split(':');

	            this.name = name;
	            this.prefix = nameParts.length > 1 ? nameParts[0] : null;
	            this.localName = nameParts[nameParts.length > 1 ? 1 : 0];
	        }
	    );

	    NodeTest.PITest = NodeTest.makeNodeTestType(NodeTest.PI, {
	        matches: function (n, xpc) {
	            return NodeTest.isNodeType([7])(n) && (n.target || n.nodeName) === this.name;
	        },
	        toString: function () {
	            return wrap('processing-instruction("', '")', this.name);
	        }
	    }, function (name) { this.name = name; });

	    // singletons

	    // elements, attributes, namespaces
	    NodeTest.nameTestAny = NodeTest.makeNodeTypeTest(NodeTest.NAMETESTANY, [1, 2, XPathNamespace.XPATH_NAMESPACE_NODE], '*');
	    // text, cdata
	    NodeTest.textTest = NodeTest.makeNodeTypeTest(NodeTest.TEXT, [3, 4], 'text()');
	    NodeTest.commentTest = NodeTest.makeNodeTypeTest(NodeTest.COMMENT, [8], 'comment()');
	    // elements, attributes, text, cdata, PIs, comments, document nodes
	    NodeTest.nodeTest = NodeTest.makeNodeTypeTest(NodeTest.NODE, [1, 2, 3, 4, 7, 8, 9], 'node()');
	    NodeTest.anyPiTest = NodeTest.makeNodeTypeTest(NodeTest.PI, [7], 'processing-instruction()');

	    // VariableReference /////////////////////////////////////////////////////////

	    VariableReference.prototype = new Expression();
	    VariableReference.prototype.constructor = VariableReference;
	    VariableReference.superclass = Expression.prototype;

	    function VariableReference(v) {
	        if (arguments.length > 0) {
	            this.init(v);
	        }
	    }

	    VariableReference.prototype.init = function (v) {
	        this.variable = v;
	    };

	    VariableReference.prototype.toString = function () {
	        return "$" + this.variable;
	    };

	    VariableReference.prototype.evaluate = function (c) {
	        var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);

	        if (parts[0] == null) {
	            throw new Error("Cannot resolve QName " + fn);
	        }
	        var result = c.variableResolver.getVariable(parts[1], parts[0]);
	        if (!result) {
	            throw XPathException.fromMessage("Undeclared variable: " + this.toString());
	        }
	        return result;
	    };

	    // FunctionCall //////////////////////////////////////////////////////////////

	    FunctionCall.prototype = new Expression();
	    FunctionCall.prototype.constructor = FunctionCall;
	    FunctionCall.superclass = Expression.prototype;

	    function FunctionCall(fn, args) {
	        if (arguments.length > 0) {
	            this.init(fn, args);
	        }
	    }

	    FunctionCall.prototype.init = function (fn, args) {
	        this.functionName = fn;
	        this.arguments = args;
	    };

	    FunctionCall.prototype.toString = function () {
	        var s = this.functionName + "(";
	        for (var i = 0; i < this.arguments.length; i++) {
	            if (i > 0) {
	                s += ", ";
	            }
	            s += this.arguments[i].toString();
	        }
	        return s + ")";
	    };

	    FunctionCall.prototype.evaluate = function (c) {
	        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);

	        if (!f) {
	            throw new Error("Unknown function " + this.functionName);
	        }

	        var a = [c].concat(this.arguments);
	        return f.apply(c.functionResolver.thisArg, a);
	    };

	    // Operators /////////////////////////////////////////////////////////////////

	    var Operators = new Object();

	    Operators.equals = function (l, r) {
	        return l.equals(r);
	    };

	    Operators.notequal = function (l, r) {
	        return l.notequal(r);
	    };

	    Operators.lessthan = function (l, r) {
	        return l.lessthan(r);
	    };

	    Operators.greaterthan = function (l, r) {
	        return l.greaterthan(r);
	    };

	    Operators.lessthanorequal = function (l, r) {
	        return l.lessthanorequal(r);
	    };

	    Operators.greaterthanorequal = function (l, r) {
	        return l.greaterthanorequal(r);
	    };

	    // XString ///////////////////////////////////////////////////////////////////

	    XString.prototype = new Expression();
	    XString.prototype.constructor = XString;
	    XString.superclass = Expression.prototype;

	    function XString(s) {
	        if (arguments.length > 0) {
	            this.init(s);
	        }
	    }

	    XString.prototype.init = function (s) {
	        this.str = String(s);
	    };

	    XString.prototype.toString = function () {
	        return this.str;
	    };

	    XString.prototype.evaluate = function (c) {
	        return this;
	    };

	    XString.prototype.string = function () {
	        return this;
	    };

	    XString.prototype.number = function () {
	        return new XNumber(this.str);
	    };

	    XString.prototype.bool = function () {
	        return new XBoolean(this.str);
	    };

	    XString.prototype.nodeset = function () {
	        throw new Error("Cannot convert string to nodeset");
	    };

	    XString.prototype.stringValue = function () {
	        return this.str;
	    };

	    XString.prototype.numberValue = function () {
	        return this.number().numberValue();
	    };

	    XString.prototype.booleanValue = function () {
	        return this.bool().booleanValue();
	    };

	    XString.prototype.equals = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().equals(r);
	        }
	        if (Utilities.instance_of(r, XNumber)) {
	            return this.number().equals(r);
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithString(this, Operators.equals);
	        }
	        return new XBoolean(this.str == r.str);
	    };

	    XString.prototype.notequal = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().notequal(r);
	        }
	        if (Utilities.instance_of(r, XNumber)) {
	            return this.number().notequal(r);
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithString(this, Operators.notequal);
	        }
	        return new XBoolean(this.str != r.str);
	    };

	    XString.prototype.lessthan = function (r) {
	        return this.number().lessthan(r);
	    };

	    XString.prototype.greaterthan = function (r) {
	        return this.number().greaterthan(r);
	    };

	    XString.prototype.lessthanorequal = function (r) {
	        return this.number().lessthanorequal(r);
	    };

	    XString.prototype.greaterthanorequal = function (r) {
	        return this.number().greaterthanorequal(r);
	    };

	    // XNumber ///////////////////////////////////////////////////////////////////

	    XNumber.prototype = new Expression();
	    XNumber.prototype.constructor = XNumber;
	    XNumber.superclass = Expression.prototype;

	    function XNumber(n) {
	        if (arguments.length > 0) {
	            this.init(n);
	        }
	    }

	    XNumber.prototype.init = function (n) {
	        this.num = typeof n === "string" ? this.parse(n) : Number(n);
	    };

	    XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;

	    XNumber.prototype.parse = function (s) {
	        // XPath representation of numbers is more restrictive than what Number() or parseFloat() allow
	        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN;
	    };

	    function padSmallNumber(numberStr) {
	        var parts = numberStr.split('e-');
	        var base = parts[0].replace('.', '');
	        var exponent = Number(parts[1]);

	        for (var i = 0; i < exponent - 1; i += 1) {
	            base = '0' + base;
	        }

	        return '0.' + base;
	    }

	    function padLargeNumber(numberStr) {
	        var parts = numberStr.split('e');
	        var base = parts[0].replace('.', '');
	        var exponent = Number(parts[1]);
	        var zerosToAppend = exponent + 1 - base.length;

	        for (var i = 0; i < zerosToAppend; i += 1) {
	            base += '0';
	        }

	        return base;
	    }

	    XNumber.prototype.toString = function () {
	        var strValue = this.num.toString();

	        if (strValue.indexOf('e-') !== -1) {
	            return padSmallNumber(strValue);
	        }

	        if (strValue.indexOf('e') !== -1) {
	            return padLargeNumber(strValue);
	        }

	        return strValue;
	    };

	    XNumber.prototype.evaluate = function (c) {
	        return this;
	    };

	    XNumber.prototype.string = function () {


	        return new XString(this.toString());
	    };

	    XNumber.prototype.number = function () {
	        return this;
	    };

	    XNumber.prototype.bool = function () {
	        return new XBoolean(this.num);
	    };

	    XNumber.prototype.nodeset = function () {
	        throw new Error("Cannot convert number to nodeset");
	    };

	    XNumber.prototype.stringValue = function () {
	        return this.string().stringValue();
	    };

	    XNumber.prototype.numberValue = function () {
	        return this.num;
	    };

	    XNumber.prototype.booleanValue = function () {
	        return this.bool().booleanValue();
	    };

	    XNumber.prototype.negate = function () {
	        return new XNumber(-this.num);
	    };

	    XNumber.prototype.equals = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().equals(r);
	        }
	        if (Utilities.instance_of(r, XString)) {
	            return this.equals(r.number());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.equals);
	        }
	        return new XBoolean(this.num == r.num);
	    };

	    XNumber.prototype.notequal = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().notequal(r);
	        }
	        if (Utilities.instance_of(r, XString)) {
	            return this.notequal(r.number());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.notequal);
	        }
	        return new XBoolean(this.num != r.num);
	    };

	    XNumber.prototype.lessthan = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.greaterthan);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.lessthan(r.number());
	        }
	        return new XBoolean(this.num < r.num);
	    };

	    XNumber.prototype.greaterthan = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.lessthan);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.greaterthan(r.number());
	        }
	        return new XBoolean(this.num > r.num);
	    };

	    XNumber.prototype.lessthanorequal = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.greaterthanorequal);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.lessthanorequal(r.number());
	        }
	        return new XBoolean(this.num <= r.num);
	    };

	    XNumber.prototype.greaterthanorequal = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.lessthanorequal);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.greaterthanorequal(r.number());
	        }
	        return new XBoolean(this.num >= r.num);
	    };

	    XNumber.prototype.plus = function (r) {
	        return new XNumber(this.num + r.num);
	    };

	    XNumber.prototype.minus = function (r) {
	        return new XNumber(this.num - r.num);
	    };

	    XNumber.prototype.multiply = function (r) {
	        return new XNumber(this.num * r.num);
	    };

	    XNumber.prototype.div = function (r) {
	        return new XNumber(this.num / r.num);
	    };

	    XNumber.prototype.mod = function (r) {
	        return new XNumber(this.num % r.num);
	    };

	    // XBoolean //////////////////////////////////////////////////////////////////

	    XBoolean.prototype = new Expression();
	    XBoolean.prototype.constructor = XBoolean;
	    XBoolean.superclass = Expression.prototype;

	    function XBoolean(b) {
	        if (arguments.length > 0) {
	            this.init(b);
	        }
	    }

	    XBoolean.prototype.init = function (b) {
	        this.b = Boolean(b);
	    };

	    XBoolean.prototype.toString = function () {
	        return this.b.toString();
	    };

	    XBoolean.prototype.evaluate = function (c) {
	        return this;
	    };

	    XBoolean.prototype.string = function () {
	        return new XString(this.b);
	    };

	    XBoolean.prototype.number = function () {
	        return new XNumber(this.b);
	    };

	    XBoolean.prototype.bool = function () {
	        return this;
	    };

	    XBoolean.prototype.nodeset = function () {
	        throw new Error("Cannot convert boolean to nodeset");
	    };

	    XBoolean.prototype.stringValue = function () {
	        return this.string().stringValue();
	    };

	    XBoolean.prototype.numberValue = function () {
	        return this.number().numberValue();
	    };

	    XBoolean.prototype.booleanValue = function () {
	        return this.b;
	    };

	    XBoolean.prototype.not = function () {
	        return new XBoolean(!this.b);
	    };

	    XBoolean.prototype.equals = function (r) {
	        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
	            return this.equals(r.bool());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithBoolean(this, Operators.equals);
	        }
	        return new XBoolean(this.b == r.b);
	    };

	    XBoolean.prototype.notequal = function (r) {
	        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
	            return this.notequal(r.bool());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithBoolean(this, Operators.notequal);
	        }
	        return new XBoolean(this.b != r.b);
	    };

	    XBoolean.prototype.lessthan = function (r) {
	        return this.number().lessthan(r);
	    };

	    XBoolean.prototype.greaterthan = function (r) {
	        return this.number().greaterthan(r);
	    };

	    XBoolean.prototype.lessthanorequal = function (r) {
	        return this.number().lessthanorequal(r);
	    };

	    XBoolean.prototype.greaterthanorequal = function (r) {
	        return this.number().greaterthanorequal(r);
	    };

	    XBoolean.true_ = new XBoolean(true);
	    XBoolean.false_ = new XBoolean(false);

	    // AVLTree ///////////////////////////////////////////////////////////////////

	    AVLTree.prototype = new Object();
	    AVLTree.prototype.constructor = AVLTree;
	    AVLTree.superclass = Object.prototype;

	    function AVLTree(n) {
	        this.init(n);
	    }

	    AVLTree.prototype.init = function (n) {
	        this.left = null;
	        this.right = null;
	        this.node = n;
	        this.depth = 1;
	    };

	    AVLTree.prototype.balance = function () {
	        var ldepth = this.left == null ? 0 : this.left.depth;
	        var rdepth = this.right == null ? 0 : this.right.depth;

	        if (ldepth > rdepth + 1) {
	            // LR or LL rotation
	            var lldepth = this.left.left == null ? 0 : this.left.left.depth;
	            var lrdepth = this.left.right == null ? 0 : this.left.right.depth;

	            if (lldepth < lrdepth) {
	                // LR rotation consists of a RR rotation of the left child
	                this.left.rotateRR();
	                // plus a LL rotation of this node, which happens anyway
	            }
	            this.rotateLL();
	        } else if (ldepth + 1 < rdepth) {
	            // RR or RL rorarion
	            var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
	            var rldepth = this.right.left == null ? 0 : this.right.left.depth;

	            if (rldepth > rrdepth) {
	                // RR rotation consists of a LL rotation of the right child
	                this.right.rotateLL();
	                // plus a RR rotation of this node, which happens anyway
	            }
	            this.rotateRR();
	        }
	    };

	    AVLTree.prototype.rotateLL = function () {
	        // the left side is too long => rotate from the left (_not_ leftwards)
	        var nodeBefore = this.node;
	        var rightBefore = this.right;
	        this.node = this.left.node;
	        this.right = this.left;
	        this.left = this.left.left;
	        this.right.left = this.right.right;
	        this.right.right = rightBefore;
	        this.right.node = nodeBefore;
	        this.right.updateInNewLocation();
	        this.updateInNewLocation();
	    };

	    AVLTree.prototype.rotateRR = function () {
	        // the right side is too long => rotate from the right (_not_ rightwards)
	        var nodeBefore = this.node;
	        var leftBefore = this.left;
	        this.node = this.right.node;
	        this.left = this.right;
	        this.right = this.right.right;
	        this.left.right = this.left.left;
	        this.left.left = leftBefore;
	        this.left.node = nodeBefore;
	        this.left.updateInNewLocation();
	        this.updateInNewLocation();
	    };

	    AVLTree.prototype.updateInNewLocation = function () {
	        this.getDepthFromChildren();
	    };

	    AVLTree.prototype.getDepthFromChildren = function () {
	        this.depth = this.node == null ? 0 : 1;
	        if (this.left != null) {
	            this.depth = this.left.depth + 1;
	        }
	        if (this.right != null && this.depth <= this.right.depth) {
	            this.depth = this.right.depth + 1;
	        }
	    };

	    function nodeOrder(n1, n2) {
	        if (n1 === n2) {
	            return 0;
	        }

	        if (n1.compareDocumentPosition) {
	            var cpos = n1.compareDocumentPosition(n2);

	            if (cpos & 0x01) {
	                // not in the same document; return an arbitrary result (is there a better way to do this)
	                return 1;
	            }
	            if (cpos & 0x0A) {
	                // n2 precedes or contains n1
	                return 1;
	            }
	            if (cpos & 0x14) {
	                // n2 follows or is contained by n1
	                return -1;
	            }

	            return 0;
	        }

	        var d1 = 0,
	            d2 = 0;
	        for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) {
	            d1++;
	        }
	        for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) {
	            d2++;
	        }

	        // step up to same depth
	        if (d1 > d2) {
	            while (d1 > d2) {
	                n1 = n1.parentNode || n1.ownerElement;
	                d1--;
	            }
	            if (n1 === n2) {
	                return 1;
	            }
	        } else if (d2 > d1) {
	            while (d2 > d1) {
	                n2 = n2.parentNode || n2.ownerElement;
	                d2--;
	            }
	            if (n1 === n2) {
	                return -1;
	            }
	        }

	        var n1Par = n1.parentNode || n1.ownerElement,
	            n2Par = n2.parentNode || n2.ownerElement;

	        // find common parent
	        while (n1Par !== n2Par) {
	            n1 = n1Par;
	            n2 = n2Par;
	            n1Par = n1.parentNode || n1.ownerElement;
	            n2Par = n2.parentNode || n2.ownerElement;
	        }

	        var n1isAttr = Utilities.isAttribute(n1);
	        var n2isAttr = Utilities.isAttribute(n2);

	        if (n1isAttr && !n2isAttr) {
	            return -1;
	        }
	        if (!n1isAttr && n2isAttr) {
	            return 1;
	        }

	        if (n1Par) {
	            var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes,
	                len = cn.length;
	            for (var i = 0; i < len; i += 1) {
	                var n = cn[i];
	                if (n === n1) {
	                    return -1;
	                }
	                if (n === n2) {
	                    return 1;
	                }
	            }
	        }

	        throw new Error('Unexpected: could not determine node order');
	    }

	    AVLTree.prototype.add = function (n) {
	        if (n === this.node) {
	            return false;
	        }

	        var o = nodeOrder(n, this.node);

	        var ret = false;
	        if (o == -1) {
	            if (this.left == null) {
	                this.left = new AVLTree(n);
	                ret = true;
	            } else {
	                ret = this.left.add(n);
	                if (ret) {
	                    this.balance();
	                }
	            }
	        } else if (o == 1) {
	            if (this.right == null) {
	                this.right = new AVLTree(n);
	                ret = true;
	            } else {
	                ret = this.right.add(n);
	                if (ret) {
	                    this.balance();
	                }
	            }
	        }

	        if (ret) {
	            this.getDepthFromChildren();
	        }
	        return ret;
	    };

	    // XNodeSet //////////////////////////////////////////////////////////////////

	    XNodeSet.prototype = new Expression();
	    XNodeSet.prototype.constructor = XNodeSet;
	    XNodeSet.superclass = Expression.prototype;

	    function XNodeSet() {
	        this.init();
	    }

	    XNodeSet.prototype.init = function () {
	        this.tree = null;
	        this.nodes = [];
	        this.size = 0;
	    };

	    XNodeSet.prototype.toString = function () {
	        var p = this.first();
	        if (p == null) {
	            return "";
	        }
	        return this.stringForNode(p);
	    };

	    XNodeSet.prototype.evaluate = function (c) {
	        return this;
	    };

	    XNodeSet.prototype.string = function () {
	        return new XString(this.toString());
	    };

	    XNodeSet.prototype.stringValue = function () {
	        return this.toString();
	    };

	    XNodeSet.prototype.number = function () {
	        return new XNumber(this.string());
	    };

	    XNodeSet.prototype.numberValue = function () {
	        return Number(this.string());
	    };

	    XNodeSet.prototype.bool = function () {
	        return new XBoolean(this.booleanValue());
	    };

	    XNodeSet.prototype.booleanValue = function () {
	        return !!this.size;
	    };

	    XNodeSet.prototype.nodeset = function () {
	        return this;
	    };

	    XNodeSet.prototype.stringForNode = function (n) {
	        if (n.nodeType == 9   /*Node.DOCUMENT_NODE*/ ||
	            n.nodeType == 1   /*Node.ELEMENT_NODE */ ||
	            n.nodeType === 11 /*Node.DOCUMENT_FRAGMENT*/) {
	            return this.stringForContainerNode(n);
	        }
	        if (n.nodeType === 2 /* Node.ATTRIBUTE_NODE */) {
	            return n.value || n.nodeValue;
	        }
	        if (n.isNamespaceNode) {
	            return n.namespace;
	        }
	        return n.nodeValue;
	    };

	    XNodeSet.prototype.stringForContainerNode = function (n) {
	        var s = "";
	        for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
	            var nt = n2.nodeType;
	            //  Element,    Text,       CDATA,      Document,   Document Fragment
	            if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) {
	                s += this.stringForNode(n2);
	            }
	        }
	        return s;
	    };

	    XNodeSet.prototype.buildTree = function () {
	        if (!this.tree && this.nodes.length) {
	            this.tree = new AVLTree(this.nodes[0]);
	            for (var i = 1; i < this.nodes.length; i += 1) {
	                this.tree.add(this.nodes[i]);
	            }
	        }

	        return this.tree;
	    };

	    XNodeSet.prototype.first = function () {
	        var p = this.buildTree();
	        if (p == null) {
	            return null;
	        }
	        while (p.left != null) {
	            p = p.left;
	        }
	        return p.node;
	    };

	    XNodeSet.prototype.add = function (n) {
	        for (var i = 0; i < this.nodes.length; i += 1) {
	            if (n === this.nodes[i]) {
	                return;
	            }
	        }

	        this.tree = null;
	        this.nodes.push(n);
	        this.size += 1;
	    };

	    XNodeSet.prototype.addArray = function (ns) {
	        var self = this;

	        forEach(function (x) { self.add(x); }, ns);
	    };

	    /**
	     * Returns an array of the node set's contents in document order
	     */
	    XNodeSet.prototype.toArray = function () {
	        var a = [];
	        this.toArrayRec(this.buildTree(), a);
	        return a;
	    };

	    XNodeSet.prototype.toArrayRec = function (t, a) {
	        if (t != null) {
	            this.toArrayRec(t.left, a);
	            a.push(t.node);
	            this.toArrayRec(t.right, a);
	        }
	    };

	    /**
	     * Returns an array of the node set's contents in arbitrary order
	     */
	    XNodeSet.prototype.toUnsortedArray = function () {
	        return this.nodes.slice();
	    };

	    XNodeSet.prototype.compareWithString = function (r, o) {
	        var a = this.toUnsortedArray();
	        for (var i = 0; i < a.length; i++) {
	            var n = a[i];
	            var l = new XString(this.stringForNode(n));
	            var res = o(l, r);
	            if (res.booleanValue()) {
	                return res;
	            }
	        }
	        return new XBoolean(false);
	    };

	    XNodeSet.prototype.compareWithNumber = function (r, o) {
	        var a = this.toUnsortedArray();
	        for (var i = 0; i < a.length; i++) {
	            var n = a[i];
	            var l = new XNumber(this.stringForNode(n));
	            var res = o(l, r);
	            if (res.booleanValue()) {
	                return res;
	            }
	        }
	        return new XBoolean(false);
	    };

	    XNodeSet.prototype.compareWithBoolean = function (r, o) {
	        return o(this.bool(), r);
	    };

	    XNodeSet.prototype.compareWithNodeSet = function (r, o) {
	        var arr = this.toUnsortedArray();
	        var oInvert = function (lop, rop) { return o(rop, lop); };

	        for (var i = 0; i < arr.length; i++) {
	            var l = new XString(this.stringForNode(arr[i]));

	            var res = r.compareWithString(l, oInvert);
	            if (res.booleanValue()) {
	                return res;
	            }
	        }

	        return new XBoolean(false);
	    };

	    XNodeSet.compareWith = curry(function (o, r) {
	        if (Utilities.instance_of(r, XString)) {
	            return this.compareWithString(r, o);
	        }
	        if (Utilities.instance_of(r, XNumber)) {
	            return this.compareWithNumber(r, o);
	        }
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.compareWithBoolean(r, o);
	        }
	        return this.compareWithNodeSet(r, o);
	    });

	    XNodeSet.prototype.equals = XNodeSet.compareWith(Operators.equals);
	    XNodeSet.prototype.notequal = XNodeSet.compareWith(Operators.notequal);
	    XNodeSet.prototype.lessthan = XNodeSet.compareWith(Operators.lessthan);
	    XNodeSet.prototype.greaterthan = XNodeSet.compareWith(Operators.greaterthan);
	    XNodeSet.prototype.lessthanorequal = XNodeSet.compareWith(Operators.lessthanorequal);
	    XNodeSet.prototype.greaterthanorequal = XNodeSet.compareWith(Operators.greaterthanorequal);

	    XNodeSet.prototype.union = function (r) {
	        var ns = new XNodeSet();
	        ns.addArray(this.toUnsortedArray());
	        ns.addArray(r.toUnsortedArray());
	        return ns;
	    };

	    // XPathNamespace ////////////////////////////////////////////////////////////

	    XPathNamespace.prototype = new Object();
	    XPathNamespace.prototype.constructor = XPathNamespace;
	    XPathNamespace.superclass = Object.prototype;

	    function XPathNamespace(pre, ns, p) {
	        this.isXPathNamespace = true;
	        this.ownerDocument = p.ownerDocument;
	        this.nodeName = "#namespace";
	        this.prefix = pre;
	        this.localName = pre;
	        this.namespaceURI = ns;
	        this.nodeValue = ns;
	        this.ownerElement = p;
	        this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
	    }

	    XPathNamespace.prototype.toString = function () {
	        return "{ \"" + this.prefix + "\", \"" + this.namespaceURI + "\" }";
	    };

	    // XPathContext //////////////////////////////////////////////////////////////

	    XPathContext.prototype = new Object();
	    XPathContext.prototype.constructor = XPathContext;
	    XPathContext.superclass = Object.prototype;

	    function XPathContext(vr, nr, fr) {
	        this.variableResolver = vr != null ? vr : new VariableResolver();
	        this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
	        this.functionResolver = fr != null ? fr : new FunctionResolver();
	    }

	    XPathContext.prototype.extend = function (newProps) {
	        return assign(new XPathContext(), this, newProps);
	    };

	    // VariableResolver //////////////////////////////////////////////////////////

	    VariableResolver.prototype = new Object();
	    VariableResolver.prototype.constructor = VariableResolver;
	    VariableResolver.superclass = Object.prototype;

	    function VariableResolver() {
	    }

	    VariableResolver.prototype.getVariable = function (ln, ns) {
	        return null;
	    };

	    // FunctionResolver //////////////////////////////////////////////////////////

	    FunctionResolver.prototype = new Object();
	    FunctionResolver.prototype.constructor = FunctionResolver;
	    FunctionResolver.superclass = Object.prototype;

	    function FunctionResolver(thisArg) {
	        this.thisArg = thisArg != null ? thisArg : Functions;
	        this.functions = new Object();
	        this.addStandardFunctions();
	    }

	    FunctionResolver.prototype.addStandardFunctions = function () {
	        this.functions["{}last"] = Functions.last;
	        this.functions["{}position"] = Functions.position;
	        this.functions["{}count"] = Functions.count;
	        this.functions["{}id"] = Functions.id;
	        this.functions["{}local-name"] = Functions.localName;
	        this.functions["{}namespace-uri"] = Functions.namespaceURI;
	        this.functions["{}name"] = Functions.name;
	        this.functions["{}string"] = Functions.string;
	        this.functions["{}concat"] = Functions.concat;
	        this.functions["{}starts-with"] = Functions.startsWith;
	        this.functions["{}contains"] = Functions.contains;
	        this.functions["{}substring-before"] = Functions.substringBefore;
	        this.functions["{}substring-after"] = Functions.substringAfter;
	        this.functions["{}substring"] = Functions.substring;
	        this.functions["{}string-length"] = Functions.stringLength;
	        this.functions["{}normalize-space"] = Functions.normalizeSpace;
	        this.functions["{}translate"] = Functions.translate;
	        this.functions["{}boolean"] = Functions.boolean_;
	        this.functions["{}not"] = Functions.not;
	        this.functions["{}true"] = Functions.true_;
	        this.functions["{}false"] = Functions.false_;
	        this.functions["{}lang"] = Functions.lang;
	        this.functions["{}number"] = Functions.number;
	        this.functions["{}sum"] = Functions.sum;
	        this.functions["{}floor"] = Functions.floor;
	        this.functions["{}ceiling"] = Functions.ceiling;
	        this.functions["{}round"] = Functions.round;
	    };

	    FunctionResolver.prototype.addFunction = function (ns, ln, f) {
	        this.functions["{" + ns + "}" + ln] = f;
	    };

	    FunctionResolver.getFunctionFromContext = function (qName, context) {
	        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);

	        if (parts[0] === null) {
	            throw new Error("Cannot resolve QName " + name);
	        }

	        return context.functionResolver.getFunction(parts[1], parts[0]);
	    };

	    FunctionResolver.prototype.getFunction = function (localName, namespace) {
	        return this.functions["{" + namespace + "}" + localName];
	    };

	    // NamespaceResolver /////////////////////////////////////////////////////////

	    NamespaceResolver.prototype = new Object();
	    NamespaceResolver.prototype.constructor = NamespaceResolver;
	    NamespaceResolver.superclass = Object.prototype;

	    function NamespaceResolver() {
	    }

	    NamespaceResolver.prototype.getNamespace = function (prefix, n) {
	        if (prefix == "xml") {
	            return XPath.XML_NAMESPACE_URI;
	        } else if (prefix == "xmlns") {
	            return XPath.XMLNS_NAMESPACE_URI;
	        }
	        if (n.nodeType == 9 /*Node.DOCUMENT_NODE*/) {
	            n = n.documentElement;
	        } else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
	            n = PathExpr.getOwnerElement(n);
	        } else if (n.nodeType != 1 /*Node.ELEMENT_NODE*/) {
	            n = n.parentNode;
	        }
	        while (n != null && n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
	            var nnm = n.attributes;
	            for (var i = 0; i < nnm.length; i++) {
	                var a = nnm.item(i);
	                var aname = a.name || a.nodeName;
	                if ((aname === "xmlns" && prefix === "")
	                    || aname === "xmlns:" + prefix) {
	                    return String(a.value || a.nodeValue);
	                }
	            }
	            n = n.parentNode;
	        }
	        return null;
	    };

	    // Functions /////////////////////////////////////////////////////////////////

	    var Functions = new Object();

	    Functions.last = function (c) {
	        if (arguments.length != 1) {
	            throw new Error("Function last expects ()");
	        }

	        return new XNumber(c.contextSize);
	    };

	    Functions.position = function (c) {
	        if (arguments.length != 1) {
	            throw new Error("Function position expects ()");
	        }

	        return new XNumber(c.contextPosition);
	    };

	    Functions.count = function () {
	        var c = arguments[0];
	        var ns;
	        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
	            throw new Error("Function count expects (node-set)");
	        }
	        return new XNumber(ns.size);
	    };

	    Functions.id = function () {
	        var c = arguments[0];
	        var id;
	        if (arguments.length != 2) {
	            throw new Error("Function id expects (object)");
	        }
	        id = arguments[1].evaluate(c);
	        if (Utilities.instance_of(id, XNodeSet)) {
	            id = id.toArray().join(" ");
	        } else {
	            id = id.stringValue();
	        }
	        var ids = id.split(/[\x0d\x0a\x09\x20]+/);
	        var count = 0;
	        var ns = new XNodeSet();
	        var doc = c.contextNode.nodeType == 9 /*Node.DOCUMENT_NODE*/
	            ? c.contextNode
	            : c.contextNode.ownerDocument;
	        for (var i = 0; i < ids.length; i++) {
	            var n;
	            if (doc.getElementById) {
	                n = doc.getElementById(ids[i]);
	            } else {
	                n = Utilities.getElementById(doc, ids[i]);
	            }
	            if (n != null) {
	                ns.add(n);
	                count++;
	            }
	        }
	        return ns;
	    };

	    Functions.localName = function (c, eNode) {
	        var n;

	        if (arguments.length == 1) {
	            n = c.contextNode;
	        } else if (arguments.length == 2) {
	            n = eNode.evaluate(c).first();
	        } else {
	            throw new Error("Function local-name expects (node-set?)");
	        }

	        if (n == null) {
	            return new XString("");
	        }

	        return new XString(
	            n.localName ||     //  standard elements and attributes
	            n.baseName ||     //  IE
	            n.target ||     //  processing instructions
	            n.nodeName ||     //  DOM1 elements
	            ""                 //  fallback
	        );
	    };

	    Functions.namespaceURI = function () {
	        var c = arguments[0];
	        var n;
	        if (arguments.length == 1) {
	            n = c.contextNode;
	        } else if (arguments.length == 2) {
	            n = arguments[1].evaluate(c).first();
	        } else {
	            throw new Error("Function namespace-uri expects (node-set?)");
	        }
	        if (n == null) {
	            return new XString("");
	        }
	        return new XString(n.namespaceURI);
	    };

	    Functions.name = function () {
	        var c = arguments[0];
	        var n;
	        if (arguments.length == 1) {
	            n = c.contextNode;
	        } else if (arguments.length == 2) {
	            n = arguments[1].evaluate(c).first();
	        } else {
	            throw new Error("Function name expects (node-set?)");
	        }
	        if (n == null) {
	            return new XString("");
	        }
	        if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
	            return new XString(n.nodeName);
	        } else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
	            return new XString(n.name || n.nodeName);
	        } else if (n.nodeType === 7 /*Node.PROCESSING_INSTRUCTION_NODE*/) {
	            return new XString(n.target || n.nodeName);
	        } else if (n.localName == null) {
	            return new XString("");
	        } else {
	            return new XString(n.localName);
	        }
	    };

	    Functions.string = function () {
	        var c = arguments[0];
	        if (arguments.length == 1) {
	            return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
	        } else if (arguments.length == 2) {
	            return arguments[1].evaluate(c).string();
	        }
	        throw new Error("Function string expects (object?)");
	    };

	    Functions.concat = function (c) {
	        if (arguments.length < 3) {
	            throw new Error("Function concat expects (string, string[, string]*)");
	        }
	        var s = "";
	        for (var i = 1; i < arguments.length; i++) {
	            s += arguments[i].evaluate(c).stringValue();
	        }
	        return new XString(s);
	    };

	    Functions.startsWith = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function startsWith expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        return new XBoolean(s1.substring(0, s2.length) == s2);
	    };

	    Functions.contains = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function contains expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        return new XBoolean(s1.indexOf(s2) !== -1);
	    };

	    Functions.substringBefore = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function substring-before expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        return new XString(s1.substring(0, s1.indexOf(s2)));
	    };

	    Functions.substringAfter = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function substring-after expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        if (s2.length == 0) {
	            return new XString(s1);
	        }
	        var i = s1.indexOf(s2);
	        if (i == -1) {
	            return new XString("");
	        }
	        return new XString(s1.substring(i + s2.length));
	    };

	    Functions.substring = function () {
	        var c = arguments[0];
	        if (!(arguments.length == 3 || arguments.length == 4)) {
	            throw new Error("Function substring expects (string, number, number?)");
	        }
	        var s = arguments[1].evaluate(c).stringValue();
	        var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
	        var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : undefined;
	        return new XString(s.substring(n1, n2));
	    };

	    Functions.stringLength = function () {
	        var c = arguments[0];
	        var s;
	        if (arguments.length == 1) {
	            s = XNodeSet.prototype.stringForNode(c.contextNode);
	        } else if (arguments.length == 2) {
	            s = arguments[1].evaluate(c).stringValue();
	        } else {
	            throw new Error("Function string-length expects (string?)");
	        }
	        return new XNumber(s.length);
	    };

	    Functions.normalizeSpace = function () {
	        var c = arguments[0];
	        var s;
	        if (arguments.length == 1) {
	            s = XNodeSet.prototype.stringForNode(c.contextNode);
	        } else if (arguments.length == 2) {
	            s = arguments[1].evaluate(c).stringValue();
	        } else {
	            throw new Error("Function normalize-space expects (string?)");
	        }
	        var i = 0;
	        var j = s.length - 1;
	        while (Utilities.isSpace(s.charCodeAt(j))) {
	            j--;
	        }
	        var t = "";
	        while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
	            i++;
	        }
	        while (i <= j) {
	            if (Utilities.isSpace(s.charCodeAt(i))) {
	                t += " ";
	                while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
	                    i++;
	                }
	            } else {
	                t += s.charAt(i);
	                i++;
	            }
	        }
	        return new XString(t);
	    };

	    Functions.translate = function (c, eValue, eFrom, eTo) {
	        if (arguments.length != 4) {
	            throw new Error("Function translate expects (string, string, string)");
	        }

	        var value = eValue.evaluate(c).stringValue();
	        var from = eFrom.evaluate(c).stringValue();
	        var to = eTo.evaluate(c).stringValue();

	        var cMap = reduce(function (acc, ch, i) {
	            if (!(ch in acc)) {
	                acc[ch] = i > to.length ? '' : to[i];
	            }
	            return acc;
	        }, {}, from);

	        var t = join(
	            '',
	            map(function (ch) {
	                return ch in cMap ? cMap[ch] : ch;
	            }, value)
	        );

	        return new XString(t);
	    };

	    Functions.boolean_ = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function boolean expects (object)");
	        }
	        return arguments[1].evaluate(c).bool();
	    };

	    Functions.not = function (c, eValue) {
	        if (arguments.length != 2) {
	            throw new Error("Function not expects (object)");
	        }
	        return eValue.evaluate(c).bool().not();
	    };

	    Functions.true_ = function () {
	        if (arguments.length != 1) {
	            throw new Error("Function true expects ()");
	        }
	        return XBoolean.true_;
	    };

	    Functions.false_ = function () {
	        if (arguments.length != 1) {
	            throw new Error("Function false expects ()");
	        }
	        return XBoolean.false_;
	    };

	    Functions.lang = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function lang expects (string)");
	        }
	        var lang;
	        for (var n = c.contextNode; n != null && n.nodeType != 9 /*Node.DOCUMENT_NODE*/; n = n.parentNode) {
	            var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
	            if (a != null) {
	                lang = String(a);
	                break;
	            }
	        }
	        if (lang == null) {
	            return XBoolean.false_;
	        }
	        var s = arguments[1].evaluate(c).stringValue();
	        return new XBoolean(lang.substring(0, s.length) == s
	            && (lang.length == s.length || lang.charAt(s.length) == '-'));
	    };

	    Functions.number = function () {
	        var c = arguments[0];
	        if (!(arguments.length == 1 || arguments.length == 2)) {
	            throw new Error("Function number expects (object?)");
	        }
	        if (arguments.length == 1) {
	            return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
	        }
	        return arguments[1].evaluate(c).number();
	    };

	    Functions.sum = function () {
	        var c = arguments[0];
	        var ns;
	        if (arguments.length != 2 || !Utilities.instance_of((ns = arguments[1].evaluate(c)), XNodeSet)) {
	            throw new Error("Function sum expects (node-set)");
	        }
	        ns = ns.toUnsortedArray();
	        var n = 0;
	        for (var i = 0; i < ns.length; i++) {
	            n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
	        }
	        return new XNumber(n);
	    };

	    Functions.floor = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function floor expects (number)");
	        }
	        return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
	    };

	    Functions.ceiling = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function ceiling expects (number)");
	        }
	        return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
	    };

	    Functions.round = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function round expects (number)");
	        }
	        return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
	    };

	    // Utilities /////////////////////////////////////////////////////////////////

	    var Utilities = new Object();

	    Utilities.isAttribute = function (val) {
	        return val && (val.nodeType === 2 || val.ownerElement);
	    };

	    Utilities.splitQName = function (qn) {
	        var i = qn.indexOf(":");
	        if (i == -1) {
	            return [null, qn];
	        }
	        return [qn.substring(0, i), qn.substring(i + 1)];
	    };

	    Utilities.resolveQName = function (qn, nr, n, useDefault) {
	        var parts = Utilities.splitQName(qn);
	        if (parts[0] != null) {
	            parts[0] = nr.getNamespace(parts[0], n);
	        } else {
	            if (useDefault) {
	                parts[0] = nr.getNamespace("", n);
	                if (parts[0] == null) {
	                    parts[0] = "";
	                }
	            } else {
	                parts[0] = "";
	            }
	        }
	        return parts;
	    };

	    Utilities.isSpace = function (c) {
	        return c == 0x9 || c == 0xd || c == 0xa || c == 0x20;
	    };

	    Utilities.isLetter = function (c) {
	        return c >= 0x0041 && c <= 0x005A ||
	            c >= 0x0061 && c <= 0x007A ||
	            c >= 0x00C0 && c <= 0x00D6 ||
	            c >= 0x00D8 && c <= 0x00F6 ||
	            c >= 0x00F8 && c <= 0x00FF ||
	            c >= 0x0100 && c <= 0x0131 ||
	            c >= 0x0134 && c <= 0x013E ||
	            c >= 0x0141 && c <= 0x0148 ||
	            c >= 0x014A && c <= 0x017E ||
	            c >= 0x0180 && c <= 0x01C3 ||
	            c >= 0x01CD && c <= 0x01F0 ||
	            c >= 0x01F4 && c <= 0x01F5 ||
	            c >= 0x01FA && c <= 0x0217 ||
	            c >= 0x0250 && c <= 0x02A8 ||
	            c >= 0x02BB && c <= 0x02C1 ||
	            c == 0x0386 ||
	            c >= 0x0388 && c <= 0x038A ||
	            c == 0x038C ||
	            c >= 0x038E && c <= 0x03A1 ||
	            c >= 0x03A3 && c <= 0x03CE ||
	            c >= 0x03D0 && c <= 0x03D6 ||
	            c == 0x03DA ||
	            c == 0x03DC ||
	            c == 0x03DE ||
	            c == 0x03E0 ||
	            c >= 0x03E2 && c <= 0x03F3 ||
	            c >= 0x0401 && c <= 0x040C ||
	            c >= 0x040E && c <= 0x044F ||
	            c >= 0x0451 && c <= 0x045C ||
	            c >= 0x045E && c <= 0x0481 ||
	            c >= 0x0490 && c <= 0x04C4 ||
	            c >= 0x04C7 && c <= 0x04C8 ||
	            c >= 0x04CB && c <= 0x04CC ||
	            c >= 0x04D0 && c <= 0x04EB ||
	            c >= 0x04EE && c <= 0x04F5 ||
	            c >= 0x04F8 && c <= 0x04F9 ||
	            c >= 0x0531 && c <= 0x0556 ||
	            c == 0x0559 ||
	            c >= 0x0561 && c <= 0x0586 ||
	            c >= 0x05D0 && c <= 0x05EA ||
	            c >= 0x05F0 && c <= 0x05F2 ||
	            c >= 0x0621 && c <= 0x063A ||
	            c >= 0x0641 && c <= 0x064A ||
	            c >= 0x0671 && c <= 0x06B7 ||
	            c >= 0x06BA && c <= 0x06BE ||
	            c >= 0x06C0 && c <= 0x06CE ||
	            c >= 0x06D0 && c <= 0x06D3 ||
	            c == 0x06D5 ||
	            c >= 0x06E5 && c <= 0x06E6 ||
	            c >= 0x0905 && c <= 0x0939 ||
	            c == 0x093D ||
	            c >= 0x0958 && c <= 0x0961 ||
	            c >= 0x0985 && c <= 0x098C ||
	            c >= 0x098F && c <= 0x0990 ||
	            c >= 0x0993 && c <= 0x09A8 ||
	            c >= 0x09AA && c <= 0x09B0 ||
	            c == 0x09B2 ||
	            c >= 0x09B6 && c <= 0x09B9 ||
	            c >= 0x09DC && c <= 0x09DD ||
	            c >= 0x09DF && c <= 0x09E1 ||
	            c >= 0x09F0 && c <= 0x09F1 ||
	            c >= 0x0A05 && c <= 0x0A0A ||
	            c >= 0x0A0F && c <= 0x0A10 ||
	            c >= 0x0A13 && c <= 0x0A28 ||
	            c >= 0x0A2A && c <= 0x0A30 ||
	            c >= 0x0A32 && c <= 0x0A33 ||
	            c >= 0x0A35 && c <= 0x0A36 ||
	            c >= 0x0A38 && c <= 0x0A39 ||
	            c >= 0x0A59 && c <= 0x0A5C ||
	            c == 0x0A5E ||
	            c >= 0x0A72 && c <= 0x0A74 ||
	            c >= 0x0A85 && c <= 0x0A8B ||
	            c == 0x0A8D ||
	            c >= 0x0A8F && c <= 0x0A91 ||
	            c >= 0x0A93 && c <= 0x0AA8 ||
	            c >= 0x0AAA && c <= 0x0AB0 ||
	            c >= 0x0AB2 && c <= 0x0AB3 ||
	            c >= 0x0AB5 && c <= 0x0AB9 ||
	            c == 0x0ABD ||
	            c == 0x0AE0 ||
	            c >= 0x0B05 && c <= 0x0B0C ||
	            c >= 0x0B0F && c <= 0x0B10 ||
	            c >= 0x0B13 && c <= 0x0B28 ||
	            c >= 0x0B2A && c <= 0x0B30 ||
	            c >= 0x0B32 && c <= 0x0B33 ||
	            c >= 0x0B36 && c <= 0x0B39 ||
	            c == 0x0B3D ||
	            c >= 0x0B5C && c <= 0x0B5D ||
	            c >= 0x0B5F && c <= 0x0B61 ||
	            c >= 0x0B85 && c <= 0x0B8A ||
	            c >= 0x0B8E && c <= 0x0B90 ||
	            c >= 0x0B92 && c <= 0x0B95 ||
	            c >= 0x0B99 && c <= 0x0B9A ||
	            c == 0x0B9C ||
	            c >= 0x0B9E && c <= 0x0B9F ||
	            c >= 0x0BA3 && c <= 0x0BA4 ||
	            c >= 0x0BA8 && c <= 0x0BAA ||
	            c >= 0x0BAE && c <= 0x0BB5 ||
	            c >= 0x0BB7 && c <= 0x0BB9 ||
	            c >= 0x0C05 && c <= 0x0C0C ||
	            c >= 0x0C0E && c <= 0x0C10 ||
	            c >= 0x0C12 && c <= 0x0C28 ||
	            c >= 0x0C2A && c <= 0x0C33 ||
	            c >= 0x0C35 && c <= 0x0C39 ||
	            c >= 0x0C60 && c <= 0x0C61 ||
	            c >= 0x0C85 && c <= 0x0C8C ||
	            c >= 0x0C8E && c <= 0x0C90 ||
	            c >= 0x0C92 && c <= 0x0CA8 ||
	            c >= 0x0CAA && c <= 0x0CB3 ||
	            c >= 0x0CB5 && c <= 0x0CB9 ||
	            c == 0x0CDE ||
	            c >= 0x0CE0 && c <= 0x0CE1 ||
	            c >= 0x0D05 && c <= 0x0D0C ||
	            c >= 0x0D0E && c <= 0x0D10 ||
	            c >= 0x0D12 && c <= 0x0D28 ||
	            c >= 0x0D2A && c <= 0x0D39 ||
	            c >= 0x0D60 && c <= 0x0D61 ||
	            c >= 0x0E01 && c <= 0x0E2E ||
	            c == 0x0E30 ||
	            c >= 0x0E32 && c <= 0x0E33 ||
	            c >= 0x0E40 && c <= 0x0E45 ||
	            c >= 0x0E81 && c <= 0x0E82 ||
	            c == 0x0E84 ||
	            c >= 0x0E87 && c <= 0x0E88 ||
	            c == 0x0E8A ||
	            c == 0x0E8D ||
	            c >= 0x0E94 && c <= 0x0E97 ||
	            c >= 0x0E99 && c <= 0x0E9F ||
	            c >= 0x0EA1 && c <= 0x0EA3 ||
	            c == 0x0EA5 ||
	            c == 0x0EA7 ||
	            c >= 0x0EAA && c <= 0x0EAB ||
	            c >= 0x0EAD && c <= 0x0EAE ||
	            c == 0x0EB0 ||
	            c >= 0x0EB2 && c <= 0x0EB3 ||
	            c == 0x0EBD ||
	            c >= 0x0EC0 && c <= 0x0EC4 ||
	            c >= 0x0F40 && c <= 0x0F47 ||
	            c >= 0x0F49 && c <= 0x0F69 ||
	            c >= 0x10A0 && c <= 0x10C5 ||
	            c >= 0x10D0 && c <= 0x10F6 ||
	            c == 0x1100 ||
	            c >= 0x1102 && c <= 0x1103 ||
	            c >= 0x1105 && c <= 0x1107 ||
	            c == 0x1109 ||
	            c >= 0x110B && c <= 0x110C ||
	            c >= 0x110E && c <= 0x1112 ||
	            c == 0x113C ||
	            c == 0x113E ||
	            c == 0x1140 ||
	            c == 0x114C ||
	            c == 0x114E ||
	            c == 0x1150 ||
	            c >= 0x1154 && c <= 0x1155 ||
	            c == 0x1159 ||
	            c >= 0x115F && c <= 0x1161 ||
	            c == 0x1163 ||
	            c == 0x1165 ||
	            c == 0x1167 ||
	            c == 0x1169 ||
	            c >= 0x116D && c <= 0x116E ||
	            c >= 0x1172 && c <= 0x1173 ||
	            c == 0x1175 ||
	            c == 0x119E ||
	            c == 0x11A8 ||
	            c == 0x11AB ||
	            c >= 0x11AE && c <= 0x11AF ||
	            c >= 0x11B7 && c <= 0x11B8 ||
	            c == 0x11BA ||
	            c >= 0x11BC && c <= 0x11C2 ||
	            c == 0x11EB ||
	            c == 0x11F0 ||
	            c == 0x11F9 ||
	            c >= 0x1E00 && c <= 0x1E9B ||
	            c >= 0x1EA0 && c <= 0x1EF9 ||
	            c >= 0x1F00 && c <= 0x1F15 ||
	            c >= 0x1F18 && c <= 0x1F1D ||
	            c >= 0x1F20 && c <= 0x1F45 ||
	            c >= 0x1F48 && c <= 0x1F4D ||
	            c >= 0x1F50 && c <= 0x1F57 ||
	            c == 0x1F59 ||
	            c == 0x1F5B ||
	            c == 0x1F5D ||
	            c >= 0x1F5F && c <= 0x1F7D ||
	            c >= 0x1F80 && c <= 0x1FB4 ||
	            c >= 0x1FB6 && c <= 0x1FBC ||
	            c == 0x1FBE ||
	            c >= 0x1FC2 && c <= 0x1FC4 ||
	            c >= 0x1FC6 && c <= 0x1FCC ||
	            c >= 0x1FD0 && c <= 0x1FD3 ||
	            c >= 0x1FD6 && c <= 0x1FDB ||
	            c >= 0x1FE0 && c <= 0x1FEC ||
	            c >= 0x1FF2 && c <= 0x1FF4 ||
	            c >= 0x1FF6 && c <= 0x1FFC ||
	            c == 0x2126 ||
	            c >= 0x212A && c <= 0x212B ||
	            c == 0x212E ||
	            c >= 0x2180 && c <= 0x2182 ||
	            c >= 0x3041 && c <= 0x3094 ||
	            c >= 0x30A1 && c <= 0x30FA ||
	            c >= 0x3105 && c <= 0x312C ||
	            c >= 0xAC00 && c <= 0xD7A3 ||
	            c >= 0x4E00 && c <= 0x9FA5 ||
	            c == 0x3007 ||
	            c >= 0x3021 && c <= 0x3029;
	    };

	    Utilities.isNCNameChar = function (c) {
	        return c >= 0x0030 && c <= 0x0039
	            || c >= 0x0660 && c <= 0x0669
	            || c >= 0x06F0 && c <= 0x06F9
	            || c >= 0x0966 && c <= 0x096F
	            || c >= 0x09E6 && c <= 0x09EF
	            || c >= 0x0A66 && c <= 0x0A6F
	            || c >= 0x0AE6 && c <= 0x0AEF
	            || c >= 0x0B66 && c <= 0x0B6F
	            || c >= 0x0BE7 && c <= 0x0BEF
	            || c >= 0x0C66 && c <= 0x0C6F
	            || c >= 0x0CE6 && c <= 0x0CEF
	            || c >= 0x0D66 && c <= 0x0D6F
	            || c >= 0x0E50 && c <= 0x0E59
	            || c >= 0x0ED0 && c <= 0x0ED9
	            || c >= 0x0F20 && c <= 0x0F29
	            || c == 0x002E
	            || c == 0x002D
	            || c == 0x005F
	            || Utilities.isLetter(c)
	            || c >= 0x0300 && c <= 0x0345
	            || c >= 0x0360 && c <= 0x0361
	            || c >= 0x0483 && c <= 0x0486
	            || c >= 0x0591 && c <= 0x05A1
	            || c >= 0x05A3 && c <= 0x05B9
	            || c >= 0x05BB && c <= 0x05BD
	            || c == 0x05BF
	            || c >= 0x05C1 && c <= 0x05C2
	            || c == 0x05C4
	            || c >= 0x064B && c <= 0x0652
	            || c == 0x0670
	            || c >= 0x06D6 && c <= 0x06DC
	            || c >= 0x06DD && c <= 0x06DF
	            || c >= 0x06E0 && c <= 0x06E4
	            || c >= 0x06E7 && c <= 0x06E8
	            || c >= 0x06EA && c <= 0x06ED
	            || c >= 0x0901 && c <= 0x0903
	            || c == 0x093C
	            || c >= 0x093E && c <= 0x094C
	            || c == 0x094D
	            || c >= 0x0951 && c <= 0x0954
	            || c >= 0x0962 && c <= 0x0963
	            || c >= 0x0981 && c <= 0x0983
	            || c == 0x09BC
	            || c == 0x09BE
	            || c == 0x09BF
	            || c >= 0x09C0 && c <= 0x09C4
	            || c >= 0x09C7 && c <= 0x09C8
	            || c >= 0x09CB && c <= 0x09CD
	            || c == 0x09D7
	            || c >= 0x09E2 && c <= 0x09E3
	            || c == 0x0A02
	            || c == 0x0A3C
	            || c == 0x0A3E
	            || c == 0x0A3F
	            || c >= 0x0A40 && c <= 0x0A42
	            || c >= 0x0A47 && c <= 0x0A48
	            || c >= 0x0A4B && c <= 0x0A4D
	            || c >= 0x0A70 && c <= 0x0A71
	            || c >= 0x0A81 && c <= 0x0A83
	            || c == 0x0ABC
	            || c >= 0x0ABE && c <= 0x0AC5
	            || c >= 0x0AC7 && c <= 0x0AC9
	            || c >= 0x0ACB && c <= 0x0ACD
	            || c >= 0x0B01 && c <= 0x0B03
	            || c == 0x0B3C
	            || c >= 0x0B3E && c <= 0x0B43
	            || c >= 0x0B47 && c <= 0x0B48
	            || c >= 0x0B4B && c <= 0x0B4D
	            || c >= 0x0B56 && c <= 0x0B57
	            || c >= 0x0B82 && c <= 0x0B83
	            || c >= 0x0BBE && c <= 0x0BC2
	            || c >= 0x0BC6 && c <= 0x0BC8
	            || c >= 0x0BCA && c <= 0x0BCD
	            || c == 0x0BD7
	            || c >= 0x0C01 && c <= 0x0C03
	            || c >= 0x0C3E && c <= 0x0C44
	            || c >= 0x0C46 && c <= 0x0C48
	            || c >= 0x0C4A && c <= 0x0C4D
	            || c >= 0x0C55 && c <= 0x0C56
	            || c >= 0x0C82 && c <= 0x0C83
	            || c >= 0x0CBE && c <= 0x0CC4
	            || c >= 0x0CC6 && c <= 0x0CC8
	            || c >= 0x0CCA && c <= 0x0CCD
	            || c >= 0x0CD5 && c <= 0x0CD6
	            || c >= 0x0D02 && c <= 0x0D03
	            || c >= 0x0D3E && c <= 0x0D43
	            || c >= 0x0D46 && c <= 0x0D48
	            || c >= 0x0D4A && c <= 0x0D4D
	            || c == 0x0D57
	            || c == 0x0E31
	            || c >= 0x0E34 && c <= 0x0E3A
	            || c >= 0x0E47 && c <= 0x0E4E
	            || c == 0x0EB1
	            || c >= 0x0EB4 && c <= 0x0EB9
	            || c >= 0x0EBB && c <= 0x0EBC
	            || c >= 0x0EC8 && c <= 0x0ECD
	            || c >= 0x0F18 && c <= 0x0F19
	            || c == 0x0F35
	            || c == 0x0F37
	            || c == 0x0F39
	            || c == 0x0F3E
	            || c == 0x0F3F
	            || c >= 0x0F71 && c <= 0x0F84
	            || c >= 0x0F86 && c <= 0x0F8B
	            || c >= 0x0F90 && c <= 0x0F95
	            || c == 0x0F97
	            || c >= 0x0F99 && c <= 0x0FAD
	            || c >= 0x0FB1 && c <= 0x0FB7
	            || c == 0x0FB9
	            || c >= 0x20D0 && c <= 0x20DC
	            || c == 0x20E1
	            || c >= 0x302A && c <= 0x302F
	            || c == 0x3099
	            || c == 0x309A
	            || c == 0x00B7
	            || c == 0x02D0
	            || c == 0x02D1
	            || c == 0x0387
	            || c == 0x0640
	            || c == 0x0E46
	            || c == 0x0EC6
	            || c == 0x3005
	            || c >= 0x3031 && c <= 0x3035
	            || c >= 0x309D && c <= 0x309E
	            || c >= 0x30FC && c <= 0x30FE;
	    };

	    Utilities.coalesceText = function (n) {
	        for (var m = n.firstChild; m != null; m = m.nextSibling) {
	            if (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
	                var s = m.nodeValue;
	                var first = m;
	                m = m.nextSibling;
	                while (m != null && (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/)) {
	                    s += m.nodeValue;
	                    var del = m;
	                    m = m.nextSibling;
	                    del.parentNode.removeChild(del);
	                }
	                if (first.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
	                    var p = first.parentNode;
	                    if (first.nextSibling == null) {
	                        p.removeChild(first);
	                        p.appendChild(p.ownerDocument.createTextNode(s));
	                    } else {
	                        var next = first.nextSibling;
	                        p.removeChild(first);
	                        p.insertBefore(p.ownerDocument.createTextNode(s), next);
	                    }
	                } else {
	                    first.nodeValue = s;
	                }
	                if (m == null) {
	                    break;
	                }
	            } else if (m.nodeType == 1 /*Node.ELEMENT_NODE*/) {
	                Utilities.coalesceText(m);
	            }
	        }
	    };

	    Utilities.instance_of = function (o, c) {
	        while (o != null) {
	            if (o.constructor === c) {
	                return true;
	            }
	            if (o === Object) {
	                return false;
	            }
	            o = o.constructor.superclass;
	        }
	        return false;
	    };

	    Utilities.getElementById = function (n, id) {
	        // Note that this does not check the DTD to check for actual
	        // attributes of type ID, so this may be a bit wrong.
	        if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
	            if (n.getAttribute("id") == id
	                || n.getAttributeNS(null, "id") == id) {
	                return n;
	            }
	        }
	        for (var m = n.firstChild; m != null; m = m.nextSibling) {
	            var res = Utilities.getElementById(m, id);
	            if (res != null) {
	                return res;
	            }
	        }
	        return null;
	    };

	    // XPathException ////////////////////////////////////////////////////////////

	    var XPathException = (function () {
	        function getMessage(code, exception) {
	            var msg = exception ? ": " + exception.toString() : "";
	            switch (code) {
	                case XPathException.INVALID_EXPRESSION_ERR:
	                    return "Invalid expression" + msg;
	                case XPathException.TYPE_ERR:
	                    return "Type error" + msg;
	            }
	            return null;
	        }

	        function XPathException(code, error, message) {
	            var err = Error.call(this, getMessage(code, error) || message);

	            err.code = code;
	            err.exception = error;

	            return err;
	        }

	        XPathException.prototype = Object.create(Error.prototype);
	        XPathException.prototype.constructor = XPathException;
	        XPathException.superclass = Error;

	        XPathException.prototype.toString = function () {
	            return this.message;
	        };

	        XPathException.fromMessage = function (message, error) {
	            return new XPathException(null, error, message);
	        };

	        XPathException.INVALID_EXPRESSION_ERR = 51;
	        XPathException.TYPE_ERR = 52;

	        return XPathException;
	    })();

	    // XPathExpression ///////////////////////////////////////////////////////////

	    XPathExpression.prototype = {};
	    XPathExpression.prototype.constructor = XPathExpression;
	    XPathExpression.superclass = Object.prototype;

	    function XPathExpression(e, r, p) {
	        this.xpath = p.parse(e);
	        this.context = new XPathContext();
	        this.context.namespaceResolver = new XPathNSResolverWrapper(r);
	    }

	    XPathExpression.getOwnerDocument = function (n) {
	        return n.nodeType === 9 /*Node.DOCUMENT_NODE*/ ? n : n.ownerDocument;
	    };

	    XPathExpression.detectHtmlDom = function (n) {
	        if (!n) { return false; }

	        var doc = XPathExpression.getOwnerDocument(n);

	        try {
	            return doc.implementation.hasFeature("HTML", "2.0");
	        } catch (e) {
	            return true;
	        }
	    };

	    XPathExpression.prototype.evaluate = function (n, t, res) {
	        this.context.expressionContextNode = n;
	        // backward compatibility - no reliable way to detect whether the DOM is HTML, but
	        // this library has been using this method up until now, so we will continue to use it
	        // ONLY when using an XPathExpression
	        this.context.caseInsensitive = XPathExpression.detectHtmlDom(n);

	        var result = this.xpath.evaluate(this.context);
	        return new XPathResult(result, t);
	    };

	    // XPathNSResolverWrapper ////////////////////////////////////////////////////

	    XPathNSResolverWrapper.prototype = {};
	    XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
	    XPathNSResolverWrapper.superclass = Object.prototype;

	    function XPathNSResolverWrapper(r) {
	        this.xpathNSResolver = r;
	    }

	    XPathNSResolverWrapper.prototype.getNamespace = function (prefix, n) {
	        if (this.xpathNSResolver == null) {
	            return null;
	        }
	        return this.xpathNSResolver.lookupNamespaceURI(prefix);
	    };

	    // NodeXPathNSResolver ///////////////////////////////////////////////////////

	    NodeXPathNSResolver.prototype = {};
	    NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
	    NodeXPathNSResolver.superclass = Object.prototype;

	    function NodeXPathNSResolver(n) {
	        this.node = n;
	        this.namespaceResolver = new NamespaceResolver();
	    }

	    NodeXPathNSResolver.prototype.lookupNamespaceURI = function (prefix) {
	        return this.namespaceResolver.getNamespace(prefix, this.node);
	    };

	    // XPathResult ///////////////////////////////////////////////////////////////

	    XPathResult.prototype = {};
	    XPathResult.prototype.constructor = XPathResult;
	    XPathResult.superclass = Object.prototype;

	    function XPathResult(v, t) {
	        if (t == XPathResult.ANY_TYPE) {
	            if (v.constructor === XString) {
	                t = XPathResult.STRING_TYPE;
	            } else if (v.constructor === XNumber) {
	                t = XPathResult.NUMBER_TYPE;
	            } else if (v.constructor === XBoolean) {
	                t = XPathResult.BOOLEAN_TYPE;
	            } else if (v.constructor === XNodeSet) {
	                t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	            }
	        }
	        this.resultType = t;
	        switch (t) {
	            case XPathResult.NUMBER_TYPE:
	                this.numberValue = v.numberValue();
	                return;
	            case XPathResult.STRING_TYPE:
	                this.stringValue = v.stringValue();
	                return;
	            case XPathResult.BOOLEAN_TYPE:
	                this.booleanValue = v.booleanValue();
	                return;
	            case XPathResult.ANY_UNORDERED_NODE_TYPE:
	            case XPathResult.FIRST_ORDERED_NODE_TYPE:
	                if (v.constructor === XNodeSet) {
	                    this.singleNodeValue = v.first();
	                    return;
	                }
	                break;
	            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
	            case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
	                if (v.constructor === XNodeSet) {
	                    this.invalidIteratorState = false;
	                    this.nodes = v.toArray();
	                    this.iteratorIndex = 0;
	                    return;
	                }
	                break;
	            case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
	            case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
	                if (v.constructor === XNodeSet) {
	                    this.nodes = v.toArray();
	                    this.snapshotLength = this.nodes.length;
	                    return;
	                }
	                break;
	        }
	        throw new XPathException(XPathException.TYPE_ERR);
	    };

	    XPathResult.prototype.iterateNext = function () {
	        if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE
	            && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
	            throw new XPathException(XPathException.TYPE_ERR);
	        }
	        return this.nodes[this.iteratorIndex++];
	    };

	    XPathResult.prototype.snapshotItem = function (i) {
	        if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
	            && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
	            throw new XPathException(XPathException.TYPE_ERR);
	        }
	        return this.nodes[i];
	    };

	    XPathResult.ANY_TYPE = 0;
	    XPathResult.NUMBER_TYPE = 1;
	    XPathResult.STRING_TYPE = 2;
	    XPathResult.BOOLEAN_TYPE = 3;
	    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
	    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
	    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
	    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;

	    // DOM 3 XPath support ///////////////////////////////////////////////////////

	    function installDOM3XPathSupport(doc, p) {
	        doc.createExpression = function (e, r) {
	            try {
	                return new XPathExpression(e, r, p);
	            } catch (e) {
	                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e);
	            }
	        };
	        doc.createNSResolver = function (n) {
	            return new NodeXPathNSResolver(n);
	        };
	        doc.evaluate = function (e, cn, r, t, res) {
	            if (t < 0 || t > 9) {
	                throw { code: 0, toString: function () { return "Request type not supported"; } };
	            }
	            return doc.createExpression(e, r, p).evaluate(cn, t, res);
	        };
	    };

	    // ---------------------------------------------------------------------------

	    // Install DOM 3 XPath support for the current document.
	    try {
	        var shouldInstall = true;
	        try {
	            if (document.implementation
	                && document.implementation.hasFeature
	                && document.implementation.hasFeature("XPath", null)) {
	                shouldInstall = false;
	            }
	        } catch (e) {
	        }
	        if (shouldInstall) {
	            installDOM3XPathSupport(document, new XPathParser());
	        }
	    } catch (e) {
	    }

	    // ---------------------------------------------------------------------------
	    // exports for node.js

	    installDOM3XPathSupport(exports, new XPathParser());

	    (function () {
	        var parser = new XPathParser();

	        var defaultNSResolver = new NamespaceResolver();
	        var defaultFunctionResolver = new FunctionResolver();
	        var defaultVariableResolver = new VariableResolver();

	        function makeNSResolverFromFunction(func) {
	            return {
	                getNamespace: function (prefix, node) {
	                    var ns = func(prefix, node);

	                    return ns || defaultNSResolver.getNamespace(prefix, node);
	                }
	            };
	        }

	        function makeNSResolverFromObject(obj) {
	            return makeNSResolverFromFunction(obj.getNamespace.bind(obj));
	        }

	        function makeNSResolverFromMap(map) {
	            return makeNSResolverFromFunction(function (prefix) {
	                return map[prefix];
	            });
	        }

	        function makeNSResolver(resolver) {
	            if (resolver && typeof resolver.getNamespace === "function") {
	                return makeNSResolverFromObject(resolver);
	            }

	            if (typeof resolver === "function") {
	                return makeNSResolverFromFunction(resolver);
	            }

	            // assume prefix -> uri mapping
	            if (typeof resolver === "object") {
	                return makeNSResolverFromMap(resolver);
	            }

	            return defaultNSResolver;
	        }

	        /** Converts native JavaScript types to their XPath library equivalent */
	        function convertValue(value) {
	            if (value === null ||
	                typeof value === "undefined" ||
	                value instanceof XString ||
	                value instanceof XBoolean ||
	                value instanceof XNumber ||
	                value instanceof XNodeSet) {
	                return value;
	            }

	            switch (typeof value) {
	                case "string": return new XString(value);
	                case "boolean": return new XBoolean(value);
	                case "number": return new XNumber(value);
	            }

	            // assume node(s)
	            var ns = new XNodeSet();
	            ns.addArray([].concat(value));
	            return ns;
	        }

	        function makeEvaluator(func) {
	            return function (context) {
	                var args = Array.prototype.slice.call(arguments, 1).map(function (arg) {
	                    return arg.evaluate(context);
	                });
	                var result = func.apply(this, [].concat(context, args));
	                return convertValue(result);
	            };
	        }

	        function makeFunctionResolverFromFunction(func) {
	            return {
	                getFunction: function (name, namespace) {
	                    var found = func(name, namespace);
	                    if (found) {
	                        return makeEvaluator(found);
	                    }
	                    return defaultFunctionResolver.getFunction(name, namespace);
	                }
	            };
	        }

	        function makeFunctionResolverFromObject(obj) {
	            return makeFunctionResolverFromFunction(obj.getFunction.bind(obj));
	        }

	        function makeFunctionResolverFromMap(map) {
	            return makeFunctionResolverFromFunction(function (name) {
	                return map[name];
	            });
	        }

	        function makeFunctionResolver(resolver) {
	            if (resolver && typeof resolver.getFunction === "function") {
	                return makeFunctionResolverFromObject(resolver);
	            }

	            if (typeof resolver === "function") {
	                return makeFunctionResolverFromFunction(resolver);
	            }

	            // assume map
	            if (typeof resolver === "object") {
	                return makeFunctionResolverFromMap(resolver);
	            }

	            return defaultFunctionResolver;
	        }

	        function makeVariableResolverFromFunction(func) {
	            return {
	                getVariable: function (name, namespace) {
	                    var value = func(name, namespace);
	                    return convertValue(value);
	                }
	            };
	        }

	        function makeVariableResolver(resolver) {
	            if (resolver) {
	                if (typeof resolver.getVariable === "function") {
	                    return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
	                }

	                if (typeof resolver === "function") {
	                    return makeVariableResolverFromFunction(resolver);
	                }

	                // assume map
	                if (typeof resolver === "object") {
	                    return makeVariableResolverFromFunction(function (name) {
	                        return resolver[name];
	                    });
	                }
	            }

	            return defaultVariableResolver;
	        }

	        function copyIfPresent(prop, dest, source) {
	            if (prop in source) { dest[prop] = source[prop]; }
	        }

	        function makeContext(options) {
	            var context = new XPathContext();

	            if (options) {
	                context.namespaceResolver = makeNSResolver(options.namespaces);
	                context.functionResolver = makeFunctionResolver(options.functions);
	                context.variableResolver = makeVariableResolver(options.variables);
	                context.expressionContextNode = options.node;
	                copyIfPresent('allowAnyNamespaceForNoPrefix', context, options);
	                copyIfPresent('isHtml', context, options);
	            } else {
	                context.namespaceResolver = defaultNSResolver;
	            }

	            return context;
	        }

	        function evaluate(parsedExpression, options) {
	            var context = makeContext(options);

	            return parsedExpression.evaluate(context);
	        }

	        var evaluatorPrototype = {
	            evaluate: function (options) {
	                return evaluate(this.expression, options);
	            }

	            , evaluateNumber: function (options) {
	                return this.evaluate(options).numberValue();
	            }

	            , evaluateString: function (options) {
	                return this.evaluate(options).stringValue();
	            }

	            , evaluateBoolean: function (options) {
	                return this.evaluate(options).booleanValue();
	            }

	            , evaluateNodeSet: function (options) {
	                return this.evaluate(options).nodeset();
	            }

	            , select: function (options) {
	                return this.evaluateNodeSet(options).toArray()
	            }

	            , select1: function (options) {
	                return this.select(options)[0];
	            }
	        };

	        function parse(xpath) {
	            var parsed = parser.parse(xpath);

	            return Object.create(evaluatorPrototype, {
	                expression: {
	                    value: parsed
	                }
	            });
	        }

	        exports.parse = parse;
	    })();

	    assign(
	        exports,
	        {
	            XPath,
	            XPathParser,
	            XPathResult,

	            Step,
	            PathExpr,
	            NodeTest,
	            LocationPath,

	            OrOperation,
	            AndOperation,

	            BarOperation,

	            EqualsOperation,
	            NotEqualOperation,
	            LessThanOperation,
	            GreaterThanOperation,
	            LessThanOrEqualOperation,
	            GreaterThanOrEqualOperation,

	            PlusOperation,
	            MinusOperation,
	            MultiplyOperation,
	            DivOperation,
	            ModOperation,
	            UnaryMinusOperation,

	            FunctionCall,
	            VariableReference,

	            XPathContext,

	            XNodeSet,
	            XBoolean,
	            XString,
	            XNumber,

	            NamespaceResolver,
	            FunctionResolver,
	            VariableResolver,

	            Utilities,
	        }
	    );

	    // helper
	    exports.select = function (e, doc, single) {
	        return exports.selectWithResolver(e, doc, null, single);
	    };

	    exports.useNamespaces = function (mappings) {
	        var resolver = {
	            mappings: mappings || {},
	            lookupNamespaceURI: function (prefix) {
	                return this.mappings[prefix];
	            }
	        };

	        return function (e, doc, single) {
	            return exports.selectWithResolver(e, doc, resolver, single);
	        };
	    };

	    exports.selectWithResolver = function (e, doc, resolver, single) {
	        var expression = new XPathExpression(e, resolver, new XPathParser());
	        var type = XPathResult.ANY_TYPE;

	        var result = expression.evaluate(doc, type, null);

	        if (result.resultType == XPathResult.STRING_TYPE) {
	            result = result.stringValue;
	        }
	        else if (result.resultType == XPathResult.NUMBER_TYPE) {
	            result = result.numberValue;
	        }
	        else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
	            result = result.booleanValue;
	        }
	        else {
	            result = result.nodes;
	            if (single) {
	                result = result[0];
	            }
	        }

	        return result;
	    };

	    exports.select1 = function (e, doc) {
	        return exports.select(e, doc, true);
	    };

	    // end non-node wrapper
	})(xpath); 
} (xpath$1));

var xpath = /*@__PURE__*/getDefaultExportFromCjs(xpath$1);

var lib = {};

var dom$2 = {};

var conventions$2 = {};

'use strict';

/**
 * Ponyfill for `Array.prototype.find` which is only available in ES6 runtimes.
 *
 * Works with anything that has a `length` property and index access properties, including NodeList.
 *
 * @template {unknown} T
 * @param {Array<T> | ({length:number, [number]: T})} list
 * @param {function (item: T, index: number, list:Array<T> | ({length:number, [number]: T})):boolean} predicate
 * @param {Partial<Pick<ArrayConstructor['prototype'], 'find'>>?} ac `Array.prototype` by default,
 * 				allows injecting a custom implementation in tests
 * @returns {T | undefined}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @see https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
 */
function find$1(list, predicate, ac) {
	if (ac === undefined) {
		ac = Array.prototype;
	}
	if (list && typeof ac.find === 'function') {
		return ac.find.call(list, predicate);
	}
	for (var i = 0; i < list.length; i++) {
		if (Object.prototype.hasOwnProperty.call(list, i)) {
			var item = list[i];
			if (predicate.call(undefined, item, i, list)) {
				return item;
			}
		}
	}
}

/**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * @template T
 * @param {T} object the object to freeze
 * @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
 * 				allows to inject custom object constructor for tests
 * @returns {Readonly<T>}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object;
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object
}

/**
 * Since we can not rely on `Object.assign` we provide a simplified version
 * that is sufficient for our needs.
 *
 * @param {Object} target
 * @param {Object | null | undefined} source
 *
 * @returns {Object} target
 * @throws TypeError if target is not an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
 */
function assign(target, source) {
	if (target === null || typeof target !== 'object') {
		throw new TypeError('target is not an object')
	}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target
}

/**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
 * @see DOMParser.prototype.parseFromString
 */
var MIME_TYPE = freeze({
	/**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see DOMParser.SupportedType.isHTML
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
	 */
	HTML: 'text/html',

	/**
	 * Helper method to check a mime type if it indicates an HTML document
	 *
	 * @param {string} [value]
	 * @returns {boolean}
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
	isHTML: function (value) {
		return value === MIME_TYPE.HTML
	},

	/**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_APPLICATION: 'application/xml',

	/**
	 * `text/html`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_TEXT: 'text/xml',

	/**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */
	XML_XHTML_APPLICATION: 'application/xhtml+xml',

	/**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */
	XML_SVG_IMAGE: 'image/svg+xml',
});

/**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */
var NAMESPACE$3 = freeze({
	/**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */
	HTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * Checks if `uri` equals `NAMESPACE.HTML`.
	 *
	 * @param {string} [uri]
	 *
	 * @see NAMESPACE.HTML
	 */
	isHTML: function (uri) {
		return uri === NAMESPACE$3.HTML
	},

	/**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */
	SVG: 'http://www.w3.org/2000/svg',

	/**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */
	XML: 'http://www.w3.org/XML/1998/namespace',

	/**
	 * The `xmlns:` namespace
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */
	XMLNS: 'http://www.w3.org/2000/xmlns/',
});

var assign_1 = conventions$2.assign = assign;
var find_1 = conventions$2.find = find$1;
var freeze_1 = conventions$2.freeze = freeze;
var MIME_TYPE_1 = conventions$2.MIME_TYPE = MIME_TYPE;
var NAMESPACE_1 = conventions$2.NAMESPACE = NAMESPACE$3;

var conventions$1 = conventions$2;

var find = conventions$1.find;
var NAMESPACE$2 = conventions$1.NAMESPACE;

/**
 * A prerequisite for `[].filter`, to drop elements that are empty
 * @param {string} input
 * @returns {boolean}
 */
function notEmptyString (input) {
	return input !== ''
}
/**
 * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * @param {string} input
 * @returns {string[]} (can be empty)
 */
function splitOnASCIIWhitespace(input) {
	// U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
	return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : []
}

/**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * @param {string} element
 * @returns {Record<string, boolean | undefined>}
 */
function orderedSetReducer (current, element) {
	if (!current.hasOwnProperty(element)) {
		current[element] = true;
	}
	return current;
}

/**
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @param {string} input
 * @returns {string[]}
 */
function toOrderedSet(input) {
	if (!input) return [];
	var list = splitOnASCIIWhitespace(input);
	return Object.keys(list.reduce(orderedSetReducer, {}))
}

/**
 * Uses `list.indexOf` to implement something like `Array.prototype.includes`,
 * which we can not rely on being available.
 *
 * @param {any[]} list
 * @returns {function(any): boolean}
 */
function arrayIncludes (list) {
	return function(element) {
		return list && list.indexOf(element) !== -1;
	}
}

function copy(src,dest){
	for(var p in src){
		if (Object.prototype.hasOwnProperty.call(src, p)) {
			dest[p] = src[p];
		}
	}
}

/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknown Class:"+Class);
		}
		pt.constructor = Class;
	}
}

// Node Types
var NodeType = {};
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);

/**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else {
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException);

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0,
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	},
	/**
	 * @private
	 * @param {function (Node):boolean} predicate
	 * @returns {Node[]}
	 */
	filter: function (predicate) {
		return Array.prototype.filter.call(this, predicate);
	},
	/**
	 * @private
	 * @param {Node} item
	 * @returns {number}
	 */
	indexOf: function (item) {
		return Array.prototype.indexOf.call(this, item);
	},
};

function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
};

_extends(LiveNodeList,NodeList);

/**
 * Objects implementing the NamedNodeMap interface are used
 * to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else {
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1;
		while(i<lastIndex){
			list[i] = list[++i];
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else {
		throw new DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;


	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};

/**
 * The DOMImplementation interface represents an object providing methods
 * which are not dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * __The individual methods describe the differences compared to the specs.__
 *
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 */
function DOMImplementation$2() {
}

DOMImplementation$2.prototype = {
	/**
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
	 * The different implementations fairly diverged in what kind of features were reported.
	 * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated It is deprecated and modern browsers return true in all cases.
	 *
	 * @param {string} feature
	 * @param {string} [version]
	 * @returns {boolean} always true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 */
	hasFeature: function(feature, version) {
			return true;
	},
	/**
	 * Creates an XML Document object of the specified type with its document element.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
	 * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string|null} namespaceURI
	 * @param {string} qualifiedName
	 * @param {DocumentType=null} doctype
	 * @returns {Document}
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocument: function(namespaceURI,  qualifiedName, doctype){
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype || null;
		if (doctype){
			doc.appendChild(doctype);
		}
		if (qualifiedName){
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	/**
	 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
	 *
	 * __This behavior is slightly different from the in the specs__:
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string} qualifiedName
	 * @param {string} [publicId]
	 * @param {string} [systemId]
	 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
	 * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocumentType: function(qualifiedName, publicId, systemId){
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId || '';
		node.systemId = systemId || '';

		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises
		_insertBefore(this, newChild,oldChild, assertPreReplacementValidityInDocument);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else {
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
	/**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
	 *
	 * @param {string | null} namespaceURI
	 * @returns {string | null}
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 */
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
						if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
							return n;
						}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(Object.prototype.hasOwnProperty.call(map, prefix)){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
	this.ownerDocument = this;
}

function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE$2.XMLNS){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value;
	}
}

function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE$2.XMLNS){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:''];
	}
}

/**
 * Updates `el.childNodes`, updating the indexed items and it's `length`.
 * Passing `newChild` means it will be appended.
 * Otherwise it's assumed that an item has been removed,
 * and `el.firstNode` and it's `.nextSibling` are used
 * to walk the current list of child nodes.
 *
 * @param {Document} doc
 * @param {Node} el
 * @param {Node} [newChild]
 * @private
 */
function _onUpdateChild (doc, el, newChild) {
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if (newChild) {
			cs[cs.length++] = newChild;
		} else {
			var child = el.firstChild;
			var i = 0;
			while (child) {
				cs[i++] = child;
				child = child.nextSibling;
			}
			cs.length = i;
			delete cs[cs.length];
		}
	}
}

/**
 * Removes the connections between `parentNode` and `child`
 * and any existing `child.previousSibling` or `child.nextSibling`.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 *
 * @param {Node} parentNode
 * @param {Node} child
 * @returns {Node} the child that was removed.
 * @private
 */
function _removeChild (parentNode, child) {
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if (previous) {
		previous.nextSibling = next;
	} else {
		parentNode.firstChild = next;
	}
	if (next) {
		next.previousSibling = previous;
	} else {
		parentNode.lastChild = previous;
	}
	child.parentNode = null;
	child.previousSibling = null;
	child.nextSibling = null;
	_onUpdateChild(parentNode.ownerDocument, parentNode);
	return child;
}

/**
 * Returns `true` if `node` can be a parent for insertion.
 * @param {Node} node
 * @returns {boolean}
 */
function hasValidParentNodeType(node) {
	return (
		node &&
		(node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE)
	);
}

/**
 * Returns `true` if `node` can be inserted according to it's `nodeType`.
 * @param {Node} node
 * @returns {boolean}
 */
function hasInsertableNodeType(node) {
	return (
		node &&
		(isElementNode(node) ||
			isTextNode(node) ||
			isDocTypeNode(node) ||
			node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
			node.nodeType === Node.COMMENT_NODE ||
			node.nodeType === Node.PROCESSING_INSTRUCTION_NODE)
	);
}

/**
 * Returns true if `node` is a DOCTYPE node
 * @param {Node} node
 * @returns {boolean}
 */
function isDocTypeNode(node) {
	return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
}

/**
 * Returns true if the node is an element
 * @param {Node} node
 * @returns {boolean}
 */
function isElementNode(node) {
	return node && node.nodeType === Node.ELEMENT_NODE;
}
/**
 * Returns true if `node` is a text node
 * @param {Node} node
 * @returns {boolean}
 */
function isTextNode(node) {
	return node && node.nodeType === Node.TEXT_NODE;
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Document} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function isElementInsertionPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];
	if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Node} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function isElementReplacementPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];

	function hasElementChildThatIsNotChild(node) {
		return isElementNode(node) && node !== child;
	}

	if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * @private
 * Steps 1-5 of the checks before inserting and before replacing a child are the same.
 *
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidity1to5(parent, node, child) {
	// 1. If `parent` is not a Document, DocumentFragment, or Element node, then throw a "HierarchyRequestError" DOMException.
	if (!hasValidParentNodeType(parent)) {
		throw new DOMException(HIERARCHY_REQUEST_ERR, 'Unexpected parent node type ' + parent.nodeType);
	}
	// 2. If `node` is a host-including inclusive ancestor of `parent`, then throw a "HierarchyRequestError" DOMException.
	// not implemented!
	// 3. If `child` is non-null and its parent is not `parent`, then throw a "NotFoundError" DOMException.
	if (child && child.parentNode !== parent) {
		throw new DOMException(NOT_FOUND_ERR, 'child not in parent');
	}
	if (
		// 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
		!hasInsertableNodeType(node) ||
		// 5. If either `node` is a Text node and `parent` is a document,
		// the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
		// || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
		// or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
		(isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE)
	) {
		throw new DOMException(
			HIERARCHY_REQUEST_ERR,
			'Unexpected node type ' + node.nodeType + ' for parent node type ' + parent.nodeType
		);
	}
}

/**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If node has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child,
		// `child` is a doctype, or `child` is non-null and a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child, `child` is a doctype,
		// or `child` is non-null and a doctype is following `child`.
		if (!isElementInsertionPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		// `parent` has a doctype child,
		if (find(parentChildNodes, isDocTypeNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// `child` is non-null and an element is preceding `child`,
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
		// or `child` is null and `parent` has an element child.
		if (!child && parentElementChild) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can not be appended since element is present');
		}
	}
}

/**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreReplacementValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If `node` has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child that is not `child` or a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child that is not `child` or a doctype is following `child`.
		if (!isElementReplacementPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		function hasDoctypeChildThatIsNotChild(node) {
			return isDocTypeNode(node) && node !== child;
		}

		// `parent` has a doctype child that is not `child`,
		if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// or an element is preceding `child`.
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
	}
}

/**
 * @private
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function _insertBefore(parent, node, child, _inDocumentAssertion) {
	// To ensure pre-insertion validity of a node into a parent before a child, run these steps:
	assertPreInsertionValidity1to5(parent, node, child);

	// If parent is a document, and any of the statements below, switched on the interface node implements,
	// are true, then throw a "HierarchyRequestError" DOMException.
	if (parent.nodeType === Node.DOCUMENT_NODE) {
		(_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
	}

	var cp = node.parentNode;
	if(cp){
		cp.removeChild(node);//remove and update
	}
	if(node.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = node.firstChild;
		if (newFirst == null) {
			return node;
		}
		var newLast = node.lastChild;
	}else {
		newFirst = newLast = node;
	}
	var pre = child ? child.previousSibling : parent.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = child;


	if(pre){
		pre.nextSibling = newFirst;
	}else {
		parent.firstChild = newFirst;
	}
	if(child == null){
		parent.lastChild = newLast;
	}else {
		child.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parent;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parent.ownerDocument||parent, parent);
	//console.log(parent.lastChild.nextSibling == null)
	if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
		node.firstChild = node.lastChild = null;
	}
	return node;
}

/**
 * Appends `newChild` to `parentNode`.
 * If `newChild` is already connected to a `parentNode` it is first removed from it.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 * @param {Node} parentNode
 * @param {Node} newChild
 * @returns {Node}
 * @private
 */
function _appendSingleChild (parentNode, newChild) {
	if (newChild.parentNode) {
		newChild.parentNode.removeChild(newChild);
	}
	newChild.parentNode = parentNode;
	newChild.previousSibling = parentNode.lastChild;
	newChild.nextSibling = null;
	if (newChild.previousSibling) {
		newChild.previousSibling.nextSibling = newChild;
	} else {
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
	return newChild;
}

Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	/**
	 * The DocumentType node of the document.
	 *
	 * @readonly
	 * @type DocumentType
	 */
	doctype :  null,
	documentElement :  null,
	_inc : 1,

	insertBefore :  function(newChild, refChild){//raises
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		_insertBefore(this, newChild, refChild);
		newChild.ownerDocument = this;
		if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
			this.documentElement = newChild;
		}

		return newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	replaceChild: function (newChild, oldChild) {
		//raises
		_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
		newChild.ownerDocument = this;
		if (oldChild) {
			this.removeChild(oldChild);
		}
		if (isElementNode(newChild)) {
			this.documentElement = newChild;
		}
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		});
		return rtv;
	},

	/**
	 * The `getElementsByClassName` method of `Document` interface returns an array-like object
	 * of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
	 *
	 *
	 * Warning: This is a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */
	getElementsByClassName: function(classNames) {
		var classNamesSet = toOrderedSet(classNames);
		return new LiveNodeList(this, function(base) {
			var ls = [];
			if (classNamesSet.length > 0) {
				_visitNode(base.documentElement, function(node) {
					if(node !== base && node.nodeType === ELEMENT_NODE) {
						var nodeClassNames = node.getAttribute('class');
						// can be null if the attribute does not exist
						if (nodeClassNames) {
							// before splitting and iterating just compare them for the most common case
							var matches = classNames === nodeClassNames;
							if (!matches) {
								var nodeClassNamesSet = toOrderedSet(nodeClassNames);
								matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
							}
							if(matches) {
								ls.push(node);
							}
						}
					}
				});
			}
			return ls;
		});
	},

	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.localName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name);
		attr && this.removeAttributeNode(attr);
	},

	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else {
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;

		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);

	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
};
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
};
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
};
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
};
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer$1(){}
XMLSerializer$1.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
};
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9 && this.documentElement || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;

	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			];
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	// According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
	// and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
	// > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
	// in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
	// and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
	// > [...] Furthermore, the attribute value [...] must not be an empty string.
	// so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
	if (!uri) {
		return false;
	}
	if (prefix === "xml" && uri === NAMESPACE$2.XML || uri === NAMESPACE$2.XMLNS) {
		return false;
	}

	var i = visibleNamespaces.length;
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		if (ns.prefix === prefix) {
			return ns.namespace !== uri;
		}
	}
	return true;
}
/**
 * Well-formed constraint: No < in Attribute Values
 * > The replacement text of any entity referred to directly or indirectly
 * > in an attribute value must not contain a <.
 * @see https://www.w3.org/TR/xml11/#CleanAttrVals
 * @see https://www.w3.org/TR/xml11/#NT-AttValue
 *
 * Literal whitespace other than space that appear in attribute values
 * are serialized as their entity references, so they will be preserved.
 * (In contrast to whitespace literals in the input which are normalized to spaces)
 * @see https://www.w3.org/TR/xml11/#AVNormalize
 * @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
 */
function addSerializedAttribute(buf, qualifiedName, value) {
	buf.push(' ', qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
}

function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if (!visibleNamespaces) {
		visibleNamespaces = [];
	}

	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else {
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}

	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;

		isHTML = NAMESPACE$2.isHTML(node.namespaceURI) || isHTML;

		var prefixedNodeName = nodeName;
		if (!isHTML && !node.prefix && node.namespaceURI) {
			var defaultNS;
			// lookup current default ns from `xmlns` attribute
			for (var ai = 0; ai < attrs.length; ai++) {
				if (attrs.item(ai).name === 'xmlns') {
					defaultNS = attrs.item(ai).value;
					break
				}
			}
			if (!defaultNS) {
				// lookup current default ns in visibleNamespaces
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi];
					if (namespace.prefix === '' && namespace.namespace === node.namespaceURI) {
						defaultNS = namespace.namespace;
						break
					}
				}
			}
			if (defaultNS !== node.namespaceURI) {
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi];
					if (namespace.namespace === node.namespaceURI) {
						if (namespace.prefix) {
							prefixedNodeName = namespace.prefix + ':' + nodeName;
						}
						break
					}
				}
			}
		}

		buf.push('<', prefixedNodeName);

		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}

		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}

		// add namespace for current node
		if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}

		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else {
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					child = child.nextSibling;
				}
			}
			buf.push('</',prefixedNodeName,'>');
		}else {
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return addSerializedAttribute(buf, node.name, node.value);
	case TEXT_NODE:
		/**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 * @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
		 */
		return buf.push(node.data
			.replace(/[<&>]/g,_xmlEncoder)
		);
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC ', pubid);
			if (sysid && sysid!='.') {
				buf.push(' ', sysid);
			}
			buf.push('>');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM ', sysid, '>');
		}else {
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for (var n in node) {
		if (Object.prototype.hasOwnProperty.call(node, n)) {
			var v = node[n];
			if (typeof v != "object") {
				if (v != node2[n]) {
					node2[n] = v;
				}
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length;
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value;
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});

		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},

			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;

				default:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		});

		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}

		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value;
		};
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	var DocumentType_1 = dom$2.DocumentType = DocumentType;
	var DOMException_1 = dom$2.DOMException = DOMException;
	var DOMImplementation_1 = dom$2.DOMImplementation = DOMImplementation$2;
	var Element_1 = dom$2.Element = Element;
	var Node_1 = dom$2.Node = Node;
	var NodeList_1 = dom$2.NodeList = NodeList;
	var XMLSerializer_1 = dom$2.XMLSerializer = XMLSerializer$1;

var domParser = {};

var entities$2 = {};

(function (exports) {
	var freeze = conventions$2.freeze;

	/**
	 * The entities that are predefined in every XML document.
	 *
	 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
	 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
	 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
	 */
	exports.XML_ENTITIES = freeze({amp:'&', apos:"'", gt:'>', lt:'<', quot:'"'});

	/**
	 * A map of currently 241 entities that are detected in an HTML document.
	 * They contain all entries from `XML_ENTITIES`.
	 *
	 * @see XML_ENTITIES
	 * @see DOMParser.parseFromString
	 * @see DOMImplementation.prototype.createHTMLDocument
	 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
	 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
	 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
	 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
	 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
	 */
	exports.HTML_ENTITIES = freeze({
	       lt: '<',
	       gt: '>',
	       amp: '&',
	       quot: '"',
	       apos: "'",
	       Agrave: "À",
	       Aacute: "Á",
	       Acirc: "Â",
	       Atilde: "Ã",
	       Auml: "Ä",
	       Aring: "Å",
	       AElig: "Æ",
	       Ccedil: "Ç",
	       Egrave: "È",
	       Eacute: "É",
	       Ecirc: "Ê",
	       Euml: "Ë",
	       Igrave: "Ì",
	       Iacute: "Í",
	       Icirc: "Î",
	       Iuml: "Ï",
	       ETH: "Ð",
	       Ntilde: "Ñ",
	       Ograve: "Ò",
	       Oacute: "Ó",
	       Ocirc: "Ô",
	       Otilde: "Õ",
	       Ouml: "Ö",
	       Oslash: "Ø",
	       Ugrave: "Ù",
	       Uacute: "Ú",
	       Ucirc: "Û",
	       Uuml: "Ü",
	       Yacute: "Ý",
	       THORN: "Þ",
	       szlig: "ß",
	       agrave: "à",
	       aacute: "á",
	       acirc: "â",
	       atilde: "ã",
	       auml: "ä",
	       aring: "å",
	       aelig: "æ",
	       ccedil: "ç",
	       egrave: "è",
	       eacute: "é",
	       ecirc: "ê",
	       euml: "ë",
	       igrave: "ì",
	       iacute: "í",
	       icirc: "î",
	       iuml: "ï",
	       eth: "ð",
	       ntilde: "ñ",
	       ograve: "ò",
	       oacute: "ó",
	       ocirc: "ô",
	       otilde: "õ",
	       ouml: "ö",
	       oslash: "ø",
	       ugrave: "ù",
	       uacute: "ú",
	       ucirc: "û",
	       uuml: "ü",
	       yacute: "ý",
	       thorn: "þ",
	       yuml: "ÿ",
	       nbsp: "\u00a0",
	       iexcl: "¡",
	       cent: "¢",
	       pound: "£",
	       curren: "¤",
	       yen: "¥",
	       brvbar: "¦",
	       sect: "§",
	       uml: "¨",
	       copy: "©",
	       ordf: "ª",
	       laquo: "«",
	       not: "¬",
	       shy: "­­",
	       reg: "®",
	       macr: "¯",
	       deg: "°",
	       plusmn: "±",
	       sup2: "²",
	       sup3: "³",
	       acute: "´",
	       micro: "µ",
	       para: "¶",
	       middot: "·",
	       cedil: "¸",
	       sup1: "¹",
	       ordm: "º",
	       raquo: "»",
	       frac14: "¼",
	       frac12: "½",
	       frac34: "¾",
	       iquest: "¿",
	       times: "×",
	       divide: "÷",
	       forall: "∀",
	       part: "∂",
	       exist: "∃",
	       empty: "∅",
	       nabla: "∇",
	       isin: "∈",
	       notin: "∉",
	       ni: "∋",
	       prod: "∏",
	       sum: "∑",
	       minus: "−",
	       lowast: "∗",
	       radic: "√",
	       prop: "∝",
	       infin: "∞",
	       ang: "∠",
	       and: "∧",
	       or: "∨",
	       cap: "∩",
	       cup: "∪",
	       'int': "∫",
	       there4: "∴",
	       sim: "∼",
	       cong: "≅",
	       asymp: "≈",
	       ne: "≠",
	       equiv: "≡",
	       le: "≤",
	       ge: "≥",
	       sub: "⊂",
	       sup: "⊃",
	       nsub: "⊄",
	       sube: "⊆",
	       supe: "⊇",
	       oplus: "⊕",
	       otimes: "⊗",
	       perp: "⊥",
	       sdot: "⋅",
	       Alpha: "Α",
	       Beta: "Β",
	       Gamma: "Γ",
	       Delta: "Δ",
	       Epsilon: "Ε",
	       Zeta: "Ζ",
	       Eta: "Η",
	       Theta: "Θ",
	       Iota: "Ι",
	       Kappa: "Κ",
	       Lambda: "Λ",
	       Mu: "Μ",
	       Nu: "Ν",
	       Xi: "Ξ",
	       Omicron: "Ο",
	       Pi: "Π",
	       Rho: "Ρ",
	       Sigma: "Σ",
	       Tau: "Τ",
	       Upsilon: "Υ",
	       Phi: "Φ",
	       Chi: "Χ",
	       Psi: "Ψ",
	       Omega: "Ω",
	       alpha: "α",
	       beta: "β",
	       gamma: "γ",
	       delta: "δ",
	       epsilon: "ε",
	       zeta: "ζ",
	       eta: "η",
	       theta: "θ",
	       iota: "ι",
	       kappa: "κ",
	       lambda: "λ",
	       mu: "μ",
	       nu: "ν",
	       xi: "ξ",
	       omicron: "ο",
	       pi: "π",
	       rho: "ρ",
	       sigmaf: "ς",
	       sigma: "σ",
	       tau: "τ",
	       upsilon: "υ",
	       phi: "φ",
	       chi: "χ",
	       psi: "ψ",
	       omega: "ω",
	       thetasym: "ϑ",
	       upsih: "ϒ",
	       piv: "ϖ",
	       OElig: "Œ",
	       oelig: "œ",
	       Scaron: "Š",
	       scaron: "š",
	       Yuml: "Ÿ",
	       fnof: "ƒ",
	       circ: "ˆ",
	       tilde: "˜",
	       ensp: " ",
	       emsp: " ",
	       thinsp: " ",
	       zwnj: "‌",
	       zwj: "‍",
	       lrm: "‎",
	       rlm: "‏",
	       ndash: "–",
	       mdash: "—",
	       lsquo: "‘",
	       rsquo: "’",
	       sbquo: "‚",
	       ldquo: "“",
	       rdquo: "”",
	       bdquo: "„",
	       dagger: "†",
	       Dagger: "‡",
	       bull: "•",
	       hellip: "…",
	       permil: "‰",
	       prime: "′",
	       Prime: "″",
	       lsaquo: "‹",
	       rsaquo: "›",
	       oline: "‾",
	       euro: "€",
	       trade: "™",
	       larr: "←",
	       uarr: "↑",
	       rarr: "→",
	       darr: "↓",
	       harr: "↔",
	       crarr: "↵",
	       lceil: "⌈",
	       rceil: "⌉",
	       lfloor: "⌊",
	       rfloor: "⌋",
	       loz: "◊",
	       spades: "♠",
	       clubs: "♣",
	       hearts: "♥",
	       diams: "♦"
	});

	/**
	 * @deprecated use `HTML_ENTITIES` instead
	 * @see HTML_ENTITIES
	 */
	exports.entityMap = exports.HTML_ENTITIES; 
} (entities$2));

var entities$1 = /*@__PURE__*/getDefaultExportFromCjs(entities$2);

var sax$1 = {};

var NAMESPACE$1 = conventions$2.NAMESPACE;

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;//\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
function ParseError$1(message, locator) {
	this.message = message;
	this.locator = locator;
	if(Error.captureStackTrace) Error.captureStackTrace(this, ParseError$1);
}
ParseError$1.prototype = new Error();
ParseError$1.prototype.name = ParseError$1.name;

function XMLReader$1(){

}

XMLReader$1.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {});
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
};
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if (Object.hasOwnProperty.call(entityMap, k)) {
			return entityMap[k];
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else {
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end;
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g;
	var locator = domBuilder.locator;

	var parseStack = [{currentNSMap:defaultNSMapCopy}];
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, '');
				var config = parseStack.pop();
				if(end<0){

	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase();
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for (var prefix in localNSMap) {
							if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
								domBuilder.endPrefixMapping(prefix);
							}
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName ); // No known test case
					}
		        }else {
		        	parseStack.push(config);
		        }

				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;


				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					domBuilder.locator = locator2;
					if(appendElement$1(el,domBuilder,currentNSMap)){
						parseStack.push(el);
					}
					domBuilder.locator = locator;
				}else {
					if(appendElement$1(el,domBuilder,currentNSMap)){
						parseStack.push(el);
					}
				}

				if (NAMESPACE$1.isHTML(el.uri) && !el.closed) {
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder);
				} else {
					end++;
				}
			}
		}catch(e){
			if (e instanceof ParseError$1) {
				throw e;
			}
			errorHandler.error('element parse error: '+e);
			end = -1;
		}
		if(end>start){
			start = end;
		}else {
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){

	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (el.attributeNames.hasOwnProperty(qname)) {
			errorHandler.fatalError('Attribute ' + qname + ' redefined');
		}
		el.addValue(
			qname,
			// @see https://www.w3.org/TR/xml/#AVNormalize
			// since the xmldom sax parser does not "interpret" DTD the following is not implemented:
			// - recursive replacement of (DTD) entity references
			// - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
			value.replace(/[\t\n\r]/g, ' ').replace(/&#?\w+;/g, entityReplacer),
			startIndex
		);
	}
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else {
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName'); // No known test case
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="');
					attrName = source.slice(start,p);
				}
				start = p+1;
				p = source.indexOf(c,start);
				if(p>0){
					value = source.slice(start, p);
					addAttribute(attrName, value, start-1);
					s = S_ATTR_END;
				}else {
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start, p);
				addAttribute(attrName, value, start);
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END;
			}else {
				//fatalError: no equal before
				throw new Error('attribute value must after "="'); // No known test case
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
				break;
				case S_ATTR_SPACE:
					el.closed = true;
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')") // No known test case
			}
			break;
		case ''://end document
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1);
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!');
					addAttribute(attrName, value, start);
				}else {
					if(!NAMESPACE$1.isHTML(currentNSMap['']) || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!');
					}
					addAttribute(value, value, start);
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p);
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start, p);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					addAttribute(attrName, value, start);
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else {//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if (!NAMESPACE$1.isHTML(currentNSMap['']) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!');
					}
					addAttribute(attrName, attrName, start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!');
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement$1(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName;
		}else {
			localName = qName;
			prefix = null;
			nsPrefix = qName === 'xmlns' && '';
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {};
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={});
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = NAMESPACE$1.XMLNS;
			domBuilder.startPrefixMapping(nsPrefix, value);
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = NAMESPACE$1.XML;
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || ''];

				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else {
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for (prefix in localNSMap) {
				if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
					domBuilder.endPrefixMapping(prefix);
				}
			}
		}
	}else {
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}

		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>');
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName);
		}
		closeMap[tagName] =pos;
	}
	return pos<elStartEnd;
	//}
}

function _copy (source, target) {
	for (var n in source) {
		if (Object.prototype.hasOwnProperty.call(source, n)) {
			target[n] = source[n];
		}
	}
}

function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2);
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else {
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else {
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA();
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = false;
			var sysid = false;
			if(len>3){
				if(/^public$/i.test(matchs[2][0])){
					pubid = matchs[3][0];
					sysid = len>4 && matchs[4][0];
				}else if(/^system$/i.test(matchs[2][0])){
					sysid = matchs[3][0];
				}
			}
			var lastMatch = matchs[len-1];
			domBuilder.startDTD(name, pubid, sysid);
			domBuilder.endDTD();

			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else {//error
			return -1;
		}
	}
	return -1;
}

function ElementAttributes(){
	this.attributeNames = {};
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName;
	},
	addValue:function(qName, value, offset) {
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this.attributeNames[qName] = this.length;
		this[this.length++] = {qName:qName,value:value,offset:offset};
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
};



function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

var XMLReader_1 = sax$1.XMLReader = XMLReader$1;
var ParseError_1 = sax$1.ParseError = ParseError$1;

var conventions = conventions$2;
var dom$1 = dom$2;
var entities = entities$2;
var sax = sax$1;

var DOMImplementation$1 = dom$1.DOMImplementation;

var NAMESPACE = conventions.NAMESPACE;

var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;

/**
 * Normalizes line ending according to https://www.w3.org/TR/xml11/#sec-line-ends:
 *
 * > XML parsed entities are often stored in computer files which,
 * > for editing convenience, are organized into lines.
 * > These lines are typically separated by some combination
 * > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
 * >
 * > To simplify the tasks of applications, the XML processor must behave
 * > as if it normalized all line breaks in external parsed entities (including the document entity)
 * > on input, before parsing, by translating all of the following to a single #xA character:
 * >
 * > 1. the two-character sequence #xD #xA
 * > 2. the two-character sequence #xD #x85
 * > 3. the single character #x85
 * > 4. the single character #x2028
 * > 5. any #xD character that is not immediately followed by #xA or #x85.
 *
 * @param {string} input
 * @returns {string}
 */
function normalizeLineEndings(input) {
	return input
		.replace(/\r[\n\u0085]/g, '\n')
		.replace(/[\r\u0085\u2028]/g, '\n')
}

/**
 * @typedef Locator
 * @property {number} [columnNumber]
 * @property {number} [lineNumber]
 */

/**
 * @typedef DOMParserOptions
 * @property {DOMHandler} [domBuilder]
 * @property {Function} [errorHandler]
 * @property {(string) => string} [normalizeLineEndings] used to replace line endings before parsing
 * 						defaults to `normalizeLineEndings`
 * @property {Locator} [locator]
 * @property {Record<string, string>} [xmlns]
 *
 * @see normalizeLineEndings
 */

/**
 * The DOMParser interface provides the ability to parse XML or HTML source code
 * from a string into a DOM `Document`.
 *
 * _xmldom is different from the spec in that it allows an `options` parameter,
 * to override the default behavior._
 *
 * @param {DOMParserOptions} [options]
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
 */
function DOMParser$1(options){
	this.options = options ||{locator:{}};
}

DOMParser$1.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var isHTML = /\/x?html?$/.test(mimeType);//mimeType.toLowerCase().indexOf('html') > -1;
  	var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
	if(locator){
		domBuilder.setDocumentLocator(locator);
	}

	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(isHTML){
		defaultNSMap[''] = NAMESPACE.HTML;
	}
	defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
	var normalize = options.normalizeLineEndings || normalizeLineEndings;
	if (source && typeof source === 'string') {
		sax.parse(
			normalize(source),
			defaultNSMap,
			entityMap
		);
	} else {
		sax.errorHandler.error('invalid doc source');
	}
	return domBuilder.doc;
};
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {};
	var isCallback = errorImpl instanceof Function;
	locator = locator||{};
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg);}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation$1().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;

		this.locator && position(this.locator,el);
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr);
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement;
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins);
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments);
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode);
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments);
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm);
	    appendElement(this, comm);
	},

	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},

	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt);
	        appendElement(this, dt);
					this.doc.doctype = dt;
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		throw new ParseError(error, this.locator);
	}
};
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else {//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null};
});

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

var __DOMHandler = domParser.__DOMHandler = DOMHandler;
var normalizeLineEndings_1 = domParser.normalizeLineEndings = normalizeLineEndings;
var DOMParser_1 = domParser.DOMParser = DOMParser$1;

var dom = dom$2;
var DOMImplementation = lib.DOMImplementation = dom.DOMImplementation;
var XMLSerializer = lib.XMLSerializer = dom.XMLSerializer;
var DOMParser = lib.DOMParser = domParser.DOMParser;

// TODO: remove it and provide utils to implement translators
/**
 * Basic abstract class for translator
 */
var BaseTranslator = /** @class */ (function () {
    function BaseTranslator(options) {
        var _this = this;
        this.options = {};
        /**
         * Util to wrap url to CORS proxy
         */
        this.wrapUrlToCorsProxy = function (url) {
            // Use as prefix
            if (typeof _this.options.corsProxy === 'string') {
                return _this.options.corsProxy + url;
            }
            // Run user defined transformation
            if (typeof _this.options.corsProxy === 'function') {
                return _this.options.corsProxy(url);
            }
            return url;
        };
        if (options !== undefined) {
            this.options = options;
        }
    }
    BaseTranslator.prototype.checkLimitExceeding = function (text) {
        var plainText = Array.isArray(text) ? text.join('') : text;
        var extra = plainText.length - this.getLengthLimit();
        return extra > 0 ? extra : 0;
    };
    BaseTranslator.translatorName = 'UnknownTranslator';
    BaseTranslator.isRequiredKey = function () { return false; };
    BaseTranslator.isSupportedAutoFrom = function () { return false; };
    BaseTranslator.getSupportedLanguages = function () { return []; };
    return BaseTranslator;
}());

// TKK value from https://github.com/FilipePS/Traduzir-paginas-web/blob/f3a4956a1aa96b7a9124864158a5200827694521/background/translationService.js
const googleTranslateTKK = '448487.932609646';

//
// Obfuscated logic: START
//
/* eslint-disable no-bitwise */

function shiftLeftOrRightThenSumOrXor(num, optString) {
	for (let i = 0; i < optString.length - 2; i += 3) {
		let acc = optString.charAt(i + 2);
		if ('a' <= acc) {
			acc = acc.charCodeAt(0) - 87;
		} else {
			acc = Number(acc);
		}
		if (optString.charAt(i + 1) == '+') {
			acc = num >>> acc;
		} else {
			acc = num << acc;
		}
		if (optString.charAt(i) == '+') {
			num += acc & 4294967295;
		} else {
			num ^= acc;
		}
	}
	return num;
}

function transformQuery(query) {
	const bytesArray = [];
	let idx = [];
	for (let i = 0; i < query.length; i++) {
		let charCode = query.charCodeAt(i);

		if (128 > charCode) {
			bytesArray[idx++] = charCode;
		} else {
			if (2048 > charCode) {
				bytesArray[idx++] = (charCode >> 6) | 192;
			} else {
				if (
					55296 == (charCode & 64512) &&
					i + 1 < query.length &&
					56320 == (query.charCodeAt(i + 1) & 64512)
				) {
					charCode =
						65536 +
						((charCode & 1023) << 10) +
						(query.charCodeAt(++i) & 1023);
					bytesArray[idx++] = (charCode >> 18) | 240;
					bytesArray[idx++] = ((charCode >> 12) & 63) | 128;
				} else {
					bytesArray[idx++] = (charCode >> 12) | 224;
				}
				bytesArray[idx++] = ((charCode >> 6) & 63) | 128;
			}
			bytesArray[idx++] = (charCode & 63) | 128;
		}
	}
	return bytesArray;
}

function calcHash(query, windowTkk) {
	const tkkSplited = windowTkk.split('.');
	const tkkIndex = Number(tkkSplited[0]) || 0;
	const tkkKey = Number(tkkSplited[1]) || 0;

	const bytesArray = transformQuery(query);

	let encondingRound = tkkIndex;
	for (let i = 0; i < bytesArray.length; i++) {
		encondingRound += bytesArray[i];
		encondingRound = shiftLeftOrRightThenSumOrXor(encondingRound, '+-a^+6');
	}
	encondingRound = shiftLeftOrRightThenSumOrXor(encondingRound, '+-3^+b+-f');

	encondingRound ^= tkkKey;
	if (encondingRound <= 0) {
		encondingRound = (encondingRound & 2147483647) + 2147483648;
	}

	const normalizedResult = encondingRound % 1000000;
	return normalizedResult.toString() + '.' + (normalizedResult ^ tkkIndex);
}

/* eslint-enable no-bitwise */
//
// Obfuscated logic: END
//

function getToken(query) {
	return new Promise((res) => res({ value: calcHash(query, googleTranslateTKK) }));
}

function deepExploreArray(obj, depth) {
    var currentDepth = 0;
    var currentObj = obj;
    while (depth > currentDepth) {
        if (!Array.isArray(currentObj)) {
            throw new TypeError('Error while explore array on depth #' + currentDepth);
        }
        currentObj = currentObj[0];
        currentDepth++;
    }
    return currentObj;
}
/**
 * Visit each item in array recursively
 */
var visitArrayItems = function (arr, visitor) {
    arr.forEach(function (obj) {
        if (Array.isArray(obj)) {
            visitArrayItems(obj, visitor);
        }
        else {
            visitor(obj);
        }
    });
};

// TODO: Add language codes with long format `lang-sublang`
// Unsupported: ["bn-BD","bs-Latn","yue","otq","zh-Hant","zh-Hans","tlh","sr-Cyrl","sr-Latn","fil","mww","yua","mhr","pap","ceb","mrj","udm"]
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
// Valid ISO 639-2 codes
// eslint-disable
// prettier-ignore
var langCodes = [
    "aa", "ab", "af", "ak", "sq", "am", "ar", "an", "hy", "as",
    "av", "ae", "ay", "az", "ba", "bm", "eu", "be", "bn", "bh",
    "bi", "bo", "bs", "br", "bg", "my", "ca", "cs", "ch", "ce",
    "zh", "cu", "cv", "kw", "co", "cr", "cy", "da", "de", "dv",
    "nl", "dz", "el", "en", "eo", "et", "ee", "fo", "fa", "fj",
    "fi", "fr", "fy", "ff", "ka", "gd", "ga", "gl", "gv", "gn",
    "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig",
    "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it", "jv",
    "ja", "kl", "kn", "ks", "kr", "kk", "km", "ki", "rw", "ky",
    "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li", "ln",
    "lt", "lb", "lu", "lg", "mk", "mh", "ml", "mi", "mr", "ms",
    "mg", "mt", "mn", "na", "nv", "nr", "nd", "ng", "ne", "nn",
    "nb", "no", "ny", "oc", "oj", "or", "om", "os", "pa", "pi",
    "pl", "pt", "ps", "qu", "rm", "ro", "rn", "ru", "sg", "sa",
    "si", "sk", "sl", "se", "sm", "sn", "sd", "so", "st", "es",
    "sc", "sr", "ss", "su", "sw", "sv", "ty", "ta", "tt", "te",
    "tg", "tl", "th", "ti", "to", "tn", "ts", "tk", "tr", "tw",
    "ug", "uk", "ur", "uz", "ve", "vi", "vo", "wa", "wo", "xh",
    "yi", "yo", "za", "zu"
];
// eslint-enable
var langCodesMap = null;
/**
 * Check is string are 639-2 lang code
 *
 * Values are case sensitive, if you need, you have to convert strings to lower case to check
 *
 * This function are creates object `Record<string, unknown>` with hundreds entries in RAM,
 * while first call to improve search performance. Keep in mind that this RAM never free.
 */
var isLanguageCodeISO639v2 = function (language) {
    var e_1, _a;
    // Create map to optimize search
    if (langCodesMap === null) {
        langCodesMap = {};
        try {
            for (var langCodes_1 = __values(langCodes), langCodes_1_1 = langCodes_1.next(); !langCodes_1_1.done; langCodes_1_1 = langCodes_1.next()) {
                var lang = langCodes_1_1.value;
                langCodesMap[lang] = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (langCodes_1_1 && !langCodes_1_1.done && (_a = langCodes_1.return)) _a.call(langCodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return language in langCodesMap;
};
/**
 * Receive languages array and return extracted 639-2 lang codes
 */
var getLanguageCodesISO639v2 = function (languages) {
    return languages
        .map(function (lang) {
        // Remove suffix
        return lang.split(/[_-]/)[0];
    })
        .filter(function (language, index, languages) {
        // Remove non standard codes
        if (!isLanguageCodeISO639v2(language))
            return false;
        // Remove duplicates
        return languages.indexOf(language) === index;
    });
};

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * Map with languages aliases.
 *
 * Google translator use legacy codes for some languages,
 * this map useful to use actual language codes by aliases
 *
 * @link https://xml.coverpages.org/iso639a.html
 */
var fixedLanguagesMap = {
    he: 'iw',
    jv: 'jw',
};
/**
 * Raw languages array
 */
// eslint-disable
// prettier-ignore
var supportedLanguages = [
    'af', 'ak', 'am', 'ar', 'as', 'ay', 'az', 'be', 'bg', 'bho',
    'bm', 'bn', 'bs', 'ca', 'ceb', 'ckb', 'co', 'cs', 'cy', 'da',
    'de', 'doi', 'dv', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu',
    'fa', 'fi', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gom', 'gu',
    'ha', 'haw', 'hi', 'hmn', 'hr', 'ht', 'hu', 'hy', 'id', 'ig',
    'ilo', 'is', 'it', 'iw', 'ja', 'jw', 'ka', 'kk', 'km', 'kn',
    'ko', 'kri', 'ku', 'ky', 'la', 'lb', 'lg', 'ln', 'lo', 'lt',
    'lus', 'lv', 'mai', 'mg', 'mi', 'mk', 'ml', 'mn', 'mni-Mtei', 'mr',
    'ms', 'mt', 'my', 'ne', 'nl', 'no', 'nso', 'ny', 'om', 'or',
    'pa', 'pl', 'ps', 'pt', 'qu', 'ro', 'ru', 'rw', 'sa', 'sd',
    'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'st', 'su',
    'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tr',
    'ts', 'tt', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh', 'yi', 'yo',
    'zh-CN', 'zh-TW', 'zu'
];
// eslint-enable
/**
 * Common class for google translator implementations
 */
var AbstractGoogleTranslator = /** @class */ (function (_super) {
    __extends(AbstractGoogleTranslator, _super);
    function AbstractGoogleTranslator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractGoogleTranslator.isSupportedAutoFrom = function () {
        return true;
    };
    AbstractGoogleTranslator.getSupportedLanguages = function () {
        var reversedLanguagesMap = Object.fromEntries(Object.entries(fixedLanguagesMap).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], val = _b[1];
            return [val, key];
        }));
        return getLanguageCodesISO639v2(supportedLanguages.map(function (lang) {
            var _a;
            // Replace legacy language codes to actual
            return (_a = reversedLanguagesMap[lang]) !== null && _a !== void 0 ? _a : lang;
        }));
    };
    AbstractGoogleTranslator.prototype.getLengthLimit = function () {
        return 4000;
    };
    AbstractGoogleTranslator.prototype.getRequestsTimeout = function () {
        return 300;
    };
    /**
     * Map ISO lang codes to google translator lang codes
     */
    AbstractGoogleTranslator.prototype.getFixedLanguage = function (lang) {
        var _a;
        if (lang === 'zh')
            return 'zh-CN';
        return (_a = fixedLanguagesMap[lang]) !== null && _a !== void 0 ? _a : lang;
    };
    return AbstractGoogleTranslator;
}(BaseTranslator));
/**
 * Translator implementation which use Google API with token from https://translate.google.com
 */
var GoogleTranslator = /** @class */ (function (_super) {
    __extends(GoogleTranslator, _super);
    function GoogleTranslator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parseXMLResponse = function (text) {
            try {
                var doc = new DOMParser().parseFromString(text);
                var nodes = xpath.select('//pre/*[not(self::i)]//text()', doc);
                return nodes.length === 0
                    ? null
                    : nodes.map(function (node) { return node.toString(); }).join(' ');
            }
            catch (err) {
                return null;
            }
        };
        return _this;
    }
    GoogleTranslator.prototype.checkLimitExceeding = function (text) {
        if (Array.isArray(text)) {
            var encodedText = this.encodeForBatch(text).join('');
            var extra = encodedText.length - this.getLengthLimit();
            return extra > 0 ? extra : 0;
        }
        else {
            var extra = text.length - this.getLengthLimit();
            return extra > 0 ? extra : 0;
        }
    };
    GoogleTranslator.prototype.translate = function (text, from, to) {
        var _this = this;
        return getToken(text).then(function (_a) {
            var tk = _a.value;
            var apiPath = 'https://translate.google.com/translate_a/single';
            var data = {
                client: 't',
                sl: _this.getFixedLanguage(from),
                tl: _this.getFixedLanguage(to),
                hl: _this.getFixedLanguage(to),
                dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
                ie: 'UTF-8',
                oe: 'UTF-8',
                otf: 1,
                ssel: 0,
                tsel: 0,
                kc: 7,
                q: text,
                tk: tk,
            };
            var url = apiPath + '?' + queryString.stringify(data);
            return axios$1
                .get(_this.wrapUrlToCorsProxy(url), {
                withCredentials: false,
                headers: _this.options.headers,
            })
                .then(function (rsp) { return rsp.data; })
                .then(function (rsp) {
                if (!(rsp instanceof Array) || !(rsp[0] instanceof Array)) {
                    throw new Error('Unexpected response');
                }
                var translatedText = rsp[0]
                    .map(function (chunk) {
                    return chunk instanceof Array && typeof chunk[0] === 'string'
                        ? chunk[0]
                        : '';
                })
                    .join('');
                return translatedText;
            });
        });
    };
    GoogleTranslator.prototype.translateBatch = function (text, from, to) {
        var _this = this;
        var preparedText = this.encodeForBatch(text);
        return getToken(preparedText.join('')).then(function (_a) {
            var tk = _a.value;
            var apiPath = 'https://translate.googleapis.com/translate_a/t';
            var data = {
                anno: 3,
                client: 'te',
                v: '1.0',
                format: 'html',
                sl: _this.getFixedLanguage(from),
                tl: _this.getFixedLanguage(to),
                tk: tk,
            };
            var url = apiPath + '?' + queryString.stringify(data);
            var body = preparedText
                .map(function (text) { return "&q=".concat(encodeURIComponent(text)); })
                .join('');
            return axios$1({
                url: _this.wrapUrlToCorsProxy(url),
                method: 'POST',
                withCredentials: false,
                headers: __assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, _this.options.headers),
                data: body,
            })
                .then(function (rsp) { return rsp.data; })
                .then(function (rawResp) {
                try {
                    if (!Array.isArray(rawResp)) {
                        throw new Error('Unexpected response');
                    }
                    var isSingleResponseMode_1 = text.length === 1;
                    var result_1 = [];
                    visitArrayItems(rawResp, function (obj) {
                        if (isSingleResponseMode_1 && result_1.length === 1)
                            return;
                        if (typeof obj !== 'string')
                            return;
                        if (isSingleResponseMode_1) {
                            var parsedText = _this.parseXMLResponse(obj);
                            result_1.push(parsedText || obj);
                        }
                        else {
                            var parsedText = _this.parseXMLResponse(obj);
                            if (parsedText !== null) {
                                result_1.push(parsedText);
                            }
                        }
                    });
                    if (result_1.length !== text.length) {
                        throw new Error('Mismatching a lengths of original and translated arrays');
                    }
                    return result_1;
                }
                catch (err) {
                    console.warn('Got response', rawResp);
                    throw err;
                }
            });
        });
    };
    GoogleTranslator.prototype.encodeForBatch = function (textList) {
        return textList.map(function (text, i) { return "<pre><a i=\"".concat(i, "\">").concat(text, "</a></pre>"); });
    };
    GoogleTranslator.translatorName = 'GoogleTranslator';
    return GoogleTranslator;
}(AbstractGoogleTranslator));
/**
 * Translator implementation which use Google API without token
 */
var GoogleTranslatorTokenFree = /** @class */ (function (_super) {
    __extends(GoogleTranslatorTokenFree, _super);
    function GoogleTranslatorTokenFree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.translate = function (text, from, to) { return __awaiter(_this, void 0, void 0, function () {
            var _a, translation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.translateBatch([text], from, to)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), translation = _a[0];
                        return [2 /*return*/, translation];
                }
            });
        }); };
        return _this;
    }
    GoogleTranslatorTokenFree.prototype.translateBatch = function (text, from, to) {
        var apiPath = 'https://translate.googleapis.com/translate_a/t';
        var data = {
            client: 'dict-chrome-ex',
            sl: this.getFixedLanguage(from),
            tl: this.getFixedLanguage(to),
            q: text,
        };
        var url = apiPath + '?' + queryString.stringify(data);
        return axios$1({
            url: this.wrapUrlToCorsProxy(url),
            method: 'GET',
            withCredentials: false,
            headers: __assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, this.options.headers),
        })
            .then(function (rsp) { return rsp.data; })
            .then(function (rawResp) {
            try {
                if (!Array.isArray(rawResp)) {
                    throw new Error('Unexpected response');
                }
                var intermediateTextsArray_1 = [];
                visitArrayItems(rawResp, function (obj) {
                    if (typeof obj === 'string') {
                        intermediateTextsArray_1.push(obj);
                    }
                });
                var result = [];
                var isSingleResponseMode = text.length === 1;
                var isOneToOneMappingMode = intermediateTextsArray_1.length === text.length;
                for (var idx in intermediateTextsArray_1) {
                    var text_1 = intermediateTextsArray_1[idx];
                    if (isSingleResponseMode) {
                        result.push(text_1);
                        break;
                    }
                    // Each second text it's not translation if not 1-1 mapping
                    var isTranslation = isOneToOneMappingMode || Number(idx) % 2 === 0;
                    if (isTranslation) {
                        result.push(text_1);
                    }
                }
                if (result.length !== text.length) {
                    console.warn('Translation result', result);
                    throw new Error('Mismatching a lengths of original and translated arrays');
                }
                return result;
            }
            catch (err) {
                console.warn('Got response', rawResp);
                throw err;
            }
        });
    };
    GoogleTranslatorTokenFree.translatorName = 'GoogleTranslatorTokenFree';
    return GoogleTranslatorTokenFree;
}(AbstractGoogleTranslator));

GoogleTranslatorTokenFree;
